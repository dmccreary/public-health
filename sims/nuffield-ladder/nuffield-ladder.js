// Nuffield Council Ladder of Interventions
// CANVAS_HEIGHT: 660
let canvasWidth = 900;
let drawHeight = 580;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let resetBtn;

let selectedRung = -1;     // 0-indexed; 0 = bottom (Do nothing)
let hoveredRung = -1;
let animatedSel = 0;       // smoothed selection for the coercion-o-meter
const ANIM_RATE = 0.12;

// Rungs from bottom (1: Do nothing) to top (8: Eliminate choice)
const rungs = [
  {
    name: 'Do nothing',
    definition: 'Take no action and continue to monitor the situation.',
    example: 'Government continues routine surveillance of sugary-drink consumption but takes no policy action.',
    liberty: 'None',
    threshold: 'Default state. Defensible when evidence of harm is weak or the issue is improving on its own.'
  },
  {
    name: 'Provide information',
    definition: 'Inform and educate the public about choices and consequences.',
    example: 'Public-information campaign on the health risks of secondhand smoke.',
    liberty: 'None',
    threshold: 'Almost always justified — but rarely sufficient to change population behavior on its own.'
  },
  {
    name: 'Enable choice',
    definition: 'Help people change behavior by removing practical barriers.',
    example: 'Free smoking-cessation hotlines and nicotine patches at low cost.',
    liberty: 'Very low',
    threshold: 'Justified when an unmet need exists and the cost of provision is reasonable.'
  },
  {
    name: 'Guide choice by changing defaults',
    definition: 'Make the healthy option the default while still allowing opt-out.',
    example: 'Restaurants serve water by default; soda is available on request.',
    liberty: 'Low',
    threshold: 'Justified when defaults can be set without coercion and people can easily opt out.'
  },
  {
    name: 'Guide choice through incentives',
    definition: 'Use financial or other incentives to make the healthy choice more attractive.',
    example: 'Lower health-insurance premiums for documented gym attendance.',
    liberty: 'Low–medium',
    threshold: 'Justified when benefits outweigh costs and incentives are not so large as to be coercive.'
  },
  {
    name: 'Guide choice through disincentives',
    definition: 'Use financial or other disincentives to discourage the unhealthy choice.',
    example: 'Tax on sugar-sweetened beverages; tobacco excise taxes.',
    liberty: 'Medium',
    threshold: 'Justified when harm to others (externalities) is documented or when paternalism is publicly accepted.'
  },
  {
    name: 'Restrict choice',
    definition: 'Limit the options legally available, while preserving some choice.',
    example: 'Ban on trans fats in restaurant food; ban on sale of tobacco to minors.',
    liberty: 'High',
    threshold: 'Justified when harm is severe, evidence is strong, and less-coercive measures have failed.'
  },
  {
    name: 'Eliminate choice',
    definition: 'Use regulation to remove the option entirely.',
    example: 'Mandatory childhood vaccination for school entry; outright product bans.',
    liberty: 'Very high',
    threshold: 'Reserved for severe harm, strong evidence, and clear public benefit — the highest justification bar.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Segoe UI');

  resetBtn = createButton('Reset');
  resetBtn.position(20, drawHeight + 22);
  resetBtn.size(90, 32);
  resetBtn.style('font-size', '14px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('background', '#1a3a6c');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.mousePressed(() => { selectedRung = -1; });
}

function draw() {
  background(255);

  noStroke();
  fill('#1a3a6c');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Nuffield Council Ladder of Interventions", containerWidth / 2, 8);
  textStyle(NORMAL);

  // Smooth animation toward selected rung for gauge
  const targetSel = (selectedRung >= 0) ? selectedRung : 0;
  animatedSel += (targetSel - animatedSel) * ANIM_RATE;

  // Layout: ladder left 50%, panel middle 35%, gauge right 15%
  const ladderW = containerWidth * 0.48;
  const panelX = ladderW + 8;
  const gaugeW = containerWidth * 0.16;
  const panelW = containerWidth - ladderW - gaugeW - 24;
  const gaugeX = panelX + panelW + 8;

  drawLadder(20, 36, ladderW - 30, drawHeight - 50);
  drawPanel(panelX, 36, panelW, drawHeight - 50);
  drawGauge(gaugeX, 36, gaugeW, drawHeight - 50);

  // Control strip
  fill(248);
  noStroke();
  rect(0, drawHeight, containerWidth, controlHeight);
  stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

  fill('#495057');
  textAlign(LEFT, TOP);
  textSize(12);
  text('Click a rung to read its definition, an example, and the justification threshold.',
       125, drawHeight + 28, containerWidth - 130);
  text('The coercion-o-meter on the right rises as you climb higher rungs.',
       125, drawHeight + 48, containerWidth - 130);
}

function drawLadder(x, y, w, h) {
  // Vertical layout, rung 1 at bottom
  const titleY = y;
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Increasing intrusiveness ▲', x, titleY);
  textStyle(NORMAL);

  const topY = y + 24;
  const botY = y + h;
  const rungH = (botY - topY) / rungs.length;
  const labelW = 16;

  // Rails
  stroke('#6c757d');
  strokeWeight(3);
  const railLeftX = x + 30;
  const railRightX = x + w - 6;
  line(railLeftX, topY - 8, railLeftX, botY + 8);
  line(railRightX, topY - 8, railRightX, botY + 8);
  noStroke();

  // Hit-test
  hoveredRung = -1;
  // Draw rungs from bottom-up
  for (let i = 0; i < rungs.length; i++) {
    // Screen y: i=0 at bottom, increases upward in level number
    const rungIndexFromTop = rungs.length - 1 - i; // 0 at top
    const top = topY + rungIndexFromTop * rungH;
    const ry = top + 6;
    const rh = rungH - 12;

    // Color: green at bottom -> red at top
    const t = i / (rungs.length - 1);  // 0 bottom -> 1 top
    const r = lerp(70, 200, t);
    const g = lerp(160, 60, t);
    const b = lerp(80, 60, t);

    // Hover test
    if (mouseX >= railLeftX && mouseX <= railRightX && mouseY >= ry && mouseY <= ry + rh) {
      hoveredRung = i;
    }
    const isSel = selectedRung === i;
    const isHover = hoveredRung === i && !isSel;

    // Brightened color on hover/select
    const fr = isHover || isSel ? min(255, r + 30) : r;
    const fg = isHover || isSel ? min(255, g + 30) : g;
    const fb = isHover || isSel ? min(255, b + 30) : b;

    noStroke();
    fill(fr, fg, fb);
    rect(railLeftX, ry, railRightX - railLeftX, rh, 4);

    if (isSel) {
      noFill();
      stroke(255, 200, 0);
      strokeWeight(3);
      rect(railLeftX, ry, railRightX - railLeftX, rh, 4);
      strokeWeight(1);
      noStroke();
    }

    // Rung number on the left rail
    fill('#1a3a6c');
    textAlign(RIGHT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text((i + 1), railLeftX - 8, ry + rh / 2);
    textStyle(NORMAL);

    // Rung name on the rung itself
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(min(13, rh * 0.42));
    textStyle(BOLD);
    text(rungs[i].name, railLeftX + 10, ry + rh / 2);
    textStyle(NORMAL);
  }
}

function drawPanel(x, y, w, h) {
  fill(250, 251, 253);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();

  if (selectedRung < 0) {
    fill('#6c757d');
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(ITALIC);
    text('Click a rung to read about it.\nLower rungs respect autonomy;\nhigher rungs require stronger\njustification.', x + w / 2, y + h / 2);
    textStyle(NORMAL);
    return;
  }

  const R = rungs[selectedRung];
  const t = selectedRung / (rungs.length - 1);
  const r = lerp(70, 200, t);
  const g = lerp(160, 60, t);
  const b = lerp(80, 60, t);
  fill(r, g, b);
  rect(x, y, w, 8, 6, 6, 0, 0);

  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text('Rung ' + (selectedRung + 1) + ': ' + R.name, x + 12, y + 20, w - 24);
  textStyle(NORMAL);

  fill('#212529');
  textSize(12);
  text(R.definition, x + 12, y + 60, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Public health example', x + 12, y + 130);
  textStyle(NORMAL);
  fill('#212529');
  text(R.example, x + 12, y + 148, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Liberty restriction', x + 12, y + 230);
  textStyle(NORMAL);
  fill('#212529');
  text(R.liberty, x + 12, y + 248, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Justification threshold', x + 12, y + 290);
  textStyle(NORMAL);
  fill('#212529');
  text(R.threshold, x + 12, y + 308, w - 24);
}

function drawGauge(x, y, w, h) {
  // Vertical thermometer-style coercion gauge
  fill(250, 251, 253);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();

  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Coercion-\no-meter', x + w / 2, y + 8);
  textStyle(NORMAL);

  const gx = x + w / 2 - 14;
  const gw = 28;
  const gy = y + 50;
  const gh = h - 80;

  // Tube outline
  stroke(120);
  strokeWeight(1.5);
  noFill();
  rect(gx, gy, gw, gh, 6);

  // Fill level — 0 at bottom, increases with selection
  const level = constrain(animatedSel / (rungs.length - 1), 0, 1);
  const fillH = gh * level;
  // Color shifts based on level
  const t = level;
  const r = lerp(70, 220, t);
  const g = lerp(170, 50, t);
  const b = lerp(90, 50, t);
  noStroke();
  fill(r, g, b, 220);
  rect(gx + 1, gy + gh - fillH + 1, gw - 2, fillH - 2, 0, 0, 5, 5);

  // Tick marks 0 / 50 / 100
  stroke(120);
  strokeWeight(1);
  for (let i = 0; i <= 4; i++) {
    const ty = gy + gh * (i / 4);
    line(gx - 6, ty, gx, ty);
    line(gx + gw, ty, gx + gw + 6, ty);
  }
  noStroke();
  fill('#6c757d');
  textAlign(LEFT, CENTER);
  textSize(9);
  text('High', gx + gw + 8, gy + 4);
  text('Low', gx + gw + 8, gy + gh - 4);

  // Numeric readout
  fill('#1a3a6c');
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  const pctText = (selectedRung < 0) ? '—' : (Math.round(level * 100) + '%');
  text(pctText, x + w / 2, gy + gh + 10);
  textStyle(NORMAL);
}

function mousePressed() {
  if (hoveredRung >= 0) selectedRung = hoveredRung;
}

function updateCanvasSize() {
  const el = document.querySelector('main');
  containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}
