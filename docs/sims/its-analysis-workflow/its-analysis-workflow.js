// Interrupted Time-Series Analysis Workflow
// CANVAS_HEIGHT: 600
let canvasWidth = 800;
let drawHeight = 540;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let activeStep = 0;
let resetButton;
let nodeRects = []; // for click detection

const TITLE_BLUE = '#1a3a6c';
const TEAL = '#1f8a8a';
const TEXT_DARK = '#212529';
const STEP_INACTIVE = '#e9ecef';
const STEP_ACTIVE = '#1f8a8a';
const COUNTER_DASH = '#666';
const POST_ORANGE = '#e67e22';
const PRE_BLUE = '#3b82c4';

const stepTitles = [
    '1. Assemble Time Series Data',
    '2. Fit Pre-Intervention Trend',
    '3. Extend Counterfactual',
    '4. Fit Segmented Regression',
    '5. Check Autocorrelation',
    '6. Interpret and Report'
];

const stepDesc = [
    'Collect 36 months of outcome data.',
    'Fit a line to months 1–18 only.',
    'Project the pre-trend forward as a "what-if" line.',
    'Fit both segments with level & slope change.',
    'Inspect residual ACF; run Durbin–Watson.',
    'Report β₂ (level change) and β₃ (slope change).'
];

// Simulated dataset: 36 months
// pre (1-18): mild upward trend, intercept 50, slope +0.6
// intervention at month 18
// post (19-36): level drop -8, slope -0.4 (so post slope = +0.6 - 0.4 - 0.6 = ... actually)
// We'll define: y = β0 + β1*time + β2*post + β3*time_since_intervention + noise
const beta0 = 50;
const beta1 = 0.6;
const beta2 = -8;
const beta3 = -1.0; // slope change
const interventionMonth = 18;

let data = [];

function generateData() {
    randomSeed(42);
    noiseSeed(42);
    data = [];
    for (let t = 1; t <= 36; t++) {
        const post = t > interventionMonth ? 1 : 0;
        const tSince = t > interventionMonth ? t - interventionMonth : 0;
        const trueY = beta0 + beta1 * t + beta2 * post + beta3 * tSince;
        const noise = randomGaussian(0, 2.5);
        data.push({ t, y: trueY + noise, post });
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');
    generateData();

    const baseY = drawHeight + 14;
    resetButton = createButton('Reset to Step 1');
    resetButton.position(14, baseY);
    resetButton.mousePressed(() => { activeStep = 0; });
}

function draw() {
    background(255);

    fill(TITLE_BLUE); noStroke();
    textSize(16); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Interrupted Time-Series Analysis Workflow', containerWidth / 2, 8);
    textStyle(NORMAL);

    // Layout: left 40% step list, right 60% plot
    const stepsX0 = 10;
    const stepsW = containerWidth * 0.38;
    const plotX0 = containerWidth * 0.40 + 10;
    const plotX1 = containerWidth - 14;
    const plotY0 = 56;
    const plotY1 = drawHeight - 16;

    // Draw step nodes
    nodeRects = [];
    const topY = 40;
    const nodeH = 62;
    const nodeGap = 12;
    for (let i = 0; i < stepTitles.length; i++) {
        const y = topY + i * (nodeH + nodeGap);
        const isActive = (i === activeStep);
        noStroke();
        fill(isActive ? STEP_ACTIVE : STEP_INACTIVE);
        rect(stepsX0, y, stepsW, nodeH, 8);
        // Step title
        fill(isActive ? '#fff' : TITLE_BLUE);
        textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
        text(stepTitles[i], stepsX0 + 12, y + 8);
        // Description
        textStyle(NORMAL); textSize(11);
        fill(isActive ? '#e6f5f5' : TEXT_DARK);
        text(stepDesc[i], stepsX0 + 12, y + 28, stepsW - 16, nodeH - 26);

        nodeRects.push({ x: stepsX0, y, w: stepsW, h: nodeH });

        // Arrow to next
        if (i < stepTitles.length - 1) {
            stroke('#888'); strokeWeight(1.5);
            const ax = stepsX0 + stepsW / 2;
            const ay0 = y + nodeH;
            const ay1 = y + nodeH + nodeGap;
            line(ax, ay0, ax, ay1);
            // arrow head
            noStroke(); fill('#888');
            triangle(ax - 4, ay1 - 4, ax + 4, ay1 - 4, ax, ay1);
            strokeWeight(1);
        }
    }

    // Plot region
    drawPlot(plotX0, plotY0, plotX1, plotY1);

    // Control panel
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    fill(TITLE_BLUE); textSize(11); textAlign(LEFT, TOP);
    text('Click a step on the left to see the corresponding analysis stage.',
         170, drawHeight + 18);
    text('Outcome: Monthly acute MI admissions per 100,000.   Intervention at month 18.',
         170, drawHeight + 34);
}

function drawPlot(x0, y0, x1, y1) {
    // Background
    noStroke(); fill(252);
    rect(x0, y0, x1 - x0, y1 - y0);

    // x: months 1..36, y: dynamic
    const xMin = 0, xMax = 37;
    let yVals = data.map(d => d.y);
    const yMin = Math.min(...yVals) - 5;
    const yMax = Math.max(...yVals) + 5;
    const pad = 38;
    const px0 = x0 + pad;
    const py0 = y0 + 30;
    const px1 = x1 - 10;
    const py1 = y1 - 32;

    // Axes
    stroke('#888'); strokeWeight(1);
    line(px0, py1, px1, py1);
    line(px0, py0, px0, py1);
    noStroke();
    fill(TEXT_DARK); textSize(10); textAlign(CENTER, TOP);
    for (let m = 0; m <= 36; m += 6) {
        const px = map(m, xMin, xMax, px0, px1);
        stroke('#888'); line(px, py1, px, py1 + 3);
        noStroke(); fill(TEXT_DARK);
        text(m.toString(), px, py1 + 5);
    }
    textSize(11); textAlign(CENTER, TOP);
    text('Month', (px0 + px1) / 2, py1 + 18);

    // Y ticks
    fill(TEXT_DARK); textSize(10); textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        const v = yMin + (yMax - yMin) * (i / 4);
        const py = map(v, yMin, yMax, py1, py0);
        stroke('#ccc'); line(px0, py, px1, py);
        noStroke(); fill(TEXT_DARK);
        text(v.toFixed(0), px0 - 4, py);
    }

    push();
    translate(x0 + 10, (py0 + py1) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER); textSize(10);
    fill(TEXT_DARK);
    text('Outcome (per 100k)', 0, 0);
    pop();

    // Title above plot
    fill(TITLE_BLUE); textSize(12); textStyle(BOLD); textAlign(CENTER, TOP);
    text(stepTitles[activeStep], (px0 + px1) / 2, y0 + 6);
    textStyle(NORMAL);

    function plotX(t) { return map(t, xMin, xMax, px0, px1); }
    function plotY(y) { return map(y, yMin, yMax, py1, py0); }

    // Intervention line (steps 1+)
    if (activeStep >= 0 && activeStep <= 5) {
        const ix = plotX(interventionMonth + 0.5);
        stroke('#c0392b'); strokeWeight(1.5);
        drawingContext.setLineDash([6, 4]);
        line(ix, py0, ix, py1);
        drawingContext.setLineDash([]);
        noStroke(); fill('#c0392b'); textSize(10); textAlign(CENTER, BOTTOM);
        text('Intervention (mo 18)', ix, py0 - 2);
    }

    if (activeStep === 4) {
        // Step 5: show ACF instead of scatter
        drawACFPlot(px0, py0, px1, py1);
        return;
    }

    if (activeStep === 5) {
        // Step 6: show table panel overlay
        drawScatterWithFit(px0, py0, px1, py1, plotX, plotY, true, true, true);
        drawCoefficientTable(x0 + 10, y0 + 30);
        return;
    }

    if (activeStep === 0) {
        // Just scatter + intervention line
        drawScatter(px0, py0, px1, py1, plotX, plotY);
    } else if (activeStep === 1) {
        drawScatter(px0, py0, px1, py1, plotX, plotY);
        drawPreTrendLine(px0, py0, px1, py1, plotX, plotY, false);
    } else if (activeStep === 2) {
        drawScatter(px0, py0, px1, py1, plotX, plotY);
        drawPreTrendLine(px0, py0, px1, py1, plotX, plotY, true);
        // Annotation
        fill(TEXT_DARK); textSize(10); textAlign(LEFT, TOP);
        const cx = plotX(28), cy = plotY(yMax - (yMax - yMin) * 0.25);
        text('Counterfactual: what we', cx, cy);
        text('would expect with no', cx, cy + 11);
        text('intervention.', cx, cy + 22);
    } else if (activeStep === 3) {
        drawScatterWithFit(px0, py0, px1, py1, plotX, plotY, true, true, false);
        // Coefficient annotations
        const ix = plotX(interventionMonth + 0.5);
        const yJump = plotY(beta0 + beta1 * interventionMonth);
        const yJumpAfter = plotY(beta0 + beta1 * interventionMonth + beta2);
        stroke(TITLE_BLUE); strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(ix + 6, yJump, ix + 6, yJumpAfter);
        drawingContext.setLineDash([]);
        noStroke(); fill(TITLE_BLUE); textSize(10); textAlign(LEFT, CENTER);
        text('β₂ (level)', ix + 10, (yJump + yJumpAfter) / 2);

        // β1 label on pre slope
        fill(PRE_BLUE); textSize(10); textAlign(LEFT, TOP);
        text('β₁ pre-slope', plotX(2), plotY(beta0 + beta1 * 2) - 14);

        // β3 label on post slope difference
        fill(POST_ORANGE);
        text('β₃ slope change', plotX(28), plotY(beta0 + beta1 * 28 + beta2 + beta3 * (28 - interventionMonth)) - 14);

        // β0 (intercept)
        fill(TITLE_BLUE);
        text('β₀ intercept', plotX(0) + 4, plotY(beta0) - 12);
    }
}

function drawScatter(px0, py0, px1, py1, plotX, plotY) {
    noStroke();
    for (const d of data) {
        fill(d.post ? POST_ORANGE : PRE_BLUE);
        ellipse(plotX(d.t), plotY(d.y), 5.5, 5.5);
    }
}

function drawPreTrendLine(px0, py0, px1, py1, plotX, plotY, projectForward) {
    // Fit OLS on pre-intervention months
    const pre = data.filter(d => d.t <= interventionMonth);
    const fit = linearFit(pre.map(d => d.t), pre.map(d => d.y));
    // Draw scatter first
    drawScatter(px0, py0, px1, py1, plotX, plotY);
    // Draw pre line (solid)
    stroke(PRE_BLUE); strokeWeight(2);
    const x1Pre = plotX(1);
    const y1Pre = plotY(fit.a + fit.b * 1);
    const x2Pre = plotX(interventionMonth);
    const y2Pre = plotY(fit.a + fit.b * interventionMonth);
    line(x1Pre, y1Pre, x2Pre, y2Pre);
    if (projectForward) {
        // Dashed extension
        drawingContext.setLineDash([6, 4]);
        const x3 = plotX(36);
        const y3 = plotY(fit.a + fit.b * 36);
        stroke(PRE_BLUE); strokeWeight(2);
        line(x2Pre, y2Pre, x3, y3);
        drawingContext.setLineDash([]);
    }
    strokeWeight(1);
    noStroke();
    fill(PRE_BLUE); textSize(10); textAlign(LEFT, BOTTOM);
    text('Pre-intervention trend', plotX(2), y1Pre - 4);
}

function drawScatterWithFit(px0, py0, px1, py1, plotX, plotY, drawPre, drawPost, showCFasDashed) {
    drawScatter(px0, py0, px1, py1, plotX, plotY);
    const pre = data.filter(d => d.t <= interventionMonth);
    const post = data.filter(d => d.t > interventionMonth);
    const fitPre = linearFit(pre.map(d => d.t), pre.map(d => d.y));
    const fitPost = linearFit(post.map(d => d.t), post.map(d => d.y));
    if (drawPre) {
        stroke(PRE_BLUE); strokeWeight(2.5);
        line(plotX(1), plotY(fitPre.a + fitPre.b * 1),
             plotX(interventionMonth), plotY(fitPre.a + fitPre.b * interventionMonth));
    }
    if (showCFasDashed) {
        stroke(PRE_BLUE); strokeWeight(2);
        drawingContext.setLineDash([6, 4]);
        line(plotX(interventionMonth), plotY(fitPre.a + fitPre.b * interventionMonth),
             plotX(36), plotY(fitPre.a + fitPre.b * 36));
        drawingContext.setLineDash([]);
    }
    if (drawPost) {
        stroke(POST_ORANGE); strokeWeight(2.5);
        line(plotX(interventionMonth + 1), plotY(fitPost.a + fitPost.b * (interventionMonth + 1)),
             plotX(36), plotY(fitPost.a + fitPost.b * 36));
    }
    strokeWeight(1); noStroke();
}

function drawACFPlot(px0, py0, px1, py1) {
    // Compute residuals from segmented regression
    const pre = data.filter(d => d.t <= interventionMonth);
    const post = data.filter(d => d.t > interventionMonth);
    const fitPre = linearFit(pre.map(d => d.t), pre.map(d => d.y));
    const fitPost = linearFit(post.map(d => d.t), post.map(d => d.y));
    const res = data.map(d => {
        const yhat = d.post
            ? (fitPost.a + fitPost.b * d.t)
            : (fitPre.a + fitPre.b * d.t);
        return d.y - yhat;
    });
    // Compute ACF up to lag 12
    const lags = 12;
    const acf = [];
    const meanR = res.reduce((a, b) => a + b, 0) / res.length;
    const denom = res.reduce((a, b) => a + (b - meanR) ** 2, 0);
    for (let k = 0; k <= lags; k++) {
        let num = 0;
        for (let i = 0; i < res.length - k; i++) {
            num += (res[i] - meanR) * (res[i + k] - meanR);
        }
        acf.push(num / denom);
    }
    // Plot stems
    const n = res.length;
    const ci = 1.96 / Math.sqrt(n);
    const acfX0 = px0 + 30;
    const acfX1 = px1 - 10;
    const acfY0 = py0 + 20;
    const acfY1 = py1 - 50;
    const zeroY = (acfY0 + acfY1) / 2;
    stroke('#888'); strokeWeight(1);
    line(acfX0, zeroY, acfX1, zeroY);
    // CI bands
    drawingContext.setLineDash([4, 4]);
    stroke(NULL_RED_OR('#c0392b'));
    const ciY1 = map(ci, -1, 1, acfY1, acfY0);
    const ciY2 = map(-ci, -1, 1, acfY1, acfY0);
    line(acfX0, ciY1, acfX1, ciY1);
    line(acfX0, ciY2, acfX1, ciY2);
    drawingContext.setLineDash([]);
    noStroke();
    fill('#c0392b'); textSize(10); textAlign(LEFT, BOTTOM);
    text('±1.96/√n band', acfX1 - 70, ciY1 - 2);

    // Stems
    const w = (acfX1 - acfX0) / (lags + 1);
    for (let k = 0; k <= lags; k++) {
        const x = acfX0 + w * (k + 0.5);
        const y = map(acf[k], -1, 1, acfY1, acfY0);
        stroke(TEAL); strokeWeight(3);
        line(x, zeroY, x, y);
        noStroke(); fill(TEAL);
        ellipse(x, y, 5, 5);
        // x labels
        if (k % 2 === 0) {
            fill(TEXT_DARK); textSize(9); textAlign(CENTER, TOP);
            text(k, x, acfY1 + 4);
        }
    }
    strokeWeight(1);
    // Axis label
    fill(TEXT_DARK); textSize(10); textAlign(CENTER, TOP);
    text('Lag (months)', (acfX0 + acfX1) / 2, acfY1 + 16);

    // Durbin-Watson approx
    let dwNum = 0, dwDen = 0;
    for (let i = 1; i < res.length; i++) dwNum += (res[i] - res[i - 1]) ** 2;
    for (let i = 0; i < res.length; i++) dwDen += res[i] * res[i];
    const dw = dwNum / dwDen;
    fill(TITLE_BLUE); textSize(11); textStyle(BOLD); textAlign(LEFT, BOTTOM);
    text('Durbin–Watson = ' + nf(dw, 0, 2) + '  (DW ≈ 2 → no autocorrelation)',
         px0 + 30, py1 - 6);
    textStyle(NORMAL);
}

function NULL_RED_OR(c) { return c; }

function drawCoefficientTable(x, y) {
    // Compute fits
    const pre = data.filter(d => d.t <= interventionMonth);
    const post = data.filter(d => d.t > interventionMonth);
    const fitPre = linearFit(pre.map(d => d.t), pre.map(d => d.y));
    const fitPost = linearFit(post.map(d => d.t), post.map(d => d.y));
    // Approximations
    const b0 = fitPre.a;
    const b1 = fitPre.b;
    const b2 = (fitPost.a + fitPost.b * interventionMonth) - (fitPre.a + fitPre.b * interventionMonth);
    const b3 = fitPost.b - fitPre.b;

    const tx = x + 4, ty = y + 220;
    fill(255, 255, 255, 230); stroke(180);
    rect(tx, ty, 380, 130, 6);
    noStroke();
    fill(TITLE_BLUE); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Estimated Coefficients', tx + 8, ty + 6);
    textStyle(NORMAL); fill(TEXT_DARK); textSize(11);
    let cy = ty + 26;
    text('β₀ (intercept)     ≈ ' + nf(b0, 0, 2), tx + 8, cy); cy += 16;
    text('β₁ (pre slope)     ≈ ' + nf(b1, 0, 2) + ' / month', tx + 8, cy); cy += 16;
    text('β₂ (level change)  ≈ ' + nf(b2, 0, 2) + '  ← intervention effect (level)', tx + 8, cy); cy += 16;
    text('β₃ (slope change)  ≈ ' + nf(b3, 0, 2) + '  ← intervention effect (slope)', tx + 8, cy); cy += 20;
    fill(TITLE_BLUE); textStyle(BOLD);
    text('Interpretation:', tx + 8, cy); cy += 16;
    textStyle(NORMAL); fill(TEXT_DARK);
    text('Immediately after the intervention, the outcome', tx + 8, cy); cy += 13;
    text('dropped by ≈' + nf(Math.abs(b2), 0, 1) + ' units and the trend slowed by ≈' + nf(Math.abs(b3), 0, 2) + '/mo.', tx + 8, cy);
}

function linearFit(xs, ys) {
    const n = xs.length;
    const mx = xs.reduce((a, b) => a + b, 0) / n;
    const my = ys.reduce((a, b) => a + b, 0) / n;
    let num = 0, den = 0;
    for (let i = 0; i < n; i++) {
        num += (xs[i] - mx) * (ys[i] - my);
        den += (xs[i] - mx) ** 2;
    }
    const b = num / den;
    const a = my - b * mx;
    return { a, b };
}

function mousePressed() {
    for (let i = 0; i < nodeRects.length; i++) {
        const r = nodeRects[i];
        if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
            activeStep = i;
            return;
        }
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
