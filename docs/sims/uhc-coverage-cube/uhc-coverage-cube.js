// WHO Universal Health Coverage Cube
// CANVAS_HEIGHT: 640
let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Three normalized coverage values (0..1)
let popCov = 0.55;
let svcCov = 0.55;
let finCov = 0.55;

let popSlider, svcSlider, finSlider;
let lowBtn, midBtn, highBtn;

let selectedFace = null;     // 'population' | 'services' | 'financial' | null
let hoveredFace = null;

// Hit-test polygons (recomputed each frame)
let polyPopulation = null;   // top face (population)
let polyServices = null;     // right face (services)
let polyFinancial = null;    // front face (financial protection)

const FACE_INFO = {
  population: {
    title: 'Population coverage (Who?)',
    body: 'What share of the population is included in the coverage system? Higher values mean more people are eligible for the included services with financial protection.'
  },
  services: {
    title: 'Service coverage (What?)',
    body: 'How broad is the package of services included? Narrow systems cover only emergency or hospital care; broader systems include prevention, primary care, mental health, and rehabilitation.'
  },
  financial: {
    title: 'Financial protection (How much?)',
    body: 'What share of cost is publicly funded vs paid out of pocket? Higher values mean less risk of catastrophic health spending pushing households into poverty.'
  }
};

const PRESETS = {
  low:  { pop: 0.35, svc: 0.30, fin: 0.25, label: 'Low-income country' },
  mid:  { pop: 0.60, svc: 0.55, fin: 0.55, label: 'Middle-income country' },
  high: { pop: 0.92, svc: 0.85, fin: 0.85, label: 'High-income country' }
};

let currentPreset = 'mid';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Segoe UI');

  const baseY = drawHeight + 14;

  popSlider = createSlider(0, 100, 55, 1);
  popSlider.position(170, baseY);
  popSlider.style('width', '200px');

  svcSlider = createSlider(0, 100, 55, 1);
  svcSlider.position(170, baseY + 28);
  svcSlider.style('width', '200px');

  finSlider = createSlider(0, 100, 55, 1);
  finSlider.position(170, baseY + 56);
  finSlider.style('width', '200px');

  lowBtn  = createButton('Low-income');
  midBtn  = createButton('Middle-income');
  highBtn = createButton('High-income');

  lowBtn.position(450, baseY);
  midBtn.position(540, baseY);
  highBtn.position(645, baseY);

  styleBtn(lowBtn,  '#a14c4c');
  styleBtn(midBtn,  '#a17a4c');
  styleBtn(highBtn, '#3a7a4a');

  lowBtn.size(85, 26);
  midBtn.size(100, 26);
  highBtn.size(90, 26);

  lowBtn.mousePressed(() => applyPreset('low'));
  midBtn.mousePressed(() => applyPreset('mid'));
  highBtn.mousePressed(() => applyPreset('high'));

  // Initialize to middle-income default
  applyPreset('mid');
}

function styleBtn(b, bg) {
  b.style('font-size', '12px');
  b.style('cursor', 'pointer');
  b.style('background', bg);
  b.style('color', 'white');
  b.style('border', 'none');
  b.style('border-radius', '4px');
}

function applyPreset(name) {
  const p = PRESETS[name];
  currentPreset = name;
  popSlider.value(Math.round(p.pop * 100));
  svcSlider.value(Math.round(p.svc * 100));
  finSlider.value(Math.round(p.fin * 100));
}

function draw() {
  background(255);

  popCov = popSlider.value() / 100;
  svcCov = svcSlider.value() / 100;
  finCov = finSlider.value() / 100;

  // Detect preset deviation
  const cur = PRESETS[currentPreset];
  if (cur) {
    if (abs(cur.pop - popCov) > 0.02 || abs(cur.svc - svcCov) > 0.02 || abs(cur.fin - finCov) > 0.02) {
      currentPreset = 'custom';
    }
  }

  noStroke();
  fill('#1a3a6c');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('WHO Universal Health Coverage Cube', containerWidth / 2, 8);
  textStyle(NORMAL);

  // Layout: cube on left ~58%, panel on right ~42%
  const cubeW = containerWidth * 0.58;
  const panelX = cubeW + 8;
  const panelW = containerWidth - panelX - 8;

  drawCube(20, 38, cubeW - 40, drawHeight - 50);
  drawPanel(panelX, 38, panelW, drawHeight - 50);

  // Control strip background
  fill(248);
  noStroke();
  rect(0, drawHeight, containerWidth, controlHeight);
  stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

  const baseY = drawHeight + 14;
  fill('#212529');
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Population covered:', 20, baseY + 11);
  text('Services included:', 20, baseY + 39);
  text('Financial protection:', 20, baseY + 67);
  textStyle(NORMAL);

  // Slider value badges
  text(Math.round(popCov * 100) + '%', 380, baseY + 11);
  text(Math.round(svcCov * 100) + '%', 380, baseY + 39);
  text(Math.round(finCov * 100) + '%', 380, baseY + 67);

  textStyle(BOLD);
  text('Presets:', 450, baseY + 39);
  textStyle(NORMAL);

  // Hint text at the bottom
  fill('#495057');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Click a colored face of the cube to read what that dimension means.',
       20, baseY + 95, containerWidth - 40);
  text('Drag the sliders or pick a preset to see how coverage profiles differ across country income groups.',
       20, baseY + 113, containerWidth - 40);
}

function drawCube(x, y, w, h) {
  // Isometric-like projection
  const cx = x + w / 2;
  const cy = y + h - 60;             // anchor near bottom so cube grows upward
  const size = min(w * 0.32, h * 0.55);
  // Axes in screen space
  // X axis: services depth -> upper-right
  // Y axis: population height -> up
  // Z axis: financial protection -> lower-right
  const axU = createVector(cos(radians(-30)) * size, sin(radians(-30)) * size); // services axis (back-right)
  const axV = createVector(0, -size);                                            // population axis (up)
  const axW = createVector(cos(radians(-150)) * size, sin(radians(-150)) * size); // financial axis (back-left)
  // origin at lower-front corner
  const O = createVector(cx, cy);

  // Helper to compute corner at fractions a,b,c
  function pt(a, b, c) {
    return createVector(
      O.x + axU.x * a + axV.x * b + axW.x * c,
      O.y + axU.y * a + axV.y * b + axW.y * c
    );
  }

  // Full cube corners
  const o000 = pt(0, 0, 0);
  const o100 = pt(1, 0, 0);
  const o010 = pt(0, 1, 0);
  const o110 = pt(1, 1, 0);
  const o001 = pt(0, 0, 1);
  const o101 = pt(1, 0, 1);
  const o011 = pt(0, 1, 1);
  const o111 = pt(1, 1, 1);

  // Wireframe full cube
  stroke(180);
  strokeWeight(1);
  noFill();
  // back edges
  line(o000.x, o000.y, o100.x, o100.y);
  line(o000.x, o000.y, o001.x, o001.y);
  line(o100.x, o100.y, o101.x, o101.y);
  line(o001.x, o001.y, o101.x, o101.y);
  // vertical edges
  line(o000.x, o000.y, o010.x, o010.y);
  line(o100.x, o100.y, o110.x, o110.y);
  line(o001.x, o001.y, o011.x, o011.y);
  line(o101.x, o101.y, o111.x, o111.y);
  // top edges
  line(o010.x, o010.y, o110.x, o110.y);
  line(o010.x, o010.y, o011.x, o011.y);
  line(o110.x, o110.y, o111.x, o111.y);
  line(o011.x, o011.y, o111.x, o111.y);

  // Filled inner volume — represents current coverage
  const a = svcCov, b = popCov, c = finCov;
  const i000 = pt(0, 0, 0);
  const i100 = pt(a, 0, 0);
  const i010 = pt(0, b, 0);
  const i110 = pt(a, b, 0);
  const i001 = pt(0, 0, c);
  const i101 = pt(a, 0, c);
  const i011 = pt(0, b, c);
  const i111 = pt(a, b, c);

  // Three visible faces of the inner volume:
  // Top (population): corners i010, i110, i111, i011  (color: blue)
  // Right (services): corners i100, i110, i111, i101  (color: green)
  // Front (financial): corners i001, i101, i111, i011 (color: orange)
  polyPopulation = [i010, i110, i111, i011];
  polyServices   = [i100, i110, i111, i101];
  polyFinancial  = [i001, i101, i111, i011];

  // Compute hovered face
  hoveredFace = null;
  if (mouseY < drawHeight) {
    if (pointInPoly(mouseX, mouseY, polyServices)) hoveredFace = 'services';
    else if (pointInPoly(mouseX, mouseY, polyPopulation)) hoveredFace = 'population';
    else if (pointInPoly(mouseX, mouseY, polyFinancial)) hoveredFace = 'financial';
  }

  // Draw filled faces
  noStroke();
  drawFace(polyFinancial, [225, 145, 50], hoveredFace === 'financial' || selectedFace === 'financial');
  drawFace(polyServices,  [80, 160, 100], hoveredFace === 'services'  || selectedFace === 'services');
  drawFace(polyPopulation, [80, 130, 200], hoveredFace === 'population' || selectedFace === 'population');

  // Outline filled volume (visible edges)
  stroke(40);
  strokeWeight(1.5);
  noFill();
  drawPolyEdges(polyPopulation);
  drawPolyEdges(polyServices);
  drawPolyEdges(polyFinancial);

  // Selection ring on a face
  if (selectedFace) {
    stroke(255, 200, 0);
    strokeWeight(3);
    noFill();
    if (selectedFace === 'population') drawPolyEdges(polyPopulation);
    if (selectedFace === 'services')   drawPolyEdges(polyServices);
    if (selectedFace === 'financial')  drawPolyEdges(polyFinancial);
  }

  // Axis labels at the outer corners
  noStroke();
  textStyle(BOLD);
  textSize(12);
  fill('#1a3a6c');
  // Population — above top-back vertex (highest point of outer cube)
  textAlign(CENTER, BOTTOM);
  text('Population', o111.x, o111.y - 22);
  text('(Who?)',     o111.x, o111.y - 8);
  // Services — right of o100
  textAlign(LEFT, CENTER);
  text('Services',   o100.x + 8, o100.y - 7);
  text('(What?)',    o100.x + 8, o100.y + 7);
  // Costs — left of o001
  textAlign(RIGHT, CENTER);
  text('Costs',      o001.x - 8, o001.y - 7);
  text('(How much?)', o001.x - 8, o001.y + 7);
  textStyle(NORMAL);

  // Axis tick: 0 at origin
  textSize(10);
  fill('#6c757d');
  textAlign(CENTER, TOP);
  text('0%', O.x, O.y + 6);

  // Tooltip on hover
  if (hoveredFace && hoveredFace !== selectedFace) {
    const tip = FACE_INFO[hoveredFace].title;
    drawTooltip(tip, mouseX, mouseY);
  }
}

function drawFace(poly, rgb, highlight) {
  const alpha = highlight ? 210 : 165;
  fill(rgb[0], rgb[1], rgb[2], alpha);
  beginShape();
  for (const p of poly) vertex(p.x, p.y);
  endShape(CLOSE);
}

function drawPolyEdges(poly) {
  beginShape();
  for (const p of poly) vertex(p.x, p.y);
  endShape(CLOSE);
}

function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / ((yj - yi) || 1e-9) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function drawTooltip(label, mx, my) {
  textSize(12);
  textStyle(NORMAL);
  const tw = textWidth(label) + 16;
  const th = 22;
  let tx = mx + 14;
  let ty = my - 28;
  if (tx + tw > containerWidth) tx = mx - tw - 8;
  if (ty < 4) ty = my + 18;
  noStroke();
  fill(40, 40, 40, 230);
  rect(tx, ty, tw, th, 4);
  fill(255);
  textAlign(LEFT, CENTER);
  text(label, tx + 8, ty + th / 2);
}

function drawPanel(x, y, w, h) {
  noStroke();
  fill(250, 251, 253);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();

  // Header strip
  fill('#1a3a6c');
  rect(x, y, w, 28, 6, 6, 0, 0);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Current profile: ' + (currentPreset === 'custom' ? 'Custom' : PRESETS[currentPreset].label),
       x + 12, y + 14, w - 20);
  textStyle(NORMAL);

  // Coverage table
  let yy = y + 40;
  fill('#212529');
  textAlign(LEFT, TOP);
  textSize(12);

  const rows = [
    ['Population covered', Math.round(popCov * 100) + '%', [80, 130, 200]],
    ['Services included',  Math.round(svcCov * 100) + '%', [80, 160, 100]],
    ['Financial protection', Math.round(finCov * 100) + '%', [225, 145, 50]]
  ];
  for (const r of rows) {
    fill(r[2][0], r[2][1], r[2][2]);
    rect(x + 12, yy + 4, 10, 10);
    fill('#212529');
    text(r[0], x + 28, yy);
    textStyle(BOLD);
    text(r[1], x + w - 50, yy);
    textStyle(NORMAL);
    yy += 22;
  }

  yy += 8;
  stroke(220);
  line(x + 12, yy, x + w - 12, yy);
  noStroke();
  yy += 10;

  if (selectedFace) {
    const info = FACE_INFO[selectedFace];
    fill('#1a3a6c');
    textStyle(BOLD);
    textSize(13);
    text(info.title, x + 12, yy, w - 24);
    textStyle(NORMAL);
    fill('#212529');
    textSize(12);
    text(info.body, x + 12, yy + 22, w - 24);
  } else {
    fill('#6c757d');
    textStyle(ITALIC);
    textSize(12);
    text('Click a colored face of the cube to read about that dimension.',
         x + 12, yy, w - 24);
    textStyle(NORMAL);
  }
}

function mousePressed() {
  if (hoveredFace) selectedFace = hoveredFace;
}

function updateCanvasSize() {
  const el = document.querySelector('main');
  containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}
