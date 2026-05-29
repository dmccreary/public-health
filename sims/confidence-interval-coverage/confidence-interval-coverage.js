// Confidence Interval Coverage from Repeated Sampling
// CANVAS_HEIGHT: 600
// Chart.js horizontal floating-bar visualization of 50 CIs from repeated samples.

const TRUE_MEAN = 100;
const POP_SD = 15;
const N_SAMPLES = 50;

const Z = { '0.90': 1.6449, '0.95': 1.9600, '0.99': 2.5758 };

function randNormal(mean, sd) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function buildCIs(n, conf) {
    const z = Z[conf.toFixed(2)];
    const cis = [];
    for (let i = 0; i < N_SAMPLES; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) sum += randNormal(TRUE_MEAN, POP_SD);
        const mean = sum / n;
        const se = POP_SD / Math.sqrt(n);
        const half = z * se;
        cis.push({
            sample: i + 1,
            mean: mean,
            lo: mean - half,
            hi: mean + half,
            contains: (mean - half) <= TRUE_MEAN && (mean + half) >= TRUE_MEAN
        });
    }
    return cis;
}

// Plugin: draw vertical dashed line at true mean
const trueMeanLine = {
    id: 'trueMeanLine',
    afterDatasetsDraw(chart) {
        const x = chart.scales.x.getPixelForValue(TRUE_MEAN);
        const yTop = chart.chartArea.top;
        const yBot = chart.chartArea.bottom;
        const ctx = chart.ctx;
        ctx.save();
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBot);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#222';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('μ = 100', x, yTop - 4);
        ctx.restore();
    }
};

let chart = null;
let revealedCount = 0;
let animTimer = null;

function makeChart(cis) {
    const ctx = document.getElementById('ciChart').getContext('2d');
    const teal = 'rgba(38, 166, 154, 0.85)';
    const red = 'rgba(229, 57, 53, 0.9)';

    const labels = cis.map(c => c.sample.toString());
    const dataPairs = cis.map(c => [c.lo, c.hi]);
    const colors = cis.map(c => c.contains ? teal : red);
    const means = cis.map(c => c.mean);

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'CI',
                data: dataPairs.map(() => [null, null]),
                _full: dataPairs,
                _means: means,
                backgroundColor: colors,
                borderColor: colors,
                borderSkipped: false,
                borderWidth: 1,
                barPercentage: 0.85,
                categoryPercentage: 0.95
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: {
                    min: 70, max: 130,
                    title: { display: true, text: 'Sample mean (95% CI)' },
                    grid: { color: '#eee' }
                },
                y: {
                    title: { display: true, text: 'Sample #' },
                    ticks: {
                        autoSkip: false,
                        callback: function(val, idx) {
                            return (idx % 5 === 0 || idx === N_SAMPLES - 1) ? this.getLabelForValue(val) : '';
                        }
                    },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: items => 'Sample ' + items[0].label,
                        label: ctx => {
                            const i = ctx.dataIndex;
                            const c = cis[i];
                            return [
                                'Sample mean: ' + c.mean.toFixed(2),
                                'CI: [' + c.lo.toFixed(2) + ', ' + c.hi.toFixed(2) + ']',
                                c.contains ? 'Contains μ=100 ✓' : 'Misses μ=100 ✗'
                            ];
                        }
                    }
                }
            }
        },
        plugins: [trueMeanLine]
    });
}

function animateReveal(cis) {
    revealedCount = 0;
    if (animTimer) clearInterval(animTimer);
    const ds = chart.data.datasets[0];
    animTimer = setInterval(() => {
        if (revealedCount >= cis.length) {
            clearInterval(animTimer);
            animTimer = null;
            return;
        }
        ds.data[revealedCount] = ds._full[revealedCount];
        chart.update('none');
        revealedCount++;
    }, 30);
}

function updateCoverageDisplay(cis) {
    const n = cis.filter(c => c.contains).length;
    const pct = (100 * n / cis.length).toFixed(0);
    document.getElementById('coverage').textContent =
        `${n} of ${cis.length} CIs contain the true mean (${pct}%)`;
}

function redraw() {
    const conf = parseFloat(document.getElementById('conf').value);
    const n = parseInt(document.getElementById('nSize').value, 10);
    const cis = buildCIs(n, conf);
    makeChart(cis);
    updateCoverageDisplay(cis);
    animateReveal(cis);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('redraw').addEventListener('click', redraw);
    document.getElementById('conf').addEventListener('change', redraw);
    document.getElementById('nSize').addEventListener('change', redraw);
    redraw();
});
