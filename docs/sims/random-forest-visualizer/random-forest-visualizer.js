// Random Forest Decision Tree Visualizer
// CANVAS_HEIGHT: 600
// A small random forest (20 trees, each two splits deep) is trained in the
// browser on SYNTHETIC patient data when the page loads. Nothing here is real
// patient data or a real clinical risk model.
//   Left panel:  one tree, with the current patient's path highlighted.
//   Right panel: all 20 trees vote; a tally bar shows the forest prediction;
//                a small ROC curve shows how well the forest separates cases.
// The path highlight updates the moment a control changes. There is no timed
// animation (Bloom: Understand).

// ---- canvas layout (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 800;
let drawHeight = 485;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 8;
let defaultTextSize = 16;

// ---- forest settings ----
const N_TREES = 20;
const N_TRAIN = 600;         // synthetic training patients
const N_TEST = 1500;         // synthetic test patients for the ROC curve
const FEATURES_PER_SPLIT = 2; // each split may look at 2 of the 5 features
const MIN_LEAF = 15;
const SEED = 20260;

const HIGH_COLOR = 'firebrick';
const LOW_COLOR = 'seagreen';

// candidate split rules, grouped by the feature they use
const SPLITS = {
  age: [40, 45, 50, 55, 60, 65, 70].map(t => ({ label: 'Age ≥ ' + t + '?', test: p => p.age >= t })),
  bmi: [23, 25, 27, 30, 33, 35].map(t => ({ label: 'BMI ≥ ' + t + '?', test: p => p.bmi >= t })),
  smoke: [
    { label: 'Current smoker?', test: p => p.smoke === 2 },
    { label: 'Ever smoked?', test: p => p.smoke >= 1 }
  ],
  htn: [{ label: 'Hypertension?', test: p => p.htn }],
  activity: [{ label: 'Sedentary?', test: p => p.sed }]
};
const FEATURE_NAMES = Object.keys(SPLITS);

// ---- state ----
let forest = [];           // array of trees
let roc = null;            // {points:[{fpr,tpr}], auc}
let shownTree = 0;         // index of the tree in the left panel
let iconRects = [];        // clickable rectangles of the 20 tree icons

// ---- controls ----
let ageSlider, bmiSlider, smokeSelect, htnCheckbox, activeCheckbox, nextTreeButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  const mainEl = document.querySelector('main');

  buildForest();

  ageSlider = createSlider(30, 80, 62, 1);
  bmiSlider = createSlider(18, 45, 31, 1);
  ageSlider.parent(mainEl);
  bmiSlider.parent(mainEl);

  smokeSelect = createSelect();
  smokeSelect.parent(mainEl);
  for (const s of ['never', 'former', 'current']) smokeSelect.option(s);
  smokeSelect.selected('former');
  smokeSelect.style('font-size', '15px');

  htnCheckbox = createCheckbox(' Hypertension', true);
  activeCheckbox = createCheckbox(' Physically active', true);
  for (const c of [htnCheckbox, activeCheckbox]) {
    c.parent(mainEl);
    c.style('font-size', '15px');
    c.style('white-space', 'nowrap');
  }

  nextTreeButton = createButton('Show Another Tree');
  nextTreeButton.parent(mainEl);
  nextTreeButton.style('font-size', '15px');
  nextTreeButton.style('cursor', 'pointer');
  nextTreeButton.mousePressed(() => { shownTree = (shownTree + 1) % N_TREES; });

  positionControls();

  describe('The left panel shows one decision tree with two levels of yes or no questions ' +
    'about a patient, ending in four leaves that each give a predicted probability of disease. ' +
    'The path for the current patient is highlighted. The right panel shows twenty small tree ' +
    'icons, each colored by that tree\'s vote of high risk or low risk, a tally bar with the ' +
    'forest prediction, and a small ROC curve. Controls set the patient\'s age, body mass ' +
    'index, smoking status, hypertension, and physical activity.');
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

  const patient = readPatient();
  const votes = forest.map(t => predictTree(t, patient));   // {leaf, prob, high}

  // title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 560 ? 17 : 21);
  text(canvasWidth < 560 ? 'Random Forest Visualizer' :
    'Random Forest: One Tree and the Whole Forest', canvasWidth / 2, 8);

  drawTreePanel(patient, votes);
  drawForestPanel(votes);
  drawControlLabels(patient);
}

// ---------------------------------------------------------------------------
// synthetic data and training (runs once, in setup)
// ---------------------------------------------------------------------------
// small seeded random number generator so every reader sees the same forest
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One synthetic person. The "true" risk rises with age, BMI, smoking,
// hypertension, and a sedentary lifestyle. The coefficients are invented for
// teaching and do not come from any study.
function makePerson(rng) {
  const age = 30 + Math.floor(rng() * 51);
  // roughly bell-shaped BMI between 18 and 45
  const bmi = Math.round(constrain(18 + 27 * (rng() + rng() + rng()) / 3 - 4, 18, 45));
  const u = rng();
  const smoke = u < 0.5 ? 0 : (u < 0.8 ? 1 : 2);        // never, former, current
  const htn = rng() < 0.15 + 0.4 * (age - 30) / 50;
  const sed = rng() < 0.5;
  const logit = -3.9 + 0.07 * (age - 30) + 0.08 * (bmi - 18) +
    (smoke === 2 ? 1.2 : (smoke === 1 ? 0.5 : 0)) + (htn ? 1.0 : 0) + (sed ? 0.8 : 0);
  const risk = 1 / (1 + Math.exp(-logit));
  return { age: age, bmi: bmi, smoke: smoke, htn: htn, sed: sed, y: rng() < risk ? 1 : 0 };
}

function gini(pos, n) {
  if (n === 0) return 0;
  const q = pos / n;
  return 2 * q * (1 - q);
}

// best split of a set of rows, looking only at the given features
function bestSplit(rows, featureNames) {
  let best = null;
  for (const f of featureNames) {
    for (const rule of SPLITS[f]) {
      let nYes = 0, posYes = 0, nNo = 0, posNo = 0;
      for (const r of rows) {
        if (rule.test(r)) { nYes++; posYes += r.y; } else { nNo++; posNo += r.y; }
      }
      if (nYes < MIN_LEAF || nNo < MIN_LEAF) continue;
      const score = (nYes * gini(posYes, nYes) + nNo * gini(posNo, nNo)) / rows.length;
      if (best === null || score < best.score) best = { rule: rule, score: score };
    }
  }
  return best;
}

function pickFeatures(rng, k) {
  const pool = FEATURE_NAMES.slice();
  const out = [];
  while (out.length < k) out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
  return out;
}

function splitNode(rows, rng) {
  // random feature subset at each split; fall back to all features if needed
  let s = bestSplit(rows, pickFeatures(rng, FEATURES_PER_SPLIT));
  if (s === null) s = bestSplit(rows, FEATURE_NAMES);
  return s.rule;
}

function leafOf(rows) {
  let pos = 0;
  for (const r of rows) pos += r.y;
  const prob = rows.length > 0 ? pos / rows.length : 0;
  return { prob: prob, n: rows.length };
}

// A tree is {root, kids:[ruleNo, ruleYes], leaves:[4 leaves]}.
// Leaf order, left to right: No/No, No/Yes, Yes/No, Yes/Yes.
function trainTree(train, rng) {
  const sample = [];
  for (let i = 0; i < train.length; i++) sample.push(train[Math.floor(rng() * train.length)]);
  const root = splitNode(sample, rng);
  const noRows = sample.filter(r => !root.test(r));
  const yesRows = sample.filter(r => root.test(r));
  const kidNo = splitNode(noRows, rng);
  const kidYes = splitNode(yesRows, rng);
  return {
    root: root,
    kids: [kidNo, kidYes],
    leaves: [
      leafOf(noRows.filter(r => !kidNo.test(r))),
      leafOf(noRows.filter(r => kidNo.test(r))),
      leafOf(yesRows.filter(r => !kidYes.test(r))),
      leafOf(yesRows.filter(r => kidYes.test(r)))
    ]
  };
}

function predictTree(tree, p) {
  const a = tree.root.test(p) ? 1 : 0;
  const b = tree.kids[a].test(p) ? 1 : 0;
  const leaf = a * 2 + b;
  const prob = tree.leaves[leaf].prob;
  return { a: a, b: b, leaf: leaf, prob: prob, high: prob >= 0.5 };
}

function buildForest() {
  const rng = makeRng(SEED);
  const train = [];
  for (let i = 0; i < N_TRAIN; i++) train.push(makePerson(rng));
  forest = [];
  for (let t = 0; t < N_TREES; t++) forest.push(trainTree(train, rng));

  // ROC curve on fresh synthetic patients. Score = number of trees voting high.
  const scoresPos = [];
  const scoresNeg = [];
  for (let i = 0; i < N_TEST; i++) {
    const p = makePerson(rng);
    let k = 0;
    for (const t of forest) if (predictTree(t, p).high) k++;
    if (p.y === 1) scoresPos.push(k); else scoresNeg.push(k);
  }
  const points = [];     // points[k] = rates when "high risk" means at least k votes
  for (let k = 0; k <= N_TREES + 1; k++) {
    points.push({
      tpr: scoresPos.filter(s => s >= k).length / scoresPos.length,
      fpr: scoresNeg.filter(s => s >= k).length / scoresNeg.length
    });
  }
  let auc = 0;
  for (let k = 0; k <= N_TREES; k++) {
    auc += (points[k].fpr - points[k + 1].fpr) * (points[k].tpr + points[k + 1].tpr) / 2;
  }
  roc = { points: points, auc: auc };
}

// ---------------------------------------------------------------------------
// left panel: one tree
// ---------------------------------------------------------------------------
function leftPanelW() { return Math.floor(canvasWidth * 0.56); }

function drawTreePanel(patient, votes) {
  const px = margin;
  const py = 38;
  const pw = leftPanelW() - margin - 4;
  const ph = drawHeight - py - 8;
  const tree = forest[shownTree];
  const v = votes[shownTree];
  const narrow = pw < 300;

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 10);

  // heading
  noStroke();
  fill('black');
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  textSize(narrow ? 12 : 15);
  text('One tree: tree ' + (shownTree + 1) + ' of ' + N_TREES, px + 10, py + 8);
  textStyle(NORMAL);
  if (!narrow) {
    textAlign(RIGHT, TOP);
    textSize(12);
    fill('dimgray');
    text('gold path = this patient', px + pw - 10, py + 10);
  }

  // node positions
  const cx = px + pw / 2;
  const w = pw - 16;
  const rootY = py + 58;
  const kidY = py + 146;
  const leafY = py + 242;
  const kidX = [cx - w / 4, cx + w / 4];
  const leafX = [cx - 3 * w / 8, cx - w / 8, cx + w / 8, cx + 3 * w / 8];
  const bw = min(138, w / 2 - 10);
  const bh = 32;
  const lw = min(88, w / 4 - 6);
  const lh = 50;

  // edges (drawn first, under the boxes)
  drawEdge(cx, rootY + bh / 2, kidX[0], kidY - bh / 2, 'No', v.a === 0, narrow);
  drawEdge(cx, rootY + bh / 2, kidX[1], kidY - bh / 2, 'Yes', v.a === 1, narrow);
  for (let a = 0; a < 2; a++) {
    for (let b = 0; b < 2; b++) {
      const onPath = v.a === a && v.b === b;
      drawEdge(kidX[a], kidY + bh / 2, leafX[a * 2 + b], leafY - lh / 2, b === 1 ? 'Yes' : 'No', onPath, narrow);
    }
  }

  // split nodes
  drawSplitNode(cx, rootY, bw, bh, tree.root.label, true);
  drawSplitNode(kidX[0], kidY, bw, bh, tree.kids[0].label, v.a === 0);
  drawSplitNode(kidX[1], kidY, bw, bh, tree.kids[1].label, v.a === 1);

  // leaves
  for (let i = 0; i < 4; i++) {
    const leaf = tree.leaves[i];
    const high = leaf.prob >= 0.5;
    const active = v.leaf === i;
    stroke(active ? 'goldenrod' : 'silver');
    strokeWeight(active ? 4 : 1);
    fill(active ? (high ? HIGH_COLOR : LOW_COLOR) : (high ? 'mistyrose' : 'honeydew'));
    rect(leafX[i] - lw / 2, leafY - lh / 2, lw, lh, 8);
    noStroke();
    fill(active ? 'white' : (high ? HIGH_COLOR : 'darkgreen'));
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(narrow ? 12 : 16);
    text(Math.round(leaf.prob * 100) + '%', leafX[i], leafY - 10);
    textSize(narrow ? 8.5 : 11);
    text(high ? 'HIGH RISK' : 'LOW RISK', leafX[i], leafY + 12);
    textStyle(NORMAL);
  }

  // what this one tree says
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 15);
  fill(v.high ? HIGH_COLOR : 'darkgreen');
  text('This tree says: ' + (v.high ? 'HIGH RISK' : 'LOW RISK') + ' (' + Math.round(v.prob * 100) + '%)',
    cx, leafY + lh / 2 + 14);
  textStyle(NORMAL);

  // explanation, wrapped to the panel width
  fill('black');
  textAlign(LEFT, TOP);
  const ts = narrow ? 10.5 : 14;
  textSize(ts);
  const note = 'A leaf shows the share of training patients in that leaf who had the disease. ' +
    'Each tree was trained on a different random sample of the same ' + N_TRAIN +
    ' synthetic patients, and at each split it could choose from only ' + FEATURES_PER_SPLIT +
    ' of the 5 features. That is why the trees ask different questions.';
  let y = leafY + lh / 2 + 44;
  for (const ln of wrapLines(note, pw - 20)) {
    if (y + ts > py + ph - 6) break;
    noStroke();
    text(ln, px + 10, y);
    y += ts * 1.3;
  }
}

function drawEdge(x1, y1, x2, y2, label, onPath, narrow) {
  stroke(onPath ? 'goldenrod' : 'silver');
  strokeWeight(onPath ? 5 : 2);
  line(x1, y1, x2, y2);
  // Yes / No label on a small white patch at the middle of the edge
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  textSize(narrow ? 10 : 12);
  textStyle(onPath ? BOLD : NORMAL);
  const tw = textWidth(label) + 6;
  noStroke();
  fill('white');
  rect(mx - tw / 2, my - 8, tw, 16, 3);
  fill(onPath ? 'black' : 'gray');
  textAlign(CENTER, CENTER);
  text(label, mx, my);
  textStyle(NORMAL);
}

function drawSplitNode(x, y, w, h, label, onPath) {
  stroke(onPath ? 'goldenrod' : 'silver');
  strokeWeight(onPath ? 4 : 1.5);
  fill(onPath ? 'lightyellow' : 'whitesmoke');
  rect(x - w / 2, y - h / 2, w, h, 8);
  noStroke();
  fill(onPath ? 'black' : 'dimgray');
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  let ts = 14;
  textSize(ts);
  while (textWidth(label) > w - 8 && ts > 7) {
    ts -= 0.5;
    textSize(ts);
  }
  text(label, x, y + 1);
  textStyle(NORMAL);
}

// ---------------------------------------------------------------------------
// right panel: the forest vote and the ROC curve
// ---------------------------------------------------------------------------
function drawForestPanel(votes) {
  const px = leftPanelW() + 4;
  const py = 38;
  const pw = canvasWidth - px - margin;
  const ph = drawHeight - py - 8;
  const narrow = pw < 230;

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 10);

  noStroke();
  fill('black');
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  textSize(narrow ? 12 : 15);
  text('Forest vote: ' + N_TREES + ' trees', px + 10, py + 8);
  textStyle(NORMAL);

  // 5 x 4 grid of tree icons
  const gx = px + 8;
  const gy = py + 30;
  const cw = (pw - 16) / 5;
  const ch = 38;
  iconRects = [];
  for (let i = 0; i < N_TREES; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = gx + col * cw;
    const y = gy + row * ch;
    iconRects.push({ x: x, y: y, w: cw, h: ch });
    const ccx = x + cw / 2;
    const col_ = votes[i].high ? HIGH_COLOR : LOW_COLOR;

    // the tree shown in the left panel gets a gold frame
    if (i === shownTree) {
      stroke('goldenrod');
      strokeWeight(3);
      fill('lightyellow');
      rect(x + 2, y + 1, cw - 4, ch - 2, 6);
    }
    // trunk and canopy
    noStroke();
    fill('saddlebrown');
    rect(ccx - 2.5, y + 26, 5, 8);
    fill(col_);
    const half = min(14, cw / 2 - 3);
    triangle(ccx, y + 4, ccx - half, y + 28, ccx + half, y + 28);
    // H or L so that color is not the only cue
    fill('white');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(11);
    text(votes[i].high ? 'H' : 'L', ccx, y + 20);
    textStyle(NORMAL);
  }

  // vote tally
  const nHigh = votes.filter(v => v.high).length;
  const nLow = N_TREES - nHigh;
  const forestHigh = nHigh >= N_TREES / 2;
  const by = gy + 4 * ch + 8;
  const bx = px + 10;
  const bwid = pw - 20;
  noStroke();
  fill(HIGH_COLOR);
  rect(bx, by, bwid * nHigh / N_TREES, 16);
  fill(LOW_COLOR);
  rect(bx + bwid * nHigh / N_TREES, by, bwid * nLow / N_TREES, 16);
  // majority line at 50%
  stroke('black');
  strokeWeight(2);
  line(bx + bwid / 2, by - 3, bx + bwid / 2, by + 19);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(narrow ? 10.5 : 13);
  text(nHigh + (narrow ? ' HIGH, ' : ' trees say HIGH RISK, ') + nLow + (narrow ? ' LOW' : ' say LOW RISK'),
    bx, by + 23);
  textStyle(BOLD);
  fill(forestHigh ? HIGH_COLOR : 'darkgreen');
  textSize(narrow ? 11 : 14);
  let verdict = (narrow ? 'Forest: ' : 'Forest prediction: ') + (forestHigh ? 'HIGH RISK' : 'LOW RISK') +
    ' (' + Math.round(100 * nHigh / N_TREES) + '%)';
  if (nHigh === N_TREES / 2 && !narrow) verdict += ', a tie';
  text(verdict, bx, by + 41);
  textStyle(NORMAL);

  drawRoc(px, by + 66, pw, py + ph - (by + 66), nHigh, narrow);
}

// ROC curve of the forest on synthetic test patients
function drawRoc(px, top, pw, availH, nHigh, narrow) {
  if (availH < 110) return;
  const size = min(availH - 34, narrow ? pw - 46 : pw * 0.44, 132);
  const x0 = px + 36;
  const y0 = top + 6;

  // frame and diagonal
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x0, y0, size, size);
  stroke('gainsboro');
  line(x0, y0 + size, x0 + size, y0);

  // curve
  noFill();
  stroke('royalblue');
  strokeWeight(2.5);
  beginShape();
  for (const pt of roc.points) vertex(x0 + pt.fpr * size, y0 + size - pt.tpr * size);
  endShape();

  // operating point of the majority rule (at least half of the trees)
  const maj = roc.points[N_TREES / 2];
  stroke('white');
  strokeWeight(1);
  fill('black');
  circle(x0 + maj.fpr * size, y0 + size - maj.tpr * size, 9);

  // the strictest voting rule that would still flag this patient
  if (nHigh > 0) {
    const cur = roc.points[nHigh];
    noFill();
    stroke('darkorange');
    strokeWeight(3);
    circle(x0 + cur.fpr * size, y0 + size - cur.tpr * size, 15);
  }

  // axis labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('False positive rate', x0 + size / 2, y0 + size + 4);
  push();
  translate(x0 - 12, y0 + size / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('True positive rate', 0, 0);
  pop();
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('1', x0 - 3, y0 + 4);
  text('0', x0 - 3, y0 + size - 2);
  textAlign(RIGHT, TOP);
  text('1', x0 + size, y0 + size + 4);

  // notes beside the plot
  if (narrow) return;
  const nx = x0 + size + 10;
  const nw = px + pw - nx - 8;
  let y = y0;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  text('ROC curve', nx, y);
  y += 17;
  text('AUC = ' + nf(roc.auc, 1, 2), nx, y);
  textStyle(NORMAL);
  y += 20;
  textSize(12);
  const notes = [
    ['black', 'Majority rule: high risk if at least 10 of 20 trees agree.'],
    ['darkorange', nHigh > 0 ?
      'Strictest rule that still flags this patient: at least ' + nHigh + ' of 20.' :
      'This patient has 0 votes, so no voting rule flags them.']
  ];
  for (const n of notes) {
    if (n[0] === 'black') {
      noStroke();
      fill('black');
      circle(nx + 5, y + 6, 8);
    } else {
      noFill();
      stroke('darkorange');
      strokeWeight(2.5);
      circle(nx + 5, y + 6, 10);
    }
    noStroke();
    fill('black');
    for (const ln of wrapLines(n[1], nw - 16)) {
      noStroke();
      text(ln, nx + 15, y);
      y += 15;
    }
    y += 5;
  }
}

// greedy word wrap using the current textSize
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

// ---------------------------------------------------------------------------
// controls
// ---------------------------------------------------------------------------
function readPatient() {
  const smoke = { never: 0, former: 1, current: 2 }[smokeSelect.value()];
  return {
    age: ageSlider.value(),
    bmi: bmiSlider.value(),
    smoke: smoke,
    htn: htnCheckbox.checked(),
    sed: !activeCheckbox.checked()
  };
}

function sliderLabelW() { return canvasWidth < 520 ? 62 : 82; }

function positionControls() {
  const colW = canvasWidth / 2;
  const lw = sliderLabelW();
  // row 1: two sliders
  ageSlider.position(10 + lw, drawHeight + 10);
  ageSlider.size(colW - lw - 24);
  bmiSlider.position(colW + 10 + lw, drawHeight + 10);
  bmiSlider.size(colW - lw - 24);
  // row 2: smoking menu and two checkboxes
  const small = canvasWidth < 560;
  smokeSelect.position(small ? 72 : 84, drawHeight + 44);
  htnCheckbox.position(small ? 158 : colW * 0.62, drawHeight + 46);
  activeCheckbox.position(small ? 158 : colW * 1.2, small ? drawHeight + 68 : drawHeight + 46);
  for (const c of [htnCheckbox, activeCheckbox]) c.style('font-size', small ? '13px' : '15px');
  // row 3: button
  nextTreeButton.position(10, small ? drawHeight + 80 : drawHeight + 78);
  nextTreeButton.size(small ? 140 : 165, 28);
}

function drawControlLabels(patient) {
  const colW = canvasWidth / 2;
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(canvasWidth < 520 ? 13 : 15);
  text('Age: ' + patient.age, 10, drawHeight + 20);
  text('BMI: ' + patient.bmi, colW + 10, drawHeight + 20);
  text(canvasWidth < 560 ? 'Smoker:' : 'Smoking:', 10, drawHeight + 56);
  if (canvasWidth >= 560) {
    textSize(13);
    fill('dimgray');
    text('Click any tree in the forest to see it on the left.', 190, drawHeight + 92);
  }
}

// click a tree icon to show that tree in the left panel
function mousePressed() {
  for (let i = 0; i < iconRects.length; i++) {
    const r = iconRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      shownTree = i;
      return;
    }
  }
}

// ---------------------------------------------------------------------------
// responsive sizing (required for all MicroSims)
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
