// SIFT Method Decision Flowchart
// CANVAS_HEIGHT: 580
let canvasWidth = 820;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let steps = [
    {
        letter: 'S',
        title: 'Stop',
        color: '#e74c3c',
        question: 'Are you reacting emotionally before checking?',
        definition: 'Pause before you share, like, or react. Strong emotional pulls are exactly what misinformation is designed to exploit.',
        howto: [
            'Notice your gut reaction; do not act on it yet.',
            'Set the post aside before re-sharing or commenting.',
            'Ask: who benefits if I spread this without checking?'
        ],
        example: 'A viral 2020 post claimed a common drug "cured" COVID-19 in hours. Stopping before sharing prevented millions from acting on a claim that later trials disproved.'
    },
    {
        letter: 'I',
        title: 'Investigate the Source',
        color: '#e67e22',
        question: 'Is the source familiar and trusted?',
        definition: 'Spend 30 seconds learning who is making the claim and what their expertise or agenda is. Reputation matters more than how official a site looks.',
        howto: [
            'Open a new tab; search the site or author name.',
            'Check Wikipedia or a media-bias database for a quick read.',
            'Look for credentials, affiliations, and funding.'
        ],
        example: 'A COVID-19 "study" widely shared in 2020 came from a site that imitated a medical journal but had no editorial board. A 30-second search revealed it was a personal blog.'
    },
    {
        letter: 'F',
        title: 'Find Better Coverage',
        color: '#f1c40f',
        question: 'What do other reputable sources say?',
        definition: 'Look for trusted reporting on the same claim. Strong claims deserve multiple confirmations from sources with editorial oversight.',
        howto: [
            'Search the claim itself; add "fact check" or the source name.',
            'Compare CDC, WHO, Cochrane reviews, and reputable news.',
            'If only the original source carries the story, that is a red flag.'
        ],
        example: 'A 2021 claim that ivermectin had "90% efficacy" against COVID-19 was contradicted by the FDA, NIH, WHO, and Cochrane review summaries — all in the first page of results.'
    },
    {
        letter: 'T',
        title: 'Trace Claims, Quotes, Media',
        color: '#27ae60',
        question: 'Where did this claim, quote, or image originally come from?',
        definition: 'Follow the claim back to its primary source. Things lose context as they travel; the original often says less than the post implies.',
        howto: [
            'Click through to the cited study or original article.',
            'Reverse-image-search photos and screenshots.',
            'Check whether quotes are taken from a different context.'
        ],
        example: 'A 2021 viral image showed crowded hospital halls "due to vaccine reactions." A reverse image search traced it to a 2019 flu surge in Spain, predating the COVID-19 vaccines.'
    }
];

let selectedIdx = 0; // start with S highlighted
let resetBtn;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    resetBtn = createButton('Start Over');
    resetBtn.position(12, drawHeight + 10);
    resetBtn.mousePressed(() => { selectedIdx = 0; });
}

function getLayout() {
    // Left column: flowchart boxes; right column: detail panel
    const leftW = 280;
    const padLeft = 20;
    const topY = 70;
    const boxH = 70;
    const gap = 26;
    return { leftW, padLeft, topY, boxH, gap };
}

function draw() {
    background(255);

    // Title
    fill('#1a3a6c');
    noStroke();
    textStyle(BOLD);
    textSize(17);
    textAlign(CENTER, TOP);
    text("SIFT: Mike Caulfield's Four-Step Method", containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(11);
    fill('#555');
    text('You encounter a health claim online. Click each step to see how to evaluate it.', containerWidth / 2, 32);

    // Top input bar
    const inputY = 50;
    const inputX = 20;
    const inputW = containerWidth - 40;
    noStroke();
    fill('#eef4fb');
    stroke('#1a3a6c');
    strokeWeight(1);
    rect(inputX, inputY, inputW, 18, 4);
    noStroke();
    fill('#1a3a6c');
    textStyle(BOLD);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('  You encounter a health claim online →', inputX + 8, inputY + 9);
    textStyle(NORMAL);

    const L = getLayout();
    const startY = inputY + 30;

    // Flowchart on left
    for (let i = 0; i < steps.length; i++) {
        const y = startY + i * (L.boxH + L.gap);
        const s = steps[i];
        const sel = (selectedIdx === i);
        drawStepBox(L.padLeft, y, L.leftW, L.boxH, s, sel);
        if (i < steps.length - 1) {
            drawConnector(L.padLeft + L.leftW / 2, y + L.boxH, y + L.boxH + L.gap, steps[i + 1].question);
        }
    }

    // Right panel: detail
    const panelX = L.padLeft + L.leftW + 30;
    const panelY = startY;
    const panelW = containerWidth - panelX - 20;
    const panelH = 4 * L.boxH + 3 * L.gap;
    drawDetailPanel(panelX, panelY, panelW, panelH);

    // Control band
    noStroke();
    fill(248);
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke('#dee2e6');
    line(0, drawHeight, containerWidth, drawHeight);

    if (overAnyStep()) cursor(HAND); else cursor(ARROW);
}

function drawStepBox(x, y, w, h, s, sel) {
    const col = color(s.color);
    if (sel) {
        stroke(s.color);
        strokeWeight(3);
        fill(red(col), green(col), blue(col), 50);
    } else {
        stroke(s.color);
        strokeWeight(1.5);
        fill(red(col), green(col), blue(col), 25);
    }
    rect(x, y, w, h, 8);

    // Letter circle
    noStroke();
    fill(s.color);
    ellipse(x + 32, y + h / 2, 44, 44);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(22);
    text(s.letter, x + 32, y + h / 2);

    // Title and one-line
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(15);
    text(s.title, x + 64, y + 14);
    textStyle(NORMAL);
    textSize(11);
    fill('#444');
    text(s.definition.split('.')[0] + '.', x + 64, y + 36, w - 74, h - 38);
}

function drawConnector(cx, yTop, yBot, label) {
    // Just a vertical arrow with a label box (cleaner than a diamond shape)
    stroke('#888');
    strokeWeight(1.5);
    line(cx, yTop, cx, yBot - 4);
    noStroke();
    fill('#888');
    triangle(cx - 4, yBot - 4, cx + 4, yBot - 4, cx, yBot + 2);

    // Label box
    const my = (yTop + yBot) / 2;
    const boxW = 240;
    const boxH = 22;
    noStroke();
    fill('#fff');
    stroke('#bbb');
    strokeWeight(1);
    rect(cx - boxW / 2, my - boxH / 2, boxW, boxH, 11);
    noStroke();
    fill('#555');
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    textSize(10.5);
    text(label, cx, my);
    textStyle(NORMAL);
}

function drawDetailPanel(x, y, w, h) {
    const s = steps[selectedIdx];

    // Outline
    stroke(s.color);
    strokeWeight(2);
    fill('#fafbfc');
    rect(x, y, w, h, 8);

    // Header strip
    noStroke();
    fill(s.color);
    rect(x, y, w, 36, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(15);
    text('  ' + s.letter + ' — ' + s.title, x + 6, y + 18);

    let cy = y + 46;
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text('Definition', x + 14, cy);
    cy += 16;
    textStyle(NORMAL);
    textSize(11.5);
    fill('#222');
    text(s.definition, x + 14, cy, w - 28, 60);
    cy += 52;

    textStyle(BOLD);
    fill('#1a3a6c');
    textSize(12);
    text('How to do it', x + 14, cy);
    cy += 16;
    textStyle(NORMAL);
    textSize(11);
    fill('#222');
    for (let i = 0; i < s.howto.length; i++) {
        text('•  ' + s.howto[i], x + 14, cy, w - 28, 30);
        cy += 26;
    }

    cy += 4;
    textStyle(BOLD);
    fill('#1a3a6c');
    textSize(12);
    text('COVID-19 example', x + 14, cy);
    cy += 16;
    textStyle(NORMAL);
    textSize(11);
    fill('#222');
    text(s.example, x + 14, cy, w - 28, 80);
}

function overAnyStep() {
    if (mouseY > drawHeight) return false;
    return stepUnderMouse() >= 0;
}

function stepUnderMouse() {
    const L = getLayout();
    const startY = 80;
    for (let i = 0; i < steps.length; i++) {
        const y = startY + i * (L.boxH + L.gap);
        if (mouseX >= L.padLeft && mouseX <= L.padLeft + L.leftW && mouseY >= y && mouseY <= y + L.boxH) {
            return i;
        }
    }
    return -1;
}

function mousePressed() {
    const idx = stepUnderMouse();
    if (idx >= 0) selectedIdx = idx;
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
