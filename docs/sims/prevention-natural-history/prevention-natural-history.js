// Prevention Levels Mapped to Natural History of Disease
// CANVAS_HEIGHT: 640
let canvasWidth = 820;
let drawHeight = 520;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let playPauseBtn, resetBtn;
let btnFlu, btnDiabetes, btnLead;
let running = true;
let dotT = 0; // 0..1 along timeline

let selectedDisease = 'flu';
let selectedLevel = null; // 'primordial', 'primary', 'secondary', 'tertiary' or null
let hoverStage = null;

// Stage layout: 5 stages, fractions sum to 1
const stageNames = ['No Risk Factors', 'Risk Factors Present', 'Subclinical Disease', 'Clinical Disease', 'Outcome'];
const stageColors = ['#e8f5e9', '#fff9c4', '#ffe0b2', '#ffcdd2', '#cfd8dc'];

const stageDefs = [
    'Healthy. No exposure or risk factors identified.',
    'Risk factors present; no disease process yet detectable.',
    'Pathological changes underway; symptoms not yet apparent.',
    'Clinical signs and symptoms present; diagnosis possible.',
    'Recovery, disability, or death depending on disease and care.'
];

const stageProbText = [
    'Disease risk: baseline population level',
    'Disease risk: elevated — intervention here prevents disease onset',
    'Pathological process underway — undetected without screening',
    'Symptoms present — clinical care required',
    'Outcome: recovery / disability / death depending on treatment and disease'
];

// Each disease's stage proportions (must sum to 1)
const diseases = {
    flu: {
        name: 'Influenza',
        stageFrac: [0.30, 0.20, 0.10, 0.30, 0.10],
        examples: {
            primordial: ['Strong universal hygiene norms', 'Clean air in schools and offices', 'Equitable nutrition policy'],
            primary: ['Annual flu vaccination', 'Hand hygiene campaigns', 'Mask use during outbreaks'],
            secondary: ['Rapid antigen test in high-risk patients', 'Early case isolation', 'Workplace screening'],
            tertiary: ['Antivirals (oseltamivir)', 'Pneumonia treatment', 'ICU support for severe cases']
        }
    },
    diabetes: {
        name: 'Type 2 Diabetes',
        stageFrac: [0.20, 0.30, 0.20, 0.20, 0.10],
        examples: {
            primordial: ['Walkable neighborhoods', 'Healthy food access policy', 'Sugary-drink taxes'],
            primary: ['Weight management programs', 'Physical activity counseling', 'Diabetes Prevention Program (DPP)'],
            secondary: ['HbA1c screening', 'Pre-diabetes identification', 'Lifestyle intervention referral'],
            tertiary: ['Insulin / metformin therapy', 'Foot-care programs', 'Retinopathy screening to prevent blindness']
        }
    },
    lead: {
        name: 'Lead Poisoning',
        stageFrac: [0.25, 0.25, 0.15, 0.25, 0.10],
        examples: {
            primordial: ['Ban leaded gasoline', 'Replace lead service lines', 'Lead-safe housing standards'],
            primary: ['Lead-paint remediation in older homes', 'Worker exposure controls', 'Soil testing & cleanup'],
            secondary: ['Blood-lead level (BLL) screening in children', 'Home environmental investigation', 'Case management'],
            tertiary: ['Chelation therapy for severe cases', 'Developmental support services', 'Long-term cognitive follow-up']
        }
    }
};

const levelInfo = {
    primordial: {
        title: 'Primordial Prevention',
        when: 'Before risk factors exist',
        goal: 'Prevent the conditions that produce risk',
        stages: [0]
    },
    primary: {
        title: 'Primary Prevention',
        when: 'After risk factors emerge, before disease',
        goal: 'Prevent disease onset in at-risk individuals',
        stages: [1]
    },
    secondary: {
        title: 'Secondary Prevention',
        when: 'During subclinical phase',
        goal: 'Detect early and intervene before symptoms',
        stages: [2]
    },
    tertiary: {
        title: 'Tertiary Prevention',
        when: 'After clinical disease',
        goal: 'Reduce complications, disability, and death',
        stages: [3, 4]
    }
};

// timeline geometry, computed each frame
let tl = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const cy = drawHeight + 12;
    playPauseBtn = createButton('Pause');
    playPauseBtn.position(16, cy);
    playPauseBtn.mousePressed(() => {
        running = !running;
        playPauseBtn.html(running ? 'Pause' : 'Play');
    });

    resetBtn = createButton('Reset');
    resetBtn.position(80, cy);
    resetBtn.mousePressed(() => { dotT = 0; });

    btnFlu = createButton('Influenza');
    btnFlu.position(160, cy);
    btnFlu.mousePressed(() => { selectedDisease = 'flu'; });

    btnDiabetes = createButton('Type 2 Diabetes');
    btnDiabetes.position(240, cy);
    btnDiabetes.mousePressed(() => { selectedDisease = 'diabetes'; });

    btnLead = createButton('Lead Poisoning');
    btnLead.position(360, cy);
    btnLead.mousePressed(() => { selectedDisease = 'lead'; });

    let clearBtn = createButton('Clear selection');
    clearBtn.position(480, cy);
    clearBtn.mousePressed(() => { selectedLevel = null; });
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke();
    textSize(17); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Prevention Levels & the Natural History of Disease', containerWidth / 2, 8);
    textStyle(NORMAL);

    // animate dot
    if (running) dotT = (dotT + 0.0025) % 1.0;

    computeTimelineLayout();
    drawTimeline();
    drawBrackets();
    drawDot();
    drawInfoPanel();
    drawStageDetail();

    // controls strip
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    fill('#1a3a6c'); textSize(11); textAlign(LEFT, TOP);
    text('Disease: ' + diseases[selectedDisease].name +
        '   |   Click a bracket (Primordial/Primary/Secondary/Tertiary) to learn more.',
        16, drawHeight + 56);
}

function computeTimelineLayout() {
    const leftW = floor(containerWidth * 0.64);
    tl.x = 24;
    tl.y = 60;
    tl.w = leftW - 32;
    tl.h = 70;
    tl.bracketY = tl.y + tl.h + 18;
    tl.bracketH = 28;
    tl.probY = tl.bracketY + tl.bracketH + 22;
    // stage x-positions
    const d = diseases[selectedDisease];
    tl.stageX = [tl.x];
    for (let i = 0; i < d.stageFrac.length; i++) {
        tl.stageX.push(tl.stageX[i] + d.stageFrac[i] * tl.w);
    }
}

function drawTimeline() {
    const d = diseases[selectedDisease];
    hoverStage = null;

    // section labels
    fill('#555'); noStroke(); textSize(11); textAlign(LEFT, BOTTOM);
    text('Natural History of Disease  →', tl.x, tl.y - 4);

    // stages
    for (let i = 0; i < stageNames.length; i++) {
        const x = tl.stageX[i];
        const w = tl.stageX[i+1] - x;
        const isHover = mouseX >= x && mouseX <= x + w && mouseY >= tl.y && mouseY <= tl.y + tl.h;
        if (isHover) hoverStage = i;
        // background
        fill(isHover ? lerpColor(color(stageColors[i]), color(255), -0.05) : stageColors[i]);
        stroke('#999'); strokeWeight(isHover ? 2 : 1);
        rect(x, tl.y, w, tl.h);
        noStroke();
        // label
        fill('#333'); textSize(11); textAlign(CENTER, CENTER); textStyle(BOLD);
        const labelLines = stageNames[i].split(' ');
        // crude wrap
        if (stageNames[i].length > 10 && w < 130) {
            text(labelLines.slice(0, Math.ceil(labelLines.length/2)).join(' '), x + w/2, tl.y + tl.h/2 - 8);
            text(labelLines.slice(Math.ceil(labelLines.length/2)).join(' '), x + w/2, tl.y + tl.h/2 + 8);
        } else {
            text(stageNames[i], x + w/2, tl.y + tl.h/2);
        }
        textStyle(NORMAL);
        // stage number tag
        fill('#666'); textSize(9); textAlign(LEFT, TOP);
        text('Stage ' + (i+1), x + 4, tl.y + 3);
    }
}

function drawBrackets() {
    const levels = ['primordial', 'primary', 'secondary', 'tertiary'];
    const labels = ['Primordial', 'Primary', 'Secondary', 'Tertiary'];
    const colors_ = ['#1abc9c', '#3498db', '#e67e22', '#c0392b'];

    for (let i = 0; i < levels.length; i++) {
        const lev = levels[i];
        const info = levelInfo[lev];
        const s0 = info.stages[0];
        const s1 = info.stages[info.stages.length - 1];
        const x0 = tl.stageX[s0];
        const x1 = tl.stageX[s1 + 1];
        const y = tl.bracketY;
        const h = tl.bracketH;
        const isSel = selectedLevel === lev;
        // bracket
        stroke(isSel ? '#1a3a6c' : colors_[i]);
        strokeWeight(isSel ? 3 : 2);
        noFill();
        // top horizontal
        line(x0 + 2, y + 4, x1 - 2, y + 4);
        // verticals
        line(x0 + 2, y + 4, x0 + 2, y + 12);
        line(x1 - 2, y + 4, x1 - 2, y + 12);
        noStroke();
        // background label box
        const labelW = textWidth(labels[i]) + 12;
        const labelX = (x0 + x1)/2 - labelW/2;
        if (isSel) {
            fill('#fff8c4'); stroke('#d4a017'); strokeWeight(1.5);
            rect(labelX - 2, y + 8, labelW + 4, 18, 4);
            noStroke();
        }
        fill(isSel ? '#1a3a6c' : colors_[i]);
        textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
        text(labels[i], (x0 + x1)/2, y + 10);
        textStyle(NORMAL);
    }

    // probability text under each stage
    for (let i = 0; i < stageNames.length; i++) {
        const x = tl.stageX[i];
        const w = tl.stageX[i+1] - x;
        if (hoverStage === i) {
            fill('#f8f9fa'); stroke('#cfd8e3');
            const tx = x + w/2;
            const ty = tl.probY + 12;
            const lines = wrapText(stageProbText[i], 220);
            const boxW = 240;
            const boxH = 18 + 14 * lines.length;
            rect(Math.max(8, Math.min(containerWidth - boxW - 8, tx - boxW/2)),
                 ty - 4, boxW, boxH, 4);
            noStroke();
            fill('#333'); textSize(11); textAlign(LEFT, TOP);
            const px = Math.max(8, Math.min(containerWidth - boxW - 8, tx - boxW/2)) + 8;
            for (let li = 0; li < lines.length; li++) {
                text(lines[li], px, ty + 2 + li * 14);
            }
        }
    }
}

function wrapText(s, maxW) {
    const words = s.split(' ');
    let lines = [], current = '';
    for (const w of words) {
        const test = current ? current + ' ' + w : w;
        if (textWidth(test) > maxW) {
            if (current) lines.push(current);
            current = w;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

function drawDot() {
    const x = tl.x + dotT * tl.w;
    const y = tl.y + tl.h / 2;
    // patient dot
    fill('#1a3a6c'); noStroke();
    ellipse(x, y, 14, 14);
    fill(255);
    textSize(9); textAlign(CENTER, CENTER); textStyle(BOLD);
    text('P', x, y);
    textStyle(NORMAL);
    // vertical guideline
    stroke('#1a3a6c'); strokeWeight(1); drawingContext.setLineDash([3, 3]);
    line(x, tl.y - 2, x, tl.bracketY + tl.bracketH + 4);
    drawingContext.setLineDash([]);
    noStroke();
}

function drawInfoPanel() {
    const px = floor(containerWidth * 0.64) + 4;
    const py = 60;
    const pw = containerWidth - px - 12;
    const ph = drawHeight - py - 12;
    fill('#f4f7fa'); stroke('#cfd8e3');
    rect(px, py, pw, ph, 6);
    noStroke();

    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    if (selectedLevel === null) {
        text('Select a Prevention Level', px + 10, py + 10);
        textStyle(NORMAL);
        fill('#333'); textSize(11);
        let ly = py + 36;
        text('Click any bracket below the timeline to', px + 10, ly); ly += 14;
        text('see when that prevention level acts,', px + 10, ly); ly += 14;
        text('its goal, and specific examples for', px + 10, ly); ly += 14;
        text('the selected disease.', px + 10, ly); ly += 22;
        text('Animation: a patient (P) moves left→right', px + 10, ly); ly += 14;
        text('along the natural history. Watch which', px + 10, ly); ly += 14;
        text('prevention windows are still open as', px + 10, ly); ly += 14;
        text('the disease progresses.', px + 10, ly);
        return;
    }
    const info = levelInfo[selectedLevel];
    const d = diseases[selectedDisease];
    text(info.title, px + 10, py + 10);
    textStyle(NORMAL);
    fill('#333'); textSize(11);
    let ly = py + 34;
    text('When it acts:', px + 10, ly); ly += 14;
    fill('#555'); text('  ' + info.when, px + 10, ly); ly += 18;
    fill('#333'); text('Goal:', px + 10, ly); ly += 14;
    fill('#555'); text('  ' + info.goal, px + 10, ly); ly += 18;
    fill('#333'); textStyle(BOLD);
    text('Examples (' + d.name + '):', px + 10, ly);
    textStyle(NORMAL); ly += 16;
    const exs = d.examples[selectedLevel];
    for (const ex of exs) {
        // wrap
        const lines = wrapText('• ' + ex, pw - 28);
        for (const ln of lines) {
            fill('#333'); text(ln, px + 14, ly); ly += 14;
        }
        ly += 2;
    }
}

function drawStageDetail() {
    // small tooltip already drawn in drawBrackets
}

function mousePressed() {
    // Check brackets clicked
    const levels = ['primordial', 'primary', 'secondary', 'tertiary'];
    for (const lev of levels) {
        const info = levelInfo[lev];
        const s0 = info.stages[0];
        const s1 = info.stages[info.stages.length - 1];
        const x0 = tl.stageX[s0];
        const x1 = tl.stageX[s1 + 1];
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= tl.bracketY && mouseY <= tl.bracketY + tl.bracketH + 4) {
            selectedLevel = lev;
            running = false;
            playPauseBtn.html('Play');
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
