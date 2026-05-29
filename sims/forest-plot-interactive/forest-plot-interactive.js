// Interactive Forest Plot
// CANVAS_HEIGHT: 660
let canvasWidth = 800;
let drawHeight = 540;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let modelToggle, resetButton;

const TITLE_BLUE = '#1a3a6c';
const TEXT_DARK = '#212529';
const NULL_RED = '#c0392b';
const TEAL = '#1f8a8a';

// Simulated study data: log-OR space (log-normal CI)
// Each study has logOR and SE (log space). 95% CI = logOR ± 1.96 SE
const studies = [
    { name: 'Adams 2014',     n: 120,  logOR: Math.log(1.45), se: 0.22, desc: 'Single-center cohort; younger adults.' },
    { name: 'Bautista 2015',  n: 280,  logOR: Math.log(0.80), se: 0.18, desc: 'Multi-center RCT; mixed-age population.' },
    { name: 'Chen 2016',      n: 540,  logOR: Math.log(1.30), se: 0.12, desc: 'Large RCT; high-quality blinding.' },
    { name: 'Davies 2017',    n: 95,   logOR: Math.log(2.10), se: 0.28, desc: 'Small pilot; wide confidence interval.' },
    { name: 'Esposito 2018',  n: 1200, logOR: Math.log(1.18), se: 0.08, desc: 'Largest study in the analysis.' },
    { name: 'Farouk 2019',    n: 220,  logOR: Math.log(1.50), se: 0.20, desc: 'Open-label trial; some risk of bias.' },
    { name: 'Garcia 2020',    n: 410,  logOR: Math.log(0.95), se: 0.14, desc: 'Registry-based observational study.' },
    { name: 'Huang 2020',     n: 680,  logOR: Math.log(1.40), se: 0.11, desc: 'Cluster RCT; primary endpoint mortality.' },
    { name: 'Ivanov 2021',    n: 165,  logOR: Math.log(2.40), se: 0.26, desc: 'Subgroup analysis; effect may be amplified.' },
    { name: 'Jones 2022',     n: 320,  logOR: Math.log(1.10), se: 0.16, desc: 'Pragmatic trial in primary-care setting.' }
];

let useRandomEffects = false;
let hoverIdx = -1;
let hoverDiamond = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const baseY = drawHeight + 14;
    modelToggle = createButton('Switch to Random Effects');
    modelToggle.position(14, baseY);
    modelToggle.mousePressed(() => {
        useRandomEffects = !useRandomEffects;
        modelToggle.html(useRandomEffects ? 'Switch to Fixed Effects' : 'Switch to Random Effects');
    });

    resetButton = createButton('Reset');
    resetButton.position(220, baseY);
    resetButton.mousePressed(() => {
        useRandomEffects = false;
        modelToggle.html('Switch to Random Effects');
    });
}

function computePooled() {
    // Fixed effects: weights = 1/se^2
    let sumW = 0, sumWy = 0, sumW2 = 0;
    for (const s of studies) {
        const w = 1 / (s.se * s.se);
        sumW += w;
        sumWy += w * s.logOR;
        sumW2 += w * w;
    }
    const fixedLogOR = sumWy / sumW;
    const fixedSE = Math.sqrt(1 / sumW);

    // Heterogeneity: Cochran's Q
    let Q = 0;
    for (const s of studies) {
        const w = 1 / (s.se * s.se);
        Q += w * Math.pow(s.logOR - fixedLogOR, 2);
    }
    const k = studies.length;
    const df = k - 1;
    const I2 = Math.max(0, (Q - df) / Q) * 100;
    const tau2 = Math.max(0, (Q - df) / (sumW - sumW2 / sumW));
    const qP = chiSqUpperTail(Q, df);

    // Random effects: weights = 1/(se^2 + tau^2)
    let sumWR = 0, sumWyR = 0;
    const weightsR = [];
    for (const s of studies) {
        const w = 1 / (s.se * s.se + tau2);
        weightsR.push(w);
        sumWR += w;
        sumWyR += w * s.logOR;
    }
    const randLogOR = sumWyR / sumWR;
    const randSE = Math.sqrt(1 / sumWR);

    return {
        fixedLogOR, fixedSE, randLogOR, randSE,
        Q, df, qP, I2, tau2,
        weightsFixed: studies.map(s => 1 / (s.se * s.se) / sumW),
        weightsRandom: weightsR.map(w => w / sumWR)
    };
}

// Chi-squared upper tail using Wilson-Hilferty approximation
function chiSqUpperTail(x, df) {
    if (x <= 0) return 1;
    const z = (Math.pow(x / df, 1 / 3) - (1 - 2 / (9 * df))) / Math.sqrt(2 / (9 * df));
    return 1 - normalCDF(z, 0, 1);
}
function normalCDF(x, mu, sigma) {
    const z = (x - mu) / (sigma * Math.sqrt(2));
    return 0.5 * (1 + erf(z));
}
function erf(x) {
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function draw() {
    background(255);

    fill(TITLE_BLUE); noStroke();
    textSize(16); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Interactive Forest Plot — Meta-Analysis of 10 Studies', containerWidth / 2, 8);
    textStyle(NORMAL);

    const pooled = computePooled();
    const logOR = useRandomEffects ? pooled.randLogOR : pooled.fixedLogOR;
    const seP = useRandomEffects ? pooled.randSE : pooled.fixedSE;
    const weights = useRandomEffects ? pooled.weightsRandom : pooled.weightsFixed;

    // Layout columns:
    // 0-30%: study names + year
    // 30-80%: plot (horizontal lines)
    // 80-100%: numeric
    const nameColX0 = 8;
    const nameColW = containerWidth * 0.28;
    const plotX0 = containerWidth * 0.30;
    const plotX1 = containerWidth * 0.78;
    const numColX0 = containerWidth * 0.78 + 4;
    const numColW = containerWidth - numColX0 - 6;

    const topY = 36;
    const rowH = 28;
    const diamondY = topY + studies.length * rowH + 18;
    const hetY = diamondY + 36;

    // Column headers
    fill(TITLE_BLUE); textStyle(BOLD); textSize(12);
    textAlign(LEFT, BOTTOM);
    text('Study', nameColX0 + 4, topY - 2);
    textAlign(CENTER, BOTTOM);
    text('OR (95% CI)', (plotX0 + plotX1) / 2, topY - 2);
    textAlign(LEFT, BOTTOM);
    text('OR    95% CI    Weight', numColX0 + 2, topY - 2);
    textStyle(NORMAL);

    // x-axis: log scale from ~0.3 to ~4 on OR
    const logMin = Math.log(0.3);
    const logMax = Math.log(4.0);
    function xOR(or) {
        const lo = Math.log(or);
        return map(lo, logMin, logMax, plotX0, plotX1);
    }
    function xLOR(lo) {
        return map(lo, logMin, logMax, plotX0, plotX1);
    }

    // Plot area background
    fill(252); noStroke();
    rect(plotX0, topY, plotX1 - plotX0, studies.length * rowH + 4);

    // Vertical null line at OR=1
    const nullX = xOR(1.0);
    stroke(NULL_RED); strokeWeight(1.5);
    line(nullX, topY, nullX, diamondY + 14);
    strokeWeight(1);
    noStroke();
    fill(NULL_RED); textSize(10); textAlign(CENTER, TOP);
    text('OR = 1', nullX, topY - 14);

    // X-axis ticks
    const tickORs = [0.5, 1, 2, 4];
    fill(TEXT_DARK); textSize(10); textAlign(CENTER, TOP);
    for (const t of tickORs) {
        const px = xOR(t);
        stroke('#aaa');
        line(px, diamondY + 14, px, diamondY + 18);
        noStroke();
        fill(TEXT_DARK);
        text(t.toString(), px, diamondY + 19);
    }

    // X-axis labels
    fill(TEXT_DARK); textSize(10); textAlign(LEFT, TOP);
    text('← Favors treatment', plotX0, diamondY + 33);
    textAlign(RIGHT, TOP);
    text('Favors control →', plotX1, diamondY + 33);

    // Mouse hover detection for rows
    hoverIdx = -1;
    if (mouseX > 0 && mouseX < containerWidth) {
        for (let i = 0; i < studies.length; i++) {
            const yC = topY + i * rowH + rowH / 2;
            if (mouseY > yC - rowH / 2 && mouseY < yC + rowH / 2 && mouseY < diamondY) {
                hoverIdx = i;
                break;
            }
        }
    }
    hoverDiamond = (mouseY > diamondY - 14 && mouseY < diamondY + 14);

    // Highlight hovered row
    if (hoverIdx >= 0) {
        noStroke(); fill(255, 255, 200, 180);
        rect(0, topY + hoverIdx * rowH, containerWidth, rowH);
    }

    // Draw each study row
    for (let i = 0; i < studies.length; i++) {
        const s = studies[i];
        const yC = topY + i * rowH + rowH / 2;
        const or = Math.exp(s.logOR);
        const ciLo = Math.exp(s.logOR - 1.96 * s.se);
        const ciHi = Math.exp(s.logOR + 1.96 * s.se);
        const w = weights[i];

        // Study name
        fill(TEXT_DARK); textSize(11); textAlign(LEFT, CENTER);
        text(s.name, nameColX0 + 4, yC);

        // Horizontal CI line (clamped to plot)
        const xLo = constrain(xOR(ciLo), plotX0, plotX1);
        const xHi = constrain(xOR(ciHi), plotX0, plotX1);
        const xPt = xOR(or);
        stroke(TEXT_DARK); strokeWeight(1);
        line(xLo, yC, xHi, yC);
        // Whiskers
        line(xLo, yC - 4, xLo, yC + 4);
        line(xHi, yC - 4, xHi, yC + 4);
        // Square: size ∝ weight
        const sqSize = 6 + Math.sqrt(w) * 36;
        noStroke();
        fill(0);
        rectMode(CENTER);
        rect(xPt, yC, sqSize, sqSize);
        rectMode(CORNER);

        // Numeric column
        fill(TEXT_DARK); textSize(10); textAlign(LEFT, CENTER);
        const numStr = nf(or, 0, 2) + '  [' + nf(ciLo, 0, 2) + ', ' + nf(ciHi, 0, 2) + ']  ' +
                       nf(w * 100, 0, 1) + '%';
        text(numStr, numColX0 + 2, yC);
    }

    // Diamond for pooled estimate
    const pooledOR = Math.exp(logOR);
    const pooledLo = Math.exp(logOR - 1.96 * seP);
    const pooledHi = Math.exp(logOR + 1.96 * seP);
    const xPL = constrain(xOR(pooledLo), plotX0, plotX1);
    const xPH = constrain(xOR(pooledHi), plotX0, plotX1);
    const xPC = xOR(pooledOR);
    fill(TEAL); noStroke();
    beginShape();
    vertex(xPL, diamondY);
    vertex(xPC, diamondY - 9);
    vertex(xPH, diamondY);
    vertex(xPC, diamondY + 9);
    endShape(CLOSE);

    // "Pooled (Model)" label
    fill(TITLE_BLUE); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Pooled (' + (useRandomEffects ? 'Random' : 'Fixed') + ')',
         nameColX0 + 4, diamondY);
    textStyle(NORMAL);
    fill(TEXT_DARK); textSize(10);
    text(nf(pooledOR, 0, 2) + '  [' + nf(pooledLo, 0, 2) + ', ' + nf(pooledHi, 0, 2) + ']',
         numColX0 + 2, diamondY);

    // Heterogeneity panel
    const I2 = pooled.I2;
    let i2Color = '#27ae60';
    if (I2 >= 25 && I2 <= 75) i2Color = '#e6a23c';
    if (I2 > 75) i2Color = NULL_RED;

    fill(TITLE_BLUE); textStyle(BOLD); textSize(12); textAlign(LEFT, TOP);
    text('Heterogeneity:', 14, hetY + 12);
    textStyle(NORMAL);
    fill(TEXT_DARK); textSize(11);
    text('Q = ' + nf(pooled.Q, 0, 2) + ' (df = ' + pooled.df + '),  p = ' +
         nf(pooled.qP, 0, 3) + ',  τ² = ' + nf(pooled.tau2, 0, 3),
         100, hetY + 12);

    fill(i2Color); textStyle(BOLD); textSize(12);
    text('I² = ' + nf(I2, 0, 1) + '%', 14, hetY + 30);
    textStyle(NORMAL);
    fill(TEXT_DARK); textSize(11);
    let interp = 'low heterogeneity';
    if (I2 >= 25 && I2 <= 75) interp = 'moderate heterogeneity';
    if (I2 > 75) interp = 'substantial heterogeneity';
    text('(' + interp + ')', 110, hetY + 30);

    if (I2 > 50 && !useRandomEffects) {
        fill(NULL_RED); textSize(11);
        text('Note: I² > 50% — random-effects model is usually preferred.',
             14, hetY + 48);
    } else if (useRandomEffects) {
        fill('#27ae60'); textSize(11);
        text('Random-effects model accounts for between-study variation (τ²).',
             14, hetY + 48);
    }

    // Hover tooltip
    if (hoverIdx >= 0) {
        const s = studies[hoverIdx];
        const or = Math.exp(s.logOR);
        const ciLo = Math.exp(s.logOR - 1.96 * s.se);
        const ciHi = Math.exp(s.logOR + 1.96 * s.se);
        const w = weights[hoverIdx];
        drawTooltip(mouseX, mouseY,
            [s.name,
             'n = ' + s.n + ',  OR = ' + nf(or, 0, 2),
             '95% CI: [' + nf(ciLo, 0, 2) + ', ' + nf(ciHi, 0, 2) + ']',
             'Weight: ' + nf(w * 100, 0, 1) + '%',
             s.desc]);
    } else if (hoverDiamond) {
        const z = logOR / seP;
        const p = 2 * (1 - normalCDF(Math.abs(z), 0, 1));
        drawTooltip(mouseX, mouseY,
            ['Pooled (' + (useRandomEffects ? 'Random Effects' : 'Fixed Effects') + ')',
             'OR = ' + nf(pooledOR, 0, 2),
             '95% CI: [' + nf(pooledLo, 0, 2) + ', ' + nf(pooledHi, 0, 2) + ']',
             'Z = ' + nf(z, 0, 2) + ',  p = ' + nf(p, 0, 4),
             p < 0.05 ? 'Statistically significant.' : 'Not statistically significant.']);
    }

    // Control panel
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    // Caption
    fill(TITLE_BLUE); textSize(11); textAlign(LEFT, TOP);
    const capX = 320; let capY = drawHeight + 14;
    text('How to read this plot:', capX, capY); capY += 16;
    text('• Each square = a study; size shows its weight in the pool.', capX, capY); capY += 14;
    text('• Horizontal line = 95% CI; crosses the red null line → not significant.', capX, capY); capY += 14;
    text('• The diamond = pooled estimate; width = pooled 95% CI.', capX, capY); capY += 14;
    text('• Hover any row or the diamond for details.', capX, capY);
}

function drawTooltip(mx, my, lines) {
    textSize(11);
    let w = 0;
    for (const l of lines) w = Math.max(w, textWidth(l));
    w = Math.max(w + 16, 220);
    const h = 16 + 14 * lines.length;
    let tx = mx + 12, ty = my - h - 6;
    if (tx + w > containerWidth) tx = mx - w - 12;
    if (ty < 4) ty = my + 14;
    fill(255, 255, 255, 245); stroke(160);
    rect(tx, ty, w, h, 5);
    noStroke();
    fill(TITLE_BLUE); textStyle(BOLD); textAlign(LEFT, TOP);
    text(lines[0], tx + 8, ty + 6);
    textStyle(NORMAL); fill(TEXT_DARK);
    for (let i = 1; i < lines.length; i++) {
        text(lines[i], tx + 8, ty + 6 + 14 * i);
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
