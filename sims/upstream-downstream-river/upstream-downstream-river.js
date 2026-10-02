// Upstream vs. Downstream Intervention Visualizer (the river metaphor)
// CANVAS_HEIGHT: 525
// A cohort of 60 people walks along a riverbank. At an upstream hazard some of
// them fall into the river (become ill). Three levers act at different points:
//   Upstream   - Housing Policy:      fewer people fall in at all
//   Midstream  - Smoking Cessation:   some people in the water are pulled to shore
//   Downstream - Hospital:            treats people in the water, one at a time
// Each completed run is added to a comparison table so students can compare
// lever combinations. ILLUSTRATIVE MODEL - the rates below are teaching
// parameters chosen to show the logic of the metaphor, not real-world data.

// ---- canvas layout (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 800;
let drawHeight = 440;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;
let defaultTextSize = 16;

// ---- model parameters (illustrative) ----
const COHORT = 60;              // people per run
const SPAWN_EVERY = 10;         // simulation frames between people
const DT = 1 / 360;             // progress along the river per frame
const P_FALL_BASE = 0.5;        // share who fall in with no upstream action
const P_FALL_HOUSING = 0.2;     // share who fall in with the housing policy
const P_RESCUE = 0.4;           // share pulled out midstream when lever is on
const SERVICE_BASE = 50;        // frames the hospital needs per patient
const SERVICE_EXPANDED = 28;    // frames per patient with expanded capacity
const GOLDEN = 0.6180339887;    // low-discrepancy sequence -> repeatable runs

// positions along the river (0 = upstream end, 1 = downstream end)
const T_FALL = 0.20;
const T_WATER = 0.30;
const T_RESCUE = 0.50;
const T_HOSPITAL = 0.80;

const RIVER_W = 56;             // river width in pixels
const PATH_OFFSET = 46;         // riverbank path distance from river center

// ---- state ----
let people = [];
let spawned = 0;
let waterCount = 0;             // how many have reached the midstream point in the water
let simFrame = 0;
let hospitalFreeAt = 0;
let isRunning = false;          // MicroSims always start paused
let runState = 'idle';          // 'idle' | 'active' | 'done'
let leversChangedMidRun = false;
let counts = { ill: 0, rescued: 0, treated: 0, untreated: 0, safe: 0 };
let completedRuns = [];         // {u, m, d, ill, treated, burden, mixed}
let flowPhase = 0;
let riverW = 500;               // width of the river area (canvas minus sidebar)
let leverBoxes = [];            // clickable rectangles, rebuilt every frame

// ---- controls ----
let startButton, resetButton;
let housingCheckbox, smokingCheckbox, hospitalCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  startButton = createButton('Start');
  startButton.parent(document.querySelector('main'));
  startButton.position(10, drawHeight + 8);
  startButton.size(90, 30);
  startButton.mousePressed(toggleRun);

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(108, drawHeight + 8);
  resetButton.size(70, 30);
  resetButton.mousePressed(resetAll);

  for (const b of [startButton, resetButton]) {
    b.style('font-size', '15px');
    b.style('cursor', 'pointer');
  }

  housingCheckbox = createCheckbox(' Housing policy (U)', false);
  smokingCheckbox = createCheckbox(' Smoking cessation (M)', false);
  hospitalCheckbox = createCheckbox(' Expand hospital (D)', false);
  for (const c of [housingCheckbox, smokingCheckbox, hospitalCheckbox]) {
    c.parent(document.querySelector('main'));
    c.changed(leverChanged);
  }
  positionCheckboxes();

  describe('A river flows from the upper left to the lower right. People walk along the ' +
    'riverbank and some fall into the water, which means they become ill. Three levers sit ' +
    'along the river: an upstream housing policy that keeps people from falling in, a ' +
    'midstream smoking cessation program that pulls some people back to shore, and a ' +
    'downstream hospital that treats people one at a time. A sidebar counts people ill, ' +
    'people treated, and the health burden remaining, and lists completed runs for comparison.');
}

function draw() {
  updateCanvasSize();

  // drawing region and control region backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (isRunning) stepSimulation();

  drawRiver();
  drawLeverEffects();
  drawPeople();
  drawLeverBoxes();
  drawTitleAndHelp();
  drawSidebar();
  drawControlLabels();
}

// ---------------------------------------------------------------------------
// geometry
// ---------------------------------------------------------------------------
function sidebarWidth() {
  if (canvasWidth >= 640) return 240;
  if (canvasWidth >= 500) return 195;
  return 150;
}

// control points of the river's center line
function riverCtl() {
  return {
    x0: -12, y0: 116,
    x1: riverW * 0.33, y1: 108,
    x2: riverW * 0.66, y2: 262,
    x3: riverW + 12, y3: 254
  };
}

// point on the river center line plus the unit normal that points to the
// upper bank, where the walking path is
function riverPoint(t) {
  const c = riverCtl();
  const x = bezierPoint(c.x0, c.x1, c.x2, c.x3, t);
  const y = bezierPoint(c.y0, c.y1, c.y2, c.y3, t);
  const tx = bezierTangent(c.x0, c.x1, c.x2, c.x3, t);
  const ty = bezierTangent(c.y0, c.y1, c.y2, c.y3, t);
  const m = Math.hypot(tx, ty) || 1;
  return { x: x, y: y, nx: ty / m, ny: -tx / m, tx: tx / m, ty: ty / m };
}

// ---------------------------------------------------------------------------
// simulation
// ---------------------------------------------------------------------------
function stepSimulation() {
  simFrame++;
  flowPhase = (flowPhase + 0.004) % 1;

  // send the next person down the riverbank
  if (spawned < COHORT && simFrame % SPAWN_EVERY === 0) {
    people.push({
      id: spawned,
      t: 0,
      state: 'bank',        // bank | falling | water | rescuing | rescued | treating
      decidedFall: false,
      decidedRescue: false,
      decidedHospital: false,
      animFrames: 0
    });
    spawned++;
  }

  const pFall = housingCheckbox.checked() ? P_FALL_HOUSING : P_FALL_BASE;
  const service = hospitalCheckbox.checked() ? SERVICE_EXPANDED : SERVICE_BASE;

  for (const p of people) {
    if (p.state === 'treating') {
      p.animFrames++;
      continue;
    }
    p.t += DT;

    // upstream hazard: does this person fall in?
    if (!p.decidedFall && p.t >= T_FALL) {
      p.decidedFall = true;
      if (((p.id + 1) * GOLDEN) % 1 < pFall) p.state = 'falling';
    }
    if (p.state === 'falling' && p.t >= T_WATER) {
      p.state = 'water';
      counts.ill++;
    }

    // midstream: some people in the water are pulled back to shore
    if (p.state === 'water' && !p.decidedRescue && p.t >= T_RESCUE) {
      p.decidedRescue = true;
      waterCount++;
      if (smokingCheckbox.checked() && (waterCount * GOLDEN + 0.37) % 1 < P_RESCUE) {
        p.state = 'rescuing';
        counts.rescued++;
      }
    }
    if (p.state === 'rescuing' && p.t >= T_RESCUE + 0.1) p.state = 'rescued';

    // downstream: the hospital treats one person at a time
    if (p.state === 'water' && !p.decidedHospital && p.t >= T_HOSPITAL) {
      p.decidedHospital = true;
      if (simFrame >= hospitalFreeAt) {
        p.state = 'treating';
        p.animFrames = 0;
        counts.treated++;
        hospitalFreeAt = simFrame + service;
      }
    }
  }

  // remove people who have finished
  people = people.filter(p => {
    if (p.state === 'treating') return p.animFrames < 18;
    if (p.t >= 1) {
      if (p.state === 'water') counts.untreated++;
      else counts.safe++;
      return false;
    }
    return true;
  });

  // end of run
  if (spawned >= COHORT && people.length === 0) {
    isRunning = false;
    runState = 'done';
    completedRuns.push({
      u: housingCheckbox.checked(),
      m: smokingCheckbox.checked(),
      d: hospitalCheckbox.checked(),
      ill: counts.ill,
      treated: counts.treated,
      burden: counts.untreated,
      mixed: leversChangedMidRun
    });
    if (completedRuns.length > 6) completedRuns.shift();
    startButton.html('New Run');
  }
}

function startNewRun() {
  people = [];
  spawned = 0;
  waterCount = 0;
  simFrame = 0;
  hospitalFreeAt = 0;
  leversChangedMidRun = false;
  counts = { ill: 0, rescued: 0, treated: 0, untreated: 0, safe: 0 };
  runState = 'active';
}

function toggleRun() {
  if (runState === 'idle' || runState === 'done') {
    startNewRun();
    isRunning = true;
  } else {
    isRunning = !isRunning;
  }
  startButton.html(isRunning ? 'Pause' : 'Resume');
}

function resetAll() {
  isRunning = false;
  runState = 'idle';
  people = [];
  spawned = 0;
  waterCount = 0;
  simFrame = 0;
  hospitalFreeAt = 0;
  leversChangedMidRun = false;
  counts = { ill: 0, rescued: 0, treated: 0, untreated: 0, safe: 0 };
  completedRuns = [];
  housingCheckbox.checked(false);
  smokingCheckbox.checked(false);
  hospitalCheckbox.checked(false);
  startButton.html('Start');
}

function leverChanged() {
  if (runState === 'active' && spawned > 0) leversChangedMidRun = true;
}

// ---------------------------------------------------------------------------
// drawing
// ---------------------------------------------------------------------------
function drawRiver() {
  const c = riverCtl();

  // water
  noFill();
  stroke('steelblue');
  strokeWeight(RIVER_W + 4);
  strokeCap(SQUARE);
  bezier(c.x0, c.y0, c.x1, c.y1, c.x2, c.y2, c.x3, c.y3);
  stroke('lightskyblue');
  strokeWeight(RIVER_W);
  bezier(c.x0, c.y0, c.x1, c.y1, c.x2, c.y2, c.x3, c.y3);
  strokeCap(ROUND);

  // flow marks drift downstream while the simulation runs
  stroke(255, 255, 255, 190);
  strokeWeight(2);
  for (let k = 0; k < 14; k++) {
    const t = (k / 14 + flowPhase) % 1;
    const p = riverPoint(t);
    const side = (k % 2 === 0 ? 1 : -1) * 13;
    const cx = p.x + p.nx * side;
    const cy = p.y + p.ny * side;
    line(cx - p.tx * 7, cy - p.ty * 7, cx + p.tx * 7, cy + p.ty * 7);
  }

  // dotted walking path on the upper bank
  noStroke();
  fill('peru');
  for (let t = 0; t <= 1.0001; t += 0.02) {
    const p = riverPoint(t);
    circle(p.x + p.nx * PATH_OFFSET, p.y + p.ny * PATH_OFFSET, 3);
  }

  // the upstream hazard where people fall in
  const h = riverPoint((T_FALL + T_WATER) / 2);
  noStroke();
  fill('saddlebrown');
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  textSize(riverW < 330 ? 11 : 13);
  text('Hazard: unsafe housing', max(h.x + h.nx * (PATH_OFFSET + 16) + 40, 84),
    h.y + h.ny * (PATH_OFFSET + 16));
  textStyle(NORMAL);
}

// visible effect of each lever on the river itself
function drawLeverEffects() {
  // upstream: a guardrail along the bank at the hazard
  if (housingCheckbox.checked()) {
    stroke('saddlebrown');
    strokeWeight(3);
    noFill();
    beginShape();
    for (let t = T_FALL - 0.04; t <= T_WATER + 0.05; t += 0.02) {
      const p = riverPoint(t);
      vertex(p.x + p.nx * (RIVER_W / 2 + 7), p.y + p.ny * (RIVER_W / 2 + 7));
    }
    endShape();
    for (let t = T_FALL - 0.04; t <= T_WATER + 0.05; t += 0.04) {
      const p = riverPoint(t);
      const gx = p.x + p.nx * (RIVER_W / 2 + 7);
      const gy = p.y + p.ny * (RIVER_W / 2 + 7);
      line(gx, gy - 6, gx, gy + 6);
    }
  }

  // midstream: a life ring on the bank
  if (smokingCheckbox.checked()) {
    const p = riverPoint(T_RESCUE + 0.03);
    const rx = p.x + p.nx * (RIVER_W / 2 + 8);
    const ry = p.y + p.ny * (RIVER_W / 2 + 8);
    noFill();
    stroke('darkorange');
    strokeWeight(5);
    circle(rx, ry, 16);
    stroke('white');
    strokeWeight(2);
    line(rx - 8, ry, rx - 4, ry);
    line(rx + 4, ry, rx + 8, ry);
  }

  // downstream: the hospital on the lower bank
  const hp = hospitalIconPos();
  const big = hospitalCheckbox.checked();
  stroke('gray');
  strokeWeight(1.5);
  fill('white');
  if (big) rect(hp.x + 14, hp.y - 8, 20, 22, 2);     // extra wing when expanded
  rect(hp.x - 15, hp.y - 14, 30, 28, 3);
  noStroke();
  fill('crimson');
  rect(hp.x - 3, hp.y - 10, 6, 20);
  rect(hp.x - 10, hp.y - 3, 20, 6);
  // "busy" light while a patient is being treated
  if (runState === 'active' && simFrame < hospitalFreeAt) {
    fill('gold');
    stroke('gray');
    strokeWeight(1);
    circle(hp.x - 15, hp.y - 14, 9);
  }
}

function hospitalIconPos() {
  const p = riverPoint(T_HOSPITAL + 0.02);
  return { x: p.x - p.nx * (RIVER_W / 2 + 20), y: p.y - p.ny * (RIVER_W / 2 + 20) };
}

function personXY(p) {
  const r = riverPoint(constrain(p.t, 0, 1));
  const wobbleBank = ((p.id * 13) % 9) - 4;
  const wobbleWater = ((p.id * 37) % 21) - 10;
  let off;
  if (p.state === 'bank' || p.state === 'rescued') {
    off = PATH_OFFSET + wobbleBank;
  } else if (p.state === 'falling') {
    const k = constrain((p.t - T_FALL) / (T_WATER - T_FALL), 0, 1);
    off = lerp(PATH_OFFSET + wobbleBank, wobbleWater, k);
  } else if (p.state === 'rescuing') {
    const k = constrain((p.t - T_RESCUE) / 0.1, 0, 1);
    off = lerp(wobbleWater, PATH_OFFSET + wobbleBank, k);
  } else {
    off = wobbleWater;
  }
  let x = r.x + r.nx * off;
  let y = r.y + r.ny * off;
  if (p.state === 'treating') {
    const hp = hospitalIconPos();
    const k = constrain(p.animFrames / 18, 0, 1);
    x = lerp(x, hp.x, k);
    y = lerp(y, hp.y, k);
  }
  return { x: x, y: y };
}

function drawPeople() {
  for (const p of people) {
    const pos = personXY(p);
    if (pos.x > riverW - 4) continue;       // hidden behind the sidebar edge
    stroke('white');
    strokeWeight(1);
    if (p.state === 'bank') fill('seagreen');
    else if (p.state === 'rescued' || p.state === 'rescuing') fill('darkorange');
    else if (p.state === 'treating') fill('mediumpurple');
    else fill('crimson');
    circle(pos.x, pos.y, 11);
  }
}

// three lever boxes below the river; each is clickable
function drawLeverBoxes() {
  const defs = [
    { t: 0.20, tag: 'UPSTREAM', name: 'Housing Policy', cb: housingCheckbox, color: 'seagreen',
      on: 'ON: fewer people fall in', off: 'OFF: click to turn on' },
    { t: 0.50, tag: 'MIDSTREAM', name: 'Smoking Cessation', cb: smokingCheckbox, color: 'sienna',
      on: 'ON: some pulled to shore', off: 'OFF: click to turn on' },
    { t: 0.80, tag: 'DOWNSTREAM', name: 'Hospital', cb: hospitalCheckbox, color: 'firebrick',
      on: 'Expanded. Treated: ', off: 'Standard. Treated: ' }
  ];
  const narrow = riverW < 400;               // compact boxes on small screens
  const bw = min(146, (riverW - 16) / 3 + 14);
  const bh = narrow ? 44 : 64;
  leverBoxes = [];

  for (let i = 0; i < defs.length; i++) {
    const d = defs[i];
    const p = riverPoint(d.t);
    const bx = constrain(p.x - bw * (narrow && i === 1 ? 0.8 : 0.5), 5, riverW - bw - 5);
    const by = p.y + RIVER_W / 2 + (i === 2 ? 44 : 34) + i * 4;
    const isOn = d.cb.checked();
    leverBoxes.push({ x: bx, y: by, w: bw, h: bh, cb: d.cb });

    // connector from the box to the river
    if (i < 2) {
      stroke('gray');
      strokeWeight(1.5);
      line(bx + bw / 2, by, p.x, p.y + RIVER_W / 2 + 2);
    }

    // box
    stroke(isOn ? d.color : 'silver');
    strokeWeight(isOn ? 3 : 1.5);
    fill(isOn ? 'lightyellow' : 'white');
    rect(bx, by, bw, bh, 8);

    // toggle switch drawn in the upper right corner (wide layout only)
    if (!narrow) {
      const sx = bx + bw - 38;
      const sy = by + 7;
      noStroke();
      fill(isOn ? d.color : 'silver');
      rect(sx, sy, 30, 14, 7);
      fill('white');
      circle(isOn ? sx + 23 : sx + 7, sy + 7, 10);
    }

    // text
    noStroke();
    textAlign(LEFT, TOP);
    fill(d.color);
    textStyle(BOLD);
    // narrow layout has no room for the switch, so the tag carries the state
    let tag = d.tag;
    if (narrow && i < 2) tag += isOn ? ': ON' : ': OFF';
    if (narrow && i === 2) tag += isOn ? ': EXPANDED' : ': STANDARD';
    fitTextSize(tag, bw - 12, 12, 7);
    text(tag, bx + 7, by + 8);
    fill('black');
    fitTextSize(d.name, bw - 12, 15, 8);
    text(d.name, bx + 7, by + 24);
    textStyle(NORMAL);
    if (!narrow) {
      let line3 = isOn ? d.on : d.off;
      if (i === 2) line3 += counts.treated;
      fitTextSize(line3, bw - 14, 12.5, 8);
      text(line3, bx + 8, by + 44);
    }
  }
}

// shrink the text size until the string fits the given width
function fitTextSize(str, maxW, startSize, minSize) {
  let ts = startSize;
  textSize(ts);
  while (textWidth(str) > maxW && ts > minSize) {
    ts -= 0.5;
    textSize(ts);
  }
}

function drawTitleAndHelp() {
  // title, drawn after the river so it is never covered
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 560 ? 17 : 22);
  text('Upstream vs. Downstream Interventions', canvasWidth / 2, 8);

  // instructions and dot legend under the lever boxes
  textAlign(LEFT, TOP);
  const helpSize = riverW < 330 ? 11 : 13;
  textSize(helpSize);
  fill('black');
  const help = riverW < 400 ? 'Click a lever, then press Start.' :
    'Click a lever to turn it on or off, then press Start. Compare the runs.';
  const lines = wrapLines(help, riverW - 20);
  let y = drawHeight - 22 - lines.length * (helpSize + 3);
  for (const ln of lines) {
    noStroke();
    text(ln, 10, y);
    y += helpSize + 3;
  }

  // legend of dot colors
  const items = [['seagreen', 'healthy'], ['crimson', 'ill'], ['darkorange', 'rescued'], ['mediumpurple', 'treated']];
  let lx = 10;
  let ly = y + 6;
  textAlign(LEFT, CENTER);
  for (const it of items) {
    if (lx + 20 + textWidth(it[1]) > riverW - 6) {   // wrap on narrow canvases
      lx = 10;
      ly += helpSize + 5;
    }
    stroke('white');
    strokeWeight(1);
    fill(it[0]);
    circle(lx + 6, ly + 6, 11);
    noStroke();
    fill('black');
    text(it[1], lx + 16, ly + 6);
    lx += 28 + textWidth(it[1]);
  }
}

function wrapLines(str, maxW) {
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const trial = cur === '' ? w : cur + ' ' + w;
    if (textWidth(trial) > maxW && cur !== '') {
      lines.push(cur);
      cur = w;
    } else {
      cur = trial;
    }
  }
  if (cur !== '') lines.push(cur);
  return lines;
}

function drawSidebar() {
  const sx = riverW + 2;
  const sw = canvasWidth - riverW - 8;
  const small = sw < 200;
  const ts = small ? 11.5 : 13.5;
  const rowH = small ? 18 : 20;

  // cover the end of the river so that it stops cleanly at the sidebar
  noStroke();
  fill('aliceblue');
  rect(riverW, 34, canvasWidth - riverW - 1, drawHeight - 35);

  // ---- panel 1: counters for the current run ----
  const p1y = 40;
  const p1h = 30 + 5 * rowH + 6;
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(sx, p1y, sw, p1h, 8);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(ts + 1);
  text('This run', sx + 8, p1y + 8);
  textStyle(NORMAL);

  const rows = [
    ['People sent', spawned + ' / ' + COHORT, 'black', false],
    ['People ill', counts.ill, 'crimson', false],
    ['Rescued midstream', counts.rescued, 'sienna', false],
    ['People treated', counts.treated, 'rebeccapurple', false],
    [small ? 'Burden left' : 'Burden remaining', counts.untreated, 'darkred', true]
  ];
  let y = p1y + 30;
  textSize(ts);
  for (const r of rows) {
    noStroke();
    textStyle(r[3] ? BOLD : NORMAL);
    fill(r[2]);
    textAlign(LEFT, TOP);
    text(r[0], sx + 8, y);
    textAlign(RIGHT, TOP);
    text(r[1], sx + sw - 8, y);
    y += rowH;
  }
  textStyle(NORMAL);

  // ---- panel 2: completed runs ----
  const p2y = p1y + p1h + 8;
  const p2h = 30 + 7 * rowH + 4;
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(sx, p2y, sw, p2h, 8);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(ts + 1);
  text('Completed runs', sx + 8, p2y + 8);

  // column positions (right edges for the numbers)
  const cBurden = sx + sw - 8;
  const cTreated = cBurden - (small ? 30 : 56);
  const cIll = cTreated - (small ? 28 : 56);
  const chipW = small ? 13 : 16;
  textSize(ts - 1);
  y = p2y + 30;
  fill('dimgray');
  text('Levers', sx + 8, y);
  textAlign(RIGHT, TOP);
  text('Ill', cIll, y);
  text(small ? 'Trt' : 'Treated', cTreated, y);
  text(small ? 'Left' : 'Burden', cBurden, y);
  textStyle(NORMAL);
  y += rowH;

  if (completedRuns.length === 0) {
    noStroke();
    fill('dimgray');
    textAlign(LEFT, TOP);
    textSize(ts - 1);
    text('No runs yet.', sx + 8, y);
  }
  for (const r of completedRuns) {
    // three chips: U, M, D
    const chips = [['U', r.u, 'seagreen'], ['M', r.m, 'sienna'], ['D', r.d, 'firebrick']];
    let cx = sx + 8;
    for (const ch of chips) {
      noStroke();
      fill(ch[1] ? ch[2] : 'gainsboro');
      rect(cx, y - 1, chipW, 15, 3);
      fill(ch[1] ? 'white' : 'gray');
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textSize(small ? 9.5 : 10.5);
      text(ch[0], cx + chipW / 2, y + 7);
      cx += chipW + 2;
    }
    textStyle(NORMAL);
    textSize(ts);
    fill('black');
    textAlign(LEFT, TOP);
    if (r.mixed) text('*', cx + 1, y);
    textAlign(RIGHT, TOP);
    text(r.ill, cIll, y);
    text(r.treated, cTreated, y);
    textStyle(BOLD);
    fill('darkred');
    text(r.burden, cBurden, y);
    textStyle(NORMAL);
    y += rowH;
  }

  // ---- footnote ----
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const fs = small ? 10.5 : 12;
  textSize(fs);
  let note = 'U, M, D = the three levers. Burden = people ill and never treated. ' +
    'Illustrative model, not real data.';
  if (completedRuns.some(r => r.mixed)) note = '* lever changed mid-run. ' + note;
  let ny = p2y + p2h + 6;
  for (const ln of wrapLines(note, sw - 10)) {
    noStroke();
    text(ln, sx + 4, ny);
    ny += fs + 3;
  }
}

function drawControlLabels() {
  // run status beside the buttons
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(canvasWidth < 560 ? 13 : defaultTextSize);
  let status;
  if (runState === 'idle') status = 'Choose levers, then press Start.';
  else if (runState === 'done') status = 'Run complete. Change levers and run again.';
  else status = 'Run in progress: ' + spawned + ' of ' + COHORT + ' people sent.';
  if (canvasWidth < 560) {
    // narrow layout: checkboxes are stacked beside the buttons, status goes below
    status = runState === 'active' ? spawned + ' of ' + COHORT + ' people sent' :
      (runState === 'done' ? 'Run complete' : 'Choose levers');
    text(status, 10, drawHeight + 62);
  } else {
    text(status, 190, drawHeight + 23);
  }
}

// ---------------------------------------------------------------------------
// interaction
// ---------------------------------------------------------------------------
function mousePressed() {
  for (const b of leverBoxes) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      b.cb.checked(!b.cb.checked());
      leverChanged();
      return;
    }
  }
}

function positionCheckboxes() {
  const colW = (canvasWidth - 20) / 3;
  const boxes = [housingCheckbox, smokingCheckbox, hospitalCheckbox];
  for (let i = 0; i < boxes.length; i++) {
    if (canvasWidth < 560) {
      boxes[i].position(190, drawHeight + 6 + i * 25);    // stacked beside the buttons
    } else {
      boxes[i].position(10 + i * colW, drawHeight + 50);  // one row under the buttons
    }
    boxes[i].style('font-size', canvasWidth < 680 ? '13px' : '15px');
    boxes[i].style('white-space', 'nowrap');
  }
}

// ---------------------------------------------------------------------------
// responsive sizing (required for all MicroSims)
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionCheckboxes();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  riverW = canvasWidth - sidebarWidth();
}
