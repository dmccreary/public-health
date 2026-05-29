// SIR Model Compartment Flow
// CANVAS_HEIGHT: 640
let canvasWidth = 820;
let drawHeight = 500;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Population & state
const N = 10000;
let S, I, R, E;
let timeSeries; // array of {s,i,r,e}
let running = true;
let useSEIR = false;
let selected = null; // 'S','E','I','R','SI','EI','IR'

// Parameters
let betaSlider, gammaSlider, sigmaSlider;
let resetBtn, playBtn, modelSel;
let stepsPerFrame = 4; // simulation speed (dt fixed)
const DT = 0.25;

// Layout for compartments (computed in draw)
let boxLayout = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    // controls
    let cy = drawHeight + 12;
    let xs = 20;

    createSpan('β (transmission):').position(xs, cy);
    betaSlider = createSlider(0.05, 1.0, 0.35, 0.01);
    betaSlider.position(xs + 130, cy);
    betaSlider.style('width', '160px');

    createSpan('γ (recovery):').position(xs, cy + 28);
    gammaSlider = createSlider(0.02, 0.5, 0.10, 0.01);
    gammaSlider.position(xs + 130, cy + 28);
    gammaSlider.style('width', '160px');

    createSpan('σ (E→I, SEIR):').position(xs, cy + 56);
    sigmaSlider = createSlider(0.05, 1.0, 0.25, 0.01);
    sigmaSlider.position(xs + 130, cy + 56);
    sigmaSlider.style('width', '160px');

    let xs2 = xs + 330;
    createSpan('Model:').position(xs2, cy);
    modelSel = createSelect();
    modelSel.position(xs2 + 60, cy - 2);
    modelSel.option('SIR');
    modelSel.option('SEIR');
    modelSel.changed(() => {
        useSEIR = (modelSel.value() === 'SEIR');
        resetSim();
    });

    playBtn = createButton('Pause');
    playBtn.position(xs2, cy + 28);
    playBtn.mousePressed(() => {
        running = !running;
        playBtn.html(running ? 'Pause' : 'Play');
    });

    resetBtn = createButton('Reset');
    resetBtn.position(xs2 + 80, cy + 28);
    resetBtn.mousePressed(resetSim);

    resetSim();
}

function resetSim() {
    S = N - 10; I = 10; R = 0; E = 0;
    timeSeries = [];
    timeSeries.push({s:S, i:I, r:R, e:E});
}

function stepSim() {
    const beta = betaSlider.value();
    const gamma = gammaSlider.value();
    const sigma = sigmaSlider.value();
    for (let k = 0; k < stepsPerFrame; k++) {
        if (!useSEIR) {
            let newInf = beta * S * I / N;
            let newRec = gamma * I;
            let dS = -newInf;
            let dI = newInf - newRec;
            let dR = newRec;
            S += dS * DT; I += dI * DT; R += dR * DT;
        } else {
            let newExp = beta * S * I / N;
            let newInf = sigma * E;
            let newRec = gamma * I;
            S += (-newExp) * DT;
            E += (newExp - newInf) * DT;
            I += (newInf - newRec) * DT;
            R += (newRec) * DT;
        }
        timeSeries.push({s:S, i:I, r:R, e:E});
        if (timeSeries.length > 600) timeSeries.shift();
    }
}

function draw() {
    background(255);

    // Title
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('SIR Model Compartment Flow', containerWidth / 2, 8);
    textStyle(NORMAL);

    if (running) stepSim();

    // Layout: top half compartment diagram, bottom half time-series
    drawCompartments();
    drawTimeSeries();
    drawInfoPanel();

    // controls strip
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();
    fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP);
    const beta = betaSlider.value().toFixed(2);
    const gamma = gammaSlider.value().toFixed(2);
    const sigma = sigmaSlider.value().toFixed(2);
    text('β=' + beta + '   γ=' + gamma + '   σ=' + sigma + '   R0 = β/γ = ' + (beta/gamma).toFixed(2),
        20, drawHeight + 96);
}

function drawCompartments() {
    const topY = 36;
    const boxY = topY + 18;
    const boxH = 80;
    const margin = 24;

    let labels, colors, values;
    if (!useSEIR) {
        labels = ['S', 'I', 'R'];
        colors = ['#4a90e2', '#e74c3c', '#27ae60'];
        values = [S, I, R];
    } else {
        labels = ['S', 'E', 'I', 'R'];
        colors = ['#4a90e2', '#f39c12', '#e74c3c', '#27ae60'];
        values = [S, E, I, R];
    }
    const n = labels.length;
    const usableW = containerWidth - 2 * margin;
    const slot = usableW / n;
    const boxW = slot * 0.62;

    boxLayout = {};
    for (let i = 0; i < n; i++) {
        const cx = margin + slot * (i + 0.5);
        const x = cx - boxW / 2;
        boxLayout[labels[i]] = {x, y: boxY, w: boxW, h: boxH, cx, cy: boxY + boxH/2};
        // box
        const isSel = selected === labels[i];
        fill(isSel ? lerpColor(color(colors[i]), color(255), 0.4) : color(colors[i]));
        stroke(isSel ? '#1a3a6c' : '#333');
        strokeWeight(isSel ? 3 : 1.5);
        rect(x, boxY, boxW, boxH, 8);
        // label
        noStroke();
        fill(255); textSize(28); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(labels[i], cx, boxY + 26);
        textStyle(NORMAL); textSize(13);
        text(nf(values[i], 0, 0), cx, boxY + boxH - 18);
    }

    // arrows + rate labels
    stroke('#333'); strokeWeight(2); noFill();
    for (let i = 0; i < n - 1; i++) {
        const a = boxLayout[labels[i]];
        const b = boxLayout[labels[i+1]];
        const x1 = a.x + a.w;
        const x2 = b.x;
        const y = a.cy;
        line(x1 + 4, y, x2 - 8, y);
        // arrowhead
        fill('#333');
        triangle(x2 - 8, y - 5, x2 - 8, y + 5, x2 - 1, y);
        noFill();
        // arrow label
        const arrowKey = labels[i] + labels[i+1];
        const isSelArrow = selected === arrowKey;
        noStroke();
        fill(isSelArrow ? '#1a3a6c' : '#555');
        textSize(12); textStyle(isSelArrow ? BOLD : NORMAL);
        textAlign(CENTER, BOTTOM);
        let rate;
        if (arrowKey === 'SI') rate = 'β·S·I/N';
        else if (arrowKey === 'SE') rate = 'β·S·I/N';
        else if (arrowKey === 'EI') rate = 'σ·E';
        else if (arrowKey === 'IR') rate = 'γ·I';
        text(rate, (x1 + x2) / 2, y - 6);
        textStyle(NORMAL);
        stroke('#333'); noFill();
    }
    noStroke();
}

function drawTimeSeries() {
    const px = 24;
    const py = 150;
    const pw = containerWidth - 48 - 240;
    const ph = drawHeight - py - 16;
    // panel
    fill('#fafbfc'); stroke('#ddd');
    rect(px, py, pw, ph, 4);
    noStroke();
    fill('#1a3a6c'); textSize(12); textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Trajectories over time', px + 8, py + 6);
    textStyle(NORMAL);

    // axes
    const ax0 = px + 36, ay0 = py + 24, ax1 = px + pw - 10, ay1 = py + ph - 22;
    stroke('#aaa'); strokeWeight(1);
    line(ax0, ay0, ax0, ay1); // y
    line(ax0, ay1, ax1, ay1); // x
    noStroke();
    fill('#666'); textSize(10); textAlign(RIGHT, CENTER);
    text(N, ax0 - 4, ay0);
    text('0', ax0 - 4, ay1);
    textAlign(CENTER, TOP);
    text('time', (ax0 + ax1)/2, ay1 + 4);

    // plot
    if (timeSeries.length < 2) return;
    const m = timeSeries.length;
    const xScale = (ax1 - ax0) / Math.max(1, m - 1);
    const yScale = (ay1 - ay0) / N;
    const series = [
        {key:'s', color:'#4a90e2', label:'S'},
        {key:'i', color:'#e74c3c', label:'I'},
        {key:'r', color:'#27ae60', label:'R'},
    ];
    if (useSEIR) series.splice(1, 0, {key:'e', color:'#f39c12', label:'E'});
    strokeWeight(2); noFill();
    for (const s of series) {
        stroke(s.color);
        beginShape();
        for (let i = 0; i < m; i++) {
            const x = ax0 + i * xScale;
            const y = ay1 - timeSeries[i][s.key] * yScale;
            vertex(x, y);
        }
        endShape();
    }
    // legend
    noStroke();
    textSize(11); textAlign(LEFT, CENTER);
    let lx = ax0 + 8, ly = ay0 + 8;
    for (const s of series) {
        fill(s.color); rect(lx, ly - 5, 12, 3);
        fill('#333'); text(s.label, lx + 18, ly);
        lx += 40;
    }
}

function drawInfoPanel() {
    const px = containerWidth - 232;
    const py = 150;
    const pw = 220;
    const ph = drawHeight - py - 16;
    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 4);
    noStroke();
    fill('#1a3a6c'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Equation / Details', px + 8, py + 6);
    textStyle(NORMAL);
    fill('#333'); textSize(11);

    const beta = betaSlider.value();
    const gamma = gammaSlider.value();
    const sigma = sigmaSlider.value();

    let lines = [];
    if (selected === null) {
        lines = [
            'Click a box or arrow to',
            'see its equation.',
            '',
            'S(t) = current susceptible',
            'I(t) = current infectious',
            'R(t) = removed (recovered)',
            '',
            'R0 = β/γ = ' + (beta/gamma).toFixed(2),
        ];
    } else if (selected === 'S') {
        lines = ['Susceptible',
            'dS/dt = −β·S·I/N',
            '= −' + beta.toFixed(2) + '·S·I/' + N,
            '',
            'Current S = ' + nf(S,0,0)];
    } else if (selected === 'I') {
        lines = ['Infectious',
            useSEIR ? 'dI/dt = σ·E − γ·I' : 'dI/dt = β·S·I/N − γ·I',
            '',
            'Current I = ' + nf(I,0,0)];
    } else if (selected === 'R') {
        lines = ['Removed (Recovered)',
            'dR/dt = γ·I',
            '= ' + gamma.toFixed(2) + '·I',
            '',
            'Current R = ' + nf(R,0,0)];
    } else if (selected === 'E') {
        lines = ['Exposed (latent)',
            'dE/dt = β·S·I/N − σ·E',
            'σ = ' + sigma.toFixed(2),
            '',
            'Current E = ' + nf(E,0,0)];
    } else if (selected === 'SI' || selected === 'SE') {
        lines = ['Infection flow',
            'rate = β·S·I/N',
            '= ' + beta.toFixed(2) + '·' + nf(S,0,0) + '·' + nf(I,0,0) + '/' + N,
            '≈ ' + (beta*S*I/N).toFixed(2) + ' / time unit'];
    } else if (selected === 'EI') {
        lines = ['Latency → Infectious',
            'rate = σ·E',
            '= ' + sigma.toFixed(2) + '·' + nf(E,0,0),
            '≈ ' + (sigma*E).toFixed(2)];
    } else if (selected === 'IR') {
        lines = ['Recovery flow',
            'rate = γ·I',
            '= ' + gamma.toFixed(2) + '·' + nf(I,0,0),
            '≈ ' + (gamma*I).toFixed(2)];
    }
    let ly = py + 26;
    for (const ln of lines) {
        text(ln, px + 8, ly);
        ly += 16;
    }
}

function mousePressed() {
    // Check compartment hits
    for (const k of Object.keys(boxLayout)) {
        const b = boxLayout[k];
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            selected = k;
            return;
        }
    }
    // Check arrows: between consecutive boxes
    const keys = Object.keys(boxLayout);
    for (let i = 0; i < keys.length - 1; i++) {
        const a = boxLayout[keys[i]];
        const b = boxLayout[keys[i+1]];
        const x1 = a.x + a.w, x2 = b.x;
        if (mouseX >= x1 && mouseX <= x2 && Math.abs(mouseY - a.cy) < 14) {
            selected = keys[i] + keys[i+1];
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
