// Epidemic Curve Shape Explorer
// CANVAS_HEIGHT: 540

const DAYS = 40;

function gaussianPeak(days, center, width, total) {
    const arr = Array(days).fill(0);
    let s = 0;
    for (let d = 0; d < days; d++) {
        arr[d] = Math.exp(-Math.pow(d - center, 2) / (2 * width * width));
        s += arr[d];
    }
    return arr.map(v => Math.round(total * v / s));
}

function addPeaks(...peaks) {
    const out = Array(DAYS).fill(0);
    peaks.forEach(p => p.forEach((v, i) => { out[i] += v; }));
    return out;
}

const POINT_SRC = gaussianPeak(DAYS, 7, 1.6, 60);
const PROPAGATED = addPeaks(
    gaussianPeak(DAYS, 5,  1.4, 8),
    gaussianPeak(DAYS, 19, 1.8, 22),
    gaussianPeak(DAYS, 33, 2.2, 48)
);
const MIXED = addPeaks(
    gaussianPeak(DAYS, 7,  1.6, 40),
    gaussianPeak(DAYS, 14, 1.3, 12),
    gaussianPeak(DAYS, 21, 1.3, 6)
);

const MODES = {
    point: {
        data: POINT_SRC,
        color: '#2196F3',
        title: 'Point Source (Common-Source) Outbreak',
        info: '<b>Point source.</b> A single brief exposure (e.g., contaminated food at one meal) produces a tightly clustered onset distribution. Width ≈ incubation period of the pathogen. <b>Real example:</b> Salmonella outbreak from a single banquet.',
        marker: { day: 0, label: 'Exposure event (Day 0)' }
    },
    prop: {
        data: PROPAGATED,
        color: '#FF9800',
        title: 'Propagated (Person-to-Person) Outbreak',
        info: '<b>Propagated.</b> Cases generate new cases. Successive peaks are spaced one <i>serial interval</i> apart (~14 days here) and each generation can grow. <b>Real example:</b> Measles in an under-vaccinated school.',
        markers: [
            { day: 5,  label: 'Gen 1' },
            { day: 19, label: 'Gen 2' },
            { day: 33, label: 'Gen 3' }
        ]
    },
    mixed: {
        data: MIXED,
        color: '#9C27B0',
        title: 'Mixed Outbreak',
        info: '<b>Mixed.</b> A common-source exposure seeds the population; secondary person-to-person transmission produces follow-on peaks at later generation intervals. <b>Real example:</b> Norovirus from a single event with household secondary spread.',
        markers: [
            { day: 7,  label: 'Point exposure' },
            { day: 14, label: 'Secondary' },
            { day: 21, label: 'Tertiary' }
        ]
    }
};

let chart = null;
let highlightIdx = -1;

// Plugin: draw mode-specific annotations on top of bars
const annotations = {
    id: 'annotations',
    afterDatasetsDraw(chart) {
        const ds = chart.data.datasets[0];
        const mk = ds._markers || [];
        const ctx = chart.ctx;
        const yTop = chart.chartArea.top;
        ctx.save();
        ctx.fillStyle = '#444';
        ctx.font = 'bold 10.5px sans-serif';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        mk.forEach(m => {
            const x = chart.scales.x.getPixelForValue(m.day);
            ctx.beginPath();
            ctx.moveTo(x, yTop); ctx.lineTo(x, yTop + 18);
            ctx.stroke();
            // Keep label inside the plot area
            const left = chart.chartArea.left;
            const right = chart.chartArea.right;
            ctx.textAlign = (x - left < 40) ? 'left' : (right - x < 40 ? 'right' : 'center');
            ctx.fillText(m.label, x, yTop - 4);
        });
        ctx.setLineDash([]);
        ctx.restore();
    }
};

function buildChart(mode) {
    const M = MODES[mode];
    const ctx = document.getElementById('epiChart').getContext('2d');
    const baseColors = M.data.map((_, i) => i === highlightIdx ? '#000' : M.color);
    const markers = M.markers || (M.marker ? [M.marker] : []);

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: DAYS}, (_, i) => i.toString()),
            datasets: [{
                label: 'Cases',
                data: M.data,
                backgroundColor: baseColors,
                borderColor: baseColors,
                borderWidth: 1,
                _markers: markers,
                barPercentage: 0.95,
                categoryPercentage: 1.0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 22 } },
            scales: {
                x: { title: { display: true, text: 'Day of onset' } },
                y: { beginAtZero: true, title: { display: true, text: 'Number of cases' } }
            },
            plugins: {
                legend: { display: false },
                title: { display: true, text: M.title, font: { size: 13 } },
                tooltip: {
                    callbacks: {
                        title: items => 'Day ' + items[0].label,
                        label: c => 'Cases: ' + c.parsed.y
                    }
                }
            },
            onClick: (evt, els) => {
                if (els.length > 0) {
                    highlightIdx = els[0].index;
                    document.getElementById('infobox').innerHTML =
                        `<b>Day ${highlightIdx}</b>: ${M.data[highlightIdx]} cases. ${M.info}`;
                    buildChart(mode);
                }
            }
        },
        plugins: [annotations]
    });
}

function setMode(mode) {
    highlightIdx = -1;
    buildChart(mode);
    document.getElementById('infobox').innerHTML = MODES[mode].info;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name=mode]').forEach(r => {
        r.addEventListener('change', e => setMode(e.target.value));
    });
    setMode('point');
});
