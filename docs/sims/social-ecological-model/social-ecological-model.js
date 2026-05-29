// Social-Ecological Model — Interactive Concentric Levels
// CANVAS_HEIGHT: 640
let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let behaviorSel;
let allLevelsBtn;
let resetBtn;

let selectedLevel = -1;
let hoveredLevel = -1;
let allLevelsMode = false;

// Innermost to outermost
const levels = [
  {
    name: 'Individual',
    color: [25, 80, 95],         // dark teal
    hoverColor: [50, 115, 130],
    textColor: [255, 255, 255],
    definition: 'Biological and psychological factors — knowledge, attitudes, skills, beliefs, and personal history.',
    determinant: 'Health literacy and self-efficacy beliefs',
    interventions: {
      'Physical activity': 'Personalized step-count goals with mobile-app feedback.',
      'Healthy eating':    'One-on-one motivational interviewing with a dietitian.',
      'Safe sex':          'Skills training in condom use and refusal skills.'
    }
  },
  {
    name: 'Interpersonal',
    color: [50, 110, 175],       // blue
    hoverColor: [80, 145, 210],
    textColor: [255, 255, 255],
    definition: 'Family, friends, peers, and other close social networks that influence behavior through support, modeling, and norms.',
    determinant: 'Family eating routines and peer attitudes',
    interventions: {
      'Physical activity': 'Walking groups that pair friends or family members.',
      'Healthy eating':    'Family-based cooking classes shared between parents and children.',
      'Safe sex':          'Peer-led sexual-health education in college dormitories.'
    }
  },
  {
    name: 'Organizational',
    color: [70, 145, 90],        // green
    hoverColor: [100, 180, 120],
    textColor: [255, 255, 255],
    definition: 'Institutions — workplaces, schools, faith communities, healthcare settings — and their rules, programs, and practices.',
    determinant: 'Workplace and school policies',
    interventions: {
      'Physical activity': 'On-site gyms, standing desks, and walking-meeting policies at work.',
      'Healthy eating':    'School nutrition standards for cafeterias and vending machines.',
      'Safe sex':          'Free condom dispensers in college health centers.'
    }
  },
  {
    name: 'Community',
    color: [225, 160, 50],       // yellow-orange
    hoverColor: [250, 190, 90],
    textColor: [70, 50, 0],
    definition: 'Local social norms, built environment, neighborhood resources, and the relationships among community organizations.',
    determinant: 'Neighborhood walkability and food retail mix',
    interventions: {
      'Physical activity': 'Build sidewalks, bike lanes, and safe parks in low-income neighborhoods.',
      'Healthy eating':    'Farmers markets and supermarket incentives in food deserts.',
      'Safe sex':          'Community media campaigns to reduce HIV stigma.'
    }
  },
  {
    name: 'Societal / Policy',
    color: [195, 60, 60],        // red
    hoverColor: [225, 90, 90],
    textColor: [255, 255, 255],
    definition: 'Laws, regulations, economic policies, and broad cultural norms that shape opportunities and constraints at every other level.',
    determinant: 'Tax policy, advertising rules, and social norms',
    interventions: {
      'Physical activity': 'Tax credits for employers offering wellness programs; national PE standards.',
      'Healthy eating':    'Soda taxes, sugar-warning labels, and SNAP-Ed funding.',
      'Safe sex':          'Federal funding for comprehensive sex education and PrEP access.'
    }
  }
];

const behaviors = ['Physical activity', 'Healthy eating', 'Safe sex'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Segoe UI');

  // Behavior dropdown
  behaviorSel = createSelect();
  behaviorSel.position(120, drawHeight + 16);
  behaviorSel.size(180, 30);
  for (const b of behaviors) behaviorSel.option(b);
  behaviorSel.selected(behaviors[0]);
  behaviorSel.style('font-size', '13px');

  allLevelsBtn = createButton('All levels');
  allLevelsBtn.position(320, drawHeight + 16);
  allLevelsBtn.size(110, 30);
  styleBtn(allLevelsBtn, '#1a3a6c');
  allLevelsBtn.mousePressed(() => {
    allLevelsMode = true;
    selectedLevel = -1;
  });

  resetBtn = createButton('Reset');
  resetBtn.position(440, drawHeight + 16);
  resetBtn.size(80, 30);
  styleBtn(resetBtn, '#6c757d');
  resetBtn.mousePressed(() => {
    allLevelsMode = false;
    selectedLevel = -1;
  });
}

function styleBtn(b, bg) {
  b.style('font-size', '13px');
  b.style('cursor', 'pointer');
  b.style('background', bg);
  b.style('color', 'white');
  b.style('border', 'none');
  b.style('border-radius', '4px');
}

function draw() {
  background(255);

  noStroke();
  fill('#1a3a6c');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Social-Ecological Model', containerWidth / 2, 8);
  textStyle(NORMAL);

  // Layout
  const ringsW = containerWidth * 0.58;
  const panelX = ringsW + 8;
  const panelW = containerWidth - panelX - 8;

  drawRings(0, 34, ringsW, drawHeight - 40);
  drawPanel(panelX, 34, panelW, drawHeight - 50);

  // Control bg
  fill(248);
  noStroke();
  rect(0, drawHeight, containerWidth, controlHeight);
  stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

  fill('#212529');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Behavior:', 20, drawHeight + 31);

  fill('#495057');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Click a colored ring to see its definition, a sample determinant, and a behavior-specific intervention.',
       20, drawHeight + 56, containerWidth - 40);
  text('"All levels" highlights every ring — effective behavior change usually requires all of them.',
       20, drawHeight + 74, containerWidth - 40);
}

function drawRings(x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const maxR = min(w, h) * 0.45;
  const innerCoreR = maxR * 0.16;
  const bandW = (maxR - innerCoreR) / (levels.length - 1);

  // Hit-testing
  hoveredLevel = -1;
  const mdx = mouseX - cx;
  const mdy = mouseY - cy;
  const mDist = sqrt(mdx * mdx + mdy * mdy);
  if (mDist <= innerCoreR) hoveredLevel = 0;
  else if (mDist <= maxR) {
    const idx = Math.floor((mDist - innerCoreR) / bandW) + 1;
    if (idx >= 1 && idx < levels.length) hoveredLevel = idx;
  }

  // Draw from outermost in
  for (let i = levels.length - 1; i >= 0; i--) {
    let rOuter;
    if (i === 0) rOuter = innerCoreR;
    else rOuter = innerCoreR + bandW * i;

    const isSel = (selectedLevel === i) || allLevelsMode;
    const isHover = hoveredLevel === i && !isSel;
    const c = (isHover || isSel) ? levels[i].hoverColor : levels[i].color;

    // Glow effect when selected
    if (isSel) {
      for (let g = 6; g > 0; g--) {
        noStroke();
        fill(255, 220, 80, 28);
        circle(cx, cy, rOuter * 2 + g * 6);
      }
    }

    noStroke();
    fill(c[0], c[1], c[2]);
    circle(cx, cy, rOuter * 2);

    if (isSel) {
      noFill();
      stroke(255, 200, 0);
      strokeWeight(3);
      circle(cx, cy, rOuter * 2);
      strokeWeight(1);
      noStroke();
    }
  }

  // Labels — mid-upper band so chords are wide
  for (let i = 0; i < levels.length; i++) {
    let rOuter, rInner;
    if (i === 0) { rOuter = innerCoreR; rInner = 0; }
    else { rOuter = innerCoreR + bandW * i; rInner = innerCoreR + bandW * (i - 1); }
    const fs = (i === 0) ? 12 : 13;
    textSize(fs);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    const tc = levels[i].textColor;
    fill(tc[0], tc[1], tc[2]);
    noStroke();
    let labelY;
    if (i === 0) labelY = cy;
    else labelY = cy - rOuter + bandW * 0.5;
    text(levels[i].name, cx, labelY);
    textStyle(NORMAL);
  }
}

function drawPanel(x, y, w, h) {
  fill(250, 251, 253);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke();

  const behavior = behaviorSel ? behaviorSel.value() : behaviors[0];

  if (allLevelsMode) {
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text('All five levels together', x + 12, y + 14, w - 24);
    textStyle(NORMAL);

    fill('#212529');
    textSize(12);
    text('Effective behavior change requires all levels working together. ' +
         'A program that targets only one level — for example, individual education without changes ' +
         'in community resources or policy — is unlikely to produce lasting change.',
         x + 12, y + 44, w - 24);

    fill('#1a3a6c');
    textStyle(BOLD);
    text('Selected behavior: ' + behavior, x + 12, y + 130);
    textStyle(NORMAL);

    fill('#212529');
    textSize(11);
    let yy = y + 152;
    for (let i = 0; i < levels.length; i++) {
      const L = levels[i];
      // dot
      fill(L.color[0], L.color[1], L.color[2]);
      noStroke();
      circle(x + 20, yy + 6, 10);
      fill('#212529');
      textStyle(BOLD);
      text(L.name + ':', x + 32, yy, w - 50);
      textStyle(NORMAL);
      text(L.interventions[behavior], x + 32, yy + 14, w - 50);
      yy += 46;
    }
    return;
  }

  if (selectedLevel < 0) {
    fill('#6c757d');
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(ITALIC);
    text('Click a level to explore it,\nor press "All levels" to see\nall five together.',
         x + w / 2, y + h / 2);
    textStyle(NORMAL);
    return;
  }

  const L = levels[selectedLevel];
  fill(L.color[0], L.color[1], L.color[2]);
  rect(x, y, w, 8, 6, 6, 0, 0);

  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text('Level ' + (selectedLevel + 1) + ': ' + L.name, x + 12, y + 20, w - 24);
  textStyle(NORMAL);

  fill('#212529');
  textSize(12);
  text(L.definition, x + 12, y + 56, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Example determinant', x + 12, y + 140);
  textStyle(NORMAL);
  fill('#212529');
  text(L.determinant, x + 12, y + 158, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Intervention for ' + behavior, x + 12, y + 220);
  textStyle(NORMAL);
  fill('#212529');
  text(L.interventions[behavior], x + 12, y + 238, w - 24);
}

function mousePressed() {
  if (hoveredLevel >= 0) {
    selectedLevel = hoveredLevel;
    allLevelsMode = false;
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
