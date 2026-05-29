// CERC Five Stages Timeline
// CANVAS_HEIGHT: 640
let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let resetBtn;
let selectedStage = -1;
let hoveredEvent = -1;

const STAGES = [
    {
        name: 'Pre-Crisis',
        color: [33, 150, 243],
        light: [187, 222, 251],
        duration: 'Months to years before',
        tasks: [
            'Build relationships with media and partners',
            'Develop and test message templates',
            'Train spokespeople and risk communicators',
            'Conduct surveillance and risk assessment'
        ],
        covid: 'Before Dec 2019: pandemic preparedness plans drafted; CDC Crisis Communication training conducted; tabletop exercises completed.'
    },
    {
        name: 'Initial Event',
        color: [255, 152, 0],
        light: [255, 224, 178],
        duration: 'First hours to days',
        tasks: [
            'Acknowledge the event with empathy',
            'Explain what is known and not known',
            'Issue early guidance to reduce harm',
            'Establish credibility and a single voice'
        ],
        covid: 'Jan-Feb 2020: WHO declares PHEIC; CDC daily briefings begin; early case definitions issued; uncertainty explicitly acknowledged.'
    },
    {
        name: 'Maintenance',
        color: [229, 57, 53],
        light: [255, 205, 210],
        duration: 'Weeks to months',
        tasks: [
            'Provide ongoing updates as evidence evolves',
            'Explain risk and response in plain language',
            'Address rumors and misinformation',
            'Sustain stakeholder coordination'
        ],
        covid: 'Mar-Dec 2020: ongoing case/death updates; mask guidance revised; rumor-control pages; daily White House task-force briefings.'
    },
    {
        name: 'Resolution',
        color: [255, 193, 7],
        light: [255, 236, 179],
        duration: 'Months to a year+',
        tasks: [
            'Communicate return to baseline operations',
            'Promote recovery resources',
            'Reinforce protective behaviors that still apply',
            'Recognize community contributions'
        ],
        covid: '2021-2022: vaccine rollout messaging; back-to-school guidance; transition from emergency to endemic communication.'
    },
    {
        name: 'Evaluation',
        color: [76, 175, 80],
        light: [200, 230, 201],
        duration: 'After the crisis',
        tasks: [
            'Audit communication performance',
            'Document lessons learned',
            'Update plans for future events',
            'Share findings with partners'
        ],
        covid: '2023+: WHO ends PHEIC May 2023; after-action reports; revisions to IHR; CDC Moving Forward reorganization.'
    }
];

const EVENTS = [
    { stage: 1, dayOffset: 0.3, label: 'First press briefing' },
    { stage: 1, dayOffset: 0.7, label: 'WHO PHEIC declaration' },
    { stage: 2, dayOffset: 0.5, label: 'National emergency declared' },
    { stage: 3, dayOffset: 0.4, label: 'Vaccine approval (EUA)' },
    { stage: 4, dayOffset: 0.6, label: 'After-action report' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    resetBtn = createButton('Reset Selection');
    resetBtn.position(20, drawHeight + 25);
    resetBtn.size(140, 32);
    resetBtn.style('font-size', '14px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.mousePressed(() => { selectedStage = -1; });
}

function draw() {
    background(255);

    // Title
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('CERC: Crisis & Emergency Risk Communication — Five Stages', containerWidth / 2, 10);
    textStyle(NORMAL);

    // Layout
    const marginX = 30;
    const usableW = containerWidth - 2 * marginX;
    const stageW = usableW / STAGES.length;
    const timelineY = 90;
    const timelineH = 60;
    const buttonY = 50;
    const buttonH = 32;

    // Header buttons (clickable)
    hoveredEvent = -1;
    for (let i = 0; i < STAGES.length; i++) {
        const x = marginX + i * stageW;
        const s = STAGES[i];
        const isSel = selectedStage === i;
        const isHover = mouseX >= x + 4 && mouseX <= x + stageW - 4 &&
                        mouseY >= buttonY && mouseY <= buttonY + buttonH;
        const col = isSel ? s.color : (isHover ? s.color : s.light);
        const txCol = isSel ? '#fff' : (isHover ? '#fff' : '#1a3a6c');
        noStroke();
        fill(col[0] !== undefined ? color(col[0], col[1], col[2]) : col);
        rect(x + 4, buttonY, stageW - 8, buttonH, 4);
        fill(txCol);
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(s.name, x + stageW / 2, buttonY + buttonH / 2);
        textStyle(NORMAL);
    }

    // Timeline segments
    for (let i = 0; i < STAGES.length; i++) {
        const x = marginX + i * stageW;
        const s = STAGES[i];
        const isSel = selectedStage === i;
        noStroke();
        fill(s.color[0], s.color[1], s.color[2]);
        rect(x, timelineY, stageW, timelineH);
        if (isSel) {
            noFill();
            stroke(255, 200, 0);
            strokeWeight(3);
            rect(x, timelineY, stageW, timelineH);
            noStroke();
            strokeWeight(1);
        }
        // Stage number badge
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(20);
        textStyle(BOLD);
        text((i + 1).toString(), x + stageW / 2, timelineY + timelineH / 2);
        textStyle(NORMAL);
    }

    // Connector arrow line
    stroke('#888');
    strokeWeight(2);
    line(marginX, timelineY + timelineH + 6, marginX + usableW, timelineY + timelineH + 6);
    // Right arrow
    fill('#888');
    noStroke();
    triangle(marginX + usableW, timelineY + timelineH + 6,
             marginX + usableW - 8, timelineY + timelineH + 2,
             marginX + usableW - 8, timelineY + timelineH + 10);

    // Event markers above timeline
    for (let i = 0; i < EVENTS.length; i++) {
        const ev = EVENTS[i];
        const baseX = marginX + ev.stage * stageW + ev.dayOffset * stageW;
        const markY = timelineY - 8;
        const isEvHover = dist(mouseX, mouseY, baseX, markY) < 9;
        if (isEvHover) hoveredEvent = i;
        fill(isEvHover ? '#ffeb3b' : '#fff');
        stroke('#1a3a6c');
        strokeWeight(2);
        ellipse(baseX, markY, 14, 14);
        noStroke();
        fill('#1a3a6c');
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text('!', baseX, markY);
        textStyle(NORMAL);
    }

    // Detail panel
    const panelY = timelineY + timelineH + 30;
    const panelH = drawHeight - panelY - 20;
    drawPanel(marginX, panelY, usableW, panelH);

    // Tooltip
    if (hoveredEvent >= 0) {
        const ev = EVENTS[hoveredEvent];
        const baseX = marginX + ev.stage * stageW + ev.dayOffset * stageW;
        drawTooltip(ev.label, baseX, timelineY - 18);
    }

    // Controls strip
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

    fill('#495057');
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Click any stage button (above) or stage band to see communication tasks. Hover event markers (!) for context.',
         180, drawHeight + 30);
    text('CERC framework: CDC, Reynolds & Seeger (2005)', 180, drawHeight + 50);
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
        text('Click a stage above to see typical duration,\nkey communication tasks, and a COVID-19 example.',
             x + w / 2, y + h / 2);
        textStyle(NORMAL);
        return;
    }

    const s = STAGES[selectedStage];
    // Color bar at top
    fill(s.color[0], s.color[1], s.color[2]);
    rect(x, y, w, 8, 6, 6, 0, 0);

    // Heading
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text('Stage ' + (selectedStage + 1) + ': ' + s.name, x + 14, y + 18);
    textStyle(NORMAL);

    // Duration
    fill('#6c757d');
    textSize(12);
    textStyle(ITALIC);
    text('Typical duration: ' + s.duration, x + 14, y + 40);
    textStyle(NORMAL);

    // Tasks heading
    fill('#1a3a6c');
    textSize(12);
    textStyle(BOLD);
    text('Key communication tasks:', x + 14, y + 62);
    textStyle(NORMAL);

    // Tasks list
    fill('#212529');
    textSize(11.5);
    const colW = (w - 28) / 2;
    for (let i = 0; i < s.tasks.length; i++) {
        text('• ' + s.tasks[i], x + 18, y + 80 + i * 22, colW - 10);
    }

    // COVID example
    const exX = x + 14 + colW;
    fill('#1a3a6c');
    textSize(12);
    textStyle(BOLD);
    text('COVID-19 example:', exX, y + 62);
    textStyle(NORMAL);

    fill('#212529');
    textSize(11.5);
    text(s.covid, exX, y + 80, colW - 10);
}

function drawTooltip(label, mx, my) {
    textSize(11);
    const tw = textWidth(label) + 14;
    const th = 20;
    let tx = mx - tw / 2;
    let ty = my - th - 6;
    if (tx < 4) tx = 4;
    if (tx + tw > containerWidth - 4) tx = containerWidth - tw - 4;
    if (ty < 30) ty = my + 18;
    fill(40, 40, 40, 230);
    noStroke();
    rect(tx, ty, tw, th, 4);
    fill(255);
    textAlign(CENTER, CENTER);
    text(label, tx + tw / 2, ty + th / 2);
}

function mousePressed() {
    const marginX = 30;
    const usableW = containerWidth - 2 * marginX;
    const stageW = usableW / STAGES.length;
    const timelineY = 90;
    const timelineH = 60;
    const buttonY = 50;
    const buttonH = 32;

    for (let i = 0; i < STAGES.length; i++) {
        const x = marginX + i * stageW;
        // Header buttons
        if (mouseX >= x + 4 && mouseX <= x + stageW - 4 &&
            mouseY >= buttonY && mouseY <= buttonY + buttonH) {
            selectedStage = i;
            return;
        }
        // Timeline bands
        if (mouseX >= x && mouseX <= x + stageW &&
            mouseY >= timelineY && mouseY <= timelineY + timelineH) {
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
