// Global Burden of Disease by Cause and Income Group (Chart.js)
// CANVAS_HEIGHT: 505

// Color scheme per spec: communicable = orange, NCD = blue, injuries = green.
const COLORS = {
    'Communicable, maternal, neonatal & nutritional': '#E69F00', // orange
    'Non-communicable diseases': '#0072B2',                       // blue
    'Injuries': '#009E73'                                          // green
};

// Cause categories (order = legend order, stack order).
const CAUSES = [
    'Communicable, maternal, neonatal & nutritional',
    'Non-communicable diseases',
    'Injuries'
];

// ---------------------------------------------------------------------------
// Illustrative GBD-2021-style estimates.
// Values are approximate, for educational use only — patterns reflect the
// well-established epidemiological transition (CMNN dominant in low-income;
// NCDs dominant in high-income).
//
// "absolute" = total DALYs in millions for the group's population
// "rate"     = age-standardized DALYs per 100,000 population
// ---------------------------------------------------------------------------
const DATA = {
    income: {
        absolute: {
            'Low income':           [180,  90,  35],
            'Lower-middle income':  [260, 380,  95],
            'Upper-middle income':  [110, 620, 110],
            'High income':          [ 25, 310,  35]
        },
        rate: {
            'Low income':           [28000,  21000, 5500],
            'Lower-middle income':  [12000,  24000, 4200],
            'Upper-middle income':  [ 3800,  23000, 3200],
            'High income':          [ 1400,  18000, 2100]
        }
    },
    region: {
        absolute: {
            'Africa':                 [220, 175,  55],
            'Eastern Mediterranean':  [ 75, 135,  35],
            'South-East Asia':        [140, 380,  90],
            'Western Pacific':        [ 50, 420,  70],
            'Americas':               [ 40, 240,  60],
            'Europe':                 [ 25, 280,  40]
        },
        rate: {
            'Africa':                 [24000, 22000, 5400],
            'Eastern Mediterranean':  [ 8500, 22000, 4400],
            'South-East Asia':        [ 6500, 23500, 3800],
            'Western Pacific':        [ 2200, 21000, 3200],
            'Americas':               [ 2000, 20000, 3500],
            'Europe':                 [ 1100, 18500, 2400]
        }
    }
};

// Global averages (per 100,000) and totals (millions) used for reference line.
const GLOBAL_AVG = {
    absolute: 250, // illustrative average DALYs (millions) per group bar
    rate:     22000 // global age-standardized DALY rate per 100,000 (approx)
};

// ---------------------------------------------------------------------------
// One-sentence interpretations keyed by grouping + cause.
// These are shown in the lower panel when a bar segment is hovered.
// ---------------------------------------------------------------------------
const INTERPRETATIONS = {
    income: {
        'Communicable, maternal, neonatal & nutritional': {
            'Low income':          'Infectious and maternal/child causes still dominate in low-income countries — the unfinished agenda of the epidemiological transition.',
            'Lower-middle income': 'A heavy CMNN burden coexists with rising NCDs — the textbook "double burden" of disease.',
            'Upper-middle income': 'CMNN burden is shrinking but persistent pockets remain, especially in rural and marginalized populations.',
            'High income':         'CMNN burden is small in absolute terms but never zero — concentrated among the elderly, immigrants, and the poor.'
        },
        'Non-communicable diseases': {
            'Low income':          'NCDs are already a large share even in low-income settings — they are no longer "diseases of affluence".',
            'Lower-middle income': 'NCDs have overtaken CMNN as the leading cause — a tipping point in the epidemiological transition.',
            'Upper-middle income': 'NCDs dominate the burden; cardiovascular disease, cancer and diabetes drive most DALYs.',
            'High income':         'Nearly all DALYs come from NCDs; reducing them requires upstream prevention, not just better treatment.'
        },
        'Injuries': {
            'Low income':          'Road traffic, drowning, and conflict-related injuries hit young workers hardest in low-income settings.',
            'Lower-middle income': 'Road traffic deaths peak here as motorization outpaces road safety regulation.',
            'Upper-middle income': 'Injury burden remains stubborn — self-harm and road traffic are the largest contributors.',
            'High income':         'Injuries are a smaller share, but self-harm, opioid overdose, and falls drive the remainder.'
        }
    },
    region: {
        'Communicable, maternal, neonatal & nutritional': {
            'Africa':                'Africa carries the highest CMNN burden globally — HIV, TB, malaria, and child malnutrition still drive most loss of healthy life.',
            'Eastern Mediterranean': 'Conflict and displacement amplify infectious and maternal/child burdens across the Eastern Mediterranean region.',
            'South-East Asia':       'High CMNN burden reflects population size and persistent TB, lower respiratory infections, and neonatal conditions.',
            'Western Pacific':       'CMNN burden has fallen sharply; remaining burden is concentrated in lower-income Pacific island states.',
            'Americas':              'CMNN burden is relatively low but concentrated among Indigenous, rural and marginalized populations.',
            'Europe':                'CMNN burden is small overall; HIV and TB persist mainly in Eastern Europe and Central Asia.'
        },
        'Non-communicable diseases': {
            'Africa':                'NCDs are rising fast in Africa — a second epidemic layering onto the unfinished infectious-disease agenda.',
            'Eastern Mediterranean': 'Cardiovascular disease and diabetes drive NCD burden; tobacco and diet are major upstream drivers.',
            'South-East Asia':       'NCDs are now the dominant cause of DALYs in South-East Asia — heart disease, stroke, and diabetes lead.',
            'Western Pacific':       'NCDs make up the bulk of regional DALYs, with cardiovascular disease and cancer at the top.',
            'Americas':              'NCDs dominate the burden; cardiovascular disease, mental disorders, and cancers are leading causes.',
            'Europe':                'NCDs are overwhelmingly dominant; cardiovascular disease alone accounts for the largest share.'
        },
        'Injuries': {
            'Africa':                'Road traffic and conflict-related injuries are major contributors; young adult males are most affected.',
            'Eastern Mediterranean': 'Conflict drives an outsized share of injury DALYs in this region — preventable through political solutions.',
            'South-East Asia':       'Road traffic injuries lead; rapid motorization without commensurate safety infrastructure is the main driver.',
            'Western Pacific':       'Self-harm and road traffic are the leading injury causes; suicide rates vary widely by country.',
            'Americas':              'Interpersonal violence and road traffic together drive injury burden in the Americas.',
            'Europe':                'Self-harm and road traffic dominate; alcohol is a major modifiable risk factor.'
        }
    }
};

// ---------------------------------------------------------------------------
// State + chart object
// ---------------------------------------------------------------------------
let state = {
    grouping: 'income',  // 'income' | 'region'
    metric:   'absolute', // 'absolute' | 'rate'
    showAvg:  true
};
let gbdChart = null;

function metricLabel() {
    return state.metric === 'absolute'
        ? 'DALYs (millions)'
        : 'Age-standardized DALYs per 100,000';
}

function buildDatasets() {
    const groupData = DATA[state.grouping][state.metric];
    const groupLabels = Object.keys(groupData);
    // datasets: one per cause; data array indexed by group
    const datasets = CAUSES.map((cause, ci) => ({
        label: cause,
        data: groupLabels.map(g => groupData[g][ci]),
        backgroundColor: COLORS[cause],
        borderColor: COLORS[cause],
        borderWidth: 1,
        stack: 'burden'
    }));
    return { labels: groupLabels, datasets };
}

function buildAnnotations() {
    if (!state.showAvg) return {};
    return {
        avgLine: {
            type: 'line',
            xMin: GLOBAL_AVG[state.metric],
            xMax: GLOBAL_AVG[state.metric],
            borderColor: '#cc3333',
            borderWidth: 2,
            borderDash: [6, 4],
            label: {
                display: true,
                content: 'Global avg',
                position: 'start',
                backgroundColor: 'rgba(204,51,51,0.85)',
                color: '#fff',
                font: { size: 10 },
                padding: 3
            }
        }
    };
}

function tooltipLabel(ctx) {
    const cause = ctx.dataset.label;
    const group = ctx.label;
    const val = ctx.parsed.x;
    // Compute percentage of this group's total
    const groupData = DATA[state.grouping][state.metric][group];
    const total = groupData.reduce((a, b) => a + b, 0);
    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
    const valStr = state.metric === 'absolute'
        ? `${val} million DALYs`
        : `${val.toLocaleString()} DALYs / 100,000`;
    return ` ${cause}: ${valStr} (${pct}% of ${group})`;
}

function updateInterpretation(group, cause) {
    const text = (INTERPRETATIONS[state.grouping][cause] || {})[group];
    const el = document.getElementById('interpretation');
    if (text) {
        el.innerHTML = `<strong>${group} &middot; ${cause}:</strong> ${text}`;
    } else {
        el.innerHTML = 'Hover any bar to see details and an interpretation.';
    }
}

function render() {
    const { labels, datasets } = buildDatasets();
    if (gbdChart) gbdChart.destroy();
    const ctx = document.getElementById('gbdChart').getContext('2d');
    gbdChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'nearest', intersect: true },
            scales: {
                x: {
                    stacked: true,
                    title: { display: true, text: metricLabel(), font: { size: 12 } },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    stacked: true,
                    title: { display: true, text: state.grouping === 'income' ? 'World Bank income group' : 'WHO region', font: { size: 12 } },
                    ticks: { font: { size: 11 } }
                }
            },
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                tooltip: {
                    callbacks: { label: tooltipLabel }
                },
                annotation: { annotations: buildAnnotations() }
            },
            onHover: (event, elements) => {
                if (elements.length > 0) {
                    const el = elements[0];
                    const ds = gbdChart.data.datasets[el.datasetIndex];
                    const group = gbdChart.data.labels[el.index];
                    updateInterpretation(group, ds.label);
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Register annotation plugin (loaded via CDN as global)
    if (typeof window !== 'undefined' && window['chartjs-plugin-annotation']) {
        Chart.register(window['chartjs-plugin-annotation']);
    }

    document.getElementById('metric').addEventListener('change', e => {
        state.metric = e.target.value;
        render();
    });
    document.querySelectorAll('input[name="grouping"]').forEach(r => {
        r.addEventListener('change', e => {
            if (e.target.checked) {
                state.grouping = e.target.value;
                render();
            }
        });
    });
    document.getElementById('avgline').addEventListener('change', e => {
        state.showAvg = e.target.checked;
        render();
    });

    render();
});
