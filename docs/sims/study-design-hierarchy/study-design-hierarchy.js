// Study Design Evidence Hierarchy
// CANVAS_HEIGHT: 620
let canvasWidth = 820;
let drawHeight = 540;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let selected = 5; // start at top (Systematic Review)
let hover = -1;

// Layers ordered top → bottom (index 0 = top = strongest)
// We'll number bottom-up internally for clarity. layers[0] = bottom (ecological).
const layers = [
    {
        name: 'Ecological Studies',
        color: '#9ca3af',
        def: 'Compare disease rates across groups (countries, counties) using population-level exposure data.',
        rr: 'No — only group-level associations',
        rand: 'No',
        bias: 'Ecological fallacy — group correlation may not hold at the individual level.',
        example: 'Snow\'s cholera maps comparing water-company service areas (1854).',
        use: 'Hypothesis generation; surveillance comparisons across populations.'
    },
    {
        name: 'Cross-Sectional Studies',
        color: '#93c5fd',
        def: 'Measure exposure and outcome at a single point in time in a defined population.',
        rr: 'No — calculate prevalence ratio, not risk ratio',
        rand: 'No',
        bias: 'Cannot establish temporality; prevalence is biased toward chronic cases.',
        example: 'NHANES surveys linking diet to obesity prevalence.',
        use: 'Estimating prevalence; describing the burden of disease.'
    },
    {
        name: 'Case-Control Studies',
        color: '#60a5fa',
        def: 'Start with cases and matched controls; look back at exposure history.',
        rr: 'No — only odds ratio (approximates RR when disease is rare)',
        rand: 'No',
        bias: 'Recall bias; selection bias in choosing controls.',
        example: 'Doll & Hill 1950 smoking and lung cancer study.',
        use: 'Rare diseases; outbreak investigations; long-latency exposures.'
    },
    {
        name: 'Cohort Studies (Prospective & Retrospective)',
        color: '#2dd4bf',
        def: 'Follow exposed and unexposed groups forward through time and compare outcomes.',
        rr: 'Yes — direct risk ratio and incidence rates',
        rand: 'No',
        bias: 'Loss to follow-up; confounding by indication.',
        example: 'Framingham Heart Study; Nurses\' Health Study.',
        use: 'Common exposures; multiple outcomes; establishing temporality.'
    },
    {
        name: 'RCTs & Quasi-Experimental Designs',
        color: '#34d399',
        def: 'Randomly assign exposure (RCT) or exploit natural experiments to estimate causal effects.',
        rr: 'Yes — unbiased RR under randomization',
        rand: 'Yes (RCTs); No (quasi-experimental)',
        bias: 'Loss to follow-up; non-compliance; external validity concerns.',
        example: 'Salk polio vaccine trial (1954); ITS analysis of public-health policies.',
        use: 'Evaluating interventions, vaccines, and policies.'
    },
    {
        name: 'Systematic Reviews & Meta-Analyses',
        color: '#fcd34d',
        def: 'Systematically synthesize results from all eligible studies on a question.',
        rr: 'Yes — pooled effect estimates with CIs',
        rand: 'Inherits from included studies',
        bias: 'Publication bias; heterogeneity between studies.',
        example: 'Cochrane reviews; AHRQ evidence syntheses.',
        use: 'Highest tier of evidence — informs guidelines and policy.'
    }
];

let pyramidBounds = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const cy = drawHeight + 12;
    let prev = createButton('◀ Previous tier');
    prev.position(16, cy);
    prev.mousePressed(() => { selected = (selected + layers.length - 1) % layers.length; });

    let next = createButton('Next tier ▶');
    next.position(140, cy);
    next.mousePressed(() => { selected = (selected + 1) % layers.length; });

    let clear = createButton('Clear selection');
    clear.position(260, cy);
    clear.mousePressed(() => { selected = -1; });
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Study Design Evidence Hierarchy', containerWidth / 2, 8);
    textStyle(NORMAL);

    drawPyramid();
    drawInfoPanel();

    // controls strip
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP);
    text('Click any tier on the pyramid (or use the buttons) to see its details.', 400, drawHeight + 18);
    text('Pyramid layers ordered bottom → top by evidence strength.', 400, drawHeight + 34);
}

function drawPyramid() {
    const pyW = floor(containerWidth * 0.55) - 16;
    const pyX = 60;
    const pyY = 50;
    const pyH = drawHeight - pyY - 28;

    // Pyramid spans pyX..pyX+pyW at the base, narrowing toward top
    const topW = pyW * 0.12;
    const apex = {x: pyX + pyW/2, y: pyY};
    const baseL = {x: pyX, y: pyY + pyH};
    const baseR = {x: pyX + pyW, y: pyY + pyH};

    const n = layers.length;
    hover = -1;
    pyramidBounds = [];

    for (let i = 0; i < n; i++) {
        // layer 0 = bottom (widest), layer n-1 = top
        const t0 = i / n;       // bottom edge fraction from base going up
        const t1 = (i + 1) / n; // top edge
        // y goes from baseL.y at t=0 to apex.y at t=1
        const y0 = baseL.y - t0 * (baseL.y - apex.y);
        const y1 = baseL.y - t1 * (baseL.y - apex.y);
        // width at fraction t: linearly interpolated between pyW and topW
        const w0 = pyW * (1 - t0) + topW * t0;
        const w1 = pyW * (1 - t1) + topW * t1;
        const xL0 = apex.x - w0/2, xR0 = apex.x + w0/2;
        const xL1 = apex.x - w1/2, xR1 = apex.x + w1/2;

        pyramidBounds.push({xL0, xR0, xL1, xR1, y0, y1});

        // check hover: point-in-trapezoid using bounding box and triangle math (simple)
        const inBBox = mouseX >= Math.min(xL0, xL1) && mouseX <= Math.max(xR0, xR1) &&
                       mouseY <= y0 && mouseY >= y1;
        if (inBBox && pointInTrap(mouseX, mouseY, xL0, xR0, xL1, xR1, y0, y1)) {
            hover = i;
        }

        const isSel = selected === i;
        const isHov = hover === i;
        let fillColor = color(layers[i].color);
        if (isSel) fillColor = lerpColor(fillColor, color(255), -0.05);
        else if (isHov) fillColor = lerpColor(fillColor, color(255), 0.25);
        fill(fillColor);
        stroke(isSel ? '#1a3a6c' : '#666');
        strokeWeight(isSel ? 3 : 1);
        beginShape();
        vertex(xL0, y0);
        vertex(xR0, y0);
        vertex(xR1, y1);
        vertex(xL1, y1);
        endShape(CLOSE);
        noStroke();

        // label
        fill(i === 5 || i === 0 ? '#222' : '#000');
        textSize(i >= 4 ? 10 : 11); textStyle(BOLD); textAlign(CENTER, CENTER);
        const cyText = (y0 + y1) / 2;
        const widestAtMid = pyW * (1 - (t0+t1)/2) + topW * ((t0+t1)/2);
        let label = layers[i].name;
        if (widestAtMid < 200 && label.length > 24) {
            // wrap into 2 lines
            const half = Math.floor(label.length / 2);
            let spaceIdx = label.indexOf(' ', half - 5);
            if (spaceIdx < 0) spaceIdx = half;
            text(label.substring(0, spaceIdx), apex.x, cyText - 7);
            text(label.substring(spaceIdx + 1), apex.x, cyText + 7);
        } else {
            text(label, apex.x, cyText);
        }
        textStyle(NORMAL);
    }

    // axis labels on left
    fill('#444'); textSize(10); textAlign(CENTER, CENTER);
    push();
    translate(pyX - 30, pyY + pyH * 0.5);
    rotate(-HALF_PI);
    text('↑ Internal Validity     ↑ Evidence Strength', 0, 0);
    pop();
    // axis on right
    push();
    translate(pyX + pyW + 30, pyY + pyH * 0.5);
    rotate(-HALF_PI);
    text('↑ Cost & Time     ↓ Feasibility', 0, 0);
    pop();
}

function pointInTrap(mx, my, xL0, xR0, xL1, xR1, y0, y1) {
    if (my > y0 || my < y1) return false;
    const t = (y0 - my) / (y0 - y1);
    const xL = xL0 + t * (xL1 - xL0);
    const xR = xR0 + t * (xR1 - xR0);
    return mx >= xL && mx <= xR;
}

function drawInfoPanel() {
    const px = floor(containerWidth * 0.55) + 12;
    const py = 50;
    const pw = containerWidth - px - 12;
    const ph = drawHeight - py - 28;

    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    if (selected < 0 || selected >= layers.length) {
        fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
        text('Click a tier to learn more', px + 10, py + 10);
        textStyle(NORMAL);
        return;
    }

    const L = layers[selected];
    fill('#1a3a6c'); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    let ly = py + 10;
    text(L.name, px + 10, ly); ly += 22;
    textStyle(NORMAL);

    fill('#333'); textSize(11);
    ly = drawSection(px, ly, pw, 'Definition', L.def) + 6;
    ly = drawSection(px, ly, pw, 'Can calculate RR?', L.rr) + 4;
    ly = drawSection(px, ly, pw, 'Randomized?', L.rand) + 4;
    ly = drawSection(px, ly, pw, 'Primary bias', L.bias) + 4;
    ly = drawSection(px, ly, pw, 'Classic example', L.example) + 4;
    ly = drawSection(px, ly, pw, 'Typical use', L.use);
}

function drawSection(px, ly, pw, title, body) {
    fill('#1a3a6c'); textStyle(BOLD); textSize(11); textAlign(LEFT, TOP);
    text(title, px + 10, ly); ly += 14;
    textStyle(NORMAL); fill('#333');
    const lines = wrap(body, pw - 24);
    for (const ln of lines) {
        text(ln, px + 10, ly); ly += 13;
    }
    return ly;
}

function wrap(s, maxW) {
    const words = s.split(' ');
    let lines = [], current = '';
    for (const w of words) {
        const test = current ? current + ' ' + w : w;
        if (textWidth(test) > maxW) {
            if (current) lines.push(current);
            current = w;
        } else current = test;
    }
    if (current) lines.push(current);
    return lines;
}

function mousePressed() {
    if (hover >= 0) selected = hover;
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
