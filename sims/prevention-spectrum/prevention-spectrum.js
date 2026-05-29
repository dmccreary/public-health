// IOM Prevention Spectrum
// CANVAS_HEIGHT: 620
let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let modeSel;       // 'iom' or 'classic'
let resetBtn;

let selectedLevel = -1;
let hoveredLevel = -1;

// Two parallel classifications. Indices ordered along the disease timeline:
// classic: primordial -> primary -> secondary -> tertiary
// iom:     universal -> selective -> indicated
// We render them as nested horizontal bands so the relationship is visible.

const classicLevels = [
  {
    name: 'Primordial',
    color: [30, 100, 70],
    definition: 'Prevent the underlying social and environmental conditions that allow risk factors to develop in the first place.',
    target: 'Whole populations or societies — before risk factors emerge.',
    example: 'Tobacco-free generation laws, agricultural policy to reduce sugar in the food supply.',
    cost: 'Very high cost-effectiveness; broad benefits but slow to show effects.'
  },
  {
    name: 'Primary',
    color: [60, 140, 100],
    definition: 'Prevent disease before it occurs by reducing exposure to known risk factors.',
    target: 'Healthy people exposed to risk — or eligible for protective measures.',
    example: 'Childhood immunizations, seatbelt laws, fluoridated water, tobacco taxes.',
    cost: 'Generally high cost-effectiveness; the workhorse of public health.'
  },
  {
    name: 'Secondary',
    color: [120, 180, 100],
    definition: 'Detect and treat disease in its earliest stages, before symptoms appear.',
    target: 'Asymptomatic individuals at risk of an unrecognized condition.',
    example: 'Mammography, colorectal-cancer screening, blood-pressure checks.',
    cost: 'Moderate cost-effectiveness; depends heavily on test accuracy and follow-up care.'
  },
  {
    name: 'Tertiary',
    color: [180, 200, 90],
    definition: 'Reduce harm and disability from established disease through treatment and rehabilitation.',
    target: 'People who already have the disease or condition.',
    example: 'Cardiac rehabilitation, diabetic foot care, stroke recovery programs.',
    cost: 'Lower cost-effectiveness per person but essential for those affected.'
  }
];

const iomLevels = [
  {
    name: 'Universal',
    color: [30, 95, 165],
    definition: 'Interventions offered to everyone in an eligible population regardless of individual risk.',
    target: 'All members of the population — no risk screening needed.',
    example: 'School-based universal mental-health screening; population-wide mass-media health campaigns.',
    cost: 'Lower per-person cost-effectiveness, but very wide reach.'
  },
  {
    name: 'Selective',
    color: [85, 140, 200],
    definition: 'Interventions targeted to subgroups whose risk is higher than average.',
    target: 'Subgroups identified by risk factors — but not yet showing symptoms.',
    example: 'Parenting programs for low-income families; smoking cessation for pregnant smokers.',
    cost: 'Higher per-person cost-effectiveness because efforts are focused.'
  },
  {
    name: 'Indicated',
    color: [150, 195, 235],
    definition: 'Interventions targeted to individuals already showing early signs or symptoms of the condition.',
    target: 'High-risk individuals with detectable early signs of the problem.',
    example: 'CBT for adolescents with subclinical depression; pre-diabetes lifestyle programs.',
    cost: 'High effectiveness for those reached, but limited population reach.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Segoe UI');

  modeSel = createSelect();
  modeSel.position(110, drawHeight + 22);
  modeSel.size(180, 30);
  modeSel.option('Both systems', 'both');
  modeSel.option('Classic only',  'classic');
  modeSel.option('IOM only',      'iom');
  modeSel.selected('both');
  modeSel.style('font-size', '13px');
  modeSel.changed(() => { selectedLevel = -1; });

  resetBtn = createButton('Reset');
  resetBtn.position(300, drawHeight + 22);
  resetBtn.size(80, 30);
  resetBtn.style('font-size', '13px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('background', '#6c757d');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.mousePressed(() => { selectedLevel = -1; });
}

function draw() {
  background(255);

  noStroke();
  fill('#1a3a6c');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("IOM Prevention Spectrum (vs. Classical Tiers)", containerWidth / 2, 8);
  textStyle(NORMAL);

  const mode = modeSel ? modeSel.value() : 'both';

  // Layout: bands left, panel right
  const bandsW = containerWidth * 0.58;
  const panelX = bandsW + 8;
  const panelW = containerWidth - panelX - 8;

  drawBands(20, 38, bandsW - 30, drawHeight - 50, mode);
  drawPanel(panelX, 38, panelW, drawHeight - 50);

  // Control strip
  fill(248);
  noStroke();
  rect(0, drawHeight, containerWidth, controlHeight);
  stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

  fill('#212529');
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Show:', 20, drawHeight + 37);
  textStyle(NORMAL);

  fill('#495057');
  textAlign(LEFT, TOP);
  textSize(12);
  text('Click any cell to read its definition, target population, example, and cost-effectiveness profile.',
       400, drawHeight + 26, containerWidth - 410);
  text('Use the dropdown to compare the classical tiers (primordial → tertiary) with the IOM spectrum (universal → indicated).',
       400, drawHeight + 46, containerWidth - 410);
}

function drawBands(x, y, w, h, mode) {
  // Timeline arrow at top
  noStroke();
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Disease timeline →', x, y);
  textStyle(NORMAL);

  // Determine which rows to draw
  const rows = [];
  if (mode === 'both' || mode === 'classic') rows.push({ id: 'classic', label: 'Classical tiers', data: classicLevels });
  if (mode === 'both' || mode === 'iom')     rows.push({ id: 'iom',     label: 'IOM spectrum',  data: iomLevels });

  const rowAreaTop = y + 24;
  const captionH = (mode === 'both') ? 36 : 0;
  const rowAreaH = h - 40 - captionH;
  const rowGap = 16;
  const rowH = (rowAreaH - (rows.length - 1) * rowGap) / rows.length;

  hoveredLevel = -1;

  for (let ri = 0; ri < rows.length; ri++) {
    const row = rows[ri];
    const ry = rowAreaTop + ri * (rowH + rowGap);

    // Row label
    fill('#495057');
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(row.label, x, ry - 16);
    textStyle(NORMAL);

    const cellW = w / row.data.length;
    for (let i = 0; i < row.data.length; i++) {
      const cx0 = x + cellW * i;
      const c = row.data[i];

      const levelKey = row.id + ':' + i;
      const isSel = selectedLevel === levelKey;
      let isHover = false;
      if (mouseX >= cx0 + 4 && mouseX <= cx0 + cellW - 4 &&
          mouseY >= ry && mouseY <= ry + rowH) {
        hoveredLevel = levelKey;
        isHover = true;
      }

      const baseR = c.color[0], baseG = c.color[1], baseB = c.color[2];
      const br = (isHover || isSel) ? 35 : 0;
      noStroke();
      fill(min(255, baseR + br), min(255, baseG + br), min(255, baseB + br));
      rect(cx0 + 4, ry, cellW - 8, rowH, 6);

      if (isSel) {
        noFill();
        stroke(255, 200, 0);
        strokeWeight(3);
        rect(cx0 + 4, ry, cellW - 8, rowH, 6);
        strokeWeight(1);
        noStroke();
      }

      // Cell label
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(min(15, rowH * 0.32));
      textStyle(BOLD);
      text(c.name, cx0 + cellW / 2, ry + rowH / 2 - 8);
      textSize(min(11, rowH * 0.22));
      textStyle(NORMAL);
      // Sub-caption indicating order
      let caption = (row.id === 'classic') ? ['Before risk', 'Reduce risk', 'Early detection', 'Limit harm'][i]
                                            : ['Whole pop.', 'High-risk groups', 'Early signs'][i];
      text(caption, cx0 + cellW / 2, ry + rowH / 2 + 12);
    }
  }

  // Bottom legend showing both systems align along the timeline
  if (mode === 'both') {
    noStroke();
    fill('#6c757d');
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(ITALIC);
    text('Classical tiers track disease stage; IOM levels track population risk. ' +
         'Both run left-to-right along the disease timeline.',
         x, y + h - 34, w);
    textStyle(NORMAL);
  }
}

function drawPanel(x, y, w, h) {
  fill(250, 251, 253);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();

  if (selectedLevel === -1 || !selectedLevel) {
    fill('#6c757d');
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(ITALIC);
    text('Click a cell on the left\nto explore that level.', x + w / 2, y + h / 2);
    textStyle(NORMAL);
    return;
  }

  const parts = String(selectedLevel).split(':');
  const sys = parts[0];
  const idx = parseInt(parts[1], 10);
  const data = (sys === 'classic') ? classicLevels[idx] : iomLevels[idx];
  if (!data) return;
  const sysLabel = (sys === 'classic') ? 'Classical tier' : 'IOM level';

  fill(data.color[0], data.color[1], data.color[2]);
  rect(x, y, w, 8, 6, 6, 0, 0);

  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text(sysLabel + ' #' + (idx + 1), x + 12, y + 18, w - 24);
  textSize(15);
  text(data.name, x + 12, y + 36, w - 24);
  textStyle(NORMAL);

  fill('#212529');
  textSize(12);
  text(data.definition, x + 12, y + 70, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Target population', x + 12, y + 150);
  textStyle(NORMAL);
  fill('#212529');
  text(data.target, x + 12, y + 168, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Public health example', x + 12, y + 220);
  textStyle(NORMAL);
  fill('#212529');
  text(data.example, x + 12, y + 238, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Cost-effectiveness profile', x + 12, y + 310);
  textStyle(NORMAL);
  fill('#212529');
  text(data.cost, x + 12, y + 328, w - 24);
}

function mousePressed() {
  if (hoveredLevel) selectedLevel = hoveredLevel;
}

function updateCanvasSize() {
  const el = document.querySelector('main');
  containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}
