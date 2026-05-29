// Kingdon's Three Streams
// CANVAS_HEIGHT: 660
let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let speedSlider, resetBtn, alignBtn;
let particles;
let streams; // metadata
let selectedStream = null;
let windowOpen = false;
let windowFlashFrames = 0;
let aligned = false;
let alignT = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');
    initStreams();
    initParticles();

    speedSlider = createSlider(1, 8, 3, 1);
    speedSlider.position(80, drawHeight + 22);
    speedSlider.style('width', '160px');

    alignBtn = createButton('Align streams');
    alignBtn.position(260, drawHeight + 20);
    alignBtn.mousePressed(() => {
        aligned = !aligned;
        alignBtn.html(aligned ? 'Release streams' : 'Align streams');
        if (aligned) alignT = 0;
    });

    resetBtn = createButton('Reset');
    resetBtn.position(380, drawHeight + 20);
    resetBtn.mousePressed(() => {
        aligned = false;
        alignBtn.html('Align streams');
        windowFlashFrames = 0;
        initStreams(); initParticles();
        selectedStream = null;
    });
}

function initStreams() {
    streams = [
        {
            id: 'problem', name: 'Problem Stream', color: '#a8324a',
            shape: 'circle', y: 110, restY: 110,
            description: 'Conditions become defined as public problems through indicators (rising overdose deaths), focusing events (a celebrity death), or feedback from past programs. The problem stream is what gets framed as needing government action.',
            example: 'Opioid overdose deaths quadruple from 1999 to 2017; a state announces a public-health emergency.',
            items: ['opioid deaths', 'maternal mortality', 'youth vaping', 'gun violence']
        },
        {
            id: 'policy', name: 'Policy Stream', color: '#1a3a6c',
            shape: 'square', y: 210, restY: 210,
            description: 'Ideas, proposals, and solutions developed by researchers, advocates, and agencies. The "policy primeval soup" — proposals float around until one is technically feasible, value-acceptable, and ready when a window opens.',
            example: 'Prescription drug monitoring programs (PDMPs) were studied for years before becoming the standard policy response to opioid prescribing.',
            items: ['PDMP', 'Medicaid expand', 'sugar tax', 'naloxone law']
        },
        {
            id: 'politics', name: 'Politics Stream', color: '#2e7a4e',
            shape: 'triangle', y: 310, restY: 310,
            description: 'National mood, election results, changes in administration, interest-group pressure, and legislative turnover. The politics stream determines whether decision-makers are willing to act on a problem with a particular policy.',
            example: 'A new administration arrives committed to opioid response, and bipartisan congressional alarm aligns with state-level advocacy.',
            items: ['new admin', 'new Congress', 'public pressure', 'budget cycle']
        }
    ];
}

function initParticles() {
    particles = [];
    for (const s of streams) {
        for (let i = 0; i < 5; i++) {
            particles.push({
                streamId: s.id,
                x: random(0, 800),
                y: s.y + random(-12, 12),
                vx: 1,
                label: s.items[i % s.items.length],
                color: s.color,
                shape: s.shape
            });
        }
    }
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke(); textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text("Kingdon's Three Streams Model", containerWidth / 2, 8);
    textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('When all three streams converge at the policy window, a policy change becomes possible.',
        containerWidth / 2, 30);

    drawPolicyWindow();
    drawStreams();
    drawDetail();
    drawControlArea();

    // align logic
    if (aligned) {
        alignT = min(1, alignT + 0.02);
    } else {
        alignT = max(0, alignT - 0.02);
    }
    // ride streams toward middle when aligned
    for (const s of streams) {
        const target = lerp(s.restY, 210, alignT);
        s.y = target;
    }
    for (const p of particles) {
        const s = streams.find(s => s.id === p.streamId);
        p.y = lerp(p.y, s.y, 0.1);
    }

    // window open when streams aligned
    if (alignT > 0.85 && !windowOpen) {
        windowOpen = true;
        windowFlashFrames = 120;
    } else if (alignT < 0.5) {
        windowOpen = false;
    }
    if (windowFlashFrames > 0) windowFlashFrames--;
}

function drawPolicyWindow() {
    // Vertical gateway between x=540 and x=620 (will adjust to containerWidth)
    const cx = containerWidth * 0.7;
    const w = 70;
    const y1 = 70;
    const y2 = 360;
    if (windowOpen || windowFlashFrames > 0) {
        fill(255, 215, 0, 90); stroke('#d4a017'); strokeWeight(3);
    } else {
        fill(245, 247, 251); stroke('#cfd8e6'); strokeWeight(1);
    }
    rect(cx - w/2, y1, w, y2 - y1, 8);
    noStroke();
    fill(windowOpen ? '#b8860b' : '#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
    push();
    translate(cx, (y1 + y2) / 2);
    rotate(-HALF_PI);
    text('POLICY WINDOW', 0, 0);
    pop();
    textStyle(NORMAL);

    if (windowFlashFrames > 0) {
        const t = windowFlashFrames / 120;
        fill(212, 160, 23, 220 * t); noStroke();
        rect(cx - 200, 380, 400, 50, 8);
        fill(255); textSize(14); textStyle(BOLD); textAlign(CENTER, CENTER);
        text('POLICY CHANGE!', cx, 395);
        textStyle(NORMAL); textSize(11);
        text('e.g., SUPPORT Act for opioid response (2018)', cx, 415);
    }
}

function drawStreams() {
    // each stream is a horizontal flowing river
    for (const s of streams) {
        // river
        noStroke();
        fill(red(color(s.color)), green(color(s.color)), blue(color(s.color)), 35);
        rect(0, s.y - 22, containerWidth, 44, 6);

        // stream label
        fill(s.color); textSize(13); textStyle(BOLD); textAlign(LEFT, CENTER);
        text(s.name, 16, s.y);
        textStyle(NORMAL);

        // hit zone for clicks
        s._bounds = { x: 0, y: s.y - 22, w: containerWidth, h: 44 };
    }

    // particles
    const speed = speedSlider ? speedSlider.value() * 0.6 : 1.5;
    for (const p of particles) {
        p.x += speed;
        if (p.x > containerWidth + 40) p.x = -40;

        // draw shape
        noStroke();
        fill(p.color);
        if (p.shape === 'circle') ellipse(p.x, p.y, 14, 14);
        else if (p.shape === 'square') rect(p.x - 7, p.y - 7, 14, 14, 2);
        else triangle(p.x, p.y - 8, p.x - 8, p.y + 7, p.x + 8, p.y + 7);

        // label
        fill('#222'); textSize(9); textAlign(CENTER, CENTER);
        text(p.label, p.x, p.y + 18);
    }
}

function drawDetail() {
    const x = 20;
    const y = 430;
    const w = containerWidth - 40;
    const h = drawHeight - y - 10;
    fill('#f5f7fb'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    if (selectedStream) {
        const s = streams.find(s => s.id === selectedStream);
        fill(s.color); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
        text(s.name, x + 14, y + 8);
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        wrapAndDraw(s.description, x + 14, y + 30, w - 28, 14);
        fill('#1a3a6c'); textStyle(BOLD); textSize(11);
        text('Example', x + 14, y + 80);
        textStyle(NORMAL);
        fill('#222');
        wrapAndDraw(s.example, x + 14, y + 95, w - 28, 14);
    } else {
        fill('#1a3a6c'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
        text('Click a stream to learn its role', x + 14, y + 8);
        textStyle(NORMAL);
        fill('#222'); textSize(11);
        text('Problem stream (red circles): conditions framed as public problems.', x + 14, y + 28);
        text('Policy stream (blue squares): proposed solutions floating in expert circles.', x + 14, y + 44);
        text('Politics stream (green triangles): political mood, elections, advocacy.', x + 14, y + 60);
        text('Click "Align streams" to see how convergence opens a policy window.', x + 14, y + 80);
    }
}

function drawControlArea() {
    fill('#f5f5f5'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    fill('#333'); textSize(11); textAlign(LEFT, TOP);
    text('Speed', 22, drawHeight + 6);
    fill('#444');
    text('Adapted from John Kingdon (1984), "Agendas, Alternatives, and Public Policies."',
        20, drawHeight + 60);
    text('A policy entrepreneur exploits the brief moment when problem, policy, and politics align.',
        20, drawHeight + 76);
}

function mousePressed() {
    if (mouseY > drawHeight) return;
    for (const s of streams) {
        if (s._bounds && mouseY >= s._bounds.y && mouseY <= s._bounds.y + s._bounds.h
            && mouseX >= 0 && mouseX <= containerWidth) {
            selectedStream = s.id; return;
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
    textAlign(LEFT, TOP);
    const lines = wrapText(str, maxW, 11);
    for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lineH);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
