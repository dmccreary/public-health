// Inoculation Theory Visualizer
// CANVAS_HEIGHT: 570
let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 500;
let defaultTextSize = 14;

// Population grids
const GRID_COLS = 10;
const GRID_ROWS = 10;
const POP_SIZE = GRID_COLS * GRID_ROWS;
const SHIELD_FRACTION = 0.65; // 65% prebunked

// States
// 0 = healthy (green), 1 = infected (red), 2 = resistant/shielded-defended (blue), 3 = corrected (yellow)
let leftPop = [];   // No Prebunk
let rightPop = [];  // Prebunked
let rightShielded = []; // boolean per index in right population

// Simulation state
let spreadRate = 3;          // slider 1-5
let isSpreading = false;     // misinformation animation phase
let isDebunking = false;     // correction animation phase
let debunkMode = false;      // toggle: if true, run correction phase after spread
let frameCounter = 0;
let spreadStartFrame = 0;
let debunkStartFrame = 0;

// Controls
let spreadSlider;
let releaseBtn;
let debunkBtn;
let resetBtn;
let modeCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    resetPopulations();

    // Row 1 of controls
    releaseBtn = createButton('Release Misinformation');
    releaseBtn.parent(document.querySelector('main'));
    releaseBtn.position(margin, drawHeight + 10);
    releaseBtn.mousePressed(releaseMisinformation);

    debunkBtn = createButton('Deploy Correction');
    debunkBtn.parent(document.querySelector('main'));
    debunkBtn.position(margin + 175, drawHeight + 10);
    debunkBtn.mousePressed(deployCorrection);

    resetBtn = createButton('Reset');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.position(margin + 320, drawHeight + 10);
    resetBtn.mousePressed(resetPopulations);

    // Row 1 — slider on right side (label "Spread rate: N" drawn to its left)
    spreadSlider = createSlider(1, 5, 3, 1);
    spreadSlider.parent(document.querySelector('main'));
    spreadSlider.position(sliderLeftMargin, drawHeight + 12);
    spreadSlider.size(canvasWidth - sliderLeftMargin - margin);
    spreadSlider.input(() => { spreadRate = spreadSlider.value(); });

    // Row 2 — debunk mode checkbox
    modeCheckbox = createCheckbox(' Debunk Mode (corrections only AFTER spread)', false);
    modeCheckbox.parent(document.querySelector('main'));
    modeCheckbox.position(margin, drawHeight + 50);
    modeCheckbox.changed(() => { debunkMode = modeCheckbox.checked(); });

    describe('Side-by-side comparison of misinformation spread in two populations: one with no prebunking and one with 65% inoculated (prebunked) individuals shown with shield overlays. Buttons release misinformation and deploy corrections. A slider controls the spread rate.', LABEL);
}

function resetPopulations() {
    leftPop = new Array(POP_SIZE).fill(0);
    rightPop = new Array(POP_SIZE).fill(0);
    rightShielded = new Array(POP_SIZE).fill(false);
    // Randomly assign shields in right population
    let indices = [];
    for (let i = 0; i < POP_SIZE; i++) indices.push(i);
    // Fisher-Yates partial shuffle
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const numShield = Math.floor(POP_SIZE * SHIELD_FRACTION);
    for (let k = 0; k < numShield; k++) {
        rightShielded[indices[k]] = true;
    }
    isSpreading = false;
    isDebunking = false;
    frameCounter = 0;
}

function releaseMisinformation() {
    // Reset states (keep shields) and start spread
    for (let i = 0; i < POP_SIZE; i++) {
        leftPop[i] = 0;
        rightPop[i] = 0;
    }
    isSpreading = true;
    isDebunking = false;
    spreadStartFrame = frameCount;
    // Seed initial infections (3 random in each)
    for (let s = 0; s < 3; s++) {
        leftPop[Math.floor(Math.random() * POP_SIZE)] = 1;
        let r = Math.floor(Math.random() * POP_SIZE);
        // If shielded, resist immediately
        if (rightShielded[r]) rightPop[r] = 2;
        else rightPop[r] = 1;
    }
}

function deployCorrection() {
    // Only effective in Debunk Mode — corrections reach only some who already believed
    if (!isSpreading && countState(leftPop, 1) === 0 && countState(rightPop, 1) === 0) {
        return; // nothing to correct
    }
    isDebunking = true;
    debunkStartFrame = frameCount;
}

function spreadStep(pop, shielded) {
    // For each infected, probabilistically infect neighbors
    const probPerNeighbor = 0.06 * spreadRate; // 0.06..0.30
    const newInfections = [];
    for (let i = 0; i < POP_SIZE; i++) {
        if (pop[i] !== 1) continue;
        const r = Math.floor(i / GRID_COLS);
        const c = i % GRID_COLS;
        const neighbors = [
            [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
        ];
        for (let n of neighbors) {
            if (n[0] < 0 || n[0] >= GRID_ROWS || n[1] < 0 || n[1] >= GRID_COLS) continue;
            const ni = n[0] * GRID_COLS + n[1];
            if (pop[ni] === 0 && Math.random() < probPerNeighbor) {
                if (shielded && shielded[ni]) {
                    // Inoculated — resist
                    newInfections.push([ni, 2]);
                } else {
                    newInfections.push([ni, 1]);
                }
            }
        }
    }
    for (let ni of newInfections) {
        pop[ni[0]] = ni[1];
    }
}

function correctionStep(pop, shielded) {
    // Corrections reach limited fraction of infected.
    // In "Debunk Mode" (correction-after-spread) corrections are LESS effective.
    // Without debunk mode (prebunk philosophy) we don't really use this — but we still
    // model that corrections only flip ~10–15% of believers per step.
    const correctionProb = debunkMode ? 0.05 : 0.10;
    for (let i = 0; i < POP_SIZE; i++) {
        if (pop[i] === 1 && Math.random() < correctionProb) {
            pop[i] = 3; // corrected
        }
    }
}

function countState(pop, st) {
    let n = 0;
    for (let v of pop) if (v === st) n++;
    return n;
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    noStroke();
    fill('aliceblue');
    rect(0, 0, canvasWidth, drawHeight);
    stroke('silver');
    noFill();
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    noStroke();
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);
    stroke('silver');
    noFill();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    noStroke();
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    text('Inoculation Theory: Prebunking vs. No Prebunking', canvasWidth / 2, 8);
    textSize(12);
    fill('#444');
    text('Compare misinformation spread in a population with no prebunk (left) and 65% prebunked (right).', canvasWidth / 2, 32);

    // Layout: two side-by-side panels
    const panelGap = 20;
    const panelW = (canvasWidth - 3 * panelGap) / 2;
    const panelH = drawHeight - 60 - 80; // leave room for title and counters
    const panelY = 56;
    const leftX = panelGap;
    const rightX = panelGap * 2 + panelW;

    drawPopulationPanel(leftX, panelY, panelW, panelH, 'No Prebunk', leftPop, null, '#c0392b');
    drawPopulationPanel(rightX, panelY, panelW, panelH, 'Prebunked (65% inoculated)', rightPop, rightShielded, '#1f6f4a');

    // Counters
    drawCounters(leftX, panelY + panelH + 6, panelW, leftPop);
    drawCounters(rightX, panelY + panelH + 6, panelW, rightPop);

    // Control label for slider — placed just to the left of the slider
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Spread rate: ' + spreadRate, sliderLeftMargin - 100, drawHeight + 22);

    // Legend in control area row 2 (right of checkbox)
    drawLegend(canvasWidth - 360, drawHeight + 48);

    // Run simulation steps at slowed cadence
    frameCounter++;
    if (isSpreading && frameCounter % 6 === 0) {
        spreadStep(leftPop, null);
        spreadStep(rightPop, rightShielded);
        // Stop when no more infectious change possible — heuristic: stop after 60 frames
        if (frameCount - spreadStartFrame > 240) {
            isSpreading = false;
            // If debunk mode is on, auto-deploy correction shortly after
            if (debunkMode) {
                isDebunking = true;
                debunkStartFrame = frameCount;
            }
        }
    }
    if (isDebunking && frameCounter % 8 === 0) {
        correctionStep(leftPop, null);
        correctionStep(rightPop, rightShielded);
        if (frameCount - debunkStartFrame > 200) {
            isDebunking = false;
        }
    }
}

function drawPopulationPanel(x, y, w, h, label, pop, shielded, accentColor) {
    // Panel frame
    noStroke();
    fill('white');
    rect(x, y, w, h, 8);
    stroke('silver');
    strokeWeight(1);
    noFill();
    rect(x, y, w, h, 8);

    // Panel header bar
    noStroke();
    fill(accentColor);
    rect(x, y, w, 22, 8, 8, 0, 0);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(13);
    text(label, x + w / 2, y + 11);

    // Grid of icons
    const gridPadX = 10;
    const gridPadY = 32;
    const gridW = w - 2 * gridPadX;
    const gridH = h - gridPadY - 10;
    const cellW = gridW / GRID_COLS;
    const cellH = gridH / GRID_ROWS;
    const iconR = Math.min(cellW, cellH) * 0.32;

    for (let i = 0; i < POP_SIZE; i++) {
        const row = Math.floor(i / GRID_COLS);
        const col = i % GRID_COLS;
        const cx = x + gridPadX + col * cellW + cellW / 2;
        const cy = y + gridPadY + row * cellH + cellH / 2;
        drawPerson(cx, cy, iconR, pop[i], shielded ? shielded[i] : false);
    }
}

function drawPerson(cx, cy, r, state, hasShield) {
    let fillCol;
    if (state === 0) fillCol = '#7fc97f';      // healthy green
    else if (state === 1) fillCol = '#e74c3c'; // believed red
    else if (state === 2) fillCol = '#2980b9'; // resisted blue
    else if (state === 3) fillCol = '#f1c40f'; // corrected yellow

    noStroke();
    fill(fillCol);
    // head
    ellipse(cx, cy - r * 0.4, r * 1.1, r * 1.1);
    // body (rounded rect)
    rect(cx - r * 0.7, cy + r * 0.15, r * 1.4, r * 0.9, 4);

    if (hasShield) {
        // shield overlay — small blue arc around head
        noFill();
        stroke('#1f4e79');
        strokeWeight(1.5);
        arc(cx, cy - r * 0.4, r * 1.7, r * 1.7, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
        noStroke();
    }
}

function drawCounters(x, y, w, pop) {
    const healthy = countState(pop, 0);
    const believed = countState(pop, 1);
    const resisted = countState(pop, 2);
    const corrected = countState(pop, 3);
    const exposed = believed + resisted + corrected;

    noStroke();
    fill('#f6f9fc');
    rect(x, y, w, 70, 6);
    stroke('#cdd6e0');
    noFill();
    rect(x, y, w, 70, 6);

    noStroke();
    fill('#222');
    textAlign(LEFT, TOP);
    textSize(12);
    const col1X = x + 10;
    const col2X = x + w / 2 + 5;
    text('Exposed: ' + exposed, col1X, y + 8);
    text('Believed: ' + believed, col1X, y + 26);
    text('Resisted: ' + resisted, col2X, y + 8);
    text('Correction Reached: ' + corrected, col2X, y + 26);

    // Believed bar (visual)
    const barX = x + 10;
    const barY = y + 50;
    const barW = w - 20;
    fill('#ecf0f1');
    rect(barX, barY, barW, 10, 4);
    fill('#e74c3c');
    rect(barX, barY, barW * (believed / POP_SIZE), 10, 4);
    noFill();
    stroke('#bdc3c7');
    rect(barX, barY, barW, 10, 4);
}

function drawLegend(x, y) {
    noStroke();
    fill('#222');
    textSize(11);
    textAlign(LEFT, CENTER);

    const items = [
        { c: '#7fc97f', label: 'Healthy' },
        { c: '#e74c3c', label: 'Believed' },
        { c: '#2980b9', label: 'Resisted' },
        { c: '#f1c40f', label: 'Corrected' }
    ];
    let cx = x;
    for (let it of items) {
        fill(it.c);
        rect(cx, y - 6, 12, 12, 2);
        fill('#222');
        text(it.label, cx + 16, y);
        cx += 90;
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(container.offsetWidth, 600);
    }
    if (typeof spreadSlider !== 'undefined' && spreadSlider) {
        spreadSlider.size(Math.max(120, canvasWidth - sliderLeftMargin - margin));
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
