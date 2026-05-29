// MicroSim Design Process
// CANVAS_HEIGHT: 760
let canvasWidth = 900;
let drawHeight = 680;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let resetBtn;
let selectedStep = -1;
let completed = new Array(8).fill(false);

// 4 color phases: blue (1-2), orange (3-4), green (5-6), red (7-8)
const PHASES = {
    plan: [33, 150, 243],
    design: [255, 152, 0],
    build: [76, 175, 80],
    polish: [229, 57, 53]
};

const STEPS = [
    {
        name: 'Define Learning Objective',
        phase: 'plan',
        decision: true,
        desc: 'Complete the sentence: "After using this sim, students can ___." Use a single Bloom verb. If the sentence requires "and," split into two sims.',
        mistake: 'Two verbs in one objective ("understand AND apply") — the sim ends up muddled and assesses neither well.',
        criteria: [
            'Single Bloom verb chosen',
            'Outcome observable / measurable',
            'No "and" between verbs'
        ]
    },
    {
        name: 'Choose Interaction Type',
        phase: 'plan',
        decision: false,
        desc: 'Map the Bloom level to an interaction pattern: parameter slider (Apply), toggle scenario (Analyze), explore network (Evaluate), observe animation (Understand).',
        mistake: 'Defaulting to "slider + chart" for every objective. Higher Bloom levels need scenario or design interactions, not slider tweaks.',
        criteria: [
            'Pattern matches Bloom level',
            'User has at least one input',
            'Interaction takes < 5 s to attempt'
        ]
    },
    {
        name: 'Select Library',
        phase: 'design',
        decision: true,
        desc: 'Pick the library that minimizes code. Agent-based or pixel-level animation -> p5.js. Standard chart -> Chart.js. Network/flow -> vis-network. Map -> Leaflet.',
        mistake: 'Forcing a chart into p5.js because you already know p5.js. Reinventing axes, tooltips, and legends loses two days.',
        criteria: [
            'Library proposed and justified in one line',
            'Single shape on the page (not 3 libraries)',
            'CDN URL pinned to a version'
        ]
    },
    {
        name: 'Sketch Canvas Layout',
        phase: 'design',
        decision: false,
        desc: 'On paper, sketch three regions: canvas, controls, readout. Reserve a mobile stack layout. CANVAS_HEIGHT comment is authoritative.',
        mistake: 'Skipping the sketch and discovering at review time that controls do not fit at viewport 800.',
        criteria: [
            'Three regions identified',
            'CANVAS_HEIGHT estimated',
            'Mobile stack order decided'
        ]
    },
    {
        name: 'Implement Controls First',
        phase: 'build',
        decision: false,
        desc: 'Build sliders / buttons / selects BEFORE the simulation logic. Verify the events fire and reflect the right values. Easier to debug now than later.',
        mistake: 'Wiring sim logic first, then bolting on controls. The state model is wrong and every control becomes a special case.',
        criteria: [
            'Each control emits a value to console',
            'Reset button works',
            'Initial state visible without input'
        ]
    },
    {
        name: 'Implement Core Loop',
        phase: 'build',
        decision: false,
        desc: 'p5.js: setup() and draw(). Chart.js: config object. Plotly: layout + traces. vis-network: nodes + edges + options. Keep state OUT of draw().',
        mistake: 'Computing state inside draw() at 60 fps -> duplicates events, leaks objects, frame drops.',
        criteria: [
            'updateCanvasSize() is first in setup()',
            'canvas.parent(document.querySelector("main"))',
            'No allocations in the hot path of draw()'
        ]
    },
    {
        name: 'Apply Accessibility Checks',
        phase: 'polish',
        decision: false,
        desc: 'Run color-blindness simulation; test on a phone-width viewport; verify alt text and screen-reader labels; cap at 500 agents for low-end devices.',
        mistake: 'Choosing red/green for "good/bad" — invisible to 8% of male readers.',
        criteria: [
            'Color blind-safe palette',
            'Mobile viewport (390 px) passes layout',
            'Performance: 60 fps at agent cap'
        ]
    },
    {
        name: 'Write Specification',
        phase: 'polish',
        decision: false,
        desc: 'Fill the details block in the chapter: sim-id (kebab-case), library, status, then the full prose specification. This is the contract between author and implementer.',
        mistake: 'Vague spec ("Visualize incidence and prevalence") -> implementer makes 12 guesses; review finds the wrong sim was built.',
        criteria: [
            'sim-id matches directory name',
            'All five visual elements named',
            'All controls listed by name'
        ]
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    resetBtn = createButton('Reset All Checkmarks');
    resetBtn.position(20, drawHeight + 25);
    resetBtn.size(180, 32);
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.mousePressed(() => {
        completed = new Array(8).fill(false);
        selectedStep = -1;
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
    text('MicroSim Design Process - 8 Steps from Idea to Spec', containerWidth / 2, 10);
    textStyle(NORMAL);
    fill('#6c757d');
    textSize(11);
    textStyle(ITALIC);
    text('Click any step to see common mistakes and completion criteria. Tick the checkbox in the panel.',
         containerWidth / 2, 32);
    textStyle(NORMAL);

    // Left: vertical chain of 8 steps  |  Right: detail panel
    const chainW = containerWidth * 0.48;
    const stepW = chainW - 60;
    const stepH = 58;
    const stepGap = 16;
    const startX = 30;
    const startY = 60;

    // Draw connectors first
    for (let i = 0; i < STEPS.length - 1; i++) {
        const y1 = startY + i * (stepH + stepGap) + stepH;
        const y2 = startY + (i + 1) * (stepH + stepGap);
        const xC = startX + stepW / 2;
        stroke('#888');
        strokeWeight(2);
        line(xC, y1, xC, y2);
        noStroke();
        fill('#888');
        triangle(xC, y2, xC - 5, y2 - 6, xC + 5, y2 - 6);
    }

    // (Decision back-loop for step 1 is described in the panel; no overlay needed)

    // Draw each step
    for (let i = 0; i < STEPS.length; i++) {
        const step = STEPS[i];
        const y = startY + i * (stepH + stepGap);
        const c = PHASES[step.phase];
        const isSel = selectedStep === i;
        const isHover = mouseX >= startX && mouseX <= startX + stepW &&
                        mouseY >= y && mouseY <= y + stepH;

        // Rounded rect
        fill(c[0], c[1], c[2]);
        if (isSel) { stroke(255, 200, 0); strokeWeight(3); }
        else if (isHover) { stroke(255); strokeWeight(2); }
        else { noStroke(); }
        rect(startX, y, stepW, stepH, 10);
        noStroke();

        // Number badge
        fill(255, 255, 255, 60);
        ellipse(startX + 22, y + stepH / 2, 32, 32);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(18);
        textStyle(BOLD);
        text(i + 1, startX + 22, y + stepH / 2);

        // Step name
        textAlign(LEFT, CENTER);
        textSize(13);
        text(step.name, startX + 48, y + stepH / 2 - 8);
        textStyle(NORMAL);

        // Phase + decision badge
        textSize(10);
        fill(255, 255, 255, 220);
        text(step.phase.toUpperCase() + (step.decision ? ' - decision' : ''),
             startX + 48, y + stepH / 2 + 8);

        // Completed checkmark
        if (completed[i]) {
            fill('#fff');
            stroke('#2e7d32');
            strokeWeight(3);
            const cx = startX + stepW - 22;
            const cy = y + stepH / 2;
            line(cx - 8, cy, cx - 2, cy + 6);
            line(cx - 2, cy + 6, cx + 8, cy - 6);
            noStroke();
        }
    }

    // Phase legend strip below the chain (step 8 ends at ~640)
    const legendY = startY + STEPS.length * (stepH + stepGap) + 4;
    drawPhaseLegend(startX, legendY);

    // Detail panel
    const panelX = chainW + 20;
    const panelW = containerWidth - panelX - 20;
    drawPanel(panelX, 60, panelW, drawHeight - 90);

    // Controls strip
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

    fill('#495057');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Phases: Plan -> Design -> Build -> Polish. Click a step to read its panel; check off completion criteria there.',
         220, drawHeight + 30);
    text(completed.filter(Boolean).length + ' / 8 steps complete',
         220, drawHeight + 50);
}

function drawPhaseLegend(x, y) {
    const items = [
        ['plan', 'Plan (steps 1-2)'],
        ['design', 'Design (3-4)'],
        ['build', 'Build (5-6)'],
        ['polish', 'Polish (7-8)']
    ];
    fill(255);
    stroke(220);
    strokeWeight(1);
    rect(x, y, 380, 36, 4);
    noStroke();
    for (let i = 0; i < items.length; i++) {
        const c = PHASES[items[i][0]];
        fill(c[0], c[1], c[2]);
        rect(x + 8 + i * 95, y + 12, 12, 12, 2);
        fill('#212529');
        textSize(10);
        textAlign(LEFT, CENTER);
        text(items[i][1], x + 24 + i * 95, y + 18);
    }
}

function drawPanel(x, y, w, h) {
    fill(250, 251, 253);
    stroke(220);
    strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    if (selectedStep < 0) {
        fill('#6c757d');
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(ITALIC);
        text('Click any step on the left.\nThe panel will show description,\nthe common mistake (footgun),\nand a completion checklist.',
             x + w / 2, y + h / 2);
        textStyle(NORMAL);
        return;
    }

    const s = STEPS[selectedStep];
    const c = PHASES[s.phase];
    fill(c[0], c[1], c[2]);
    rect(x, y, w, 8, 6, 6, 0, 0);

    // Heading
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Step ' + (selectedStep + 1) + ': ' + s.name, x + 14, y + 16, w - 28);
    textStyle(NORMAL);

    // Description
    fill('#212529');
    textSize(11.5);
    text(s.desc, x + 14, y + 50, w - 28);

    // Common mistake callout
    const mY = y + 50 + 78;
    fill(255, 235, 235);
    stroke('#c62828');
    strokeWeight(1);
    rect(x + 12, mY, w - 24, 70, 4);
    noStroke();
    fill('#c62828');
    textSize(11);
    textStyle(BOLD);
    text('COMMON MISTAKE (footgun):', x + 20, mY + 8);
    textStyle(NORMAL);
    fill('#212529');
    text(s.mistake, x + 20, mY + 26, w - 40);

    // Completion checklist
    const cY = mY + 86;
    fill('#1a3a6c');
    textSize(12);
    textStyle(BOLD);
    text('Completion checklist:', x + 14, cY);
    textStyle(NORMAL);

    fill('#212529');
    textSize(11);
    for (let i = 0; i < s.criteria.length; i++) {
        const checkY = cY + 22 + i * 26;
        // Checkbox marker (purely visual - main checkbox below toggles "completed")
        stroke('#888');
        strokeWeight(1);
        noFill();
        rect(x + 18, checkY, 12, 12, 2);
        noStroke();
        fill('#212529');
        text(s.criteria[i], x + 38, checkY, w - 60);
    }

    // Toggle completion for THIS step
    const toggleY = cY + 22 + s.criteria.length * 26 + 4;
    const tBoxX = x + 18;
    const tHover = mouseX >= tBoxX && mouseX <= tBoxX + 16 &&
                   mouseY >= toggleY && mouseY <= toggleY + 16;
    stroke(tHover ? '#1a3a6c' : '#666');
    strokeWeight(1.5);
    fill(completed[selectedStep] ? '#1a3a6c' : '#fff');
    rect(tBoxX, toggleY, 16, 16, 2);
    if (completed[selectedStep]) {
        stroke('#fff');
        strokeWeight(2.5);
        noFill();
        line(tBoxX + 3, toggleY + 8, tBoxX + 7, toggleY + 12);
        line(tBoxX + 7, toggleY + 12, tBoxX + 13, toggleY + 4);
    }
    noStroke();
    fill('#1a3a6c');
    textSize(11.5);
    textStyle(BOLD);
    text('Mark this step complete', tBoxX + 22, toggleY + 1);
    textStyle(NORMAL);
}

function mousePressed() {
    const chainW = containerWidth * 0.48;
    const stepW = chainW - 60;
    const stepH = 58;
    const stepGap = 16;
    const startX = 30;
    const startY = 60;

    // Step boxes
    for (let i = 0; i < STEPS.length; i++) {
        const y = startY + i * (stepH + stepGap);
        if (mouseX >= startX && mouseX <= startX + stepW &&
            mouseY >= y && mouseY <= y + stepH) {
            selectedStep = i;
            return;
        }
    }

    // Toggle "Mark this step complete" in panel
    if (selectedStep >= 0) {
        const s = STEPS[selectedStep];
        const panelX = chainW + 20;
        const panelW = containerWidth - panelX - 20;
        const y = 60;
        const mY = y + 50 + 78;
        const cY = mY + 86;
        const toggleY = cY + 22 + s.criteria.length * 26 + 4;
        const tBoxX = panelX + 18;
        if (mouseX >= tBoxX && mouseX <= tBoxX + 16 &&
            mouseY >= toggleY && mouseY <= toggleY + 16) {
            completed[selectedStep] = !completed[selectedStep];
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
