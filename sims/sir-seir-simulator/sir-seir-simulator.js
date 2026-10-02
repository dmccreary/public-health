// Interactive SIR / SEIR / SEIRD / SEIRV Epidemic Simulator
// CANVAS_HEIGHT: 625
// The model is re-solved every time a control changes. Nothing is animated:
// the curves are the full 365-day solution for the current parameters.
//
// Equations (the same forms used in Chapter 15). N is the starting population.
//   new infections per day = beta * S * I / N
//   SIR:    dS/dt = -beta*S*I/N
//           dI/dt =  beta*S*I/N - gamma*I
//           dR/dt =  gamma*I
//   SEIR:   dE/dt =  beta*S*I/N - sigma*E
//           dI/dt =  sigma*E - gamma*I
//   SEIRD:  dI/dt =  sigma*E - (gamma + mu)*I
//           dR/dt =  gamma*I          dD/dt = mu*I
//   SEIRV:  dS/dt = -beta*S*I/N - nu*S
//           dR/dt =  gamma*I + nu*S
//   R0 = beta / gamma            (SEIRD: beta / (gamma + mu))
//   herd immunity threshold = 1 - 1/R0

// ---- canvas layout (standard MicroSim structure) ----
let containerWidth;
let canvasWidth = 800;
let drawHeight = 475;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 14;
let defaultTextSize = 16;

// ---- plot layout ----
const PLOT1_TOP = 70;
const PLOT1_H = 188;
const PLOT2_TOP = 304;
const PLOT2_H = 122;
const PLOT_LEFT = 62;

// ---- model constants ----
const DAYS = 365;
const DT = 0.1;                 // integration step in days (4th-order Runge-Kutta)
const SEED_FRACTION = 0.001;    // 0.1% of the population is infectious on day 0

const DEFAULTS = { model: 'SIR', beta: 0.25, gamma: 0.10, sigma: 0.20, mu: 0.005, nu: 0.010, N: 10000 };

const COLORS = {
  S: 'royalblue',
  E: 'darkorange',
  I: 'crimson',
  R: 'forestgreen',
  D: 'black',
  C: 'purple'
};

// ---- state ----
let current = null;     // result of simulate() for the controls as they are now
let saved = null;       // run stored by the Compare button
let lastKey = '';

// ---- controls ----
let modelSelect, compareButton, resetButton;
let betaSlider, gammaSlider, sigmaSlider, muSlider, nuSlider, popSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  const mainEl = document.querySelector('main');

  modelSelect = createSelect();
  modelSelect.parent(mainEl);
  for (const m of ['SIR', 'SEIR', 'SEIRD', 'SEIRV']) modelSelect.option(m);
  modelSelect.selected(DEFAULTS.model);
  modelSelect.style('font-size', '15px');

  compareButton = createButton('Save Run to Compare');   // text is set in positionControls()
  compareButton.parent(mainEl);
  compareButton.mousePressed(toggleCompare);

  resetButton = createButton('Reset');
  resetButton.parent(mainEl);
  resetButton.mousePressed(resetAll);

  for (const b of [compareButton, resetButton]) {
    b.style('font-size', '15px');
    b.style('cursor', 'pointer');
  }

  // sliders: min, max, default, step (ranges from the chapter specification)
  betaSlider = createSlider(0.1, 1.0, DEFAULTS.beta, 0.01);
  gammaSlider = createSlider(0.05, 0.5, DEFAULTS.gamma, 0.01);
  sigmaSlider = createSlider(0.1, 0.5, DEFAULTS.sigma, 0.01);
  muSlider = createSlider(0, 0.05, DEFAULTS.mu, 0.001);
  nuSlider = createSlider(0, 0.1, DEFAULTS.nu, 0.001);
  popSlider = createSlider(1000, 100000, DEFAULTS.N, 1000);
  for (const s of allSliders()) s.parent(mainEl);

  positionControls();

  describe('An epidemic simulator with a model menu (SIR, SEIR, SEIRD, SEIRV) and sliders for ' +
    'transmission rate beta, recovery rate gamma, progression rate sigma, mortality rate mu, ' +
    'vaccination rate nu, and population size. The upper chart shows the number of people ' +
    'susceptible, exposed, infectious, recovered, and dead over 365 days, with a dashed line at ' +
    'the herd immunity threshold. The lower chart shows cumulative cases and deaths. A side ' +
    'panel reports R0, the herd immunity threshold, the peak, and the total infected.');
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

  // re-solve the model only when a control has changed
  const p = readParams();
  const key = JSON.stringify(p);
  if (key !== lastKey) {
    current = simulate(p);
    lastKey = key;
    updateSliderStates(p.model);
  }

  drawTitle();
  drawLegend();
  drawCompartmentPlot();
  drawCumulativePlot();
  drawStats();
  drawHover();
  drawControlLabels(p);
}

// ---------------------------------------------------------------------------
// model
// ---------------------------------------------------------------------------
function readParams() {
  return {
    model: modelSelect.value(),
    beta: betaSlider.value(),
    gamma: gammaSlider.value(),
    sigma: sigmaSlider.value(),
    mu: muSlider.value(),
    nu: nuSlider.value(),
    N: popSlider.value()
  };
}

// right-hand side of the differential equations; y = [S, E, I, R, D, C]
// C is cumulative infections (it only ever increases)
function derivatives(y, p) {
  const S = y[0], E = y[1], I = y[2];
  const hasE = p.model !== 'SIR';
  const mu = p.model === 'SEIRD' ? p.mu : 0;
  const nu = p.model === 'SEIRV' ? p.nu : 0;
  const newInfections = p.beta * S * I / p.N;

  const dS = -newInfections - nu * S;
  const dE = hasE ? newInfections - p.sigma * E : 0;
  const dI = (hasE ? p.sigma * E : newInfections) - (p.gamma + mu) * I;
  const dR = p.gamma * I + nu * S;
  const dD = mu * I;
  const dC = newInfections;
  return [dS, dE, dI, dR, dD, dC];
}

// one 4th-order Runge-Kutta step
function rk4Step(y, p, h) {
  const k1 = derivatives(y, p);
  const k2 = derivatives(y.map((v, i) => v + 0.5 * h * k1[i]), p);
  const k3 = derivatives(y.map((v, i) => v + 0.5 * h * k2[i]), p);
  const k4 = derivatives(y.map((v, i) => v + h * k3[i]), p);
  return y.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}

// solve the model for 365 days and keep one sample per day
function simulate(p) {
  const I0 = Math.max(1, Math.round(p.N * SEED_FRACTION));
  let y = [p.N - I0, 0, I0, 0, 0, I0];
  const out = { p: p, S: [], E: [], I: [], R: [], D: [], C: [] };
  const stepsPerDay = Math.round(1 / DT);
  for (let day = 0; day <= DAYS; day++) {
    out.S.push(y[0]); out.E.push(y[1]); out.I.push(y[2]);
    out.R.push(y[3]); out.D.push(y[4]); out.C.push(y[5]);
    for (let k = 0; k < stepsPerDay; k++) y = rk4Step(y, p, DT);
  }

  // summary numbers
  const mu = p.model === 'SEIRD' ? p.mu : 0;
  out.R0 = p.beta / (p.gamma + mu);
  out.hit = out.R0 > 1 ? 1 - 1 / out.R0 : 0;
  out.peakI = 0;
  out.peakDay = 0;
  for (let d = 0; d <= DAYS; d++) {
    if (out.I[d] > out.peakI) { out.peakI = out.I[d]; out.peakDay = d; }
  }
  out.total = out.C[DAYS];
  out.deaths = out.D[DAYS];
  out.finalS = out.S[DAYS];
  out.stillActive = (out.I[DAYS] + out.E[DAYS]) > Math.max(1, p.N * 0.0005);
  return out;
}

// ---------------------------------------------------------------------------
// plot geometry
// ---------------------------------------------------------------------------
function statsWidth() { return canvasWidth >= 620 ? 205 : 0; }
function plotRight() { return canvasWidth - statsWidth() - 14; }
function plotLeft() { return canvasWidth < 480 ? 48 : PLOT_LEFT; }
function dayX(d) { return map(d, 0, DAYS, plotLeft(), plotRight()); }
function valY(v, N, top, h) { return map(v, 0, N, top + h, top); }

function drawAxes(top, h, N, showDayLabel) {
  const left = plotLeft();
  const right = plotRight();

  // plot background and horizontal grid lines
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(left, top, right - left, h);
  textSize(12);
  textStyle(NORMAL);
  for (let k = 0; k <= 4; k++) {
    const v = N * k / 4;
    const y = valY(v, N, top, h);
    stroke('gainsboro');
    strokeWeight(1);
    if (k > 0 && k < 4) line(left, y, right, y);
    noStroke();
    fill('black');
    textAlign(RIGHT, CENTER);
    text(formatCount(v), left - 5, y);
  }

  // day ticks
  const tickStep = (right - left) < 300 ? 100 : 50;
  for (let d = 0; d <= DAYS; d += tickStep) {
    const x = dayX(d);
    stroke('gainsboro');
    strokeWeight(1);
    if (d > 0) line(x, top, x, top + h);
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    text(d, x, top + h + 4);
  }
  if (showDayLabel) {
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textSize(13);
    text('Day', (left + right) / 2, top + h + 19);
  }

  // y-axis label (dropped when there is no room beside the tick labels)
  if (canvasWidth < 480) return;
  push();
  translate(13, top + h / 2);
  rotate(-HALF_PI);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(13);
  text('People', 0, 0);
  pop();
}

function drawSeries(values, N, top, h, col, dashed, weight) {
  noFill();
  stroke(col);
  strokeWeight(weight || 2.5);
  if (dashed) drawingContext.setLineDash([6, 5]);
  beginShape();
  for (let d = 0; d <= DAYS; d++) vertex(dayX(d), valY(values[d], N, top, h));
  endShape();
  drawingContext.setLineDash([]);
}

function compartmentsFor(model) {
  if (model === 'SIR') return ['S', 'I', 'R'];
  if (model === 'SEIRD') return ['S', 'E', 'I', 'R', 'D'];
  return ['S', 'E', 'I', 'R'];
}

// ---------------------------------------------------------------------------
// drawing
// ---------------------------------------------------------------------------
function drawTitle() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 520 ? 17 : 21);
  text(current.p.model + ' Epidemic Simulator', canvasWidth / 2, 7);
}

function drawLegend() {
  const names = { S: 'Susceptible', E: 'Exposed', I: 'Infectious', R: 'Recovered', D: 'Dead' };
  // with vaccination, R holds everyone who is immune, by infection or by vaccine
  if (current.p.model === 'SEIRV') names.R = 'Recovered or vaccinated';
  const narrow = statsWidth() === 0;
  const small = plotRight() - plotLeft() < 380;
  textSize(small ? 11 : 13);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  let x = plotLeft();
  let y = narrow ? 56 : 42;
  const items = compartmentsFor(current.p.model).map(c =>
    ({ label: small ? c : names[c] + ' (' + c + ')', color: COLORS[c], dashed: false }));
  if (saved) items.push({ label: small ? 'saved' : 'saved run', color: 'gray', dashed: true });

  for (const it of items) {
    const w = 20 + textWidth(it.label);
    // wrap to a second row when the next item would run past the chart
    if (x + w > plotRight() && x > plotLeft()) {
      x = plotLeft();
      y += 15;
    }
    stroke(it.color);
    strokeWeight(it.dashed ? 2 : 3);
    if (it.dashed) drawingContext.setLineDash([5, 4]);
    line(x, y, x + 16, y);
    drawingContext.setLineDash([]);
    noStroke();
    fill('black');
    text(it.label, x + 20, y);
    x += w + (small ? 9 : 14);
  }
}

function drawCompartmentPlot() {
  const r = current;
  const N = r.p.N;
  const top = PLOT1_TOP;
  const h = PLOT1_H;
  drawAxes(top, h, N, false);

  // saved run underneath, dashed (S and I only, to keep the chart readable)
  if (saved) {
    const scale = N / saved.p.N;      // draw the saved run on the current y-axis
    drawSeries(saved.S.map(v => v * scale), N, top, h, 'lightskyblue', true, 2);
    drawSeries(saved.I.map(v => v * scale), N, top, h, 'lightcoral', true, 2);
  }

  // herd immunity threshold: the epidemic stops growing when S falls to N / R0
  if (r.R0 > 1) {
    const yT = valY(N / r.R0, N, top, h);
    stroke('dimgray');
    strokeWeight(1.5);
    drawingContext.setLineDash([7, 5]);
    line(plotLeft(), yT, plotRight(), yT);
    drawingContext.setLineDash([]);
    noStroke();
    fill('dimgray');
    textSize(12);
    textStyle(ITALIC);
    textAlign(RIGHT, BOTTOM);
    const wide = plotRight() - plotLeft() > 380;
    text(wide ? 'Herd immunity threshold: S = N/R₀ (' + nf(r.hit * 100, 1, 0) + '% immune)' :
      'Herd immunity threshold', plotRight() - 6, yT - 2);
    textStyle(NORMAL);

    // overshoot: how far S ends up below the threshold (not shown with vaccination)
    const yEnd = valY(r.finalS, N, top, h);
    if (r.p.model !== 'SEIRV' && !r.stillActive && yEnd - yT > 14) {
      const bx = plotRight() - 10;
      stroke('black');
      strokeWeight(1.5);
      line(bx, yT + 2, bx, yEnd - 2);
      line(bx - 4, yT + 2, bx + 4, yT + 2);
      line(bx - 4, yEnd - 2, bx + 4, yEnd - 2);
      noStroke();
      fill('black');
      textSize(12);
      textAlign(RIGHT, CENTER);
      text('overshoot', bx - 7, (yT + yEnd) / 2);
    }
  }

  for (const c of compartmentsFor(r.p.model)) drawSeries(r[c], N, top, h, COLORS[c], false);

  // mark the peak of the infectious curve
  if (r.peakDay > 0) {
    stroke('white');
    strokeWeight(1.5);
    fill(COLORS.I);
    circle(dayX(r.peakDay), valY(r.peakI, N, top, h), 9);
  }
}

function drawCumulativePlot() {
  const r = current;
  const N = r.p.N;
  const top = PLOT2_TOP;
  const h = PLOT2_H;

  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text('Cumulative cases and deaths', plotLeft(), top - 5);
  textStyle(NORMAL);

  drawAxes(top, h, N, true);
  if (saved) {
    const scale = N / saved.p.N;
    drawSeries(saved.C.map(v => v * scale), N, top, h, 'plum', true, 2);
  }
  drawSeries(r.C, N, top, h, COLORS.C, false);
  if (r.p.model === 'SEIRD') drawSeries(r.D, N, top, h, COLORS.D, false);

  // label the ends of the curves
  noStroke();
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  fill(COLORS.C);
  const yC = valY(r.total, N, top, h);
  text('Cases: ' + formatCount(r.total), plotRight() - 6, yC < top + 18 ? yC + 18 : yC - 3);
  if (r.p.model === 'SEIRD') {
    fill(COLORS.D);
    text('Deaths: ' + formatCount(r.deaths), plotRight() - 6, valY(r.deaths, N, top, h) - 3);
  }
}

function drawStats() {
  const r = current;
  const N = r.p.N;
  const sw = statsWidth();

  if (sw === 0) {
    // narrow layout: no room for the side panel, so the key numbers go on
    // one line under the title
    noStroke();
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    fill(r.R0 > 1 ? 'firebrick' : 'darkgreen');
    let line1 = 'R\u2080 = ' + nf(r.R0, 1, 2) + '   peak ' + formatCount(r.peakI) +
      ' on day ' + r.peakDay + '   total infected ' + pct(r.total / N);
    let ts = 14;
    textSize(ts);
    while (textWidth(line1) > canvasWidth - 16 && ts > 9) {
      ts -= 0.5;
      textSize(ts);
    }
    text(line1, canvasWidth / 2, 30);
    textStyle(NORMAL);
    return;
  }

  const sx = canvasWidth - sw - 4;
  const sy = 36;
  const sh = drawHeight - sy - 8;
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 240);
  rect(sx, sy, sw - 4, sh, 10);

  // prominent R0
  noStroke();
  fill(r.R0 > 1 ? 'firebrick' : 'darkgreen');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(30);
  text('R₀ = ' + nf(r.R0, 1, 2), sx + (sw - 4) / 2, sy + 10);
  textStyle(NORMAL);
  textSize(13);
  fill('black');
  text(r.p.model === 'SEIRD' ? 'R₀ = β / (γ + μ)' : 'R₀ = β / γ',
    sx + (sw - 4) / 2, sy + 46);
  fill(r.R0 > 1 ? 'firebrick' : 'darkgreen');
  textStyle(BOLD);
  text(r.R0 > 1 ? 'Epidemic grows' : 'Outbreak fades out', sx + (sw - 4) / 2, sy + 64);
  textStyle(NORMAL);

  // rows of summary numbers
  const rows = [];
  rows.push(['Herd immunity threshold', r.R0 > 1 ? pct(r.hit) + ' immune' : 'not reached (R₀ ≤ 1)']);
  rows.push(['Peak infectious', formatCount(r.peakI) + ' (' + pct(r.peakI / N) + ') on day ' + r.peakDay]);
  rows.push(['Total infected by day 365', formatCount(r.total) + ' (' + pct(r.total / N) + ')']);
  if (r.p.model === 'SEIRD') {
    rows.push(['Deaths', formatCount(r.deaths) + '  (case fatality ' +
      pct(r.p.mu / (r.p.gamma + r.p.mu)) + ')']);
  }
  if (r.p.model === 'SEIRV') {
    rows.push(['Vaccinated before infection', formatCount(max(0, N - r.finalS - r.total)) +
      ' (' + pct(max(0, N - r.finalS - r.total) / N) + ')']);
  } else if (r.R0 > 1 && !r.stillActive) {
    rows.push(['Overshoot past threshold', pct(max(0, r.total / N - r.hit)) + ' of population']);
  }
  if (r.stillActive) rows.push(['Note', 'Epidemic still active on day 365']);

  let y = sy + 92;
  for (const row of rows) {
    noStroke();
    fill('dimgray');
    textAlign(LEFT, TOP);
    textSize(12);
    text(row[0], sx + 10, y);
    fill('black');
    textSize(13.5);
    textStyle(BOLD);
    text(row[1], sx + 10, y + 15);
    textStyle(NORMAL);
    y += 40;
  }

  // saved run summary
  if (saved) {
    stroke('silver');
    strokeWeight(1);
    line(sx + 10, y + 2, sx + sw - 14, y + 2);
    noStroke();
    fill('dimgray');
    textSize(12);
    textAlign(LEFT, TOP);
    text('Saved run (dashed): ' + saved.p.model, sx + 10, y + 8);
    fill('black');
    textSize(12.5);
    text('R₀ ' + nf(saved.R0, 1, 2) + ', peak ' + pct(saved.peakI / saved.p.N) +
      ' on day ' + saved.peakDay, sx + 10, y + 24);
    text('Total infected ' + pct(saved.total / saved.p.N), sx + 10, y + 40);
  }
}

// vertical read-out line that follows the mouse over either chart
function drawHover() {
  if (mouseX < plotLeft() || mouseX > plotRight()) return;
  const inPlot1 = mouseY >= PLOT1_TOP && mouseY <= PLOT1_TOP + PLOT1_H;
  const inPlot2 = mouseY >= PLOT2_TOP && mouseY <= PLOT2_TOP + PLOT2_H;
  if (!inPlot1 && !inPlot2) return;

  const r = current;
  const d = constrain(Math.round(map(mouseX, plotLeft(), plotRight(), 0, DAYS)), 0, DAYS);
  const x = dayX(d);
  stroke('gray');
  strokeWeight(1);
  line(x, PLOT1_TOP, x, PLOT1_TOP + PLOT1_H);
  line(x, PLOT2_TOP, x, PLOT2_TOP + PLOT2_H);

  const parts = ['Day ' + d];
  if (inPlot1) {
    for (const c of compartmentsFor(r.p.model)) parts.push(c + ' ' + formatCount(r[c][d]));
  } else {
    parts.push('cases ' + formatCount(r.C[d]));
    if (r.p.model === 'SEIRD') parts.push('deaths ' + formatCount(r.D[d]));
  }
  const label = parts.join('   ');
  textSize(12.5);
  textStyle(NORMAL);
  const tw = textWidth(label) + 12;
  const tx = constrain(x - tw / 2, plotLeft(), plotRight() - tw);
  const ty = (inPlot1 ? PLOT1_TOP + PLOT1_H : PLOT2_TOP + PLOT2_H) - 24;
  stroke('gray');
  strokeWeight(1);
  fill('lightyellow');
  rect(tx, ty, tw, 20, 4);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(label, tx + 6, ty + 10);
}

// ---------------------------------------------------------------------------
// controls
// ---------------------------------------------------------------------------
function allSliders() {
  return [betaSlider, gammaSlider, sigmaSlider, muSlider, nuSlider, popSlider];
}

function labelWidth() { return canvasWidth >= 640 ? 172 : (canvasWidth >= 500 ? 84 : 70); }

// two columns of three sliders under a row with the menu and buttons
function positionControls() {
  const colW = canvasWidth / 2;
  const lw = labelWidth();
  const sliders = allSliders();
  for (let i = 0; i < sliders.length; i++) {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    sliders[i].position(col * colW + 10 + lw, drawHeight + 45 + row * 33);
    sliders[i].size(colW - lw - 24);
  }
  modelSelect.position(66, drawHeight + 9);
  compareButton.position(150, drawHeight + 7);
  compareButton.size(canvasWidth < 480 ? 105 : 185, 28);
  compareButton.html(compareLabel());
  resetButton.position(canvasWidth < 480 ? 262 : 343, drawHeight + 7);
  resetButton.size(66, 28);
}

function drawControlLabels(p) {
  const wide = canvasWidth >= 640;
  const colW = canvasWidth / 2;
  const hasE = p.model !== 'SIR';
  const labels = [
    [wide ? 'Transmission β: ' : 'β ', nf(p.beta, 1, 2), true],
    [wide ? 'Recovery γ: ' : 'γ ', nf(p.gamma, 1, 2), true],
    [wide ? 'Progression σ: ' : 'σ ', nf(p.sigma, 1, 2), hasE],
    [wide ? 'Mortality μ: ' : 'μ ', nf(p.mu, 1, 3), p.model === 'SEIRD'],
    [wide ? 'Vaccination ν: ' : 'ν ', nf(p.nu, 1, 3), p.model === 'SEIRV'],
    [wide ? 'Population N: ' : 'N ', formatCount(p.N), true]
  ];

  noStroke();
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(canvasWidth < 500 ? 13 : 15);
  fill('black');
  text('Model:', 10, drawHeight + 22);

  for (let i = 0; i < labels.length; i++) {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const active = labels[i][2];
    noStroke();
    fill(active ? 'black' : 'gray');
    // a parameter the chosen model does not use is shown as "not used"
    const value = active ? labels[i][1] : (wide ? 'not used' : '--');
    text(labels[i][0] + value, col * colW + 10, drawHeight + 56 + row * 33);
  }
}

// sliders for parameters the chosen model does not use are disabled
function updateSliderStates(model) {
  setEnabled(sigmaSlider, model !== 'SIR');
  setEnabled(muSlider, model === 'SEIRD');
  setEnabled(nuSlider, model === 'SEIRV');
}

function setEnabled(slider, on) {
  if (on) slider.removeAttribute('disabled');
  else slider.attribute('disabled', '');
}

// button text depends on whether a run is saved and on the canvas width
function compareLabel() {
  if (canvasWidth < 480) return saved ? 'Clear Saved' : 'Save Run';
  return saved ? 'Clear Saved Run' : 'Save Run to Compare';
}

function toggleCompare() {
  saved = saved ? null : current;
  compareButton.html(compareLabel());
}

function resetAll() {
  modelSelect.selected(DEFAULTS.model);
  betaSlider.value(DEFAULTS.beta);
  gammaSlider.value(DEFAULTS.gamma);
  sigmaSlider.value(DEFAULTS.sigma);
  muSlider.value(DEFAULTS.mu);
  nuSlider.value(DEFAULTS.nu);
  popSlider.value(DEFAULTS.N);
  saved = null;
  compareButton.html(compareLabel());
}

// ---------------------------------------------------------------------------
// formatting helpers
// ---------------------------------------------------------------------------
function formatCount(v) {
  return Math.round(v).toLocaleString('en-US');
}

function pct(fraction) {
  return nf(fraction * 100, 1, 1) + '%';
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
