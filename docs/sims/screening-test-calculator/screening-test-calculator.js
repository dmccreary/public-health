// Screening Test Performance Calculator
// CANVAS_HEIGHT: 620
let canvasWidth = 800;
let drawHeight = 440;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let sensSlider, specSlider, prevSlider, popSlider, resetButton;

const COL_TP = '#2ecc71';
const COL_FP = '#e67e22';
const COL_FN = '#e74c3c';
const COL_TN = '#3498db';
const TITLE_BLUE = '#1a3a6c';
const TEXT_DARK = '#212529';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const baseY = drawHeight + 14;
    sensSlider = createSlider(0.50, 0.99, 0.90, 0.01);
    sensSlider.position(160, baseY);
    sensSlider.size(180);
    specSlider = createSlider(0.50, 0.99, 0.90, 0.01);
    specSlider.position(160, baseY + 30);
    specSlider.size(180);
    prevSlider = createSlider(0.001, 0.50, 0.05, 0.001);
    prevSlider.position(160, baseY + 60);
    prevSlider.size(180);
    popSlider = createSlider(1000, 100000, 10000, 1000);
    popSlider.position(160, baseY + 90);
    popSlider.size(180);

    resetButton = createButton('Reset');
    resetButton.position(160, baseY + 120);
    resetButton.mousePressed(() => {
        sensSlider.value(0.90); specSlider.value(0.90);
        prevSlider.value(0.05); popSlider.value(10000);
    });
}

function draw() {
    background(255);

    fill(TITLE_BLUE); noStroke();
    textSize(16); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Screening Test Performance Calculator', containerWidth / 2, 8);
    textStyle(NORMAL);

    const sens = sensSlider.value();
    const spec = specSlider.value();
    const prev = prevSlider.value();
    const N = popSlider.value();

    const D = N * prev;            // diseased
    const ND = N - D;              // non-diseased
    const TP = D * sens;
    const FN = D * (1 - sens);
    const TN = ND * spec;
    const FP = ND * (1 - spec);

    const ppv = (TP + FP) > 0 ? TP / (TP + FP) : 0;
    const npv = (TN + FN) > 0 ? TN / (TN + FN) : 0;

    // Layout: left 50% 2x2 table, right 50% metrics
    const tableX = 80;
    const tableY = 50;
    const tableW = containerWidth * 0.48 - 90;
    const tableH = drawHeight - tableY - 20;
    const metricsX = containerWidth * 0.48 + 10;
    const metricsW = containerWidth - metricsX - 14;

    // Compute column widths from totals (P=positive test, N=negative test)
    const colP = TP + FP;
    const colN = TN + FN;
    const total = N;
    const colPW = (colP / total) * tableW;
    const colNW = (colN / total) * tableW;

    // Row heights from disease totals
    const rowDW = (D / total) * tableH;
    const rowNDW = (ND / total) * tableH;

    // Headers
    fill(TEXT_DARK); textSize(12); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text('Test +', tableX + colPW / 2, tableY - 4);
    text('Test −', tableX + colPW + colNW / 2, tableY - 4);
    textAlign(RIGHT, CENTER);
    text('Disease +', tableX - 6, tableY + rowDW / 2);
    text('Disease −', tableX - 6, tableY + rowDW + rowNDW / 2);
    textStyle(NORMAL);

    // Draw 2x2 boxes
    drawCell(tableX, tableY, colPW, rowDW, COL_TP, 'TP', Math.round(TP));
    drawCell(tableX + colPW, tableY, colNW, rowDW, COL_FN, 'FN', Math.round(FN));
    drawCell(tableX, tableY + rowDW, colPW, rowNDW, COL_FP, 'FP', Math.round(FP));
    drawCell(tableX + colPW, tableY + rowDW, colNW, rowNDW, COL_TN, 'TN', Math.round(TN));

    // Border around full table
    noFill(); stroke(120); strokeWeight(1.5);
    rect(tableX, tableY, tableW, tableH);
    strokeWeight(1);
    noStroke();

    // Caption
    fill(TEXT_DARK); textSize(11); textAlign(CENTER, TOP);
    text('Box area is proportional to count. N = ' + N.toLocaleString(),
         tableX + tableW / 2, tableY + tableH + 6);

    // Right metrics panel
    fill(245, 248, 252); noStroke();
    rect(metricsX, tableY, metricsW, tableH, 6);

    let ry = tableY + 10;
    fill(TITLE_BLUE); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Performance Metrics', metricsX + 10, ry); ry += 22;
    textStyle(NORMAL); fill(TEXT_DARK); textSize(12);

    text('Sensitivity = TP / (TP + FN)', metricsX + 10, ry); ry += 14;
    text('  = ' + Math.round(TP) + ' / ' + Math.round(TP + FN) +
         ' = ' + nf(sens, 0, 3), metricsX + 10, ry); ry += 22;

    text('Specificity = TN / (TN + FP)', metricsX + 10, ry); ry += 14;
    text('  = ' + Math.round(TN) + ' / ' + Math.round(TN + FP) +
         ' = ' + nf(spec, 0, 3), metricsX + 10, ry); ry += 22;

    text('PPV = TP / (TP + FP)', metricsX + 10, ry); ry += 14;
    text('  = ' + Math.round(TP) + ' / ' + Math.round(TP + FP) +
         ' = ' + nf(ppv, 0, 3), metricsX + 10, ry); ry += 22;

    text('NPV = TN / (TN + FN)', metricsX + 10, ry); ry += 14;
    text('  = ' + Math.round(TN) + ' / ' + Math.round(TN + FN) +
         ' = ' + nf(npv, 0, 3), metricsX + 10, ry); ry += 24;

    // Interpretation
    fill(TITLE_BLUE); textStyle(BOLD); textSize(12);
    text('Interpretation', metricsX + 10, ry); ry += 18;
    textStyle(NORMAL); fill(TEXT_DARK); textSize(11);
    const oneInX = ppv > 0 ? 1 / ppv : 0;
    text('At prevalence ' + nf(prev * 100, 0, 2) + '%:', metricsX + 10, ry); ry += 14;
    text('1 in ' + nf(oneInX, 0, 1) + ' positive tests is a true case.',
         metricsX + 10, ry); ry += 14;
    if (prev < 0.02) {
        fill(COL_FN); textStyle(BOLD);
        text('⚠ Low-prevalence pitfall: PPV drops sharply', metricsX + 10, ry); ry += 12;
        text('   even with high sensitivity & specificity.', metricsX + 10, ry);
        textStyle(NORMAL);
    }

    // Control panel background
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    fill(TEXT_DARK); textSize(12); textAlign(LEFT, CENTER);
    const baseY = drawHeight + 14;
    text('Sensitivity:', 14, baseY + 8);
    text(nf(sens, 0, 3), 350, baseY + 8);
    text('Specificity:', 14, baseY + 38);
    text(nf(spec, 0, 3), 350, baseY + 38);
    text('Prevalence:', 14, baseY + 68);
    text(nf(prev * 100, 0, 2) + '%', 350, baseY + 68);
    text('Population N:', 14, baseY + 98);
    text(N.toLocaleString(), 350, baseY + 98);

    // Right caption
    fill(TITLE_BLUE); textSize(11); textAlign(LEFT, TOP);
    const capX = 430; let capY = baseY;
    text('Try this:', capX, capY); capY += 16;
    text('• Drag Prevalence to 1% — watch PPV plunge.', capX, capY); capY += 14;
    text('• Sens & Spec stay the same — PPV depends on the population.', capX, capY); capY += 14;
    text('• Specificity dominates PPV when disease is rare.', capX, capY); capY += 14;
    text('• Sensitivity dominates NPV when disease is common.', capX, capY); capY += 14;
    text('• N just rescales the counts, not the ratios.', capX, capY);
}

function drawCell(x, y, w, h, fillColor, label, count) {
    if (w < 1 || h < 1) {
        // still draw thin slice
        noStroke(); fill(fillColor);
        rect(x, y, Math.max(w, 1), Math.max(h, 1));
        return;
    }
    noStroke();
    // Lighter fill version
    const c = color(fillColor);
    c.setAlpha(180);
    fill(c);
    rect(x, y, w, h);
    stroke(255); strokeWeight(1);
    noFill();
    rect(x, y, w, h);
    noStroke();
    // Label
    const minDim = Math.min(w, h);
    if (minDim < 30) {
        // Skip label if too small
        return;
    }
    fill(255); textStyle(BOLD);
    const fs = Math.max(11, Math.min(18, minDim * 0.25));
    textSize(fs);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2 - fs * 0.6);
    textSize(Math.max(10, fs * 0.8));
    text(count.toLocaleString(), x + w / 2, y + h / 2 + fs * 0.4);
    textStyle(NORMAL);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
