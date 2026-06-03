// MLM Recruitment Network Dynamics — vis-network
// CANVAS_HEIGHT: 560
//
// Models a multi-level marketing recruitment tree. Each cycle, each active
// distributor recruits 2 new distributors (stylized). FTC-modeled income
// distribution: the top 1% capture most income, median annual gross is
// $500-$1,500, and the great majority lose money after product-purchase
// requirements are subtracted.

// Tier color palette
const TIER_COLORS = {
    1: '#FFC107', // gold — top
    2: '#BDBDBD', // silver — tier 2
    3: '#2196F3', // blue — tier 3
    4: '#1976D2', // blue — tier 4
    5: '#9e9e9e'  // gray — tier 5+
};

function tierColor(tier) {
    if (tier <= 1) return TIER_COLORS[1];
    if (tier === 2) return TIER_COLORS[2];
    if (tier === 3) return TIER_COLORS[3];
    if (tier === 4) return TIER_COLORS[4];
    return TIER_COLORS[5];
}

function tierLabel(tier) {
    if (tier === 1) return 'Top tier';
    if (tier === 2) return 'Tier 2';
    if (tier <= 4) return 'Tier ' + tier;
    return 'Tier 5+';
}

function tierBadgeClass(tier) {
    if (tier === 1) return 'gold';
    if (tier === 2) return 'silver';
    if (tier <= 4) return 'blue';
    return 'gray';
}

// FTC-modeled annual gross income (very rough, illustrative)
// Top 1% capture most income. The vast majority lose money after product
// purchase requirements (~$1,200/yr stylized).
function estimateIncome(tier, recruitsSponsored) {
    // FTC-modeled distribution: top tier captures most income, while the
    // great majority of distributors gross only $500-$1,500/yr. A stylized
    // annual product-purchase requirement of $1,200 means most lose money.
    let gross;
    if (tier === 1) gross = 80000 + recruitsSponsored * 1500;
    else if (tier === 2) gross = 1500 + recruitsSponsored * 250;
    else if (tier === 3) gross = 900 + recruitsSponsored * 120;
    else if (tier === 4) gross = 600 + recruitsSponsored * 60;
    else gross = 400 + recruitsSponsored * 20;
    const productCost = 1200; // annual required product purchases
    const net = gross - productCost;
    return { gross: Math.round(gross), net: Math.round(net), productCost };
}

// State
let distributors = [];   // {id, tier, parentId, recruits: [ids], claimMade: false}
let nextId = 1;
let claimReached = new Set(); // ids that received the unsupported claim

function makeDistributor(tier, parentId) {
    const d = {
        id: 'd' + nextId++,
        tier: tier,
        parentId: parentId,
        recruits: [],
        claimMade: false
    };
    distributors.push(d);
    if (parentId) {
        const parent = distributors.find(x => x.id === parentId);
        if (parent) parent.recruits.push(d.id);
    }
    return d;
}

function initSeed() {
    distributors = [];
    nextId = 1;
    claimReached = new Set();
    // 1 gold top
    const top = makeDistributor(1, null);
    // 3 silver under the top
    for (let i = 0; i < 3; i++) makeDistributor(2, top.id);
}

initSeed();

// vis-network DataSets (we rebuild each refresh — simple and reliable)
const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([]);

const container = document.getElementById('net');
const network = new vis.Network(container, { nodes, edges }, {
    layout: {
        hierarchical: {
            enabled: true,
            direction: 'UD',
            sortMethod: 'directed',
            levelSeparation: 80,
            nodeSpacing: 40,
            treeSpacing: 60
        }
    },
    nodes: {
        shape: 'dot',
        size: 14,
        borderWidth: 1,
        font: { size: 0 } // labels off by default to keep it readable
    },
    edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.4 } },
        color: { color: '#9aa0a6' },
        width: 1,
        smooth: { enabled: false }
    },
    physics: { enabled: false },
    interaction: { hover: true, zoomView: true, dragView: true, dragNodes: false }
});

function refreshGraph(edgeColorMap) {
    edgeColorMap = edgeColorMap || {};
    const nodeArr = distributors.map(d => {
        const base = tierColor(d.tier);
        const isClaim = claimReached.has(d.id);
        return {
            id: d.id,
            level: d.tier - 1,
            color: {
                background: base,
                border: isClaim ? '#b71c1c' : '#555',
                highlight: { background: base, border: '#1a3a6c' }
            },
            borderWidth: isClaim ? 2 : 1,
            size: d.tier === 1 ? 18 : (d.tier === 2 ? 15 : 11)
        };
    });
    const edgeArr = [];
    distributors.forEach(d => {
        if (d.parentId) {
            const key = d.parentId + '->' + d.id;
            const custom = edgeColorMap[key];
            edgeArr.push({
                id: key,
                from: d.parentId,
                to: d.id,
                color: custom ? { color: custom.color } : { color: '#9aa0a6' },
                width: custom ? (custom.width || 2) : 1,
                arrows: custom && custom.reverse
                    ? { to: { enabled: false }, from: { enabled: true, scaleFactor: 0.6 } }
                    : { to: { enabled: true, scaleFactor: 0.4 } }
            });
        }
    });
    nodes.clear();
    edges.clear();
    nodes.add(nodeArr);
    edges.add(edgeArr);
    network.fit({ animation: false });
    updateStats();
}

function updateStats() {
    const total = distributors.length;
    // Profitable = net income > 0. With $1,200/yr product cost most lower tiers
    // are unprofitable.
    let profitable = 0;
    distributors.forEach(d => {
        const inc = estimateIncome(d.tier, d.recruits.length);
        if (inc.net > 0) profitable++;
    });
    const pct = total > 0 ? Math.round(100 * profitable / total) : 0;
    document.getElementById('stats').innerHTML =
        'Nodes: ' + total + ' &nbsp;|&nbsp; Profitable: ' + pct + '%';
}

// --- Add Recruits cycle ---
function addRecruitsCycle() {
    // Each existing leaf-ish active distributor recruits 2 new (stylized).
    // We cap growth to keep the visualization readable.
    const MAX_NODES = 120;
    if (distributors.length >= MAX_NODES) return;
    // Recruit from the currently-bottom tier (most recent additions) plus
    // top tiers that haven't fully recruited yet. Simplified: pick the
    // current max tier, and have each of those recruit 2 children.
    const maxTier = Math.max.apply(null, distributors.map(d => d.tier));
    const recruiters = distributors.filter(d => d.tier === maxTier);
    for (const r of recruiters) {
        if (distributors.length >= MAX_NODES) break;
        makeDistributor(r.tier + 1, r.id);
        if (distributors.length >= MAX_NODES) break;
        makeDistributor(r.tier + 1, r.id);
    }
    refreshGraph();
}

// --- Propagate unsupported health claim from top, 3 hops ---
function propagateClaim() {
    claimReached = new Set();
    const top = distributors.find(d => d.tier === 1);
    if (!top) return;
    // BFS up to 3 hops
    let frontier = [top.id];
    let hops = 0;
    const colorMap = {};
    const visited = new Set();
    function step() {
        const next = [];
        for (const id of frontier) {
            if (visited.has(id)) continue;
            visited.add(id);
            claimReached.add(id);
            const d = distributors.find(x => x.id === id);
            if (!d) continue;
            d.claimMade = true;
            for (const cid of d.recruits) {
                if (!visited.has(cid)) {
                    next.push(cid);
                    colorMap[id + '->' + cid] = { color: '#d32f2f', width: 2 };
                }
            }
        }
        frontier = next;
        hops++;
        refreshGraph(colorMap);
        if (hops < 4 && frontier.length > 0) {
            setTimeout(step, 600);
        }
    }
    step();
}

// --- Show income flow (upward green arrows) ---
function showIncomeFlow() {
    const colorMap = {};
    distributors.forEach(d => {
        if (d.parentId) {
            colorMap[d.parentId + '->' + d.id] = {
                color: '#2e7d32', width: 2.5, reverse: true
            };
        }
    });
    refreshGraph(colorMap);
}

// --- Reset ---
function resetSim() {
    initSeed();
    refreshGraph();
    resetPanel();
}

function resetPanel() {
    document.getElementById('panel').innerHTML = `
        <h3>Click any distributor.</h3>
        <p>This network models how multi-level marketing (MLM) recruitment
        spreads. Click <b>Add Recruits</b> to grow the network one cycle.
        Click <b>Propagate Claim</b> to watch an unsupported health claim
        spread from the top. Click <b>Show Income Flow</b> to see commissions
        flow upward.</p>
        <div id="legend">
            <span><i style="background:#FFC107"></i>Top tier</span>
            <span><i style="background:#BDBDBD"></i>Tier 2</span>
            <span><i style="background:#2196F3"></i>Tier 3-4</span>
            <span><i style="background:#9e9e9e"></i>Tier 5+</span>
        </div>`;
}

// --- Click a node → side panel ---
function showDistributor(id) {
    const d = distributors.find(x => x.id === id);
    if (!d) return;
    const inc = estimateIncome(d.tier, d.recruits.length);
    const badge = tierBadgeClass(d.tier);
    const netClass = inc.net >= 0 ? 'pos' : 'neg';
    const sign = inc.net >= 0 ? '+' : '−';
    const claimBadge = d.claimMade
        ? '<span class="badge claim">Made unsupported claim</span>'
        : '';
    document.getElementById('panel').innerHTML = `
        <h3>Distributor ${d.id.toUpperCase()}</h3>
        <span class="badge ${badge}">${tierLabel(d.tier)}</span>
        ${claimBadge}
        <div class="row">
            <b>Recruits sponsored:</b> ${d.recruits.length}
        </div>
        <div class="row">
            <b>Estimated annual gross income:</b><br>
            $${inc.gross.toLocaleString()}
            <br><span style="font-size:11px;color:#555;">
            (FTC-modeled distribution; top 1% capture most income)</span>
        </div>
        <div class="row">
            <b>Required product purchases:</b> $${inc.productCost.toLocaleString()}/yr
        </div>
        <div class="row">
            <b>Net income:</b>
            <span class="${netClass}">${sign}$${Math.abs(inc.net).toLocaleString()}</span>
            <br><span style="font-size:11px;color:#555;">
            ${inc.net >= 0
                ? 'This distributor is profitable.'
                : 'This distributor loses money — the typical outcome.'}
            </span>
        </div>`;
}

// --- Wire up controls ---
document.getElementById('btn-recruit').addEventListener('click', addRecruitsCycle);
document.getElementById('btn-claim').addEventListener('click', propagateClaim);
document.getElementById('btn-income').addEventListener('click', showIncomeFlow);
document.getElementById('btn-reset').addEventListener('click', resetSim);

network.on('selectNode', params => {
    if (params.nodes && params.nodes.length > 0) showDistributor(params.nodes[0]);
});

// Initial render
refreshGraph();
