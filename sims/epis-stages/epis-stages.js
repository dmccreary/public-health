// EPIS Implementation Stages
// CANVAS_HEIGHT: 680
let canvasWidth = 900;
let drawHeight = 600;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let contextSelect;
let progressSlider;
let resetBtn;
let selectedStage = -1;

const STAGES = [
    {
        name: 'Exploration',
        short: 'E',
        color: [33, 150, 243],
        activities: [
            'Assess community need',
            'Scan available evidence-based programs',
            'Identify potential funders and champions'
        ],
        barriers: [
            'Limited time for environmental scanning',
            'Competing priorities for leadership attention'
        ],
        strategies: [
            'Use needs-assessment toolkits',
            'Engage community advisory boards early'
        ],
        example: 'County opioid task force reviews MOUD (medication for opioid use disorder) programs and selects evidence-based candidates.',
        outerInfluence: 0.9,
        innerInfluence: 0.4
    },
    {
        name: 'Preparation',
        short: 'P',
        color: [255, 152, 0],
        activities: [
            'Adapt program to local context',
            'Train staff and prescribers',
            'Set up data systems and workflows'
        ],
        barriers: [
            'Workforce shortages and turnover',
            'Regulatory or licensing obstacles'
        ],
        strategies: [
            'Phased rollout with pilot clinics',
            'Build training-of-trainers capacity'
        ],
        example: 'County contracts with two clinics, adapts patient intake forms, and trains 12 prescribers on X-waiver and buprenorphine protocols.',
        outerInfluence: 0.7,
        innerInfluence: 0.7
    },
    {
        name: 'Implementation',
        short: 'I',
        color: [76, 175, 80],
        activities: [
            'Deliver the intervention as planned',
            'Monitor fidelity and patient outcomes',
            'Adjust workflows based on data'
        ],
        barriers: [
            'Drift from program model',
            'Patient retention and stigma'
        ],
        strategies: [
            'Audit-and-feedback cycles',
            'Peer recovery coaches for engagement'
        ],
        example: '80 patients enrolled in first 6 months; weekly fidelity reviews; staff huddles to troubleshoot workflow issues.',
        outerInfluence: 0.5,
        innerInfluence: 0.9
    },
    {
        name: 'Sustainment',
        short: 'S',
        color: [156, 39, 176],
        activities: [
            'Secure ongoing funding',
            'Embed program in routine operations',
            'Maintain workforce and quality'
        ],
        barriers: [
            'Grant funding ends; reimbursement gaps',
            'Loss of original champions'
        ],
        strategies: [
            'Bill Medicaid for billable services',
            'Build distributed leadership before champion exits'
        ],
        example: '*Most commonly neglected stage.* Many demonstration programs end when initial grant ends. County here built Medicaid billing pathway from year 1.',
        outerInfluence: 0.8,
        innerInfluence: 0.6
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    contextSelect = createSelect();
    contextSelect.option('Both contexts');
    contextSelect.option('Outer context only');
    contextSelect.option('Inner context only');
    contextSelect.position(170, drawHeight + 18);
    contextSelect.size(180);

    progressSlider = createSlider(0, 3.99, 2.3, 0.01);
    progressSlider.position(170, drawHeight + 50);
    progressSlider.size(200);

    resetBtn = createButton('Reset');
    resetBtn.position(20, drawHeight + 25);
    resetBtn.size(120, 32);
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.mousePressed(() => {
        selectedStage = -1;
        progressSlider.value(2.3);
        contextSelect.selected('Both contexts');
    });
}

function draw() {
    background(255);

    // Title
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('EPIS: Implementation Stages for Public Health Programs', containerWidth / 2, 10);
    textStyle(NORMAL);
    fill('#6c757d');
    textSize(11);
    textStyle(ITALIC);
    text('Exploration -> Preparation -> Implementation -> Sustainment   (Aarons, Hurlburt & Horwitz 2011)',
         containerWidth / 2, 32);
    textStyle(NORMAL);

    const ctxMode = contextSelect.value();
    const showOuter = ctxMode !== 'Inner context only';
    const showInner = ctxMode !== 'Outer context only';

    const marginX = 40;
    const usableW = containerWidth - 2 * marginX;
    const stageW = (usableW - 60) / 4; // 60 px total for arrow gaps
    const gap = 20;
    const stageY = 140;
    const stageH = 90;

    // Outer context label bar
    if (showOuter) {
        fill(225, 240, 252);
        stroke(33, 150, 243, 100);
        strokeWeight(1);
        rect(marginX, 80, usableW, 22, 4);
        noStroke();
        fill('#1a3a6c');
        textSize(11);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        text('Outer context: policy, funding, regulations, sociopolitical climate', marginX + 12, 91);
        textStyle(NORMAL);
    }

    // Draw stages
    for (let i = 0; i < STAGES.length; i++) {
        const x = marginX + i * (stageW + gap);
        const s = STAGES[i];
        const isSel = selectedStage === i;
        const isHover = mouseX >= x && mouseX <= x + stageW &&
                        mouseY >= stageY && mouseY <= stageY + stageH;

        // Box
        noStroke();
        fill(s.color[0], s.color[1], s.color[2]);
        rect(x, stageY, stageW, stageH, 8);
        if (isSel || isHover) {
            noFill();
            stroke(255, 200, 0);
            strokeWeight(3);
            rect(x, stageY, stageW, stageH, 8);
            strokeWeight(1);
            noStroke();
        }

        // Letter badge
        fill(255, 255, 255, 50);
        ellipse(x + stageW - 22, stageY + 22, 32, 32);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(20);
        textStyle(BOLD);
        text(s.short, x + stageW - 22, stageY + 22);
        textStyle(NORMAL);

        // Stage name
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(15);
        textStyle(BOLD);
        text(s.name, x + stageW / 2, stageY + stageH / 2);
        textStyle(NORMAL);

        // Stage number small
        fill(255, 255, 255, 200);
        textSize(10);
        textAlign(LEFT, TOP);
        text('Stage ' + (i + 1), x + 8, stageY + 6);

        // Influence indicators (outer/inner influence intensity at this stage)
        if (showOuter) {
            const influence = s.outerInfluence;
            stroke(33, 150, 243, 80 + influence * 175);
            strokeWeight(2);
            for (let k = 0; k < 3; k++) {
                line(x + 8 + k * 6, stageY - 4, x + 8 + k * 6, stageY - 4 - 16 * influence);
            }
            noStroke();
        }
        if (showInner) {
            const influence = s.innerInfluence;
            stroke(76, 175, 80, 80 + influence * 175);
            strokeWeight(2);
            for (let k = 0; k < 3; k++) {
                line(x + 8 + k * 6, stageY + stageH + 4, x + 8 + k * 6, stageY + stageH + 4 + 16 * influence);
            }
            noStroke();
        }

        // Arrow to next
        if (i < STAGES.length - 1) {
            stroke('#666');
            strokeWeight(3);
            line(x + stageW + 2, stageY + stageH / 2, x + stageW + gap - 4, stageY + stageH / 2);
            noStroke();
            fill('#666');
            triangle(x + stageW + gap - 4, stageY + stageH / 2,
                     x + stageW + gap - 12, stageY + stageH / 2 - 5,
                     x + stageW + gap - 12, stageY + stageH / 2 + 5);
        }
    }

    // Inner context label bar
    if (showInner) {
        fill(232, 245, 233);
        stroke(76, 175, 80, 100);
        strokeWeight(1);
        rect(marginX, 270, usableW, 22, 4);
        noStroke();
        fill('#1a3a6c');
        textSize(11);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        text('Inner context: leadership, workforce, organizational climate, infrastructure', marginX + 12, 281);
        textStyle(NORMAL);
    }

    // Progress indicator (hypothetical opioid program)
    const progress = progressSlider.value(); // 0..3.99 across stages
    const programX = marginX + (progress * (stageW + gap)) + stageW / 2 - (gap / 2);
    fill('#e91e63');
    stroke('#fff');
    strokeWeight(2);
    triangle(programX, stageY - 8,
             programX - 8, stageY - 24,
             programX + 8, stageY - 24);
    noStroke();
    fill('#e91e63');
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('Opioid Tx program', programX, stageY - 26);
    textStyle(NORMAL);

    // Detail panel
    const panelY = 310;
    const panelH = drawHeight - panelY - 20;
    drawPanel(marginX, panelY, usableW, panelH);

    // Controls strip
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

    fill('#495057');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Context:', 170, drawHeight + 10);
    text('Program progress:', 170, drawHeight + 42);
    text('Slide to see where a hypothetical opioid treatment program is in the EPIS pipeline.',
         390, drawHeight + 50);
    text('Sustainment is the most commonly neglected phase.', 390, drawHeight + 25);
}

function drawPanel(x, y, w, h) {
    fill(250, 251, 253);
    stroke(220);
    strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    if (selectedStage < 0) {
        fill('#6c757d');
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(ITALIC);
        text('Click any stage above to see key activities, common barriers,\nimplementation strategies, and a real-world example.',
             x + w / 2, y + h / 2);
        textStyle(NORMAL);
        return;
    }

    const s = STAGES[selectedStage];
    fill(s.color[0], s.color[1], s.color[2]);
    rect(x, y, w, 8, 6, 6, 0, 0);

    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text('Stage ' + (selectedStage + 1) + ': ' + s.name, x + 14, y + 16);
    textStyle(NORMAL);

    const colW = (w - 40) / 3;
    const baseY = y + 44;

    // Column 1: Activities
    fill('#1a3a6c');
    textSize(12);
    textStyle(BOLD);
    text('Key activities', x + 14, baseY);
    textStyle(NORMAL);
    fill('#212529');
    textSize(11);
    for (let i = 0; i < s.activities.length; i++) {
        text('• ' + s.activities[i], x + 14, baseY + 18 + i * 28, colW - 10);
    }

    // Column 2: Barriers
    fill('#c62828');
    textSize(12);
    textStyle(BOLD);
    text('Common barriers', x + 14 + colW, baseY);
    textStyle(NORMAL);
    fill('#212529');
    textSize(11);
    for (let i = 0; i < s.barriers.length; i++) {
        text('• ' + s.barriers[i], x + 14 + colW, baseY + 18 + i * 28, colW - 10);
    }

    // Column 3: Strategies
    fill('#2e7d32');
    textSize(12);
    textStyle(BOLD);
    text('Implementation strategies', x + 14 + 2 * colW, baseY);
    textStyle(NORMAL);
    fill('#212529');
    textSize(11);
    for (let i = 0; i < s.strategies.length; i++) {
        text('• ' + s.strategies[i], x + 14 + 2 * colW, baseY + 18 + i * 28, colW - 10);
    }

    // Example (below)
    const exY = baseY + 110;
    fill('#1a3a6c');
    textSize(12);
    textStyle(BOLD);
    text('Public health example:', x + 14, exY);
    textStyle(NORMAL);
    fill('#212529');
    textSize(11.5);
    text(s.example, x + 14, exY + 18, w - 28);
}

function mousePressed() {
    const marginX = 40;
    const usableW = containerWidth - 2 * marginX;
    const stageW = (usableW - 60) / 4;
    const gap = 20;
    const stageY = 140;
    const stageH = 90;
    for (let i = 0; i < STAGES.length; i++) {
        const x = marginX + i * (stageW + gap);
        if (mouseX >= x && mouseX <= x + stageW &&
            mouseY >= stageY && mouseY <= stageY + stageH) {
            selectedStage = i;
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
