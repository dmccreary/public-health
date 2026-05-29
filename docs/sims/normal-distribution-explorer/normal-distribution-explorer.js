// Normal Distribution Explorer
// CANVAS_HEIGHT: 640
let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 170;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let meanSlider, sdSlider, shadingSelect, resetButton;
let lowerSlider, upperSlider;
let lowerLabel, upperLabel;

const TEAL = '#1f8a8a';
const TEAL_FILL = 'rgba(31,138,138,0.30)';
const AXIS_GRAY = '#6c757d';
const TEXT_DARK = '#212529';
const TITLE_BLUE = '#1a3a6c';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const baseY = drawHeight + 14;
    const col1X = 14;
    const col2X = 260;

    meanSlider = createSlider(-50, 50, 0, 1);
    meanSlider.position(col1X + 60, baseY);
    meanSlider.size(170);

    sdSlider = createSlider(1, 30, 10, 0.5);
    sdSlider.position(col1X + 60, baseY + 30);
    sdSlider.size(170);

    shadingSelect = createSelect();
    shadingSelect.position(col2X + 90, baseY);
    shadingSelect.option('None');
    shadingSelect.option('+/-1 sigma (68%)');
    shadingSelect.option('+/-1.96 sigma (95%)');
    shadingSelect.option('+/-3 sigma (99.7%)');
    shadingSelect.option('Custom range');
    shadingSelect.selected('+/-1.96 sigma (95%)');
    shadingSelect.changed(onShadingChange);

    resetButton = createButton('Reset');
    resetButton.position(col2X + 90, baseY + 32);
    resetButton.mousePressed(resetAll);

    // Custom range sliders (hidden by default)
    lowerSlider = createSlider(-200, 200, -20, 1);
    lowerSlider.position(col2X + 90, baseY + 64);
    lowerSlider.size(140);
    lowerSlider.hide();

    upperSlider = createSlider(-200, 200, 20, 1);
    upperSlider.position(col2X + 90, baseY + 94);
    upperSlider.size(140);
    upperSlider.hide();
}

function onShadingChange() {
    if (shadingSelect.value() === 'Custom range') {
        lowerSlider.show();
        upperSlider.show();
    } else {
        lowerSlider.hide();
        upperSlider.hide();
    }
}

function resetAll() {
    meanSlider.value(0);
    sdSlider.value(10);
    shadingSelect.selected('+/-1.96 sigma (95%)');
    onShadingChange();
}

function draw() {
    background(255);

    // Title
    fill(TITLE_BLUE);
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Normal Distribution Explorer', containerWidth / 2, 8);
    textStyle(NORMAL);

    const mu = meanSlider.value();
    const sigma = sdSlider.value();

    // Layout: plot left 65%, readout right 35%
    const plotMargin = { left: 50, right: 10, top: 36, bottom: 60 };
    const plotW = containerWidth * 0.65;
    const readoutX = plotW + 8;
    const readoutW = containerWidth - readoutX - 8;

    const plotX0 = plotMargin.left;
    const plotY0 = plotMargin.top;
    const plotX1 = plotW - plotMargin.right;
    const plotY1 = drawHeight - plotMargin.bottom;

    // X-range
    const xMin = mu - 4 * sigma;
    const xMax = mu + 4 * sigma;
    const peak = normalPDF(mu, mu, sigma); // peak density
    // Y so peak is 75% of plot height
    const yMax = peak / 0.75;

    // Axes
    stroke(AXIS_GRAY);
    strokeWeight(1);
    line(plotX0, plotY1, plotX1, plotY1); // x-axis
    line(plotX0, plotY0, plotX0, plotY1); // y-axis
    noStroke();
    fill(TEXT_DARK);
    textSize(11);
    textAlign(CENTER, TOP);

    // X tick labels (5 ticks)
    for (let i = 0; i <= 4; i++) {
        const xv = xMin + (xMax - xMin) * (i / 4);
        const px = map(xv, xMin, xMax, plotX0, plotX1);
        stroke(AXIS_GRAY);
        line(px, plotY1, px, plotY1 + 4);
        noStroke();
        fill(TEXT_DARK);
        text(nf(xv, 0, 1), px, plotY1 + 6);
    }
    // x-axis label
    textSize(12);
    text('x', (plotX0 + plotX1) / 2, plotY1 + 24);

    // Y-axis label
    push();
    translate(plotX0 - 38, (plotY0 + plotY1) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('density', 0, 0);
    pop();

    // Shading region
    const shading = shadingSelect.value();
    let shadeLo = null, shadeHi = null, shadeLabel = '';
    if (shading === '+/-1 sigma (68%)') {
        shadeLo = mu - sigma; shadeHi = mu + sigma;
        shadeLabel = '68.27%';
    } else if (shading === '+/-1.96 sigma (95%)') {
        shadeLo = mu - 1.96 * sigma; shadeHi = mu + 1.96 * sigma;
        shadeLabel = '95.00%';
    } else if (shading === '+/-3 sigma (99.7%)') {
        shadeLo = mu - 3 * sigma; shadeHi = mu + 3 * sigma;
        shadeLabel = '99.73%';
    } else if (shading === 'Custom range') {
        shadeLo = min(lowerSlider.value(), upperSlider.value());
        shadeHi = max(lowerSlider.value(), upperSlider.value());
        const p = normalCDF(shadeHi, mu, sigma) - normalCDF(shadeLo, mu, sigma);
        shadeLabel = (p * 100).toFixed(2) + '%';
    }

    if (shadeLo !== null) {
        noStroke();
        fill(TEAL_FILL);
        beginShape();
        const steps = 200;
        const xLoClip = constrain(shadeLo, xMin, xMax);
        const xHiClip = constrain(shadeHi, xMin, xMax);
        vertex(map(xLoClip, xMin, xMax, plotX0, plotX1), plotY1);
        for (let i = 0; i <= steps; i++) {
            const xv = xLoClip + (xHiClip - xLoClip) * (i / steps);
            const dens = normalPDF(xv, mu, sigma);
            const px = map(xv, xMin, xMax, plotX0, plotX1);
            const py = map(dens, 0, yMax, plotY1, plotY0);
            vertex(px, py);
        }
        vertex(map(xHiClip, xMin, xMax, plotX0, plotX1), plotY1);
        endShape(CLOSE);
    }

    // Curve
    noFill();
    stroke(TEAL);
    strokeWeight(3);
    beginShape();
    const curveSteps = 240;
    for (let i = 0; i <= curveSteps; i++) {
        const xv = xMin + (xMax - xMin) * (i / curveSteps);
        const dens = normalPDF(xv, mu, sigma);
        const px = map(xv, xMin, xMax, plotX0, plotX1);
        const py = map(dens, 0, yMax, plotY1, plotY0);
        vertex(px, py);
    }
    endShape();
    strokeWeight(1);

    // Mean line
    stroke(TITLE_BLUE);
    drawingContext.setLineDash([4, 4]);
    const muX = map(mu, xMin, xMax, plotX0, plotX1);
    line(muX, plotY0, muX, plotY1);
    drawingContext.setLineDash([]);
    noStroke();
    fill(TITLE_BLUE);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('μ = ' + nf(mu, 0, 1), muX, plotY0 - 2);

    // Shade label
    if (shadeLo !== null && shadeLabel) {
        fill(TITLE_BLUE);
        textSize(15);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        text(shadeLabel, (plotX0 + plotX1) / 2, plotY0 + 6);
        textStyle(NORMAL);
    }

    // Right readout panel
    fill(245, 248, 252);
    noStroke();
    rect(readoutX, plotMargin.top, readoutW, drawHeight - plotMargin.top - 8, 6);
    fill(TITLE_BLUE);
    textSize(13);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    let ry = plotMargin.top + 10;
    text('Parameters', readoutX + 10, ry); ry += 22;
    textStyle(NORMAL);
    fill(TEXT_DARK);
    textSize(12);
    text('μ (mean) = ' + nf(mu, 0, 1), readoutX + 10, ry); ry += 18;
    text('σ (sd)   = ' + nf(sigma, 0, 1), readoutX + 10, ry); ry += 22;

    fill(TITLE_BLUE);
    textStyle(BOLD);
    textSize(13);
    text('Empirical Rule', readoutX + 10, ry); ry += 20;
    textStyle(NORMAL);
    fill(TEXT_DARK);
    textSize(12);
    text('±1σ ≈ 68.27%', readoutX + 10, ry); ry += 16;
    text('±1.96σ ≈ 95.00%', readoutX + 10, ry); ry += 16;
    text('±3σ ≈ 99.73%', readoutX + 10, ry); ry += 22;

    if (shadeLo !== null) {
        fill(TITLE_BLUE);
        textStyle(BOLD);
        text('Shaded Region', readoutX + 10, ry); ry += 18;
        textStyle(NORMAL);
        fill(TEXT_DARK);
        text('[' + nf(shadeLo, 0, 1) + ', ' + nf(shadeHi, 0, 1) + ']', readoutX + 10, ry); ry += 16;
        text('P = ' + shadeLabel, readoutX + 10, ry); ry += 16;
    }

    // Hover tooltip on curve
    if (mouseX > plotX0 && mouseX < plotX1 && mouseY > plotY0 && mouseY < plotY1) {
        const xv = map(mouseX, plotX0, plotX1, xMin, xMax);
        const dens = normalPDF(xv, mu, sigma);
        const z = (xv - mu) / sigma;
        const py = map(dens, 0, yMax, plotY1, plotY0);
        // marker
        fill(TITLE_BLUE);
        noStroke();
        ellipse(mouseX, py, 6, 6);
        // tooltip box
        const tw = 150, th = 54;
        let tx = mouseX + 10;
        let ty = py - th - 8;
        if (tx + tw > plotX1) tx = mouseX - tw - 10;
        if (ty < plotY0) ty = py + 10;
        fill(255, 255, 255, 240);
        stroke(180);
        rect(tx, ty, tw, th, 4);
        noStroke();
        fill(TEXT_DARK);
        textSize(11);
        textAlign(LEFT, TOP);
        text('x = ' + nf(xv, 0, 2), tx + 6, ty + 6);
        text('z = (x−μ)/σ = ' + nf(z, 0, 2), tx + 6, ty + 20);
        text('density = ' + nf(dens, 0, 4), tx + 6, ty + 34);
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
    const baseY = drawHeight + 14;
    text('Mean μ:', 14, baseY + 8);
    text(nf(mu, 0, 1), 240, baseY + 8);
    text('SD σ:', 14, baseY + 38);
    text(nf(sigma, 0, 1), 240, baseY + 38);

    text('Shading:', 274, baseY + 8);
    text('Reset:', 274, baseY + 40);

    if (shadingSelect.value() === 'Custom range') {
        text('Lower:', 274, baseY + 72);
        text(nf(lowerSlider.value(), 0, 1), 444, baseY + 72);
        text('Upper:', 274, baseY + 102);
        text(nf(upperSlider.value(), 0, 1), 444, baseY + 102);
    }

    // Instructional caption on right of controls
    fill(TITLE_BLUE);
    textSize(11);
    textAlign(LEFT, TOP);
    const capX = 500;
    let capY = baseY;
    text('Tip: drag μ to slide the curve; drag σ to widen or narrow it.', capX, capY); capY += 16;
    text('Hover the curve to see x, z-score, and density.', capX, capY); capY += 16;
    text('Choose a shading option to see the area under the curve.', capX, capY); capY += 16;
    text('"Custom range" reveals lower and upper bound sliders.', capX, capY);
}

function normalPDF(x, mu, sigma) {
    const z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

// CDF using error function approximation (Abramowitz & Stegun 7.1.26)
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

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
