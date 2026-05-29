// The 10 Essential Public Health Services
// CANVAS_HEIGHT: 620
let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let services;
let selectedSegment = null;
let selectedFunction = null;
let hoverEquity = false;
let resetBtn;

const COLORS = {
    Assessment: '#69b3e7',
    'Policy Development': '#3aa898',
    Assurance: '#5cb85c',
    Equity: '#b67ec9'
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');
    buildServices();

    resetBtn = createButton('Reset selection');
    resetBtn.position(20, drawHeight + 22);
    resetBtn.mousePressed(() => { selectedSegment = null; selectedFunction = null; });
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke(); textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('The 10 Essential Public Health Services', containerWidth / 2, 8);
    textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('Click a spoke for detail. Click "Equity" center for the cross-cutting theme.',
        containerWidth / 2, 30);

    drawWheel();
    drawInfoPanel();
    drawControlArea();
}

function drawWheel() {
    const cx = containerWidth * 0.30;
    const cy = 280;
    const rOuter = 200;
    const rInner = 130;
    const rCore = 70;

    // Inner core function arcs
    // Assessment: services 1-2 (top-right), Policy: 3-5 (bottom), Assurance: 6-10 (top-left)
    // Place: start at -90deg (top) and go clockwise
    // 10 outer segments of 36 deg each.
    // Assessment (1,2) at indices 0,1
    // Policy (3,4,5) at indices 2,3,4
    // Assurance (6-10) at indices 5,6,7,8,9
    // -> Assessment arc covers indices 0..1 = -90 to -90+72
    // -> Policy arc covers indices 2..4 = -90+72 to -90+72+108
    // -> Assurance arc covers indices 5..9 = -90+180 to -90+360

    const segAngle = TWO_PI / 10;
    const startAngle = -HALF_PI; // top

    // Inner ring arcs
    drawArcSector(cx, cy, rInner, startAngle, startAngle + 2 * segAngle, COLORS.Assessment, 'Assessment',
        selectedFunction === 'Assessment');
    drawArcSector(cx, cy, rInner, startAngle + 2 * segAngle, startAngle + 5 * segAngle, COLORS['Policy Development'],
        'Policy Development', selectedFunction === 'Policy Development');
    drawArcSector(cx, cy, rInner, startAngle + 5 * segAngle, startAngle + 10 * segAngle, COLORS.Assurance,
        'Assurance', selectedFunction === 'Assurance');

    // Outer segments
    for (let i = 0; i < 10; i++) {
        const s = services[i];
        const a1 = startAngle + i * segAngle;
        const a2 = a1 + segAngle;
        const isSel = selectedSegment === i;
        const col = COLORS[s.func];
        push();
        if (isSel) { stroke('#d4a017'); strokeWeight(4); }
        else { stroke('#fff'); strokeWeight(2); }
        fill(col);
        arc(cx, cy, rOuter * 2, rOuter * 2, a1, a2, PIE);
        // donut hole
        noStroke();
        fill(255);
        arc(cx, cy, rInner * 2, rInner * 2, a1 - 0.02, a2 + 0.02, PIE);
        pop();
        s._angleMid = (a1 + a2) / 2;
        s._a1 = a1; s._a2 = a2;
    }

    // Redraw inner ring on top
    drawArcSector(cx, cy, rInner, startAngle, startAngle + 2 * segAngle, COLORS.Assessment, 'Assessment',
        selectedFunction === 'Assessment');
    drawArcSector(cx, cy, rInner, startAngle + 2 * segAngle, startAngle + 5 * segAngle, COLORS['Policy Development'],
        'Policy Development', selectedFunction === 'Policy Development');
    drawArcSector(cx, cy, rInner, startAngle + 5 * segAngle, startAngle + 10 * segAngle, COLORS.Assurance,
        'Assurance', selectedFunction === 'Assurance');

    // Core circle
    noStroke();
    fill(hoverEquity ? color(180, 130, 200) : color(COLORS.Equity));
    ellipse(cx, cy, rCore * 2);
    fill('#fff'); textSize(15); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('Equity', cx, cy - 4);
    textSize(9); textStyle(NORMAL);
    text('(2020 revision)', cx, cy + 14);

    // Outer segment labels
    for (let i = 0; i < 10; i++) {
        const s = services[i];
        const a = s._angleMid;
        const lr = (rOuter + rInner) / 2;
        const lx = cx + cos(a) * lr;
        const ly = cy + sin(a) * lr;
        fill('#fff'); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
        const num = (i + 1).toString();
        // number badge
        fill('#fff'); ellipse(lx, ly - 8, 18, 18);
        fill('#1a3a6c'); text(num, lx, ly - 8);
        // label below number
        fill('#fff'); textSize(10); textStyle(BOLD);
        text(s.short, lx, ly + 8);
        textStyle(NORMAL);
    }

    // store hit info
    Wheel.cx = cx; Wheel.cy = cy; Wheel.rOuter = rOuter; Wheel.rInner = rInner; Wheel.rCore = rCore;
    Wheel.segAngle = segAngle; Wheel.startAngle = startAngle;
}

const Wheel = {};

function drawArcSector(cx, cy, r, a1, a2, col, label, isSel) {
    push();
    if (isSel) { stroke('#d4a017'); strokeWeight(3); }
    else { stroke('#fff'); strokeWeight(2); }
    fill(col);
    arc(cx, cy, r * 2, r * 2, a1, a2, PIE);
    pop();
    // label at middle of arc, pushed outward to avoid core circle
    const a = (a1 + a2) / 2;
    const lr = r * 0.82;
    const lx = cx + cos(a) * lr;
    const ly = cy + sin(a) * lr;
    fill('#fff'); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
    // multi-word label rotated for readability
    const parts = label.split(' ');
    for (let i = 0; i < parts.length; i++) {
        text(parts[i], lx, ly - (parts.length - 1) * 7 + i * 14);
    }
    textStyle(NORMAL);
}

function drawInfoPanel() {
    const x = containerWidth * 0.62;
    const y = 60;
    const w = containerWidth - x - 20;
    const h = 460;
    fill('#f5f7fb'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    if (hoverEquity) {
        fill(COLORS.Equity); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
        text('Equity — the cross-cutting theme', x + 14, y + 12);
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        wrapAndDraw('The 2020 revision made equity an explicit thread through all 10 services. Every service must be performed equitably, with particular attention to historically underserved communities.',
            x + 14, y + 38, w - 28, 15);
        return;
    }

    if (selectedSegment !== null) {
        const s = services[selectedSegment];
        fill(COLORS[s.func]); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
        text((selectedSegment + 1) + ' — ' + s.func.toUpperCase(), x + 14, y + 10);
        fill('#1a3a6c'); textSize(14);
        const nameLines = wrapText(s.name, w - 28, 14);
        for (let i = 0; i < nameLines.length; i++) {
            text(nameLines[i], x + 14, y + 28 + i * 18);
        }
        const after = y + 28 + nameLines.length * 18 + 8;
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        wrapAndDraw(s.description, x + 14, after, w - 28, 14);
        const dLines = wrapText(s.description, w - 28, 11);
        const exY = after + dLines.length * 14 + 12;
        fill('#1a3a6c'); textStyle(BOLD); textSize(11);
        text('Example', x + 14, exY);
        textStyle(NORMAL);
        fill('#222');
        wrapAndDraw(s.example, x + 14, exY + 16, w - 28, 14);
    } else if (selectedFunction) {
        fill(COLORS[selectedFunction]); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
        text(selectedFunction, x + 14, y + 12);
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        const fnDesc = {
            Assessment: 'Assessment activities monitor health status and investigate problems. They tell us what is happening, to whom, and why.',
            'Policy Development': 'Policy development engages communities, builds partnerships, and crafts laws and plans that improve health.',
            Assurance: 'Assurance ensures services are available, the workforce is competent, programs work, and new ideas are studied.'
        };
        wrapAndDraw(fnDesc[selectedFunction], x + 14, y + 36, w - 28, 14);
    } else {
        fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
        text('Three core functions', x + 14, y + 12);
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        text('Assessment (services 1–2)', x + 14, y + 36);
        text('Policy Development (services 3–5)', x + 14, y + 54);
        text('Assurance (services 6–10)', x + 14, y + 72);
        text('Equity (cross-cutting, 2020 revision)', x + 14, y + 90);

        fill('#1a3a6c'); textSize(13); textStyle(BOLD);
        text('How to use this wheel', x + 14, y + 120);
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        wrapAndDraw('Click any numbered outer spoke to see the service description and an example. Click an inner arc to see the role of that core function. Hover the center to read the equity mandate.',
            x + 14, y + 142, w - 28, 14);
    }
}

function drawControlArea() {
    fill('#f5f5f5'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    fill('#444'); textSize(11); textAlign(LEFT, TOP);
    text('Adapted from the Centers for Disease Control and Prevention (CDC), 2020 revision.',
        20, drawHeight + 56);
}

function mouseMoved() {
    if (!Wheel.cx) return;
    const d = dist(mouseX, mouseY, Wheel.cx, Wheel.cy);
    hoverEquity = d < Wheel.rCore;
}

function mousePressed() {
    if (!Wheel.cx) return;
    const d = dist(mouseX, mouseY, Wheel.cx, Wheel.cy);
    if (d < Wheel.rCore) {
        // Equity click toggles equity panel
        selectedSegment = null; selectedFunction = null; return;
    }
    if (d > Wheel.rOuter) return;
    let a = atan2(mouseY - Wheel.cy, mouseX - Wheel.cx);
    // normalize
    while (a < Wheel.startAngle) a += TWO_PI;
    while (a > Wheel.startAngle + TWO_PI) a -= TWO_PI;
    const rel = a - Wheel.startAngle;
    const idx = floor(rel / Wheel.segAngle);
    if (d > Wheel.rInner) {
        if (idx >= 0 && idx < 10) {
            selectedSegment = idx;
            selectedFunction = null;
        }
    } else {
        // inner ring
        if (idx <= 1) selectedFunction = 'Assessment';
        else if (idx <= 4) selectedFunction = 'Policy Development';
        else selectedFunction = 'Assurance';
        selectedSegment = null;
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
    textAlign(LEFT, TOP);
    const lines = wrapText(str, maxW, 11);
    for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lineH);
}

function buildServices() {
    services = [
        { short: 'Monitor', func: 'Assessment',
          name: 'Monitor population health status',
          description: 'Assess and monitor population health status, factors that influence health, and community needs and assets.',
          example: 'A state health department publishes an annual community health assessment with vital statistics and chronic disease prevalence by census tract.' },
        { short: 'Diagnose', func: 'Assessment',
          name: 'Investigate, diagnose, and address hazards',
          description: 'Investigate, diagnose, and address health problems and hazards affecting the population.',
          example: 'Epidemiologists trace a Salmonella outbreak to a single distribution center using shopper-card and supply-chain data.' },
        { short: 'Inform', func: 'Policy Development',
          name: 'Communicate effectively to inform and educate',
          description: 'Communicate effectively to inform and educate people about health, factors that influence it, and how to improve it.',
          example: 'A health department runs a multilingual campaign explaining how to read a food label and where to find affordable fresh produce.' },
        { short: 'Mobilize', func: 'Policy Development',
          name: 'Strengthen, support, and mobilize communities',
          description: 'Build and maintain community partnerships and strengthen community engagement so people can act for their own health.',
          example: 'A community coalition co-led by residents redesigns a neighborhood walking route to be safer and more accessible.' },
        { short: 'Policies', func: 'Policy Development',
          name: 'Create, champion, and implement policies',
          description: 'Create, champion, and implement policies, plans, and laws that impact health.',
          example: 'A city council passes a smoke-free park ordinance after the health department presents evidence on secondhand smoke exposure.' },
        { short: 'Enforce', func: 'Assurance',
          name: 'Use legal and regulatory actions',
          description: 'Use legal and regulatory actions to improve and protect the public\'s health.',
          example: 'Restaurant inspectors close a facility after repeated violations of refrigeration and handwashing requirements.' },
        { short: 'Link', func: 'Assurance',
          name: 'Assure an effective system of access',
          description: 'Assure an effective system that enables equitable access to the services and care that people need.',
          example: 'A community health worker program links uninsured residents to a primary-care home and prescription assistance.' },
        { short: 'Workforce', func: 'Assurance',
          name: 'Build a diverse and skilled workforce',
          description: 'Build and support a diverse and skilled public health workforce.',
          example: 'A state offers a loan-repayment program for nurses who agree to serve in rural and tribal health districts.' },
        { short: 'Evaluate', func: 'Assurance',
          name: 'Improve and innovate through evaluation',
          description: 'Improve and innovate public health functions through ongoing evaluation, research, and continuous quality improvement.',
          example: 'A WIC clinic tracks appointment-show rates by language and revises its reminder system to close an equity gap.' },
        { short: 'Research', func: 'Assurance',
          name: 'Build and maintain a strong organizational infrastructure',
          description: 'Build and maintain a strong organizational infrastructure for public health, including financing, information systems, and research.',
          example: 'A regional health information exchange enables hospitals, clinics, and the health department to share outbreak data in near real time.' }
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
