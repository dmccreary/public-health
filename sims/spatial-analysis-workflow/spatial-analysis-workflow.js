// Spatial Analysis Workflow
// CANVAS_HEIGHT: 620
let canvasWidth = 820;
let drawHeight = 540;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let selected = 0;
let hover = -1;

const stages = [
    {
        name: 'Data Acquisition',
        color: '#4a90e2',
        bullets: [
            'Point data: cases, addresses',
            'Boundary files: shapefiles, GeoJSON',
            'Rate denominators: Census ACS'
        ],
        tools: 'Python: geopandas, requests | R: sf, tigris',
        description: 'Gather point-level events (cases or addresses), the polygon boundaries you will summarize over (census tracts, counties), and population denominators needed to compute rates rather than raw counts.',
        mistake: 'Footgun: mixing data from different vintages — a 2020 shapefile boundary with 2010 population estimates produces silently misaligned rates.'
    },
    {
        name: 'Preprocessing',
        color: '#4a90e2',
        bullets: [
            'Geocode addresses → coordinates',
            'Spatial join cases to tracts',
            'Compute age-standardized rates'
        ],
        tools: 'Python: geopandas.sjoin, pygeohash | R: sf::st_join',
        description: 'Convert addresses to coordinates, attach each case to its containing polygon via a spatial join, and standardize crude rates so populations with different age structures can be compared.',
        mistake: 'Footgun: forgetting to reproject every layer to a common CRS before the spatial join. The join silently returns zero matches or geometrically wrong matches — no error is raised.'
    },
    {
        name: 'Exploratory Mapping',
        color: '#27ae60',
        bullets: [
            'Choropleth: rate-by-polygon',
            'KDE surface: heat map of points',
            'Dot density: cases per dot'
        ],
        tools: 'Python: folium, geopandas.plot | R: ggplot2, tmap',
        description: 'Visualize the spatial distribution before any statistical test. Choropleths show rates per area; KDE smooths point clouds; dot-density preserves the count semantics that choropleths obscure.',
        mistake: 'Footgun: equal-interval bins make tiny rural populations dominate the visual. Use quantile or Jenks-natural-breaks classification instead.'
    },
    {
        name: 'Cluster Detection',
        color: '#e67e22',
        bullets: [
            "Moran's I (global)",
            'LISA map (local clusters)',
            'SaTScan (space-time scan)'
        ],
        tools: 'Python: pysal, esda | R: spdep, rsatscan',
        description: 'Move from "looks clustered" to "is statistically clustered." Global Moran\'s I tests for any autocorrelation; LISA pinpoints which polygons drive that signal; SaTScan finds significant space-time windows.',
        mistake: 'Footgun: declaring a cluster significant without correcting for multiple testing. With 1,000 tracts you will find ~50 "significant" cells by chance at α = 0.05.'
    },
    {
        name: 'Communication',
        color: '#c0392b',
        bullets: [
            'Static map for publication',
            'Leaflet/Folium web map',
            'Shiny/Dash stakeholder dashboard'
        ],
        tools: 'Python: folium, plotly, dash | R: leaflet, shiny',
        description: 'Match the medium to the audience. Print needs a static, color-blind-safe map with a clear legend; partners need an interactive map they can zoom; decision-makers need a small dashboard with a few headline metrics.',
        mistake: 'Footgun: defaulting to red→green color ramps. ~8% of men can\'t distinguish them. Use ColorBrewer "RdBu" or viridis instead.'
    }
];

let stageBounds = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const cy = drawHeight + 12;
    let prev = createButton('◀ Previous stage');
    prev.position(16, cy);
    prev.mousePressed(() => { selected = (selected + stages.length - 1) % stages.length; });
    let next = createButton('Next stage ▶');
    next.position(150, cy);
    next.mousePressed(() => { selected = (selected + 1) % stages.length; });
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Spatial Analysis Workflow', containerWidth / 2, 8);
    textStyle(NORMAL);

    drawPipeline();
    drawDetail();

    // controls
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();
    fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP);
    text('Click any stage to see details.   Color key:  ', 280, drawHeight + 18);
    const keyY = drawHeight + 16;
    let kx = 470;
    const key = [['Data', '#4a90e2'], ['Viz', '#27ae60'], ['Stats', '#e67e22'], ['Output', '#c0392b']];
    for (const [lab, col] of key) {
        fill(col); rect(kx, keyY, 12, 12);
        fill('#333'); text(lab, kx + 16, keyY + 1);
        kx += 70;
    }
}

function drawPipeline() {
    hover = -1;
    stageBounds = [];

    const margin = 16;
    const usableW = containerWidth - 2 * margin;
    const gap = 14;
    const n = stages.length;
    const boxW = (usableW - gap * (n - 1)) / n;
    const boxY = 44;
    const boxH = 110;

    for (let i = 0; i < n; i++) {
        const x = margin + i * (boxW + gap);
        stageBounds.push({x, y: boxY, w: boxW, h: boxH});
        const isHover = mouseX >= x && mouseX <= x + boxW && mouseY >= boxY && mouseY <= boxY + boxH;
        if (isHover) hover = i;
        const isSel = selected === i;

        let c = color(stages[i].color);
        if (isSel) c = lerpColor(c, color(255), -0.10);
        else if (isHover) c = lerpColor(c, color(255), 0.15);
        fill(c);
        stroke(isSel ? '#1a3a6c' : '#444');
        strokeWeight(isSel ? 3 : 1);
        rect(x, boxY, boxW, boxH, 8);
        noStroke();

        // stage number in top-left corner
        fill('rgba(255,255,255,0.85)');
        ellipse(x + 14, boxY + 14, 18, 18);
        fill('#222'); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(i + 1, x + 14, boxY + 14);
        textStyle(NORMAL);

        // name (centered, with left padding so it doesn't overlap the number badge)
        fill(255); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
        const titleLines = wrap(stages[i].name, boxW - 32);
        let ty = boxY + 6;
        for (const ln of titleLines) {
            text(ln, x + boxW/2 + 6, ty); ty += 13;
        }
        textStyle(NORMAL);

        // bullets
        fill(255); textSize(10); textAlign(LEFT, TOP);
        let by = boxY + 6 + 13 * titleLines.length + 4;
        for (const b of stages[i].bullets) {
            const bl = wrap('• ' + b, boxW - 14);
            for (const ln of bl) {
                text(ln, x + 8, by); by += 12;
            }
        }

        // arrow to next
        if (i < n - 1) {
            const ax = x + boxW + 2;
            const ay = boxY + boxH/2;
            stroke('#444'); strokeWeight(2);
            line(ax, ay, ax + gap - 4, ay);
            fill('#444'); noStroke();
            triangle(ax + gap - 4, ay - 5, ax + gap - 4, ay + 5, ax + gap + 1, ay);
        }
    }
}

function drawDetail() {
    const px = 16;
    const py = 44 + 110 + 18;
    const pw = containerWidth - 32;
    const ph = drawHeight - py - 12;
    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    const s = stages[selected];
    fill(s.color); rect(px + 10, py + 10, 8, 24);
    fill('#1a3a6c'); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Stage ' + (selected + 1) + ': ' + s.name, px + 26, py + 12);
    textStyle(NORMAL);

    let ly = py + 40;
    fill('#1a3a6c'); textStyle(BOLD); textSize(11);
    text('What happens', px + 10, ly); ly += 14;
    textStyle(NORMAL); fill('#333');
    for (const ln of wrap(s.description, pw - 24)) {
        text(ln, px + 10, ly); ly += 13;
    }
    ly += 6;

    fill('#1a3a6c'); textStyle(BOLD); text('Tools', px + 10, ly); ly += 14;
    textStyle(NORMAL); fill('#333');
    for (const ln of wrap(s.tools, pw - 24)) {
        text(ln, px + 10, ly); ly += 13;
    }
    ly += 6;

    // Mistake highlight
    fill('#fff3cd'); stroke('#d4a017');
    rect(px + 10, ly, pw - 24, 42, 4);
    noStroke();
    fill('#9a6700'); textStyle(BOLD); textSize(11);
    text('⚠ Common mistake', px + 18, ly + 6);
    textStyle(NORMAL); fill('#5c4a00');
    let myy = ly + 22;
    for (const ln of wrap(s.mistake, pw - 36)) {
        text(ln, px + 18, myy); myy += 13;
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
