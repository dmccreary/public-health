// Life Expectancy and Infant Mortality by Race and Income
// CANVAS_HEIGHT: 460

// Okabe–Ito colorblind-safe palette
const PAL = ['#0072B2', '#E69F00', '#009E73', '#CC79A7', '#56B4E9'];

// Life expectancy at birth, years (approximate NCHS values)
const LE_BY_RACE = {
    years: ['2010', '2015', '2019', '2021'],
    series: [
        { label: 'White',    data: [78.9, 78.7, 78.8, 76.4] },
        { label: 'Black',    data: [75.0, 75.4, 74.8, 70.8] },
        { label: 'Hispanic', data: [81.4, 81.8, 81.9, 77.7] },
        { label: 'Asian',    data: [86.5, 86.6, 85.6, 83.5] }
    ]
};
const LE_BY_INCOME = {
    years: ['2010', '2015', '2019', '2021'],
    series: [
        { label: 'Q1 (lowest)',  data: [74.5, 74.7, 74.8, 72.0] },
        { label: 'Q2',           data: [77.5, 77.7, 77.8, 75.4] },
        { label: 'Q3',           data: [80.0, 80.2, 80.3, 77.9] },
        { label: 'Q4 (highest)', data: [82.4, 82.7, 82.9, 80.6] }
    ]
};

// Infant mortality rate, per 1,000 live births
const IM_BY_RACE = {
    years: ['2000', '2010', '2015', '2021'],
    series: [
        { label: 'White', data: [5.7, 5.2, 4.9, 4.4] },
        { label: 'Black', data: [13.6, 11.2, 10.9, 10.4] }
    ]
};
const IM_BY_INCOME = {
    years: ['2000', '2010', '2015', '2021'],
    series: [
        { label: 'Q1 (lowest)',  data: [10.0, 8.9, 8.5, 8.1] },
        { label: 'Q4 (highest)', data: [4.8,  4.3, 4.1, 3.9] }
    ]
};

let leChart = null, imChart = null;

function buildSeries(data) {
    return data.series.map((s, i) => ({
        label: s.label,
        data: s.data,
        backgroundColor: PAL[i % PAL.length],
        borderColor: PAL[i % PAL.length],
        borderWidth: 1
    }));
}

function makeChart(canvasId, src, yLabel, yMin) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: { labels: src.years, datasets: buildSeries(src) },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: yMin === 0, min: yMin, title: { display: true, text: yLabel, font: { size: 11 } } },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } },
                tooltip: {
                    callbacks: {
                        label: c => `${c.dataset.label}: ${c.parsed.y}`
                    }
                }
            }
        }
    });
}

function render(view) {
    if (leChart) leChart.destroy();
    if (imChart) imChart.destroy();
    const leSrc = view === 'race' ? LE_BY_RACE : LE_BY_INCOME;
    const imSrc = view === 'race' ? IM_BY_RACE : IM_BY_INCOME;
    leChart = makeChart('leChart', leSrc, 'Years', 65);
    imChart = makeChart('imChart', imSrc, 'Deaths per 1,000', 0);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('view').addEventListener('change', e => render(e.target.value));
    render('race');
});
