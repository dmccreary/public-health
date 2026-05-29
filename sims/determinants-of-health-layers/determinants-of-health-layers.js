// Determinants of Health — Concentric Layers
// CANVAS_HEIGHT: 620
let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let walkthroughBtn;
let resetBtn;
let selectedLayer = -1;
let hoveredLayer = -1;
let walkStep = -1; // -1 = not walking
let lastStepTime = 0;
const STEP_INTERVAL_MS = 2200;

// Innermost to outermost (index 0 = core)
const layers = [
  {
    name: 'Biological & Genetic Factors',
    color: [240, 245, 250],
    hoverColor: [255, 255, 255],
    textColor: [40, 60, 100],
    examples: ['Age', 'Sex', 'Hereditary risk factors'],
    why: 'These set an unmodifiable baseline of biological risk against which all other determinants act.',
    covid: 'Older age and male sex were among the strongest predictors of severe COVID-19 outcomes.',
    diabetes: 'A family history of Type 2 diabetes raises baseline risk regardless of behavior.'
  },
  {
    name: 'Individual Lifestyle Behaviors',
    color: [200, 220, 240],
    hoverColor: [225, 240, 255],
    textColor: [25, 50, 90],
    examples: ['Diet', 'Physical activity', 'Tobacco and alcohol use'],
    why: 'Day-to-day behaviors shape long-term risk — but these behaviors are themselves shaped by the outer rings.',
    covid: 'Mask wearing, distancing, and vaccine uptake were individual behaviors with population-level effects.',
    diabetes: 'Caloric intake, exercise patterns, and sleep affect insulin sensitivity.'
  },
  {
    name: 'Social & Community Networks',
    color: [150, 195, 225],
    hoverColor: [180, 215, 240],
    textColor: [20, 40, 80],
    examples: ['Social support', 'Community norms', 'Peer influence'],
    why: 'Networks distribute information, model behavior, and provide the emotional and practical support that buffers stress.',
    covid: 'Community trust shaped whether people followed public-health guidance and accepted vaccines.',
    diabetes: 'Eating norms in family and friend groups strongly predict diet quality.'
  },
  {
    name: 'Living & Working Conditions',
    color: [90, 155, 175],
    hoverColor: [115, 180, 200],
    textColor: [255, 255, 255],
    examples: ['Employment', 'Education', 'Housing', 'Food access', 'Healthcare'],
    why: 'The settings where people spend their time create the opportunities and barriers for healthy choices.',
    covid: 'Frontline workers in crowded settings had far higher exposure and worse outcomes.',
    diabetes: 'Living in a food desert with no supermarket within walking distance makes a healthy diet harder.'
  },
  {
    name: 'Macro Socioeconomic & Cultural Conditions',
    color: [30, 80, 110],
    hoverColor: [55, 110, 145],
    textColor: [255, 255, 255],
    examples: ['Economic policy', 'Governance', 'Cultural norms', 'Built and natural environment'],
    why: 'The broadest forces structure every inner layer — they decide what choices are even available.',
    covid: 'National policies on paid sick leave, lockdown, and vaccine access drove outcome differences between countries.',
    diabetes: 'Agricultural subsidies that cheapen sugar and refined grains shape diets at population scale.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Segoe UI');

  walkthroughBtn = createButton('Walk through Type 2 diabetes example');
  walkthroughBtn.position(20, drawHeight + 22);
  walkthroughBtn.size(280, 32);
  styleBtn(walkthroughBtn, '#1a3a6c');
  walkthroughBtn.mousePressed(startWalkthrough);

  resetBtn = createButton('Reset');
  resetBtn.position(310, drawHeight + 22);
  resetBtn.size(90, 32);
  styleBtn(resetBtn, '#6c757d');
  resetBtn.mousePressed(() => { selectedLayer = -1; walkStep = -1; });
}

function styleBtn(b, bg) {
  b.style('font-size', '13px');
  b.style('cursor', 'pointer');
  b.style('background', bg);
  b.style('color', 'white');
  b.style('border', 'none');
  b.style('border-radius', '4px');
}

function startWalkthrough() {
  walkStep = 0;
  selectedLayer = 0;
  lastStepTime = millis();
}

function draw() {
  background(255);

  noStroke();
  fill('#1a3a6c');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Determinants of Health — Concentric Layers', containerWidth / 2, 8);
  textStyle(NORMAL);

  // Advance walkthrough
  if (walkStep >= 0 && millis() - lastStepTime > STEP_INTERVAL_MS) {
    walkStep++;
    if (walkStep >= layers.length) {
      walkStep = -1;
    } else {
      selectedLayer = walkStep;
      lastStepTime = millis();
    }
  }

  // Layout: 60% rings, 40% panel
  const ringsW = containerWidth * 0.6;
  const panelX = ringsW + 8;
  const panelW = containerWidth - panelX - 8;

  drawRings(0, 36, ringsW, drawHeight - 40);
  drawPanel(panelX, 36, panelW, drawHeight - 50);

  // Control panel background
  fill(248);
  noStroke();
  rect(0, drawHeight, containerWidth, controlHeight);
  stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

  fill('#495057');
  textAlign(LEFT, TOP);
  textSize(12);
  text('Click any ring to see examples and a COVID-19 illustration.',
       410, drawHeight + 24, containerWidth - 420);
  text('The walkthrough steps through Type 2 diabetes risk ring by ring.',
       410, drawHeight + 42, containerWidth - 420);

  if (walkStep >= 0) {
    fill('#e07a00');
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Walking: step ' + (walkStep + 1) + ' of ' + layers.length, 20, drawHeight + 65);
    textStyle(NORMAL);
  }
}

function drawRings(x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const maxR = min(w, h) * 0.46;
  const innerCoreR = maxR * 0.14;
  const bandW = (maxR - innerCoreR) / (layers.length - 1);

  // Hit-testing
  hoveredLayer = -1;
  const mdx = mouseX - cx;
  const mdy = mouseY - cy;
  const mDist = sqrt(mdx * mdx + mdy * mdy);

  if (mDist <= innerCoreR) {
    hoveredLayer = 0;
  } else if (mDist <= maxR) {
    // Outer rings 1..4
    const ringIdx = Math.floor((mDist - innerCoreR) / bandW) + 1;
    if (ringIdx >= 1 && ringIdx < layers.length) hoveredLayer = ringIdx;
  }

  // Draw from outermost to innermost
  for (let i = layers.length - 1; i >= 0; i--) {
    let rOuter, rInner;
    if (i === 0) {
      rOuter = innerCoreR;
      rInner = 0;
    } else {
      rOuter = innerCoreR + bandW * i;
      rInner = innerCoreR + bandW * (i - 1);
    }
    const isSel = selectedLayer === i;
    const isHover = hoveredLayer === i && !isSel;
    const c = (isHover || isSel) ? layers[i].hoverColor : layers[i].color;

    noStroke();
    fill(c[0], c[1], c[2]);
    circle(cx, cy, rOuter * 2);

    if (i > 0) {
      // carve inner
      fill(255);
      // we want to leave the inner rings; so draw a circle of next color
      // Instead skip carve — drawing largest-first then smaller-on-top is fine since each
      // smaller layer paints over the inside. So undo:
    }

    if (isSel) {
      noFill();
      stroke(255, 200, 0);
      strokeWeight(3);
      circle(cx, cy, rOuter * 2);
      strokeWeight(1);
      noStroke();
    }
  }

  // Labels — place near the top of each band, inside the colored area.
  // Wrap to multiple lines if needed so labels are never truncated.
  for (let i = 0; i < layers.length; i++) {
    let rOuter, rInner;
    if (i === 0) { rOuter = innerCoreR; rInner = 0; }
    else { rOuter = innerCoreR + bandW * i; rInner = innerCoreR + bandW * (i - 1); }

    const tc = layers[i].textColor;
    fill(tc[0], tc[1], tc[2]);
    noStroke();
    textAlign(CENTER, TOP);
    const fs = (i === 0) ? 10 : 11;
    textSize(fs);
    textStyle(BOLD);

    if (i === 0) {
      const lines = wrapText(layers[i].name, innerCoreR * 1.7);
      const totalH = lines.length * (fs + 2);
      let yy = cy - totalH / 2;
      for (const ln of lines) {
        text(ln, cx, yy);
        yy += fs + 2;
      }
    } else {
      // Place label in the upper portion of the band, but at a wider chord
      // (about 1/4 down from outer edge of band) so wrapping has more room.
      let labelY = cy - rOuter + bandW * 0.5;
      const dy = cy - labelY;
      const chord = 2 * sqrt(max(1, rOuter * rOuter - dy * dy));
      // Subtract space taken by inner ring (we don't want to overlap)
      const innerChord = 2 * sqrt(max(0, rInner * rInner - dy * dy));
      const usableW = max(60, chord - innerChord - 20);
      const lines = wrapText(layers[i].name, usableW);
      const totalH = lines.length * (fs + 2);
      let yy = labelY - totalH / 2;
      for (const ln of lines) {
        text(ln, cx, yy);
        yy += fs + 2;
      }
    }
    textStyle(NORMAL);
  }
}

function drawPanel(x, y, w, h) {
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
    text('Click a ring to explore that layer\n— or press "Walk through" to see\nhow Type 2 diabetes risk is shaped\nby every level from the inside out.',
         x + w / 2, y + h / 2);
    textStyle(NORMAL);
    return;
  }

  const L = layers[selectedLayer];
  fill(L.color[0], L.color[1], L.color[2]);
  rect(x, y, w, 8, 6, 6, 0, 0);

  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Ring ' + (selectedLayer + 1) + ': ' + L.name, x + 12, y + 18, w - 24);
  textStyle(NORMAL);

  fill('#1a3a6c');
  textSize(12);
  textStyle(BOLD);
  text('Examples', x + 12, y + 70);
  textStyle(NORMAL);
  fill('#212529');
  let ex = L.examples.join(' • ');
  text(ex, x + 12, y + 88, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('Why this level matters', x + 12, y + 140);
  textStyle(NORMAL);
  fill('#212529');
  text(L.why, x + 12, y + 158, w - 24);

  fill('#1a3a6c');
  textStyle(BOLD);
  text('COVID-19 example', x + 12, y + 230);
  textStyle(NORMAL);
  fill('#212529');
  text(L.covid, x + 12, y + 248, w - 24);

  // If walkthrough is active, show diabetes example
  if (walkStep >= 0) {
    fill('#e07a00');
    textStyle(BOLD);
    text('Type 2 diabetes example', x + 12, y + 320);
    textStyle(NORMAL);
    fill('#212529');
    text(L.diabetes, x + 12, y + 338, w - 24);
  }
}

function wrapText(str, maxW) {
  // Greedy word wrap given currently set textSize
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const candidate = cur ? (cur + ' ' + w) : w;
    if (textWidth(candidate) <= maxW || !cur) {
      cur = candidate;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function mousePressed() {
  if (hoveredLayer >= 0) {
    selectedLayer = hoveredLayer;
    walkStep = -1; // user took manual control
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
