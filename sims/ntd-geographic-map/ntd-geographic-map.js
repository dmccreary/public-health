// Neglected Tropical Diseases Geographic Distribution
// CANVAS_HEIGHT: 560
// Stylized world map with country regions shaded by NTD burden intensity.
// Click any region to view top NTDs, DALY estimate, and program status.
// Dropdown selects an individual NTD; toggle switches between total DALYs and DALYs per 100k.
// Data is illustrative, modeled on IHME GBD 2021 estimates.

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 14;

let ntdSelect;
let metricSelect;
let resetButton;
let selectedRegion = null;
let hoverRegion = null;

// Color ramp endpoints (sequential single-hue)
const RAMP_LOW = [255, 247, 230];   // pale cream
const RAMP_HIGH = [120, 30, 20];    // dark brick
const NO_DATA = [225, 225, 225];

// Endemic country/region polygons drawn on a stylized world map.
// Each polygon is a normalized (0..1) shape in (lon-fraction, lat-fraction) space
// across a Robinson-ish stylized world frame.
// burden = total NTD DALYs (illustrative, IHME GBD 2021 style, thousands).
// per100k = DALY rate per 100,000 population (illustrative).
// pc = on preventive-chemotherapy (PC) program support? (true/false)
// ntds: top three NTDs by burden in that region (consistent with WHO endemicity maps).
const regions = [
    {
        id: 'wafrica',
        name: 'West Africa (Nigeria, Ghana, Côte d\'Ivoire)',
        shortName: 'West Africa',
        burden: 4200, per100k: 980, pc: true,
        ntds: ['Soil-transmitted helminths', 'Schistosomiasis', 'Lymphatic filariasis'],
        // single-NTD distribution multipliers (0..1)
        sth: 1.0, schisto: 0.95, lf: 0.90, trachoma: 0.55, oncho: 0.85,
        poly: [
            [0.42, 0.52], [0.46, 0.48], [0.50, 0.48], [0.52, 0.52],
            [0.52, 0.58], [0.49, 0.62], [0.45, 0.62], [0.42, 0.58]
        ]
    },
    {
        id: 'cafrica',
        name: 'Central Africa (DRC, Cameroon, CAR)',
        shortName: 'Central Africa',
        burden: 3650, per100k: 1120, pc: true,
        ntds: ['Soil-transmitted helminths', 'Schistosomiasis', 'Onchocerciasis'],
        sth: 0.95, schisto: 0.85, lf: 0.80, trachoma: 0.50, oncho: 1.00,
        poly: [
            [0.53, 0.54], [0.58, 0.52], [0.61, 0.56], [0.60, 0.62],
            [0.56, 0.66], [0.52, 0.64], [0.51, 0.58]
        ]
    },
    {
        id: 'eafrica',
        name: 'East Africa (Ethiopia, Kenya, Tanzania, Uganda)',
        shortName: 'East Africa',
        burden: 3900, per100k: 970, pc: true,
        ntds: ['Schistosomiasis', 'Soil-transmitted helminths', 'Trachoma'],
        sth: 0.90, schisto: 1.00, lf: 0.70, trachoma: 1.00, oncho: 0.70,
        poly: [
            [0.62, 0.50], [0.66, 0.48], [0.70, 0.52], [0.70, 0.60],
            [0.67, 0.66], [0.63, 0.66], [0.61, 0.58]
        ]
    },
    {
        id: 'safrica',
        name: 'Southern Africa (Mozambique, Madagascar, Zambia)',
        shortName: 'Southern Africa',
        burden: 1900, per100k: 720, pc: true,
        ntds: ['Schistosomiasis', 'Soil-transmitted helminths', 'Lymphatic filariasis'],
        sth: 0.75, schisto: 0.90, lf: 0.65, trachoma: 0.40, oncho: 0.35,
        poly: [
            [0.55, 0.70], [0.61, 0.70], [0.65, 0.74], [0.64, 0.80],
            [0.59, 0.82], [0.54, 0.78]
        ]
    },
    {
        id: 'india',
        name: 'South Asia (India, Bangladesh, Nepal)',
        shortName: 'South Asia',
        burden: 5800, per100k: 410, pc: true,
        ntds: ['Soil-transmitted helminths', 'Lymphatic filariasis', 'Visceral leishmaniasis'],
        sth: 1.00, schisto: 0.10, lf: 1.00, trachoma: 0.45, oncho: 0.00,
        poly: [
            [0.75, 0.42], [0.79, 0.40], [0.82, 0.44], [0.81, 0.52],
            [0.78, 0.54], [0.75, 0.52], [0.74, 0.46]
        ]
    },
    {
        id: 'sea',
        name: 'Southeast Asia (Indonesia, Philippines, Vietnam)',
        shortName: 'Southeast Asia',
        burden: 2700, per100k: 380, pc: true,
        ntds: ['Soil-transmitted helminths', 'Lymphatic filariasis', 'Schistosomiasis'],
        sth: 0.95, schisto: 0.55, lf: 0.90, trachoma: 0.30, oncho: 0.00,
        poly: [
            [0.83, 0.56], [0.89, 0.55], [0.92, 0.59], [0.91, 0.65],
            [0.86, 0.66], [0.83, 0.62]
        ]
    },
    {
        id: 'amazon',
        name: 'Amazon Basin (Brazil, Peru, Colombia)',
        shortName: 'Amazon Basin',
        burden: 1100, per100k: 290, pc: true,
        ntds: ['Soil-transmitted helminths', 'Schistosomiasis', 'Chagas disease'],
        sth: 0.80, schisto: 0.60, lf: 0.30, trachoma: 0.20, oncho: 0.40,
        poly: [
            [0.21, 0.60], [0.27, 0.58], [0.31, 0.62], [0.31, 0.70],
            [0.27, 0.76], [0.22, 0.72], [0.20, 0.66]
        ]
    },
    {
        id: 'camerica',
        name: 'Central America (Guatemala, Honduras, Nicaragua)',
        shortName: 'C. America',
        burden: 380, per100k: 240, pc: true,
        ntds: ['Soil-transmitted helminths', 'Chagas disease', 'Onchocerciasis'],
        sth: 0.70, schisto: 0.00, lf: 0.20, trachoma: 0.10, oncho: 0.55,
        poly: [
            [0.15, 0.46], [0.20, 0.46], [0.21, 0.50], [0.18, 0.53],
            [0.14, 0.50]
        ]
    },
    {
        id: 'mena',
        name: 'Middle East / North Africa (Yemen, Sudan, Egypt)',
        shortName: 'MENA',
        burden: 1500, per100k: 310, pc: false,
        ntds: ['Schistosomiasis', 'Trachoma', 'Cutaneous leishmaniasis'],
        sth: 0.50, schisto: 0.85, lf: 0.30, trachoma: 0.90, oncho: 0.15,
        poly: [
            [0.50, 0.36], [0.58, 0.34], [0.66, 0.36], [0.68, 0.42],
            [0.66, 0.46], [0.58, 0.46], [0.52, 0.44]
        ]
    }
];

const ntdOptions = [
    { key: 'all',      label: 'All NTDs (combined burden)' },
    { key: 'sth',      label: 'Soil-transmitted helminths' },
    { key: 'schisto',  label: 'Schistosomiasis' },
    { key: 'lf',       label: 'Lymphatic filariasis' },
    { key: 'trachoma', label: 'Trachoma' },
    { key: 'oncho',    label: 'Onchocerciasis' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // NTD selector dropdown
    ntdSelect = createSelect();
    ntdSelect.parent(document.querySelector('main'));
    for (let opt of ntdOptions) ntdSelect.option(opt.label, opt.key);
    ntdSelect.selected('all');
    ntdSelect.position(150, drawHeight + 10);
    ntdSelect.size(280);

    // Metric toggle dropdown (total vs per 100k)
    metricSelect = createSelect();
    metricSelect.parent(document.querySelector('main'));
    metricSelect.option('Total DALY burden (thousands)', 'total');
    metricSelect.option('DALYs per 100,000 population', 'per100k');
    metricSelect.selected('total');
    metricSelect.position(150, drawHeight + 45);
    metricSelect.size(280);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.parent(document.querySelector('main'));
    resetButton.position(canvasWidth - margin - 70, drawHeight + 28);
    resetButton.mousePressed(() => {
        selectedRegion = null;
        ntdSelect.selected('all');
        metricSelect.selected('total');
    });

    describe('A stylized world map showing endemic regions for neglected tropical diseases. Country regions are shaded from pale cream (low burden) to dark red (high burden) based on illustrative IHME GBD 2021 disability-adjusted life year estimates. A dropdown selects an individual NTD (soil-transmitted helminths, schistosomiasis, lymphatic filariasis, trachoma, onchocerciasis), and a second dropdown toggles between total DALY burden and DALYs per 100,000 population. Clicking a region opens a panel showing top three NTDs, total DALYs, and preventive-chemotherapy program status.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    noStroke();
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    noStroke();
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // ---- Title ----
    fill('black');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text('Neglected Tropical Diseases: Geographic Distribution', canvasWidth / 2, 8);
    textSize(11);
    fill(80);
    text('Click any endemic region to see its top NTDs and program status. Use the dropdowns to filter by disease and metric.',
        canvasWidth / 2, 32);

    // ---- Layout: map on left ~63%, side panel on right ~37% ----
    let mapLeft = 12;
    let mapTop = 56;
    let panelWidth = min(280, canvasWidth * 0.36);
    let mapWidth = canvasWidth - panelWidth - 22 - mapLeft;
    let mapHeight = drawHeight - mapTop - 70;  // leave room for legend below

    drawWorldOutline(mapLeft, mapTop, mapWidth, mapHeight);

    let selectedNtd = ntdSelect.value();
    let metric = metricSelect.value();
    let maxVal = computeMaxValue(selectedNtd, metric);

    // Determine hover
    hoverRegion = null;
    for (let r of regions) {
        if (pointInRegion(mouseX, mouseY, r, mapLeft, mapTop, mapWidth, mapHeight)) {
            hoverRegion = r;
            break;
        }
    }
    cursor(hoverRegion ? HAND : ARROW);

    // Draw region polygons
    for (let r of regions) {
        let val = computeRegionValue(r, selectedNtd, metric);
        let factor = maxVal > 0 ? val / maxVal : 0;
        let col = rampColor(factor, val);
        let isSelected = (selectedRegion && selectedRegion.id === r.id);
        let isHover = (hoverRegion && hoverRegion.id === r.id);

        if (isSelected) {
            stroke('black');
            strokeWeight(2.5);
        } else if (isHover) {
            stroke(50);
            strokeWeight(1.6);
        } else {
            stroke(110);
            strokeWeight(0.9);
        }
        fill(col[0], col[1], col[2]);

        beginShape();
        for (let p of r.poly) {
            vertex(mapLeft + p[0] * mapWidth, mapTop + p[1] * mapHeight);
        }
        endShape(CLOSE);

        // small label at polygon centroid
        let c = polygonCentroid(r.poly);
        noStroke();
        fill(factor > 0.55 ? 'white' : 'black');
        textSize(10);
        textAlign(CENTER, CENTER);
        text(r.shortName, mapLeft + c[0] * mapWidth, mapTop + c[1] * mapHeight);
    }

    // ---- Legend (below the map) ----
    drawLegend(mapLeft, mapTop + mapHeight + 8, mapWidth, maxVal, metric);

    // ---- Side info panel ----
    drawInfoPanel(canvasWidth - panelWidth - 12, mapTop, panelWidth, drawHeight - mapTop - 15,
        selectedNtd, metric);

    // ---- Hover tooltip ----
    if (hoverRegion && (!selectedRegion || selectedRegion.id !== hoverRegion.id)) {
        let val = computeRegionValue(hoverRegion, selectedNtd, metric);
        drawTooltip(hoverRegion, val, metric);
    }

    // ---- Control area labels ----
    noStroke();
    fill('black');
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('NTD:', 10, drawHeight + 22);
    text('Metric:', 10, drawHeight + 57);

    // Data attribution line at bottom of control area
    textSize(10);
    fill(110);
    textAlign(LEFT, BOTTOM);
    text('Illustrative data modeled on IHME GBD 2021. Not a substitute for official WHO/IHME estimates.',
        10, drawHeight + controlHeight - 4);
}

// ---- Helpers ----

function computeRegionValue(r, ntdKey, metric) {
    let base = (metric === 'total') ? r.burden : r.per100k;
    if (ntdKey === 'all') return base;
    let mult = r[ntdKey];
    if (mult === undefined) return 0;
    return base * mult;
}

function computeMaxValue(ntdKey, metric) {
    let m = 0;
    for (let r of regions) {
        let v = computeRegionValue(r, ntdKey, metric);
        if (v > m) m = v;
    }
    return m;
}

function rampColor(factor, val) {
    if (val <= 0) return NO_DATA;
    factor = constrain(factor, 0, 1);
    let r = lerp(RAMP_LOW[0], RAMP_HIGH[0], factor);
    let g = lerp(RAMP_LOW[1], RAMP_HIGH[1], factor);
    let b = lerp(RAMP_LOW[2], RAMP_HIGH[2], factor);
    return [r, g, b];
}

function pointInRegion(px, py, r, mapLeft, mapTop, mapWidth, mapHeight) {
    // Convert polygon to absolute coordinates and do point-in-polygon test
    let n = r.poly.length;
    let inside = false;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        let xi = mapLeft + r.poly[i][0] * mapWidth;
        let yi = mapTop + r.poly[i][1] * mapHeight;
        let xj = mapLeft + r.poly[j][0] * mapWidth;
        let yj = mapTop + r.poly[j][1] * mapHeight;
        let intersect = ((yi > py) !== (yj > py)) &&
            (px < (xj - xi) * (py - yi) / (yj - yi + 1e-9) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function polygonCentroid(poly) {
    let cx = 0, cy = 0;
    for (let p of poly) { cx += p[0]; cy += p[1]; }
    return [cx / poly.length, cy / poly.length];
}

// -------- Stylized world outline --------
function drawWorldOutline(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();
    fill('white');
    stroke('silver');
    rect(0, 0, w, h, 6);

    // Ocean tint
    fill(225, 235, 245);
    noStroke();
    rect(2, 2, w - 4, h - 4, 5);

    // Stylized continents (Americas + Africa + Eurasia + Oceania)
    // Each is a simple normalized polygon.
    let landFill = [232, 226, 210];
    let landStroke = [160, 150, 120];

    let continents = [
        // Americas
        [[0.10, 0.30], [0.16, 0.22], [0.22, 0.22], [0.28, 0.30],
         [0.30, 0.40], [0.26, 0.50], [0.30, 0.56], [0.35, 0.66],
         [0.32, 0.78], [0.26, 0.82], [0.22, 0.78], [0.20, 0.66],
         [0.16, 0.56], [0.14, 0.46], [0.10, 0.40]],
        // Africa + Europe + Mid-east blob
        [[0.42, 0.30], [0.50, 0.26], [0.58, 0.26], [0.66, 0.30],
         [0.68, 0.40], [0.66, 0.50], [0.62, 0.64], [0.58, 0.74],
         [0.54, 0.78], [0.50, 0.74], [0.46, 0.66], [0.44, 0.54],
         [0.42, 0.42]],
        // Asia
        [[0.66, 0.24], [0.78, 0.22], [0.88, 0.28], [0.92, 0.36],
         [0.94, 0.46], [0.90, 0.54], [0.84, 0.58], [0.78, 0.56],
         [0.72, 0.50], [0.70, 0.42], [0.68, 0.34]],
        // Southeast Asia / Oceania islands
        [[0.84, 0.58], [0.92, 0.58], [0.94, 0.64], [0.88, 0.66], [0.84, 0.62]],
        [[0.86, 0.74], [0.92, 0.74], [0.94, 0.80], [0.88, 0.82], [0.86, 0.78]]
    ];

    for (let cont of continents) {
        fill(landFill[0], landFill[1], landFill[2]);
        stroke(landStroke[0], landStroke[1], landStroke[2]);
        strokeWeight(0.8);
        beginShape();
        for (let p of cont) vertex(p[0] * w, p[1] * h);
        endShape(CLOSE);
    }

    // Equator hint line
    stroke(180, 180, 200, 130);
    strokeWeight(0.7);
    drawingContext.setLineDash([4, 4]);
    line(2, h * 0.55, w - 2, h * 0.55);
    drawingContext.setLineDash([]);
    noStroke();
    fill(140);
    textSize(9);
    textAlign(LEFT, BOTTOM);
    text('Equator', 6, h * 0.55 - 2);

    // attribution
    noStroke();
    fill(140);
    textSize(9);
    textAlign(RIGHT, BOTTOM);
    text('Stylized world outline — illustrative, not to scale', w - 6, h - 4);
    pop();
}

// -------- Legend --------
function drawLegend(x, y, w, maxVal, metric) {
    push();
    noStroke();
    fill(255, 255, 255, 235);
    stroke(200);
    rect(x, y, w, 56, 6);

    noStroke();
    fill('black');
    textSize(11);
    textAlign(LEFT, TOP);
    let metricLabel = (metric === 'total')
        ? 'DALY burden (thousands)'
        : 'DALYs per 100,000 population';
    text('Legend — ' + metricLabel, x + 8, y + 5);

    // Gradient ramp
    let rampX = x + 8;
    let rampY = y + 24;
    let rampW = Math.min(w - 90, 280);
    let rampH = 14;
    let steps = 60;
    noStroke();
    for (let i = 0; i < steps; i++) {
        let t = i / (steps - 1);
        let cr = lerp(RAMP_LOW[0], RAMP_HIGH[0], t);
        let cg = lerp(RAMP_LOW[1], RAMP_HIGH[1], t);
        let cb = lerp(RAMP_LOW[2], RAMP_HIGH[2], t);
        fill(cr, cg, cb);
        rect(rampX + (i / steps) * rampW, rampY, rampW / steps + 1, rampH);
    }
    stroke(120);
    noFill();
    rect(rampX, rampY, rampW, rampH);

    // End labels
    noStroke();
    fill('black');
    textSize(10);
    textAlign(LEFT, TOP);
    text('Lower', rampX, rampY + rampH + 2);
    textAlign(RIGHT, TOP);
    let maxText = (maxVal > 0) ? nf(Math.round(maxVal), 0) : '0';
    text('Higher (~' + maxText + ')', rampX + rampW, rampY + rampH + 2);

    // No-data swatch
    let ndX = rampX + rampW + 14;
    noStroke();
    fill(NO_DATA[0], NO_DATA[1], NO_DATA[2]);
    stroke(150);
    rect(ndX, rampY, 18, rampH);
    noStroke();
    fill('black');
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Not endemic', ndX + 22, rampY + rampH / 2);

    pop();
}

// -------- Side info panel --------
function drawInfoPanel(x, y, w, h, selectedNtd, metric) {
    push();
    fill(255, 255, 255, 245);
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);

    if (!selectedRegion) {
        textSize(13);
        fill(60);
        text('Click any endemic region to see its NTD profile and program status.',
            x + 10, y + 12, w - 20);

        textSize(12);
        fill(60);
        let yp = y + 70;
        text('About this map', x + 10, yp);
        textSize(11);
        fill(80);
        text('Neglected tropical diseases (NTDs) are 20+ communicable diseases that together affect over 1 billion people, mostly in low-income tropical settings. Burden is concentrated across Sub-Saharan Africa, South Asia, Southeast Asia, and parts of Latin America.',
            x + 10, yp + 18, w - 20);

        textSize(12);
        fill(60);
        yp = y + 200;
        text('Preventive chemotherapy (PC)', x + 10, yp);
        textSize(11);
        fill(80);
        text('WHO-supported mass drug administration reaches over 800 million people per year for STH, LF, schistosomiasis, trachoma, and onchocerciasis. Regions marked PC-supported receive donated medicines through WHO partnerships.',
            x + 10, yp + 18, w - 20);
        pop();
        return;
    }

    // Selected region details
    let r0 = selectedRegion;
    textSize(14);
    fill('black');
    text(r0.name, x + 10, y + 10, w - 20);

    // DALY badge
    let badgeY = y + 56;
    fill('#7a1e14');
    stroke('#3a0f08');
    rect(x + 10, badgeY, w - 20, 26, 4);
    noStroke();
    fill('white');
    textSize(12);
    textAlign(CENTER, CENTER);
    let badgeText;
    if (metric === 'total') {
        badgeText = 'Total NTD DALYs: ~' + nf(r0.burden, 0) + 'K';
    } else {
        badgeText = 'NTD DALYs per 100,000: ~' + nf(r0.per100k, 0);
    }
    text(badgeText, x + (w / 2), badgeY + 13);
    textAlign(LEFT, TOP);

    // Top NTDs section
    let yc = y + 94;
    fill('#7a1e14');
    textSize(12);
    text('Top NTDs by burden', x + 10, yc);
    fill('black');
    textSize(11);
    for (let i = 0; i < r0.ntds.length; i++) {
        fill('crimson');
        noStroke();
        ellipse(x + 16, yc + 23 + i * 20, 7, 7);
        fill('black');
        text(r0.ntds[i], x + 27, yc + 18 + i * 20, w - 38);
    }

    // PC status
    yc = yc + 23 + r0.ntds.length * 20 + 10;
    fill(60);
    textSize(12);
    text('Preventive chemotherapy program', x + 10, yc);
    textSize(11);
    if (r0.pc) {
        fill('darkgreen');
        noStroke();
        ellipse(x + 16, yc + 24, 8, 8);
        fill('black');
        text('Receiving PC support (WHO-coordinated MDA)', x + 27, yc + 19, w - 38);
    } else {
        fill('darkorange');
        noStroke();
        ellipse(x + 16, yc + 24, 8, 8);
        fill('black');
        text('Limited or no PC program coverage', x + 27, yc + 19, w - 38);
    }

    // Selected NTD detail (when filtered)
    if (selectedNtd !== 'all') {
        yc = yc + 42;
        let mult = r0[selectedNtd];
        let opt = ntdOptions.find(o => o.key === selectedNtd);
        fill(60);
        textSize(12);
        text('Selected NTD', x + 10, yc);
        fill('black');
        textSize(11);
        let intensity = mult >= 0.75 ? 'high' : mult >= 0.4 ? 'moderate' : mult > 0 ? 'low' : 'not endemic';
        text(opt.label + ': ' + intensity + ' transmission intensity',
            x + 10, yc + 18, w - 20);
    }

    pop();
}

// -------- Hover tooltip --------
function drawTooltip(r, val, metric) {
    push();
    let label = r.shortName + ' — ' + (metric === 'total'
        ? '~' + nf(Math.round(val), 0) + 'K DALYs'
        : '~' + nf(Math.round(val), 0) + '/100k');
    textSize(11);
    let tw = textWidth(label) + 14;
    let tx = mouseX + 12;
    let ty = mouseY - 28;
    if (tx + tw > canvasWidth - 5) tx = canvasWidth - 5 - tw;
    if (ty < 5) ty = 5;
    fill(0, 0, 0, 220);
    noStroke();
    rect(tx, ty, tw, 22, 4);
    fill('white');
    textAlign(LEFT, CENTER);
    text(label, tx + 7, ty + 11);
    pop();
}

function mousePressed() {
    // Only respond to clicks inside the drawing area
    if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
    if (hoverRegion) {
        selectedRegion = hoverRegion;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    if (typeof resetButton !== 'undefined') {
        resetButton.position(canvasWidth - margin - 70, drawHeight + 28);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
