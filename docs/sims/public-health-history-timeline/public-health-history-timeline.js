// Key Milestones in Public Health History
// CANVAS_HEIGHT: 460

function eraFor(year) {
    if (year < 1870) return 'era-san';
    if (year < 1930) return 'era-germ';
    if (year < 1980) return 'era-inst';
    return 'era-evid';
}

const MILESTONES = [
    { year: 1796, label: 'Jenner smallpox vaccine', cat: 'Vaccines',
      desc: 'Edward Jenner inoculates James Phipps with cowpox material, demonstrating that prior exposure to a related agent protects against smallpox. First scientific proof of vaccination.' },
    { year: 1842, label: 'Chadwick Sanitary Report (UK)', cat: 'Sanitation',
      desc: 'Edwin Chadwick links poor sanitation to disease and economic loss, making the political case for sewerage and clean-water systems. Precursor to modern environmental health.' },
    { year: 1854, label: 'Snow + Broad Street pump', cat: 'Epidemiology',
      desc: 'John Snow maps cholera deaths around the Broad Street pump in Soho, London, and persuades authorities to remove the pump handle. Birth of field epidemiology.' },
    { year: 1864, label: 'Pasteur germ theory', cat: 'Epidemiology',
      desc: 'Louis Pasteur\'s swan-neck flask experiments definitively articulate germ theory, overturning miasma theory of disease.' },
    { year: 1883, label: 'Koch\'s postulates', cat: 'Epidemiology',
      desc: 'Robert Koch publishes four formal criteria for proving a microorganism causes a specific disease. Foundation of clinical microbiology and causal inference for infectious disease.' },
    { year: 1900, label: 'Reed: yellow-fever vector', cat: 'Epidemiology',
      desc: 'Walter Reed\'s commission in Cuba confirms Aedes aegypti mosquito as the vector for yellow fever, making vector-control programs viable.' },
    { year: 1906, label: 'US Pure Food and Drug Act', cat: 'Policy',
      desc: 'First federal food and drug safety law in the United States, establishing government accountability for consumer protection. Predecessor of the FDA.' },
    { year: 1918, label: '1918 influenza pandemic', cat: 'Epidemiology',
      desc: 'H1N1 influenza kills an estimated 50–100 million people worldwide. Largest infectious-disease catastrophe in modern history; exposed enormous gaps in global response capacity.' },
    { year: 1928, label: 'Fleming: penicillin', cat: 'Epidemiology',
      desc: 'Alexander Fleming discovers penicillin\'s antibacterial activity. Beginning of the antibiotic era — shifts disease burden from prevention to treatment.' },
    { year: 1946, label: 'CDC founded', cat: 'Institutions',
      desc: 'The Communicable Disease Center (later CDC) is established in Atlanta to coordinate malaria-control efforts. Centralized epidemiologic capacity in the US.' },
    { year: 1948, label: 'WHO established', cat: 'Institutions',
      desc: 'World Health Organization founded; WHO Constitution defines health as "a state of complete physical, mental and social well-being." Global health governance begins.' },
    { year: 1955, label: 'Salk polio vaccine', cat: 'Vaccines',
      desc: 'Inactivated polio vaccine declared "safe, effective, and potent." Launches one of the most successful vaccine campaigns in history.' },
    { year: 1964, label: 'Surgeon General tobacco report', cat: 'Policy',
      desc: 'US Surgeon General\'s landmark report concludes cigarette smoking causes lung cancer. Modern risk-factor epidemiology applied to lifestyle disease.' },
    { year: 1978, label: 'Alma-Ata "Health for All"', cat: 'Policy',
      desc: 'WHO/UNICEF Declaration of Alma-Ata articulates primary health care as a human right and equity-oriented goal of global health.' },
    { year: 1988, label: 'IOM "Future of Public Health"', cat: 'Institutions',
      desc: 'US Institute of Medicine report defines the three core functions of public health (assessment, policy development, assurance). Foundation of US accreditation.' },
    { year: 2003, label: 'SARS emergence', cat: 'Epidemiology',
      desc: 'First major 21st-century zoonotic outbreak. Accelerated revision of the WHO International Health Regulations (IHR 2005).' }
];

const items = MILESTONES.map((m, i) => ({
    id: i,
    content: m.label,
    start: `${m.year}-01-01`,
    title: `${m.year} — ${m.label}`,
    className: eraFor(m.year),
    cat: m.cat
}));

const container = document.getElementById('tl');
const dataset = new vis.DataSet(items);
const timeline = new vis.Timeline(container, dataset, {
    min: '1750-01-01',
    max: '2015-12-31',
    start: '1750-01-01',
    end: '2015-12-31',
    zoomMin: 1000 * 60 * 60 * 24 * 365 * 5,    // 5 yr
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 300,  // 300 yr
    stack: true,
    margin: { item: 6, axis: 12 },
    orientation: 'top'
});

function showInfo(idx) {
    const m = MILESTONES[idx];
    if (!m) return;
    document.getElementById('panel').innerHTML = `
        <h3>${m.year} — ${m.label}</h3>
        <p>${m.desc}</p>
        <span class="tag">${m.cat}</span>`;
}

timeline.on('select', props => {
    if (props.items.length > 0) showInfo(props.items[0]);
});

document.querySelectorAll('#filters button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        if (cat === 'all') {
            dataset.update(items.map(it => ({ id: it.id, className: eraFor(MILESTONES[it.id].year) })));
        } else {
            dataset.update(items.map(it => ({
                id: it.id,
                className: it.cat === cat ? eraFor(MILESTONES[it.id].year) : 'vis-faded'
            })));
        }
    });
});

// Inject the faded style for filter
const style = document.createElement('style');
style.textContent = `.vis-item.vis-faded { opacity: 0.18; background: #eee; border-color: #ccc; color: #888; }`;
document.head.appendChild(style);
