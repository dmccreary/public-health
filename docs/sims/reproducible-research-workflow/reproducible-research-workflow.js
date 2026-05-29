// Reproducible Research Workflow
// CANVAS_HEIGHT: 560

const STAGES = {
    raw: {
        title: 'Raw Data',
        body: 'Untouched source data — CDC download, survey CSV, vital-records extract, sensor file. <b>Reproducibility role:</b> never edited; stored read-only with a SHA-256 hash recorded.'
    },
    dict: {
        title: 'Data Dictionary',
        body: 'Codebook describing every variable, its units, valid range, and source. <b>Reproducibility role:</b> lets a future reader (including future-you) understand the columns without guessing.'
    },
    clean: {
        title: 'Cleaning Script',
        body: 'Python/pandas or R/dplyr code that transforms raw → clean. <b>Reproducibility role:</b> every transformation is in code, not done by hand in a spreadsheet.'
    },
    cleaned: {
        title: 'Clean Data',
        body: 'Versioned intermediate file produced by the cleaning script. <b>Reproducibility role:</b> derivable from raw data + cleaning script; never edited manually.'
    },
    nb: {
        title: 'Analysis Notebook',
        body: 'Jupyter .ipynb or R Markdown .Rmd combining code, text, and outputs. <b>Reproducibility role:</b> reading it tells the reviewer exactly which model was fit and which decisions were made.'
    },
    figs: {
        title: 'Figures & Tables',
        body: 'Generated outputs (PNG, SVG, CSV). <b>Reproducibility role:</b> never manually edited; if a figure is wrong, fix the notebook and regenerate.'
    },
    paper: {
        title: 'Report / Paper',
        body: 'Manuscript that pulls in the generated figures and tables. <b>Reproducibility role:</b> the prose synthesizes outputs the reviewer can re-create from raw data.'
    },
    commit: {
        title: 'Git Commit',
        body: 'Every meaningful change (script, notebook, paper draft) is a commit. <b>Reproducibility role:</b> the entire history of the project is recoverable; "git checkout <SHA>" recreates any past state.'
    },
    repo: {
        title: 'GitHub Repository',
        body: 'Remote origin with a Zenodo-minted DOI. <b>Reproducibility role:</b> anyone can clone, re-run, and cite the exact analysis version that produced the paper.'
    }
};

const COL = { input: '#9e9e9e', proc: '#2196F3', output: '#4CAF50', vcs: '#FF9800' };

const nodes = new vis.DataSet([
    { id: 'raw',    label: 'Raw Data',          x: -300, y: -120, color: COL.input },
    { id: 'dict',   label: 'Data Dictionary',   x: -300, y:   60, color: COL.input },
    { id: 'clean',  label: 'Cleaning Script',   x: -130, y: -120, color: COL.proc },
    { id: 'cleaned',label: 'Clean Data',        x:   30, y: -120, color: COL.proc },
    { id: 'nb',     label: 'Analysis Notebook', x:  200, y: -120, color: COL.proc },
    { id: 'figs',   label: 'Figures & Tables',  x:  200, y:   30, color: COL.output },
    { id: 'paper',  label: 'Report / Paper',    x:  200, y:  150, color: COL.output },
    { id: 'commit', label: 'Git Commit',        x:  -50, y:  150, color: COL.vcs },
    { id: 'repo',   label: 'GitHub Repository', x: -300, y:  220, color: COL.vcs }
]);

const edges = new vis.DataSet([
    { from: 'raw',     to: 'clean' },
    { from: 'clean',   to: 'cleaned' },
    { from: 'cleaned', to: 'nb' },
    { from: 'nb',      to: 'figs' },
    { from: 'figs',    to: 'paper' },
    { from: 'dict',    to: 'clean', dashes: true, label: 'guides' },
    // commit / repo arrows
    { from: 'commit',  to: 'repo',   label: 'push' },
    { from: 'clean',   to: 'commit', dashes: true, color: { color: '#cc9000' } },
    { from: 'nb',      to: 'commit', dashes: true, color: { color: '#cc9000' } },
    { from: 'paper',   to: 'commit', dashes: true, color: { color: '#cc9000' } }
]);

new vis.Network(document.getElementById('net'), { nodes, edges }, {
    nodes: {
        shape: 'box', borderWidth: 1, margin: 8,
        font: { color: '#fff', size: 12, bold: true }, widthConstraint: { maximum: 130 }
    },
    edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        color: { color: '#555' },
        font: { size: 10, color: '#444', background: 'rgba(255,255,255,0.85)' },
        smooth: { type: 'continuous', roundness: 0.2 }
    },
    physics: { enabled: false },
    interaction: { hover: true, zoomView: false }
}).on('selectNode', params => {
    const s = STAGES[params.nodes[0]];
    if (!s) return;
    document.getElementById('panel').innerHTML = `<h3>${s.title}</h3><p>${s.body}</p>`;
});
