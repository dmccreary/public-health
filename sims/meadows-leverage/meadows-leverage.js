// Meadows Leverage Points
// CANVAS_HEIGHT: 720
let canvasWidth = 900;
let drawHeight = 620;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let points; // ordered from least powerful (12, top of list when "weakest first") to most (1)
let selectedIdx = 0;
let modeToggle; // checkbox: show policy examples vs canonical names

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');
    buildPoints();

    modeToggle = createCheckbox(' Show public health policy examples', false);
    modeToggle.position(20, drawHeight + 20);
    modeToggle.style('font-size', '13px');
}

function draw() {
    background(255);
    fill('#1a3a6c'); noStroke(); textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Meadows\' 12 Leverage Points', containerWidth / 2, 8);
    textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('Most powerful at the top. Click any rung for details.', containerWidth / 2, 30);

    drawList();
    drawDetail();
    drawControlBar();
}

function drawList() {
    const x = 20;
    const y = 52;
    const w = 460;
    const rowH = 38;

    fill('#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text('MOST POWERFUL', x + 30, y);
    fill('#666'); textStyle(NORMAL);
    text('Hard to change but transformative', x + 150, y);

    // Color gradient: top (most powerful) = deep orange, bottom = pale blue
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const ry = y + 18 + i * rowH;
        const t = i / (points.length - 1); // 0 top, 1 bottom
        const col = lerpColor(color('#d2691e'), color('#cfe2ff'), t);

        // Rank chip
        fill(col); stroke('#888'); strokeWeight(1);
        rect(x, ry, 28, rowH - 4, 4);
        noStroke(); fill('#fff'); textStyle(BOLD); textSize(13); textAlign(CENTER, CENTER);
        text(p.rank, x + 14, ry + (rowH - 4) / 2);
        textStyle(NORMAL);

        // Bar
        const isSel = i === selectedIdx;
        stroke(isSel ? color('#1a3a6c') : color('#bbb'));
        strokeWeight(isSel ? 2.5 : 1);
        fill(isSel ? color(245, 235, 220) : color(252, 252, 252));
        rect(x + 34, ry, w - 34, rowH - 4, 4);
        noStroke();

        fill('#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
        let label = modeToggle.checked() ? p.policy : p.name;
        // truncate if still too long
        const maxLabelW = w - 34 - 16;
        while (textWidth(label) > maxLabelW && label.length > 4) {
            label = label.slice(0, -2);
        }
        if (label !== (modeToggle.checked() ? p.policy : p.name)) label = label.trim() + '...';
        text(label, x + 44, ry + (rowH - 4) / 2);
        textStyle(NORMAL);

        p._bounds = { x, y: ry, w, h: rowH - 4 };
    }

    fill('#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text('LEAST POWERFUL', x + 30, y + 18 + points.length * rowH + 4);
    fill('#666'); textStyle(NORMAL);
    text('Easy to change but rarely shifts the system', x + 150, y + 18 + points.length * rowH + 4);
}

function drawDetail() {
    const x = 500;
    const y = 52;
    const w = containerWidth - x - 20;
    const h = drawHeight - y - 10;
    const p = points[selectedIdx];

    fill('#f5f7fb'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    // Rank badge
    fill('#1a3a6c'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text('LEVERAGE POINT #' + p.rank, x + 14, y + 10);
    textStyle(NORMAL);

    fill('#1a3a6c'); textSize(15); textStyle(BOLD);
    const nameLines = wrapText(p.name, w - 30, 15);
    for (let i = 0; i < nameLines.length; i++) {
        text(nameLines[i], x + 14, y + 28 + i * 18);
    }
    const afterName = y + 28 + nameLines.length * 18 + 8;
    textStyle(NORMAL);

    fill('#1a3a6c'); textSize(12); textStyle(BOLD);
    text('What it means', x + 14, afterName);
    textStyle(NORMAL);
    fill('#222'); textSize(11);
    wrapAndDraw(p.description, x + 14, afterName + 18, w - 30, 14);
    const descLines = wrapText(p.description, w - 30, 11);
    let cy = afterName + 18 + descLines.length * 14 + 12;

    fill('#1a3a6c'); textSize(12); textStyle(BOLD);
    text('Public health example', x + 14, cy);
    textStyle(NORMAL);
    fill('#222'); textSize(11);
    wrapAndDraw(p.example, x + 14, cy + 18, w - 30, 14);
    const exLines = wrapText(p.example, w - 30, 11);
    cy = cy + 18 + exLines.length * 14 + 12;

    fill('#b95c00'); textSize(12); textStyle(BOLD);
    text('Why this rank?', x + 14, cy);
    textStyle(NORMAL);
    fill('#222'); textSize(11);
    wrapAndDraw(p.why, x + 14, cy + 18, w - 30, 14);
}

function drawControlBar() {
    fill('#f5f5f5'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    fill('#444'); textSize(11); textAlign(LEFT, TOP);
    text('Color gradient: deep orange = transcend paradigms (most powerful)   |   pale blue = parameters (least powerful).',
        20, drawHeight + 60);
    text('Adapted from Donella Meadows (1999), "Leverage Points: Places to Intervene in a System."',
        20, drawHeight + 76);
}

function mousePressed() {
    for (let i = 0; i < points.length; i++) {
        const b = points[i]._bounds;
        if (!b) continue;
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            selectedIdx = i; return;
        }
    }
}

function wrapText(str, maxW, fontSize) {
    push(); textSize(fontSize);
    const words = str.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
        const tryLine = cur ? cur + ' ' + w : w;
        if (textWidth(tryLine) > maxW && cur) { lines.push(cur); cur = w; }
        else cur = tryLine;
    }
    if (cur) lines.push(cur);
    pop();
    return lines;
}

function wrapAndDraw(str, x, y, maxW, lineH) {
    textAlign(LEFT, TOP);
    const lines = wrapText(str, maxW, 11);
    for (let i = 0; i < lines.length; i++) text(lines[i], x, y + i * lineH);
}

function buildPoints() {
    // Listed top (most powerful) to bottom (least powerful)
    points = [
        { rank: 1, name: 'The power to transcend paradigms',
          description: 'Recognizing that any paradigm is one of many ways to see the world; staying flexible and humble about your own.',
          example: 'A public health agency adopts both biomedical and social-determinants framings simultaneously, switching lenses as evidence demands.',
          why: 'Most powerful because it conditions every other intervention. It is also the rarest and most fragile.',
          policy: 'Holding biomedical and SDOH frames simultaneously' },
        { rank: 2, name: 'The mindset or paradigm out of which the system arises',
          description: 'The shared, often unspoken beliefs about how the world works that produce the goals, rules, and structures of the system.',
          example: 'Shifting from "health is the absence of disease" to "health is wellbeing in community" reshapes funding, metrics, and workforce.',
          why: 'One paradigm shift can rewrite everything below it, but takes decades and rarely happens by force.',
          policy: 'From "absence of disease" to "wellbeing in community"' },
        { rank: 3, name: 'The goals of the system',
          description: 'What the system is actually optimizing for, regardless of stated mission.',
          example: 'A health system that targets "lives saved per dollar" makes different decisions than one targeting "ED visits per quarter."',
          why: 'Changing goals changes everything downstream, but goals are often locked in by funding structures.',
          policy: 'Optimize lives saved vs. ED visits per quarter' },
        { rank: 4, name: 'The power to add, change, evolve, or self-organize system structure',
          description: 'The ability of the system to adapt its own architecture in response to new conditions.',
          example: 'Community health workers given authority to redesign their own roles in response to local needs.',
          why: 'Self-organizing systems can keep pace with changing conditions; rigid ones cannot.',
          policy: 'CHW autonomy to redesign local roles' },
        { rank: 5, name: 'The rules of the system (incentives, punishments, constraints)',
          description: 'Laws, regulations, and norms that determine what is allowed, rewarded, or punished.',
          example: 'Smokefree workplace laws restructure where smoking is acceptable, shifting norms and behavior.',
          why: 'Powerful because rules shape behavior, but slower than paradigm or goal shifts.',
          policy: 'Smokefree workplace laws' },
        { rank: 6, name: 'The structure of information flows',
          description: 'Who gets what information when, and what is missing or hidden.',
          example: 'Public release of hospital infection rates dramatically improves performance by closing an information gap.',
          why: 'New information can unlock better decisions without changing rules, goals, or paradigms.',
          policy: 'Public release of hospital infection rates' },
        { rank: 7, name: 'The gain around driving positive feedback loops',
          description: 'How strongly a reinforcing loop amplifies; weakening a vicious cycle is high leverage.',
          example: 'Reducing the gain on the addiction-marketing loop (e.g., banning targeted ads) slows growth of nicotine use.',
          why: 'Affecting a reinforcing loop scales its long-run output; works only on existing structures.',
          policy: 'Banning targeted tobacco/vaping ads to youth' },
        { rank: 8, name: 'The strength of negative feedback loops, relative to the impacts they correct',
          description: 'How effectively a balancing loop counteracts the problem it senses.',
          example: 'Strengthening foodborne illness surveillance so outbreaks are detected and contained faster.',
          why: 'A balancing loop only works if it is fast and sensitive enough relative to the problem.',
          policy: 'Faster foodborne illness outbreak detection' },
        { rank: 9, name: 'The lengths of delays, relative to the rate of system change',
          description: 'Time between cause and visible effect. Long delays cause overshoot and oscillation.',
          example: 'Vaccine development delays drove COVID-19 mortality before population immunity could form.',
          why: 'Shortening detection or response delays compounds across every feedback loop in the system.',
          policy: 'Speed of vaccine platform readiness (mRNA)' },
        { rank: 10, name: 'The structure of material stocks and flows',
          description: 'The plumbing of the system: where things accumulate and how fast they move.',
          example: 'Where ICU beds are physically located determines who can be treated during a surge.',
          why: 'Hard to change once built (hospitals, pipelines, road networks), but cumulatively important.',
          policy: 'Geographic distribution of ICU beds' },
        { rank: 11, name: 'The size of buffers and other stabilizing stocks, relative to their flows',
          description: 'How big the cushions are relative to demand spikes.',
          example: 'Strategic National Stockpile size relative to plausible pandemic demand.',
          why: 'Bigger buffers stabilize systems but are expensive and can mask underlying inefficiency.',
          policy: 'Strategic National Stockpile capacity' },
        { rank: 12, name: 'Numbers — constants and parameters',
          description: 'The dials, taxes, subsidies, and standards — easy to change but rarely fix the system.',
          example: 'Raising the federal cigarette tax reduces smoking, but tobacco companies adapt pricing and smoking rebounds when tax is not adjusted for inflation.',
          why: 'Politicians focus here because it is easy and visible, but it is the weakest leverage point.',
          policy: 'Federal cigarette tax level' }
    ];
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
