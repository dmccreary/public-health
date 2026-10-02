// Research Ethics Timeline - abuses, codes, and regulations, 1932 to present
// CANVAS_HEIGHT: 590
// Codes and regulations sit above the time axis. Research abuses and scandals
// sit below it. Click a year marker, or step through the events in date order
// with the Previous and Next buttons. The panel gives the event, a
// three-sentence description, the ethical principle involved, and the
// regulatory response (or, for a rule, what prompted it).
// Step-through interaction (Bloom: Understand). No animation.

// ---- canvas layout (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 800;
let drawHeight = 540;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 16;

// ---- timeline geometry ----
const START_YEAR = 1930;
const END_YEAR = 2025;
const AXIS_Y = 150;        // y of the time axis
const LEVEL_STEP = 28;     // vertical distance between stacked year markers
const PILL_H = 22;
const PANEL_TOP = 250;

// ---- categories (color coding from the specification) ----
const CATS = {
  scandal:       { label: 'Research scandal',       color: 'firebrick',   text: 'white' },
  regulation:    { label: 'US regulation',          color: 'royalblue',   text: 'white' },
  international: { label: 'International standard', color: 'forestgreen', text: 'white' }
};

// ---- events ----
// lane 'top'    = codes and regulations (above the axis)
// lane 'bottom' = research abuses and scandals (below the axis)
// respLabel is 'Regulatory response' for a scandal and 'Prompted by' for a rule.
const EVENTS = [
  {
    year: 1932, lane: 'bottom', cat: 'scandal',
    title: 'Tuskegee syphilis study begins',
    desc: 'The US Public Health Service began a study of untreated syphilis in Black men in Macon County, Alabama. About 600 men were enrolled: 399 who had syphilis and 201 who did not. The men were told they were being treated for "bad blood", were never told their diagnosis, and were not given penicillin after it became the standard treatment in the 1940s.',
    principle: 'Respect for persons (deception, no informed consent), beneficence (effective treatment withheld), and justice (poor Black men carried all of the risk).',
    respLabel: 'Regulatory response',
    response: 'None for 40 years. The study continued until 1972.'
  },
  {
    year: 1947, lane: 'top', cat: 'international',
    title: 'Nuremberg Code',
    desc: 'At the Nuremberg Doctors\' Trial, American judges tried Nazi physicians for lethal experiments on concentration camp prisoners. Their 1947 verdict set out ten principles for permissible medical experiments. The first states that the voluntary consent of the human subject is absolutely essential.',
    principle: 'Respect for persons: voluntary, informed consent.',
    respLabel: 'Prompted by',
    response: 'Nazi medical experiments on prisoners. The Code had no direct legal force in the United States, but later codes were built on it.'
  },
  {
    year: 1956, lane: 'bottom', cat: 'scandal',
    title: 'Willowbrook hepatitis studies',
    desc: 'At the Willowbrook State School in New York, researchers led by Saul Krugman deliberately infected children who had intellectual disabilities with hepatitis, to study the disease and test ways to prevent it. The studies ran from 1956 into the early 1970s. Parents gave consent, but at times a place in the overcrowded school was open only through the research unit.',
    principle: 'Respect for persons (consent that was not freely given) and justice (institutionalized children were used because they were available).',
    respLabel: 'Regulatory response',
    response: 'Henry Beecher listed the studies among 22 examples of unethical research in a 1966 journal article. The case later shaped the added federal protections for children in research (1983).'
  },
  {
    year: 1963, lane: 'bottom', cat: 'scandal',
    title: 'Jewish Chronic Disease Hospital',
    desc: 'At a hospital in Brooklyn, New York, cancer researcher Chester Southam and a colleague injected live cancer cells into 22 chronically ill patients to study how the body rejects them. The patients were not told that the injections contained cancer cells. Three staff physicians objected and reported the study.',
    principle: 'Respect for persons: information was deliberately withheld, so consent was not informed.',
    respLabel: 'Regulatory response',
    response: 'New York\'s Board of Regents found Southam guilty of fraud, deceit, and unprofessional conduct and put him on probation. In 1966 the US Public Health Service began to require committee review of the research it funded.'
  },
  {
    year: 1964, lane: 'top', cat: 'international',
    title: 'Declaration of Helsinki',
    desc: 'The World Medical Association adopted the Declaration of Helsinki as ethical guidance for physicians who do research with human subjects. It built on the Nuremberg Code and separated research combined with patient care from research on volunteers. It has been revised many times, and since 1975 it has called for review of each study by an independent committee.',
    principle: 'Beneficence and respect for persons: the well-being of the research subject comes before the interests of science and society.',
    respLabel: 'Prompted by',
    response: 'The need for a code written by physicians that applied the Nuremberg principles to everyday clinical research.'
  },
  {
    year: 1972, lane: 'bottom', cat: 'scandal',
    title: 'Tuskegee study exposed',
    desc: 'Peter Buxtun, a former Public Health Service employee, gave information about the study to the press. Associated Press reporter Jean Heller broke the story on July 25, 1972. A federal advisory panel judged the study ethically unjustified, and it was stopped.',
    principle: 'Justice and respect for persons. The public learned that a government study had deceived and endangered its subjects for 40 years.',
    respLabel: 'Regulatory response',
    response: 'Senate hearings in 1973 led directly to the National Research Act of 1974. A 1974 legal settlement compensated the men and their families, and in 1997 President Clinton formally apologized.'
  },
  {
    year: 1974, lane: 'top', cat: 'regulation',
    title: 'National Research Act',
    desc: 'Congress passed the National Research Act in July 1974. It required institutions that receive federal research funds to set up Institutional Review Boards (IRBs) to review studies with human subjects. It also created the National Commission for the Protection of Human Subjects of Biomedical and Behavioral Research.',
    principle: 'All three. The Act told the Commission to identify the basic ethical principles that should govern research.',
    respLabel: 'Prompted by',
    response: 'The exposure of the Tuskegee study and the Senate hearings that followed in 1973.'
  },
  {
    year: 1979, lane: 'top', cat: 'regulation',
    title: 'Belmont Report',
    desc: 'The National Commission published the Belmont Report in 1979. It names three basic principles: respect for persons, beneficence, and justice. It ties each principle to a practice: informed consent, assessment of risks and benefits, and fair selection of subjects.',
    principle: 'Respect for persons, beneficence, and justice. This report is where the three are defined.',
    respLabel: 'Prompted by',
    response: 'The task given to the Commission by the National Research Act of 1974.'
  },
  {
    year: 1991, lane: 'top', cat: 'regulation',
    title: 'Common Rule (45 CFR 46)',
    desc: 'In 1991, 15 federal departments and agencies adopted one shared set of regulations for research with human subjects, known as the Common Rule. For the Department of Health and Human Services it is Subpart A of 45 CFR 46. It requires IRB review, informed consent, and a written assurance of compliance from each research institution.',
    principle: 'All three Belmont principles, turned into enforceable requirements.',
    respLabel: 'Prompted by',
    response: 'The need for one consistent rule across federal agencies, built on the Belmont Report and earlier Health and Human Services regulations.'
  },
  {
    year: 1999, lane: 'bottom', cat: 'scandal',
    title: 'Death of Jesse Gelsinger',
    desc: 'Jesse Gelsinger, age 18, died on September 17, 1999, four days after receiving an experimental gene therapy at the University of Pennsylvania. He had a mild form of a liver enzyme disorder that was controlled with diet and medication. Investigators found that earlier serious side effects had not been properly reported and that the lead researcher and the university held a financial stake in the therapy.',
    principle: 'Beneficence (serious risk to a fairly healthy volunteer) and respect for persons (the consent process left out known risks and financial interests).',
    respLabel: 'Regulatory response',
    response: 'The FDA halted the institute\'s gene therapy trials in 2000. In June 2000 the federal Office for Human Research Protections was created, and oversight of adverse event reporting and financial conflicts of interest was tightened.'
  },
  {
    year: 2006, lane: 'bottom', cat: 'scandal',
    title: 'SFBC International drug-testing site',
    desc: 'SFBC International ran the largest commercial drug-testing center in North America, a 675-bed site in a former Miami hotel. A 2005 Bloomberg Markets investigation reported that it paid poor immigrants, some of them undocumented, to test drugs. The FDA inspected the site in 2006, the county ordered the building demolished, and the site closed.',
    principle: 'Justice and respect for persons: people with little money and few options are easy to recruit, and payment can become undue inducement.',
    respLabel: 'Regulatory response',
    response: 'The site closed in 2006. No new federal rule followed. The case is cited in debates about payment and oversight in commercial drug trials.'
  },
  {
    year: 2018, lane: 'top', cat: 'regulation',
    title: 'Revised Common Rule',
    desc: 'The first major revision of the Common Rule was published in January 2017 and is known as the 2018 Requirements. Consent forms must now begin with a concise summary of the key information a person needs in order to decide. The rule also allows broad consent for future research on stored data and biospecimens, and requires a single IRB for most multi-site studies.',
    principle: 'Respect for persons: consent that people can actually understand.',
    respLabel: 'Prompted by',
    response: 'Changes in research since 1991, including large multi-site trials, data sharing, and biobanks. Most institutions had to comply by January 21, 2019.'
  }
];

// chronological order used by the Previous / Next buttons
const ORDER = EVENTS.map((e, i) => i).sort((a, b) =>
  (EVENTS[a].year - EVENTS[b].year) || (a - b));

// ---- state ----
let selected = -1;          // index into EVENTS, -1 = nothing selected
let hovered = -1;
let pills = [];             // screen rectangles of the year markers

// ---- controls ----
let prevButton, nextButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  prevButton = createButton('← Previous');
  prevButton.parent(document.querySelector('main'));
  prevButton.position(10, drawHeight + 10);
  prevButton.size(105, 30);
  prevButton.mousePressed(() => step(-1));

  nextButton = createButton('Next →');
  nextButton.parent(document.querySelector('main'));
  nextButton.position(123, drawHeight + 10);
  nextButton.size(85, 30);
  nextButton.mousePressed(() => step(1));

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(216, drawHeight + 10);
  resetButton.size(70, 30);
  resetButton.mousePressed(() => { selected = -1; updateButtons(); });

  for (const b of [prevButton, nextButton, resetButton]) {
    b.style('font-size', '15px');
    b.style('cursor', 'pointer');
  }
  updateButtons();

  describe('A horizontal timeline from 1930 to 2025. Year markers above the axis are codes and ' +
    'regulations: the Nuremberg Code, the Declaration of Helsinki, the National Research Act, ' +
    'the Belmont Report, the Common Rule, and the revised Common Rule. Year markers below the ' +
    'axis are research scandals: the Tuskegee study, Willowbrook, the Jewish Chronic Disease ' +
    'Hospital, the death of Jesse Gelsinger, and SFBC International. Selecting a marker shows ' +
    'a description, the ethical principle involved, and the regulatory response.');
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

  drawAxis();
  layoutPills();
  drawTitleAndCaptions();
  drawPills();
  drawPanel();
  drawTooltip();
  drawControlLabel();
}

// ---------------------------------------------------------------------------
// timeline
// ---------------------------------------------------------------------------
function axisLeft() { return canvasWidth < 520 ? 24 : 40; }
function axisRight() { return canvasWidth - (canvasWidth < 520 ? 24 : 40); }

function yearX(year) {
  return map(year, START_YEAR, END_YEAR, axisLeft(), axisRight());
}

function drawAxis() {
  stroke('black');
  strokeWeight(3);
  line(axisLeft() - 12, AXIS_Y, axisRight() + 12, AXIS_Y);

  // decade ticks
  const step = canvasWidth < 520 ? 20 : 10;
  for (let y = START_YEAR; y <= END_YEAR; y += step) {
    const x = yearX(y);
    stroke('black');
    strokeWeight(1.5);
    line(x, AXIS_Y - 5, x, AXIS_Y + 5);
  }
}

// Decade labels are drawn after the marker stems, on a small background
// patch, so that a stem never runs through the digits.
function drawAxisLabels() {
  const step = canvasWidth < 520 ? 20 : 10;
  textStyle(NORMAL);
  textSize(12);
  textAlign(CENTER, TOP);
  for (let y = START_YEAR; y <= END_YEAR; y += step) {
    const x = yearX(y);
    noStroke();
    fill('aliceblue');
    rect(x - 15, AXIS_Y + 6, 30, 14);
    fill('black');
    text(y, x, AXIS_Y + 7);
  }
}

// Place each year marker on the lowest free level of its lane so that
// markers for nearby years stack instead of overlapping.
function layoutPills() {
  const small = canvasWidth < 520;
  const pw = small ? 36 : 44;
  pills = [];
  for (const lane of ['top', 'bottom']) {
    const idx = [];
    for (let i = 0; i < EVENTS.length; i++) if (EVENTS[i].lane === lane) idx.push(i);
    idx.sort((a, b) => (EVENTS[a].year - EVENTS[b].year) || (a - b));
    const lastRight = [];                      // right edge of the last marker on each level
    for (const i of idx) {
      const cx = yearX(EVENTS[i].year);
      let level = 0;
      while (lastRight[level] !== undefined && lastRight[level] + 4 > cx - pw / 2) level++;
      lastRight[level] = cx + pw / 2;
      const dir = lane === 'top' ? -1 : 1;
      const cy = AXIS_Y + dir * (34 + level * LEVEL_STEP) + (lane === 'bottom' ? 10 : 0);
      pills[i] = { x: cx - pw / 2, y: cy - PILL_H / 2, w: pw, h: PILL_H, cx: cx, cy: cy };
    }
  }
}

function drawPills() {
  hovered = -1;
  for (let i = 0; i < EVENTS.length; i++) {
    const p = pills[i];
    if (mouseX >= p.x && mouseX <= p.x + p.w && mouseY >= p.y && mouseY <= p.y + p.h) hovered = i;
  }

  // stems first, so that markers are drawn on top of them
  for (let i = 0; i < EVENTS.length; i++) {
    const p = pills[i];
    stroke('gray');
    strokeWeight(1.5);
    line(p.cx, AXIS_Y, p.cx, p.cy);
  }
  drawAxisLabels();

  for (let i = 0; i < EVENTS.length; i++) {
    const e = EVENTS[i];
    const p = pills[i];
    const cat = CATS[e.cat];
    if (i === selected) {
      stroke('black');
      strokeWeight(3);
    } else if (i === hovered) {
      stroke('black');
      strokeWeight(1.5);
    } else {
      stroke('white');
      strokeWeight(1);
    }
    fill(cat.color);
    rect(p.x, p.y, p.w, p.h, 11);
    noStroke();
    fill(cat.text);
    textStyle(BOLD);
    textSize(p.w < 40 ? 11 : 13);
    textAlign(CENTER, CENTER);
    text(e.year, p.cx, p.cy + 1);
    textStyle(NORMAL);

    // gold ring marks the selected event
    if (i === selected) {
      noFill();
      stroke('gold');
      strokeWeight(3);
      rect(p.x - 4, p.y - 4, p.w + 8, p.h + 8, 14);
    }
  }
  cursor(hovered >= 0 ? HAND : ARROW);
}

function drawTitleAndCaptions() {
  const small = canvasWidth < 520;
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(small ? 18 : 21);
  text(canvasWidth < 640 ? 'Research Ethics Timeline' :
    'Research Ethics: Abuses, Codes, and Regulations', canvasWidth / 2, 8);

  // color legend in one centered row under the title
  const cs = small ? 10.5 : 13;
  textSize(cs);
  const keys = ['scandal', 'regulation', 'international'];
  let total = 0;
  for (const k of keys) total += 22 + textWidth(CATS[k].label) + (small ? 8 : 18);
  let lx = (canvasWidth - total) / 2;
  textAlign(LEFT, CENTER);
  for (const k of keys) {
    noStroke();
    fill(CATS[k].color);
    rect(lx, 39, 16, 12, 6);
    fill('black');
    text(CATS[k].label, lx + 21, 45);
    lx += 22 + textWidth(CATS[k].label) + (small ? 8 : 18);
  }

  // lane captions: upper left is free above the axis, lower right below it
  textStyle(BOLD);
  textSize(small ? 11 : 13);
  fill('black');
  textAlign(LEFT, BOTTOM);
  text(small ? 'Rules' : 'Above the line:', 12, small ? AXIS_Y - 12 : AXIS_Y - 28);
  if (!small) text('codes and rules', 12, AXIS_Y - 12);
  textAlign(RIGHT, TOP);
  if (small) {
    text('Abuses', canvasWidth - 12, AXIS_Y + 64);
  } else {
    text('Below the line:', canvasWidth - 12, AXIS_Y + 28);
    text('research abuses', canvasWidth - 12, AXIS_Y + 44);
  }
  textStyle(NORMAL);
}

// ---------------------------------------------------------------------------
// detail panel
// ---------------------------------------------------------------------------
function drawPanel() {
  const px = margin;
  const pw = canvasWidth - 2 * margin;
  const ph = drawHeight - PANEL_TOP - 10;
  const headerH = 34;

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, PANEL_TOP, pw, ph, 10);

  let headerColor = 'slategray';
  let heading = 'How to use this timeline';
  let blocks;

  if (selected < 0) {
    blocks = [
      { label: '', text: 'Modern rules for research with human subjects were written in response to specific abuses. This timeline puts the abuses below the line and the codes and regulations above it.' },
      { label: '', text: 'Click a year marker, or press Next, to step through the events in date order.' },
      { label: 'Look for', text: 'Which abuse came before each rule, and which of the three Belmont principles (respect for persons, beneficence, justice) was violated.' }
    ];
  } else {
    const e = EVENTS[selected];
    headerColor = CATS[e.cat].color;
    heading = e.year + '  ' + e.title;
    blocks = [
      { label: '', text: e.desc },
      { label: 'Ethical principle', text: e.principle },
      { label: e.respLabel, text: e.response }
    ];
  }

  // header band
  noStroke();
  fill(headerColor);
  rect(px, PANEL_TOP, pw, headerH, 10, 10, 0, 0);
  fill('white');
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  let hs = 18;
  textSize(hs);
  const catName = selected >= 0 ? CATS[EVENTS[selected].cat].label : '';
  const showCat = selected >= 0 && pw > 560;
  textSize(13);
  const catW = showCat ? textWidth(catName) + 24 : 0;
  textSize(hs);
  while (textWidth(heading) > pw - 24 - catW && hs > 10) {
    hs -= 0.5;
    textSize(hs);
  }
  text(heading, px + 12, PANEL_TOP + headerH / 2 + 1);
  if (showCat) {
    textStyle(NORMAL);
    textSize(13);
    textAlign(RIGHT, CENTER);
    text(catName, px + pw - 12, PANEL_TOP + headerH / 2 + 1);
  }
  textStyle(NORMAL);

  // body text: shrink the font until all blocks fit in the panel
  const bodyTop = PANEL_TOP + headerH + 10;
  const textW = pw - 24;
  const bodyH = PANEL_TOP + ph - bodyTop - 8;
  let ts = 16;
  let layout = layoutBlocks(blocks, ts, textW);
  while (layout.height > bodyH && ts > 9) {
    ts -= 0.5;
    layout = layoutBlocks(blocks, ts, textW);
  }
  const lineH = ts * 1.32;
  let y = bodyTop;
  textAlign(LEFT, TOP);
  textSize(ts);
  for (let b = 0; b < blocks.length; b++) {
    const lines = layout.lines[b];
    for (let k = 0; k < lines.length; k++) {
      noStroke();
      // the first line of a labeled block starts with the bold label
      if (k === 0 && blocks[b].label !== '') {
        textStyle(BOLD);
        fill(headerColor);
        text(blocks[b].label + ':', px + 12, y);
        textStyle(NORMAL);
      }
      fill('black');
      text(lines[k], px + 12 + (k === 0 ? layout.indent[b] : 0), y);
      y += lineH;
    }
    y += layout.gap;
  }
}

// word-wrap every block at a given text size; labeled blocks indent line one
function layoutBlocks(blocks, ts, textW) {
  textSize(ts);
  const lineH = ts * 1.32;
  const gap = ts * 0.5;
  const lines = [];
  const indent = [];
  let h = 0;
  for (const b of blocks) {
    let ind = 0;
    if (b.label !== '') {
      textStyle(BOLD);
      ind = textWidth(b.label + ': ');
      textStyle(NORMAL);
    }
    const wrapped = wrapLines(b.text, textW, ind);
    lines.push(wrapped);
    indent.push(ind);
    h += wrapped.length * lineH + gap;
  }
  return { lines: lines, indent: indent, height: h, gap: gap };
}

// greedy word wrap using the current textSize; the first line is shortened
// by firstIndent pixels to leave room for a label
function wrapLines(str, maxW, firstIndent) {
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const trial = cur === '' ? w : cur + ' ' + w;
    const limit = lines.length === 0 ? maxW - (firstIndent || 0) : maxW;
    if (textWidth(trial) > limit && cur !== '') {
      lines.push(cur);
      cur = w;
    } else {
      cur = trial;
    }
  }
  if (cur !== '') lines.push(cur);
  return lines;
}

function drawTooltip() {
  if (hovered < 0) return;
  const e = EVENTS[hovered];
  const p = pills[hovered];
  textSize(13);
  textStyle(NORMAL);
  const label = e.year + ': ' + e.title;
  const tw = textWidth(label) + 14;
  const tx = constrain(p.cx - tw / 2, 4, canvasWidth - tw - 4);
  const ty = e.lane === 'top' ? p.y - 28 : p.y + p.h + 6;
  stroke('gray');
  strokeWeight(1);
  fill('lightyellow');
  rect(tx, ty, tw, 22, 5);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(label, tx + 7, ty + 11);
}

function drawControlLabel() {
  if (canvasWidth < 480) return;
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(canvasWidth < 600 ? 13 : defaultTextSize);
  const pos = ORDER.indexOf(selected);
  const label = selected < 0 ? EVENTS.length + ' events. Press Next to begin.' :
    'Event ' + (pos + 1) + ' of ' + EVENTS.length;
  text(label, 300, drawHeight + 25);
}

// ---------------------------------------------------------------------------
// interaction
// ---------------------------------------------------------------------------
function step(dir) {
  const pos = ORDER.indexOf(selected);
  if (selected < 0) {
    if (dir > 0) selected = ORDER[0];
  } else {
    const next = pos + dir;
    if (next >= 0 && next < ORDER.length) selected = ORDER[next];
  }
  updateButtons();
}

function updateButtons() {
  const pos = ORDER.indexOf(selected);
  if (selected < 0 || pos === 0) prevButton.attribute('disabled', '');
  else prevButton.removeAttribute('disabled');
  if (pos === ORDER.length - 1) nextButton.attribute('disabled', '');
  else nextButton.removeAttribute('disabled');
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  for (let i = 0; i < pills.length; i++) {
    const p = pills[i];
    if (mouseX >= p.x && mouseX <= p.x + p.w && mouseY >= p.y && mouseY <= p.y + p.h) {
      selected = i;
      updateButtons();
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
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
