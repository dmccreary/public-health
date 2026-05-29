// Wastewater Epidemiology Pipeline
// CANVAS_HEIGHT: 680
let canvasWidth = 820;
let drawHeight = 580;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let selected = 0;
let hover = -1;
let showPathogens = false;
let pathogenCheckbox;
let flowOffset = 0;

const stages = [
    {
        name: 'Community Shedding',
        color: '#9ca3af',
        short: 'People shed viral RNA in feces 1–7 days before symptoms.',
        methods: 'Biological basis — shedding begins during the pre-symptomatic phase and persists for days to weeks.',
        qc: 'Shedding rates vary by variant, age, and severity; not all infected people shed detectably.',
        limits: 'Per-capita shedding load is not directly measurable for individuals — only the population aggregate is.',
        covid: 'SARS-CoV-2 RNA in stool documented as early as Wuhan (Jan 2020); shedding continued for weeks in some patients.'
    },
    {
        name: 'Sewage Collection',
        color: '#4a90e2',
        short: '24-hour composite samples; upstream manholes for neighborhood resolution.',
        methods: 'Composite sampler at the wastewater treatment plant (WWTP) influent draws aliquots every 15 min for 24h. Sub-sewershed sampling at upstream manholes.',
        qc: 'Maintain 4 °C cold chain; record flow rate; document any plant bypass events.',
        limits: 'Storm events dilute the signal; industrial inputs can inhibit downstream PCR.',
        covid: 'Sub-sewershed sampling at university dorms enabled testing of just-symptomatic floors during outbreaks.'
    },
    {
        name: 'Lab Processing',
        color: '#e67e22',
        short: 'Concentration → RNA extraction → RT-qPCR quantification (copies/L).',
        methods: 'Concentrate viral particles (PEG precipitation, ultrafiltration, or direct extraction). Extract RNA. Quantify N1/N2 gene targets with RT-qPCR.',
        qc: 'Run no-template controls; spike-in recovery standard (e.g., BCoV); duplicate technical replicates.',
        limits: 'PCR inhibitors from sewage matrix; LOD around ~10³ copies/L for SARS-CoV-2.',
        covid: 'CDC SARS-CoV-2 N1/N2 assays became standard; ddPCR adopted for low-prevalence settings.'
    },
    {
        name: 'Normalization',
        color: '#e67e22',
        short: 'Normalized = (N gene copies/L) ÷ (PMMoV copies/L)',
        methods: 'Divide target signal by an endogenous fecal marker (PMMoV — pepper mild mottle virus) and/or flow rate to correct for dilution and population.',
        qc: 'Confirm PMMoV stability across season; cross-check with population estimates from cell-phone data.',
        limits: 'PMMoV varies with diet (pepper consumption); not perfectly constant per capita.',
        covid: 'Both flow-normalized and PMMoV-normalized signals were reported on the CDC NWSS dashboard.'
    },
    {
        name: 'Trend Modeling',
        color: '#27ae60',
        short: '7-day moving average, exponential smoothing, anomaly detection.',
        methods: 'Smooth the noisy daily signal with a 7-day rolling mean; fit local regression (LOWESS); compute change-point statistics.',
        qc: 'Backfill late lab reports; flag plant outages; report uncertainty bands.',
        limits: 'Sample-to-sample variance is large; short series struggle to distinguish noise from real signal.',
        covid: 'Biobot Analytics published smoothed national WBE trends throughout 2020–2024.'
    },
    {
        name: 'Lead Indicator Comparison',
        color: '#27ae60',
        short: 'Wastewater signal leads clinical cases by ~5 days.',
        methods: 'Cross-correlate wastewater time-series against reported clinical cases; estimate lead time with phase analysis.',
        qc: 'Adjust for changes in clinical-testing access — when testing capacity drops, the "lead" appears to grow artifactually.',
        limits: 'Lead time changes with variant biology and testing availability — it is not a fixed number.',
        covid: 'Lead time of 4–7 days observed in Boston, the Netherlands, and many US sewersheds in 2020–2022.'
    },
    {
        name: 'Public Health Action',
        color: '#c0392b',
        short: 'NWSS dashboard, surge preparation, outbreak investigation.',
        methods: 'Feed normalized trends to surveillance dashboards (CDC NWSS, state portals). Trigger surge staffing, vaccine outreach, or targeted clinical testing.',
        qc: 'Pre-define action thresholds before data are collected to avoid post-hoc cherry-picking.',
        limits: 'Without action thresholds and authority to act, WBE remains an observational curiosity.',
        covid: 'NWSS launched Sep 2020; by 2023 covered >1,000 sites and informed local mask and vaccine messaging.'
    }
];

const pathogens = [
    ['Influenza A/B', 'Detected weekly in NWSS sites; tracks clinical surveillance with similar lead time.'],
    ['Poliovirus', 'Routine WBE in Israel, UK, US triggered NY State outbreak response (2022).'],
    ['Mpox', 'Detected in 2022 outbreak; helped track community transmission in cities.'],
    ['RSV', 'Seasonal RSV signal now monitored by some NWSS partners.'],
    ['Opioid metabolites', 'Detects community drug-use patterns; ethics review required.'],
    ['AMR genes', 'Antimicrobial resistance gene loads measured to track environmental spread.']
];

let stageBounds = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const cy = drawHeight + 12;
    let prev = createButton('◀ Previous');
    prev.position(16, cy);
    prev.mousePressed(() => { selected = (selected + stages.length - 1) % stages.length; });
    let next = createButton('Next ▶');
    next.position(110, cy);
    next.mousePressed(() => { selected = (selected + 1) % stages.length; });

    pathogenCheckbox = createCheckbox(' Show pathogen panel', false);
    pathogenCheckbox.position(200, cy + 2);
    pathogenCheckbox.changed(() => { showPathogens = pathogenCheckbox.checked(); });
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Wastewater Epidemiology Pipeline', containerWidth / 2, 8);
    textStyle(NORMAL);

    flowOffset = (flowOffset + 0.6) % 16;

    drawPipeline();
    if (showPathogens) drawPathogens();
    else drawDetail();

    // controls
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();
    fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP);
    text('Click any stage to see methods, QC, limits, and COVID-19 examples.', 16, drawHeight + 56);
    text('Blue arrows = sample flow.  Green arrows = data flow.', 16, drawHeight + 72);
}

function drawPipeline() {
    hover = -1;
    stageBounds = [];

    const margin = 12;
    const usableW = containerWidth - 2 * margin;
    const gap = 8;
    const n = stages.length;
    const boxW = (usableW - gap * (n - 1)) / n;
    const boxY = 44;
    const boxH = 130;

    for (let i = 0; i < n; i++) {
        const x = margin + i * (boxW + gap);
        stageBounds.push({x, y: boxY, w: boxW, h: boxH});
        const isHover = mouseX >= x && mouseX <= x + boxW && mouseY >= boxY && mouseY <= boxY + boxH;
        if (isHover) hover = i;
        const isSel = selected === i;

        let c = color(stages[i].color);
        if (isSel) c = lerpColor(c, color(255), -0.12);
        else if (isHover) c = lerpColor(c, color(255), 0.15);
        fill(c);
        stroke(isSel ? '#1a3a6c' : '#444');
        strokeWeight(isSel ? 3 : 1);
        rect(x, boxY, boxW, boxH, 8);
        noStroke();

        // number badge
        fill('rgba(255,255,255,0.85)');
        ellipse(x + 12, boxY + 12, 16, 16);
        fill('#222'); textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(i + 1, x + 12, boxY + 12);
        textStyle(NORMAL);

        // name (shift right of badge if first line is short enough to need extra room)
        fill(255); textSize(10); textStyle(BOLD); textAlign(CENTER, TOP);
        const titleLines = wrap(stages[i].name, boxW - 28);
        let ty = boxY + 4;
        for (const ln of titleLines) {
            text(ln, x + boxW/2 + 8, ty); ty += 12;
        }
        textStyle(NORMAL);

        // icon
        drawIcon(i, x + boxW/2, ty + 16);

        // short text
        fill(255); textSize(9); textAlign(CENTER, TOP);
        const sLines = wrap(stages[i].short, boxW - 10);
        let sy = boxY + boxH - 4 - 11 * sLines.length;
        for (const ln of sLines) {
            text(ln, x + boxW/2, sy); sy += 11;
        }

        // arrow to next
        if (i < n - 1) {
            const isData = i >= 3; // data flow from stage 4 onward
            const arrColor = isData ? '#27ae60' : '#4a90e2';
            const ax = x + boxW;
            const ay = boxY + boxH/2;
            // animated dashes
            stroke(arrColor); strokeWeight(2);
            drawingContext.setLineDash([6, 4]);
            drawingContext.lineDashOffset = -flowOffset;
            line(ax + 1, ay, ax + gap - 2, ay);
            drawingContext.setLineDash([]);
            drawingContext.lineDashOffset = 0;
            // arrowhead
            fill(arrColor); noStroke();
            triangle(ax + gap - 2, ay - 4, ax + gap - 2, ay + 4, ax + gap + 2, ay);
        }
    }
}

function drawIcon(i, cx, cy) {
    push();
    translate(cx, cy);
    noStroke();
    if (i === 0) {
        // houses
        fill(255);
        for (let k = -1; k <= 1; k++) {
            rect(k*9 - 3, -3, 7, 8);
            triangle(k*9 - 4, -3, k*9 + 4, -3, k*9, -8);
        }
    } else if (i === 1) {
        // manhole
        fill('#fff'); ellipse(0, 0, 18, 8);
        fill('#1a3a6c'); ellipse(0, -1, 14, 5);
    } else if (i === 2) {
        // tube + drop
        fill('#fff');
        rect(-3, -8, 6, 14, 1);
        ellipse(0, 8, 5, 6);
    } else if (i === 3) {
        // formula brackets
        fill(255); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
        text('N / PMMoV', 0, 0);
        textStyle(NORMAL);
    } else if (i === 4) {
        // small chart
        stroke(255); strokeWeight(1.5); noFill();
        beginShape();
        for (let xx = -10; xx <= 10; xx += 2) {
            vertex(xx, -2 * Math.sin(xx * 0.4));
        }
        endShape();
        noStroke();
    } else if (i === 5) {
        // split panel: two lines, one shifted
        stroke(255); strokeWeight(1.5); noFill();
        beginShape();
        for (let xx = -10; xx <= 10; xx += 2) vertex(xx, -3 + 2*Math.sin(xx*0.3));
        endShape();
        stroke('rgba(255,255,255,0.6)');
        beginShape();
        for (let xx = -10; xx <= 10; xx += 2) vertex(xx, 3 + 2*Math.sin((xx-4)*0.3));
        endShape();
        noStroke();
    } else if (i === 6) {
        // dashboard
        fill(255);
        rect(-10, -6, 20, 12, 2);
        fill('#c0392b');
        rect(-8, -3, 6, 6);
        fill('#27ae60');
        rect(2, -3, 6, 6);
    }
    pop();
}

function drawDetail() {
    const px = 12;
    const py = 44 + 130 + 18;
    const pw = containerWidth - 24;
    const ph = drawHeight - py - 10;
    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    const s = stages[selected];
    fill(s.color); rect(px + 10, py + 10, 8, 24);
    fill('#1a3a6c'); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Stage ' + (selected + 1) + ': ' + s.name, px + 26, py + 12);
    textStyle(NORMAL);

    let ly = py + 42;
    ly = drawSection(px, ly, pw, 'Methods', s.methods);
    ly = drawSection(px, ly, pw, 'QC / Quality control', s.qc);
    ly = drawSection(px, ly, pw, 'Limits & uncertainty', s.limits);
    ly = drawSection(px, ly, pw, 'COVID-19 example', s.covid);
}

function drawSection(px, ly, pw, title, body) {
    fill('#1a3a6c'); textStyle(BOLD); textSize(11); textAlign(LEFT, TOP);
    text(title, px + 10, ly); ly += 14;
    textStyle(NORMAL); fill('#333');
    for (const ln of wrap(body, pw - 24)) {
        text(ln, px + 10, ly); ly += 13;
    }
    return ly + 6;
}

function drawPathogens() {
    const px = 12;
    const py = 44 + 130 + 18;
    const pw = containerWidth - 24;
    const ph = drawHeight - py - 10;
    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Other pathogens monitored via WBE', px + 12, py + 10);
    textStyle(NORMAL);

    let ly = py + 36;
    for (const [name, desc] of pathogens) {
        fill('#1a3a6c'); textStyle(BOLD); textSize(11);
        text(name, px + 14, ly);
        const w0 = textWidth(name);
        textStyle(NORMAL); fill('#333');
        const lines = wrap(' — ' + desc, pw - 28 - w0);
        text(lines[0], px + 14 + w0, ly);
        for (let i = 1; i < lines.length; i++) {
            ly += 13;
            text(lines[i], px + 14, ly);
        }
        ly += 18;
    }
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
