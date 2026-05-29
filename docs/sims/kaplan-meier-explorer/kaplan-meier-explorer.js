// Kaplan-Meier Survival Curve Explorer
// CANVAS_HEIGHT: 590
// Simulates two-group survival, draws KM step functions with optional CI band,
// computes log-rank χ² and p-value.

const MAX_T = 72; // months follow-up window
const TEAL = '#26a69a';
const ORANGE = '#ef6c00';

// ---- Statistical helpers ----------------------------------------------------
function expSample(rate) {
    let u = Math.random();
    while (u === 0) u = Math.random();
    return -Math.log(u) / rate;
}
// standard normal CDF
function normCdf(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
}
// p-value for chi-square with 1 d.f.
function chi2_1df_p(chi2) {
    if (chi2 <= 0) return 1.0;
    return 2 * (1 - normCdf(Math.sqrt(chi2)));
}

// ---- Data simulation --------------------------------------------------------
function simulateGroup(n, medianMonths, censorRate) {
    const rate = Math.LN2 / medianMonths;
    const obs = [];
    for (let i = 0; i < n; i++) {
        const t = expSample(rate);
        let time = Math.min(t, MAX_T);
        let event = time < MAX_T ? 1 : 0;
        // independent random censoring before MAX_T
        if (event === 1 && Math.random() < censorRate) {
            time = Math.random() * time;
            event = 0;
        }
        obs.push({ time: time, event: event });
    }
    obs.sort((a, b) => a.time - b.time);
    return obs;
}

// Kaplan-Meier step-function estimate, returning {t:[], s:[], lo:[], hi:[], events:[], atRisk:[]}
function kmCurve(obs) {
    const times = [0];
    const surv = [1];
    const lo = [1], hi = [1];
    const eventsArr = [0];
    const atRiskArr = [obs.length];
    let n = obs.length;
    let s = 1;
    // sum for Greenwood variance
    let gw = 0;
    // process unique event times
    let i = 0;
    while (i < obs.length) {
        const t = obs[i].time;
        let d = 0, c = 0;
        let j = i;
        while (j < obs.length && obs[j].time === t) {
            if (obs[j].event === 1) d++; else c++;
            j++;
        }
        if (d > 0) {
            const r = n;
            s = s * (1 - d / r);
            gw += d / (r * (r - d));
            const se = s * Math.sqrt(gw);
            times.push(t);
            surv.push(s);
            lo.push(Math.max(0, s - 1.96 * se));
            hi.push(Math.min(1, s + 1.96 * se));
            eventsArr.push(d);
            atRiskArr.push(r);
        }
        n -= (d + c);
        i = j;
    }
    // append final point at MAX_T to extend curve
    times.push(MAX_T);
    surv.push(s);
    lo.push(lo[lo.length - 1]);
    hi.push(hi[hi.length - 1]);
    eventsArr.push(0);
    atRiskArr.push(Math.max(0, n));
    return { times, surv, lo, hi, events: eventsArr, atRisk: atRiskArr };
}

// median survival from KM curve (first time s ≤ 0.5)
function medianFromKM(km) {
    for (let k = 0; k < km.surv.length; k++) {
        if (km.surv[k] <= 0.5) return km.times[k];
    }
    return null;
}
function medianCIFromKM(km) {
    // Median-survival CI: earliest time the LOWER CI band hits 0.5 is the lower
    // bound; earliest time the UPPER CI band hits 0.5 is the upper bound.
    let lo = null, hi = null;
    for (let k = 0; k < km.surv.length; k++) {
        if (km.lo[k] <= 0.5 && lo === null) lo = km.times[k];
        if (km.hi[k] <= 0.5 && hi === null) hi = km.times[k];
    }
    return [lo, hi];
}

// Log-rank test from two groups of observations
function logRank(obsA, obsB) {
    const all = [...obsA.map(o => ({...o, g: 0})), ...obsB.map(o => ({...o, g: 1}))];
    all.sort((a, b) => a.time - b.time);
    let nA = obsA.length, nB = obsB.length;
    let O_minus_E = 0, V = 0;
    let i = 0;
    while (i < all.length) {
        const t = all[i].time;
        let dA = 0, dB = 0, cA = 0, cB = 0;
        let j = i;
        while (j < all.length && all[j].time === t) {
            if (all[j].g === 0) {
                if (all[j].event === 1) dA++; else cA++;
            } else {
                if (all[j].event === 1) dB++; else cB++;
            }
            j++;
        }
        const d = dA + dB;
        const n = nA + nB;
        if (d > 0 && nA > 0 && nB > 0 && n > 1) {
            const eA = d * nA / n;
            O_minus_E += (dA - eA);
            V += (d * (n - d) * nA * nB) / (n * n * (n - 1));
        }
        nA -= (dA + cA);
        nB -= (dB + cB);
        i = j;
    }
    const chi2 = V > 0 ? (O_minus_E * O_minus_E) / V : 0;
    return { chi2, p: chi2_1df_p(chi2) };
}

// Convert KM result to a Chart.js stepped line dataset (x:t, y:s)
function stepPoints(km) {
    return km.times.map((t, i) => ({ x: t, y: km.surv[i] }));
}
function bandPoints(km, key) {
    return km.times.map((t, i) => ({ x: t, y: km[key][i] }));
}

// censored ticks: positions where survival doesn't change but obs.event === 0
function censorTicks(obs, km) {
    const ticks = [];
    obs.forEach(o => {
        if (o.event === 0) ticks.push({ x: o.time, y: kmAt(km, o.time) });
    });
    return ticks;
}
function kmAt(km, t) {
    let s = 1;
    for (let i = 0; i < km.times.length; i++) {
        if (km.times[i] <= t) s = km.surv[i]; else break;
    }
    return s;
}

// ---- Render -----------------------------------------------------------------
let chart = null;

function draw() {
    const n = parseInt(document.getElementById('nSize').value, 10);
    const mA = parseInt(document.getElementById('medA').value, 10);
    const mB = parseInt(document.getElementById('medB').value, 10);
    const censor = parseInt(document.getElementById('cens').value, 10) / 100;
    const showCI = document.getElementById('showCI').checked;

    document.getElementById('vMedA').textContent = mA;
    document.getElementById('vMedB').textContent = mB;
    document.getElementById('vCens').textContent = (censor*100).toFixed(0) + '%';

    const obsA = simulateGroup(n, mA, censor);
    const obsB = simulateGroup(n, mB, censor);
    const kmA = kmCurve(obsA);
    const kmB = kmCurve(obsB);
    const lr = logRank(obsA, obsB);

    const medA = medianFromKM(kmA);
    const medB = medianFromKM(kmB);
    const ciA = medianCIFromKM(kmA);
    const ciB = medianCIFromKM(kmB);

    document.getElementById('oMedA').textContent = medA !== null ? medA.toFixed(1) : '—';
    document.getElementById('oMedB').textContent = medB !== null ? medB.toFixed(1) : '—';
    document.getElementById('oMedACI').textContent = ciA[0] !== null && ciA[1] !== null ?
        `${ciA[0].toFixed(1)}–${ciA[1].toFixed(1)}` : '—';
    document.getElementById('oMedBCI').textContent = ciB[0] !== null && ciB[1] !== null ?
        `${ciB[0].toFixed(1)}–${ciB[1].toFixed(1)}` : '—';
    document.getElementById('oChi').textContent = lr.chi2.toFixed(2);
    document.getElementById('oP').textContent = lr.p < 0.001 ? '<0.001' : lr.p.toFixed(3);
    document.getElementById('oInterp').textContent = lr.p < 0.05 ?
        '— Groups differ significantly.' : '— No significant difference detected.';

    const datasets = [];
    if (showCI) {
        datasets.push({
            label: 'A 95% CI', data: bandPoints(kmA, 'hi'),
            borderColor: 'transparent', backgroundColor: 'rgba(38,166,154,0.15)',
            fill: '+1', pointRadius: 0, stepped: 'after', order: 5
        });
        datasets.push({
            label: 'A CI lo', data: bandPoints(kmA, 'lo'),
            borderColor: 'transparent', pointRadius: 0, stepped: 'after', order: 5
        });
        datasets.push({
            label: 'B 95% CI', data: bandPoints(kmB, 'hi'),
            borderColor: 'transparent', backgroundColor: 'rgba(239,108,0,0.15)',
            fill: '+1', pointRadius: 0, stepped: 'after', order: 5
        });
        datasets.push({
            label: 'B CI lo', data: bandPoints(kmB, 'lo'),
            borderColor: 'transparent', pointRadius: 0, stepped: 'after', order: 5
        });
    }
    datasets.push({
        label: 'Group A', data: stepPoints(kmA),
        borderColor: TEAL, backgroundColor: TEAL,
        borderWidth: 2, pointRadius: 0, stepped: 'after', order: 1
    });
    datasets.push({
        label: 'Group B', data: stepPoints(kmB),
        borderColor: ORANGE, backgroundColor: ORANGE,
        borderWidth: 2, pointRadius: 0, stepped: 'after', order: 1
    });
    // censor ticks
    datasets.push({
        label: 'A censored', data: censorTicks(obsA, kmA),
        borderColor: TEAL, backgroundColor: TEAL,
        showLine: false, pointStyle: 'crossRot', pointRadius: 5, pointBorderWidth: 2, order: 0
    });
    datasets.push({
        label: 'B censored', data: censorTicks(obsB, kmB),
        borderColor: ORANGE, backgroundColor: ORANGE,
        showLine: false, pointStyle: 'crossRot', pointRadius: 5, pointBorderWidth: 2, order: 0
    });

    if (chart) chart.destroy();
    const ctx = document.getElementById('kmChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            parsing: false,
            scales: {
                x: { type: 'linear', min: 0, max: MAX_T,
                     title: { display: true, text: 'Time (months)' } },
                y: { min: 0, max: 1.02,
                     title: { display: true, text: 'Survival probability' },
                     ticks: { stepSize: 0.2 } }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 14, font: { size: 11 },
                        filter: item => item.text === 'Group A' || item.text === 'Group B'
                    }
                },
                tooltip: {
                    filter: c => c.dataset.label === 'Group A' || c.dataset.label === 'Group B',
                    callbacks: {
                        label: c => `${c.dataset.label} @ t=${c.parsed.x.toFixed(1)}mo: S=${c.parsed.y.toFixed(3)}`
                    }
                }
            }
        },
        plugins: [{
            id: 'medianLine',
            afterDatasetsDraw(chart) {
                const ctx = chart.ctx;
                const yPx = chart.scales.y.getPixelForValue(0.5);
                const left = chart.chartArea.left, right = chart.chartArea.right;
                ctx.save();
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath(); ctx.moveTo(left, yPx); ctx.lineTo(right, yPx); ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = '#666';
                ctx.font = '10px sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('Median (S=0.5)', left + 4, yPx - 2);
                // drop verticals to medians
                [['A', medA, TEAL], ['B', medB, ORANGE]].forEach(([_, m, color]) => {
                    if (m === null) return;
                    const xPx = chart.scales.x.getPixelForValue(m);
                    ctx.strokeStyle = color;
                    ctx.setLineDash([3, 3]);
                    ctx.beginPath();
                    ctx.moveTo(xPx, yPx);
                    ctx.lineTo(xPx, chart.chartArea.bottom);
                    ctx.stroke();
                    ctx.setLineDash([]);
                });
                ctx.restore();
            }
        }]
    });
}

document.addEventListener('DOMContentLoaded', () => {
    ['medA','medB','cens'].forEach(id => {
        document.getElementById(id).addEventListener('input', draw);
    });
    document.getElementById('nSize').addEventListener('change', draw);
    document.getElementById('showCI').addEventListener('change', draw);
    document.getElementById('redraw').addEventListener('click', draw);
    draw();
});
