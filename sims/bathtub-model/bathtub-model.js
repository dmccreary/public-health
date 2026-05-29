// Stock-and-Flow Bathtub Model
// CANVAS_HEIGHT: 620
let canvasWidth = 820;
let drawHeight = 360;
let graphHeight = 160;
let controlHeight = 100;
let canvasHeight = drawHeight + graphHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Simulation state
let stock = 50;          // Infected Individuals (the water level)
let initialStock = 50;
let timeDays = 0;
const MAX_DAYS = 100;
const MAX_STOCK = 1000;  // bathtub capacity
const DT = 0.25;         // days per integration step
const STEPS_PER_FRAME = 1;

// Time series for graph
let history = []; // { t, stock, inflow, outflow }

// Reporting delay buffer (for delay toggle)
let inflowBuffer = []; // queue of pending inflow values
const DELAY_DAYS = 5;

// p5 controls
let betaSlider, gammaSlider, initSlider;
let resetBtn, playBtn, delayChk;
let running = true;
let useDelay = false;

// Layout
const tubX = 30;
const tubY = 110;
const tubW = 360;
const tubH = 180;

// Drip animation state
let dripPhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const cy = drawHeight + graphHeight + 12;
    const xs = 20;

    // Row 1: beta slider
    createSpan('Inflow rate &beta; (new infections/day):').position(xs, cy).style('font-size', '12px');
    betaSlider = createSlider(0.1, 0.5, 0.25, 0.01);
    betaSlider.position(xs + 230, cy);
    betaSlider.style('width', '140px');

    // Row 1 right: gamma slider
    const xs2 = xs + 410;
    createSpan('Outflow rate &gamma; (recoveries/day):').position(xs2, cy).style('font-size', '12px');
    gammaSlider = createSlider(0.05, 0.3, 0.10, 0.01);
    gammaSlider.position(xs2 + 220, cy);
    gammaSlider.style('width', '120px');

    // Row 2: initial infected slider
    createSpan('Initial infected:').position(xs, cy + 32).style('font-size', '12px');
    initSlider = createSlider(10, 200, 50, 5);
    initSlider.position(xs + 110, cy + 32);
    initSlider.style('width', '140px');
    initSlider.input(() => {
        initialStock = initSlider.value();
        resetSim();
    });

    // Row 2: delay checkbox
    delayChk = createCheckbox(' Add 5-day reporting delay', false);
    delayChk.position(xs + 280, cy + 32);
    delayChk.style('font-size', '12px');
    delayChk.changed(() => {
        useDelay = delayChk.checked();
        resetSim();
    });

    // Row 2 right: buttons
    playBtn = createButton('Pause');
    playBtn.position(xs2 + 220, cy + 30);
    playBtn.mousePressed(() => {
        running = !running;
        playBtn.html(running ? 'Pause' : 'Play');
    });

    resetBtn = createButton('Reset');
    resetBtn.position(xs2 + 290, cy + 30);
    resetBtn.mousePressed(resetSim);

    resetSim();
}

function resetSim() {
    stock = initialStock;
    timeDays = 0;
    history = [{ t: 0, stock: stock, inflow: 0, outflow: 0 }];
    inflowBuffer = [];
    for (let i = 0; i < Math.ceil(DELAY_DAYS / DT); i++) {
        inflowBuffer.push(0);
    }
}

function stepSim() {
    const beta = betaSlider.value();
    const gamma = gammaSlider.value();

    for (let k = 0; k < STEPS_PER_FRAME; k++) {
        if (timeDays >= MAX_DAYS) {
            running = false;
            playBtn.html('Play');
            return;
        }

        // True inflow grows then plateaus (S-shaped — typical epidemic onset)
        // For pedagogical clarity we use a smooth time-varying inflow.
        // beta is interpreted as a per-day fractional rate scaled by a saturating term.
        const trueInflowRate = beta * 100 * (1 - Math.exp(-timeDays / 15)) * Math.exp(-timeDays / 60);

        // If delay enabled, push to buffer and read delayed value
        let effectiveInflow;
        if (useDelay) {
            inflowBuffer.push(trueInflowRate);
            effectiveInflow = inflowBuffer.shift();
        } else {
            effectiveInflow = trueInflowRate;
        }

        const outflowRate = gamma * stock;
        stock += (effectiveInflow - outflowRate) * DT;
        if (stock < 0) stock = 0;
        if (stock > MAX_STOCK) stock = MAX_STOCK;

        timeDays += DT;
        history.push({
            t: timeDays,
            stock: stock,
            inflow: effectiveInflow,
            outflow: outflowRate
        });
    }
}

function draw() {
    background(255);

    // Title
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Stock-and-Flow Bathtub Model', containerWidth / 2, 8);
    textStyle(NORMAL);

    if (running) stepSim();
    dripPhase += 0.06;

    drawBathtub();
    drawEquationPanel();
    drawTimeSeries();
    drawControlsStrip();
}

function drawBathtub() {
    const beta = betaSlider.value();
    const gamma = gammaSlider.value();

    // Faucet (top-left of tub)
    const faucetX = tubX + 70;
    const faucetY = tubY - 38;
    // Labels ABOVE faucet (so nothing is clipped)
    fill('#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Inflow: New Infections', tubX, 38);
    textStyle(NORMAL);
    fill('#555'); textSize(10);
    text('β = ' + beta.toFixed(2) + ' · saturating(t)', tubX, 54);
    // Faucet glyph
    stroke('#444'); strokeWeight(2); fill('#bdc3c7');
    rect(faucetX - 18, faucetY - 14, 36, 14, 3);
    rect(faucetX - 6, faucetY, 12, 22);
    noStroke();

    // Animated water stream from faucet to tub
    const inflowVisual = history.length ? history[history.length - 1].inflow : 0;
    const streamStrength = Math.min(1, inflowVisual / 30);
    if (streamStrength > 0.01) {
        stroke('#3498db'); strokeWeight(2 + streamStrength * 3);
        const streamTop = faucetY + 22;
        const streamBottom = tubY + 6;
        for (let i = 0; i < 3; i++) {
            const offset = ((dripPhase * 20 + i * 10) % 20);
            const yA = streamTop + offset;
            const yB = Math.min(yA + 6, streamBottom);
            if (yA < streamBottom) line(faucetX, yA, faucetX, yB);
        }
        noStroke();
    }

    // Bathtub outline (rounded rectangle)
    stroke('#34495e'); strokeWeight(3); fill('#ecf0f1');
    rect(tubX, tubY, tubW, tubH, 12);

    // Water level inside tub (Stock = Infected)
    const waterFrac = stock / MAX_STOCK;
    const waterH = Math.max(0, waterFrac * (tubH - 12));
    const waterY = tubY + tubH - 6 - waterH;
    noStroke();
    fill(231, 76, 60, 200);
    rect(tubX + 6, waterY, tubW - 12, waterH, 6);

    // Water surface highlight
    if (waterH > 4) {
        fill(255, 255, 255, 80);
        rect(tubX + 6, waterY, tubW - 12, 3, 6);
    }

    // Stock label inside tub
    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(CENTER, TOP);
    text('STOCK: Infected Individuals', tubX + tubW / 2, tubY + 8);
    textStyle(NORMAL); textSize(22); textStyle(BOLD); fill('#fff');
    if (waterH > 30) {
        textAlign(CENTER, CENTER);
        text(nf(stock, 0, 0), tubX + tubW / 2, waterY + waterH / 2);
    } else {
        fill('#1a3a6c'); textAlign(CENTER, TOP);
        text(nf(stock, 0, 0), tubX + tubW / 2, tubY + 32);
    }
    textStyle(NORMAL);

    // Drain — bottom-right of tub, pointing down
    const drainX = tubX + tubW - 60;
    const drainTopY = tubY + tubH;
    stroke('#444'); strokeWeight(2); fill('#7f8c8d');
    rect(drainX - 14, drainTopY, 28, 10, 2);
    rect(drainX - 5, drainTopY + 10, 10, 18, 2);
    noStroke();

    // Animated drain water
    const outflowVisual = history.length ? history[history.length - 1].outflow : 0;
    const drainStrength = Math.min(1, outflowVisual / 30);
    if (drainStrength > 0.01) {
        stroke('#27ae60'); strokeWeight(2 + drainStrength * 3);
        const dropTop = drainTopY + 30;
        const dropBottom = drainTopY + 50;
        for (let i = 0; i < 2; i++) {
            const offset = ((dripPhase * 25 + i * 10) % 20);
            const yA = dropTop + offset;
            const yB = Math.min(yA + 6, dropBottom);
            if (yA < dropBottom) line(drainX, yA, drainX, yB);
        }
        noStroke();
    }

    // Drain labels — placed to the LEFT of the drain stem
    fill('#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(RIGHT, TOP);
    text('Outflow: Recoveries', drainX - 22, drainTopY + 14);
    textStyle(NORMAL);
    fill('#555'); textSize(10);
    text('rate = γ · Stock = ' + (gamma * stock).toFixed(1), drainX - 22, drainTopY + 30);

    // Delay indicator if active
    if (useDelay) {
        fill('#e67e22'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
        text('⏱ 5-day reporting delay active', tubX, drainTopY + 46);
        textStyle(NORMAL);
    }
}

function drawEquationPanel() {
    const px = tubX + tubW + 30;
    const py = tubY - 20;
    const pw = containerWidth - px - 20;
    const ph = 240;

    fill('#f4f7fa'); stroke('#cfd8e3'); strokeWeight(1);
    rect(px, py, pw, ph, 6);
    noStroke();

    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Stock Equation', px + 10, py + 8);
    textStyle(NORMAL);

    const beta = betaSlider.value();
    const gamma = gammaSlider.value();
    const currentInflow = history.length ? history[history.length - 1].inflow : 0;
    const currentOutflow = history.length ? history[history.length - 1].outflow : 0;

    fill('#222'); textSize(12);
    let y = py + 32;
    const lineH = 18;

    text('Stock(t + dt) = Stock(t) + dt ·', px + 10, y); y += lineH;
    text('     [ Inflow − Outflow ]', px + 10, y); y += lineH + 6;

    fill('#3498db'); textStyle(BOLD);
    text('Inflow  = β-driven', px + 10, y);
    fill('#222'); textStyle(NORMAL);
    text('= ' + currentInflow.toFixed(2) + ' /day', px + 130, y); y += lineH;

    fill('#27ae60'); textStyle(BOLD);
    text('Outflow = γ · Stock', px + 10, y);
    fill('#222'); textStyle(NORMAL);
    text('= ' + currentOutflow.toFixed(2) + ' /day', px + 130, y); y += lineH + 4;

    stroke('#cfd8e3'); line(px + 10, y, px + pw - 10, y); noStroke();
    y += 6;

    fill('#1a3a6c'); textStyle(BOLD); textSize(12);
    text('Current values', px + 10, y); y += lineH;
    fill('#222'); textStyle(NORMAL);
    text('t       = ' + timeDays.toFixed(1) + ' days', px + 10, y); y += lineH;
    text('Stock   = ' + nf(stock, 0, 0) + ' infected', px + 10, y); y += lineH;
    text('β = ' + beta.toFixed(2) + ',   γ = ' + gamma.toFixed(2), px + 10, y); y += lineH;

    const net = currentInflow - currentOutflow;
    fill(net > 0 ? '#c0392b' : '#27ae60'); textStyle(BOLD);
    text('Net change: ' + (net >= 0 ? '+' : '') + net.toFixed(2) + ' /day', px + 10, y);
    textStyle(NORMAL);
}

function drawTimeSeries() {
    const px = 30;
    const py = drawHeight + 8;
    const pw = containerWidth - 60;
    const ph = graphHeight - 16;

    fill('#fafbfc'); stroke('#ddd');
    rect(px, py, pw, ph, 4);
    noStroke();

    fill('#1a3a6c'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Stock over Time (100 days)', px + 8, py + 6);
    textStyle(NORMAL);

    const ax0 = px + 44;
    const ay0 = py + 22;
    const ax1 = px + pw - 12;
    const ay1 = py + ph - 22;

    // y-axis grid: 0, max/2, max
    stroke('#e6e8eb'); strokeWeight(1);
    for (let i = 1; i <= 3; i++) {
        const yy = ay1 - (i / 4) * (ay1 - ay0);
        line(ax0, yy, ax1, yy);
    }
    // axes
    stroke('#999'); strokeWeight(1);
    line(ax0, ay0, ax0, ay1);
    line(ax0, ay1, ax1, ay1);
    noStroke();

    // y-axis labels
    fill('#555'); textSize(10); textAlign(RIGHT, CENTER);
    text(MAX_STOCK, ax0 - 4, ay0);
    text(Math.round(MAX_STOCK / 2), ax0 - 4, (ay0 + ay1) / 2);
    text('0', ax0 - 4, ay1);
    textAlign(CENTER, TOP);
    text('Day', (ax0 + ax1) / 2, ay1 + 4);
    textAlign(LEFT, CENTER);
    push();
    translate(px + 12, (ay0 + ay1) / 2);
    rotate(-Math.PI / 2);
    text('Stock', 0, 0);
    pop();

    // x-axis ticks
    fill('#555'); textSize(9); textAlign(CENTER, TOP);
    for (let d = 0; d <= MAX_DAYS; d += 20) {
        const xx = ax0 + (d / MAX_DAYS) * (ax1 - ax0);
        stroke('#bbb'); line(xx, ay1, xx, ay1 + 3); noStroke();
        text(d, xx, ay1 + 5);
    }

    if (history.length < 2) return;

    // Plot stock curve
    const xScale = (ax1 - ax0) / MAX_DAYS;
    const yScale = (ay1 - ay0) / MAX_STOCK;
    stroke('#c0392b'); strokeWeight(2.5); noFill();
    beginShape();
    for (const h of history) {
        const xx = ax0 + h.t * xScale;
        const yy = ay1 - h.stock * yScale;
        vertex(xx, yy);
    }
    endShape();
    noStroke();

    // Current marker
    const last = history[history.length - 1];
    fill('#c0392b'); noStroke();
    const cx = ax0 + last.t * xScale;
    const cy = ay1 - last.stock * yScale;
    ellipse(cx, cy, 7, 7);

    // Legend
    textSize(11); textAlign(LEFT, CENTER);
    fill('#c0392b'); rect(px + 200, py + 8, 14, 3);
    fill('#333'); text('Stock (Infected)', px + 220, py + 10);
}

function drawControlsStrip() {
    const cy0 = drawHeight + graphHeight;
    fill(248); noStroke();
    rect(0, cy0, containerWidth, controlHeight);
    stroke(220); line(0, cy0, containerWidth, cy0);
    noStroke();
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
