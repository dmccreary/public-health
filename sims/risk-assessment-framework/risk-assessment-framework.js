// Four-Step Risk Assessment Framework
// CANVAS_HEIGHT: 510

const STEPS = {
    haz: {
        title: '1. Hazard Identification',
        def: 'Decide whether a chemical or agent <em>can</em> cause an adverse health effect.',
        q: 'Could exposure to this agent cause harm in principle?',
        metric: 'IARC group (1, 2A, 2B, 3, 4); NTP "known/anticipated" classification.'
    },
    dose: {
        title: '2. Dose-Response Assessment',
        def: 'Characterize the quantitative relationship between dose and effect.',
        q: 'How much exposure produces how much effect?',
        metric: 'Reference Dose (RfD) for non-cancer; Cancer Slope Factor (CSF) for cancer; BMD₁₀ benchmark dose.'
    },
    exp: {
        title: '3. Exposure Assessment',
        def: 'Estimate the magnitude, frequency, duration, and route of exposure in the population of concern.',
        q: 'Who is exposed, to how much, by what route, for how long?',
        metric: 'Chronic Daily Intake (CDI, mg/kg/day); inhalation exposure concentration (µg/m³).'
    },
    risk: {
        title: '4. Risk Characterization',
        def: 'Integrate steps 1–3 into a quantitative statement of risk, with uncertainties.',
        q: 'Given the dose-response and the exposure, what is the expected risk?',
        metric: 'Hazard Quotient (HQ = CDI/RfD) for non-cancer; Excess Lifetime Cancer Risk (ELCR = CDI × CSF).'
    }
};

const nodes = new vis.DataSet([
    { id: 'haz',  label: '1. Hazard\nIdentification',     x: -240, y: 0, color: '#bbdefb' },
    { id: 'dose', label: '2. Dose-Response\nAssessment',   x:  -80, y: 0, color: '#64b5f6' },
    { id: 'exp',  label: '3. Exposure\nAssessment',        x:   80, y: 0, color: '#1e88e5' },
    { id: 'risk', label: '4. Risk\nCharacterization',      x:  240, y: 0, color: '#0d47a1' }
]);

const edges = new vis.DataSet([
    { id: 'e1', from: 'haz',  to: 'dose' },
    { id: 'e2', from: 'dose', to: 'exp' },
    { id: 'e3', from: 'exp',  to: 'risk' }
]);

const network = new vis.Network(document.getElementById('net'), { nodes, edges }, {
    nodes: {
        shape: 'box', borderWidth: 1, margin: 12,
        font: { color: '#fff', size: 13, bold: true },
        widthConstraint: { minimum: 130, maximum: 130 }
    },
    edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.9 } },
        color: { color: '#555', highlight: '#ff9800', hover: '#ff9800' },
        width: 2.5,
        smooth: false
    },
    physics: { enabled: false },
    interaction: { hover: true, hoverConnectedEdges: true, zoomView: false, dragView: false }
});

// Light font for the lightest box
nodes.update({ id: 'haz', font: { color: '#0d47a1', size: 13, bold: true } });

function showStep(id) {
    const s = STEPS[id];
    if (!s) return;
    document.getElementById('panel').innerHTML = `
        <h3>${s.title}</h3>
        <p>${s.def}</p>
        <div class="q"><b>Key question:</b> ${s.q}</div>
        <div class="metric"><b>Output metric:</b> ${s.metric}</div>
        <button id="reset">Reset (collapse all)</button>`;
    document.getElementById('reset').addEventListener('click', reset);
}

function reset() {
    document.getElementById('panel').innerHTML = `
        <h3>Click any step to expand.</h3>
        <p>The 1983 NRC "Red Book" framework structures environmental
        risk assessment into four sequential steps.</p>
        <button id="reset">Reset (collapse all)</button>`;
    document.getElementById('reset').addEventListener('click', reset);
    network.unselectAll();
}

network.on('selectNode', p => showStep(p.nodes[0]));
network.on('hoverNode', p => {
    // emphasize outgoing edge in orange (handled by the edges.color.hover above)
});
document.getElementById('reset').addEventListener('click', reset);
network.fit({ animation: false });
