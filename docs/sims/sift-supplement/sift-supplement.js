// SIFT Applied to a Supplement Claim
// CANVAS_HEIGHT: 660
let canvasWidth = 820;
let drawHeight = 540;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

const CLAIM_TEXT = 'Tumeric CURES inflammation and reverses arthritis — 1,200 patients CURED, study shows.';

let steps = [
    {
        letter: 'S', title: 'Stop',          color: '#e74c3c',
        heading: 'Emotional hook detected',
        body: [
            'Words like "CURES" and "1,200 patients CURED" are emotional triggers, not evidence. They promise certainty for a chronic disease that has no known cure.',
            'Stop. Notice your reaction. Do not share or buy yet.',
            'Pause indicator: ●●○○ — give yourself 30 seconds before reacting.'
        ],
        verdict: 'Stop — emotional language used in place of evidence.'
    },
    {
        letter: 'I', title: 'Investigate Source', color: '#e67e22',
        heading: 'NaturalHealthToday.com',
        body: [
            'Header: NaturalHealthToday.com | "Buy Turmeric Now →" affiliate link',
            'No author name. No publication date. No editorial board.',
            'Red flags:',
            '  ✗ No author or credentials',
            '  ✗ No institutional affiliation',
            '  ✗ Direct affiliate link to buy the product'
        ],
        verdict: 'Source has commercial interest and no medical credentials.'
    },
    {
        letter: 'F', title: 'Find Coverage', color: '#2980b9',
        heading: 'What do reputable sources say?',
        body: [
            'Google: "turmeric arthritis evidence"',
            '1. Cochrane Review: "insufficient evidence" to recommend.',
            '2. PubMed: 23-patient pilot trial, no control group.',
            '3. Arthritis Foundation: "promising but not conclusive."',
            'No major medical body endorses turmeric as a cure.'
        ],
        verdict: 'Reputable sources do NOT support a "cure" claim.'
    },
    {
        letter: 'T', title: 'Trace Origins', color: '#27ae60',
        heading: 'Where did 1,200 patients come from?',
        body: [
            'Tracing the citation: not a peer-reviewed RCT.',
            'Original is a conference ABSTRACT from a company-sponsored symposium.',
            'The 1,200 number is CUMULATIVE enrollment across 8 different studies — different doses, different designs, different outcomes.',
            'No single trial of 1,200 patients exists.'
        ],
        verdict: 'Number is fabricated by combining incomparable studies.'
    }
];

let selectedIdx = -1;
let showVerdict = false;
let resetBtn;
let verdictBtn;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    resetBtn = createButton('Reset');
    resetBtn.position(12, drawHeight + 10);
    resetBtn.mousePressed(() => { selectedIdx = -1; showVerdict = false; });

    verdictBtn = createButton('Show Verdict');
    verdictBtn.position(80, drawHeight + 10);
    verdictBtn.mousePressed(() => { showVerdict = true; selectedIdx = -1; });
}

function getButtonLayout() {
    const btnW = (containerWidth - 100) / 4;
    const btnH = 70;
    const startX = 20;
    const gap = 12;
    return { btnW, btnH, startX, gap, y: 110 };
}

function draw() {
    background(255);

    // Title
    fill('#1a3a6c');
    noStroke();
    textStyle(BOLD);
    textSize(17);
    textAlign(CENTER, TOP);
    text('Applying SIFT to a Supplement Health Claim', containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(11);
    fill('#555');
    text('Click each letter to walk through the evaluation. Then click Show Verdict for a summary.', containerWidth / 2, 32);

    // Claim quote box
    const cx = 20, cy = 54, cw = containerWidth - 40, ch = 42;
    noStroke();
    fill('#fff8dc');
    rect(cx, cy, cw, ch, 6);
    stroke('#b58900');
    strokeWeight(1.5);
    noFill();
    rect(cx, cy, cw, ch, 6);
    noStroke();
    fill('#5b4500');
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    textSize(12);
    text('Claim seen online:  "' + CLAIM_TEXT + '"', cx + 10, cy + ch / 2, cw - 20);
    textStyle(NORMAL);

    // SIFT buttons row
    const L = getButtonLayout();
    for (let i = 0; i < steps.length; i++) {
        const bx = L.startX + i * (L.btnW + L.gap);
        const sel = (selectedIdx === i);
        drawSiftButton(bx, L.y, L.btnW, L.btnH, steps[i], sel);
    }

    // Detail / verdict panel
    drawPanel(L.y + L.btnH + 16);

    // Control band
    noStroke();
    fill(248);
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke('#dee2e6');
    line(0, drawHeight, containerWidth, drawHeight);

    if (overAnyButton()) cursor(HAND); else cursor(ARROW);
}

function drawSiftButton(x, y, w, h, s, sel) {
    const col = color(s.color);
    if (sel) {
        stroke(s.color);
        strokeWeight(3);
        fill(red(col), green(col), blue(col), 70);
    } else {
        stroke(s.color);
        strokeWeight(1.5);
        fill(red(col), green(col), blue(col), 30);
    }
    rect(x, y, w, h, 10);

    noStroke();
    fill(s.color);
    ellipse(x + 30, y + h / 2, 38, 38);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(20);
    text(s.letter, x + 30, y + h / 2);

    fill('#1a3a6c');
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(13);
    text(s.title, x + 56, y + h / 2 - 6);
    textStyle(NORMAL);
    textSize(10);
    fill('#555');
    text('Click to apply', x + 56, y + h / 2 + 12);
}

function drawPanel(y) {
    const px = 20;
    const pw = containerWidth - 40;
    const ph = drawHeight - y - 10;

    if (showVerdict) {
        drawVerdictPanel(px, y, pw, ph);
        return;
    }

    if (selectedIdx < 0) {
        // Hint panel
        noStroke();
        fill('#f4f7fb');
        rect(px, y, pw, ph, 6);
        stroke('#1a3a6c');
        strokeWeight(1);
        noFill();
        rect(px, y, pw, ph, 6);
        noStroke();
        fill('#1a3a6c');
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(13);
        text('Click S, I, F, or T to walk through the evaluation.', px + pw / 2, y + ph / 2 - 10);
        textStyle(NORMAL);
        textSize(11);
        fill('#555');
        text('Then press "Show Verdict" for the combined assessment.', px + pw / 2, y + ph / 2 + 12);
        return;
    }

    const s = steps[selectedIdx];
    // Outline
    stroke(s.color);
    strokeWeight(2);
    fill('#fafbfc');
    rect(px, y, pw, ph, 8);
    // Header strip
    noStroke();
    fill(s.color);
    rect(px, y, pw, 30, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(13);
    text('  ' + s.letter + ' — ' + s.title + ': ' + s.heading, px + 6, y + 15);

    let cy = y + 40;
    fill('#222');
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    textSize(11.5);
    for (let line of s.body) {
        text('•  ' + line, px + 14, cy, pw - 28, 40);
        cy += 22;
    }
}

function drawVerdictPanel(px, y, pw, ph) {
    stroke('#1a3a6c');
    strokeWeight(2);
    fill('#fafbfc');
    rect(px, y, pw, ph, 8);
    noStroke();
    fill('#1a3a6c');
    rect(px, y, pw, 30, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(13);
    text('  SIFT Verdict Summary', px + 6, y + 15);

    let cy = y + 40;
    for (let i = 0; i < steps.length; i++) {
        const s = steps[i];
        // colored letter chip
        noStroke();
        fill(s.color);
        rect(px + 14, cy, 24, 20, 4);
        fill(255);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(12);
        text(s.letter, px + 26, cy + 10);
        textAlign(LEFT, CENTER);
        fill('#1a3a6c');
        textStyle(BOLD);
        text(s.title + ':', px + 46, cy + 10);
        textStyle(NORMAL);
        fill('#222');
        textSize(11);
        text(s.verdict, px + 130, cy + 10, pw - 140);
        cy += 28;
    }
    // Final line
    cy += 4;
    noStroke();
    fill('#c0392b');
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(12);
    text('Conclusion: Do not act on this claim. It fails every SIFT check.', px + 14, cy + 10);
    textStyle(NORMAL);
}

function overAnyButton() {
    if (mouseY > drawHeight) return false;
    return buttonUnderMouse() >= 0;
}

function buttonUnderMouse() {
    const L = getButtonLayout();
    for (let i = 0; i < steps.length; i++) {
        const bx = L.startX + i * (L.btnW + L.gap);
        if (mouseX >= bx && mouseX <= bx + L.btnW && mouseY >= L.y && mouseY <= L.y + L.btnH) {
            return i;
        }
    }
    return -1;
}

function mousePressed() {
    const idx = buttonUnderMouse();
    if (idx >= 0) {
        showVerdict = false;
        selectedIdx = (selectedIdx === idx) ? -1 : idx;
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
