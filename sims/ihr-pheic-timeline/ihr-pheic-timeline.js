// IHR Evolution and PHEIC Declarations Timeline
// CANVAS_HEIGHT: 418
let canvasWidth = 900;
let drawHeight = 338;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let zoomSlider, compareBtn, resetBtn;
let selectedEvent = -1;
let hoveredEvent = -1;
let showCompare = false;
let closeBtnRect = null;
let pulsePhase = 0;

// Event categories:
//   'ihr-milestone' (blue diamond, top lane)
//   'sars'          (red circle, top lane)
//   'pheic'         (orange circle, bottom lane)
//   'pheic-ended'   (green ring on the same event after it ended)
//   'pheic-ongoing' (pulsing orange, bottom lane)
const EVENTS = [
    {
        year: 1969, lane: 'top', cat: 'ihr-milestone',
        name: 'Original IHR enacted',
        desc: 'The WHO adopts the International Health Regulations (IHR), focused on six "quarantinable" diseases (cholera, plague, yellow fever, smallpox, relapsing fever, typhus).',
        outcome: 'Foundation of binding international disease-notification law.'
    },
    {
        year: 2003, lane: 'top', cat: 'sars',
        name: 'SARS emergence',
        desc: 'Severe acute respiratory syndrome (SARS) spreads from southern China to 29 countries. ~8,000 cases and ~800 deaths reveal the inadequacy of the 1969 IHR for novel pathogens.',
        outcome: 'Directly drove the IHR revision adopted two years later.'
    },
    {
        year: 2005, lane: 'top', cat: 'ihr-milestone',
        name: 'IHR (2005) revised',
        desc: 'Member states adopt IHR 2005: notification within 24 hours of any event that may constitute a PHEIC; core surveillance and response capacities required; PHEIC mechanism created.',
        outcome: 'Current legal framework; entered into force June 2007.'
    },
    {
        year: 2009, lane: 'bottom', cat: 'pheic-ended',
        name: 'PHEIC: H1N1 influenza',
        desc: 'First PHEIC declared under the new IHR 2005. H1N1 swine-origin influenza spreads globally; estimated 100,000–400,000 deaths in the first year.',
        outcome: 'PHEIC ended August 2010. Criticized later for over- and under-warning.'
    },
    {
        year: 2014, lane: 'bottom', cat: 'pheic-ongoing',
        name: 'PHEIC: Polio (ongoing)',
        desc: 'International spread of wild poliovirus declared a PHEIC. Targets Pakistan, Afghanistan, Nigeria and others with vaccination-derived virus circulation.',
        outcome: 'Still in force; reviewed by Emergency Committee every ~3 months.'
    },
    {
        year: 2014.5, lane: 'bottom', cat: 'pheic-ended',
        name: 'PHEIC: Ebola (West Africa)',
        desc: 'Ebola virus disease epidemic in Guinea, Liberia and Sierra Leone. ~28,600 cases and ~11,300 deaths; the largest Ebola outbreak in history.',
        outcome: 'PHEIC ended March 2016. Catalyst for major WHO emergency-program reform.'
    },
    {
        year: 2016, lane: 'bottom', cat: 'pheic-ended',
        name: 'PHEIC: Zika virus',
        desc: 'Clusters of microcephaly and Guillain-Barré syndrome temporally linked to Zika virus infection in the Americas.',
        outcome: 'PHEIC ended November 2016. Standing technical guidance continues.'
    },
    {
        year: 2019, lane: 'bottom', cat: 'pheic-ended',
        name: 'PHEIC: Ebola (DRC)',
        desc: 'Second-largest Ebola outbreak, in the conflict-affected eastern Democratic Republic of the Congo. ~3,470 cases; ~2,280 deaths.',
        outcome: 'PHEIC ended June 2020.'
    },
    {
        year: 2020, lane: 'bottom', cat: 'pheic-ended',
        name: 'PHEIC: COVID-19',
        desc: 'Novel coronavirus (SARS-CoV-2) declared a PHEIC on 30 January 2020; pandemic declared 11 March. >7 million reported deaths; ~15+ million excess deaths.',
        outcome: 'PHEIC ended 5 May 2023. Largest WHO emergency response ever.'
    },
    {
        year: 2022, lane: 'bottom', cat: 'pheic-ended',
        name: 'PHEIC: Mpox (2022)',
        desc: 'Multi-country outbreak of mpox (clade IIb) primarily affecting men who have sex with men outside historically endemic countries.',
        outcome: 'PHEIC ended May 2023.'
    },
    {
        year: 2024, lane: 'bottom', cat: 'pheic-ongoing',
        name: 'PHEIC: Mpox (2024, ongoing)',
        desc: 'Re-declared PHEIC for clade Ib mpox spreading in eastern DRC and neighbouring countries; sustained sexual and household transmission.',
        outcome: 'Active PHEIC at end of 2024.'
    }
];

const COMPARE_DATA = [
    {
        name: 'H1N1 (2009)', color: [33, 150, 243],
        rows: [
            ['First cases',      'Mar 2009 (Mexico/US)'],
            ['PHEIC declared',   '25 Apr 2009 (~4 wks)'],
            ['Pandemic declared','11 Jun 2009'],
            ['Vaccine available','Oct 2009'],
            ['PHEIC ended',      '10 Aug 2010']
        ]
    },
    {
        name: 'Ebola (2014)', color: [229, 57, 53],
        rows: [
            ['First cases',      'Dec 2013 (Guinea)'],
            ['Outbreak reported','Mar 2014 (~3 mo)'],
            ['PHEIC declared',   '8 Aug 2014 (~8 mo)'],
            ['Vaccine trial',    'Mar 2015 (rVSV-ZEBOV)'],
            ['PHEIC ended',      '29 Mar 2016']
        ]
    },
    {
        name: 'COVID-19 (2020)', color: [156, 39, 176],
        rows: [
            ['First cases',      'Dec 2019 (Wuhan)'],
            ['Cluster reported', '31 Dec 2019 (~days)'],
            ['PHEIC declared',   '30 Jan 2020 (~4 wks)'],
            ['Vaccine EUA',      '11 Dec 2020 (~11 mo)'],
            ['PHEIC ended',      '5 May 2023']
        ]
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    // Controls strip
    const cy = drawHeight + 12;

    createSpan('Zoom 2019–2024:').position(14, cy + 4)
        .style('font-size', '12px').style('color', '#495057');

    zoomSlider = createSlider(1, 5, 1, 0.1);
    zoomSlider.position(140, cy + 4);
    zoomSlider.size(160);

    compareBtn = createButton('Compare Response');
    compareBtn.position(320, cy);
    compareBtn.size(160, 28);
    styleBtn(compareBtn, '#1a3a6c');
    compareBtn.mousePressed(() => { showCompare = !showCompare; });

    resetBtn = createButton('Reset');
    resetBtn.position(490, cy);
    resetBtn.size(80, 28);
    styleBtn(resetBtn, '#6c757d');
    resetBtn.mousePressed(() => {
        selectedEvent = -1;
        showCompare = false;
        zoomSlider.value(1);
    });
}

function styleBtn(b, bg) {
    b.style('font-size', '12px');
    b.style('cursor', 'pointer');
    b.style('background', bg);
    b.style('color', 'white');
    b.style('border', 'none');
    b.style('border-radius', '4px');
}

function draw() {
    background(255);
    pulsePhase += 0.05;

    // Title
    noStroke();
    fill('#1a3a6c');
    textSize(15);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('IHR Evolution and PHEIC Declarations (1969–2024)', containerWidth / 2, 6);
    textStyle(NORMAL);

    // Layout
    const leftLabelW = 110;
    const marginX = leftLabelW + 8;
    const rightMargin = 20;
    const usableW = containerWidth - marginX - rightMargin;
    const topLaneY = 70;
    const bottomLaneY = 160;
    const detailY = 215;
    const detailH = drawHeight - detailY - 8;

    // Swim lane labels (in their own gutter, left of plot area)
    noStroke();
    fill(241, 245, 251);
    rect(0, 50, leftLabelW + 4, bottomLaneY - 50 + 30, 0, 4, 4, 0);
    fill('#1a3a6c');
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text('IHR Milestones', 8, topLaneY);
    text('PHEIC Declarations', 8, bottomLaneY);
    textStyle(NORMAL);

    // Year scale with zoom (expands 2019–2024 segment)
    const yearMin = 1969;
    const yearMax = 2024;
    const zoom = zoomSlider ? zoomSlider.value() : 1;
    const zoomStart = 2019;
    const zoomEnd = 2024;

    const yearToX = (y) => {
        // Build a piecewise mapping: pre-zoom region + zoomed region
        const preFrac = (zoomStart - yearMin); // 50
        const zoomFrac = (zoomEnd - zoomStart) * zoom; // 5*zoom
        const postFrac = (yearMax - zoomEnd); // 0
        const totalFrac = preFrac + zoomFrac + postFrac;
        let pos;
        if (y <= zoomStart) {
            pos = (y - yearMin);
        } else if (y <= zoomEnd) {
            pos = preFrac + (y - zoomStart) * zoom;
        } else {
            pos = preFrac + zoomFrac + (y - zoomEnd);
        }
        return marginX + (pos / totalFrac) * usableW;
    };

    // Axis line
    stroke('#adb5bd');
    strokeWeight(1);
    const axisY = (topLaneY + bottomLaneY) / 2;
    line(marginX, axisY, marginX + usableW, axisY);

    // Year tick marks
    noStroke();
    fill('#6c757d');
    textAlign(CENTER, TOP);
    textSize(10);
    const tickYears = [1969, 1980, 1990, 2000, 2005, 2010, 2015, 2020, 2022, 2024];
    for (const ty of tickYears) {
        const tx = yearToX(ty);
        stroke('#adb5bd');
        line(tx, axisY - 4, tx, axisY + 4);
        noStroke();
        fill('#6c757d');
        text(ty, tx, axisY + 6);
    }

    // Zoom region shading
    if (zoom > 1.05) {
        const zx0 = yearToX(zoomStart);
        const zx1 = yearToX(zoomEnd);
        noStroke();
        fill(255, 244, 200, 90);
        rect(zx0, topLaneY - 30, zx1 - zx0, bottomLaneY - topLaneY + 60);
    }

    // Draw events
    hoveredEvent = -1;
    for (let i = 0; i < EVENTS.length; i++) {
        const e = EVENTS[i];
        const ex = yearToX(e.year);
        const ey = e.lane === 'top' ? topLaneY : bottomLaneY;
        const isSel = selectedEvent === i;
        const isHover = dist(mouseX, mouseY, ex, ey) < 12;
        if (isHover) hoveredEvent = i;

        // Connector to axis
        stroke('#ced4da');
        strokeWeight(1);
        line(ex, ey, ex, axisY);

        // Marker
        if (e.cat === 'ihr-milestone') {
            // Blue diamond
            noStroke();
            fill(26, 115, 232);
            drawDiamond(ex, ey, isSel ? 16 : 13);
            if (isSel || isHover) {
                noFill(); stroke(255, 200, 0); strokeWeight(2);
                drawDiamond(ex, ey, 18);
            }
        } else if (e.cat === 'sars') {
            // Red circle
            noStroke();
            fill(220, 53, 69);
            ellipse(ex, ey, isSel ? 16 : 13);
            if (isSel || isHover) { noFill(); stroke(255, 200, 0); strokeWeight(2); ellipse(ex, ey, 20); }
        } else if (e.cat === 'pheic-ended') {
            // Orange circle with green ring (ended)
            noStroke();
            fill(255, 140, 0);
            ellipse(ex, ey, isSel ? 16 : 13);
            noFill(); stroke(76, 175, 80); strokeWeight(2);
            ellipse(ex, ey, isSel ? 22 : 19);
            if (isSel || isHover) { noFill(); stroke(255, 200, 0); strokeWeight(2); ellipse(ex, ey, 26); }
        } else if (e.cat === 'pheic-ongoing') {
            // Pulsing orange
            const pulse = 4 + 3 * sin(pulsePhase);
            noStroke();
            fill(255, 140, 0, 120);
            ellipse(ex, ey, 18 + pulse);
            fill(255, 140, 0);
            ellipse(ex, ey, isSel ? 16 : 13);
            if (isSel || isHover) { noFill(); stroke(255, 200, 0); strokeWeight(2); ellipse(ex, ey, 22 + pulse); }
        }

        // Label (year for top, short name for bottom)
        noStroke();
        fill('#212529');
        textSize(9.5);
        if (e.lane === 'top') {
            textAlign(CENTER, BOTTOM);
            textStyle(BOLD);
            text(e.year | 0, ex, ey - 14);
            textStyle(NORMAL);
        } else {
            // Stagger labels in 3 vertical levels to avoid overlap in the
            // 2014–2024 cluster
            textAlign(CENTER, TOP);
            const short = shortLabel(e.name);
            const stagger = (i % 3) * 12;
            const labelY = ey + 14 + stagger;
            // Tick from marker down to label
            stroke('#ced4da'); strokeWeight(1);
            if (stagger > 0) line(ex, ey + 8, ex, labelY - 2);
            noStroke();
            fill('#212529');
            text(short, ex, labelY);
        }
    }

    // Detail panel
    drawDetailPanel(marginX, detailY, usableW, detailH);

    // Tooltip
    if (hoveredEvent >= 0 && selectedEvent !== hoveredEvent) {
        const e = EVENTS[hoveredEvent];
        const tx = yearToX(e.year);
        const ty = e.lane === 'top' ? topLaneY : bottomLaneY;
        drawTooltip(e.name, tx, ty);
    }

    // Controls strip background
    noStroke();
    fill(248);
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220);
    line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    // Legend (right side of control strip) — start far enough right to
    // clear the Reset button (which ends at x ~= 570 on default width).
    const legendX = Math.max(containerWidth - 210, 585);
    drawLegend(legendX, drawHeight + 12);

    // Compare overlay (drawn last)
    if (showCompare) drawCompareOverlay();
}

function shortLabel(name) {
    // e.g. "PHEIC: COVID-19" -> "COVID-19"
    const idx = name.indexOf(':');
    let s = idx >= 0 ? name.substring(idx + 1).trim() : name;
    // Drop parenthetical detail for label
    const par = s.indexOf('(');
    if (par > 0) s = s.substring(0, par).trim();
    if (s.length > 14) s = s.substring(0, 12) + '..';
    return s;
}

function drawDiamond(cx, cy, size) {
    const h = size / 2;
    quad(cx, cy - h, cx + h, cy, cx, cy + h, cx - h, cy);
}

function drawDetailPanel(x, y, w, h) {
    fill(250, 251, 253);
    stroke(220);
    strokeWeight(1);
    rect(x, y, w, h, 5);
    noStroke();

    if (selectedEvent < 0) {
        fill('#6c757d');
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(ITALIC);
        text('Click any marker for event details. Use the zoom slider to expand the 2019–2024 cluster.',
             x + w / 2, y + h / 2);
        textStyle(NORMAL);
        return;
    }

    const e = EVENTS[selectedEvent];
    // Color bar
    const catColor = categoryColor(e.cat);
    fill(catColor[0], catColor[1], catColor[2]);
    rect(x, y, w, 5, 5, 5, 0, 0);

    // Header
    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(e.name + '  (' + (e.year | 0) + ')', x + 12, y + 12);
    textStyle(NORMAL);

    // Category badge text
    fill('#6c757d');
    textSize(10.5);
    textStyle(ITALIC);
    text(categoryLabel(e.cat), x + 12, y + 30);
    textStyle(NORMAL);

    // Description
    fill('#212529');
    textSize(11.5);
    text(e.desc, x + 12, y + 48, w - 24, 50);

    // Outcome
    fill('#1a3a6c');
    textSize(11);
    textStyle(BOLD);
    const outY = y + h - 22;
    text('Outcome: ', x + 12, outY);
    textStyle(NORMAL);
    fill('#212529');
    text(e.outcome, x + 70, outY, w - 80);
}

function categoryColor(cat) {
    if (cat === 'ihr-milestone') return [26, 115, 232];
    if (cat === 'sars')          return [220, 53, 69];
    if (cat === 'pheic-ended')   return [76, 175, 80];
    if (cat === 'pheic-ongoing') return [255, 140, 0];
    return [108, 117, 125];
}

function categoryLabel(cat) {
    if (cat === 'ihr-milestone') return 'IHR legal milestone (blue diamond)';
    if (cat === 'sars')          return 'Major outbreak (pre-IHR-2005)';
    if (cat === 'pheic-ended')   return 'PHEIC declared and ended';
    if (cat === 'pheic-ongoing') return 'PHEIC ongoing';
    return '';
}

function drawLegend(x, y) {
    // Compact 2 column x 2 row legend; tight column spacing
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    const col2 = 100;

    // Row 1
    fill(26, 115, 232); drawDiamond(x + 8, y + 8, 10);
    fill('#212529'); text('IHR milestone', x + 18, y + 8);

    fill(255, 140, 0); ellipse(x + col2 + 8, y + 8, 10);
    fill(255, 140, 0, 120); ellipse(x + col2 + 8, y + 8, 16);
    fill('#212529'); text('PHEIC ongoing', x + col2 + 18, y + 8);

    // Row 2
    fill(255, 140, 0); ellipse(x + 8, y + 28, 10);
    noFill(); stroke(76, 175, 80); strokeWeight(2); ellipse(x + 8, y + 28, 14);
    noStroke(); fill('#212529'); text('PHEIC ended', x + 18, y + 28);

    fill(220, 53, 69); ellipse(x + col2 + 8, y + 28, 10);
    fill('#212529'); text('Outbreak pre-2005', x + col2 + 18, y + 28);
}

function drawTooltip(label, mx, my) {
    textSize(11);
    const tw = textWidth(label) + 12;
    const th = 18;
    let tx = mx - tw / 2;
    let ty = my - th - 14;
    if (tx < 4) tx = 4;
    if (tx + tw > containerWidth - 4) tx = containerWidth - tw - 4;
    if (ty < 30) ty = my + 14;
    fill(40, 40, 40, 235);
    noStroke();
    rect(tx, ty, tw, th, 3);
    fill(255);
    textAlign(CENTER, CENTER);
    text(label, tx + tw / 2, ty + th / 2);
}

function drawCompareOverlay() {
    // Dim background
    noStroke();
    fill(0, 0, 0, 120);
    rect(0, 0, containerWidth, drawHeight);

    // Panel
    const pw = Math.min(containerWidth - 40, 760);
    const ph = drawHeight - 30;
    const px = (containerWidth - pw) / 2;
    const py = 15;
    fill(255);
    stroke('#1a3a6c');
    strokeWeight(2);
    rect(px, py, pw, ph, 6);
    noStroke();

    // Title
    fill('#1a3a6c');
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Comparing WHO Response Timelines', px + pw / 2, py + 10);
    textStyle(NORMAL);
    fill('#6c757d');
    textSize(10.5);
    textStyle(ITALIC);
    text('Time from first known cases to key WHO actions', px + pw / 2, py + 28);
    textStyle(NORMAL);

    // Three columns
    const colW = (pw - 30) / 3;
    const rowsY = py + 56;
    const rowH = 28;
    for (let c = 0; c < COMPARE_DATA.length; c++) {
        const cd = COMPARE_DATA[c];
        const cx = px + 15 + c * colW;
        // Header bar
        fill(cd.color[0], cd.color[1], cd.color[2]);
        rect(cx, rowsY, colW - 10, 24, 4);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(cd.name, cx + (colW - 10) / 2, rowsY + 12);
        textStyle(NORMAL);

        // Rows
        for (let r = 0; r < cd.rows.length; r++) {
            const ry = rowsY + 30 + r * rowH;
            if (r % 2 === 0) {
                fill(247, 249, 252);
                rect(cx, ry, colW - 10, rowH);
            }
            fill('#495057');
            textAlign(LEFT, TOP);
            textSize(10.5);
            textStyle(BOLD);
            text(cd.rows[r][0], cx + 6, ry + 4);
            textStyle(NORMAL);
            fill('#212529');
            text(cd.rows[r][1], cx + 6, ry + 16, colW - 18);
        }
    }

    // Footer note
    fill('#6c757d');
    textAlign(CENTER, BOTTOM);
    textSize(10);
    textStyle(ITALIC);
    text('Faster declarations followed each criticized response — but speed alone does not determine outcomes.',
         px + pw / 2, py + ph - 22);
    textStyle(NORMAL);

    // Close button
    const cbW = 70, cbH = 22;
    const cbX = px + pw - cbW - 10;
    const cbY = py + 8;
    fill('#6c757d');
    rect(cbX, cbY, cbW, cbH, 3);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text('Close', cbX + cbW / 2, cbY + cbH / 2);
    textStyle(NORMAL);
    closeBtnRect = { x: cbX, y: cbY, w: cbW, h: cbH };
}

function mousePressed() {
    if (showCompare) {
        if (closeBtnRect &&
            mouseX >= closeBtnRect.x && mouseX <= closeBtnRect.x + closeBtnRect.w &&
            mouseY >= closeBtnRect.y && mouseY <= closeBtnRect.y + closeBtnRect.h) {
            showCompare = false;
            return;
        }
        return; // ignore other clicks while overlay open
    }

    // Hit-test events
    const leftLabelW = 110;
    const marginX = leftLabelW + 8;
    const rightMargin = 20;
    const usableW = containerWidth - marginX - rightMargin;
    const topLaneY = 70;
    const bottomLaneY = 160;
    const yearMin = 1969;
    const yearMax = 2024;
    const zoom = zoomSlider ? zoomSlider.value() : 1;
    const zoomStart = 2019;
    const zoomEnd = 2024;
    const preFrac = (zoomStart - yearMin);
    const zoomFrac = (zoomEnd - zoomStart) * zoom;
    const postFrac = (yearMax - zoomEnd);
    const totalFrac = preFrac + zoomFrac + postFrac;
    const yearToX = (y) => {
        let pos;
        if (y <= zoomStart) pos = (y - yearMin);
        else if (y <= zoomEnd) pos = preFrac + (y - zoomStart) * zoom;
        else pos = preFrac + zoomFrac + (y - zoomEnd);
        return marginX + (pos / totalFrac) * usableW;
    };

    for (let i = 0; i < EVENTS.length; i++) {
        const e = EVENTS[i];
        const ex = yearToX(e.year);
        const ey = e.lane === 'top' ? topLaneY : bottomLaneY;
        if (dist(mouseX, mouseY, ex, ey) < 14) {
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
