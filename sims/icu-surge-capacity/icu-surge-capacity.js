// ICU Surge Capacity Model — Stock-and-Flow Simulation
// CANVAS_HEIGHT: 760
let canvasWidth = 820;
let drawHeight = 260;       // top stock-and-flow diagram
let controlHeight = 240;    // sliders, checkboxes, buttons
let graphHeight = 260;      // bottom time-series chart
let canvasHeight = drawHeight + controlHeight + graphHeight;
let containerWidth;
let containerHeight = canvasHeight;

// p5 controls
let admissionSlider, losSlider, baselineSlider;
let chkStepDown, chkRegional, chkField;
let resetBtn, pauseBtn;

// Simulation state
let day = 0;
const TOTAL_DAYS = 90;
let occupancy = 0;       // current ICU bed occupancy
let timeSeries = [];     // array of {day, occ, cap}
let totalAdmitted = 0;
let daysAboveCapacity = 0;
let peakOcc = 0;
let running = true;
let finished = false;
let crisisFlash = 0;     // counter for flashing banner

// Animation pacing — "day" advances on a tick
let framesPerDay = 6;    // 60 fps / 6 = 10 days per second
let tickCounter = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    let cy = drawHeight + 14;
    let xs = 20;

    // ---- Sliders (left column) ----
    createSpan('Admission Rate (patients/day):').position(xs, cy).style('font-size', '12px').style('color', '#222');
    admissionSlider = createSlider(0, 50, 10, 1);
    admissionSlider.position(xs, cy + 18);
    admissionSlider.style('width', '230px');

    createSpan('Mean ICU Length of Stay (days):').position(xs, cy + 50).style('font-size', '12px').style('color', '#222');
    losSlider = createSlider(3, 21, 10, 1);
    losSlider.position(xs, cy + 68);
    losSlider.style('width', '230px');

    createSpan('Baseline ICU Beds:').position(xs, cy + 100).style('font-size', '12px').style('color', '#222');
    baselineSlider = createSlider(50, 500, 200, 10);
    baselineSlider.position(xs, cy + 118);
    baselineSlider.style('width', '230px');

    // ---- Surge checkboxes (middle column) ----
    let xs2 = xs + 280;
    createSpan('Surge Capacity Options:').position(xs2, cy)
        .style('font-size', '12px').style('font-weight', 'bold').style('color', '#1a3a6c');

    chkStepDown = createCheckbox(' Convert step-down units (+40 beds)', false);
    chkStepDown.position(xs2, cy + 22);
    chkStepDown.style('font-size', '12px');

    chkRegional = createCheckbox(' Regional overflow site (+60 beds)', false);
    chkRegional.position(xs2, cy + 50);
    chkRegional.style('font-size', '12px');

    chkField = createCheckbox(' Field hospital (+100 beds)', false);
    chkField.position(xs2, cy + 78);
    chkField.style('font-size', '12px');

    // ---- Buttons (right column) ----
    let xs3 = xs + 580;
    pauseBtn = createButton('Pause');
    pauseBtn.position(xs3, cy + 22);
    pauseBtn.style('width', '110px');
    pauseBtn.mousePressed(() => {
        running = !running;
        pauseBtn.html(running ? 'Pause' : 'Resume');
    });

    resetBtn = createButton('Reset / Restart');
    resetBtn.position(xs3, cy + 60);
    resetBtn.style('width', '110px');
    resetBtn.mousePressed(resetSim);

    resetSim();
}

function totalCapacity() {
    let cap = baselineSlider.value();
    if (chkStepDown.checked()) cap += 40;
    if (chkRegional.checked()) cap += 60;
    if (chkField.checked()) cap += 100;
    return cap;
}

function resetSim() {
    day = 0;
    occupancy = baselineSlider.value() * 0.4; // start at 40% occupancy
    timeSeries = [{day:0, occ:occupancy, cap:totalCapacity()}];
    totalAdmitted = 0;
    daysAboveCapacity = 0;
    peakOcc = occupancy;
    running = true;
    finished = false;
    crisisFlash = 0;
    if (pauseBtn) pauseBtn.html('Pause');
    tickCounter = 0;
}

function stepDay() {
    if (finished) return;
    const admit = admissionSlider.value();
    const los = losSlider.value();
    const cap = totalCapacity();

    // Discharges: current_occupancy / mean_los
    const discharges = occupancy / los;
    occupancy = occupancy + admit - discharges;
    if (occupancy < 0) occupancy = 0;

    totalAdmitted += admit;
    if (occupancy > peakOcc) peakOcc = occupancy;
    if (occupancy > cap) daysAboveCapacity += 1;

    day += 1;
    timeSeries.push({day, occ:occupancy, cap});

    if (day >= TOTAL_DAYS) {
        finished = true;
        running = false;
        if (pauseBtn) pauseBtn.html('Resume');
    }
}

function draw() {
    background(255);

    if (running) {
        tickCounter += 1;
        if (tickCounter >= framesPerDay) {
            tickCounter = 0;
            stepDay();
        }
    }

    // Title
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('ICU Surge Capacity Model', containerWidth / 2, 8);
    textStyle(NORMAL);

    drawStockFlowDiagram();
    drawControlsBackground();
    drawTimeSeriesChart();
    drawCrisisBannerIfNeeded();
    if (finished) drawSummaryOverlay();
}

function drawStockFlowDiagram() {
    const cap = totalCapacity();
    const occPct = (occupancy / cap) * 100;

    // Layout
    const topY = 34;
    const bottomY = drawHeight - 20;
    const boxX = containerWidth / 2 - 130;
    const boxW = 260;
    const boxY = topY + 8;
    const boxH = bottomY - boxY;

    // Tank outline
    stroke('#1a3a6c'); strokeWeight(2); noFill();
    rect(boxX, boxY, boxW, boxH, 6);

    // Fill level (clamp visual at 150% capacity for display)
    const visPct = Math.min(150, occPct);
    const fillFrac = visPct / 150;
    const fillH = boxH * fillFrac;
    noStroke();
    // Color by zone
    let fillCol = color('#27ae60'); // green
    if (occPct >= 100) fillCol = color('#e74c3c');
    else if (occPct >= 85) fillCol = color('#f39c12');
    fillCol.setAlpha(180);
    fill(fillCol);
    rect(boxX + 2, boxY + boxH - fillH + 1, boxW - 4, fillH - 2, 4);

    // Capacity line (100%)
    const yCap = boxY + boxH - boxH * (100/150);
    stroke('#e74c3c'); strokeWeight(2); drawingContext.setLineDash([6,4]);
    line(boxX - 8, yCap, boxX + boxW + 8, yCap);
    drawingContext.setLineDash([]);
    noStroke(); fill('#c0392b'); textSize(10); textStyle(BOLD);
    textAlign(LEFT, BOTTOM);
    text('CAPACITY BREACHED (' + cap + ' beds)', boxX + boxW + 12, yCap + 3);
    textStyle(NORMAL);

    // Crisis Standard line (85%)
    const yCrisis = boxY + boxH - boxH * (85/150);
    stroke('#f39c12'); strokeWeight(2); drawingContext.setLineDash([4,3]);
    line(boxX - 8, yCrisis, boxX + boxW + 8, yCrisis);
    drawingContext.setLineDash([]);
    noStroke(); fill('#b9770e'); textSize(10);
    textAlign(LEFT, BOTTOM);
    text('Crisis Standard of Care (85%)', boxX + boxW + 12, yCrisis + 3);

    // Stock label
    noStroke(); fill('#1a3a6c');
    textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
    text('ICU Bed Occupancy', boxX + boxW/2, boxY + 6);
    textStyle(NORMAL); textSize(22);
    fill(occPct >= 100 ? '#c0392b' : occPct >= 85 ? '#b9770e' : '#1a3a6c');
    text(nf(occupancy, 0, 0) + ' / ' + cap, boxX + boxW/2, boxY + boxH/2 - 14);
    textSize(13);
    text(nf(occPct, 0, 1) + '% capacity', boxX + boxW/2, boxY + boxH/2 + 14);

    // Inflow arrow (left, green)
    const yIn = boxY + boxH * 0.35;
    stroke('#27ae60'); strokeWeight(3); noFill();
    line(boxX - 90, yIn, boxX - 6, yIn);
    fill('#27ae60');
    triangle(boxX - 6, yIn - 7, boxX - 6, yIn + 7, boxX + 4, yIn);
    noStroke(); fill('#1e7e34');
    textSize(11); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text('Admissions', boxX - 48, yIn - 6);
    textStyle(NORMAL); textSize(10);
    textAlign(CENTER, TOP);
    text(admissionSlider.value() + '/day', boxX - 48, yIn + 4);

    // Outflow arrow (right, red)
    const yOut = boxY + boxH * 0.65;
    stroke('#e74c3c'); strokeWeight(3); noFill();
    line(boxX + boxW + 6, yOut, boxX + boxW + 90, yOut);
    fill('#e74c3c');
    triangle(boxX + boxW + 90, yOut - 7, boxX + boxW + 90, yOut + 7, boxX + boxW + 100, yOut);
    const dischargesPerDay = occupancy / losSlider.value();
    noStroke(); fill('#a93226');
    textSize(11); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text('Discharges + Deaths', boxX + boxW + 48, yOut - 6);
    textStyle(NORMAL); textSize(10);
    textAlign(CENTER, TOP);
    text(nf(dischargesPerDay, 0, 1) + '/day', boxX + boxW + 48, yOut + 4);

    // Day counter
    noStroke(); fill('#555');
    textSize(11); textAlign(LEFT, TOP);
    text('Day: ' + day + ' / ' + TOTAL_DAYS, 12, 12);
    text('Peak: ' + nf(peakOcc, 0, 0) + ' beds', 12, 28);
    text('Days over capacity: ' + daysAboveCapacity, 12, 44);
}

function drawControlsBackground() {
    fill('#f7f9fc'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke('#ddd'); strokeWeight(1);
    line(0, drawHeight, containerWidth, drawHeight);
    line(0, drawHeight + controlHeight, containerWidth, drawHeight + controlHeight);
    noStroke();

    // Slider value readouts
    fill('#333'); textSize(11); textAlign(LEFT, TOP);
    text('= ' + admissionSlider.value(),          260, drawHeight + 32);
    text('= ' + losSlider.value() + ' days',      260, drawHeight + 82);
    text('= ' + baselineSlider.value() + ' beds', 260, drawHeight + 132);

    // Section label
    fill('#1a3a6c'); textSize(12); textStyle(BOLD);
    text('Controls', 12, drawHeight + 8);
    textStyle(NORMAL);
}

function drawTimeSeriesChart() {
    const px = 60;
    const py = drawHeight + controlHeight + 30;
    const pw = containerWidth - px - 30;
    const ph = graphHeight - 50;

    // Title
    noStroke(); fill('#1a3a6c'); textSize(13); textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('ICU Occupancy Over 90 Days', px, drawHeight + controlHeight + 8);
    textStyle(NORMAL);

    // Y-axis: 0 to 150% of baseline (we'll scale relative to current total capacity)
    const cap = totalCapacity();
    const yMax = cap * 1.5;

    // Background bands: green (<85%), yellow (85-100%), red (>100%)
    const yFor = v => py + ph - (v / yMax) * ph;
    noStroke();
    fill(39, 174, 96, 40);   // green
    rect(px, yFor(cap * 0.85), pw, yFor(0) - yFor(cap * 0.85));
    fill(243, 156, 18, 50);  // yellow
    rect(px, yFor(cap), pw, yFor(cap * 0.85) - yFor(cap));
    fill(231, 76, 60, 50);   // red
    rect(px, py, pw, yFor(cap) - py);

    // Axes
    stroke('#888'); strokeWeight(1);
    line(px, py, px, py + ph);            // y-axis
    line(px, py + ph, px + pw, py + ph);  // x-axis

    // Y ticks (0, 50%, 85%, 100%, 125%, 150%)
    const yTicks = [0, 0.5, 0.85, 1.0, 1.25, 1.5];
    noStroke(); fill('#555'); textSize(10);
    for (const t of yTicks) {
        const v = cap * t;
        const yy = yFor(v);
        stroke('#bbb'); strokeWeight(1);
        line(px - 4, yy, px + pw, yy);
        noStroke(); fill('#555');
        textAlign(RIGHT, CENTER);
        text(nf(t * 100, 0, 0) + '%', px - 6, yy);
    }
    // X ticks every 15 days
    textAlign(CENTER, TOP);
    for (let d = 0; d <= TOTAL_DAYS; d += 15) {
        const xx = px + (d / TOTAL_DAYS) * pw;
        stroke('#bbb'); strokeWeight(1);
        line(xx, py + ph, xx, py + ph + 4);
        noStroke(); fill('#555');
        text(d, xx, py + ph + 6);
    }
    fill('#555'); textAlign(CENTER, TOP);
    text('Day', px + pw / 2, py + ph + 22);

    // Capacity dashed line (100%)
    stroke('#e74c3c'); strokeWeight(1.5);
    drawingContext.setLineDash([5,4]);
    line(px, yFor(cap), px + pw, yFor(cap));
    drawingContext.setLineDash([]);

    // Plot series
    if (timeSeries.length >= 2) {
        stroke('#1a3a6c'); strokeWeight(2.5); noFill();
        beginShape();
        for (const pt of timeSeries) {
            const x = px + (pt.day / TOTAL_DAYS) * pw;
            const y = yFor(pt.occ);
            vertex(x, y);
        }
        endShape();
    }

    // Current day marker
    if (day > 0) {
        const xCur = px + (day / TOTAL_DAYS) * pw;
        stroke('#555'); strokeWeight(1);
        drawingContext.setLineDash([3,3]);
        line(xCur, py, xCur, py + ph);
        drawingContext.setLineDash([]);
    }

    // Legend
    noStroke();
    fill('#1a3a6c'); rect(px + pw - 130, py + 6, 14, 3);
    fill('#333'); textSize(11); textAlign(LEFT, CENTER);
    text('ICU occupancy', px + pw - 112, py + 8);
    stroke('#e74c3c'); strokeWeight(1.5);
    drawingContext.setLineDash([4,3]);
    line(px + pw - 130, py + 22, px + pw - 116, py + 22);
    drawingContext.setLineDash([]);
    noStroke(); fill('#333');
    text('100% capacity', px + pw - 112, py + 22);
}

function drawCrisisBannerIfNeeded() {
    const cap = totalCapacity();
    if (occupancy > cap && !finished) {
        crisisFlash = (crisisFlash + 1) % 60;
        const alpha = 150 + 100 * Math.sin(crisisFlash * 0.2);
        fill(231, 76, 60, alpha);
        noStroke();
        rect(containerWidth / 2 - 180, 32, 360, 22, 4);
        fill(255); textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
        text('CRISIS STANDARDS ACTIVATED', containerWidth / 2, 43);
        textStyle(NORMAL);
    }
}

function drawSummaryOverlay() {
    const cap = totalCapacity();
    const peakPct = (peakOcc / cap) * 100;

    // Translucent overlay across the time-series chart area
    const px = 60;
    const py = drawHeight + controlHeight + 30;
    const pw = containerWidth - px - 30;
    const ph = graphHeight - 50;

    fill(255, 255, 255, 230); stroke('#1a3a6c'); strokeWeight(2);
    rect(px + pw / 2 - 150, py + 30, 300, 130, 8);
    noStroke();
    fill('#1a3a6c'); textSize(13); textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Simulation Complete — Day 90', px + pw / 2, py + 38);
    textStyle(NORMAL); textSize(12);
    fill('#333'); textAlign(LEFT, TOP);
    const lx = px + pw / 2 - 130;
    let ly = py + 64;
    text('Peak occupancy:  ' + nf(peakOcc, 0, 0) + ' beds (' + nf(peakPct, 0, 1) + '%)', lx, ly); ly += 18;
    text('Days above capacity:  ' + daysAboveCapacity, lx, ly); ly += 18;
    text('Total patients admitted:  ' + nf(totalAdmitted, 0, 0), lx, ly); ly += 18;
    text('Total surge capacity:  ' + cap + ' beds', lx, ly);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
