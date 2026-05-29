// Dose-Response Curve Explorer
// CANVAS_HEIGHT: 600
let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let slopeSlider, ec50Slider, modelSelect, resetButton;
let hoverTarget = null;

// Color palette
const TITLE_BLUE = '#1a3a6c';
const CURVE_COLOR = '#1f4f8a';
const AXIS_GRAY = '#6c757d';
const TEXT_DARK = '#212529';
const TEXT_MUTED = '#6c757d';

const NO_EFFECT_FILL = 'rgba(46, 160, 67, 0.10)';
const UNCERTAIN_FILL = 'rgba(255, 196, 0, 0.14)';
const EFFECT_FILL    = 'rgba(220, 53, 69, 0.10)';

const NOAEL_COLOR = '#2ea043';   // green triangle
const LOAEL_COLOR = '#f39c12';   // orange triangle
const EC50_COLOR  = '#dc3545';   // red circle
const RFD_COLOR   = '#0d6efd';   // blue dashed line

// Log-dose axis range (log10 mg/kg/day)
const LOG_DOSE_MIN = -3;   // 0.001
const LOG_DOSE_MAX = 3;    // 1000

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const baseY = drawHeight + 16;

    // Slope slider (Hill coefficient): controls steepness of S-curve
    slopeSlider = createSlider(0.5, 6, 2.0, 0.1);
    slopeSlider.position(110, baseY);
    slopeSlider.size(180);

    // EC50/LD50 slider: controls horizontal position (log10 dose)
    ec50Slider = createSlider(-2, 2, 0, 0.05);
    ec50Slider.position(110, baseY + 32);
    ec50Slider.size(180);

    // Model selector: Threshold vs Linear-No-Threshold
    modelSelect = createSelect();
    modelSelect.position(420, baseY);
    modelSelect.option('Threshold (classic S-curve)');
    modelSelect.option('Linear No-Threshold (LNT)');
    modelSelect.selected('Threshold (classic S-curve)');

    resetButton = createButton('Reset');
    resetButton.position(420, baseY + 32);
    resetButton.mousePressed(resetAll);
}

function resetAll() {
    slopeSlider.value(2.0);
    ec50Slider.value(0);
    modelSelect.selected('Threshold (classic S-curve)');
}

function draw() {
    background(255);
    hoverTarget = null;

    // Title
    fill(TITLE_BLUE);
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Dose-Response Curve Explorer', containerWidth / 2, 8);
    textStyle(NORMAL);

    // Layout
    const plotMargin = { left: 60, right: 200, top: 38, bottom: 60 };
    const plotX0 = plotMargin.left;
    const plotY0 = plotMargin.top;
    const plotX1 = containerWidth - plotMargin.right;
    const plotY1 = drawHeight - plotMargin.bottom;

    const slope = slopeSlider.value();
    const logEC50 = ec50Slider.value();
    const model = modelSelect.value();
    const isThreshold = model.startsWith('Threshold');

    // Compute landmark doses (log10 scale)
    const ec50 = Math.pow(10, logEC50);
    // For Hill curve, the dose at fraction p is ec50 * (p/(1-p))^(1/slope)
    const logNOAEL = logEC50 + (1 / slope) * Math.log10(0.05 / 0.95); // ~5% effect
    const logLOAEL = logEC50 + (1 / slope) * Math.log10(0.10 / 0.90); // ~10% effect
    // Reference Dose: NOAEL / 100 (uncertainty factor)
    const logRfD = logNOAEL - 2;

    // Shaded background zones (only for Threshold model)
    if (isThreshold) {
        noStroke();
        // No Effect zone: left of NOAEL
        fill(NO_EFFECT_FILL);
        const xNOAEL = doseToX(logNOAEL, plotX0, plotX1);
        rect(plotX0, plotY0, Math.max(0, xNOAEL - plotX0), plotY1 - plotY0);
        // Uncertain zone: NOAEL to LOAEL
        fill(UNCERTAIN_FILL);
        const xLOAEL = doseToX(logLOAEL, plotX0, plotX1);
        rect(Math.max(plotX0, xNOAEL), plotY0,
             Math.max(0, Math.min(xLOAEL, plotX1) - Math.max(plotX0, xNOAEL)),
             plotY1 - plotY0);
        // Effect zone: right of LOAEL
        fill(EFFECT_FILL);
        const xEff = Math.max(plotX0, Math.min(xLOAEL, plotX1));
        rect(xEff, plotY0, Math.max(0, plotX1 - xEff), plotY1 - plotY0);
    } else {
        // LNT: shade the whole plot with a faint red wash to remind there is no safe dose
        noStroke();
        fill(EFFECT_FILL);
        rect(plotX0, plotY0, plotX1 - plotX0, plotY1 - plotY0);
    }

    // Plot border
    stroke(AXIS_GRAY);
    strokeWeight(1);
    noFill();
    rect(plotX0, plotY0, plotX1 - plotX0, plotY1 - plotY0);

    // Gridlines + x-axis tick labels (log decades)
    noStroke();
    fill(TEXT_MUTED);
    textSize(11);
    textAlign(CENTER, TOP);
    for (let p = LOG_DOSE_MIN; p <= LOG_DOSE_MAX; p++) {
        const px = doseToX(p, plotX0, plotX1);
        stroke(230);
        line(px, plotY0, px, plotY1);
        noStroke();
        fill(TEXT_DARK);
        text('10^' + p, px, plotY1 + 6);
    }
    // X-axis label
    fill(TEXT_DARK);
    textSize(12);
    text('Log Dose (mg/kg/day)', (plotX0 + plotX1) / 2, plotY1 + 24);

    // Y-axis labels + gridlines
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        const frac = i / 4;
        const py = map(frac, 0, 1, plotY1, plotY0);
        stroke(230);
        line(plotX0, py, plotX1, py);
        noStroke();
        fill(TEXT_DARK);
        textSize(11);
        text(Math.round(frac * 100) + '%', plotX0 - 6, py);
    }
    // Y-axis label
    push();
    translate(plotX0 - 42, (plotY0 + plotY1) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    fill(TEXT_DARK);
    textSize(12);
    text('% Population Affected', 0, 0);
    pop();

    // Draw the dose-response curve
    noFill();
    stroke(CURVE_COLOR);
    strokeWeight(3);
    beginShape();
    const steps = 300;
    for (let i = 0; i <= steps; i++) {
        const logD = LOG_DOSE_MIN + (LOG_DOSE_MAX - LOG_DOSE_MIN) * (i / steps);
        const effect = isThreshold
            ? hillEffect(logD, logEC50, slope)
            : lntEffect(logD);
        const px = doseToX(logD, plotX0, plotX1);
        const py = map(effect, 0, 1, plotY1, plotY0);
        vertex(px, py);
    }
    endShape();
    strokeWeight(1);

    // Landmark markers (only for Threshold model)
    if (isThreshold) {
        // Reference Dose: blue dashed vertical line
        stroke(RFD_COLOR);
        strokeWeight(2);
        drawingContext.setLineDash([5, 4]);
        const xRfD = doseToX(logRfD, plotX0, plotX1);
        if (xRfD >= plotX0 && xRfD <= plotX1) {
            line(xRfD, plotY0, xRfD, plotY1);
        }
        drawingContext.setLineDash([]);
        strokeWeight(1);
        if (xRfD >= plotX0 && xRfD <= plotX1) {
            noStroke();
            fill(RFD_COLOR);
            textSize(10);
            textStyle(BOLD);
            textAlign(LEFT, TOP);
            text('RfD', xRfD + 3, plotY0 + 4);
            textStyle(NORMAL);
            // Hover detection for RfD line
            if (Math.abs(mouseX - xRfD) < 6 && mouseY > plotY0 && mouseY < plotY1) {
                hoverTarget = {
                    name: 'Reference Dose (RfD)',
                    desc: 'NOAEL divided by uncertainty factors (typically 100x). The daily dose considered safe for chronic human exposure.',
                    x: mouseX, y: mouseY
                };
            }
        }

        // NOAEL: green triangle on the curve
        const xN = doseToX(logNOAEL, plotX0, plotX1);
        const yN = map(0.05, 0, 1, plotY1, plotY0);
        drawTriangle(xN, yN, 9, NOAEL_COLOR);
        if (dist(mouseX, mouseY, xN, yN) < 12) {
            hoverTarget = {
                name: 'NOAEL',
                desc: 'No Observed Adverse Effect Level - the highest tested dose at which no statistically significant adverse effect appears.',
                x: mouseX, y: mouseY
            };
        }

        // LOAEL: orange triangle on the curve
        const xL = doseToX(logLOAEL, plotX0, plotX1);
        const yL = map(0.10, 0, 1, plotY1, plotY0);
        drawTriangle(xL, yL, 9, LOAEL_COLOR);
        if (dist(mouseX, mouseY, xL, yL) < 12) {
            hoverTarget = {
                name: 'LOAEL',
                desc: 'Lowest Observed Adverse Effect Level - the lowest tested dose at which an adverse effect is detected.',
                x: mouseX, y: mouseY
            };
        }
    }

    // EC50/LD50: red circle on the curve (shown for both models)
    const xE = doseToX(logEC50, plotX0, plotX1);
    const yE = isThreshold
        ? map(0.5, 0, 1, plotY1, plotY0)
        : map(lntEffect(logEC50), 0, 1, plotY1, plotY0);
    noStroke();
    fill(EC50_COLOR);
    ellipse(xE, yE, 12, 12);
    stroke(255);
    strokeWeight(1.5);
    noFill();
    ellipse(xE, yE, 12, 12);
    strokeWeight(1);
    if (dist(mouseX, mouseY, xE, yE) < 12) {
        hoverTarget = {
            name: isThreshold ? 'EC50 / LD50' : 'EC50 reference dose',
            desc: isThreshold
                ? 'Effective/Lethal Concentration for 50% of the population. Summarizes acute toxicity for ranking potency.'
                : 'Under the LNT model there is no safe threshold - any non-zero dose carries proportional risk.',
            x: mouseX, y: mouseY
        };
    }

    // Zone labels (only for Threshold)
    if (isThreshold) {
        noStroke();
        textSize(10);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        const xNOAEL = doseToX(logNOAEL, plotX0, plotX1);
        const xLOAEL = doseToX(logLOAEL, plotX0, plotX1);
        fill(46, 160, 67, 180);
        const leftCenter = (plotX0 + xNOAEL) / 2;
        if (leftCenter > plotX0 + 25) text('No Effect', leftCenter, plotY0 + 6);
        fill(180, 130, 0, 200);
        const midCenter = (xNOAEL + xLOAEL) / 2;
        if (xLOAEL - xNOAEL > 40) text('Uncertain', midCenter, plotY0 + 6);
        fill(160, 30, 40, 180);
        const rightCenter = (xLOAEL + plotX1) / 2;
        if (plotX1 - xLOAEL > 35) text('Effect', rightCenter, plotY0 + 6);
        textStyle(NORMAL);
    } else {
        noStroke();
        textSize(10);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        fill(160, 30, 40, 180);
        text('Linear No-Threshold: no safe dose', (plotX0 + plotX1) / 2, plotY0 + 6);
        textStyle(NORMAL);
    }

    // Legend (right side panel)
    drawLegend(plotX1 + 10, plotY0, 180, isThreshold);

    // Tooltip if hovering
    if (hoverTarget) {
        drawTooltip(hoverTarget);
    }

    // Control panel background
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220);
    line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    // Control labels
    fill(TEXT_DARK);
    textSize(12);
    textAlign(LEFT, CENTER);
    const baseY = drawHeight + 24;
    text('Hill slope:', 14, baseY);
    text(slope.toFixed(1), 298, baseY);

    text('Log EC50:', 14, baseY + 32);
    text(logEC50.toFixed(2), 298, baseY + 32);

    text('Model:', 360, baseY);

    // Caption / instructions on right of controls (placed below dropdown)
    fill(TITLE_BLUE);
    textSize(10);
    textAlign(LEFT, TOP);
    const capX = 360;
    let capY = drawHeight + 76;
    text('Drag sliders to reshape the curve. Hover any marker for its', capX, capY); capY += 13;
    text('definition. Switch models to compare threshold vs. linear-', capX, capY); capY += 13;
    text('no-threshold (LNT). Background zones show NOAEL/LOAEL bands.', capX, capY);
}

// Hill equation: fraction affected = D^n / (D^n + EC50^n)
function hillEffect(logD, logEC50, slope) {
    const ratio = Math.pow(10, slope * (logD - logEC50));
    return ratio / (1 + ratio);
}

// Linear No-Threshold: straight line from origin (in linear dose space).
// We use log-dose axis, so plot a linear-in-dose line clipped to [0,1].
function lntEffect(logD) {
    const d = Math.pow(10, logD);
    // Choose slope so that effect = 1 at d = 100
    const k = 0.01;
    return Math.min(1, k * d);
}

function doseToX(logD, plotX0, plotX1) {
    return map(logD, LOG_DOSE_MIN, LOG_DOSE_MAX, plotX0, plotX1);
}

function drawTriangle(cx, cy, size, color) {
    noStroke();
    fill(color);
    triangle(cx, cy - size * 0.9,
             cx - size * 0.8, cy + size * 0.6,
             cx + size * 0.8, cy + size * 0.6);
    stroke(255);
    strokeWeight(1.5);
    noFill();
    triangle(cx, cy - size * 0.9,
             cx - size * 0.8, cy + size * 0.6,
             cx + size * 0.8, cy + size * 0.6);
    strokeWeight(1);
}

function drawLegend(x, y, w, isThreshold) {
    noStroke();
    fill(245, 248, 252);
    rect(x, y, w, 230, 6);
    fill(TITLE_BLUE);
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Legend', x + 8, y + 8);
    textStyle(NORMAL);

    let ly = y + 28;
    const labelX = x + 26;

    // NOAEL marker
    if (isThreshold) {
        drawTriangle(x + 14, ly + 6, 6, NOAEL_COLOR);
        fill(TEXT_DARK); textSize(11);
        text('NOAEL', labelX, ly + 2);
        ly += 22;

        drawTriangle(x + 14, ly + 6, 6, LOAEL_COLOR);
        fill(TEXT_DARK); textSize(11);
        text('LOAEL', labelX, ly + 2);
        ly += 22;
    }

    // EC50/LD50 circle
    noStroke();
    fill(EC50_COLOR);
    ellipse(x + 14, ly + 6, 10, 10);
    fill(TEXT_DARK); textSize(11);
    text(isThreshold ? 'EC50 / LD50' : 'EC50 (reference)', labelX, ly + 2);
    ly += 22;

    // RfD dashed line
    if (isThreshold) {
        stroke(RFD_COLOR);
        strokeWeight(2);
        drawingContext.setLineDash([4, 3]);
        line(x + 8, ly + 6, x + 22, ly + 6);
        drawingContext.setLineDash([]);
        strokeWeight(1);
        noStroke();
        fill(TEXT_DARK); textSize(11);
        text('Reference Dose', labelX, ly + 2);
        ly += 26;
    }

    // Zone color swatches
    if (isThreshold) {
        fill(TITLE_BLUE);
        textSize(11);
        textStyle(BOLD);
        text('Zones', x + 8, ly);
        textStyle(NORMAL);
        ly += 16;

        fill(NO_EFFECT_FILL);
        stroke(180); strokeWeight(0.5);
        rect(x + 8, ly, 14, 12);
        noStroke();
        fill(TEXT_DARK); textSize(10);
        text('No effect', labelX, ly + 1);
        ly += 18;

        fill(UNCERTAIN_FILL);
        stroke(180); strokeWeight(0.5);
        rect(x + 8, ly, 14, 12);
        noStroke();
        fill(TEXT_DARK); textSize(10);
        text('Uncertain', labelX, ly + 1);
        ly += 18;

        fill(EFFECT_FILL);
        stroke(180); strokeWeight(0.5);
        rect(x + 8, ly, 14, 12);
        noStroke();
        fill(TEXT_DARK); textSize(10);
        text('Effect', labelX, ly + 1);
    } else {
        fill(TEXT_MUTED);
        textSize(10);
        text('LNT model: any dose', x + 8, ly);
        text('carries proportional', x + 8, ly + 13);
        text('risk (no safe level).', x + 8, ly + 26);
    }
}

function drawTooltip(target) {
    const tw = 230;
    // Estimate height by line count
    const lines = wrapLines(target.desc, tw - 14, 11);
    const th = 22 + lines.length * 14 + 6;
    let tx = target.x + 12;
    let ty = target.y - th - 8;
    if (tx + tw > containerWidth - 4) tx = target.x - tw - 12;
    if (ty < 4) ty = target.y + 12;
    if (tx < 4) tx = 4;

    fill(255, 255, 255, 245);
    stroke(150);
    strokeWeight(1);
    rect(tx, ty, tw, th, 5);
    noStroke();

    fill(TITLE_BLUE);
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, TOP);
    text(target.name, tx + 7, ty + 6);
    textStyle(NORMAL);
    fill(TEXT_DARK);
    textSize(11);
    let yy = ty + 22;
    for (const ln of lines) {
        text(ln, tx + 7, yy);
        yy += 14;
    }
}

function wrapLines(s, maxPx, sz) {
    push();
    textSize(sz);
    const words = s.split(' ');
    const out = [];
    let cur = '';
    for (const w of words) {
        const trial = cur ? cur + ' ' + w : w;
        if (textWidth(trial) > maxPx) {
            if (cur) out.push(cur);
            cur = w;
        } else {
            cur = trial;
        }
    }
    if (cur) out.push(cur);
    pop();
    return out;
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
