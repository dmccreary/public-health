// DSHEA Regulatory Gap: Drugs vs. Supplements
// CANVAS_HEIGHT: 720
let canvasWidth = 820;
let drawHeight = 600;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Each step: label, sub (cost/time), required-for-supplement (bool)
let drugSteps = [
    { label: 'Preclinical Research',          sub: '3-6 yrs · ~$10M',  reqSupp: false,
      desc: 'Lab and animal studies test whether a candidate compound has a plausible mechanism and a safety margin. The FDA must accept an Investigational New Drug (IND) application before any human trial begins.' },
    { label: 'Phase I Safety Trial',          sub: '~1 yr · 20-100 subjects', reqSupp: false,
      desc: 'A small first-in-human study focused on safety, dosing, and pharmacokinetics. Identifies acute toxicity before larger exposures occur.' },
    { label: 'Phase II Efficacy Trial',       sub: '~2 yrs · 100-300 subjects', reqSupp: false,
      desc: 'Tests whether the drug actually works on the target condition and refines dosing. Detects common side effects.' },
    { label: 'Phase III Large-Scale Trial',   sub: '~3 yrs · 1,000-3,000 subjects', reqSupp: false,
      desc: 'Randomized, controlled, often multi-site studies confirm efficacy and detect uncommon adverse events. This is the evidence base for the approval decision.' },
    { label: 'FDA NDA Review',                sub: '~1-2 yrs',         reqSupp: false,
      desc: 'The FDA reviews the New Drug Application: full trial data, manufacturing, labeling. The agency can require additional studies before approval.' },
    { label: 'Approval & Marketing',          sub: 'Marketing begins',  reqSupp: true,
      desc: 'Only after FDA approval can the drug be marketed to U.S. consumers. The labeling is reviewed and restricted to approved indications.' },
    { label: 'Post-Market Surveillance',      sub: 'Ongoing (FAERS)',   reqSupp: true,
      desc: 'Adverse events are tracked via FAERS, mandatory manufacturer reporting, and Phase IV studies. Drugs can be withdrawn if new risks emerge.' }
];

let suppSteps = [
    { label: 'Formulate Product',             sub: 'Days to weeks',    drugEquiv: 'Preclinical Research',
      desc: 'Manufacturer chooses ingredients and dosages. No FDA review of formulation or animal/lab safety data is required.' },
    { label: 'Self-Certify Safety',           sub: 'Internal',         drugEquiv: 'Phase I-III Trials',
      desc: 'Under DSHEA the manufacturer affirms its own product is safe. No clinical trial data must be submitted to FDA before sale.' },
    { label: '75-Day NDI Notification',       sub: 'Only if new ingredient', drugEquiv: 'NDA Review',
      desc: 'For ingredients not marketed before 1994, the firm notifies FDA 75 days before sale. FDA cannot block sale unless it can prove harm — and ingredients already on the market are exempt.' },
    { label: 'Market Product',                sub: 'Immediate',         drugEquiv: 'Approval',
      desc: 'The supplement can be sold to U.S. consumers without any pre-market FDA approval of safety or efficacy.' },
    { label: 'Post-Market Complaints',        sub: 'FDA reacts to harm','drugEquiv': 'Post-Market Surveillance',
      desc: 'FDA can act only after evidence of harm accumulates. Burden of proof is on the agency, not the manufacturer — the structural gap DSHEA created.' }
];

let selectedSide = null;
let selectedIdx = -1;
let resetBtn;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    resetBtn = createButton('Reset');
    resetBtn.position(12, drawHeight + 10);
    resetBtn.mousePressed(() => { selectedSide = null; selectedIdx = -1; });
}

function draw() {
    background(255);

    // Title
    fill('#1a3a6c');
    noStroke();
    textStyle(BOLD);
    textSize(17);
    textAlign(CENTER, TOP);
    text('Regulatory Gap: Drug Approval vs. Dietary Supplement Path to Market', containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(11);
    fill('#555');
    text('Click any step for details. Orange highlight = step NOT required for supplements under DSHEA (1994).', containerWidth / 2, 32);

    // Layout: two columns
    const colW = (containerWidth - 60) / 2;
    const leftX = 20;
    const rightX = 40 + colW;
    const colTop = 58;

    // Column headers
    drawHeader(leftX, colTop, colW, 'PHARMACEUTICAL DRUG', '~12 years · ~$1-2B', '#1a4d8c');
    drawHeader(rightX, colTop, colW, 'DIETARY SUPPLEMENT', '~weeks to months · low cost', '#d97706');

    // Steps
    const stepTop = colTop + 50;
    const stepH = 42;
    const stepGap = 6;

    for (let i = 0; i < drugSteps.length; i++) {
        const y = stepTop + i * (stepH + stepGap);
        const sel = (selectedSide === 'drug' && selectedIdx === i);
        drawStep(leftX, y, colW, stepH, drugSteps[i], '#1a4d8c', sel, false);
        if (i < drugSteps.length - 1) drawArrow(leftX + colW / 2, y + stepH, y + stepH + stepGap);
    }

    // Supplement: align by drug-equivalent so the "gap" is visible
    // Map: index in drugSteps where each supp step aligns
    // 0:Formulate → drug 0:Preclinical
    // 1:Self-cert → spans drug 1,2,3 (Phase I-III) -- show as one bar
    // 2:NDI 75-day → drug 4:NDA
    // 3:Market → drug 5:Approval
    // 4:Complaints → drug 6:Surveillance
    const suppAlignTo = [0, 1, 4, 5, 6];

    // Self-cert tall block spans 3 drug steps (Phase I, II, III): drug rows 1-3
    for (let i = 0; i < suppSteps.length; i++) {
        const sel = (selectedSide === 'supp' && selectedIdx === i);
        if (i === 1) {
            // Spans rows 1,2,3
            const yTop = stepTop + 1 * (stepH + stepGap);
            const yBot = stepTop + 3 * (stepH + stepGap) + stepH;
            drawStepSpan(rightX, yTop, colW, yBot - yTop, suppSteps[i], '#d97706', sel);
        } else {
            const targetRow = suppAlignTo[i];
            const y = stepTop + targetRow * (stepH + stepGap);
            drawStep(rightX, y, colW, stepH, suppSteps[i], '#d97706', sel, true);
            if (i < suppSteps.length - 1 && i !== 0) {
                drawArrow(rightX + colW / 2, y + stepH, y + stepH + stepGap);
            }
        }
    }
    // Arrow from Formulate (row 0) down to Self-Certify block (row 1)
    drawArrow(rightX + colW / 2, stepTop + stepH, stepTop + stepH + stepGap);
    // Arrow from Self-Certify block end (row 3 bottom) down to NDI Notification (row 4)
    {
        const yEnd = stepTop + 3 * (stepH + stepGap) + stepH;
        drawArrow(rightX + colW / 2, yEnd, yEnd + stepGap);
    }

    // Info panel at bottom of drawing area
    drawInfoPanel(stepTop);

    // Control band
    noStroke();
    fill(248);
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke('#dee2e6');
    line(0, drawHeight, containerWidth, drawHeight);

    // Cursor hand if hovering a clickable step
    if (overAnyStep()) cursor(HAND); else cursor(ARROW);
}

function drawHeader(x, y, w, title, sub, col) {
    noStroke();
    fill(col);
    rect(x, y, w, 40, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    text(title, x + w / 2, y + 14);
    textStyle(NORMAL);
    textSize(11);
    text(sub, x + w / 2, y + 30);
}

function drawStep(x, y, w, h, step, baseCol, selected, isSupp) {
    // Color: drugs always solid; supplements with reqSupp false (gap) get orange
    let fillCol, strokeCol = baseCol;
    if (isSupp) {
        fillCol = '#fef3c7'; // pale amber
    } else {
        fillCol = '#e6f0fb';
    }
    if (selected) {
        fillCol = '#fff4d0';
        strokeCol = '#1a3a6c';
    }
    stroke(strokeCol);
    strokeWeight(selected ? 2.5 : 1.5);
    fill(fillCol);
    rect(x, y, w, h, 4);

    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text(step.label, x + 10, y + 6);
    textStyle(NORMAL);
    textSize(10.5);
    fill('#444');
    text(step.sub, x + 10, y + 24);
}

function drawStepSpan(x, y, w, h, step, baseCol, selected) {
    // Big highlighted "NOT REQUIRED" gap block
    const fillCol = selected ? '#fff4d0' : '#ffe1c2';
    const strokeCol = selected ? '#1a3a6c' : '#d97706';
    stroke(strokeCol);
    strokeWeight(selected ? 2.5 : 2);
    drawingContext.setLineDash([6, 4]);
    fill(fillCol);
    rect(x, y, w, h, 6);
    drawingContext.setLineDash([]);

    noStroke();
    fill('#9a3412');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(12);
    text('NOT REQUIRED for supplements', x + w / 2, y + 16);
    textStyle(NORMAL);
    textSize(11);
    fill('#1a3a6c');
    textStyle(BOLD);
    text(step.label, x + w / 2, y + h / 2);
    textStyle(NORMAL);
    textSize(10.5);
    fill('#555');
    text('(manufacturer self-certifies; no FDA review)', x + w / 2, y + h - 14);
}

function drawArrow(cx, yTop, yBot) {
    stroke('#888');
    strokeWeight(1.5);
    line(cx, yTop, cx, yBot - 4);
    noStroke();
    fill('#888');
    triangle(cx - 4, yBot - 4, cx + 4, yBot - 4, cx, yBot + 2);
}

function drawInfoPanel(stepTop) {
    const panelY = drawHeight - 90;
    const panelX = 12;
    const panelW = containerWidth - 24;
    const panelH = 82;
    noStroke();
    fill('#f4f7fb');
    rect(panelX, panelY, panelW, panelH, 6);
    stroke('#1a3a6c');
    strokeWeight(1);
    noFill();
    rect(panelX, panelY, panelW, panelH, 6);

    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(12);
    let title, body;
    if (selectedSide === 'drug' && selectedIdx >= 0) {
        title = 'Drug step: ' + drugSteps[selectedIdx].label;
        body = drugSteps[selectedIdx].desc;
    } else if (selectedSide === 'supp' && selectedIdx >= 0) {
        title = 'Supplement step: ' + suppSteps[selectedIdx].label;
        body = suppSteps[selectedIdx].desc;
    } else {
        title = 'The DSHEA Gap';
        body = 'The Dietary Supplement Health and Education Act of 1994 exempted dietary supplements from pre-market FDA approval. The amber band shows the safety-and-efficacy testing required for drugs but NOT required for supplements. Click any step on either side for details.';
    }
    textStyle(BOLD);
    text(title, panelX + 10, panelY + 8);
    textStyle(NORMAL);
    textSize(12);
    text(body, panelX + 10, panelY + 28, panelW - 20, panelH - 36);
}

function overAnyStep() {
    if (mouseY > drawHeight) return false;
    const hit = stepUnderMouse();
    return hit !== null;
}

function stepUnderMouse() {
    const colW = (containerWidth - 60) / 2;
    const leftX = 20;
    const rightX = 40 + colW;
    const colTop = 58;
    const stepTop = colTop + 50;
    const stepH = 42;
    const stepGap = 6;

    for (let i = 0; i < drugSteps.length; i++) {
        const y = stepTop + i * (stepH + stepGap);
        if (mouseX >= leftX && mouseX <= leftX + colW && mouseY >= y && mouseY <= y + stepH) {
            return { side: 'drug', idx: i };
        }
    }
    // Supplement
    const suppAlignTo = [0, 1, 4, 5, 6];
    for (let i = 0; i < suppSteps.length; i++) {
        if (i === 1) {
            const yTop = stepTop + 1 * (stepH + stepGap);
            const yBot = stepTop + 3 * (stepH + stepGap) + stepH;
            if (mouseX >= rightX && mouseX <= rightX + colW && mouseY >= yTop && mouseY <= yBot) {
                return { side: 'supp', idx: i };
            }
        } else {
            const targetRow = suppAlignTo[i];
            const y = stepTop + targetRow * (stepH + stepGap);
            if (mouseX >= rightX && mouseX <= rightX + colW && mouseY >= y && mouseY <= y + stepH) {
                return { side: 'supp', idx: i };
            }
        }
    }
    return null;
}

function mousePressed() {
    const hit = stepUnderMouse();
    if (hit) {
        if (selectedSide === hit.side && selectedIdx === hit.idx) {
            selectedSide = null; selectedIdx = -1;
        } else {
            selectedSide = hit.side; selectedIdx = hit.idx;
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
