// Missing Data Mechanisms Visualizer
// CANVAS_HEIGHT: 530
let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Dataset dimensions
const N_ROWS = 20;
const N_COLS = 10;

// Variable names for column headers
const VAR_NAMES = ['ID', 'Age', 'Sex', 'BMI', 'BP', 'Income', 'Smoke', 'Alcohol', 'Diet', 'Exercise'];

// Color palette
const COLOR_OBSERVED = '#a9cce3';     // light blue — observed
const COLOR_MISSING  = '#4a4a4a';     // dark gray — missing
const COLOR_TRIGGER  = '#f5b041';     // orange — the variable that drives MAR
const COLOR_HIGHLIGHT = '#e74c3c';    // red border — selected cell
const TITLE_BLUE = '#1a3a6c';
const PANEL_BG  = '#f4f7fb';
const PANEL_BORDER = '#1a3a6c';
const HEADER_BG = '#e8eef7';
const TEXT_DARK = '#212529';
const TEXT_MUTE = '#5a6470';

// Mechanism state
let mechanism = 'MCAR';
let dataset = []; // dataset[r][c] = {observed:bool, value:number}
let mcarBtn, marBtn, mnarBtn, resetBtn;
let selected = null; // {r,c}

// Layout
const TITLE_H = 24;
const HEADER_H = 22;
let gridLeft = 14;
let gridTop  = TITLE_H + HEADER_H + 8;
let gridW, gridH, cellW, cellH;
let panelLeft, panelTop, panelW, panelH;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    computeLayout();
    generateDataset();
    applyMechanism();

    // Control row positions
    const baseY = drawHeight + 12;
    mcarBtn = createButton('MCAR');
    mcarBtn.position(14, baseY);
    mcarBtn.size(70, 28);
    mcarBtn.mousePressed(() => setMechanism('MCAR'));

    marBtn = createButton('MAR');
    marBtn.position(92, baseY);
    marBtn.size(70, 28);
    marBtn.mousePressed(() => setMechanism('MAR'));

    mnarBtn = createButton('MNAR');
    mnarBtn.position(170, baseY);
    mnarBtn.size(70, 28);
    mnarBtn.mousePressed(() => setMechanism('MNAR'));

    resetBtn = createButton('New Dataset');
    resetBtn.position(258, baseY);
    resetBtn.size(110, 28);
    resetBtn.mousePressed(() => {
        generateDataset();
        applyMechanism();
        selected = null;
    });
}

function computeLayout() {
    // Grid takes left ~60%, panel right ~40%
    const gutter = 12;
    const totalW = containerWidth - 28; // 14px margins each side
    gridW = Math.floor(totalW * 0.58);
    panelW = totalW - gridW - gutter;
    gridLeft = 14;
    gridTop = TITLE_H + HEADER_H + 6;
    gridH = drawHeight - gridTop - 22; // leave space for bottom legend label
    cellW = gridW / N_COLS;
    cellH = gridH / N_ROWS;

    panelLeft = gridLeft + gridW + gutter;
    panelTop = TITLE_H + 4;
    panelH = drawHeight - panelTop - 8;
}

function generateDataset() {
    dataset = [];
    for (let r = 0; r < N_ROWS; r++) {
        const row = [];
        // Each row: simulate values for variables we use to drive mechanisms
        // c=1 Age 20..90; c=5 Income 0..1 normalized; c=7 Alcohol 0..1 normalized
        const age = 20 + Math.floor(Math.random() * 71);   // 20..90
        const incomeNorm = Math.random();                  // 0..1
        const alcoholNorm = Math.random();                 // 0..1
        for (let c = 0; c < N_COLS; c++) {
            let v;
            if      (c === 1) v = age;
            else if (c === 5) v = incomeNorm;
            else if (c === 7) v = alcoholNorm;
            else              v = Math.random();
            row.push({ observed: true, value: v });
        }
        row._meta = { age, incomeNorm, alcoholNorm };
        dataset.push(row);
    }
}

function applyMechanism() {
    // Reset all to observed
    for (let r = 0; r < N_ROWS; r++) {
        for (let c = 0; c < N_COLS; c++) {
            dataset[r][c].observed = true;
        }
    }
    if (mechanism === 'MCAR') {
        // Uniform random missingness ~15%
        for (let r = 0; r < N_ROWS; r++) {
            for (let c = 0; c < N_COLS; c++) {
                if (Math.random() < 0.15) dataset[r][c].observed = false;
            }
        }
    } else if (mechanism === 'MAR') {
        // Income (c=5) missing when Age (c=1) > 65
        // plus light background MCAR noise on other columns
        for (let r = 0; r < N_ROWS; r++) {
            const age = dataset[r]._meta.age;
            if (age > 65) {
                if (Math.random() < 0.80) dataset[r][5].observed = false;
            } else {
                if (Math.random() < 0.05) dataset[r][5].observed = false;
            }
            // Small background noise elsewhere
            for (let c = 0; c < N_COLS; c++) {
                if (c === 5) continue;
                if (Math.random() < 0.04) dataset[r][c].observed = false;
            }
        }
    } else if (mechanism === 'MNAR') {
        // Alcohol (c=7) missing in the highest-value rows of Alcohol itself
        for (let r = 0; r < N_ROWS; r++) {
            const a = dataset[r]._meta.alcoholNorm;
            // Probability of missing rises sharply with the value
            const pMiss = Math.max(0, (a - 0.55)) * 1.8;
            if (Math.random() < pMiss) dataset[r][7].observed = false;
            // Background noise
            for (let c = 0; c < N_COLS; c++) {
                if (c === 7) continue;
                if (Math.random() < 0.04) dataset[r][c].observed = false;
            }
        }
    }
}

function setMechanism(m) {
    if (mechanism === m) return;
    mechanism = m;
    applyMechanism();
    selected = null;
}

function draw() {
    background(255);

    // --- Title ---
    noStroke();
    fill(TITLE_BLUE);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(14);
    text('Missing Data Mechanisms: ' + mechanism, containerWidth / 2, 5);
    textStyle(NORMAL);

    // --- Column headers ---
    drawColumnHeaders();

    // --- Grid ---
    drawGrid();

    // --- Right info panel ---
    drawPanel();

    // --- Controls background ---
    drawControlsArea();

    // --- Legend (bottom of drawing area) ---
    drawLegend();
}

function drawColumnHeaders() {
    textAlign(CENTER, CENTER);
    textSize(10);
    for (let c = 0; c < N_COLS; c++) {
        const x = gridLeft + c * cellW;
        const isTrigger = (mechanism === 'MAR' && c === 1); // Age drives MAR
        if (isTrigger) {
            noStroke();
            fill(COLOR_TRIGGER);
            rect(x, gridTop - HEADER_H, cellW, HEADER_H);
            fill('#3a2a00');
            textStyle(BOLD);
            text(VAR_NAMES[c], x + cellW / 2, gridTop - HEADER_H / 2);
            textStyle(NORMAL);
        } else {
            noStroke();
            fill(HEADER_BG);
            rect(x, gridTop - HEADER_H, cellW, HEADER_H);
            fill(TEXT_DARK);
            text(VAR_NAMES[c], x + cellW / 2, gridTop - HEADER_H / 2);
        }
    }
    // Header border
    stroke(180);
    noFill();
    rect(gridLeft, gridTop - HEADER_H, gridW, HEADER_H);
}

function drawGrid() {
    // Cells
    for (let r = 0; r < N_ROWS; r++) {
        for (let c = 0; c < N_COLS; c++) {
            const x = gridLeft + c * cellW;
            const y = gridTop + r * cellH;
            const cell = dataset[r][c];
            if (cell.observed) {
                fill(COLOR_OBSERVED);
            } else {
                fill(COLOR_MISSING);
            }
            stroke(255);
            strokeWeight(1);
            rect(x, y, cellW, cellH);
        }
    }
    // Outer border
    noFill();
    stroke(180);
    strokeWeight(1);
    rect(gridLeft, gridTop, gridW, gridH);

    // Selected-cell highlight
    if (selected) {
        const x = gridLeft + selected.c * cellW;
        const y = gridTop + selected.r * cellH;
        noFill();
        stroke(COLOR_HIGHLIGHT);
        strokeWeight(2);
        rect(x + 1, y + 1, cellW - 2, cellH - 2);
    }
    strokeWeight(1);
}

function drawLegend() {
    const y = gridTop + gridH + 6;
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);

    // Observed swatch
    fill(COLOR_OBSERVED);
    rect(gridLeft, y, 14, 12);
    fill(TEXT_DARK);
    text('observed', gridLeft + 18, y + 6);

    // Missing swatch
    fill(COLOR_MISSING);
    rect(gridLeft + 90, y, 14, 12);
    fill(TEXT_DARK);
    text('missing', gridLeft + 108, y + 6);

    // Trigger swatch (only meaningful for MAR)
    if (mechanism === 'MAR') {
        fill(COLOR_TRIGGER);
        rect(gridLeft + 165, y, 14, 12);
        fill(TEXT_DARK);
        text('drives missingness (Age)', gridLeft + 183, y + 6);
    }
}

function drawPanel() {
    // Panel background
    noStroke();
    fill(PANEL_BG);
    rect(panelLeft, panelTop, panelW, panelH);
    // Left accent bar
    fill(PANEL_BORDER);
    rect(panelLeft, panelTop, 3, panelH);

    // Panel content
    fill(TITLE_BLUE);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    const tx = panelLeft + 10;
    let ty = panelTop + 8;
    text(mechanismTitle(mechanism), tx, ty);
    textStyle(NORMAL);
    ty += 18;

    fill(TEXT_DARK);
    textSize(11);
    const body = selected
        ? cellExplanation(selected.r, selected.c)
        : mechanismOverview(mechanism);

    drawWrappedText(body, tx, ty, panelW - 20, 14);

    // Footer hint
    fill(TEXT_MUTE);
    textSize(10);
    textAlign(LEFT, BOTTOM);
    const hint = selected
        ? 'Click another gray cell, or pick a mechanism.'
        : 'Click any gray (missing) cell to inspect it.';
    text(hint, tx, panelTop + panelH - 6);
    textAlign(LEFT, TOP);
}

function drawWrappedText(str, x, y, maxW, lineH) {
    const paragraphs = str.split('\n');
    let cy = y;
    for (const para of paragraphs) {
        const words = para.split(' ');
        let line = '';
        for (const w of words) {
            const test = line.length ? line + ' ' + w : w;
            if (textWidth(test) > maxW && line.length) {
                text(line, x, cy);
                cy += lineH;
                line = w;
            } else {
                line = test;
            }
        }
        if (line.length) {
            text(line, x, cy);
            cy += lineH;
        }
        cy += 2; // paragraph gap
    }
}

function drawControlsArea() {
    // Light divider above controls
    stroke(220);
    line(0, drawHeight, containerWidth, drawHeight);
    noStroke();
    fill('#fafbfc');
    rect(0, drawHeight, containerWidth, controlHeight);

    // Active-button highlight ring
    highlightActiveButton();

    // Mechanism summary label to the right of the buttons
    fill(TEXT_MUTE);
    textAlign(LEFT, CENTER);
    textSize(11);
    text(mechanismShortDescription(mechanism), 14, drawHeight + 52);
}

function highlightActiveButton() {
    // Draw a colored bar under the active mechanism button
    const baseY = drawHeight + 12 + 28 + 2;
    const map = { MCAR: [14, 70], MAR: [92, 70], MNAR: [170, 70] };
    const active = map[mechanism];
    if (!active) return;
    fill(TITLE_BLUE);
    noStroke();
    rect(active[0], baseY, active[1], 3);
}

function mouseClicked() {
    // Inside grid?
    if (mouseX < gridLeft || mouseX > gridLeft + gridW) return;
    if (mouseY < gridTop  || mouseY > gridTop  + gridH) return;
    const c = Math.floor((mouseX - gridLeft) / cellW);
    const r = Math.floor((mouseY - gridTop)  / cellH);
    if (r < 0 || r >= N_ROWS || c < 0 || c >= N_COLS) return;
    // Only react to MISSING cells
    if (dataset[r][c].observed) {
        selected = null;
    } else {
        selected = { r, c };
    }
}

// --- Explanatory text generators ---

function mechanismTitle(m) {
    if (m === 'MCAR') return 'MCAR — Missing Completely At Random';
    if (m === 'MAR')  return 'MAR — Missing At Random';
    return 'MNAR — Missing Not At Random';
}

function mechanismShortDescription(m) {
    if (m === 'MCAR') return 'Missingness is independent of all values, observed or unobserved.';
    if (m === 'MAR')  return 'Missingness depends on OBSERVED variables (e.g., Income missing when Age > 65).';
    return 'Missingness depends on the UNOBSERVED value itself (e.g., heavy drinkers omit Alcohol).';
}

function mechanismOverview(m) {
    if (m === 'MCAR') {
        return 'Every cell has the same probability of being missing, regardless of any value in the dataset.\n' +
               'Complete-case analysis is UNBIASED but loses precision.\n' +
               'Safe to drop incomplete rows, though imputation recovers efficiency.';
    }
    if (m === 'MAR') {
        return 'Missingness in Income depends on Age (an OBSERVED column, highlighted in orange).\n' +
               'Complete-case analysis is BIASED because rows with older ages are systematically dropped.\n' +
               'Recommended: multiple imputation using Age and other observed covariates.';
    }
    return 'Missingness in Alcohol depends on the Alcohol value itself — the heaviest drinkers refuse to answer.\n' +
           'Complete-case analysis is BIASED and imputation alone cannot fix it.\n' +
           'Recommended: sensitivity analysis (pattern-mixture or selection models) and transparent reporting.';
}

function cellExplanation(r, c) {
    const meta = dataset[r]._meta;
    if (mechanism === 'MCAR') {
        return 'Cell at row ' + (r + 1) + ', column "' + VAR_NAMES[c] + '" is missing.\n' +
               'Under MCAR, it was dropped purely by chance — independent of any value in the data.\n' +
               'No bias is introduced. Complete-case analysis is valid (just less precise).';
    }
    if (mechanism === 'MAR') {
        if (c === 5) {
            return 'Cell at row ' + (r + 1) + ', column "Income" is missing.\n' +
                   'Row Age = ' + meta.age + '. Under MAR in this demo, Income is much more likely to be missing when Age > 65 — older respondents are less willing to disclose income.\n' +
                   'Missingness depends on the OBSERVED Age column, not on Income itself.\n' +
                   'Multiple imputation conditioning on Age recovers an unbiased estimate.';
        }
        return 'Cell at row ' + (r + 1) + ', column "' + VAR_NAMES[c] + '" is missing.\n' +
               'This cell is background MCAR noise in the demo. The MAR pattern is concentrated in the Income column (look for the orange-highlighted Age header that drives it).';
    }
    // MNAR
    if (c === 7) {
        const rank = (meta.alcoholNorm * 100).toFixed(0);
        return 'Cell at row ' + (r + 1) + ', column "Alcohol" is missing.\n' +
               'True (unobserved) Alcohol value was in the ' + rank + 'th percentile of consumption.\n' +
               'Under MNAR, heavy drinkers refuse to disclose, so missingness depends on the value YOU CANNOT SEE.\n' +
               'Imputation from observed covariates cannot fully correct this — use sensitivity analysis.';
    }
    return 'Cell at row ' + (r + 1) + ', column "' + VAR_NAMES[c] + '" is missing.\n' +
           'This cell is background MCAR noise in the demo. The MNAR pattern is concentrated in the Alcohol column — clicking a gray cell there explains the mechanism in detail.';
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    computeLayout();
}
