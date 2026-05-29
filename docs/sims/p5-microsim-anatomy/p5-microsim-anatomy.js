// p5.js MicroSim Anatomy
// CANVAS_HEIGHT: 700
let canvasWidth = 900;
let drawHeight = 620;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let runChk;
let resetBtn;
let highlightRegion = null;   // 'canvas' | 'controls' | 'readout' | 'container' | null
let highlightLine = -1;       // index of code line that maps to a region
let pulseT = 0;

// Mini SIR sim agents
let agents = [];
const N_AGENTS = 40;
let day = 0;
let dayFrame = 0;

const REGIONS = {
    canvas:    { color: [33, 150, 243],  label: 'Canvas Region', desc: 'Simulation visualization area' },
    controls:  { color: [76, 175, 80],   label: 'Controls Region', desc: 'Sliders, buttons, selects' },
    readout:   { color: [255, 152, 0],   label: 'Readout Region', desc: 'Text outputs (S/I/R counts, day)' },
    container: { color: [229, 57, 53],   label: 'Full Container', desc: 'The <main> element' }
};

// Code lines with optional mapping to region
const CODE_LINES = [
    { txt: 'function setup() {', region: null, color: '#a31515' },
    { txt: '  updateCanvasSize();   // <- ALWAYS FIRST', region: 'container', color: '#0d47a1' },
    { txt: '  canvas = createCanvas(cw, ch);', region: 'container', color: '#0d47a1' },
    { txt: '  canvas.parent(', region: 'container', color: '#0d47a1' },
    { txt: '    document.querySelector(\'main\'));', region: 'container', color: '#0d47a1' },
    { txt: '  // Create controls', region: 'controls', color: '#388e3c' },
    { txt: '  rSlider = createSlider(0, 1, .3, .01);', region: 'controls', color: '#388e3c' },
    { txt: '  resetBtn = createButton(\'Reset\');', region: 'controls', color: '#388e3c' },
    { txt: '}', region: null, color: '#a31515' },
    { txt: '', region: null, color: '#000' },
    { txt: 'function draw() {', region: null, color: '#a31515' },
    { txt: '  background(245);', region: 'canvas', color: '#1565c0' },
    { txt: '  updateSimulation();   // state logic', region: 'canvas', color: '#1565c0' },
    { txt: '  drawAgents();         // visual output', region: 'canvas', color: '#1565c0' },
    { txt: '  drawReadout();        // text overlay', region: 'readout', color: '#e65100' },
    { txt: '}', region: null, color: '#a31515' }
];

const FOOTGUNS = [
    { title: 'Forgetting updateCanvasSize()',
      body: 'Canvas has width=0 on load. Sketch appears blank until window resize.' },
    { title: 'Drawing controls manually on canvas',
      body: 'Breaks p5.js editor compatibility and accessibility (no keyboard focus).' },
    { title: 'State logic in draw() that should run once',
      body: 'draw() fires at 60 fps. Side effects (e.g. createButton) accumulate at 60/sec.' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    runChk = createCheckbox(' Mini SIR sim running', true);
    runChk.position(180, drawHeight + 28);

    resetBtn = createButton('Reset Highlights');
    resetBtn.position(20, drawHeight + 25);
    resetBtn.size(140, 32);
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.mousePressed(() => {
        highlightRegion = null;
        highlightLine = -1;
    });

    // Init mini SIR agents
    for (let i = 0; i < N_AGENTS; i++) {
        agents.push({
            x: random(20, 200),
            y: random(20, 200),
            vx: random(-1, 1),
            vy: random(-1, 1),
            state: 'S',
            timer: 0
        });
    }
    // Seed 3 infected
    for (let i = 0; i < 3; i++) {
        agents[i].state = 'I';
        agents[i].timer = 100;
    }
}

function draw() {
    background(255);
    pulseT += 0.06;

    // Title
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('p5.js MicroSim Anatomy - Regions and Code Mapping', containerWidth / 2, 10);
    textStyle(NORMAL);

    // Layout: split panel — left = sim view, right = code view
    const split = containerWidth / 2;
    const topY = 50;
    const innerH = drawHeight - topY - 100; // leave room for legend/footgun

    // Outer container box (encompasses both halves)
    const outerX = 20;
    const outerY = topY;
    const outerW = containerWidth - 40;
    const outerH = innerH;
    drawRegionFrame('container', outerX, outerY, outerW, outerH);

    // LEFT — Canvas View region
    const leftPad = 12;
    const canvasX = outerX + leftPad;
    const canvasY = outerY + 30;
    const canvasW = split - outerX - 2 * leftPad;
    // Canvas + readout + controls stacked vertically inside left half
    const cRegH = innerH * 0.55;
    const rRegH = 50;
    const ctRegH = innerH - 30 - cRegH - rRegH - 24;

    drawRegionFrame('canvas', canvasX, canvasY, canvasW, cRegH);
    drawMiniSim(canvasX + 10, canvasY + 24, canvasW - 20, cRegH - 34);

    const readoutY = canvasY + cRegH + 6;
    drawRegionFrame('readout', canvasX, readoutY, canvasW, rRegH);
    drawReadoutSim(canvasX + 10, readoutY + 24, canvasW - 20, rRegH - 28);

    const controlsY = readoutY + rRegH + 6;
    drawRegionFrame('controls', canvasX, controlsY, canvasW, ctRegH);
    drawMockControls(canvasX + 10, controlsY + 24, canvasW - 20, ctRegH - 28);

    // RIGHT — Code View
    const codeX = split + 8;
    const codeY = outerY + 30;
    const codeW = outerX + outerW - codeX - leftPad;
    const codeH = innerH - 30;
    drawCodeView(codeX, codeY, codeW, codeH);

    // Bottom: legend + footguns
    drawFootgunPanel(20, outerY + outerH + 12, containerWidth - 40, 80);

    // Controls strip
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

    fill('#495057');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Click a region label OR a code line to highlight the matching element on the other side.',
         320, drawHeight + 28);
    text('SIR colors: green=Susceptible, yellow=Infected, red=Recovered.',
         320, drawHeight + 50);
}

function drawRegionFrame(key, x, y, w, h) {
    const r = REGIONS[key];
    const isHL = highlightRegion === key;
    const pulse = isHL ? (sin(pulseT) * 0.5 + 0.5) * 80 + 40 : 0;
    stroke(r.color[0], r.color[1], r.color[2], isHL ? 255 : 180);
    strokeWeight(isHL ? 3 : 2);
    drawingContext.setLineDash([7, 5]);
    noFill();
    rect(x, y, w, h, 6);
    drawingContext.setLineDash([]);
    if (isHL) {
        noStroke();
        fill(r.color[0], r.color[1], r.color[2], pulse);
        rect(x, y, w, h, 6);
    }
    // Label tab
    noStroke();
    fill(r.color[0], r.color[1], r.color[2]);
    const labW = textWidth(r.label) + 18;
    textSize(11);
    textStyle(BOLD);
    rect(x + 8, y - 2, labW, 20, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    text(r.label, x + 14, y + 9);
    textStyle(NORMAL);
}

function drawMiniSim(x, y, w, h) {
    // Background
    fill(248, 252, 248);
    noStroke();
    rect(x, y, w, h, 4);

    if (runChk.checked()) {
        dayFrame++;
        if (dayFrame >= 60) {
            day++;
            dayFrame = 0;
        }
        for (const a of agents) {
            a.x += a.vx;
            a.y += a.vy;
            if (a.x < 0 || a.x > 200) a.vx *= -1;
            if (a.y < 0 || a.y > 200) a.vy *= -1;
            a.x = constrain(a.x, 0, 200);
            a.y = constrain(a.y, 0, 200);
            if (a.state === 'I') {
                a.timer -= 1;
                if (a.timer <= 0) a.state = 'R';
                // infect nearby
                for (const b of agents) {
                    if (b.state === 'S' && dist(a.x, a.y, b.x, b.y) < 10) {
                        if (random() < 0.04) {
                            b.state = 'I';
                            b.timer = 100;
                        }
                    }
                }
            }
        }
    }

    // Draw agents scaled to box
    const scale = min(w, h) / 220;
    const ox = x + (w - 200 * scale) / 2;
    const oy = y + (h - 200 * scale) / 2;
    for (const a of agents) {
        if (a.state === 'S') fill(76, 175, 80);
        else if (a.state === 'I') fill(255, 193, 7);
        else fill(229, 57, 53);
        noStroke();
        ellipse(ox + a.x * scale, oy + a.y * scale, 7);
    }
}

function drawReadoutSim(x, y, w, h) {
    fill(255, 252, 240);
    noStroke();
    rect(x, y, w, h, 3);
    const sCnt = agents.filter(a => a.state === 'S').length;
    const iCnt = agents.filter(a => a.state === 'I').length;
    const rCnt = agents.filter(a => a.state === 'R').length;
    fill('#212529');
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Day:', x + 10, y + h / 2);
    text(day, x + 50, y + h / 2);
    text('S:', x + 90, y + h / 2);
    fill(46, 125, 50);
    text(sCnt, x + 110, y + h / 2);
    fill('#212529');
    text('I:', x + 150, y + h / 2);
    fill(245, 127, 23);
    text(iCnt, x + 165, y + h / 2);
    fill('#212529');
    text('R:', x + 205, y + h / 2);
    fill(198, 40, 40);
    text(rCnt, x + 220, y + h / 2);
    textStyle(NORMAL);
}

function drawMockControls(x, y, w, h) {
    fill(245, 250, 245);
    noStroke();
    rect(x, y, w, h, 3);

    // Mock slider
    fill('#212529');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Infection rate', x + 10, y + 18);
    stroke('#888');
    strokeWeight(2);
    line(x + 100, y + 18, x + 100 + min(150, w - 130), y + 18);
    noStroke();
    fill('#1976d2');
    ellipse(x + 100 + 0.4 * min(150, w - 130), y + 18, 12);

    // Mock button
    fill('#1a3a6c');
    rect(x + 10, y + 32, 60, 18, 3);
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('Reset', x + 40, y + 41);
}

function drawCodeView(x, y, w, h) {
    fill(252, 252, 247);
    stroke(220);
    strokeWeight(1);
    rect(x, y, w, h, 4);
    noStroke();

    // Title
    fill('#1a3a6c');
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Code skeleton (click any line)', x + 10, y + 8);
    textStyle(NORMAL);

    textFont('Consolas, Menlo, monospace');
    textSize(11);
    const lineH = 18;
    const codeStartY = y + 28;
    for (let i = 0; i < CODE_LINES.length; i++) {
        const lY = codeStartY + i * lineH;
        const line = CODE_LINES[i];
        // Highlight bg if matched
        if (highlightLine === i || (line.region && line.region === highlightRegion)) {
            const r = REGIONS[line.region] || REGIONS.container;
            fill(r.color[0], r.color[1], r.color[2], 40);
            noStroke();
            rect(x + 4, lY - 2, w - 8, lineH, 3);
        }
        // Line color marker
        if (line.region) {
            const r = REGIONS[line.region];
            fill(r.color[0], r.color[1], r.color[2]);
            noStroke();
            rect(x + 4, lY + 2, 4, lineH - 4);
        }
        fill(line.color);
        textAlign(LEFT, TOP);
        text(line.txt, x + 14, lY);
    }
    textFont('Segoe UI');
}

function drawFootgunPanel(x, y, w, h) {
    fill(255, 240, 240);
    stroke('#c62828');
    strokeWeight(1);
    rect(x, y, w, h, 4);
    noStroke();
    fill('#c62828');
    textSize(11.5);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Common Footguns (p5.js)', x + 10, y + 6);
    textStyle(NORMAL);

    const colW = (w - 30) / 3;
    for (let i = 0; i < FOOTGUNS.length; i++) {
        const cx = x + 10 + i * colW;
        fill('#c62828');
        textSize(10.5);
        textStyle(BOLD);
        text((i + 1) + '. ' + FOOTGUNS[i].title, cx, y + 26, colW - 6);
        textStyle(NORMAL);
        fill('#212529');
        textSize(10);
        text(FOOTGUNS[i].body, cx, y + 44, colW - 6);
    }
}

function mousePressed() {
    const split = containerWidth / 2;
    const outerX = 20;
    const outerY = 50;
    const innerH = drawHeight - 50 - 100;
    const outerW = containerWidth - 40;

    // Region label tabs (left half)
    const canvasX = outerX + 12;
    const canvasY = outerY + 30;
    const canvasW = split - outerX - 24;
    const cRegH = innerH * 0.55;
    const rRegH = 50;
    const ctRegH = innerH - 30 - cRegH - rRegH - 24;
    const readoutY = canvasY + cRegH + 6;
    const controlsY = readoutY + rRegH + 6;

    // Check label tab clicks
    const tabs = [
        { key: 'container', x: outerX + 8, y: outerY - 2 },
        { key: 'canvas',    x: canvasX + 8, y: canvasY - 2 },
        { key: 'readout',   x: canvasX + 8, y: readoutY - 2 },
        { key: 'controls',  x: canvasX + 8, y: controlsY - 2 }
    ];
    for (const t of tabs) {
        textSize(11);
        const r = REGIONS[t.key];
        const lw = textWidth(r.label) + 18;
        if (mouseX >= t.x && mouseX <= t.x + lw &&
            mouseY >= t.y && mouseY <= t.y + 20) {
            highlightRegion = t.key;
            // Find first matching code line
            highlightLine = CODE_LINES.findIndex(l => l.region === t.key);
            return;
        }
    }

    // Check region body clicks (not just label)
    const regionBoxes = [
        { key: 'canvas',   x: canvasX, y: canvasY, w: canvasW, h: cRegH },
        { key: 'readout',  x: canvasX, y: readoutY, w: canvasW, h: rRegH },
        { key: 'controls', x: canvasX, y: controlsY, w: canvasW, h: ctRegH }
    ];
    for (const b of regionBoxes) {
        if (mouseX >= b.x && mouseX <= b.x + b.w &&
            mouseY >= b.y && mouseY <= b.y + b.h) {
            highlightRegion = b.key;
            highlightLine = CODE_LINES.findIndex(l => l.region === b.key);
            return;
        }
    }

    // Check code-line clicks
    const codeX = split + 8;
    const codeYStart = outerY + 30 + 28;
    const codeW = outerX + outerW - codeX - 12;
    const lineH = 18;
    for (let i = 0; i < CODE_LINES.length; i++) {
        const lY = codeYStart + i * lineH;
        if (mouseX >= codeX && mouseX <= codeX + codeW &&
            mouseY >= lY - 2 && mouseY <= lY + lineH - 2) {
            highlightLine = i;
            highlightRegion = CODE_LINES[i].region;
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
