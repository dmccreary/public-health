// Redlining to Present - Key Events and Health Consequences (timeline)
// CANVAS_HEIGHT: 580
// Housing policy and events sit above the time axis. Health research that
// documents the consequences sits below it. Click a year marker, or step
// through the events in date order with the Previous and Next buttons.
// Step-through interaction (Bloom: Understand). No animation.

// ---- canvas layout (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 800;
let drawHeight = 530;
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
const PANEL_TOP = 272;

// ---- categories (color coding from the specification) ----
const CATS = {
  harm:     { label: 'Discriminatory policy or setback', color: 'firebrick',   text: 'white' },
  reform:   { label: 'Reform',                           color: 'forestgreen', text: 'white' },
  research: { label: 'Health research',                  color: 'darkorange',  text: 'black' }
};

// ---- events ----
// lane 'top'    = housing policy and events (above the axis)
// lane 'bottom' = health research and evidence (below the axis)
// Each event has a three-sentence summary and one key fact.
const EVENTS = [
  {
    year: 1933, show: '1933', lane: 'top', cat: 'harm',
    title: 'Home Owners\' Loan Corporation (HOLC) created',
    summary: 'Congress created the HOLC in 1933 to refinance home mortgages that were in default during the Great Depression. Between 1935 and 1940 the agency drew color-coded "residential security" maps of American cities. Neighborhoods with Black, immigrant, or low-income residents were routinely given the lowest grade and colored red.',
    fact: 'HOLC maps graded neighborhoods from A (green, "best") to D (red, "hazardous"). Maps of more than 200 cities survive.',
    source: ''
  },
  {
    year: 1934, show: '1934', lane: 'top', cat: 'harm',
    title: 'Federal Housing Administration (FHA) created',
    summary: 'The National Housing Act of 1934 created the FHA to insure private home mortgages. FHA underwriting rules treated Black and racially mixed neighborhoods as poor credit risks and favored new, all-white suburbs. Denying mortgage insurance by neighborhood in this way became known as redlining.',
    fact: 'A widely cited estimate: of the housing financed by the FHA and the Veterans Administration from 1934 to 1962, about 98% went to white households.',
    source: ''
  },
  {
    year: 1944, show: '1944', lane: 'top', cat: 'harm',
    title: 'GI Bill home loans',
    summary: 'The Servicemen\'s Readjustment Act of 1944 offered returning veterans low-cost, government-guaranteed home loans. The law did not mention race, but the loans were made by private banks and the program was run locally. Black veterans were largely shut out, so the postwar growth in home ownership and family wealth went mostly to white families.',
    fact: 'A 1947 survey of 13 Mississippi cities found that only 2 of 3,229 VA-guaranteed loans had gone to Black veterans.',
    source: 'Katznelson, When Affirmative Action Was White (2005)'
  },
  {
    year: 1968, show: '1968', lane: 'top', cat: 'reform',
    title: 'Fair Housing Act',
    summary: 'Title VIII of the Civil Rights Act of 1968 banned discrimination in the sale, rental, and financing of housing. It made redlining illegal as an explicit practice. It did not undo the segregated neighborhoods and the wealth gap that three decades of redlining had already produced.',
    fact: 'President Johnson signed the act on April 11, 1968, one week after the assassination of Martin Luther King Jr.',
    source: ''
  },
  {
    year: 1977, show: '1977', lane: 'top', cat: 'reform',
    title: 'Community Reinvestment Act (CRA)',
    summary: 'The Community Reinvestment Act requires federal regulators to rate how well banks meet the credit needs of the whole community they serve, including low- and moderate-income neighborhoods. It followed the Home Mortgage Disclosure Act of 1975, which made lenders report where they make loans. Together the two laws made lending patterns visible and gave regulators a way to challenge disinvestment.',
    fact: 'Home Mortgage Disclosure Act data are still the main public source used to measure lending discrimination.',
    source: ''
  },
  {
    year: 1982, show: '1980s', lane: 'top', cat: 'harm',
    title: 'Deregulation opens the door to subprime lending',
    summary: 'Federal laws passed in 1980 and 1982 removed state limits on mortgage interest rates and allowed adjustable-rate and other nontraditional loans. High-cost subprime lending then grew quickly in the 1990s and 2000s. Lenders concentrated these loans in the same Black and Latino neighborhoods that had once been denied credit, a pattern called reverse redlining.',
    fact: 'The same neighborhoods moved from being denied credit to being targeted with high-cost credit.',
    source: ''
  },
  {
    year: 2008, show: '2008', lane: 'top', cat: 'harm',
    title: 'Foreclosure crisis',
    summary: 'The collapse of the subprime mortgage market set off a wave of foreclosures and the Great Recession. Black and Latino homeowners, who were more likely to hold high-cost loans, lost homes and home equity at higher rates than white homeowners. Foreclosure and neighborhood vacancy are themselves linked to worse physical and mental health.',
    fact: 'From 2005 to 2009, median household wealth fell 66% for Hispanic households and 53% for Black households, compared with 16% for white households.',
    source: 'Pew Research Center (2011)'
  },
  {
    year: 2020, show: '2020', lane: 'top', cat: 'harm',
    title: 'Federal fair housing rule repealed',
    summary: 'A 2015 federal rule, Affirmatively Furthering Fair Housing, required communities that receive federal housing funds to analyze patterns of segregation and plan to reduce them. The Department of Housing and Urban Development suspended the rule in 2018 and repealed it in 2020. In 2021 the department restored parts of it.',
    fact: 'The duty to "affirmatively further" fair housing comes from the 1968 Fair Housing Act itself.',
    source: ''
  },
  {
    year: 1985, show: '1985', lane: 'bottom', cat: 'research',
    title: 'Heckler Report on Black and minority health',
    summary: 'The Report of the Secretary\'s Task Force on Black and Minority Health was a landmark federal study of racial and ethnic health disparities in the United States. Health and Human Services Secretary Margaret Heckler released it in 1985. The report led to the creation of the federal Office of Minority Health in 1986.',
    fact: 'The report counted about 60,000 excess deaths each year among Black and other minority Americans.',
    source: 'US Department of Health and Human Services (1985)'
  },
  {
    year: 1992, show: '1992', lane: 'bottom', cat: 'research',
    title: 'Weathering hypothesis',
    summary: 'Public health researcher Arline Geronimus proposed that the health of Black women begins to decline in early adulthood because of the cumulative burden of social and economic disadvantage. She called this process weathering. Later studies measured weathering with allostatic load, a set of biological markers of chronic stress.',
    fact: 'A 2006 study found that Black adults had higher allostatic load scores than white adults at every age.',
    source: 'Geronimus, Ethnicity & Disease (1992); Geronimus et al., American Journal of Public Health (2006)'
  },
  {
    year: 2001, show: '2001', lane: 'bottom', cat: 'research',
    title: 'Segregation named a fundamental cause',
    summary: 'David Williams and Chiquita Collins reviewed the evidence and argued that racial residential segregation is a fundamental cause of racial disparities in health. Segregation shapes access to education, jobs, housing quality, and medical care, so it affects many diseases at once. The paper moved attention from individual behavior to the places people had been sorted into.',
    fact: 'Because segregation was built by policy, the paper implies that its health effects can be reduced by policy.',
    source: 'Williams & Collins, Public Health Reports (2001)'
  },
  {
    year: 2016, show: '2016', lane: 'bottom', cat: 'research',
    title: 'HOLC maps put online (Mapping Inequality)',
    summary: 'The Mapping Inequality project, led by Robert K. Nelson at the University of Richmond, published digitized HOLC maps and neighborhood descriptions online. Researchers could now lay the 1930s grades over present-day health and environmental data. A wave of studies on redlining and health followed.',
    fact: 'The project made the redlining maps of more than 200 cities free to view and download.',
    source: 'Nelson et al., Mapping Inequality, University of Richmond'
  },
  {
    year: 2020, show: '2020', lane: 'bottom', cat: 'research',
    title: 'Redlining and asthma',
    summary: 'Anthony Nardone and colleagues compared HOLC grades from the 1930s with present-day asthma emergency visits in eight California cities. Neighborhoods once graded D had more diesel exhaust pollution and more asthma emergency visits than neighborhoods once graded A. The difference remained after the researchers adjusted for present-day poverty.',
    fact: 'Asthma emergency department visit rates were about 2.4 times higher in formerly redlined tracts than in A-graded tracts.',
    source: 'Nardone et al., The Lancet Planetary Health (2020)'
  },
  {
    year: 2020, show: '2020', lane: 'bottom', cat: 'research',
    title: 'Redlining and urban heat',
    summary: 'Jeremy Hoffman, Vivek Shandas, and Nicholas Pendleton compared summer land surface temperatures with HOLC grades in 108 US urban areas. Formerly redlined neighborhoods were hotter than non-redlined neighborhoods in the same city in 94% of the areas studied. Hotter neighborhoods carry a higher risk of heat-related illness.',
    fact: 'Formerly redlined areas were about 2.6 °C (roughly 5 °F) warmer on average, and up to 7 °C warmer in some cities.',
    source: 'Hoffman, Shandas & Pendleton, Climate (2020)'
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

  describe('A horizontal timeline from 1930 to 2025. Year markers above the axis are housing ' +
    'policies and events, from the creation of the Home Owners\' Loan Corporation in 1933 to ' +
    'the repeal of a federal fair housing rule in 2020. Year markers below the axis are health ' +
    'research findings, from the 1985 Heckler Report to 2020 studies linking redlining to ' +
    'asthma and urban heat. Selecting a marker shows a three-sentence summary and a key fact.');
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
    text(e.show, p.cx, p.cy + 1);
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
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  const title = canvasWidth < 640 ? 'Redlining to Present' :
    'Redlining to Present: Key Events and Health Consequences';
  textSize(canvasWidth < 520 ? 18 : 21);
  text(title, canvasWidth / 2, 8);

  // lane captions
  const cs = canvasWidth < 520 ? 11 : 13;
  textSize(cs);
  textStyle(BOLD);
  textAlign(RIGHT, TOP);
  fill('black');
  text(canvasWidth < 520 ? 'Above: housing policy' : 'Above the line: housing policy and events',
    canvasWidth - 12, 38);
  textAlign(LEFT, TOP);
  text(canvasWidth < 520 ? 'Below: health research' : 'Below the line: health research',
    12, AXIS_Y + 30);
  textStyle(NORMAL);

  // color legend, in the empty lower-left part of the timeline
  let ly = AXIS_Y + 30 + cs + 8;
  textAlign(LEFT, CENTER);
  for (const key of ['harm', 'reform', 'research']) {
    noStroke();
    fill(CATS[key].color);
    rect(12, ly, 22, 12, 6);
    fill('black');
    textSize(cs - 1);
    text(CATS[key].label, 40, ly + 6);
    ly += cs + 7;
  }
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

  let headerColor = 'steelblue';
  let headerText = 'white';
  let heading = 'How to use this timeline';
  let blocks;

  if (selected < 0) {
    blocks = [
      { label: '', text: 'Redlining was the practice of denying mortgages and mortgage insurance to whole neighborhoods, mostly on the basis of race. It was federal policy from the 1930s until the Fair Housing Act of 1968.' },
      { label: '', text: 'Click a year marker, or press Next, to step through the events in date order. Each event has a short summary and a key fact.' },
      { label: 'Look for', text: 'How long the policies above the line were in force before the research below the line documented their health effects.' }
    ];
  } else {
    const e = EVENTS[selected];
    headerColor = CATS[e.cat].color;
    headerText = CATS[e.cat].text;
    heading = e.show + '  ' + e.title;
    blocks = [
      { label: '', text: e.summary },
      { label: 'Key fact', text: e.fact }
    ];
    if (e.source !== '') blocks.push({ label: 'Source', text: e.source });
  }

  // header band
  noStroke();
  fill(headerColor);
  rect(px, PANEL_TOP, pw, headerH, 10, 10, 0, 0);
  fill(headerText);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  let hs = 18;
  textSize(hs);
  while (textWidth(heading) > pw - 24 && hs > 10) {
    hs -= 0.5;
    textSize(hs);
  }
  text(heading, px + 12, PANEL_TOP + headerH / 2 + 1);
  textStyle(NORMAL);

  // category name under the header
  let bodyTop = PANEL_TOP + headerH + 8;
  if (selected >= 0) {
    noStroke();
    fill('dimgray');
    textSize(13);
    textAlign(LEFT, TOP);
    textStyle(ITALIC);
    const e = EVENTS[selected];
    text(CATS[e.cat].label + (e.lane === 'top' ? ' (housing policy)' : ' (health evidence)'),
      px + 12, bodyTop);
    textStyle(NORMAL);
    bodyTop += 22;
  }

  // body text: shrink the font until all blocks fit in the panel
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
        fill(selected >= 0 && EVENTS[selected].cat === 'research' ? 'chocolate' : headerColor);
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
  const label = e.show + ': ' + e.title;
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
