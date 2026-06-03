// COVID-19 SEIR Wave Simulator
// CANVAS_HEIGHT: 600
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// --- Model constants ---
const POP = 330000000;       // stylized US population
const I0 = 100;              // initial infectious seed
const DAYS = 730;            // 2-year window
const DT = 1.0;              // 1-day Euler steps
const SIGMA = 1 / 5.2;       // E -> I rate, 5.2 day incubation (Lauer 2020 estimate)
const GAMMA = 1 / 8.0;       // I -> R rate, ~8 day infectious period

// --- UI elements ---
let betaSlider, vaxSlider, r0Slider, waneSlider;
let runBtn, resetBtn, compareBtn;

// --- Simulation state ---
let series = [];     // primary scenario: array of {t,S,E,I,R}
let compareA = null; // Delta overlay
let compareB = null; // Omicron overlay
let compareMode = false;
let simStatus = 'idle'; // 'idle' | 'running' | 'done'
let derived = { r0: 0, hit: 0, peakFrac: 0, totalFrac: 0, peakDay: 0 };

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const baseY = drawHeight + 14;
    const leftX = 16;
    const labW = 150;
    const slW = 180;

    // Row 1: β
    createSpan('β (transmission/day)').position(leftX, baseY);
    betaSlider = createSlider(0.10, 1.20, 0.30, 0.01);
    betaSlider.position(leftX + labW, baseY - 2);
    betaSlider.style('width', slW + 'px');

    // Row 2: vaccination coverage
    createSpan('Vaccine coverage %').position(leftX, baseY + 28);
    vaxSlider = createSlider(0, 90, 0, 1);
    vaxSlider.position(leftX + labW, baseY + 26);
    vaxSlider.style('width', slW + 'px');

    // Row 3: variant R0
    createSpan('Variant R₀').position(leftX, baseY + 56);
    r0Slider = createSlider(1.5, 15.0, 2.5, 0.1);
    r0Slider.position(leftX + labW, baseY + 54);
    r0Slider.style('width', slW + 'px');
    r0Slider.input(syncBetaFromR0);

    // Row 4: waning immunity
    createSpan('Waning immunity /day').position(leftX, baseY + 84);
    waneSlider = createSlider(0.000, 0.020, 0.000, 0.001);
    waneSlider.position(leftX + labW, baseY + 82);
    waneSlider.style('width', slW + 'px');

    // Buttons column on right
    const btnX = leftX + labW + slW + 40;
    runBtn = createButton('Run Wave');
    runBtn.position(btnX, baseY);
    runBtn.mousePressed(() => { runSimulation(); });

    resetBtn = createButton('Reset');
    resetBtn.position(btnX + 100, baseY);
    resetBtn.mousePressed(resetAll);

    compareBtn = createButton('Compare Variants');
    compareBtn.position(btnX, baseY + 32);
    compareBtn.mousePressed(runCompareVariants);

    // Variant preset buttons
    const wildBtn = createButton('Wild (R₀=2.5)');
    wildBtn.position(btnX, baseY + 64);
    wildBtn.mousePressed(() => { r0Slider.value(2.5); syncBetaFromR0(); });

    const deltaBtn = createButton('Delta (R₀=5)');
    deltaBtn.position(btnX + 110, baseY + 64);
    deltaBtn.mousePressed(() => { r0Slider.value(5.0); syncBetaFromR0(); });

    const omiBtn = createButton('Omicron (R₀=10)');
    omiBtn.position(btnX, baseY + 96);
    omiBtn.mousePressed(() => { r0Slider.value(10.0); syncBetaFromR0(); });

    syncBetaFromR0();
}

function syncBetaFromR0() {
    // β = R0 * γ
    const r0 = r0Slider.value();
    betaSlider.value(+(r0 * GAMMA).toFixed(2));
}

function resetAll() {
    series = [];
    compareA = null;
    compareB = null;
    compareMode = false;
    simStatus = 'idle';
    derived = { r0: 0, hit: 0, peakFrac: 0, totalFrac: 0, peakDay: 0 };
}

function runSimulation() {
    compareMode = false;
    compareA = null;
    compareB = null;
    const beta = betaSlider.value();
    const vax = vaxSlider.value() / 100;
    const wane = waneSlider.value();
    series = simulateSEIR(beta, vax, wane);
    derived = computeMetrics(series, beta);
    simStatus = 'done';
}

function runCompareVariants() {
    // Run Delta (R0≈5) and Omicron (R0≈10) at SAME vaccination coverage
    const vax = vaxSlider.value() / 100;
    const wane = waneSlider.value();
    const betaDelta = 5.0 * GAMMA;
    const betaOmi = 10.0 * GAMMA;
    compareA = simulateSEIR(betaDelta, vax, wane);
    compareB = simulateSEIR(betaOmi, vax, wane);
    // Also keep current scenario in series for metrics box
    const beta = betaSlider.value();
    series = simulateSEIR(beta, vax, wane);
    derived = computeMetrics(series, beta);
    compareMode = true;
    simStatus = 'done';
}

function simulateSEIR(beta, vaxFrac, wane) {
    // Vaccinated population removed from S at t=0 (perfect-take simplification)
    const vaxN = POP * vaxFrac;
    let S = POP - vaxN - I0;
    let E = 0;
    let I = I0;
    let R = vaxN;
    const out = [{t: 0, S, E, I, R}];
    for (let t = 1; t <= DAYS; t++) {
        // β · S · I / N  (mass action)
        const infRate = beta * S * I / POP;
        const expRate = SIGMA * E;
        const recRate = GAMMA * I;
        const waneRate = wane * R;
        const dS = -infRate + waneRate;
        const dE = infRate - expRate;
        const dI = expRate - recRate;
        const dR = recRate - waneRate;
        S = Math.max(0, S + dS * DT);
        E = Math.max(0, E + dE * DT);
        I = Math.max(0, I + dI * DT);
        R = Math.max(0, R + dR * DT);
        out.push({t, S, E, I, R});
    }
    return out;
}

function computeMetrics(s, beta) {
    const r0 = beta / GAMMA;
    const hit = Math.max(0, 1 - 1 / r0);
    let peak = 0, peakDay = 0;
    for (const p of s) {
        if (p.I > peak) { peak = p.I; peakDay = p.t; }
    }
    const last = s[s.length - 1];
    // total infected = R + I + E reduction from initial susceptible pool
    const initialS = POP - I0 - (vaxSlider.value() / 100) * POP;
    const totalInfected = Math.max(0, initialS - last.S);
    return {
        r0: r0,
        hit: hit,
        peakFrac: peak / POP,
        peakDay: peakDay,
        totalFrac: totalInfected / POP
    };
}

function draw() {
    background(255);

    // Title bar
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('COVID-19 SEIR Wave Simulator', containerWidth / 2, 8);
    textStyle(NORMAL);

    drawPlot();
    drawMetricsPanel();
    drawControlBackdrop();
}

function drawControlBackdrop() {
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();
    // live readouts row
    fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP);
    const r0 = (betaSlider.value() / GAMMA).toFixed(2);
    text('R₀ = β/γ = ' + r0 +
         '   |   γ = ' + GAMMA.toFixed(3) + '/day' +
         '   |   σ = ' + SIGMA.toFixed(3) + '/day (5.2d incubation)' +
         '   |   N = 330M',
         16, drawHeight + 130);
    text('Click Run Wave to simulate. Compare Variants overlays Delta and Omicron at the current vaccine coverage.',
         16, drawHeight + 150);
    text('Vertical dashed line = peak infection day. Horizontal dashed line = herd immunity threshold (1 − 1/R₀).',
         16, drawHeight + 168);
}

function drawPlot() {
    // Plot area on the left, metrics on the right
    const px = 50;
    const py = 36;
    const pw = containerWidth - 280;
    const ph = drawHeight - py - 18;

    // axes
    stroke('#aaa'); strokeWeight(1); noFill();
    rect(px, py, pw, ph);
    // grid lines (4 horizontal)
    stroke('#eee');
    for (let i = 1; i < 5; i++) {
        const gy = py + (ph * i / 5);
        line(px, gy, px + pw, gy);
    }
    // vertical year markers
    const yearX = px + pw * (365 / DAYS);
    stroke('#ddd');
    line(yearX, py, yearX, py + ph);

    // axis labels
    noStroke();
    fill('#666'); textSize(10);
    textAlign(RIGHT, CENTER);
    text('100%', px - 4, py);
    text('50%', px - 4, py + ph / 2);
    text('0%', px - 4, py + ph);
    textAlign(CENTER, TOP);
    text('Day 0', px, py + ph + 4);
    text('Day 365', yearX, py + ph + 4);
    text('Day 730', px + pw, py + ph + 4);
    textAlign(LEFT, TOP);
    fill('#444'); textSize(11); textStyle(BOLD);
    text('Population fraction', px - 36, py - 14);
    textStyle(NORMAL);

    if (series.length < 2) {
        fill('#888'); textSize(13); textAlign(CENTER, CENTER);
        text('Adjust parameters above, then press "Run Wave".',
             px + pw / 2, py + ph / 2);
        textAlign(LEFT, TOP);
        return;
    }

    // Draw HIT line
    if (derived.r0 > 1 && !compareMode) {
        const hitY = py + ph * (1 - derived.hit);
        stroke('#27ae60'); strokeWeight(1);
        drawingContext.setLineDash([5, 4]);
        line(px, hitY, px + pw, hitY);
        drawingContext.setLineDash([]);
        noStroke(); fill('#27ae60'); textSize(10);
        textAlign(LEFT, BOTTOM);
        text('HIT = ' + (derived.hit * 100).toFixed(0) + '%',
             px + 6, hitY - 2);
    }

    // Plot lines
    if (compareMode && compareA && compareB) {
        plotSingleSeries(compareA, px, py, pw, ph, '#9b59b6', 'I');
        plotSingleSeries(compareB, px, py, pw, ph, '#e67e22', 'I');
        // Legend for compare
        drawCompareLegend(px + 12, py + 12);
    } else {
        plotSingleSeries(series, px, py, pw, ph, '#4a90e2', 'S');
        plotSingleSeries(series, px, py, pw, ph, '#f39c12', 'E');
        plotSingleSeries(series, px, py, pw, ph, '#e74c3c', 'I');
        plotSingleSeries(series, px, py, pw, ph, '#27ae60', 'R');
        drawMainLegend(px + 12, py + 12);
    }

    // Peak day marker
    if (!compareMode && derived.peakDay > 0) {
        const peakX = px + pw * (derived.peakDay / DAYS);
        stroke('#c0392b'); strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(peakX, py, peakX, py + ph);
        drawingContext.setLineDash([]);
        noStroke(); fill('#c0392b'); textSize(10);
        textAlign(CENTER, TOP);
        text('peak d' + derived.peakDay, peakX, py + 2);
        textAlign(LEFT, TOP);
    }
}

function plotSingleSeries(s, px, py, pw, ph, col, key) {
    stroke(col); strokeWeight(2); noFill();
    beginShape();
    for (const p of s) {
        const x = px + pw * (p.t / DAYS);
        const y = py + ph * (1 - p[key] / POP);
        vertex(x, y);
    }
    endShape();
}

function drawMainLegend(lx, ly) {
    const items = [
        {c:'#4a90e2', l:'S Susceptible'},
        {c:'#f39c12', l:'E Exposed'},
        {c:'#e74c3c', l:'I Infectious'},
        {c:'#27ae60', l:'R Recovered'},
    ];
    noStroke(); textSize(11); textAlign(LEFT, CENTER);
    for (let i = 0; i < items.length; i++) {
        const y = ly + i * 16;
        fill(items[i].c); rect(lx, y - 4, 14, 4);
        fill('#333'); text(items[i].l, lx + 20, y - 1);
    }
}

function drawCompareLegend(lx, ly) {
    const items = [
        {c:'#9b59b6', l:'Delta I (R₀ 5)'},
        {c:'#e67e22', l:'Omicron I (R₀ 10)'},
    ];
    noStroke(); textSize(11); textAlign(LEFT, CENTER);
    for (let i = 0; i < items.length; i++) {
        const y = ly + i * 16;
        fill(items[i].c); rect(lx, y - 4, 14, 4);
        fill('#333'); text(items[i].l, lx + 20, y - 1);
    }
}

function drawMetricsPanel() {
    const px = containerWidth - 250;
    const py = 36;
    const pw = 234;
    const ph = drawHeight - py - 18;

    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Derived Metrics', px + 10, py + 8);
    textStyle(NORMAL);

    fill('#333'); textSize(11);
    let ly = py + 32;
    const lineH = 18;

    const r0 = derived.r0 || (betaSlider.value() / GAMMA);
    const hitPct = derived.hit ? (derived.hit * 100).toFixed(1) + '%' : '—';
    const peakPct = simStatus === 'done' ? (derived.peakFrac * 100).toFixed(2) + '%' : '—';
    const peakDayStr = simStatus === 'done' ? 'day ' + derived.peakDay : '—';
    const totalPct = simStatus === 'done' ? (derived.totalFrac * 100).toFixed(1) + '%' : '—';

    text('R₀ = β / γ', px + 10, ly); ly += lineH - 4;
    fill('#1a3a6c'); textStyle(BOLD); textSize(16);
    text(r0.toFixed(2), px + 10, ly); ly += lineH + 4;
    textStyle(NORMAL); textSize(11); fill('#333');

    text('Herd immunity threshold', px + 10, ly); ly += lineH - 4;
    text('HIT = 1 − 1/R₀', px + 10, ly); ly += lineH - 4;
    fill('#27ae60'); textStyle(BOLD); textSize(16);
    text(hitPct, px + 10, ly); ly += lineH + 4;
    textStyle(NORMAL); textSize(11); fill('#333');

    text('Peak infected fraction', px + 10, ly); ly += lineH - 4;
    fill('#e74c3c'); textStyle(BOLD); textSize(16);
    text(peakPct, px + 10, ly); ly += lineH - 2;
    textStyle(NORMAL); textSize(10); fill('#666');
    text('(' + peakDayStr + ')', px + 10, ly); ly += lineH + 4;
    fill('#333'); textSize(11);

    text('Total ever infected', px + 10, ly); ly += lineH - 4;
    fill('#8e44ad'); textStyle(BOLD); textSize(16);
    text(totalPct, px + 10, ly); ly += lineH + 4;
    textStyle(NORMAL); textSize(11); fill('#333');

    // Status pill
    let status = simStatus === 'done' ?
        (compareMode ? 'Comparing variants' : 'Wave simulated') :
        'Press Run Wave';
    let statusCol = simStatus === 'done' ? '#27ae60' : '#7f8c8d';
    fill(statusCol);
    rect(px + 10, py + ph - 28, pw - 20, 20, 4);
    fill(255); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(status, px + 10 + (pw - 20)/2, py + ph - 18);
    textStyle(NORMAL); textAlign(LEFT, TOP);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
