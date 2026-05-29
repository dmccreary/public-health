// R0 and Herd Immunity Explorer
// CANVAS_HEIGHT: 640
let canvasWidth = 820;
let drawHeight = 520;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let r0Slider, immSlider;
let btnFlu, btnCovidOg, btnOmi, btnMeasles;
let immuneMask = []; // boolean array per node; true = immune
let nodes = [];     // {gen, idx, x, y}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const cy = drawHeight + 14;
    createSpan('R₀').position(16, cy);
    r0Slider = createSlider(1.0, 18.0, 3.0, 0.1);
    r0Slider.position(80, cy);
    r0Slider.style('width', '200px');
    r0Slider.input(rebuildTree);

    createSpan('Immune %').position(16, cy + 32);
    immSlider = createSlider(0, 100, 0, 1);
    immSlider.position(80, cy + 32);
    immSlider.style('width', '200px');
    immSlider.input(updateImmunity);

    btnFlu = createButton('Flu (1.3)');
    btnFlu.position(360, cy);
    btnFlu.mousePressed(() => { r0Slider.value(1.3); rebuildTree(); });

    btnCovidOg = createButton('COVID OG (3.0)');
    btnCovidOg.position(360, cy + 32);
    btnCovidOg.mousePressed(() => { r0Slider.value(3.0); rebuildTree(); });

    btnOmi = createButton('Omicron (12)');
    btnOmi.position(470, cy);
    btnOmi.mousePressed(() => { r0Slider.value(12.0); rebuildTree(); });

    btnMeasles = createButton('Measles (15)');
    btnMeasles.position(470, cy + 32);
    btnMeasles.mousePressed(() => { r0Slider.value(15.0); rebuildTree(); });

    let resetBtn = createButton('Re-randomize immunity');
    resetBtn.position(590, cy);
    resetBtn.mousePressed(() => updateImmunity());

    rebuildTree();
}

function rebuildTree() {
    nodes = [];
    // Cap visualized fan-out per generation for readability
    const r0Raw = r0Slider.value();
    const r0VisGen1 = Math.min(Math.round(r0Raw), 10);
    const r0VisGen2 = Math.min(Math.round(r0Raw), 4);

    // Layout area
    const leftW = floor(containerWidth * 0.60);
    const ax0 = 24, ax1 = leftW - 16;
    const ay0 = 60, ay1 = drawHeight - 28;
    const colX = [
        ax0 + (ax1 - ax0) * 0.10,
        ax0 + (ax1 - ax0) * 0.42,
        ax0 + (ax1 - ax0) * 0.80,
    ];

    // gen 0: 1 node center
    nodes.push({gen:0, idx:0, x:colX[0], y:(ay0 + ay1)/2, parent:null});

    // gen 1: r0VisGen1 nodes
    const n1 = r0VisGen1;
    for (let i = 0; i < n1; i++) {
        const t = n1 === 1 ? 0.5 : i / (n1 - 1);
        const y = ay0 + 20 + (ay1 - ay0 - 40) * t;
        nodes.push({gen:1, idx:i, x:colX[1], y, parent:0});
    }
    // gen 2: r0VisGen2 children per gen-1 node
    const n2per = r0VisGen2;
    for (let i = 0; i < n1; i++) {
        const parentNode = nodes.find(n => n.gen===1 && n.idx===i);
        for (let j = 0; j < n2per; j++) {
            const spread = 18; // vertical pixels around parent
            const t = n2per === 1 ? 0 : (j / (n2per - 1)) - 0.5;
            const y = parentNode.y + t * spread * 2;
            nodes.push({gen:2, idx: i * n2per + j, x:colX[2], y, parent:i});
        }
    }
    updateImmunity();
}

function updateImmunity() {
    const p = immSlider.value() / 100;
    immuneMask = nodes.map(() => Math.random() < p);
}

function draw() {
    background(255);

    // title
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('R₀ and Herd Immunity Explorer', containerWidth / 2, 8);
    textStyle(NORMAL);

    drawTree();
    drawRightPanel();

    // controls strip
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    // R0 readout next to slider
    fill('#333'); textSize(11); textAlign(LEFT, TOP);
    text('R₀ = ' + r0Slider.value().toFixed(1), 290, drawHeight + 70);
    text('Immune = ' + immSlider.value() + '%', 360, drawHeight + 70);
    text('Rₜ = ' + (r0Slider.value() * (1 - immSlider.value()/100)).toFixed(2), 470, drawHeight + 70);
}

function drawTree() {
    const leftW = floor(containerWidth * 0.60);
    // generation header
    fill('#888'); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Index case', 24 + (leftW - 40) * 0.10, 36);
    text('Gen 1', 24 + (leftW - 40) * 0.42, 36);
    text('Gen 2', 24 + (leftW - 40) * 0.80, 36);

    // edges
    stroke('#bbb'); strokeWeight(1);
    for (const n of nodes) {
        if (n.parent === null) continue;
        const parent = nodes.find(p => p.gen === n.gen - 1 && p.idx === n.parent);
        if (!parent) continue;
        line(parent.x + 7, parent.y, n.x - 7, n.y);
    }

    // nodes
    noStroke();
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const immune = immuneMask[i];
        const r = n.gen === 0 ? 11 : (n.gen === 1 ? 8 : 5.5);
        if (n.gen === 0) {
            fill('#e74c3c'); // index always infected
            ellipse(n.x, n.y, r*2, r*2);
            fill(255); textSize(10); textAlign(CENTER, CENTER); textStyle(BOLD);
            text('★', n.x, n.y);
            textStyle(NORMAL);
        } else if (immune) {
            fill('#bbb');
            ellipse(n.x, n.y, r*2, r*2);
            stroke('#666'); strokeWeight(1.5);
            line(n.x - r*0.6, n.y - r*0.6, n.x + r*0.6, n.y + r*0.6);
            line(n.x - r*0.6, n.y + r*0.6, n.x + r*0.6, n.y - r*0.6);
            noStroke();
        } else {
            fill('#e74c3c');
            ellipse(n.x, n.y, r*2, r*2);
        }
    }

    // legend
    const lx = 28, ly = drawHeight - 22;
    fill('#e74c3c'); noStroke(); ellipse(lx, ly, 12, 12);
    fill('#333'); textSize(11); textAlign(LEFT, CENTER);
    text('Infected', lx + 10, ly);
    fill('#bbb'); ellipse(lx + 90, ly, 12, 12);
    stroke('#666'); strokeWeight(1.2);
    line(lx + 86, ly - 4, lx + 94, ly + 4);
    line(lx + 86, ly + 4, lx + 94, ly - 4);
    noStroke();
    fill('#333');
    text('Immune', lx + 100, ly);
}

function drawRightPanel() {
    const leftW = floor(containerWidth * 0.60);
    const px = leftW;
    const py = 36;
    const pw = containerWidth - px - 12;
    const ph = drawHeight - py - 12;

    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    const R0 = r0Slider.value();
    const imm = immSlider.value() / 100;
    const HIT = 1 - 1 / R0;
    const Rt = R0 * (1 - imm);

    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Key Values', px + 12, py + 10);
    textStyle(NORMAL);

    fill('#333'); textSize(12);
    let ly = py + 36;
    text('R₀  (basic reproduction number)', px + 12, ly); ly += 16;
    textStyle(BOLD); fill('#1a3a6c'); textSize(20);
    text(R0.toFixed(1), px + 12, ly); ly += 28;
    textStyle(NORMAL); fill('#333'); textSize(12);

    text('HIT = 1 − 1/R₀', px + 12, ly); ly += 16;
    textStyle(BOLD); fill('#27ae60'); textSize(20);
    text((HIT * 100).toFixed(1) + '%', px + 12, ly); ly += 28;
    textStyle(NORMAL); fill('#333'); textSize(12);

    text('Rₜ = R₀ × (1 − immune %)', px + 12, ly); ly += 16;
    text('   = ' + R0.toFixed(1) + ' × ' + (1 - imm).toFixed(2), px + 12, ly); ly += 16;
    textStyle(BOLD); fill('#1a3a6c'); textSize(20);
    text(Rt.toFixed(2), px + 12, ly); ly += 28;
    textStyle(NORMAL); fill('#333'); textSize(12);

    // HIT bar
    const barX = px + 12, barY = ly + 4, barW = pw - 24, barH = 14;
    fill('#eee'); stroke('#bbb');
    rect(barX, barY, barW, barH, 4);
    noStroke();
    // immune-coverage fill
    fill('#27ae60');
    rect(barX + 1, barY + 1, (barW - 2) * imm, barH - 2, 3);
    // HIT marker
    const markerX = barX + barW * HIT;
    stroke('#c0392b'); strokeWeight(2);
    line(markerX, barY - 2, markerX, barY + barH + 2);
    noStroke();
    fill('#c0392b'); textSize(10); textAlign(CENTER, TOP);
    text('HIT', markerX, barY + barH + 4);
    fill('#333'); textAlign(LEFT, TOP); textSize(10);
    text('coverage vs threshold', barX, barY + barH + 18);
    ly = barY + barH + 36;

    // status
    let status, statusColor;
    if (Rt > 1.02) { status = 'Epidemic growing'; statusColor = '#c0392b'; }
    else if (Rt < 0.98) { status = 'Epidemic declining'; statusColor = '#27ae60'; }
    else { status = 'Endemic equilibrium'; statusColor = '#f39c12'; }
    fill(statusColor);
    rect(px + 12, ly, pw - 24, 26, 4);
    fill(255); textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(status + '  (Rₜ = ' + Rt.toFixed(2) + ')', px + 12 + (pw - 24)/2, ly + 13);
    textStyle(NORMAL); textAlign(LEFT, TOP);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    rebuildTree();
}
