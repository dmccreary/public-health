// DAG Variable Structures Explorer
// CANVAS_HEIGHT: 530

const COLOR = {
    E: '#2196F3',   // Exposure
    O: '#FF9800',   // Outcome
    C: '#F44336',   // Confounder
    M: '#4CAF50',   // Mediator
    L: '#9C27B0'    // Collider
};

// Three groups, stacked vertically — fixed positions
function nodes() {
    return [
        // Group 1 — Confounder (top row)
        { id: 'g1_C', label: 'C',  x: -150, y: -200, color: COLOR.C, title: 'C — Confounder', group: 'confounder' },
        { id: 'g1_E', label: 'E',  x: -250, y: -110, color: COLOR.E, title: 'E — Exposure',   group: 'confounder' },
        { id: 'g1_O', label: 'O',  x:  -50, y: -110, color: COLOR.O, title: 'O — Outcome',    group: 'confounder' },
        // Labels for group 1
        { id: 'g1_t', label: 'Confounder structure',  x: -150, y: -255, shape: 'text', font: { size: 13, color: '#1a3a6c', face: 'Segoe UI', bold: true }, physics: false, widthConstraint: false },
        // Group 2 — Mediator (middle row)
        { id: 'g2_E', label: 'E', x: -250, y:  20, color: COLOR.E, title: 'E — Exposure', group: 'mediator' },
        { id: 'g2_M', label: 'M', x: -150, y:  23, color: COLOR.M, title: 'M — Mediator', group: 'mediator' },
        { id: 'g2_O', label: 'O', x:  -50, y:  20, color: COLOR.O, title: 'O — Outcome',  group: 'mediator' },
        { id: 'g2_t', label: 'Mediator structure',    x: -150, y: -30, shape: 'text', font: { size: 13, color: '#1a3a6c', face: 'Segoe UI', bold: true }, physics: false, widthConstraint: false },
        // Group 3 — Collider (bottom row)
        { id: 'g3_E', label: 'E', x: -250, y: 150, color: COLOR.E, title: 'E — Exposure', group: 'collider' },
        { id: 'g3_L', label: 'L', x: -150, y: 153, color: COLOR.L, title: 'L — Collider', group: 'collider' },
        { id: 'g3_O', label: 'O', x:  -50, y: 150, color: COLOR.O, title: 'O — Outcome',  group: 'collider' },
        { id: 'g3_t', label: 'Collider structure',    x: -150, y:  100, shape: 'text', font: { size: 13, color: '#1a3a6c', face: 'Segoe UI', bold: true }, physics: false, widthConstraint: false }
    ];
}

const edges = [
    // Confounder: C → E, C → O, E → O
    { id: 'e1a', from: 'g1_C', to: 'g1_E', label: 'causes' },
    { id: 'e1b', from: 'g1_C', to: 'g1_O', label: 'causes' },
    { id: 'e1c', from: 'g1_E', to: 'g1_O', label: 'apparent effect' },
    // Mediator: E → M → O
    { id: 'e2a', from: 'g2_E', to: 'g2_M', label: 'causes' },
    { id: 'e2b', from: 'g2_M', to: 'g2_O', label: 'causes' },
    // Collider: E → L ← O
    { id: 'e3a', from: 'g3_E', to: 'g3_L', label: 'causes' },
    { id: 'e3b', from: 'g3_O', to: 'g3_L', label: 'causes' }
];

const STRUCTURES = {
    confounder: {
        title: 'Confounder',
        body: '<b>C → E and C → O.</b> A confounder causes both the exposure and the outcome, ' +
              'creating a non-causal (backdoor) association.<br><br>' +
              '<b>Adjust for confounders</b> to remove the spurious association.<br><br>' +
              '<b>If you do not adjust:</b> the estimated E → O effect is biased.'
    },
    mediator: {
        title: 'Mediator',
        body: '<b>E → M → O.</b> A mediator carries the causal effect from exposure to outcome.<br><br>' +
              '<b>Do not adjust if you want the total effect</b> of E on O. Adjust only when you want ' +
              'the direct effect.<br><br>' +
              '<b>If you adjust incorrectly:</b> you remove part of the real causal effect (over-adjustment bias).'
    },
    collider: {
        title: 'Collider',
        body: '<b>E → L ← O.</b> A collider is a common <em>effect</em> of two variables. ' +
              'The path through L is closed by default.<br><br>' +
              '<b>Do NOT adjust for colliders.</b><br><br>' +
              '<b>If you adjust:</b> you open the path and induce a spurious E–O association ' +
              '(selection / collider-stratification bias).'
    }
};

const EDGE_EXPL = {
    'e1a': 'C → E: the confounder causes the exposure.',
    'e1b': 'C → O: the confounder also causes the outcome.',
    'e1c': 'E → O: this is the association you want to estimate. Without adjusting for C, this is biased.',
    'e2a': 'E → M: the exposure causes the mediator.',
    'e2b': 'M → O: the mediator causes the outcome.',
    'e3a': 'E → L: the exposure is one cause of the collider.',
    'e3b': 'O → L: the outcome is the other cause of the collider.'
};

const data = {
    nodes: new vis.DataSet(nodes()),
    edges: new vis.DataSet(edges)
};

const network = new vis.Network(document.getElementById('net'), data, {
    nodes: {
        shape: 'circle',
        size: 28,
        font: { size: 18, color: '#fff', face: 'Segoe UI', bold: true },
        borderWidth: 2
    },
    edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        color: { color: '#444' },
        font: { size: 10, color: '#555', background: 'rgba(255,255,255,0.85)', align: 'top' },
        width: 1.5,
        smooth: false
    },
    physics: { enabled: false },
    interaction: { hover: true, zoomView: false, dragView: false }
});

function showStructure(g) {
    const s = STRUCTURES[g];
    document.getElementById('panel').innerHTML = `
        <h3>${s.title}</h3>
        <p>${s.body}</p>
        <div class="adjust-row">
            <label><input type="checkbox" id="adjusted" ${adjusted ? 'checked' : ''}> Show adjusted version</label>
        </div>`;
    document.getElementById('adjusted').addEventListener('change', e => {
        adjusted = e.target.checked;
        applyAdjustedStyling();
    });
}

function showEdge(eid) {
    document.getElementById('panel').innerHTML = `
        <h3>Edge</h3>
        <p>${EDGE_EXPL[eid] || 'A directed causal effect from the source to the target variable.'}</p>`;
}

let adjusted = false;

function applyAdjustedStyling() {
    // Adjusted means: confounder is conditioned on (box), mediator is conditioned on (box),
    // collider is conditioned on (box) — and we update the path-status label visually with a border.
    data.nodes.forEach(n => {
        const isAdjustable = ['g1_C', 'g2_M', 'g3_L'].includes(n.id);
        if (isAdjustable) {
            data.nodes.update({
                id: n.id,
                shape: adjusted ? 'box' : 'dot',
                borderWidth: adjusted ? 4 : 2,
                color: { background: n.color, border: adjusted ? '#000' : '#666' }
            });
        }
    });
}

network.on('selectNode', params => {
    const id = params.nodes[0];
    const node = data.nodes.get(id);
    showStructure(node.group);
});
network.on('selectEdge', params => {
    if (params.nodes.length === 0 && params.edges.length > 0) {
        showEdge(params.edges[0]);
    }
});

network.fit({ animation: false });
