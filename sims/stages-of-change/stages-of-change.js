// Stages of Change Visualizer (Transtheoretical Model)
// CANVAS_HEIGHT: 560
// Five people move through the five Stages of Change. The info panel shows the
// stage definition, motivational state, stage-matched intervention, and a
// smoking-cessation example for the selected person's current stage.
// Step-through interaction (Bloom: Understand) - nothing moves unless the
// student clicks a button. The relapse arrows pulse only while the mouse is
// over the canvas.

// ---- canvas layout (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 800;
let drawHeight = 510;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 16;

// ---- vertical layout of the drawing region ----
const BOX_TOP = 108;      // top of the five stage boxes
const BOX_H = 58;         // height of the stage boxes
const PERSON_Y = 212;     // vertical center of the person icons
const STATUS_Y = 252;     // status / instruction line
const PANEL_TOP = 270;    // top of the info panel
const STAGE_GAP = 20;     // horizontal gap between stage boxes

// ---- content: the five stages (Prochaska & DiClemente) ----
const STAGES = [
  {
    name: 'Precontemplation',
    split: ['Precontem-', 'plation'],
    color: 'dimgray',
    definition: 'Not considering change within the next six months, often from lack of awareness or demoralization after past attempts.',
    state: 'Unaware, resistant, or discouraged. The cons of changing seem to outweigh the pros.',
    intervention: 'Raise awareness: offer personally relevant information and feedback without pressure to act.',
    example: 'A smoker says "I am not interested in quitting." A clinician gives brief, non-judgmental facts about personal health risks.'
  },
  {
    name: 'Contemplation',
    split: ['Contem-', 'plation'],
    color: 'royalblue',
    definition: 'Aware of the problem and considering change within the next six months, but not yet committed to act.',
    state: 'Ambivalent. Weighing the pros and cons of changing; may stay here for a long time.',
    intervention: 'Resolve ambivalence: motivational interviewing and decisional-balance (pros versus cons) exercises.',
    example: 'A smoker who plans to quit "someday" lists reasons to quit and reasons to keep smoking with a counselor.'
  },
  {
    name: 'Preparation',
    split: ['Prepa-', 'ration'],
    color: 'slateblue',
    definition: 'Intends to act within the next 30 days and may already have taken small preparatory steps.',
    state: 'Committed and planning. Confidence is building, but the plan is not yet tested.',
    intervention: 'Plan for action: set a start date, build a concrete plan, and line up support.',
    example: 'A smoker sets a quit date, tells family and friends, and asks a pharmacist about nicotine replacement.'
  },
  {
    name: 'Action',
    split: ['Action', ''],
    color: 'teal',
    definition: 'Has made an overt behavior change within the past six months.',
    state: 'Actively working at change. Motivated, but at high risk of relapse.',
    intervention: 'Skills and support: coping skills, social support, reinforcement, and managing triggers.',
    example: 'A smoker who quit three weeks ago uses a nicotine patch, calls a quitline coach, and avoids smoking breaks.'
  },
  {
    name: 'Maintenance',
    split: ['Mainte-', 'nance'],
    color: 'darkgreen',
    definition: 'Has sustained the change for more than six months and is working to prevent relapse.',
    state: 'Growing confidence and less temptation, but still watchful.',
    intervention: 'Relapse prevention: anticipate high-risk situations and plan how to recover from a slip.',
    example: 'A person smoke-free for a year plans how to handle stress and social events without cigarettes.'
  }
];

const FIELD_LABELS = ['Definition', 'Motivational state', 'Best intervention', 'Smoking example'];
const FIELD_KEYS = ['definition', 'state', 'intervention', 'example'];
const RELAPSE_TARGET = 1;   // relapse arrows return to Contemplation

const PERSON_COLORS = ['crimson', 'darkorange', 'goldenrod', 'mediumseagreen', 'mediumorchid'];

// ---- state ----
let personStage = [0, 0, 0, 0, 0];   // current stage index of each person
let selectedPerson = 0;
let lastMoveWasRelapse = false;
let pulsePhase = 0;
let mouseOverCanvas = false;

// ---- controls ----
let backButton, forwardButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // only animate the relapse pulse while the mouse is over the canvas
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  backButton = createButton('← Back');
  backButton.parent(document.querySelector('main'));
  backButton.position(10, drawHeight + 10);
  backButton.size(100, 30);
  backButton.mousePressed(moveBack);

  forwardButton = createButton('Forward →');
  forwardButton.parent(document.querySelector('main'));
  forwardButton.position(118, drawHeight + 10);
  forwardButton.size(100, 30);
  forwardButton.mousePressed(moveForward);

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(226, drawHeight + 10);
  resetButton.size(70, 30);
  resetButton.mousePressed(resetAll);

  for (const b of [backButton, forwardButton, resetButton]) {
    b.style('font-size', '15px');
    b.style('cursor', 'pointer');
  }
  updateButtons();

  describe('Five stage boxes in a row: Precontemplation, Contemplation, Preparation, Action, ' +
    'and Maintenance, joined by forward arrows, with orange relapse arrows curving back from ' +
    'Action and Maintenance to Contemplation. Five person icons stand under their current ' +
    'stage. Click a person, then use the Back and Forward buttons to move that person. An ' +
    'information panel gives the definition, motivational state, recommended intervention, ' +
    'and a smoking-cessation example for the selected stage.');
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

  if (mouseOverCanvas) pulsePhase += 0.06;

  // title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 520 ? 18 : 22);
  text('Stages of Change (Transtheoretical Model)', canvasWidth / 2, 8);

  drawRelapseArrows();
  drawForwardArrows();
  drawStageBoxes();
  drawPeople();
  drawStatusLine();
  drawInfoPanel();
  drawControlLabel();
}

// ---------------------------------------------------------------------------
// geometry helpers
// ---------------------------------------------------------------------------
function stageGap() {
  return canvasWidth < 520 ? 12 : STAGE_GAP;
}

function stageBoxW() {
  return (canvasWidth - 2 * margin - 4 * stageGap()) / 5;
}

function stageX(i) {
  return margin + i * (stageBoxW() + stageGap());
}

function stageCenterX(i) {
  return stageX(i) + stageBoxW() / 2;
}

// x position of every person, grouped under the stage they are in
function personPositions() {
  const pos = [];
  const bw = stageBoxW();
  for (let s = 0; s < STAGES.length; s++) {
    const here = [];
    for (let p = 0; p < personStage.length; p++) {
      if (personStage[p] === s) here.push(p);
    }
    const spacing = min(26, (bw + stageGap() - 6) / max(here.length, 1));
    for (let k = 0; k < here.length; k++) {
      pos[here[k]] = {
        x: stageCenterX(s) + (k - (here.length - 1) / 2) * spacing,
        y: PERSON_Y
      };
    }
  }
  return pos;
}

// ---------------------------------------------------------------------------
// drawing
// ---------------------------------------------------------------------------
function drawStageBoxes() {
  const bw = stageBoxW();
  const current = personStage[selectedPerson];
  for (let i = 0; i < STAGES.length; i++) {
    const x = stageX(i);
    // highlight the stage of the selected person
    if (i === current) {
      stroke('gold');
      strokeWeight(5);
    } else {
      stroke('white');
      strokeWeight(1);
    }
    fill(STAGES[i].color);
    rect(x, BOX_TOP, bw, BOX_H, 8);

    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    if (bw >= 112) {
      // single-line name, sized to fit the box
      textSize(12);
      text('STAGE ' + (i + 1), x + bw / 2, BOX_TOP + 15);
      let ts = 16;
      textSize(ts);
      while (textWidth('Precontemplation') > bw - 10 && ts > 9) {
        ts -= 0.5;
        textSize(ts);
      }
      text(STAGES[i].name, x + bw / 2, BOX_TOP + 37);
    } else {
      // narrow layout: hyphenate the name over two lines
      let ts = 13;
      textSize(ts);
      while (textWidth('Precontem-') > bw - 6 && ts > 7) {
        ts -= 0.5;
        textSize(ts);
      }
      if (STAGES[i].split[1] === '') {
        text(STAGES[i].split[0], x + bw / 2, BOX_TOP + BOX_H / 2);
      } else {
        text(STAGES[i].split[0], x + bw / 2, BOX_TOP + BOX_H / 2 - ts * 0.6);
        text(STAGES[i].split[1], x + bw / 2, BOX_TOP + BOX_H / 2 + ts * 0.6);
      }
    }
    textStyle(NORMAL);
  }
}

function drawForwardArrows() {
  const bw = stageBoxW();
  const y = BOX_TOP + BOX_H / 2;
  for (let i = 0; i < STAGES.length - 1; i++) {
    const x1 = stageX(i) + bw + 3;
    const x2 = stageX(i + 1) - 3;
    stroke('black');
    strokeWeight(2);
    line(x1, y, x2 - 4, y);
    noStroke();
    fill('black');
    triangle(x2, y, x2 - 8, y - 5, x2 - 8, y + 5);
  }
}

// Two relapse arrows curve back from Action and Maintenance to Contemplation.
function drawRelapseArrows() {
  const pulse = 0.5 + 0.5 * sin(pulsePhase);     // 0..1
  const arrowColor = color(255, 140 - 40 * pulse, 0, 170 + 85 * pulse);
  const weight = 3 + 2 * pulse;
  const bw = stageBoxW();
  const fromStages = [3, 4];
  const lifts = [64, 92];                        // how high each arc rises
  const endOffsets = [bw * 0.18, -bw * 0.18];    // separate the two arrowheads

  for (let k = 0; k < fromStages.length; k++) {
    const x1 = stageCenterX(fromStages[k]);
    const x2 = stageCenterX(RELAPSE_TARGET) + endOffsets[k];
    const y = BOX_TOP - 4;
    const cy = BOX_TOP - lifts[k];
    noFill();
    stroke(arrowColor);
    strokeWeight(weight);
    bezier(x1, y, x1, cy, x2, cy, x2, y - 8);
    noStroke();
    fill(arrowColor);
    triangle(x2, y + 2, x2 - 7, y - 10, x2 + 7, y - 10);
  }

  // label the arcs
  noStroke();
  fill('chocolate');
  textStyle(BOLD);
  textSize(canvasWidth < 520 ? 12 : 15);
  textAlign(CENTER, CENTER);
  const labelX = (stageCenterX(RELAPSE_TARGET) + stageCenterX(3)) / 2;
  text(canvasWidth < 520 ? 'Relapse' : 'Relapse: normal and expected', labelX, BOX_TOP - 16);
  textStyle(NORMAL);
}

function drawPeople() {
  const pos = personPositions();
  // draw the selected person last so it is on top
  const order = [0, 1, 2, 3, 4].filter(p => p !== selectedPerson);
  order.push(selectedPerson);
  for (const p of order) {
    const x = pos[p].x;
    const y = pos[p].y;
    if (p === selectedPerson) {
      noStroke();
      fill('gold');
      ellipse(x, y, 40, 54);
      stroke('black');
      strokeWeight(2);
    } else {
      stroke('white');
      strokeWeight(1.5);
    }
    fill(PERSON_COLORS[p]);
    // body then head
    rect(x - 10, y - 4, 20, 24, 9, 9, 3, 3);
    circle(x, y - 13, 15);
    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    text(p + 1, x, y + 9);
    textStyle(NORMAL);
  }
}

function drawStatusLine() {
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(canvasWidth < 560 ? 12 : 15);
  if (lastMoveWasRelapse) {
    fill('chocolate');
    textStyle(BOLD);
    text(canvasWidth < 640 ?
      'Relapse is normal, not failure.' :
      'Relapse is a normal part of change, not failure. Most people recycle through stages.',
      canvasWidth / 2, STATUS_Y);
    textStyle(NORMAL);
  } else {
    fill('black');
    text(canvasWidth < 640 ?
      'Click a person, then use the buttons.' :
      'Click a person, then use the buttons below to move that person through the stages.',
      canvasWidth / 2, STATUS_Y);
  }
}

function drawInfoPanel() {
  const stage = STAGES[personStage[selectedPerson]];
  const px = margin;
  const pw = canvasWidth - 2 * margin;
  const ph = drawHeight - PANEL_TOP - 10;
  const headerH = 32;

  // panel body
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, PANEL_TOP, pw, ph, 10);

  // colored header band
  noStroke();
  fill(stage.color);
  rect(px, PANEL_TOP, pw, headerH, 10, 10, 0, 0);
  fill('white');
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(canvasWidth < 520 ? 13 : 17);
  text('Person ' + (selectedPerson + 1) + ' is in Stage ' +
    (personStage[selectedPerson] + 1) + ': ' + stage.name, px + 12, PANEL_TOP + headerH / 2);
  textStyle(NORMAL);

  // four labeled fields; shrink the font until everything fits the panel
  const stacked = pw < 560;                 // narrow: label above its text
  const labelW = stacked ? 0 : 150;
  const textX = px + 12 + labelW;
  const textW = pw - 24 - labelW;
  const bodyTop = PANEL_TOP + headerH + 10;
  const bodyH = ph - headerH - 16;

  let ts = 16;
  let layout = layoutFields(stage, ts, textW, stacked);
  while (layout.height > bodyH && ts > 9) {
    ts -= 0.5;
    layout = layoutFields(stage, ts, textW, stacked);
  }

  const lineH = ts * 1.3;
  let y = bodyTop;
  textAlign(LEFT, TOP);
  for (let f = 0; f < FIELD_KEYS.length; f++) {
    noStroke();
    textSize(ts);
    textStyle(BOLD);
    fill(stage.color);
    text(FIELD_LABELS[f], px + 12, y);
    textStyle(NORMAL);
    if (stacked) y += lineH;
    fill('black');
    for (const ln of layout.lines[f]) {
      noStroke();
      text(ln, textX, y);
      y += lineH;
    }
    y += layout.gap;
  }
}

// word-wrap all four fields at a given text size and report the total height
function layoutFields(stage, ts, textW, stacked) {
  textSize(ts);
  textStyle(NORMAL);
  const lineH = ts * 1.3;
  const gap = ts * 0.55;
  const lines = [];
  let h = 0;
  for (const key of FIELD_KEYS) {
    const wrapped = wrapLines(stage[key], textW);
    lines.push(wrapped);
    h += wrapped.length * lineH + gap + (stacked ? lineH : 0);
  }
  return { lines: lines, height: h, gap: gap };
}

// simple greedy word wrap using the current textSize
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

function drawControlLabel() {
  if (canvasWidth < 560) return;   // no room beside the buttons
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Selected: Person ' + (selectedPerson + 1) + ' (' +
    STAGES[personStage[selectedPerson]].name + ')', 310, drawHeight + 25);
}

// ---------------------------------------------------------------------------
// interaction
// ---------------------------------------------------------------------------
function moveForward() {
  if (personStage[selectedPerson] < STAGES.length - 1) {
    personStage[selectedPerson]++;
    lastMoveWasRelapse = false;
  }
  updateButtons();
}

// Back from Action or Maintenance is a relapse: the person follows the orange
// arrow back to Contemplation. From earlier stages, Back moves one stage.
function moveBack() {
  const s = personStage[selectedPerson];
  if (s >= 3) {
    personStage[selectedPerson] = RELAPSE_TARGET;
    lastMoveWasRelapse = true;
  } else if (s > 0) {
    personStage[selectedPerson] = s - 1;
    lastMoveWasRelapse = false;
  }
  updateButtons();
}

function resetAll() {
  personStage = [0, 0, 0, 0, 0];
  selectedPerson = 0;
  lastMoveWasRelapse = false;
  updateButtons();
}

function updateButtons() {
  const s = personStage[selectedPerson];
  backButton.html(s >= 3 ? '← Relapse' : '← Back');
  if (s === 0) backButton.attribute('disabled', '');
  else backButton.removeAttribute('disabled');
  if (s === STAGES.length - 1) forwardButton.attribute('disabled', '');
  else forwardButton.removeAttribute('disabled');
}

// click a person icon to select it
function mousePressed() {
  if (mouseY > drawHeight) return;
  const pos = personPositions();
  let best = -1;
  let bestD = 24;
  for (let p = 0; p < pos.length; p++) {
    const d = dist(mouseX, mouseY, pos[p].x, pos[p].y);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  if (best >= 0) {
    selectedPerson = best;
    lastMoveWasRelapse = false;
    updateButtons();
  }
}

// ---------------------------------------------------------------------------
// responsive sizing (required for all MicroSims)
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
