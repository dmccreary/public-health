// COVID-19 Systems Causal Loop Map
// CANVAS_HEIGHT: 640
let canvasWidth = 820;
let drawHeight = 520;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Nodes: id, label (multi-line), x, y (relative to drawing area)
let nodes = [
    { id: 'inf',  label: 'Infectious\nPopulation',  x: 0.45, y: 0.55 },
    { id: 'trn',  label: 'Transmission\nRate',      x: 0.22, y: 0.30 },
    { id: 'npi',  label: 'NPI\nCompliance',         x: 0.10, y: 0.62 },
    { id: 'vac',  label: 'Vaccine\nCoverage',       x: 0.28, y: 0.92 },
    { id: 'mis',  label: 'Misinformation\nVolume', x: 0.60, y: 0.92 },
    { id: 'icu',  label: 'ICU\nOccupancy',          x: 0.72, y: 0.30 },
    { id: 'fat',  label: 'Pandemic\nFatigue',       x: 0.78, y: 0.62 }
];

// Edges: from, to, polarity (+/-), loop id (R1, R2, B1, B2, R3)
let edges = [
    { from: 'inf', to: 'trn', pol: '+', loop: 'R1' },
    { from: 'trn', to: 'inf', pol: '+', loop: 'R1' },
    { from: 'inf', to: 'icu', pol: '+', loop: 'B2' },
    { from: 'icu', to: 'npi', pol: '+', loop: 'B2' },
    { from: 'npi', to: 'trn', pol: '-', loop: 'B2' },
    { from: 'mis', to: 'npi', pol: '-', loop: 'R2' },
    { from: 'mis', to: 'vac', pol: '-', loop: 'R2' },
    { from: 'vac', to: 'inf', pol: '-', loop: 'B1' },
    { from: 'inf', to: 'fat', pol: '+', loop: 'R3' },
    { from: 'fat', to: 'npi', pol: '-', loop: 'R3' },
    { from: 'fat', to: 'mis', pol: '+', loop: 'R3' }
];

let loopColors = {
    'R1': '#e74c3c', // red - reinforcing transmission
    'R2': '#e67e22', // orange - misinformation
    'R3': '#8e44ad', // purple - fatigue
    'B1': '#27ae60', // green - vaccine balancing
    'B2': '#2980b9'  // blue - surge balancing
};

let nodeDescriptions = {
    'inf': 'Infectious Population: the number of people currently able to transmit the virus. Drives onward transmission and is reduced by vaccine-induced and natural immunity.',
    'trn': 'Transmission Rate: how quickly infections spread person to person. Rises with contact and falls with NPIs (masks, distancing) and immunity.',
    'npi': 'NPI Compliance: adherence to non-pharmaceutical interventions like masking and distancing. Rises with perceived threat and falls with fatigue and misinformation.',
    'vac': 'Vaccine Coverage: share of the population vaccinated. Reduces infectious population and severe disease; depressed by misinformation.',
    'mis': 'Misinformation Volume: amount of false or misleading content in circulation. Erodes vaccine uptake and NPI compliance.',
    'icu': 'ICU Occupancy: visible signal of severe disease that pushes policy makers and the public to act. Rises with infections; drives renewed NPI compliance.',
    'fat': 'Pandemic Fatigue: weariness with restrictions. Grows over time, erodes NPI compliance, and makes audiences more receptive to misinformation.'
};

let loopDescriptions = {
    'R1': 'R1 Transmission (reinforcing): more infections produce more transmissions, which produce more infections. The core epidemic engine.',
    'R2': 'R2 Misinformation (reinforcing): misinformation reduces both NPI compliance and vaccine coverage, which raises infections and drives more demand for explanations — including misinformation.',
    'R3': 'R3 Fatigue (reinforcing): sustained infection waves breed pandemic fatigue, which lowers compliance and raises receptivity to misinformation, fueling more spread.',
    'B1': 'B1 Vaccine (balancing): vaccine coverage reduces the infectious population, eventually slowing the outbreak.',
    'B2': 'B2 Surge (balancing): rising ICU occupancy prompts renewed NPI compliance, which lowers transmission and infections.'
};

let selectedNode = null;
let selectedLoop = null;
let hoverNode = null;
let resetBtn;
let loopSelect;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    // Place controls inside the control band
    resetBtn = createButton('Reset View');
    resetBtn.position(12, drawHeight + 10);
    resetBtn.mousePressed(() => { selectedNode = null; selectedLoop = null; });

    loopSelect = createSelect();
    loopSelect.position(120, drawHeight + 10);
    loopSelect.option('Highlight a loop...', '');
    loopSelect.option('R1 Transmission (red)', 'R1');
    loopSelect.option('R2 Misinformation (orange)', 'R2');
    loopSelect.option('R3 Fatigue (purple)', 'R3');
    loopSelect.option('B1 Vaccine (green)', 'B1');
    loopSelect.option('B2 Surge (blue)', 'B2');
    loopSelect.changed(() => {
        const v = loopSelect.value();
        selectedLoop = v || null;
        selectedNode = null;
    });
}

function getNodePos(n) {
    const padLeft = 70;
    const padRight = 145; // leave room for legend
    const padTop = 60;
    const panelH = 100;
    const padBot = panelH + 24;
    const w = containerWidth - padLeft - padRight;
    const h = drawHeight - padTop - padBot;
    return { x: padLeft + n.x * w, y: padTop + n.y * h };
}

function findNode(id) { return nodes.find(n => n.id === id); }

function draw() {
    background(255);

    // Title
    fill('#1a3a6c');
    noStroke();
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('COVID-19 Systems Causal Loop Map', containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(12);
    fill('#555');
    text('Click a node to see its role. Use the dropdown to highlight a feedback loop.', containerWidth / 2, 32);

    // Draw edges
    for (let e of edges) {
        const a = getNodePos(findNode(e.from));
        const b = getNodePos(findNode(e.to));
        drawEdge(a, b, e);
    }

    // Draw nodes
    for (let n of nodes) {
        const p = getNodePos(n);
        const isSel = selectedNode === n.id;
        const isHover = hoverNode === n.id;
        const relatedToLoop = selectedLoop && edges.some(e => e.loop === selectedLoop && (e.from === n.id || e.to === n.id));
        let fillCol = '#ffffff';
        let strokeCol = '#1a3a6c';
        let sw = 1.5;
        if (relatedToLoop) { strokeCol = loopColors[selectedLoop]; sw = 3; }
        if (isSel) { fillCol = '#fff4d0'; strokeCol = '#1a3a6c'; sw = 3; }
        if (isHover && !isSel) { fillCol = '#eef4fb'; }

        stroke(strokeCol);
        strokeWeight(sw);
        fill(fillCol);
        ellipse(p.x, p.y, 110, 56);

        noStroke();
        fill('#1a3a6c');
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(n.label, p.x, p.y);
        textStyle(NORMAL);
    }

    // Info panel (right-bottom of drawing area)
    drawInfoPanel();

    // Legend (bottom-right of drawing area)
    drawLegend();

    // Control band
    noStroke();
    fill(248);
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke('#dee2e6');
    line(0, drawHeight, containerWidth, drawHeight);

    // Hover detection
    hoverNode = null;
    for (let n of nodes) {
        const p = getNodePos(n);
        if (dist(mouseX, mouseY, p.x, p.y) < 30) { hoverNode = n.id; break; }
    }
    if (mouseY < drawHeight && hoverNode) cursor(HAND); else cursor(ARROW);
}

function drawEdge(a, b, e) {
    const isLoopSel = selectedLoop && e.loop === selectedLoop;
    const nodeSel = selectedNode && (e.from === selectedNode || e.to === selectedNode);
    let col = isLoopSel ? loopColors[e.loop] : (nodeSel ? '#1a3a6c' : '#b0bcc8');
    let sw = isLoopSel ? 3 : (nodeSel ? 2.5 : 1.5);

    // Offset from node centers so arrow stops at ellipse edge
    const dx = b.x - a.x, dy = b.y - a.y;
    const ang = atan2(dy, dx);
    const r1x = 56, r1y = 30;
    const sx = a.x + cos(ang) * r1x * 0.95;
    const sy = a.y + sin(ang) * r1y * 0.95;
    const ex = b.x - cos(ang) * r1x * 0.95;
    const ey = b.y - sin(ang) * r1y * 0.95;

    // Curve control point - perpendicular offset for visual separation
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;
    const perpX = -sin(ang);
    const perpY = cos(ang);
    const curveOffset = 18;
    const cx = mx + perpX * curveOffset;
    const cy = my + perpY * curveOffset;

    noFill();
    stroke(col);
    strokeWeight(sw);
    bezier(sx, sy, cx, cy, cx, cy, ex, ey);

    // Arrowhead
    const tang = atan2(ey - cy, ex - cx);
    const ah = 8;
    fill(col);
    noStroke();
    push();
    translate(ex, ey);
    rotate(tang);
    triangle(0, 0, -ah, -ah * 0.5, -ah, ah * 0.5);
    pop();

    // Polarity label
    const lx = cx + perpX * 8;
    const ly = cy + perpY * 8;
    noStroke();
    fill(255);
    rect(lx - 7, ly - 8, 14, 14, 3);
    fill(e.pol === '+' ? '#1a7f37' : '#c0392b');
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(e.pol, lx, ly);
    textStyle(NORMAL);
}

function drawInfoPanel() {
    const panelX = 12;
    const panelH = 100;
    const panelY = drawHeight - panelH - 8;
    const panelW = containerWidth - 24;

    noStroke();
    fill('#f4f7fb');
    rect(panelX, panelY, panelW, panelH, 6);
    stroke('#1a3a6c');
    strokeWeight(1);
    noFill();
    rect(panelX, panelY, panelW, panelH, 6);

    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(12);
    let title, body;
    if (selectedNode) {
        const n = findNode(selectedNode);
        title = n.label.replace('\n', ' ');
        body = nodeDescriptions[selectedNode];
    } else if (selectedLoop) {
        title = selectedLoop + ' Loop';
        body = loopDescriptions[selectedLoop];
    } else {
        title = 'Legend';
        body = '+ edge means same direction (more A → more B). − edge means opposite direction (more A → less B). R = reinforcing loop (amplifies). B = balancing loop (stabilizes).';
    }
    textStyle(BOLD);
    text(title, panelX + 10, panelY + 8);
    textStyle(NORMAL);
    textSize(12);
    text(body, panelX + 10, panelY + 28, panelW - 20, panelH - 36);
}

function drawLegend() {
    const lx = containerWidth - 130;
    const ly = 52;
    noStroke();
    fill(255, 255, 255, 230);
    rect(lx, ly, 120, 90, 4);
    stroke('#dee2e6');
    noFill();
    rect(lx, ly, 120, 90, 4);
    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Loops', lx + 8, ly + 6);
    textStyle(NORMAL);
    let keys = ['R1', 'R2', 'R3', 'B1', 'B2'];
    let labels = ['Transmission', 'Misinformation', 'Fatigue', 'Vaccine', 'Surge'];
    for (let i = 0; i < keys.length; i++) {
        const yy = ly + 22 + i * 13;
        stroke(loopColors[keys[i]]);
        strokeWeight(3);
        line(lx + 8, yy + 5, lx + 24, yy + 5);
        noStroke();
        fill('#1a3a6c');
        textSize(10);
        text(keys[i] + ' ' + labels[i], lx + 28, yy);
    }
}

function mousePressed() {
    if (mouseY > drawHeight) return;
    for (let n of nodes) {
        const p = getNodePos(n);
        if (dist(mouseX, mouseY, p.x, p.y) < 30) {
            selectedNode = (selectedNode === n.id) ? null : n.id;
            selectedLoop = null;
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
