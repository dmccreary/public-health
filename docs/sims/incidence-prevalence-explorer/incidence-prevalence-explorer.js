// Incidence vs. Prevalence Explorer
// CANVAS_HEIGHT: 600
let canvasWidth = 800;
let drawHeight = 440;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let irSlider, durSlider, resetButton, formulaCheckbox;
let cases = []; // array of {age: seconds, x, y, exitAge}
let lastSpawnTime = 0;
let lastTick = 0;
const POPULATION = 10000;

const TEAL = '#1f8a8a';
const TITLE_BLUE = '#1a3a6c';
const TEXT_DARK = '#212529';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    const baseY = drawHeight + 14;
    irSlider = createSlider(1, 100, 10, 1);
    irSlider.position(180, baseY);
    irSlider.size(180);

    durSlider = createSlider(0.1, 10, 5, 0.1);
    durSlider.position(180, baseY + 30);
    durSlider.size(180);

    resetButton = createButton('Reset');
    resetButton.position(180, baseY + 62);
    resetButton.mousePressed(() => { cases = []; irSlider.value(10); durSlider.value(5); });

    formulaCheckbox = createCheckbox(' Show formula calculation', true);
    formulaCheckbox.position(180, baseY + 92);

    lastTick = millis();
    // Pre-seed with equilibrium population
    seedEquilibrium();
}

function seedEquilibrium() {
    const ir = irSlider.value() / 1000; // cases per person per year
    const dur = durSlider.value();
    const equilibrium = ir * dur * POPULATION;
    const target = Math.min(800, Math.round(equilibrium));
    cases = [];
    for (let i = 0; i < target; i++) {
        const thisDur = dur * (0.5 + Math.random() * 1.0);
        cases.push({
            age: Math.random() * thisDur, // uniformly aged within own duration
            duration: thisDur,
            x: 0, y: 0
        });
    }
}

function draw() {
    background(255);
    fill(TITLE_BLUE); noStroke();
    textSize(16); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Incidence vs. Prevalence: P ≈ I × D', containerWidth / 2, 8);
    textStyle(NORMAL);

    const now = millis();
    let dt = (now - lastTick) / 1000; // seconds
    lastTick = now;
    // Clamp dt so a tab-switch or initial paint hiccup can't age the whole pool
    dt = Math.min(dt, 0.05);
    // Time compression: 1 real second = 0.25 simulated year (slow & stable)
    dt *= 0.25;
    const ir = irSlider.value() / 1000;
    const dur = durSlider.value();

    // Spawn new cases: expected count = ir * POPULATION * dt
    const expectedNew = ir * POPULATION * dt;
    // Cap visible cases to 800 for performance
    let spawn = Math.floor(expectedNew);
    if (Math.random() < (expectedNew - spawn)) spawn += 1;
    // Limit to maintain reasonable visual
    spawn = Math.min(spawn, 50);
    for (let i = 0; i < spawn; i++) {
        if (cases.length < 1500) {
            cases.push({
                age: 0,
                duration: dur * (0.5 + Math.random() * 1.0), // exponential-like spread
                x: 0, y: 0
            });
        }
    }
    // Age cases, remove expired
    for (let i = cases.length - 1; i >= 0; i--) {
        cases[i].age += dt;
        if (cases[i].age >= cases[i].duration) {
            cases.splice(i, 1);
        }
    }

    // Layout: left 60% pool, right 40% readout
    const poolX = 14;
    const poolY = 36;
    const poolW = containerWidth * 0.58 - 14;
    const poolH = drawHeight - poolY - 14;
    const readoutX = poolX + poolW + 12;
    const readoutW = containerWidth - readoutX - 14;

    // Pool background
    fill(245, 250, 252); stroke(180); strokeWeight(1);
    rect(poolX, poolY, poolW, poolH, 6);
    noStroke();

    // Inflow arrow at top
    fill(TEAL); noStroke();
    textSize(11); textAlign(CENTER, BOTTOM);
    text('↓ new cases (incidence)', poolX + poolW / 2, poolY - 2);

    // Outflow at bottom
    text('↓ recovery / death', poolX + poolW / 2, poolY + poolH + 14);

    // Draw cases: place them deterministically by hashing case ref
    // Pack cases in a grid that fills the pool
    const maxRender = Math.min(cases.length, 800);
    const cols = Math.max(8, Math.ceil(Math.sqrt(maxRender * (poolW / poolH))));
    const rows = Math.max(6, Math.ceil(maxRender / cols));
    const cellW = poolW / cols;
    const cellH = poolH / rows;
    const radius = Math.min(cellW, cellH) * 0.42;

    for (let i = 0; i < maxRender; i++) {
        const c = cases[i];
        const r = Math.floor(i / cols);
        const col = i % cols;
        const cx = poolX + cellW * (col + 0.5);
        const cy = poolY + cellH * (r + 0.5);
        // Color by age fraction
        const frac = constrain(c.age / Math.max(c.duration, 0.001), 0, 1);
        const col1 = color(31, 138, 138);   // fresh teal
        const col2 = color(150, 90, 60);    // older brown
        const cc = lerpColor(col1, col2, frac);
        noStroke(); fill(cc);
        ellipse(cx, cy, radius * 2, radius * 2);
    }

    // Count display
    fill(TITLE_BLUE); textSize(12); textAlign(LEFT, BOTTOM);
    text('Active cases shown: ' + maxRender + ' (of ' + cases.length + ')',
         poolX + 6, poolY + poolH - 4);

    // Readout panel
    fill(245, 248, 252); noStroke();
    rect(readoutX, poolY, readoutW, poolH, 6);

    const prevalencePerThousand = (cases.length / POPULATION) * 1000;
    const expectedPrev = ir * dur * 1000; // per 1000

    let ry = poolY + 14;
    fill(TITLE_BLUE); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Current Settings', readoutX + 10, ry); ry += 22;
    textStyle(NORMAL); fill(TEXT_DARK); textSize(12);
    text('Incidence rate (I)', readoutX + 10, ry); ry += 14;
    text('  = ' + nf(irSlider.value(), 0, 1) + ' /1,000/year', readoutX + 10, ry); ry += 20;
    text('Duration (D)', readoutX + 10, ry); ry += 14;
    text('  = ' + nf(dur, 0, 1) + ' years', readoutX + 10, ry); ry += 20;
    text('Population (N)', readoutX + 10, ry); ry += 14;
    text('  = ' + POPULATION.toLocaleString(), readoutX + 10, ry); ry += 24;

    fill(TITLE_BLUE); textStyle(BOLD); textSize(13);
    text('Prevalence (P)', readoutX + 10, ry); ry += 20;
    textStyle(NORMAL); fill(TEXT_DARK); textSize(12);
    text('Observed: ' + nf(prevalencePerThousand, 0, 2) + ' /1,000',
         readoutX + 10, ry); ry += 16;
    text('Expected: ' + nf(expectedPrev, 0, 2) + ' /1,000',
         readoutX + 10, ry); ry += 24;

    if (formulaCheckbox.checked()) {
        fill(TITLE_BLUE); textStyle(BOLD); textSize(13);
        text('Formula', readoutX + 10, ry); ry += 20;
        textStyle(NORMAL); fill(TEXT_DARK); textSize(11);
        text('P ≈ I × D', readoutX + 10, ry); ry += 16;
        text('  = ' + nf(irSlider.value(), 0, 1) + '/1000/yr', readoutX + 10, ry); ry += 14;
        text('    × ' + nf(dur, 0, 1) + ' yr', readoutX + 10, ry); ry += 14;
        text('  = ' + nf(expectedPrev, 0, 1) + ' /1,000',
             readoutX + 10, ry); ry += 16;
    }

    // Control panel
    fill(248); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220); line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    fill(TEXT_DARK); textSize(12); textAlign(LEFT, CENTER);
    const baseY = drawHeight + 14;
    text('Incidence (/1k/yr):', 14, baseY + 8);
    text(nf(irSlider.value(), 0, 1), 370, baseY + 8);
    text('Duration (years):', 14, baseY + 38);
    text(nf(dur, 0, 1), 370, baseY + 38);

    // Instructional caption
    fill(TITLE_BLUE); textSize(11); textAlign(LEFT, TOP);
    const capX = 430; let capY = baseY;
    text('Try this:', capX, capY); capY += 16;
    text('• Raise incidence — pool fills faster.', capX, capY); capY += 14;
    text('• Raise duration — cases stay longer, pool grows.', capX, capY); capY += 14;
    text('• Equal P can come from high-I/short-D or low-I/long-D.', capX, capY); capY += 14;
    text('• Equilibrium: P ≈ I × D × N.', capX, capY);
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
