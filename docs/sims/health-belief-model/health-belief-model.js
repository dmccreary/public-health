// Health Belief Model — Interactive Concept Map
// CANVAS_HEIGHT: 530

const CONSTRUCTS = {
    hpb: {
        title: 'Health-Protective Behavior',
        def: 'The action the person actually takes (or does not take) to reduce a health risk.',
        covid: 'Receiving a COVID-19 vaccine; wearing a mask in crowded indoor spaces.',
        pa: 'Engaging in at least 150 minutes of moderate aerobic activity per week.'
    },
    susc: {
        title: 'Perceived Susceptibility',
        def: 'A person\'s belief about how likely they are to get the disease or condition.',
        covid: '"I think I\'ll probably catch COVID at work this year."',
        pa: '"Heart disease runs in my family, so I\'m at higher risk."'
    },
    sev: {
        title: 'Perceived Severity',
        def: 'How serious the person believes the consequences of the disease would be.',
        covid: '"If I get COVID, I could end up in the ICU because of my asthma."',
        pa: '"A heart attack could kill me or leave me disabled."'
    },
    ben: {
        title: 'Perceived Benefits',
        def: 'The believed effectiveness of the recommended action in reducing the threat.',
        covid: '"Getting vaccinated will substantially lower my chance of severe disease."',
        pa: '"Walking 30 min/day will measurably lower my blood pressure."'
    },
    bar: {
        title: 'Perceived Barriers',
        def: 'The believed material, psychological, or social costs of taking the action. The single strongest predictor in many studies — and it REDUCES the likelihood of action.',
        covid: '"The clinic is far, the line is long, and I might get side effects."',
        pa: '"I don\'t have time, the gym is expensive, and I\'m exhausted after work."'
    },
    eff: {
        title: 'Self-Efficacy',
        def: 'The person\'s confidence in their own ability to successfully perform the action.',
        covid: '"I know how to make an appointment and I can take time off if needed."',
        pa: '"I have walked daily before; I can build the habit again."'
    },
    cue: {
        title: 'Cue to Action',
        def: 'An internal or external trigger that pushes the person from intention to behavior.',
        covid: 'A reminder text from the pharmacy; a coworker getting sick.',
        pa: 'A doctor\'s prescription for activity; a wearable\'s daily step alert.'
    },
    mod: {
        title: 'Modifying Factors',
        def: 'Demographic, sociocultural, and structural factors (age, education, income, prior experience) that shape each of the four perceptual beliefs above.',
        covid: 'Health-system trust shaped by community history; insurance status.',
        pa: 'Walkability of the neighborhood; cultural norms around exercise.'
    }
};

const nodes = new vis.DataSet([
    // Central outcome
    { id: 'hpb', label: 'Health-\nProtective\nBehavior', x:  300, y:    0, color: '#00695c', shape: 'ellipse', font: { color: '#fff', size: 14, bold: true } },
    // Threat perceptions (top)
    { id: 'susc', label: 'Perceived\nSusceptibility', x:  -100, y: -180, color: '#2196F3', shape: 'box',     font: { color: '#fff', size: 12, bold: true } },
    { id: 'sev',  label: 'Perceived\nSeverity',        x:   100, y: -180, color: '#2196F3', shape: 'box',     font: { color: '#fff', size: 12, bold: true } },
    // Action evaluation (middle)
    { id: 'ben',  label: 'Perceived\nBenefits', x: -100, y: 0, color: '#4CAF50', shape: 'box', font: { color: '#fff', size: 12, bold: true } },
    { id: 'bar',  label: 'Perceived\nBarriers', x:  100, y: 0, color: '#FF9800', shape: 'box', font: { color: '#fff', size: 12, bold: true } },
    // Mediators (bottom)
    { id: 'eff',  label: 'Self-\nEfficacy', x:  -100, y: 180, color: '#9C27B0', shape: 'box', font: { color: '#fff', size: 12, bold: true } },
    { id: 'cue',  label: 'Cue to\nAction',  x:   100, y: 180, color: '#FBC02D', shape: 'box', font: { color: '#222', size: 12, bold: true } },
    // Modifying factors
    { id: 'mod',  label: 'Modifying\nFactors\n(age, SES,\nculture)', x: -350, y: -50, color: '#9e9e9e', shape: 'box', font: { color: '#fff', size: 11, bold: true } }
]);

const edges = new vis.DataSet([
    { from: 'susc', to: 'hpb', label: 'increases' },
    { from: 'sev',  to: 'hpb', label: 'increases' },
    { from: 'ben',  to: 'hpb', label: 'increases' },
    { from: 'bar',  to: 'hpb', label: 'reduces', color: { color: '#d32f2f' } },
    { from: 'eff',  to: 'hpb', label: 'increases' },
    { from: 'cue',  to: 'hpb', label: 'triggers' },
    // Modifying factors influence the four perceptual nodes (dashed)
    { from: 'mod', to: 'susc', dashes: true },
    { from: 'mod', to: 'sev',  dashes: true },
    { from: 'mod', to: 'ben',  dashes: true },
    { from: 'mod', to: 'bar',  dashes: true }
]);

const network = new vis.Network(document.getElementById('net'), { nodes, edges }, {
    nodes: { borderWidth: 1, margin: 8, widthConstraint: { maximum: 130 } },
    edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        color: { color: '#666' },
        font: { size: 10, color: '#444', background: 'rgba(255,255,255,0.85)', strokeWidth: 0 },
        smooth: { enabled: true, type: 'continuous', roundness: 0.2 }
    },
    physics: { enabled: false },
    interaction: { hover: true, zoomView: false, dragView: true }
});

function showConstruct(key) {
    const c = CONSTRUCTS[key];
    if (!c) return;
    document.getElementById('panel').innerHTML = `
        <h3>${c.title}</h3>
        <p>${c.def}</p>
        <div class="ex"><b>COVID-19 vaccine uptake:</b><br>${c.covid}</div>
        <div class="ex"><b>Physical activity behavior:</b><br>${c.pa}</div>
        <button id="reset">Reset view</button>`;
    document.getElementById('reset').addEventListener('click', resetView);
}

function resetView() {
    network.fit({ animation: false });
    document.getElementById('panel').innerHTML = `
        <h3>Click any construct.</h3>
        <p>The Health Belief Model explains why people do (or don't) adopt
        health-protective behaviors. Click a node to see its definition
        and how it shows up in two real-world contexts.</p>
        <button id="reset">Reset view</button>`;
    document.getElementById('reset').addEventListener('click', resetView);
}

network.on('selectNode', params => showConstruct(params.nodes[0]));
document.getElementById('reset').addEventListener('click', resetView);
network.fit({ animation: false });
