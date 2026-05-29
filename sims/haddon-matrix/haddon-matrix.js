// Haddon Matrix Builder
// CANVAS_HEIGHT: 720
let canvasWidth = 900;
let drawHeight = 610;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

let scenarioSelect;
let scenarios;
let currentScenario = 'mvc';
let selectedCell = null; // {r, c}
let hoverCell = null;

// 3 rows x 4 cols (Host, Agent/Vehicle, Physical Env, Social Env)
const rowLabels = ['Pre-event', 'Event', 'Post-event'];
const colLabels = ['Host', 'Agent / Vehicle', 'Physical Environment', 'Social Environment'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');
    buildScenarios();

    scenarioSelect = createSelect();
    scenarioSelect.option('Motor Vehicle Crash', 'mvc');
    scenarioSelect.option('Drowning', 'drown');
    scenarioSelect.option('Fall in Elderly', 'fall');
    scenarioSelect.option('Firearm Injury', 'firearm');
    scenarioSelect.option('Opioid Overdose', 'opioid');
    scenarioSelect.selected('mvc');
    scenarioSelect.position(20, drawHeight + 15);
    scenarioSelect.style('font-size', '14px');
    scenarioSelect.style('padding', '4px');
    scenarioSelect.changed(() => {
        currentScenario = scenarioSelect.value();
        selectedCell = null;
    });
}

function draw() {
    background(255);
    // Title
    fill('#1a3a6c'); noStroke(); textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Haddon Matrix Builder', containerWidth / 2, 8);
    textStyle(NORMAL);
    fill('#555'); textSize(12);
    text('Click any cell to view interventions. Color = evidence strength.', containerWidth / 2, 30);

    drawMatrix();
    drawDetail();
    drawSummary();
    drawControlsArea();
}

function drawMatrix() {
    // Matrix area
    const gridX = 20;
    const gridY = 52;
    const rowHeaderW = 90;
    const colHeaderH = 32;
    const gridW = containerWidth - 40 - rowHeaderW;
    const gridH = 230;
    const cellW = gridW / 4;
    const cellH = gridH / 3;

    const data = scenarios[currentScenario];

    // Column headers
    fill('#1a3a6c'); noStroke(); textSize(12); textAlign(CENTER, CENTER); textStyle(BOLD);
    for (let c = 0; c < 4; c++) {
        const cx = gridX + rowHeaderW + c * cellW + cellW / 2;
        text(colLabels[c], cx, gridY + colHeaderH / 2);
    }

    // Row headers
    textAlign(CENTER, CENTER);
    for (let r = 0; r < 3; r++) {
        const ry = gridY + colHeaderH + r * cellH + cellH / 2;
        fill('#1a3a6c');
        text(rowLabels[r], gridX + rowHeaderW / 2, ry);
    }
    textStyle(NORMAL);

    // Cells
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            const cell = data.cells[r][c];
            const x = gridX + rowHeaderW + c * cellW;
            const y = gridY + colHeaderH + r * cellH;
            const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
            const isHover = hoverCell && hoverCell.r === r && hoverCell.c === c;

            // Evidence color
            let fillCol;
            if (cell.evidence === 'strong') fillCol = color(76, 175, 80, 90);
            else if (cell.evidence === 'moderate') fillCol = color(255, 193, 7, 110);
            else fillCol = color(160, 160, 160, 80);

            fill(fillCol);
            stroke(isSelected ? color('#1a3a6c') : color('#888'));
            strokeWeight(isSelected ? 3 : 1);
            rect(x + 2, y + 2, cellW - 4, cellH - 4, 4);

            // Show first intervention short label
            noStroke();
            fill('#222'); textSize(11); textAlign(CENTER, CENTER);
            const labelLines = wrapText(cell.short, cellW - 14, 11);
            const lineH = 13;
            const startY = y + cellH / 2 - (labelLines.length - 1) * lineH / 2;
            for (let i = 0; i < labelLines.length; i++) {
                text(labelLines[i], x + cellW / 2, startY + i * lineH);
            }
        }
    }

    // Save bounds for click detection
    Haddon.gridX = gridX;
    Haddon.gridY = gridY + colHeaderH;
    Haddon.rowHeaderW = rowHeaderW;
    Haddon.cellW = cellW;
    Haddon.cellH = cellH;
}

const Haddon = {};

function drawDetail() {
    const x = 20;
    const y = 52 + 32 + 230 + 10;
    const w = containerWidth - 40;
    const h = 130;

    fill('#f5f7fb'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();

    const data = scenarios[currentScenario];
    fill('#1a3a6c'); textSize(13); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Scenario: ' + data.name, x + 12, y + 8);
    textStyle(NORMAL);

    if (selectedCell) {
        const cell = data.cells[selectedCell.r][selectedCell.c];
        fill('#1a3a6c'); textSize(13); textStyle(BOLD);
        text(rowLabels[selectedCell.r] + ' x ' + colLabels[selectedCell.c], x + 12, y + 28);
        textStyle(NORMAL);
        fill('#333'); textSize(12);
        text('Evidence: ' + cell.evidence, x + 12, y + 48);
        fill('#222'); textSize(12);
        const i1 = '1. ' + cell.interventions[0];
        const i2 = '2. ' + cell.interventions[1];
        const w1 = w - 30;
        wrapAndDraw(i1, x + 12, y + 68, w1, 14);
        wrapAndDraw(i2, x + 12, y + 98, w1, 14);
    } else {
        fill('#666'); textSize(12); textStyle(ITALIC);
        text('Click a matrix cell above to see example interventions.', x + 12, y + 56);
        textStyle(NORMAL);
    }
}

function drawSummary() {
    const x = 20;
    const y = 52 + 32 + 230 + 10 + 140;
    const w = containerWidth - 40;
    const h = 90;
    const data = scenarios[currentScenario];

    fill('#fff'); stroke('#cfd8e6'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a3a6c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Investment by phase (illustrative)', x + 12, y + 8);
    textStyle(NORMAL);

    const phases = ['Pre-event', 'Event', 'Post-event'];
    const maxBar = w - 200;
    for (let i = 0; i < 3; i++) {
        const v = data.investment[i];
        const by = y + 30 + i * 18;
        fill('#444'); textSize(11); textAlign(LEFT, CENTER);
        text(phases[i], x + 12, by + 6);
        fill('#9ec5fe');
        rect(x + 100, by, (v / 100) * maxBar, 12, 3);
        fill('#222'); textAlign(LEFT, CENTER);
        text(v + '%', x + 100 + (v / 100) * maxBar + 6, by + 6);
    }
}

function drawControlsArea() {
    fill('#f5f5f5'); noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    fill('#333'); textSize(12); textAlign(LEFT, TOP);
    text('Scenario:', 20, drawHeight + 50);
    fill('#444'); textSize(11);
    text('Green = strong evidence   |   Yellow = moderate   |   Gray = emerging/limited',
        20, drawHeight + 75);
}

function mousePressed() {
    if (!Haddon.cellW) return;
    const c = floor((mouseX - Haddon.gridX - Haddon.rowHeaderW) / Haddon.cellW);
    const r = floor((mouseY - Haddon.gridY) / Haddon.cellH);
    if (r >= 0 && r < 3 && c >= 0 && c < 4) {
        selectedCell = { r, c };
    }
}

function mouseMoved() {
    if (!Haddon.cellW) return;
    const c = floor((mouseX - Haddon.gridX - Haddon.rowHeaderW) / Haddon.cellW);
    const r = floor((mouseY - Haddon.gridY) / Haddon.cellH);
    if (r >= 0 && r < 3 && c >= 0 && c < 4) {
        hoverCell = { r, c };
    } else {
        hoverCell = null;
    }
}

function wrapText(str, maxW, fontSize) {
    push(); textSize(fontSize);
    const words = str.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
        const tryLine = cur ? cur + ' ' + w : w;
        if (textWidth(tryLine) > maxW && cur) {
            lines.push(cur);
            cur = w;
        } else {
            cur = tryLine;
        }
    }
    if (cur) lines.push(cur);
    pop();
    return lines;
}

function wrapAndDraw(str, x, y, maxW, lineH) {
    const lines = wrapText(str, maxW, 12);
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], x, y + i * lineH);
    }
}

function buildScenarios() {
    scenarios = {
        mvc: {
            name: 'Motor Vehicle Crash',
            investment: [20, 65, 15],
            cells: [
                // Pre-event
                [
                    { short: 'Driver training', evidence: 'moderate',
                      interventions: ['Graduated driver licensing programs.', 'Anti-DUI public education and enforcement.'] },
                    { short: 'Brakes & ESC', evidence: 'strong',
                      interventions: ['Mandatory electronic stability control (ESC).', 'Vehicle inspection and maintenance.'] },
                    { short: 'Road design', evidence: 'strong',
                      interventions: ['Divided highways with rumble strips.', 'Roundabouts replace high-speed intersections.'] },
                    { short: 'Speed laws', evidence: 'strong',
                      interventions: ['Speed limit enforcement and cameras.', 'Sobriety checkpoints in high-risk areas.'] }
                ],
                // Event
                [
                    { short: 'Seatbelt use', evidence: 'strong',
                      interventions: ['Primary seatbelt enforcement laws.', 'Child safety seat distribution and fitting.'] },
                    { short: 'Airbags', evidence: 'strong',
                      interventions: ['Frontal and side airbag standards.', 'Crumple zones and reinforced cabins.'] },
                    { short: 'Guardrails', evidence: 'strong',
                      interventions: ['Median barriers on divided highways.', 'Breakaway sign and pole supports.'] },
                    { short: 'EMS dispatch', evidence: 'moderate',
                      interventions: ['Automatic crash notification (eCall/OnStar).', 'Bystander good-samaritan laws.'] }
                ],
                // Post-event
                [
                    { short: 'First aid', evidence: 'moderate',
                      interventions: ['Bystander CPR and bleeding-control training.', 'Helmet-removal training for first responders.'] },
                    { short: 'Fuel safety', evidence: 'moderate',
                      interventions: ['Fuel-tank rollover and impact standards.', 'Post-crash fire suppression systems.'] },
                    { short: 'Trauma care', evidence: 'strong',
                      interventions: ['Regional trauma center networks.', 'Helicopter EMS for rural crashes.'] },
                    { short: 'Rehab access', evidence: 'emerging',
                      interventions: ['Insurance coverage for rehabilitation.', 'Victim and family support services.'] }
                ]
            ]
        },
        drown: {
            name: 'Drowning',
            investment: [35, 50, 15],
            cells: [
                [
                    { short: 'Swim skills', evidence: 'moderate',
                      interventions: ['Universal early swim instruction.', 'Water-safety education in schools.'] },
                    { short: 'Life jackets', evidence: 'strong',
                      interventions: ['Coast Guard approved PFDs for boating.', 'PFD loaner stations at lakes and rivers.'] },
                    { short: 'Pool fencing', evidence: 'strong',
                      interventions: ['Four-sided isolation fencing for home pools.', 'Drain-cover safety standards.'] },
                    { short: 'Lifeguards', evidence: 'strong',
                      interventions: ['Trained lifeguards at public swimming areas.', 'Bans on alcohol near open water.'] }
                ],
                [
                    { short: 'Float training', evidence: 'moderate',
                      interventions: ['Self-rescue (back-float) training for infants.', 'Buddy-system rules at pools and camps.'] },
                    { short: 'PFD design', evidence: 'strong',
                      interventions: ['High-visibility inherently buoyant vests.', 'Auto-inflating PFDs for adults.'] },
                    { short: 'Pool covers', evidence: 'moderate',
                      interventions: ['Anti-entrapment drain covers.', 'Pool alarms and surface motion sensors.'] },
                    { short: 'Supervision', evidence: 'strong',
                      interventions: ['Designated "water watcher" caregiver.', 'Mandatory caregiver training at daycares.'] }
                ],
                [
                    { short: 'CPR', evidence: 'strong',
                      interventions: ['Bystander CPR with rescue breaths.', 'Public access AED programs.'] },
                    { short: 'Rescue gear', evidence: 'moderate',
                      interventions: ['Ring buoys and reach poles at pools.', 'Throw-bags on rivers and beaches.'] },
                    { short: 'EMS access', evidence: 'moderate',
                      interventions: ['Cell coverage at remote swimming holes.', 'Marked beach access for EMS vehicles.'] },
                    { short: 'Trauma care', evidence: 'emerging',
                      interventions: ['Pediatric ECMO for near-drowning.', 'Family bereavement and trauma services.'] }
                ]
            ]
        },
        fall: {
            name: 'Fall in Elderly',
            investment: [40, 30, 30],
            cells: [
                [
                    { short: 'Balance exercise', evidence: 'strong',
                      interventions: ['Tai Chi and Otago exercise programs.', 'Vision and footwear checks at primary care.'] },
                    { short: 'Med review', evidence: 'strong',
                      interventions: ['Deprescribing high-fall-risk medications.', 'Vitamin D for deficient older adults.'] },
                    { short: 'Home hazards', evidence: 'strong',
                      interventions: ['Occupational therapy home assessments.', 'Grab bars, lighting, and ramp installation.'] },
                    { short: 'Caregiver ed', evidence: 'moderate',
                      interventions: ['Caregiver fall-risk awareness training.', 'Community fall-prevention coalitions.'] }
                ],
                [
                    { short: 'Hip pads', evidence: 'emerging',
                      interventions: ['Hip protector use in nursing homes.', 'Wearable fall-detection devices.'] },
                    { short: 'Floor materials', evidence: 'moderate',
                      interventions: ['Low-impact compliant flooring in care homes.', 'Non-slip mats in tubs and showers.'] },
                    { short: 'Bed/chair design', evidence: 'moderate',
                      interventions: ['Low-rise beds in long-term care.', 'Bed and chair pressure alarms.'] },
                    { short: 'Staff response', evidence: 'moderate',
                      interventions: ['Trained nursing staff response protocols.', 'Care home staffing-ratio policies.'] }
                ],
                [
                    { short: 'Lift assist', evidence: 'moderate',
                      interventions: ['Personal emergency response systems (PERS).', 'Trained EMS lift-assist programs.'] },
                    { short: 'Fracture care', evidence: 'strong',
                      interventions: ['Geriatric hip-fracture co-management.', 'Osteoporosis treatment after fragility fracture.'] },
                    { short: 'Rehab', evidence: 'strong',
                      interventions: ['Multidisciplinary inpatient rehabilitation.', 'Home health follow-up after discharge.'] },
                    { short: 'Family support', evidence: 'moderate',
                      interventions: ['Caregiver respite and support services.', 'Community-based aging-in-place programs.'] }
                ]
            ]
        },
        firearm: {
            name: 'Firearm Injury',
            investment: [25, 40, 35],
            cells: [
                [
                    { short: 'Risk screening', evidence: 'moderate',
                      interventions: ['Primary care lethal-means counseling.', 'Suicide-risk screening in EDs and clinics.'] },
                    { short: 'Safe storage', evidence: 'strong',
                      interventions: ['Gun lock distribution and education.', 'Safe-storage laws and CAP laws.'] },
                    { short: 'Hot-spot policing', evidence: 'moderate',
                      interventions: ['Focused deterrence at violence hot spots.', 'Greening vacant lots; lighting improvements.'] },
                    { short: 'ERPO laws', evidence: 'moderate',
                      interventions: ['Extreme Risk Protection Orders ("red flag").', 'Background checks for all sales.'] }
                ],
                [
                    { short: 'Bystander aid', evidence: 'moderate',
                      interventions: ['Stop the Bleed bystander training.', 'Public bleeding-control kit placement.'] },
                    { short: 'Smart guns', evidence: 'emerging',
                      interventions: ['Personalized authorized-user firearms.', 'Magazine capacity and assault weapon limits.'] },
                    { short: 'Scene safety', evidence: 'emerging',
                      interventions: ['Building-design active-shooter mitigations.', 'Run-Hide-Fight school and workplace drills.'] },
                    { short: 'Quick EMS', evidence: 'moderate',
                      interventions: ['Rescue task force EMS protocols.', 'Tourniquet use by law enforcement.'] }
                ],
                [
                    { short: 'Hospital VIP', evidence: 'strong',
                      interventions: ['Hospital-based violence intervention programs.', 'Trauma-informed care for survivors.'] },
                    { short: 'Ballistic data', evidence: 'moderate',
                      interventions: ['NIBIN ballistic evidence tracking.', 'Crime gun trace research.'] },
                    { short: 'Trauma centers', evidence: 'strong',
                      interventions: ['Level I trauma center access.', 'Regionalized trauma transfer systems.'] },
                    { short: 'Survivor care', evidence: 'moderate',
                      interventions: ['Victim compensation and case management.', 'Community grief and trauma counseling.'] }
                ]
            ]
        },
        opioid: {
            name: 'Opioid Overdose',
            investment: [30, 30, 40],
            cells: [
                [
                    { short: 'Rx limits', evidence: 'strong',
                      interventions: ['Prescription drug monitoring programs.', 'CDC opioid prescribing guidelines.'] },
                    { short: 'Drug supply', evidence: 'moderate',
                      interventions: ['Drug take-back days and disposal kiosks.', 'Fentanyl detection in drug supply.'] },
                    { short: 'Safe use sites', evidence: 'emerging',
                      interventions: ['Overdose prevention centers.', 'Drug-checking services (test strips).'] },
                    { short: 'Stigma reduction', evidence: 'moderate',
                      interventions: ['Public anti-stigma campaigns.', 'Good Samaritan overdose laws.'] }
                ],
                [
                    { short: 'Naloxone', evidence: 'strong',
                      interventions: ['Take-home naloxone for people who use drugs.', 'Standing-order naloxone at pharmacies.'] },
                    { short: 'Drug formulation', evidence: 'moderate',
                      interventions: ['Abuse-deterrent opioid formulations.', 'Co-prescribed naloxone with opioids.'] },
                    { short: 'Witnessed use', evidence: 'moderate',
                      interventions: ['Never-use-alone hotlines.', 'Syringe service program contact.'] },
                    { short: 'Bystander call', evidence: 'strong',
                      interventions: ['911 Good Samaritan immunity laws.', 'Community naloxone training events.'] }
                ],
                [
                    { short: 'MOUD start', evidence: 'strong',
                      interventions: ['ED-initiated buprenorphine.', 'Warm handoff to treatment after overdose.'] },
                    { short: 'Naloxone refill', evidence: 'moderate',
                      interventions: ['Free naloxone leave-behind programs.', 'Drug-checking after non-fatal overdose.'] },
                    { short: 'Recovery housing', evidence: 'moderate',
                      interventions: ['Recovery housing and peer supports.', 'Employment and reentry services.'] },
                    { short: 'Peer support', evidence: 'strong',
                      interventions: ['Certified peer recovery specialists.', 'Family bereavement and grief support.'] }
                ]
            ]
        }
    };
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}
