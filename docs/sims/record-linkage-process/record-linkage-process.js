// Record Linkage Process
// CANVAS_HEIGHT: 720
let canvasWidth = 900;
let drawHeight = 640;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let animateChk;
let resetBtn;
let selectedStage = null;
let flowOffset = 0;

// Box type colors: data=blue, transformation=orange, decision/output=green
const TYPE_COLOR = {
    data: [33, 150, 243],
    trans: [255, 152, 0],
    decide: [76, 175, 80],
    output: [27, 94, 32]
};

// Each stage has: id, type, label, x, y, w, h (computed per draw based on container)
// We use relative coordinates 0..1 for layout
const STAGES = {
    A1: { type: 'data',  label: 'Dataset A\n(birth certs)', col: 'L' },
    B1: { type: 'data',  label: 'Dataset B\n(death certs)', col: 'R' },
    A2: { type: 'trans', label: 'Standardize\n(name, addr, date)', col: 'L' },
    B2: { type: 'trans', label: 'Standardize\n(name, addr, date)', col: 'R' },
    BL: { type: 'trans', label: 'Blocking\n(state + birth yr)', col: 'C' },
    CV: { type: 'trans', label: 'Comparison\nVector', col: 'C' },
    DT: { type: 'decide', label: 'Deterministic\n(exact SSN)', col: 'L' },
    PR: { type: 'decide', label: 'Probabilistic\n(Fellegi-Sunter)', col: 'R' },
    OUT: { type: 'output', label: 'Linked\nDataset', col: 'C' }
};

const PANEL_DATA = {
    A1: {
        title: 'Dataset A - Birth certificates',
        body: 'Source vital-records dataset. Typical fields: first_name, last_name, dob, mother_dob, father_dob, sex, race, county_of_birth, birth_cert_number. Often has data-entry errors and inconsistent formatting.',
        code: 'import pandas as pd\nbirth = pd.read_csv("births.csv")',
        param: 'Encoding (UTF-8 vs Latin-1) is the #1 surprise.'
    },
    B1: {
        title: 'Dataset B - Death certificates',
        body: 'Independently-collected vital records. Same person identifiers, but recorded years later in different jurisdictions. Linking births to deaths enables life-course epidemiology.',
        code: 'death = pd.read_csv("deaths.csv")',
        param: 'Date format ("01/02/2020") may be MDY or DMY.'
    },
    A2: {
        title: 'Standardization',
        body: 'Normalize fields so they can be compared. Lowercase names; strip accents; expand nicknames ("Bill" -> "William"); reformat dates; canonicalize addresses.',
        code: 'birth["fn"] = birth.fn.str.lower()\\\n            .str.strip()',
        param: 'Nickname dictionary coverage (Bill, Bob, Liz, ...)'
    },
    B2: {
        title: 'Standardization',
        body: 'Apply IDENTICAL transformations to Dataset B. Asymmetric standardization is a footgun: it silently destroys recall.',
        code: 'death["fn"] = death.fn.str.lower()\\\n            .str.strip()',
        param: 'Asymmetric standardization = silent missed matches.'
    },
    BL: {
        title: 'Blocking',
        body: 'Restrict comparisons to candidate pairs likely to match. Without blocking, N_A x N_B pairs is computationally infeasible. Common blocks: state + birth-year, or zipcode + soundex(last_name).',
        code: 'import recordlinkage\nidx = recordlinkage.Index()\nidx.block(["state","birth_yr"])',
        param: 'Block too tight -> miss matches. Too loose -> too slow.'
    },
    CV: {
        title: 'Comparison Vector',
        body: 'For each candidate pair, compute per-field agreement scores: exact match? Jaro-Winkler string similarity? Date difference within tolerance? Result is a vector per pair.',
        code: 'cmp = recordlinkage.Compare()\ncmp.string("fn","fn", method="jarowinkler")\ncmp.exact("dob","dob")',
        param: 'String-distance threshold (0.85 typical for Jaro-Winkler).'
    },
    DT: {
        title: 'Deterministic Path',
        body: 'If the candidate pair has an exact SSN match (or other unique identifier), accept it as a link without further scoring. Fast and high-precision.',
        code: 'matches = features[features.ssn == 1]',
        param: 'Trust threshold for the deterministic key.'
    },
    PR: {
        title: 'Probabilistic Path (Fellegi-Sunter)',
        body: 'Compute a match weight: log(m / u) per agreeing field, where m = P(agree | match) and u = P(agree | non-match). Sum to a score. Compare to upper/lower thresholds: above -> link, below -> non-link, between -> clerical review.',
        code: 'ecm = recordlinkage.ECMClassifier()\necm.fit(features)\nweights = ecm.prob(features)',
        param: 'Upper/lower decision thresholds; m,u priors.'
    },
    OUT: {
        title: 'Linked Dataset',
        body: 'The accepted links from both paths are merged. Each row is one (birth-id, death-id) pair. Downstream analyses (infant mortality, life-course epidemiology) join on these IDs.',
        code: 'linked = pd.concat([det_matches, prob_matches])\nlinked.to_parquet("linked.pq")',
        param: 'Audit trail of which path produced each link.'
    }
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    animateChk = createCheckbox(' Animate flow', true);
    animateChk.position(170, drawHeight + 28);

    resetBtn = createButton('Reset Selection');
    resetBtn.position(20, drawHeight + 25);
    resetBtn.size(130, 32);
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.mousePressed(() => { selectedStage = null; });
}

function draw() {
    background(255);

    // Title
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Record Linkage Process: Deterministic + Probabilistic', containerWidth / 2, 10);
    textStyle(NORMAL);

    // Layout: flow on left ~58%, panel on right ~42%
    const flowW = containerWidth * 0.58;
    const panelX = flowW + 10;
    const panelW = containerWidth - panelX - 20;

    const colL_x = 80;
    const colC_x = flowW / 2;
    const colR_x = flowW - 80;
    const boxW = 130;
    const boxH = 46;

    const ys = {
        A1: 60, B1: 60,
        A2: 130, B2: 130,
        BL: 215,
        CV: 290,
        DT: 380, PR: 380,
        OUT: 470
    };
    const xs = {
        A1: colL_x, B1: colR_x,
        A2: colL_x, B2: colR_x,
        BL: colC_x, CV: colC_x,
        DT: colL_x + 20, PR: colR_x - 20,
        OUT: colC_x
    };

    // Edges (from, to)
    const edges = [
        ['A1', 'A2'],
        ['B1', 'B2'],
        ['A2', 'BL'],
        ['B2', 'BL'],
        ['BL', 'CV'],
        ['CV', 'DT'],
        ['CV', 'PR'],
        ['DT', 'OUT'],
        ['PR', 'OUT']
    ];

    if (animateChk.checked()) {
        flowOffset = (flowOffset + 1.5) % 16;
    }

    // Draw edges
    stroke('#666');
    strokeWeight(2);
    noFill();
    for (const [a, b] of edges) {
        const ax = xs[a], ay = ys[a] + boxH / 2;
        const bx = xs[b], by = ys[b] - boxH / 2;
        // Drop arrow head and shaft
        const midY = (ay + by) / 2;
        // Simple curved path via 2 segments
        line(ax, ay, ax, midY);
        line(ax, midY, bx, midY);
        line(bx, midY, bx, by);
        // Arrowhead at bx,by
        fill('#666');
        noStroke();
        triangle(bx, by + 6, bx - 4, by - 2, bx + 4, by - 2);
        stroke('#666');
        noFill();
        // Animated dot
        if (animateChk.checked()) {
            const t = (flowOffset + (a.charCodeAt(0) * 3)) % 16 / 16;
            let dx, dy;
            const seg1Len = Math.abs(midY - ay);
            const seg2Len = Math.abs(bx - ax);
            const seg3Len = Math.abs(by - midY);
            const total = seg1Len + seg2Len + seg3Len;
            let d = t * total;
            if (d < seg1Len) {
                dx = ax; dy = ay + (midY > ay ? 1 : -1) * d;
            } else if (d < seg1Len + seg2Len) {
                dy = midY; dx = ax + (bx > ax ? 1 : -1) * (d - seg1Len);
            } else {
                dx = bx; dy = midY + (by > midY ? 1 : -1) * (d - seg1Len - seg2Len);
            }
            noStroke();
            fill('#1a3a6c');
            ellipse(dx, dy, 5, 5);
            stroke('#666');
            noFill();
        }
    }
    noStroke();

    // Draw boxes
    for (const id of Object.keys(STAGES)) {
        const s = STAGES[id];
        const c = TYPE_COLOR[s.type];
        const cx = xs[id];
        const cy = ys[id];
        const isSel = selectedStage === id;
        const isHover = mouseX >= cx - boxW/2 && mouseX <= cx + boxW/2 &&
                        mouseY >= cy - boxH/2 && mouseY <= cy + boxH/2;
        // Box
        fill(c[0], c[1], c[2]);
        if (isSel) {
            stroke(255, 200, 0); strokeWeight(3);
        } else if (isHover) {
            stroke(255, 255, 255); strokeWeight(2);
        } else {
            noStroke();
        }
        rect(cx - boxW/2, cy - boxH/2, boxW, boxH, 6);
        noStroke();
        // Label
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(10.5);
        textStyle(BOLD);
        const lines = s.label.split('\n');
        for (let i = 0; i < lines.length; i++) {
            text(lines[i], cx, cy + (i - (lines.length - 1) / 2) * 13);
        }
        textStyle(NORMAL);
    }

    // Lane labels
    fill('#1a3a6c');
    textAlign(CENTER, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text('Lane A', colL_x, 40);
    text('Merged', colC_x, 40);
    text('Lane B', colR_x, 40);
    textStyle(NORMAL);

    // Branch label
    fill('#555');
    textSize(10);
    textStyle(ITALIC);
    textAlign(LEFT, CENTER);
    text('Branch on best match path:', 50, 345);
    textStyle(NORMAL);

    // Legend (bottom-left of flow area)
    drawLegend(20, drawHeight - 90);

    // Detail panel
    drawPanel(panelX, 50, panelW, drawHeight - 80);

    // Controls strip
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight); noStroke();

    fill('#495057');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Click any stage to see code, parameters, and pitfalls.', 320, drawHeight + 28);
    text('Type colors: blue=data, orange=transformation, green=decision/output.', 320, drawHeight + 50);
}

function drawLegend(x, y) {
    fill(255);
    stroke(220);
    strokeWeight(1);
    rect(x, y, 150, 70, 4);
    noStroke();
    fill('#1a3a6c');
    textSize(10);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Legend', x + 8, y + 6);
    textStyle(NORMAL);

    const items = [
        ['data', 'Data'],
        ['trans', 'Transformation'],
        ['decide', 'Decision'],
        ['output', 'Output']
    ];
    for (let i = 0; i < items.length; i++) {
        const c = TYPE_COLOR[items[i][0]];
        fill(c[0], c[1], c[2]);
        noStroke();
        rect(x + 8, y + 22 + i * 11, 12, 8, 1);
        fill('#212529');
        textSize(9.5);
        textAlign(LEFT, TOP);
        text(items[i][1], x + 24, y + 21 + i * 11);
    }
}

function drawPanel(x, y, w, h) {
    fill(250, 251, 253);
    stroke(220);
    strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    if (!selectedStage) {
        fill('#6c757d');
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(ITALIC);
        text('Click any stage to see\nits code, parameter,\nand pitfall.',
             x + w / 2, y + h / 2);
        textStyle(NORMAL);
        return;
    }

    const s = STAGES[selectedStage];
    const c = TYPE_COLOR[s.type];
    fill(c[0], c[1], c[2]);
    rect(x, y, w, 8, 6, 6, 0, 0);

    const data = PANEL_DATA[selectedStage];

    fill('#1a3a6c');
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(data.title, x + 12, y + 16, w - 24);
    textStyle(NORMAL);

    fill('#212529');
    textSize(11);
    text(data.body, x + 12, y + 50, w - 24);

    // Code box
    const codeY = y + 50 + 90;
    fill(245, 248, 250);
    stroke(210);
    strokeWeight(1);
    rect(x + 10, codeY, w - 20, 56, 4);
    noStroke();
    fill('#0d47a1');
    textSize(10);
    textFont('Consolas, Menlo, monospace');
    textAlign(LEFT, TOP);
    text(data.code, x + 16, codeY + 6, w - 28);
    textFont('Segoe UI');

    // Parameter / pitfall
    const paramY = codeY + 70;
    fill('#c62828');
    textSize(11);
    textStyle(BOLD);
    text('Key parameter:', x + 12, paramY);
    textStyle(NORMAL);
    fill('#212529');
    textSize(11);
    text(data.param, x + 12, paramY + 16, w - 24);
}

function mousePressed() {
    const flowW = containerWidth * 0.58;
    const colL_x = 80;
    const colC_x = flowW / 2;
    const colR_x = flowW - 80;
    const boxW = 130;
    const boxH = 46;
    const ys = {
        A1: 60, B1: 60, A2: 130, B2: 130,
        BL: 215, CV: 290, DT: 380, PR: 380, OUT: 470
    };
    const xs = {
        A1: colL_x, B1: colR_x, A2: colL_x, B2: colR_x,
        BL: colC_x, CV: colC_x,
        DT: colL_x + 20, PR: colR_x - 20, OUT: colC_x
    };
    for (const id of Object.keys(STAGES)) {
        const cx = xs[id], cy = ys[id];
        if (mouseX >= cx - boxW/2 && mouseX <= cx + boxW/2 &&
            mouseY >= cy - boxH/2 && mouseY <= cy + boxH/2) {
            selectedStage = id;
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
