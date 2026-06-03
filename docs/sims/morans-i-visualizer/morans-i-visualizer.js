// Moran's I Spatial Autocorrelation Visualizer
// CANVAS_HEIGHT: 600
let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 170;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

const GRID_N = 10;
const TITLE_BLUE = '#1a3a6c';
const TEXT_DARK = '#212529';
const AXIS_GRAY = '#6c757d';
const PANEL_BG = '#f6f8fb';
const HIGHLIGHT = '#ff8800';

// 5-color sequential scale (light yellow -> dark red)
const RAMP = ['#ffffcc', '#ffeda0', '#feb24c', '#fd8d3c', '#e31a1c'];

let clusterSlider, dispersionSlider, outlierSlider, resetButton;
let clusterLabel, dispersionLabel, outlierLabel;

let baseField = [];   // base random field (deterministic seed)
let values = [];      // current displayed values [0..1]
let weights = [];     // queen contiguity weights[i][j]
let selectedCell = -1; // index into 0..99 or -1
let moransI = 0;
let lastParams = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    // Generate fixed base field (so smoothing has a stable substrate)
    randomSeed(42);
    for (let i = 0; i < GRID_N * GRID_N; i++) {
        baseField.push(random());
    }

    // Precompute queen contiguity weights (row-standardized)
    buildWeightsMatrix();

    // ---- Controls ----
    const baseY = drawHeight + 20;
    const col1X = 20;
    const col1SliderX = col1X + 150;
    const sliderW = 200;

    clusterSlider = createSlider(0, 100, 70, 1);
    clusterSlider.position(col1SliderX, baseY);
    clusterSlider.size(sliderW);

    dispersionSlider = createSlider(-100, 0, 0, 1);
    dispersionSlider.position(col1SliderX, baseY + 32);
    dispersionSlider.size(sliderW);

    outlierSlider = createSlider(0, 5, 0, 1);
    outlierSlider.position(col1SliderX, baseY + 64);
    outlierSlider.size(sliderW);

    resetButton = createButton('Reset to Random');
    resetButton.position(col1X, baseY + 102);
    resetButton.mousePressed(resetAll);

    recomputeField();
}

function resetAll() {
    clusterSlider.value(0);
    dispersionSlider.value(0);
    outlierSlider.value(0);
    selectedCell = -1;
}

function draw() {
    background(255);

    // Title
    fill(TITLE_BLUE);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(15);
    textStyle(BOLD);
    text("Moran's I Spatial Autocorrelation Visualizer", containerWidth / 2, 6);
    textStyle(NORMAL);

    // Recompute field if sliders changed
    const params = clusterSlider.value() + ',' +
                   dispersionSlider.value() + ',' +
                   outlierSlider.value();
    if (params !== lastParams) {
        recomputeField();
        lastParams = params;
    }

    drawGrid();
    drawStatsPanel();
    drawScatterPlot();
    drawControlLabels();
}

// ---------- Layout regions ----------
function gridRegion() {
    // Grid on left, square
    const margin = 18;
    const topY = 30;
    const maxH = drawHeight - topY - 10;
    const size = Math.min(maxH, containerWidth * 0.45);
    return { x: margin, y: topY, size: size };
}

function panelRegion() {
    const g = gridRegion();
    const x = g.x + g.size + 24;
    const y = g.y;
    const w = containerWidth - x - 18;
    const h = drawHeight - y - 10;
    return { x: x, y: y, w: w, h: h };
}

// ---------- Drawing ----------
function drawGrid() {
    const g = gridRegion();
    const cell = g.size / GRID_N;

    // Background panel
    noStroke();
    fill(PANEL_BG);
    rect(g.x - 6, g.y - 6, g.size + 12, g.size + 12, 4);

    // Cells
    for (let r = 0; r < GRID_N; r++) {
        for (let c = 0; c < GRID_N; c++) {
            const idx = r * GRID_N + c;
            const v = values[idx];
            const colr = rampColor(v);
            fill(colr);
            stroke(220);
            strokeWeight(1);
            rect(g.x + c * cell, g.y + r * cell, cell, cell);
        }
    }

    // Highlight selected cell + queen neighbors
    if (selectedCell >= 0) {
        const neigh = queenNeighbors(selectedCell);
        noFill();
        stroke(HIGHLIGHT);
        strokeWeight(3);
        for (const n of neigh) {
            const r = Math.floor(n / GRID_N);
            const c = n % GRID_N;
            rect(g.x + c * cell + 1, g.y + r * cell + 1, cell - 2, cell - 2);
        }
        // Selected cell with thicker border
        stroke('#cc4400');
        strokeWeight(4);
        const sr = Math.floor(selectedCell / GRID_N);
        const sc = selectedCell % GRID_N;
        rect(g.x + sc * cell + 1, g.y + sr * cell + 1, cell - 2, cell - 2);
    }

    // Legend below grid
    drawColorLegend(g.x, g.y + g.size + 8, g.size);

    // Grid title
    noStroke();
    fill(TEXT_DARK);
    textAlign(LEFT, BOTTOM);
    textSize(12);
    text('Simulated disease rate by county (10x10 grid)', g.x, g.y - 6);
}

function drawColorLegend(x, y, w) {
    const swatchW = w / RAMP.length;
    const swatchH = 12;
    noStroke();
    for (let i = 0; i < RAMP.length; i++) {
        fill(RAMP[i]);
        rect(x + i * swatchW, y, swatchW, swatchH);
    }
    fill(AXIS_GRAY);
    textAlign(LEFT, TOP);
    textSize(10);
    text('low', x, y + swatchH + 2);
    textAlign(RIGHT, TOP);
    text('high', x + w, y + swatchH + 2);
}

function drawStatsPanel() {
    const p = panelRegion();

    // Panel background
    noStroke();
    fill(PANEL_BG);
    rect(p.x, p.y, p.w, p.h, 6);

    // Big Moran's I value
    fill(TITLE_BLUE);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(13);
    text("Global Moran's I", p.x + p.w / 2, p.y + 10);

    const valY = p.y + 30;
    const valText = (moransI >= 0 ? '+' : '') + moransI.toFixed(3);
    textSize(38);
    fill(moransIColor(moransI));
    text(valText, p.x + p.w / 2, valY);
    textStyle(NORMAL);

    // Interpretation
    fill(TEXT_DARK);
    textSize(12);
    textAlign(CENTER, TOP);
    const interp = interpretMoransI(moransI);
    text(interp, p.x + p.w / 2, valY + 50);

    // Scale guide
    const scaleY = valY + 78;
    drawScaleBar(p.x + 14, scaleY, p.w - 28);

    // Selected cell info
    if (selectedCell >= 0) {
        const v = values[selectedCell];
        const neigh = queenNeighbors(selectedCell);
        let lag = 0;
        if (neigh.length > 0) {
            for (const n of neigh) lag += values[n];
            lag /= neigh.length;
        }
        const r = Math.floor(selectedCell / GRID_N);
        const c = selectedCell % GRID_N;

        fill(TEXT_DARK);
        textAlign(LEFT, TOP);
        textSize(11);
        const ty = scaleY + 30;
        text(`Selected cell: row ${r+1}, col ${c+1}`, p.x + 12, ty);
        text(`Value: ${v.toFixed(3)}   Neighbor mean: ${lag.toFixed(3)}`,
             p.x + 12, ty + 14);
        text(`Queen neighbors: ${neigh.length}`, p.x + 12, ty + 28);
    } else {
        fill(AXIS_GRAY);
        textAlign(LEFT, TOP);
        textSize(11);
        text('Click any cell to highlight its queen-contiguous',
             p.x + 12, scaleY + 30);
        text('neighbors (orange borders).',
             p.x + 12, scaleY + 44);
    }
}

function drawScaleBar(x, y, w) {
    // -1 ... 0 ... +1 number line
    const cy = y + 8;
    stroke(AXIS_GRAY);
    strokeWeight(1);
    line(x, cy, x + w, cy);
    // Tick marks
    for (let i = 0; i <= 4; i++) {
        const tx = x + (i / 4) * w;
        line(tx, cy - 3, tx, cy + 3);
    }
    // Indicator triangle for current I
    const ix = x + ((moransI + 1) / 2) * w;
    fill(moransIColor(moransI));
    noStroke();
    triangle(ix - 5, cy - 11, ix + 5, cy - 11, ix, cy - 3);

    // Labels
    fill(AXIS_GRAY);
    textAlign(CENTER, TOP);
    textSize(9);
    text('-1', x, cy + 5);
    text('0', x + w / 2, cy + 5);
    text('+1', x + w, cy + 5);
    textAlign(LEFT, TOP);
    text('dispersed', x, cy + 16);
    textAlign(RIGHT, TOP);
    text('clustered', x + w, cy + 16);
}

function drawScatterPlot() {
    // Moran's I scatter plot: x = value (standardized), y = spatial lag
    // Place below the panel content area? We'll tuck it inside the panel.
    const p = panelRegion();
    const plotW = Math.min(p.w - 30, 200);
    const plotH = Math.min(120, p.h - 220);
    if (plotH < 70) return;
    const px = p.x + (p.w - plotW) / 2;
    const py = p.y + p.h - plotH - 14;

    // Background
    noStroke();
    fill(255);
    rect(px, py, plotW, plotH, 3);
    stroke('#dee2e6');
    strokeWeight(1);
    noFill();
    rect(px, py, plotW, plotH);

    // Compute standardized values and spatial lags
    const n = values.length;
    let mean = 0;
    for (let i = 0; i < n; i++) mean += values[i];
    mean /= n;
    let varv = 0;
    for (let i = 0; i < n; i++) varv += (values[i] - mean) * (values[i] - mean);
    const sd = Math.sqrt(varv / n) || 1;

    const xs = [];
    const ys = [];
    for (let i = 0; i < n; i++) {
        const zi = (values[i] - mean) / sd;
        let lag = 0;
        const row = weights[i];
        for (let j = 0; j < n; j++) {
            if (row[j] > 0) lag += row[j] * ((values[j] - mean) / sd);
        }
        xs.push(zi);
        ys.push(lag);
    }

    // Scatter range: clamp -3..3
    const RANGE = 3;
    const toPx = (zx, zy) => {
        const xx = px + ((zx + RANGE) / (2 * RANGE)) * plotW;
        const yy = py + plotH - ((zy + RANGE) / (2 * RANGE)) * plotH;
        return [xx, yy];
    };

    // Axes through origin
    stroke('#adb5bd');
    strokeWeight(1);
    const [oxL, oyL] = toPx(-RANGE, 0);
    const [oxR, oyR] = toPx(RANGE, 0);
    line(oxL, oyL, oxR, oyR);
    const [oxT, oyT] = toPx(0, RANGE);
    const [oxB, oyB] = toPx(0, -RANGE);
    line(oxT, oyT, oxB, oyB);

    // Quadrant labels
    noStroke();
    fill(AXIS_GRAY);
    textSize(9);
    textAlign(RIGHT, TOP);
    text('HH', px + plotW - 3, py + 2);
    textAlign(LEFT, TOP);
    text('LH', px + 3, py + 2);
    textAlign(LEFT, BOTTOM);
    text('LL', px + 3, py + plotH - 2);
    textAlign(RIGHT, BOTTOM);
    text('HL', px + plotW - 3, py + plotH - 2);

    // Points
    noStroke();
    for (let i = 0; i < n; i++) {
        let zx = constrain(xs[i], -RANGE, RANGE);
        let zy = constrain(ys[i], -RANGE, RANGE);
        const [xx, yy] = toPx(zx, zy);
        if (i === selectedCell) {
            fill(HIGHLIGHT);
            ellipse(xx, yy, 8, 8);
        } else {
            fill(26, 58, 108, 130);
            ellipse(xx, yy, 4, 4);
        }
    }

    // Plot title
    fill(TEXT_DARK);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text("Moran's scatter (value vs. spatial lag)", px + plotW / 2, py - 2);
}

function drawControlLabels() {
    const baseY = drawHeight + 20;
    fill(TEXT_DARK);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);

    const cv = clusterSlider.value() / 100;
    const dv = dispersionSlider.value() / 100;
    const ov = outlierSlider.value();

    text(`Clustering strength: ${cv.toFixed(2)}`, 20, baseY + 6);
    text(`Spatial dispersion: ${dv.toFixed(2)}`, 20, baseY + 38);
    text(`Outlier injection: ${ov}`, 20, baseY + 70);

    // Section header for sliders
    fill(TITLE_BLUE);
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('Controls', 20, drawHeight + 16);
    textStyle(NORMAL);

    // Hints to the right of sliders
    const hintX = clusterSlider.x + clusterSlider.size().width + 14;
    fill(AXIS_GRAY);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('0 random  -  1 strong clustering', hintX, baseY + 6);
    text('-1 checkerboard  -  0 off', hintX, baseY + 38);
    text('0 to 5 high-rate cells in low-rate areas', hintX, baseY + 70);
}

// ---------- Interaction ----------
function mousePressed() {
    const g = gridRegion();
    if (mouseX >= g.x && mouseX <= g.x + g.size &&
        mouseY >= g.y && mouseY <= g.y + g.size) {
        const cell = g.size / GRID_N;
        const c = Math.floor((mouseX - g.x) / cell);
        const r = Math.floor((mouseY - g.y) / cell);
        if (c >= 0 && c < GRID_N && r >= 0 && r < GRID_N) {
            const idx = r * GRID_N + c;
            selectedCell = (selectedCell === idx) ? -1 : idx;
        }
    }
}

// ---------- Field generation ----------
function recomputeField() {
    const cv = clusterSlider.value() / 100;     // 0..1
    const dv = -dispersionSlider.value() / 100; // 0..1 (positive when slider negative)
    const ov = outlierSlider.value();

    // Start from base field
    const n = GRID_N * GRID_N;
    let field = baseField.slice();

    // Step 1: apply clustering via spatial smoothing iterations
    // Number of smoothing passes scaled by cv
    const passes = Math.round(cv * 6);
    for (let p = 0; p < passes; p++) {
        const next = new Array(n);
        for (let i = 0; i < n; i++) {
            const ne = queenNeighbors(i);
            let sum = field[i];
            let cnt = 1;
            for (const j of ne) {
                sum += field[j];
                cnt++;
            }
            // Blend with original via cv strength
            const smoothed = sum / cnt;
            next[i] = (1 - cv) * field[i] + cv * smoothed;
        }
        field = next;
    }

    // Renormalize after smoothing to keep full color range
    field = renormalize(field);

    // Step 2: apply dispersion (checkerboard pattern)
    if (dv > 0) {
        for (let i = 0; i < n; i++) {
            const r = Math.floor(i / GRID_N);
            const c = i % GRID_N;
            const checker = ((r + c) % 2 === 0) ? 1.0 : 0.0;
            field[i] = (1 - dv) * field[i] + dv * checker;
        }
    }

    // Step 3: outlier injection
    // Pick ov cells with low neighborhood mean, force their value high
    if (ov > 0) {
        // Compute current neighbor means
        const candidates = [];
        for (let i = 0; i < n; i++) {
            const ne = queenNeighbors(i);
            let m = 0;
            for (const j of ne) m += field[j];
            m = ne.length > 0 ? m / ne.length : 0;
            candidates.push({ idx: i, neighMean: m });
        }
        // Sort by lowest neighbor mean (so outliers land in low areas)
        candidates.sort((a, b) => a.neighMean - b.neighMean);
        // Spread out outliers a bit by skipping every 7th
        const used = new Set();
        let placed = 0;
        let pos = 0;
        while (placed < ov && pos < candidates.length) {
            const c = candidates[pos].idx;
            // Avoid placing adjacent outliers
            const neigh = queenNeighbors(c);
            let conflict = false;
            for (const nb of neigh) if (used.has(nb)) { conflict = true; break; }
            if (!used.has(c) && !conflict) {
                field[c] = 1.0;
                used.add(c);
                placed++;
            }
            pos++;
        }
    }

    values = field;
    moransI = computeMoransI(values);
}

function renormalize(field) {
    let mn = Infinity, mx = -Infinity;
    for (const v of field) {
        if (v < mn) mn = v;
        if (v > mx) mx = v;
    }
    const range = (mx - mn) || 1;
    return field.map(v => (v - mn) / range);
}

// ---------- Moran's I computation ----------
function computeMoransI(x) {
    const n = x.length;
    let mean = 0;
    for (let i = 0; i < n; i++) mean += x[i];
    mean /= n;

    let numer = 0;
    let denom = 0;
    let W = 0;
    for (let i = 0; i < n; i++) {
        const di = x[i] - mean;
        denom += di * di;
        const row = weights[i];
        for (let j = 0; j < n; j++) {
            if (row[j] > 0) {
                const dj = x[j] - mean;
                numer += row[j] * di * dj;
                W += row[j];
            }
        }
    }
    if (denom === 0 || W === 0) return 0;
    return (n / W) * (numer / denom);
}

function buildWeightsMatrix() {
    const n = GRID_N * GRID_N;
    weights = [];
    for (let i = 0; i < n; i++) {
        const row = new Array(n).fill(0);
        const ne = queenNeighbors(i);
        if (ne.length > 0) {
            const w = 1 / ne.length; // row-standardized
            for (const j of ne) row[j] = w;
        }
        weights.push(row);
    }
}

function queenNeighbors(idx) {
    const r = Math.floor(idx / GRID_N);
    const c = idx % GRID_N;
    const out = [];
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < GRID_N && nc >= 0 && nc < GRID_N) {
                out.push(nr * GRID_N + nc);
            }
        }
    }
    return out;
}

// ---------- Helpers ----------
function rampColor(v) {
    // v in [0,1] -> one of 5 buckets
    const bucket = Math.min(RAMP.length - 1, Math.max(0, Math.floor(v * RAMP.length)));
    return RAMP[bucket];
}

function moransIColor(i) {
    if (i > 0.2) return '#1a9850';   // strong positive = green
    if (i > -0.1) return '#1a3a6c';  // around 0 = neutral blue
    return '#c0392b';                 // negative = red
}

function interpretMoransI(i) {
    if (i > 0.5) return 'Strong positive: high values cluster with high';
    if (i > 0.2) return 'Moderate clustering';
    if (i > -0.1) return 'Approximately random spatial pattern';
    if (i > -0.4) return 'Moderate spatial dispersion';
    return 'Strong negative: checkerboard pattern';
}

// ---------- Resize ----------
function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
