// System Archetypes Reference
// CANVAS_HEIGHT: 700
let canvasWidth = 900;
let drawHeight = 600;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let archetypes;
let selectedIdx = 0;
let modeSelect;
let mode = 'archetype'; // or 'behavior'
let behaviorSelect;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');
    buildArchetypes();

    modeSelect = createSelect();
    modeSelect.option('Browse by archetype', 'archetype');
    modeSelect.option('Search by behavior', 'behavior');
    modeSelect.selected('archetype');
    modeSelect.position(20, drawHeight + 20);
    modeSelect.style('font-size', '13px');
    modeSelect.style('padding', '4px');
    modeSelect.changed(() => {
        mode = modeSelect.value();
        behaviorSelect.style('display', mode === 'behavior' ? 'inline-block' : 'none');
    });

    behaviorSelect = createSelect();
    behaviorSelect.option('Exponential growth', 'growth');
    behaviorSelect.option('Oscillation', 'oscillation');
    behaviorSelect.option('Slow decline / drift', 'decline');
    behaviorSelect.option('Stagnation / plateau', 'plateau');
    behaviorSelect.position(200, drawHeight + 20);
    behaviorSelect.style('font-size', '13px');
    behaviorSelect.style('padding', '4px');
    behaviorSelect.style('display', 'none');
    behaviorSelect.changed(() => {
        const v = behaviorSelect.value();
        for (let i = 0; i < archetypes.length; i++) {
            if (archetypes[i].behavior === v) { selectedIdx = i; break; }
        }
    });
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke(); textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Eight System Archetypes', containerWidth / 2, 8);
    textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('Click a card to view its loop structure, behavior, and public-health example.',
        containerWidth / 2, 30);

    drawCards();
    drawDetail();
    drawControlBar();
}

function drawCards() {
    const startX = 20;
    const startY = 52;
    const cardW = (containerWidth - 40 - 3 * 8) / 4;
    const cardH = 80;
    const rowGap = 8;

    for (let i = 0; i < archetypes.length; i++) {
        const col = i % 4;
        const row = floor(i / 4);
        const x = startX + col * (cardW + 8);
        const y = startY + row * (cardH + rowGap);
        const isSel = i === selectedIdx;

        stroke(isSel ? color('#1a3a6c') : color('#cfd8e6'));
        strokeWeight(isSel ? 3 : 1);
        fill(isSel ? color(230, 240, 255) : color('#f7f9fc'));
        rect(x, y, cardW, cardH, 6);

        // mini loop schematic
        drawMiniLoop(x + 10, y + 12, 50, 50, archetypes[i].loopType);

        noStroke();
        fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP); textStyle(BOLD);
        const lines = wrapText(archetypes[i].name, cardW - 70, 11);
        for (let l = 0; l < lines.length; l++) {
            text(lines[l], x + 65, y + 12 + l * 13);
        }
        textStyle(NORMAL);
        fill('#666'); textSize(10);
        text(archetypes[i].tagline, x + 65, y + 12 + lines.length * 13 + 4, cardW - 70);

        archetypes[i]._bounds = { x, y, w: cardW, h: cardH };
    }
}

function drawMiniLoop(x, y, w, h, type) {
    noFill();
    stroke('#3a6db5'); strokeWeight(1.5);
    ellipse(x + w / 2, y + h / 2, w * 0.8, h * 0.8);
    // Arrow head
    const ax = x + w / 2 + (w * 0.4);
    const ay = y + h / 2;
    fill('#3a6db5');
    triangle(ax - 4, ay - 4, ax + 2, ay, ax - 4, ay + 4);
    noStroke();
    fill('#1a3a6c'); textSize(12); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(type, x + w / 2, y + h / 2);
    textStyle(NORMAL);
}

function drawDetail() {
    const startY = 52 + 2 * (80 + 8) + 8;
    const x = 20;
    const w = containerWidth - 40;
    const h = drawHeight - startY - 10;

    fill('#f5f7fb'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, startY, w, h, 6);
    noStroke();

    const a = archetypes[selectedIdx];
    fill('#1a3a6c'); textSize(15); textAlign(LEFT, TOP); textStyle(BOLD);
    text(a.name, x + 14, startY + 8);
    textStyle(NORMAL);
    fill('#444'); textSize(12);
    text('Behavior: ' + a.behaviorLabel + '   |   Structure: ' + a.structure,
        x + 14, startY + 30);

    // Left: schematic (smaller width to avoid overlap)
    drawArchetypeSchematic(x + 14, startY + 52, 260, h - 70, a);

    // Right: description + example
    textAlign(LEFT, TOP);
    const tx = x + 295;
    const tw = w - tx + x - 14;
    fill('#1a3a6c'); textSize(12); textStyle(BOLD);
    text('Generic template', tx, startY + 52);
    textStyle(NORMAL);
    fill('#222'); textSize(11);
    wrapAndDraw(a.description, tx, startY + 70, tw, 14);

    fill('#1a3a6c'); textSize(12); textStyle(BOLD);
    text('Public health example', tx, startY + 130);
    textStyle(NORMAL);
    fill('#222'); textSize(11);
    wrapAndDraw(a.example, tx, startY + 148, tw, 14);

    fill('#b95c00'); textSize(11); textStyle(BOLD);
    text('Leverage point', tx, startY + 215);
    textStyle(NORMAL);
    fill('#222');
    wrapAndDraw(a.leverage, tx, startY + 232, tw, 14);
}

function drawArchetypeSchematic(x, y, w, h, a) {
    noFill();
    stroke('#3a6db5'); strokeWeight(2);
    // Two-loop schematic
    const cx1 = x + w * 0.28;
    const cy = y + h / 2;
    const cx2 = x + w * 0.72;
    const r = min(w * 0.18, h * 0.30);
    ellipse(cx1, cy, r * 2);
    if (a.twoLoops) ellipse(cx2, cy, r * 2);

    // labels at loop centers
    noStroke(); fill('#1a3a6c'); textSize(14); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(a.loopType, cx1, cy);
    if (a.twoLoops) text(a.loopType2, cx2, cy);
    textStyle(NORMAL);

    // Variable labels around loops
    fill('#222'); textSize(10); textAlign(CENTER, CENTER);
    if (a.varsLeft) {
        text(a.varsLeft[0], cx1, cy - r - 8);
        text(a.varsLeft[1], cx1 + r + 10, cy);
        text(a.varsLeft[2], cx1, cy + r + 10);
    }
    if (a.twoLoops && a.varsRight) {
        text(a.varsRight[0], cx2, cy - r - 8);
        text(a.varsRight[1], cx2 - r - 10, cy);
        text(a.varsRight[2], cx2, cy + r + 10);
    }
}

function drawControlBar() {
    fill('#f5f5f5'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    fill('#333'); textSize(12); textAlign(LEFT, TOP);
    text('Mode:', 20, drawHeight + 6);
    fill('#444'); textSize(11);
    text('R = reinforcing loop, B = balancing loop.', 20, drawHeight + 60);
    text('Each archetype combines simple loops to produce a recognizable behavior pattern.', 20, drawHeight + 76);
}

function mousePressed() {
    for (let i = 0; i < archetypes.length; i++) {
        const b = archetypes[i]._bounds;
        if (!b) continue;
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            selectedIdx = i; return;
        }
    }
}

function wrapText(str, maxW, fontSize) {
    push(); textSize(fontSize);
    const words = str.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
        const tryLine = cur ? cur + ' ' + w : w;
        if (textWidth(tryLine) > maxW && cur) { lines.push(cur); cur = w; }
        else cur = tryLine;
    }
    if (cur) lines.push(cur);
    pop();
    return lines;
}

function wrapAndDraw(str, x, y, maxW, lineH) {
    const lines = wrapText(str, maxW, 11);
    for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lineH);
}

function buildArchetypes() {
    archetypes = [
        {
            name: 'Limits to Growth', tagline: 'Growth meets a hidden cap',
            loopType: 'R', loopType2: 'B', twoLoops: true,
            varsLeft: ['Action', 'Results', ''], varsRight: ['Limit', 'Slowing', ''],
            behavior: 'plateau', behaviorLabel: 'S-curve plateau', structure: 'R loop + B loop',
            description: 'A reinforcing loop drives growth until a balancing loop activated by a limiting condition slows or halts it.',
            example: 'Vaccination campaign coverage rises fast among easy-to-reach groups, then plateaus as remaining hesitancy and access barriers act as a hidden limit.',
            leverage: 'Identify and weaken the limiting factor before pushing the growth loop harder.'
        },
        {
            name: 'Tragedy of the Commons', tagline: 'Shared resource overuse',
            loopType: 'R', loopType2: 'R', twoLoops: true,
            varsLeft: ['Use A', 'Gain A', ''], varsRight: ['Use B', 'Gain B', ''],
            behavior: 'decline', behaviorLabel: 'Resource collapse', structure: 'Two R loops sharing a limit',
            description: 'Multiple actors each gain from increasing use of a shared resource, but their combined use degrades it for everyone.',
            example: 'Antibiotic overuse across many prescribers selects for resistant bacteria, eroding the effectiveness of antibiotics for all patients.',
            leverage: 'Regulate or price the shared resource so individual incentives align with collective good.'
        },
        {
            name: 'Fixes That Fail', tagline: 'Quick fix, worse later',
            loopType: 'B', loopType2: 'R', twoLoops: true,
            varsLeft: ['Symptom', 'Fix', ''], varsRight: ['Side effect', 'Symptom', ''],
            behavior: 'oscillation', behaviorLabel: 'Symptom returns worse', structure: 'B fix + delayed R side effect',
            description: 'A quick fix relieves the symptom but produces an unintended consequence that worsens the original problem over time.',
            example: 'Aggressive opioid prescribing eased acute pain (fix) but seeded addiction and overdose, sharply increasing the population pain burden.',
            leverage: 'Make the delayed side-effect visible early; avoid fixes whose feedback loops are unmeasured.'
        },
        {
            name: 'Shifting the Burden', tagline: 'Symptom fix erodes capacity',
            loopType: 'B', loopType2: 'B', twoLoops: true,
            varsLeft: ['Symptom', 'Quick fix', ''], varsRight: ['Root cause', 'Real fix', ''],
            behavior: 'decline', behaviorLabel: 'Capacity erodes', structure: 'Two B loops + erosion R',
            description: 'A symptomatic fix is repeatedly chosen over a slower fundamental solution, eroding the capacity to ever apply the fundamental solution.',
            example: 'Repeated ED visits for diabetic crises substitute for primary care; underfunded primary care withers, increasing future ED demand.',
            leverage: 'Invest in the fundamental solution even when the symptomatic one looks cheaper today.'
        },
        {
            name: 'Eroding Goals', tagline: 'Standards drift downward',
            loopType: 'B', loopType2: 'B', twoLoops: true,
            varsLeft: ['Gap', 'Effort', ''], varsRight: ['Gap', 'Lower goal', ''],
            behavior: 'decline', behaviorLabel: 'Slow drift', structure: 'Two B loops on the gap',
            description: 'When goals and reality disagree, decision makers can close the gap by improving performance or by lowering the goal.',
            example: 'When hospital readmission targets are missed, organizations may quietly redefine the metric instead of fixing the underlying care transition.',
            leverage: 'Anchor goals to absolute benchmarks; require explicit, public goal changes.'
        },
        {
            name: 'Escalation', tagline: 'Two parties race upward',
            loopType: 'R', loopType2: 'R', twoLoops: true,
            varsLeft: ['Effort A', 'Lead A', ''], varsRight: ['Effort B', 'Lead B', ''],
            behavior: 'growth', behaviorLabel: 'Arms race', structure: 'Two R loops coupled',
            description: 'Each actor responds to the other\'s gains by escalating their own, producing a runaway reinforcing cycle.',
            example: 'Marketing escalation between sugar-sweetened beverage brands raises total category consumption and population caloric intake.',
            leverage: 'Establish shared rules (advertising limits, joint commitments) that decouple the escalation.'
        },
        {
            name: 'Success to the Successful', tagline: 'Winners get more',
            loopType: 'R', loopType2: 'R', twoLoops: true,
            varsLeft: ['Wins', 'Resources', ''], varsRight: ['Losses', 'Resources', ''],
            behavior: 'growth', behaviorLabel: 'Inequality grows', structure: 'Two coupled R loops',
            description: 'Resources flow to whichever actor is winning, increasing the gap between winners and losers.',
            example: 'Well-resourced hospitals attract more grant funding and top staff, widening the quality gap with safety-net hospitals serving high-risk patients.',
            leverage: 'Redistribute resources by formula or capitation that targets need rather than past success.'
        },
        {
            name: 'Growth and Underinvestment', tagline: 'Capacity falls behind demand',
            loopType: 'R', loopType2: 'B', twoLoops: true,
            varsLeft: ['Demand', 'Service', ''], varsRight: ['Capacity', 'Quality', ''],
            behavior: 'oscillation', behaviorLabel: 'Boom-then-bust', structure: 'R growth + B capacity erosion',
            description: 'Growing demand erodes service quality; capacity is not expanded in time, demand falls back, and the system never reaches its potential.',
            example: 'A successful community health program is overwhelmed; wait times grow, perceived value drops, enrollment falls, and funders cut budgets just as need is highest.',
            leverage: 'Invest in capacity ahead of demand using leading indicators, not lagging utilization.'
        }
    ];
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
