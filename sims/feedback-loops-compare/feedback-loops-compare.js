// Reinforcing vs Balancing Loops
// CANVAS_HEIGHT: 720
let canvasWidth = 900;
let drawHeight = 620;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let runBtn, resetBtn, speedSlider;
let running = false;
let t = 0; // simulation time
let infected = 5;
let immune = 0;
let suscept = 100;
let history; // {tArr, infArr, immArr}
let selectedArrow = null; // string id e.g. 'L-AB'

const POP = 100;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    runBtn = createButton('Run simulation');
    runBtn.position(20, drawHeight + 20);
    runBtn.mousePressed(() => { running = !running; runBtn.html(running ? 'Pause' : 'Run simulation'); });

    resetBtn = createButton('Reset');
    resetBtn.position(160, drawHeight + 20);
    resetBtn.mousePressed(resetSim);

    speedSlider = createSlider(1, 10, 4, 1);
    speedSlider.position(260, drawHeight + 22);
    speedSlider.style('width', '180px');

    resetSim();
}

function resetSim() {
    t = 0; infected = 5; immune = 0; suscept = POP - infected - immune;
    history = { tArr: [0], infArr: [infected], immArr: [immune] };
    running = false; if (runBtn) runBtn.html('Run simulation');
}

function draw() {
    background(255);

    fill('#1a3a6c'); noStroke(); textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Reinforcing vs. Balancing Loops', containerWidth / 2, 8);
    textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('Left = epidemic growth (R-loop)   |   Right = population immunity (B-loop)',
        containerWidth / 2, 30);

    if (running) stepSim();

    drawLeftLoop();
    drawRightLoop();
    drawChart();
    drawArrowDetail();
    drawControlArea();
}

function stepSim() {
    const speed = speedSlider.value();
    for (let s = 0; s < speed; s++) {
        const beta = 0.35;
        const gamma = 0.10;
        const N = POP;
        const dI = beta * infected * suscept / N - gamma * infected;
        const dR = gamma * infected;
        infected = max(0, infected + dI * 0.1);
        immune = min(N, immune + dR * 0.1);
        suscept = max(0, N - infected - immune);
        t += 0.1;
        if (history.tArr.length === 0 || t - history.tArr[history.tArr.length - 1] > 0.2) {
            history.tArr.push(t);
            history.infArr.push(infected);
            history.immArr.push(immune);
        }
        if (t > 60) { running = false; runBtn.html('Run simulation'); break; }
    }
}

// Loop drawing geometry
const L_LOOP = { cx: 200, cy: 200, r: 110 };
const R_LOOP = { cx: 600, cy: 200, r: 110 };

function nodePositions(loop) {
    // Three nodes for left (Infected, Transmission, New Cases) and four for right (Susceptible, Vaccination Rate, Immune, Transmission Rate)
    return loop.map(name => ({ name }));
}

function drawLeftLoop() {
    // Title
    fill('#a8324a'); noStroke(); textSize(13); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Epidemic Spread (R)', L_LOOP.cx, 56);
    textStyle(NORMAL);

    // 3 nodes in a triangle
    const a = { x: L_LOOP.cx, y: L_LOOP.cy - 80, label: 'Infected\nIndividuals' };
    const b = { x: L_LOOP.cx + 110, y: L_LOOP.cy + 60, label: 'Transmission\nEvents' };
    const c = { x: L_LOOP.cx - 110, y: L_LOOP.cy + 60, label: 'New\nCases' };

    drawNode(a, '#a8324a');
    drawNode(b, '#a8324a');
    drawNode(c, '#a8324a');

    drawArrow(a, b, '+', 'L-AB', '#a8324a');
    drawArrow(b, c, '+', 'L-BC', '#a8324a');
    drawArrow(c, a, '+', 'L-CA', '#a8324a');

    // R loop badge in center
    noStroke();
    fill('#a8324a'); textSize(22); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('R', L_LOOP.cx, L_LOOP.cy - 5);
    textSize(10); textStyle(NORMAL);
    fill('#a8324a');
    text('reinforcing', L_LOOP.cx, L_LOOP.cy + 15);
}

function drawRightLoop() {
    fill('#2e7a4e'); noStroke(); textSize(13); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Population Immunity (B)', R_LOOP.cx, 56);
    textStyle(NORMAL);

    // 4 nodes diamond
    const a = { x: R_LOOP.cx, y: R_LOOP.cy - 90, label: 'Susceptible\nPopulation' };
    const b = { x: R_LOOP.cx + 115, y: R_LOOP.cy, label: 'Vaccination\nRate' };
    const c = { x: R_LOOP.cx, y: R_LOOP.cy + 90, label: 'Immune\nPopulation' };
    const d = { x: R_LOOP.cx - 115, y: R_LOOP.cy, label: 'Transmission\nRate' };

    drawNode(a, '#2e7a4e');
    drawNode(b, '#2e7a4e');
    drawNode(c, '#2e7a4e');
    drawNode(d, '#2e7a4e');

    drawArrow(a, b, '+', 'R-AB', '#2e7a4e');
    drawArrow(b, c, '+', 'R-BC', '#2e7a4e');
    drawArrow(c, d, '-', 'R-CD', '#2e7a4e');
    drawArrow(d, a, '+', 'R-DA', '#2e7a4e');

    noStroke();
    fill('#2e7a4e'); textSize(22); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('B', R_LOOP.cx, R_LOOP.cy - 5);
    textSize(10); textStyle(NORMAL);
    fill('#2e7a4e');
    text('balancing', R_LOOP.cx, R_LOOP.cy + 15);
}

function drawNode(p, col) {
    fill(255); stroke(col); strokeWeight(2);
    ellipse(p.x, p.y, 78, 50);
    noStroke();
    fill(col); textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
    const lines = p.label.split('\n');
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], p.x, p.y - 6 + i * 12);
    }
    textStyle(NORMAL);
}

const arrowBounds = {};

function drawArrow(p1, p2, polarity, id, col) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    // shorten endpoints to clear nodes (ellipse radius ~ 26)
    const x1 = p1.x + ux * 26;
    const y1 = p1.y + uy * 18;
    const x2 = p2.x - ux * 26;
    const y2 = p2.y - uy * 18;

    const isSel = selectedArrow === id;
    stroke(isSel ? color('#1a3a6c') : col);
    strokeWeight(isSel ? 3 : 2);
    line(x1, y1, x2, y2);

    // arrowhead
    const ang = atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(ang);
    fill(isSel ? color('#1a3a6c') : col); noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();

    // polarity label
    noStroke();
    fill(255); stroke(isSel ? color('#1a3a6c') : col); strokeWeight(1);
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    ellipse(mx, my, 16, 16);
    noStroke();
    fill(polarity === '+' ? color('#2e7a4e') : color('#a8324a'));
    textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(polarity, mx, my - 1);
    textStyle(NORMAL);

    arrowBounds[id] = { mx, my, polarity, p1, p2 };
}

function drawChart() {
    const x = 20;
    const y = 360;
    const w = containerWidth - 40;
    const h = 150;
    fill('#fafafa'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    push();
    fill('#1a3a6c'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Live simulation: Infected (red, R-loop) vs. Immune (green, B-loop)', x + 10, y + 6);
    pop();

    // axes
    const ax = x + 40;
    const ay = y + 28;
    const aw = w - 60;
    const ah = h - 50;
    stroke('#888'); strokeWeight(1);
    line(ax, ay, ax, ay + ah);
    line(ax, ay + ah, ax + aw, ay + ah);
    noStroke();
    fill('#666'); textSize(10); textAlign(RIGHT, CENTER);
    text('100', ax - 4, ay);
    text('0', ax - 4, ay + ah);
    textAlign(LEFT, TOP);
    text('time', ax + aw - 22, ay + ah + 4);

    // plot
    if (history.tArr.length > 1) {
        const tMax = max(20, max(history.tArr));
        noFill(); strokeWeight(2);
        stroke('#a8324a');
        beginShape();
        for (let i = 0; i < history.tArr.length; i++) {
            const px = ax + (history.tArr[i] / tMax) * aw;
            const py = ay + ah - (history.infArr[i] / POP) * ah;
            vertex(px, py);
        }
        endShape();
        stroke('#2e7a4e');
        beginShape();
        for (let i = 0; i < history.tArr.length; i++) {
            const px = ax + (history.tArr[i] / tMax) * aw;
            const py = ay + ah - (history.immArr[i] / POP) * ah;
            vertex(px, py);
        }
        endShape();
    }

    // legend
    noStroke();
    fill('#a8324a'); rect(x + w - 200, y + 6, 12, 12);
    fill('#222'); textSize(11); textAlign(LEFT, CENTER);
    text('Infected (exponential)', x + w - 184, y + 12);
    fill('#2e7a4e'); rect(x + w - 200, y + 22, 12, 12);
    fill('#222');
    text('Immune (S-shaped)', x + w - 184, y + 28);
}

function drawArrowDetail() {
    const x = 20;
    const y = 525;
    const w = containerWidth - 40;
    const h = drawHeight - y - 10;
    fill('#f5f7fb'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    fill('#1a3a6c'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Arrow detail', x + 12, y + 8);
    textStyle(NORMAL);

    const expl = {
        'L-AB': '+ : More infected individuals produce more transmission events.',
        'L-BC': '+ : More transmission events produce more new cases.',
        'L-CA': '+ : New cases add to the infected pool. Closing the R-loop drives exponential growth.',
        'R-AB': '+ : A larger susceptible population yields more people available to vaccinate.',
        'R-BC': '+ : A higher vaccination rate grows the immune population.',
        'R-CD': '- : A larger immune population reduces the transmission rate (herd effect).',
        'R-DA': '+ : Lower transmission preserves the susceptible pool; the loop balances spread.'
    };
    if (selectedArrow && expl[selectedArrow]) {
        fill('#222'); textSize(12);
        wrapAndDraw(expl[selectedArrow], x + 12, y + 28, w - 24, 16);
    } else {
        fill('#666'); textSize(12); textStyle(ITALIC);
        text('Click any arrow polarity (+/-) above to see what that link means.', x + 12, y + 28);
        textStyle(NORMAL);
    }
}

function drawControlArea() {
    fill('#f5f5f5'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    fill('#333'); textSize(11); textAlign(LEFT, TOP);
    text('Speed', 260, drawHeight + 6);
    fill('#444');
    text('Run the simulation to compare exponential growth (R-loop) with S-shaped stabilization (B-loop).',
        20, drawHeight + 60);
    text('Click a "+" or "-" on the diagrams to see what each polarity means.',
        20, drawHeight + 76);
}

function mousePressed() {
    for (const id in arrowBounds) {
        const b = arrowBounds[id];
        if (dist(mouseX, mouseY, b.mx, b.my) < 12) {
            selectedArrow = id; return;
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
    const lines = wrapText(str, maxW, 12);
    for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lineH);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    let w = (el && el.offsetWidth) ? el.offsetWidth : 0;
    if (!w) w = (typeof window !== 'undefined' && window.innerWidth) ? window.innerWidth : canvasWidth;
    containerWidth = w;
    L_LOOP.cx = containerWidth * 0.22;
    R_LOOP.cx = containerWidth * 0.72;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    // Update loop centers proportionally
    L_LOOP.cx = containerWidth * 0.22;
    R_LOOP.cx = containerWidth * 0.72;
}
