// Dahlgren-Whitehead Rainbow Model
// CANVAS_HEIGHT: 560
let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let resetBtn;
let selectedLayer = -1;
let hoveredLayer = -1;
let mouseXpos = 0, mouseYpos = 0;

// Layers from innermost to outermost (the spec lists 5 substantive layers + a label ring)
const layers = [
  {
    name: 'Age, Sex & Heredity',
    color: [40, 70, 130],       // dark blue
    hoverColor: [70, 105, 175],
    definition: 'Biological and genetic factors that are fixed or change only with age. These set the baseline for individual health risk.',
    examples: [
      'Genetic predisposition to breast cancer (BRCA1/2)',
      'Sickle cell trait inheritance',
      'Age-related decline in immune function'
    ]
  },
  {
    name: 'Individual Lifestyle Factors',
    color: [225, 130, 50],      // orange
    hoverColor: [250, 165, 85],
    definition: 'Personal behaviors and choices that influence health. These are shaped by — but not reducible to — the outer rings.',
    examples: [
      'Tobacco and alcohol use',
      'Diet and physical activity patterns',
      'Sleep and stress management'
    ]
  },
  {
    name: 'Social & Community Networks',
    color: [80, 150, 90],       // green
    hoverColor: [115, 190, 125],
    definition: 'Family, friends, and community ties that provide social support or social strain. Strong networks buffer stress and spread health-promoting norms.',
    examples: [
      'Family caregiving and social support',
      'Religious and civic group membership',
      'Neighborhood social cohesion'
    ]
  },
  {
    name: 'Living & Working Conditions',
    color: [60, 140, 145],      // teal
    hoverColor: [95, 180, 185],
    definition: 'The day-to-day environments where people live, learn, work, and play. These conditions create the opportunities and constraints for healthy choices.',
    examples: [
      'Housing quality and overcrowding',
      'Workplace safety and job security',
      'Access to primary care and healthy food'
    ]
  },
  {
    name: 'Socioeconomic & Cultural Conditions',
    color: [110, 70, 145],      // purple
    hoverColor: [150, 105, 185],
    definition: 'The broadest forces — economic policy, cultural values, climate, and governance — that structure all the inner layers.',
    examples: [
      'National health insurance policy',
      'Air quality regulation and climate change',
      'Cultural norms around gender and disability'
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Segoe UI');

  resetBtn = createButton('Reset');
  resetBtn.position(20, drawHeight + 25);
  resetBtn.size(90, 32);
  resetBtn.style('font-size', '14px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('background', '#1a3a6c');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.mousePressed(() => { selectedLayer = -1; });
}

function draw() {
  background(255);

  // Title
  noStroke();
  fill('#1a3a6c');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Dahlgren-Whitehead Rainbow Model of Health Determinants', containerWidth / 2, 10);
  textStyle(NORMAL);

  // Layout regions
  const arcAreaW = containerWidth * 0.55;
  const panelX = arcAreaW + 10;
  const panelW = containerWidth - panelX - 10;

  drawRainbow(arcAreaW, drawHeight);
  drawPanel(panelX, 40, panelW, drawHeight - 60);

  // Controls panel background
  fill(248);
  noStroke();
  rect(0, drawHeight, containerWidth, controlHeight);
  stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

  // Instruction text
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Click a colored arc band to see its definition and examples. Hover to preview.',
       125, drawHeight + 25);
  text('Each outer ring shapes and constrains the rings inside it.',
       125, drawHeight + 45);

  // Tooltip
  if (hoveredLayer >= 0 && hoveredLayer < layers.length && selectedLayer !== hoveredLayer) {
    drawTooltip(layers[hoveredLayer].name, mouseXpos, mouseYpos);
  }
}

function drawRainbow(areaW, areaH) {
  // Center near bottom of arc area so the upper hemisphere fits
  const cx = areaW / 2;
  const cy = areaH - 20;
  const maxR = min(areaW * 0.48, areaH - 50);
  const innerR = maxR * 0.18;
  const bandW = (maxR - innerR) / layers.length;

  hoveredLayer = -1;
  const mdx = mouseX - cx;
  const mdy = mouseY - cy;
  const mDist = sqrt(mdx * mdx + mdy * mdy);
  const isUpper = mdy <= 0 && mDist >= innerR && mDist <= maxR;

  for (let i = layers.length - 1; i >= 0; i--) {
    const rOuter = innerR + bandW * (i + 1);
    const rInner = innerR + bandW * i;
    const isSel = selectedLayer === i;
    let isHover = false;
    if (isUpper && mDist >= rInner && mDist <= rOuter) {
      hoveredLayer = i;
      isHover = true;
      mouseXpos = mouseX;
      mouseYpos = mouseY;
    }
    const c = (isHover || isSel) ? layers[i].hoverColor : layers[i].color;
    noStroke();
    fill(c[0], c[1], c[2]);
    arc(cx, cy, rOuter * 2, rOuter * 2, PI, TWO_PI, PIE);

    // Carve inner ring out
    fill(255);
    arc(cx, cy, rInner * 2, rInner * 2, PI, TWO_PI, PIE);

    if (isSel) {
      noFill();
      stroke(255, 200, 0);
      strokeWeight(3);
      arc(cx, cy, rOuter * 2, rOuter * 2, PI, TWO_PI);
      strokeWeight(1);
      noStroke();
    }
  }

  // Innermost "person" disc
  fill(245, 240, 230);
  stroke(180);
  strokeWeight(1);
  arc(cx, cy, innerR * 2, innerR * 2, PI, TWO_PI, PIE);
  noStroke();
  fill('#1a3a6c');
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Individual', cx, cy - innerR * 0.55);
  textStyle(NORMAL);

  // Curved labels on each band
  textAlign(CENTER, CENTER);
  for (let i = 0; i < layers.length; i++) {
    const rMid = innerR + bandW * (i + 0.5);
    drawArcLabel(layers[i].name, cx, cy, rMid, bandW);
  }
}

function drawArcLabel(label, cx, cy, r, bandW) {
  // Place label at top of band (angle = -PI/2)
  push();
  translate(cx, cy);
  fill(255);
  noStroke();
  textSize(min(12, bandW * 0.34));
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // Truncate intelligently to fit within band arc top
  let display = label;
  const maxPxW = r * 2.2;
  while (textWidth(display) > maxPxW && display.length > 6) {
    display = display.substring(0, display.length - 2) + '…';
  }
  text(display, 0, -r + bandW * 0.35);
  textStyle(NORMAL);
  pop();
}

function drawPanel(x, y, w, h) {
  // Panel background
  fill(250, 251, 253);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();

  if (selectedLayer < 0) {
    fill('#6c757d');
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(ITALIC);
    text('Click a band on the left\nto explore that layer.', x + w / 2, y + h / 2);
    textStyle(NORMAL);
    return;
  }

  const L = layers[selectedLayer];
  // Color bar
  fill(L.color[0], L.color[1], L.color[2]);
  rect(x, y, w, 8, 6, 6, 0, 0);

  // Heading
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text('Layer ' + (selectedLayer + 1) + ': ' + L.name, x + 12, y + 20, w - 24);
  textStyle(NORMAL);

  // Definition
  fill('#212529');
  textSize(12);
  let defY = y + 70;
  text(L.definition, x + 12, defY, w - 24);

  // Examples heading
  let exY = defY + 78;
  fill('#1a3a6c');
  textSize(13);
  textStyle(BOLD);
  text('Examples:', x + 12, exY);
  textStyle(NORMAL);

  fill('#212529');
  textSize(12);
  for (let i = 0; i < L.examples.length; i++) {
    text('• ' + L.examples[i], x + 18, exY + 22 + i * 36, w - 30);
  }
}

function drawTooltip(label, mx, my) {
  textSize(12);
  const tw = textWidth(label) + 16;
  const th = 22;
  let tx = mx + 14;
  let ty = my - 28;
  if (tx + tw > containerWidth) tx = mx - tw - 8;
  if (ty < 4) ty = my + 18;
  fill(40, 40, 40, 230);
  noStroke();
  rect(tx, ty, tw, th, 4);
  fill(255);
  textAlign(LEFT, CENTER);
  text(label, tx + 8, ty + th / 2);
}

function mousePressed() {
  if (hoveredLayer >= 0) {
    selectedLayer = hoveredLayer;
  }
}

function updateCanvasSize() {
  const el = document.querySelector('main');
  containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}
