// COVID-19 Excess Mortality by Demographic Group (US, 2020–2022)
// CANVAS_HEIGHT: 540
// Approximate values consistent with published CDC NCHS excess-death estimates.

// Color palette: ColorBrewer-style, colorblind-safe
const PALETTE = ['#1a3a6c', '#e69f00', '#56b4e9', '#009e73', '#cc79a7'];

// Race / ethnicity — excess deaths per 100,000 population (rough CDC published range)
const RACE = {
    labels: ['White (NH)', 'Black (NH)', 'Hispanic', 'Asian', 'AI/AN'],
    rates: [180, 285, 270, 145, 335],
    ciLo:  [170, 270, 255, 130, 305],
    ciHi:  [190, 300, 285, 160, 365]
};
// Age groups (years) — excess deaths per 100,000
const AGE = {
    labels: ['18–44', '45–64', '65–74', '75–84', '85+'],
    rates: [25, 110, 310, 520, 905],
    ciLo:  [22, 102, 295, 500, 875],
    ciHi:  [28, 118, 325, 540, 935]
};

const WHITE_BASELINE = RACE.rates[0]; // for ratio in tooltip

let chart = null;

// Custom plugin: draw error-bar whiskers for the 95% CI
const errorBars = {
    id: 'errorBars',
    afterDatasetsDraw(chart) {
        const ds = chart.data.datasets[0];
        const meta = chart.getDatasetMeta(0);
        const ctx = chart.ctx;
        ctx.save();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        meta.data.forEach((bar, i) => {
            const x = bar.x;
            const yLo = chart.scales.y.getPixelForValue(ds._ciLo[i]);
            const yHi = chart.scales.y.getPixelForValue(ds._ciHi[i]);
            ctx.beginPath();
            ctx.moveTo(x, yLo); ctx.lineTo(x, yHi);
            ctx.moveTo(x - 6, yLo); ctx.lineTo(x + 6, yLo);
            ctx.moveTo(x - 6, yHi); ctx.lineTo(x + 6, yHi);
            ctx.stroke();
        });
        ctx.restore();
    }
};

function render(view) {
    const ctx = document.getElementById('emChart').getContext('2d');
    const src = view === 'race' ? RACE : AGE;
    const colors = src.labels.map((_, i) => PALETTE[i % PALETTE.length]);
    const baseline = view === 'race' ? WHITE_BASELINE : null;

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: src.labels,
            datasets: [{
                label: 'Excess deaths per 100,000',
                data: src.rates,
                _ciLo: src.ciLo,
                _ciHi: src.ciHi,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Excess deaths per 100,000' }
                },
                x: {
                    title: { display: true, text: view === 'race' ? 'Race / Ethnicity' : 'Age group (years)' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (c) => {
                            const i = c.dataIndex;
                            const r = src.rates[i];
                            const lines = [
                                'Rate: ' + r + ' per 100,000',
                                '95% CI: [' + src.ciLo[i] + ', ' + src.ciHi[i] + ']'
                            ];
                            if (baseline !== null) {
                                const ratio = (r / baseline).toFixed(2);
                                lines.push('Ratio vs White (NH): ' + ratio + 'x');
                            }
                            return lines;
                        }
                    }
                }
            }
        },
        plugins: [errorBars]
    });
}

function setView(view) {
    document.getElementById('btn-race').classList.toggle('active', view === 'race');
    document.getElementById('btn-age').classList.toggle('active', view === 'age');
    render(view);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-race').addEventListener('click', () => setView('race'));
    document.getElementById('btn-age').addEventListener('click', () => setView('age'));
    render('race');
});
