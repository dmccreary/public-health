// COVID-19 Key Events Timeline 2019-2023
// CANVAS_HEIGHT: 640
let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let zoomSlider;
let resetBtn;
let selectedEvent = -1;
let hoveredEvent = -1;

// month index 0 = Dec 2019, increases by 1 each month
function ym(year, month) {
    // returns months since Dec 2019
    return (year - 2019) * 12 + (month - 12);
}

const CATS = {
    origins:  { color: [33, 150, 243], label: 'Origins & Detection' },
    variant:  { color: [255, 152, 0],  label: 'Variants' },
    vaccine:  { color: [76, 175, 80],  label: 'Vaccines' },
    policy:   { color: [156, 39, 176], label: 'Policy' },
    data:     { color: [0, 150, 136],  label: 'Data / Surveillance' }
};

const EVENTS = [
    { t: ym(2019,12), cat: 'origins', label: 'Wuhan cluster',
      desc: 'Cluster of pneumonia cases of unknown cause reported in Wuhan, China. Marks the first documented signal of a novel coronavirus, later named SARS-CoV-2.' },
    { t: ym(2020, 1) + 0.3, cat: 'data', label: 'Genome published',
      desc: 'Chinese scientists publish the full SARS-CoV-2 genome sequence. Enables global diagnostic test development and vaccine design within days.' },
    { t: ym(2020, 1) + 0.7, cat: 'policy', label: 'WHO PHEIC',
      desc: 'WHO declares a Public Health Emergency of International Concern. The highest alarm under the International Health Regulations (2005).' },
    { t: ym(2020, 3) + 0.3, cat: 'policy', label: 'WHO pandemic',
      desc: 'WHO characterizes COVID-19 as a pandemic. Many national lockdowns and travel restrictions follow within days.' },
    { t: ym(2020, 4), cat: 'data', label: 'First US wave peaks',
      desc: 'First US epidemic wave peaks. Hospitals in NYC and the Northeast are overwhelmed; refrigerated trucks used as temporary morgues.' },
    { t: ym(2020,11), cat: 'variant', label: 'Alpha detected',
      desc: 'B.1.1.7 (Alpha) lineage detected in the UK; substantially more transmissible than the ancestral strain. First widely tracked variant of concern.' },
    { t: ym(2020,12) + 0.4, cat: 'vaccine', label: 'First EUA (US)',
      desc: 'Pfizer-BioNTech mRNA vaccine receives US Emergency Use Authorization, followed days later by Moderna. First mRNA vaccines authorized for human use.' },
    { t: ym(2021, 1), cat: 'vaccine', label: 'Vaccine rollout',
      desc: 'Mass vaccination begins in the US, UK, and EU. Risk-tiered prioritization (healthcare workers, long-term-care residents first).' },
    { t: ym(2021, 3), cat: 'vaccine', label: 'COVAX deliveries',
      desc: 'First COVAX vaccine deliveries reach low- and middle-income countries. Global access remains highly uneven through 2021-2022.' },
    { t: ym(2021, 5), cat: 'variant', label: 'Delta dominant',
      desc: 'B.1.617.2 (Delta) becomes dominant globally. Higher viral load and transmissibility drive a major summer-2021 wave.' },
    { t: ym(2021, 9), cat: 'vaccine', label: 'Booster auth.',
      desc: 'US FDA authorizes booster doses for select populations. Reflects waning antibody response and continued circulation.' },
    { t: ym(2021,11) + 0.7, cat: 'variant', label: 'Omicron detected',
      desc: 'B.1.1.529 (Omicron) reported by South Africa. Extensive spike mutations allow substantial immune escape from prior infection and vaccination.' },
    { t: ym(2022, 2), cat: 'data', label: 'Omicron peak US',
      desc: 'Omicron BA.1 wave peaks in the US — the largest single wave of recorded cases, though with lower case-fatality due to immunity and milder pathogenicity.' },
    { t: ym(2022, 5), cat: 'policy', label: 'PHEIC review',
      desc: 'WHO IHR Emergency Committee meets to review the PHEIC status. Committee recommends the PHEIC remain in force.' },
    { t: ym(2023, 5), cat: 'policy', label: 'WHO ends PHEIC',
      desc: 'WHO declares COVID-19 no longer constitutes a Public Health Emergency of International Concern. Transition framework for ongoing management adopted.' }
];

const MAX_T = ym(2023, 12);
let viewStart = 0;
let viewEnd = MAX_T;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    // Zoom slider: 0..70  (window length in months)
    zoomSlider = createSlider(12, MAX_T, MAX_T, 1);
    zoomSlider.position(180, drawHeight + 20);
    zoomSlider.size(260);

    resetBtn = createButton('Reset View');
    resetBtn.position(20, drawHeight + 25);
    resetBtn.size(120, 30);
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.mousePressed(() => {
        zoomSlider.value(MAX_T);
        selectedEvent = -1;
    });
}

function draw() {
    background(255);

    // Title
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('COVID-19 Key Events Timeline (Dec 2019 - Dec 2023)', containerWidth / 2, 10);
    textStyle(NORMAL);

    // Determine view window (centered on Mar 2020 by default when zoomed)
    const windowLen = zoomSlider.value();
    // Center based on existing selectedEvent or middle
    const centerT = (selectedEvent >= 0) ? EVENTS[selectedEvent].t : MAX_T / 2;
    viewStart = max(0, centerT - windowLen / 2);
    viewEnd = viewStart + windowLen;
    if (viewEnd > MAX_T) { viewEnd = MAX_T; viewStart = max(0, viewEnd - windowLen); }

    const marginL = 60;
    const marginR = 30;
    const trackY = 200;
    const trackW = containerWidth - marginL - marginR;

    // Axis line
    stroke('#888');
    strokeWeight(2);
    line(marginL, trackY, marginL + trackW, trackY);
    noStroke();

    // Year tick marks
    fill('#555');
    textSize(11);
    textAlign(CENTER, TOP);
    for (let y = 2020; y <= 2024; y++) {
        const t = ym(y, 1);
        if (t < viewStart - 1 || t > viewEnd + 1) continue;
        const x = mapT(t, marginL, trackW);
        stroke('#888'); strokeWeight(1);
        line(x, trackY - 4, x, trackY + 4);
        noStroke();
        textStyle(BOLD);
        text(y, x, trackY + 8);
        textStyle(NORMAL);
    }
    // Quarter ticks if zoomed
    if (windowLen < 36) {
        stroke('#ccc'); strokeWeight(1);
        for (let y = 2020; y <= 2024; y++) {
            for (let m = 4; m <= 10; m += 3) {
                const t = ym(y, m);
                if (t < viewStart || t > viewEnd) continue;
                const x = mapT(t, marginL, trackW);
                line(x, trackY - 2, x, trackY + 2);
            }
        }
        noStroke();
    }

    // Sort events by time to assign lanes
    // Lane assignment to avoid overlap: try to find a lane where previous label box ends before this one starts
    const visible = [];
    for (let i = 0; i < EVENTS.length; i++) {
        if (EVENTS[i].t < viewStart - 0.1 || EVENTS[i].t > viewEnd + 0.1) continue;
        const x = mapT(EVENTS[i].t, marginL, trackW);
        visible.push({ i, x, t: EVENTS[i].t });
    }
    visible.sort((a, b) => a.t - b.t);

    // Lanes: positive = above (1,2,3,4), negative = below (-1,-2,-3,-4)
    // Alternate above/below to balance
    const laneEnds = { 1: -9999, 2: -9999, 3: -9999, 4: -9999,
                       '-1': -9999, '-2': -9999, '-3': -9999, '-4': -9999 };
    const lanes = new Array(EVENTS.length).fill(0);
    const labelW = 100; // estimated px width per label
    let nextAbove = true;
    for (const v of visible) {
        const order = nextAbove ? [1, 2, 3, 4, -1, -2, -3, -4] : [-1, -2, -3, -4, 1, 2, 3, 4];
        let placed = false;
        for (const ln of order) {
            if (v.x - labelW / 2 > laneEnds[ln] + 4) {
                lanes[v.i] = ln;
                laneEnds[ln] = v.x + labelW / 2;
                placed = true;
                break;
            }
        }
        if (!placed) lanes[v.i] = nextAbove ? 4 : -4;
        nextAbove = !nextAbove;
    }

    // Hover detection
    hoveredEvent = -1;
    for (let i = 0; i < EVENTS.length; i++) {
        if (EVENTS[i].t < viewStart || EVENTS[i].t > viewEnd) continue;
        const x = mapT(EVENTS[i].t, marginL, trackW);
        if (dist(mouseX, mouseY, x, trackY) < 11) hoveredEvent = i;
    }

    // Draw events
    const laneH = 22;
    for (let i = 0; i < EVENTS.length; i++) {
        const ev = EVENTS[i];
        if (ev.t < viewStart - 0.1 || ev.t > viewEnd + 0.1) continue;
        const x = mapT(ev.t, marginL, trackW);
        const ln = lanes[i];
        const above = ln > 0;
        const labelY = trackY + (above ? -1 : 1) * (15 + Math.abs(ln) * laneH);
        const c = CATS[ev.cat].color;
        const isSel = i === selectedEvent;
        const isHover = i === hoveredEvent;

        // Lead line from track to label
        stroke(c[0], c[1], c[2]);
        strokeWeight(1);
        line(x, trackY + (above ? -8 : 8), x, labelY + (above ? 6 : -6));
        noStroke();

        // Label background (subtle) for selected/hover
        if (isSel || isHover) {
            fill(255, 255, 200, 220);
            const tw = labelW;
            rect(x - tw/2, labelY - 7, tw, 14, 3);
            noStroke();
        }

        // Label
        fill(isSel ? '#1a3a6c' : '#212529');
        textSize(10);
        if (isSel || isHover) textStyle(BOLD); else textStyle(NORMAL);
        textAlign(CENTER, CENTER);
        let lab = ev.label;
        if (textWidth(lab) > 96) {
            while (textWidth(lab + '..') > 96 && lab.length > 4) lab = lab.slice(0, -1);
            lab += '..';
        }
        text(lab, x, labelY);
        textStyle(NORMAL);

        // Date small under label
        fill('#777');
        textSize(8.5);
        text(monthLabel(ev.t), x, labelY + 10);

        // Dot on track (draw last to be on top)
        fill(c[0], c[1], c[2]);
        stroke('#fff');
        strokeWeight(2);
        ellipse(x, trackY, isSel ? 16 : (isHover ? 14 : 11));
        noStroke();
    }

    // Detail panel
    const panelX = 30;
    const panelY = 380;
    const panelW = containerWidth - 60;
    const panelH = drawHeight - panelY - 20;
    drawPanel(panelX, panelY, panelW, panelH);

    // Legend top-right (above the timeline labels)
    drawLegend(containerWidth - 215, 35);

    // Tooltip
    if (hoveredEvent >= 0 && hoveredEvent !== selectedEvent) {
        const ev = EVENTS[hoveredEvent];
        const x = mapT(ev.t, 60, containerWidth - 90);
        drawTooltip(monthLabel(ev.t) + ' - ' + ev.label, x, trackY - 30);
    }

    // Controls strip
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

    fill('#495057');
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Zoom window:', 180, drawHeight + 50);
    text(windowLen.toFixed(0) + ' months', 320, drawHeight + 50);
    text('Click any event for details. Use Reset to restore full view.', 460, drawHeight + 40);
}

function mapT(t, marginL, trackW) {
    const f = (t - viewStart) / (viewEnd - viewStart);
    return marginL + f * trackW;
}

function monthLabel(t) {
    // t = months since Dec 2019 (t=0 means Dec 2019)
    const totalMonths = Math.round(t);
    // Dec 2019 is month index 12 of year 2019. totalMonths additions cross years.
    const absMonth = 12 + totalMonths; // calendar month index relative to year-base 2019, where 12 means Dec 2019, 13 means Jan 2020
    const yr = 2019 + Math.floor((absMonth - 1) / 12);
    const mo = ((absMonth - 1) % 12) + 1;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[mo - 1] + ' ' + yr;
}

function drawLegend(x, y) {
    fill(255, 255, 255, 230);
    stroke(220);
    strokeWeight(1);
    rect(x, y, 200, 95, 4);
    noStroke();

    fill('#1a3a6c');
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Categories', x + 8, y + 6);
    textStyle(NORMAL);

    let i = 0;
    for (const key in CATS) {
        const c = CATS[key].color;
        const yy = y + 24 + i * 14;
        fill(c[0], c[1], c[2]);
        noStroke();
        ellipse(x + 14, yy + 4, 9, 9);
        fill('#212529');
        textSize(10);
        text(CATS[key].label, x + 24, yy);
        i++;
    }
}

function drawPanel(x, y, w, h) {
    fill(250, 251, 253);
    stroke(220);
    strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    if (selectedEvent < 0) {
        fill('#6c757d');
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(ITALIC);
        text('Click any event on the timeline above\nto read about its public health significance.',
             x + w / 2, y + h / 2);
        textStyle(NORMAL);
        return;
    }

    const ev = EVENTS[selectedEvent];
    const c = CATS[ev.cat].color;
    fill(c[0], c[1], c[2]);
    rect(x, y, w, 8, 6, 6, 0, 0);

    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text(monthLabel(ev.t) + ' - ' + ev.label, x + 14, y + 18);
    textStyle(NORMAL);

    fill('#6c757d');
    textSize(11.5);
    textStyle(ITALIC);
    text('Category: ' + CATS[ev.cat].label, x + 14, y + 42);
    textStyle(NORMAL);

    fill('#212529');
    textSize(12.5);
    text(ev.desc, x + 14, y + 64, w - 28);
}

function drawTooltip(label, mx, my) {
    textSize(11);
    const tw = textWidth(label) + 14;
    const th = 20;
    let tx = mx - tw / 2;
    let ty = my;
    if (tx < 4) tx = 4;
    if (tx + tw > containerWidth - 4) tx = containerWidth - tw - 4;
    if (ty < 30) ty = my + 50;
    fill(40, 40, 40, 230);
    noStroke();
    rect(tx, ty, tw, th, 4);
    fill(255);
    textAlign(CENTER, CENTER);
    text(label, tx + tw / 2, ty + th / 2);
}

function mousePressed() {
    const marginL = 60;
    const marginR = 30;
    const trackY = 130;
    const trackW = containerWidth - marginL - marginR;
    for (let i = 0; i < EVENTS.length; i++) {
        if (EVENTS[i].t < viewStart || EVENTS[i].t > viewEnd) continue;
        const x = mapT(EVENTS[i].t, marginL, trackW);
        if (dist(mouseX, mouseY, x, trackY) < 12) {
            selectedEvent = i;
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
