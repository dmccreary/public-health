// US Health System Structure
// CANVAS_HEIGHT: 580

const C = {
    fed: '#0d47a1', state: '#00838f', local: '#388e3c',
    ins: '#6a1b9a', net: '#ef6c00', fqhc: '#fbc02d'
};

const INFO = {
    hhs:    { tier: 'Federal',  mandate: 'Cabinet-level department coordinating federal health programs.', funding: 'Federal appropriations + Medicare/Medicaid trust funds.', example: 'Operates 11 agencies including CDC, NIH, FDA, CMS.' },
    cdc:    { tier: 'Federal',  mandate: 'Surveillance, outbreak response, and prevention guidance.',     funding: 'HHS appropriation; PHSSEF.',                              example: 'National Notifiable Diseases Surveillance System (NNDSS).' },
    cms:    { tier: 'Federal',  mandate: 'Administers Medicare and partners with states on Medicaid.',     funding: 'Medicare trust funds; federal Medicaid match.',           example: 'Medicare Part A hospital insurance.' },
    nih:    { tier: 'Federal',  mandate: 'Funds biomedical and public-health research.',                   funding: 'Federal appropriations.',                                 example: 'NIH-funded clinical trials and R01 grants.' },
    fda:    { tier: 'Federal',  mandate: 'Regulates food, drugs, devices, tobacco.',                       funding: 'Federal appropriations + user fees.',                     example: 'Vaccine and drug approval pathways.' },
    sthd:   { tier: 'State',    mandate: 'Statewide public-health authority; licensure of facilities.',    funding: 'State appropriations + federal grants.',                  example: 'State immunization registry.' },
    medic:  { tier: 'State',    mandate: 'State-administered Medicaid program for low-income residents.',  funding: 'Federal/state Medicaid match.',                           example: 'Pregnancy and postpartum coverage.' },
    lhd:    { tier: 'Local',    mandate: 'County or city public-health department: clinics, inspections.', funding: 'State pass-through + local taxes + federal grants.',      example: 'Restaurant inspections; STI clinics.' },
    plan:   { tier: 'Private',  mandate: 'Commercial insurance plans (employer / individual market).',     funding: 'Premiums + employer contributions.',                       example: 'PPO, HMO, high-deductible plans on ACA marketplaces.' },
    hosp:   { tier: 'Safety Net', mandate: 'Public and not-for-profit hospitals serving uninsured.',       funding: 'Disproportionate Share Hospital (DSH); charity care.',    example: 'County hospitals like Bellevue (NYC) or LAC+USC.' },
    fqhc:   { tier: 'FQHC',     mandate: 'Federally Qualified Health Centers — sliding-scale primary care.', funding: 'HRSA Section 330 grant + Medicaid PPS rate.',           example: 'Community health center serving uninsured patients.' }
};

const TIER_MAP = {
    gov:  ['hhs','cdc','cms','nih','fda','sthd','medic','lhd'],
    ins:  ['cms','medic','plan'],
    net:  ['hosp','fqhc','lhd']
};

const nodes = new vis.DataSet([
    // Federal row
    { id: 'hhs',   label: 'HHS',           x:  -40, y: -200, color: C.fed, tier: 'gov' },
    { id: 'cdc',   label: 'CDC',           x: -260, y: -120, color: C.fed, tier: 'gov' },
    { id: 'cms',   label: 'CMS',           x: -130, y: -120, color: C.fed, tier: 'gov' },
    { id: 'nih',   label: 'NIH',           x:    0, y: -120, color: C.fed, tier: 'gov' },
    { id: 'fda',   label: 'FDA',           x:  130, y: -120, color: C.fed, tier: 'gov' },
    // State row
    { id: 'sthd',  label: 'State Health\nDept',   x: -180, y:  -10, color: C.state, tier: 'gov' },
    { id: 'medic', label: 'State Medicaid', x:  -30, y:  -10, color: C.state, tier: 'gov ins' },
    // Local row
    { id: 'lhd',   label: 'Local Health\nDept',   x: -180, y:   90, color: C.local, tier: 'gov net' },
    // Private/safety net
    { id: 'plan',  label: 'Private\nInsurance',   x:  180, y:  -10, color: C.ins, tier: 'ins' },
    { id: 'hosp',  label: 'Safety-Net\nHospitals',x:  180, y:   90, color: C.net, tier: 'net' },
    { id: 'fqhc',  label: 'FQHC',                 x:    0, y:  170, color: C.fqhc, tier: 'net', font: { color: '#222', size: 12, bold: true } }
]);

const edges = new vis.DataSet([
    // Funding (solid)
    { from: 'hhs', to: 'cdc'   },
    { from: 'hhs', to: 'cms'   },
    { from: 'hhs', to: 'nih'   },
    { from: 'hhs', to: 'fda'   },
    { from: 'cms', to: 'medic',  label: 'federal match' },
    { from: 'sthd',to: 'lhd',    label: 'pass-through' },
    { from: 'medic',to:'plan',   label: 'MCO contracts' },
    { from: 'hhs', to: 'fqhc',   label: 'HRSA 330' },
    { from: 'medic',to: 'hosp',  label: 'DSH' },
    // Regulatory (dashed)
    { from: 'fda', to: 'plan',   dashes: true, label: 'reg.', color: { color: '#888' } },
    { from: 'cdc', to: 'sthd',   dashes: true, label: 'guidance', color: { color: '#888' } },
    { from: 'sthd',to: 'lhd',    dashes: true, color: { color: '#888' } }
]);

let allNodes = nodes.get(), allEdges = edges.get();

const network = new vis.Network(document.getElementById('net'), { nodes, edges }, {
    nodes: {
        shape: 'box', borderWidth: 1, margin: 7,
        font: { color: '#fff', size: 11, bold: true },
        widthConstraint: { maximum: 110 }
    },
    edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.65 } },
        color: { color: '#555' }, width: 1.5,
        font: { size: 9.5, color: '#444', background: 'rgba(255,255,255,0.85)' },
        smooth: { type: 'continuous', roundness: 0.15 }
    },
    physics: { enabled: false },
    interaction: { hover: true, zoomView: false }
});

function applyFilter(val) {
    if (val === 'all') {
        nodes.update(allNodes.map(n => ({ id: n.id, hidden: false })));
        edges.update(allEdges.map(e => ({ id: e.id, hidden: false })));
        return;
    }
    const keep = new Set(TIER_MAP[val] || []);
    nodes.update(allNodes.map(n => ({ id: n.id, hidden: !keep.has(n.id) })));
    edges.update(allEdges.map(e => ({ id: e.id, hidden: !(keep.has(e.from) && keep.has(e.to)) })));
}

network.on('selectNode', p => {
    const id = p.nodes[0];
    const info = INFO[id];
    if (!info) return;
    document.getElementById('panel').innerHTML = `
        <h3>${nodes.get(id).label.replace(/\n/g,' ')} <small>(${info.tier})</small></h3>
        <p><b>Mandate:</b> ${info.mandate}</p>
        <p><b>Funding:</b> ${info.funding}</p>
        <p><b>Example:</b> ${info.example}</p>`;
});

document.getElementById('filter').addEventListener('change', e => applyFilter(e.target.value));
network.fit({ animation: false });
