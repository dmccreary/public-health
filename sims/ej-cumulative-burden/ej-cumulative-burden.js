// Environmental Justice Cumulative Burden Explorer
// CANVAS_HEIGHT: 530
// Concept map of EJScreen-style cumulative burden across six archetypal U.S. communities.
// Stylized US outline with clickable hotspots; side panel shows hazards, vulnerabilities,
// percentile, and history. A threshold slider filters which hotspots are highlighted.

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 290;
let defaultTextSize = 14;

let thresholdSlider;
let resetButton;
let selectedHotspot = null;
let hoverHotspot = null;

// Six archetypal EJ hotspots. x/y are FRACTIONS of (canvasWidth, mapHeight)
// inside the stylized U.S. outline region.
const hotspots = [
    {
        id: 'gulf',
        name: 'Gulf Coast Petrochemical Corridor',
        shortName: 'Gulf Coast',
        xFrac: 0.50, yFrac: 0.82,
        percentile: 92,
        hazards: ['Refinery air emissions (benzene, SO2)', 'Petrochemical plant flaring', 'Chemical spill risk'],
        vulnerabilities: ['Low income (68%)', 'Predominantly Black communities (72%)'],
        history: 'A 130-km industrial corridor along the lower Mississippi River known as "Cancer Alley" has hosted petrochemical plants since the 1940s on land that was formerly plantations.'
    },
    {
        id: 'appalachia',
        name: 'Appalachian Coalfield Community',
        shortName: 'Appalachia',
        xFrac: 0.70, yFrac: 0.50,
        percentile: 84,
        hazards: ['Mountaintop-removal mining dust', 'Coal slurry impoundments', 'Stream contamination'],
        vulnerabilities: ['Low income (61%)', 'Limited healthcare access'],
        history: 'A century of underground and surface coal mining in central Appalachia has left contaminated streams, black-lung disease, and persistent poverty after the mines closed.'
    },
    {
        id: 'la',
        name: 'Los Angeles Basin (Traffic + Ports)',
        shortName: 'LA Basin',
        xFrac: 0.13, yFrac: 0.60,
        percentile: 95,
        hazards: ['Diesel PM from port and freight', 'Traffic-related air pollution', 'Ozone (basin trapping)'],
        vulnerabilities: ['Linguistic isolation (38%)', 'Predominantly Latino communities (76%)'],
        history: 'Communities of color near the Ports of Los Angeles and Long Beach and along the I-710 freight corridor have been exposed for decades to one of the highest diesel particulate burdens in the country.'
    },
    {
        id: 'chicago',
        name: 'Chicago Industrial South Side',
        shortName: 'Chicago',
        xFrac: 0.58, yFrac: 0.42,
        percentile: 88,
        hazards: ['Petcoke dust piles', 'Legacy steel-mill contamination', 'Brownfields'],
        vulnerabilities: ['Predominantly Black & Latino (84%)', 'Low income (55%)'],
        history: 'After mid-20th-century redlining concentrated Black and Latino residents on the industrial South Side, deindustrialization left behind contaminated soil and petcoke storage that triggered the 2014 community organizing wins.'
    },
    {
        id: 'navajo',
        name: 'Navajo Nation Uranium Legacy',
        shortName: 'Navajo Nation',
        xFrac: 0.27, yFrac: 0.50,
        percentile: 90,
        hazards: ['Abandoned uranium mines (>500)', 'Radionuclides in groundwater', 'Mill tailings exposure'],
        vulnerabilities: ['Indigenous community (>90%)', 'Limited running water access (~30%)'],
        history: 'From 1944 to 1986 the federal government contracted uranium extraction across the Navajo Nation; more than 500 abandoned mines remain, and many families still draw drinking water from contaminated wells.'
    },
    {
        id: 'delta',
        name: 'Mississippi Delta Agricultural Runoff',
        shortName: 'MS Delta',
        xFrac: 0.55, yFrac: 0.68,
        percentile: 81,
        hazards: ['Pesticide drift (atrazine, glyphosate)', 'Nitrate-contaminated wells', 'Fertilizer runoff'],
        vulnerabilities: ['Low income (62%)', 'Predominantly Black communities (70%)'],
        history: 'Decades of intensive cotton and soybean agriculture on land worked by sharecroppers have left Delta residents with nitrate-contaminated drinking water and aerial pesticide drift, on top of one of the highest poverty rates in the country.'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Threshold slider (EJScreen percentile filter)
    thresholdSlider = createSlider(0, 100, 0, 1);
    thresholdSlider.parent(document.querySelector('main'));
    thresholdSlider.position(sliderLeftMargin, drawHeight + 15);
    thresholdSlider.size(canvasWidth - sliderLeftMargin - margin - 90);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.parent(document.querySelector('main'));
    resetButton.position(canvasWidth - margin - 70, drawHeight + 12);
    resetButton.mousePressed(() => {
        selectedHotspot = null;
        thresholdSlider.value(0);
    });

    describe('An interactive concept map of environmental justice cumulative burden. A stylized U.S. outline shows six clickable archetypal community hotspots. Clicking a hotspot displays a side panel with top environmental hazards, demographic vulnerabilities, an illustrative EJScreen percentile, and a brief community history. A slider adjusts the cumulative burden threshold; only hotspots at or above the threshold are highlighted in red.', LABEL);
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
    text('Environmental Justice: Cumulative Burden Hotspots', canvasWidth / 2, 10);
    textSize(12);
    fill(80);
    text('Click a hotspot to view its hazards, vulnerabilities, and history. Drag the slider to filter by EJScreen percentile.',
         canvasWidth / 2, 36);

    // ---- Layout: map on left ~60%, side panel on right ~40% ----
    let mapLeft = 15;
    let mapTop = 60;
    let panelWidth = min(310, canvasWidth * 0.38);
    let mapWidth = canvasWidth - panelWidth - 25 - mapLeft;
    let mapHeight = drawHeight - mapTop - 65; // leave room for legend below

    drawUSOutline(mapLeft, mapTop, mapWidth, mapHeight);

    // Determine hover (over a hotspot)
    hoverHotspot = null;
    for (let h of hotspots) {
        let hx = mapLeft + h.xFrac * mapWidth;
        let hy = mapTop + h.yFrac * mapHeight;
        let d = dist(mouseX, mouseY, hx, hy);
        if (d < 14) {
            hoverHotspot = h;
            break;
        }
    }
    cursor(hoverHotspot ? HAND : ARROW);

    // Draw hotspots
    let threshold = thresholdSlider.value();
    for (let h of hotspots) {
        let hx = mapLeft + h.xFrac * mapWidth;
        let hy = mapTop + h.yFrac * mapHeight;
        let highlighted = h.percentile >= threshold;
        let isSelected = (selectedHotspot && selectedHotspot.id === h.id);
        let isHover = (hoverHotspot && hoverHotspot.id === h.id);

        // outer ring for selected/hover
        if (isSelected) {
            noFill();
            stroke('black');
            strokeWeight(2);
            ellipse(hx, hy, 26, 26);
        } else if (isHover) {
            noFill();
            stroke(60);
            strokeWeight(1.5);
            ellipse(hx, hy, 24, 24);
        }

        // hotspot circle
        strokeWeight(1);
        if (highlighted) {
            stroke('darkred');
            fill('crimson');
        } else {
            stroke('gray');
            fill(220);
        }
        ellipse(hx, hy, 16, 16);

        // small label
        noStroke();
        fill(highlighted ? 0 : 110);
        textSize(11);
        textAlign(LEFT, CENTER);
        text(h.shortName, hx + 12, hy - 12);
    }

    // ---- Legend (below the map) ----
    drawLegend(mapLeft, mapTop + mapHeight + 8, mapWidth);

    // ---- Side info panel ----
    drawInfoPanel(canvasWidth - panelWidth - 15, mapTop, panelWidth, drawHeight - mapTop - 15);

    // ---- Hover tooltip ----
    if (hoverHotspot && !selectedHotspot) {
        drawTooltip(hoverHotspot);
    }

    // ---- Control area labels ----
    noStroke();
    fill('black');
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Cumulative Burden Threshold: ' + thresholdSlider.value() + 'th percentile',
         10, drawHeight + controlHeight / 2);
}

// -------- Stylized US outline (very simplified polygon) --------
function drawUSOutline(x, y, w, h) {
    push();
    translate(x, y);
    noStroke();
    fill('white');
    stroke('silver');
    rect(0, 0, w, h, 6);

    // simplified continental US shape, normalized 0..1, scaled to (w,h)
    let pts = [
        [0.02, 0.32], [0.06, 0.18], [0.14, 0.10], [0.24, 0.08],
        [0.38, 0.06], [0.54, 0.04], [0.68, 0.05], [0.80, 0.10],
        [0.90, 0.16], [0.94, 0.28], [0.96, 0.42], [0.93, 0.55],
        [0.88, 0.62], [0.80, 0.66], [0.72, 0.72], [0.66, 0.82],
        [0.60, 0.86], [0.52, 0.88], [0.46, 0.84], [0.40, 0.86],
        [0.32, 0.82], [0.22, 0.76], [0.16, 0.66], [0.10, 0.58],
        [0.06, 0.48]
    ];
    fill('#eef3e8');
    stroke('#7a8a6a');
    strokeWeight(1.2);
    beginShape();
    for (let p of pts) vertex(p[0] * w, p[1] * h);
    endShape(CLOSE);

    // hint of state divisions (decorative only)
    stroke('#c7d2bc');
    strokeWeight(0.8);
    line(0.30 * w, 0.10 * h, 0.30 * w, 0.78 * h);
    line(0.50 * w, 0.06 * h, 0.50 * w, 0.84 * h);
    line(0.70 * w, 0.08 * h, 0.70 * w, 0.78 * h);
    line(0.06 * w, 0.40 * h, 0.94 * w, 0.40 * h);

    // small label
    noStroke();
    fill(120);
    textSize(10);
    textAlign(LEFT, TOP);
    text('Stylized U.S. outline — illustrative, not to scale', 6, h - 14);
    pop();
}

// -------- Legend --------
function drawLegend(x, y, w) {
    push();
    noStroke();
    fill(255, 255, 255, 230);
    stroke(200);
    rect(x, y, w, 50, 6);

    noStroke();
    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    text('Legend', x + 8, y + 4);

    // Decide whether to use one-row or two-row layout based on width.
    // Each item needs ~ 230 px (icon + text). Two items in one row need ~ 480 px plus margins.
    let twoColumn = (w >= 520);

    // Environmental indicator (red)
    fill('crimson');
    stroke('darkred');
    ellipse(x + 22, y + 26, 12, 12);
    noStroke();
    fill('black');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Environmental indicator (red)', x + 35, y + 26);

    // Demographic vulnerability (blue)
    let blueX, blueY;
    if (twoColumn) {
        blueX = x + Math.floor(w / 2) + 10;
        blueY = y + 26;
    } else {
        blueX = x + 22;
        blueY = y + 42;
    }
    fill('steelblue');
    stroke('navy');
    ellipse(blueX, blueY, 12, 12);
    noStroke();
    fill('black');
    text('Demographic vulnerability (blue)', blueX + 13, blueY);

    pop();
}

// -------- Side info panel --------
function drawInfoPanel(x, y, w, h) {
    push();
    fill(255, 255, 255, 245);
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);

    if (!selectedHotspot) {
        textSize(13);
        fill(80);
        text('Click any red or gray dot on the map to inspect that community\'s cumulative burden profile.',
             x + 10, y + 12, w - 20);

        // Threshold explanation
        textSize(12);
        fill(60);
        let yPos = y + 90;
        text('About the threshold slider', x + 10, yPos);
        textSize(11);
        fill(80);
        text('EJScreen reports each indicator as a percentile relative to the national distribution. ' +
             'Public agencies must pick a cutoff — say, the 80th percentile — to identify "burdened" ' +
             'communities for intervention. Raising the threshold reduces the count of qualifying ' +
             'communities; lowering it expands the count. There is no objectively correct value.',
             x + 10, yPos + 18, w - 20);
        pop();
        return;
    }

    // Selected hotspot details
    let h0 = selectedHotspot;
    textSize(15);
    fill('black');
    text(h0.name, x + 10, y + 10, w - 20);

    // Percentile badge
    let badgeY = y + 38;
    fill('crimson');
    stroke('darkred');
    rect(x + 10, badgeY, 80, 22, 4);
    noStroke();
    fill('white');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('EJScreen ' + h0.percentile, x + 50, badgeY + 11);
    textAlign(LEFT, TOP);

    // Hazards section
    let yc = y + 70;
    fill('darkred');
    textSize(12);
    text('Top environmental hazards', x + 10, yc);
    fill('black');
    textSize(11);
    for (let i = 0; i < h0.hazards.length; i++) {
        // red dot
        fill('crimson');
        noStroke();
        ellipse(x + 16, yc + 22 + i * 18, 6, 6);
        fill('black');
        text(h0.hazards[i], x + 26, yc + 17 + i * 18, w - 36);
    }

    // Vulnerabilities section
    yc = yc + 22 + h0.hazards.length * 18 + 8;
    fill('navy');
    textSize(12);
    text('Demographic vulnerability factors', x + 10, yc);
    fill('black');
    textSize(11);
    for (let i = 0; i < h0.vulnerabilities.length; i++) {
        fill('steelblue');
        noStroke();
        ellipse(x + 16, yc + 22 + i * 18, 6, 6);
        fill('black');
        text(h0.vulnerabilities[i], x + 26, yc + 17 + i * 18, w - 36);
    }

    // History section
    yc = yc + 22 + h0.vulnerabilities.length * 18 + 8;
    fill(60);
    textSize(12);
    text('Exposure history', x + 10, yc);
    fill('black');
    textSize(11);
    text(h0.history, x + 10, yc + 18, w - 20);

    pop();
}

// -------- Hover tooltip --------
function drawTooltip(h) {
    push();
    let tx = mouseX + 12;
    let ty = mouseY - 28;
    textSize(11);
    let label = h.shortName + ' (EJScreen ' + h.percentile + ')';
    let tw = textWidth(label) + 12;
    if (tx + tw > canvasWidth - 5) tx = canvasWidth - 5 - tw;
    if (ty < 5) ty = 5;
    fill(0, 0, 0, 220);
    noStroke();
    rect(tx, ty, tw, 22, 4);
    fill('white');
    textAlign(LEFT, CENTER);
    text(label, tx + 6, ty + 11);
    pop();
}

function mousePressed() {
    // Only respond to clicks inside the canvas
    if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
    if (hoverHotspot) {
        selectedHotspot = hoverHotspot;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    if (typeof thresholdSlider !== 'undefined') {
        thresholdSlider.size(canvasWidth - sliderLeftMargin - margin - 90);
    }
    if (typeof resetButton !== 'undefined') {
        resetButton.position(canvasWidth - margin - 70, drawHeight + 12);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
