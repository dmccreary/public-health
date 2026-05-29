// Logic Model Builder
// CANVAS_HEIGHT: 640
let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerWidth;
let containerHeight = canvasHeight;

// Five columns of the standard public-health logic model
const COLUMNS = [
    { key: 'inputs',     label: 'Inputs',                color: [33, 150, 243],  light: [225, 240, 252] },
    { key: 'activities', label: 'Activities',            color: [0, 150, 136],   light: [224, 242, 241] },
    { key: 'outputs',    label: 'Outputs',               color: [76, 175, 80],   light: [232, 245, 233] },
    { key: 'outcomes',   label: 'Short-term Outcomes',   color: [255, 152, 0],   light: [255, 243, 224] },
    { key: 'impact',     label: 'Long-term Impact',      color: [229, 57, 53],   light: [255, 235, 238] }
];

// Cards stored per column. Each card: { id, text }
let cards = [[], [], [], [], []];
// Connections stored as { fromCol, fromId, toCol, toId }
let connections = [];
let nextCardId = 1;

// UI state
let resetBtn, exampleBtn, exportBtn, clearConnBtn;
let selectedCard = null;     // { col, id } currently selected for connecting
let inputModalOpen = false;
let inputModalCol = -1;
let modalText = '';
let exportPanelOpen = false;
let exportText = '';
let hoverCard = null;
let hoverAddBtn = -1;

// Layout constants (computed in draw)
let layout = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Segoe UI');

    resetBtn = createButton('Reset');
    resetBtn.size(90, 30);
    resetBtn.style('background', '#1a3a6c');
    resetBtn.style('color', 'white');
    resetBtn.style('border', 'none');
    resetBtn.style('border-radius', '4px');
    resetBtn.style('cursor', 'pointer');
    resetBtn.style('font-size', '13px');
    resetBtn.mousePressed(resetAll);

    exampleBtn = createButton('Load Example');
    exampleBtn.size(120, 30);
    exampleBtn.style('background', '#2e7d32');
    exampleBtn.style('color', 'white');
    exampleBtn.style('border', 'none');
    exampleBtn.style('border-radius', '4px');
    exampleBtn.style('cursor', 'pointer');
    exampleBtn.style('font-size', '13px');
    exampleBtn.mousePressed(loadExample);

    exportBtn = createButton('Save / Export');
    exportBtn.size(120, 30);
    exportBtn.style('background', '#0277bd');
    exportBtn.style('color', 'white');
    exportBtn.style('border', 'none');
    exportBtn.style('border-radius', '4px');
    exportBtn.style('cursor', 'pointer');
    exportBtn.style('font-size', '13px');
    exportBtn.mousePressed(openExport);

    clearConnBtn = createButton('Clear Connections');
    clearConnBtn.size(150, 30);
    clearConnBtn.style('background', '#757575');
    clearConnBtn.style('color', 'white');
    clearConnBtn.style('border', 'none');
    clearConnBtn.style('border-radius', '4px');
    clearConnBtn.style('cursor', 'pointer');
    clearConnBtn.style('font-size', '13px');
    clearConnBtn.mousePressed(() => { connections = []; selectedCard = null; });

    positionControls();
}

function positionControls() {
    resetBtn.position(20, drawHeight + 20);
    exampleBtn.position(120, drawHeight + 20);
    exportBtn.position(250, drawHeight + 20);
    clearConnBtn.position(380, drawHeight + 20);
}

function draw() {
    background(255);
    computeLayout();
    drawTitle();
    drawColumns();
    drawConnections();
    drawCards();
    drawHelpStrip();
    drawControlsStrip();
    if (inputModalOpen) drawInputModal();
    if (exportPanelOpen) drawExportPanel();
}

function computeLayout() {
    const marginX = 16;
    const titleY = 10;
    const headerH = 50;
    const colTop = 64;
    const usableW = containerWidth - 2 * marginX;
    const gap = 6;
    const colW = (usableW - gap * (COLUMNS.length - 1)) / COLUMNS.length;
    const colH = drawHeight - colTop - 30;
    layout = { marginX, titleY, colTop, colW, colH, gap, headerH };
}

function drawTitle() {
    noStroke();
    fill('#1a3a6c');
    textSize(17);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Logic Model Builder', containerWidth / 2, layout.titleY);
    textStyle(NORMAL);
    fill('#6c757d');
    textSize(11);
    textStyle(ITALIC);
    text('Inputs -> Activities -> Outputs -> Short-term Outcomes -> Long-term Impact',
        containerWidth / 2, layout.titleY + 22);
    textStyle(NORMAL);
}

function drawColumns() {
    const { marginX, colTop, colW, colH, gap, headerH } = layout;
    for (let i = 0; i < COLUMNS.length; i++) {
        const x = marginX + i * (colW + gap);
        const c = COLUMNS[i];

        // Column background
        noStroke();
        fill(c.light[0], c.light[1], c.light[2]);
        rect(x, colTop, colW, colH, 6);

        // Header bar
        fill(c.color[0], c.color[1], c.color[2]);
        rect(x, colTop, colW, headerH, 6, 6, 0, 0);

        // Header label
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(BOLD);
        text(c.label, x + colW / 2, colTop + headerH / 2 - 6);
        textStyle(NORMAL);
        textSize(10);
        text('(' + cards[i].length + ' card' + (cards[i].length === 1 ? '' : 's') + ')',
            x + colW / 2, colTop + headerH - 12);

        // "+ Add" button at bottom of column header
        const btnY = colTop + colH - 32;
        const btnX = x + 10;
        const btnW = colW - 20;
        const btnH = 24;
        const isHover = (mouseX >= btnX && mouseX <= btnX + btnW &&
                         mouseY >= btnY && mouseY <= btnY + btnH);
        hoverAddBtn = isHover ? i : (hoverAddBtn === i ? -1 : hoverAddBtn);
        noStroke();
        fill(255, 255, 255, isHover ? 255 : 220);
        stroke(c.color[0], c.color[1], c.color[2]);
        strokeWeight(isHover ? 2 : 1);
        rect(btnX, btnY, btnW, btnH, 4);
        noStroke();
        fill(c.color[0], c.color[1], c.color[2]);
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text('+ Add', x + colW / 2, btnY + btnH / 2);
        textStyle(NORMAL);

        // Arrow to next column
        if (i < COLUMNS.length - 1) {
            const ax = x + colW + 1;
            const ay = colTop + headerH / 2;
            stroke('#90a4ae');
            strokeWeight(2);
            line(ax, ay, ax + gap + 2, ay);
            noStroke();
            fill('#90a4ae');
            triangle(ax + gap + 4, ay, ax + gap - 2, ay - 4, ax + gap - 2, ay + 4);
        }
    }
}

function drawCards() {
    const { marginX, colTop, colW, gap, headerH } = layout;
    hoverCard = null;
    for (let i = 0; i < COLUMNS.length; i++) {
        const x = marginX + i * (colW + gap);
        const c = COLUMNS[i];
        const cardYStart = colTop + headerH + 8;
        const cardW = colW - 12;
        const cardX = x + 6;
        const cardH = 44;
        const cardGap = 6;
        for (let j = 0; j < cards[i].length; j++) {
            const card = cards[i][j];
            const cy = cardYStart + j * (cardH + cardGap);
            const isSel = selectedCard && selectedCard.col === i && selectedCard.id === card.id;
            const isHover = (mouseX >= cardX && mouseX <= cardX + cardW &&
                             mouseY >= cy && mouseY <= cy + cardH);
            if (isHover) hoverCard = { col: i, id: card.id };

            // Card body
            noStroke();
            fill(255);
            rect(cardX, cy, cardW, cardH, 4);

            // Left color stripe
            fill(c.color[0], c.color[1], c.color[2]);
            rect(cardX, cy, 4, cardH, 4, 0, 0, 4);

            // Selection / hover border
            if (isSel) {
                noFill();
                stroke(255, 193, 7);
                strokeWeight(3);
                rect(cardX, cy, cardW, cardH, 4);
                strokeWeight(1);
                noStroke();
            } else if (isHover) {
                noFill();
                stroke(c.color[0], c.color[1], c.color[2]);
                strokeWeight(2);
                rect(cardX, cy, cardW, cardH, 4);
                strokeWeight(1);
                noStroke();
            } else {
                noFill();
                stroke(220);
                strokeWeight(1);
                rect(cardX, cy, cardW, cardH, 4);
                noStroke();
            }

            // Card text
            fill('#212529');
            textAlign(LEFT, CENTER);
            textSize(11);
            textStyle(NORMAL);
            text(card.text, cardX + 10, cy + cardH / 2 - 2, cardW - 28, cardH - 6);

            // Tiny delete X in top-right
            const dxX = cardX + cardW - 12;
            const dxY = cy + 8;
            const onX = (mouseX >= dxX - 6 && mouseX <= dxX + 6 &&
                         mouseY >= dxY - 6 && mouseY <= dxY + 6);
            fill(onX ? '#c62828' : '#9e9e9e');
            textAlign(CENTER, CENTER);
            textSize(12);
            text('×', dxX, dxY);
            card._delX = dxX;
            card._delY = dxY;
            card._x = cardX;
            card._y = cy;
            card._w = cardW;
            card._h = cardH;
        }
    }
}

function drawConnections() {
    const { headerH } = layout;
    for (const conn of connections) {
        const from = findCard(conn.fromCol, conn.fromId);
        const to = findCard(conn.toCol, conn.toId);
        if (!from || !to) continue;
        const fx = from._x + from._w;
        const fy = from._y + from._h / 2;
        const tx = to._x;
        const ty = to._y + to._h / 2;
        const mx = (fx + tx) / 2;

        stroke(120, 120, 140, 200);
        strokeWeight(2);
        noFill();
        bezier(fx, fy, mx, fy, mx, ty, tx, ty);
        // Arrow head
        noStroke();
        fill(120, 120, 140, 220);
        const ang = atan2(ty - fy, tx - mx);
        push();
        translate(tx - 1, ty);
        rotate(ang);
        triangle(0, 0, -8, -4, -8, 4);
        pop();
    }

    // In-progress connection from selected card to mouse
    if (selectedCard) {
        const from = findCard(selectedCard.col, selectedCard.id);
        if (from) {
            stroke(255, 193, 7, 180);
            strokeWeight(2);
            drawingContext.setLineDash([5, 4]);
            line(from._x + from._w, from._y + from._h / 2, mouseX, mouseY);
            drawingContext.setLineDash([]);
        }
    }
}

function findCard(col, id) {
    if (col < 0 || col >= cards.length) return null;
    return cards[col].find(c => c.id === id) || null;
}

function drawHelpStrip() {
    noStroke();
    fill('#6c757d');
    textSize(10.5);
    textAlign(LEFT, TOP);
    textStyle(ITALIC);
    const msg = selectedCard
        ? 'Click a card in the NEXT column to connect, or click the selected card again to cancel.'
        : 'Click "+ Add" to add a card. Click a card to start a connection. Click × to delete.';
    text(msg, layout.marginX, drawHeight - 18);
    textStyle(NORMAL);
}

function drawControlsStrip() {
    fill(248);
    noStroke();
    rect(0, drawHeight, containerWidth, controlHeight);
    stroke(220);
    line(0, drawHeight, containerWidth, drawHeight);
    noStroke();

    // Color legend (right-aligned, compact)
    const legendLabels = ['Inputs', 'Activities', 'Outputs', 'Outcomes', 'Impact'];
    const legendStartX = 545;
    const legendY = drawHeight + 30;
    fill('#495057');
    textSize(11);
    textAlign(LEFT, TOP);
    text('Color legend:', legendStartX, drawHeight + 14);
    let lx = legendStartX;
    textSize(9.5);
    for (let i = 0; i < COLUMNS.length; i++) {
        const c = COLUMNS[i];
        const lbl = legendLabels[i];
        const lblW = textWidth(lbl);
        if (lx + 16 + lblW > containerWidth - 10) break;
        fill(c.color[0], c.color[1], c.color[2]);
        noStroke();
        rect(lx, legendY, 10, 10, 2);
        fill('#495057');
        text(lbl, lx + 14, legendY);
        lx += 16 + lblW + 8;
    }

    fill('#6c757d');
    textSize(10);
    textStyle(ITALIC);
    text('Build your logic model left to right. A program\'s theory of change connects what you put in to the impact you achieve.',
        20, drawHeight + 60);
    textStyle(NORMAL);
}

function drawInputModal() {
    // Dim background
    fill(0, 0, 0, 120);
    noStroke();
    rect(0, 0, containerWidth, containerHeight);

    const mw = min(420, containerWidth - 40);
    const mh = 180;
    const mx = (containerWidth - mw) / 2;
    const my = (drawHeight - mh) / 2;

    // Modal box
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(mx, my, mw, mh, 8);
    noStroke();

    // Header
    const c = COLUMNS[inputModalCol];
    fill(c.color[0], c.color[1], c.color[2]);
    rect(mx, my, mw, 36, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text('Add ' + c.label + ' Card', mx + 14, my + 18);
    textStyle(NORMAL);

    // Prompt
    fill('#495057');
    textAlign(LEFT, TOP);
    textSize(11);
    text('Type your entry, then press Enter to add or Esc to cancel:', mx + 14, my + 48);

    // Text input box
    fill('#f8f9fa');
    stroke(c.color[0], c.color[1], c.color[2]);
    strokeWeight(2);
    rect(mx + 14, my + 72, mw - 28, 40, 4);
    noStroke();
    fill('#212529');
    textAlign(LEFT, CENTER);
    textSize(12);
    const display = modalText + (frameCount % 60 < 30 ? '|' : '');
    text(display, mx + 22, my + 92, mw - 44);

    // Buttons (drawn — handled by mousePressed)
    const addBtnX = mx + mw - 100;
    const cancelBtnX = mx + mw - 190;
    const btnY = my + mh - 40;
    const btnW = 80;
    const btnH = 28;

    // Cancel
    fill('#e0e0e0');
    rect(cancelBtnX, btnY, btnW, btnH, 4);
    fill('#495057');
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Cancel', cancelBtnX + btnW / 2, btnY + btnH / 2);

    // Add
    fill(c.color[0], c.color[1], c.color[2]);
    rect(addBtnX, btnY, btnW, btnH, 4);
    fill(255);
    textStyle(BOLD);
    text('Add', addBtnX + btnW / 2, btnY + btnH / 2);
    textStyle(NORMAL);

    // Store hit zones for mousePressed
    layout.modal = { mx, my, mw, mh, addBtnX, cancelBtnX, btnY, btnW, btnH };
}

function drawExportPanel() {
    fill(0, 0, 0, 140);
    noStroke();
    rect(0, 0, containerWidth, containerHeight);

    const pw = min(560, containerWidth - 40);
    const ph = min(380, drawHeight - 40);
    const px = (containerWidth - pw) / 2;
    const py = (drawHeight - ph) / 2;

    fill(255);
    stroke(200);
    rect(px, py, pw, ph, 8);
    noStroke();

    fill('#1a3a6c');
    rect(px, py, pw, 36, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text('Logic Model Summary', px + 14, py + 18);
    textStyle(NORMAL);

    // Body text area
    fill('#f8f9fa');
    stroke(220);
    rect(px + 14, py + 50, pw - 28, ph - 100, 4);
    noStroke();

    fill('#212529');
    textAlign(LEFT, TOP);
    textSize(11);
    text(exportText, px + 22, py + 58, pw - 44, ph - 116);

    // Close button
    const cbx = px + pw - 90;
    const cby = py + ph - 40;
    fill('#1a3a6c');
    rect(cbx, cby, 76, 28, 4);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('Close', cbx + 38, cby + 14);
    textStyle(NORMAL);

    layout.exportPanel = { cbx, cby };
}

function mousePressed() {
    // Modal handling
    if (inputModalOpen && layout.modal) {
        const m = layout.modal;
        if (mouseX >= m.addBtnX && mouseX <= m.addBtnX + m.btnW &&
            mouseY >= m.btnY && mouseY <= m.btnY + m.btnH) {
            commitModalCard();
            return;
        }
        if (mouseX >= m.cancelBtnX && mouseX <= m.cancelBtnX + m.btnW &&
            mouseY >= m.btnY && mouseY <= m.btnY + m.btnH) {
            inputModalOpen = false;
            modalText = '';
            return;
        }
        return; // swallow other clicks while modal open
    }

    // Export panel
    if (exportPanelOpen && layout.exportPanel) {
        const e = layout.exportPanel;
        if (mouseX >= e.cbx && mouseX <= e.cbx + 76 &&
            mouseY >= e.cby && mouseY <= e.cby + 28) {
            exportPanelOpen = false;
            return;
        }
        return;
    }

    // Check Add buttons
    const { marginX, colTop, colW, colH, gap } = layout;
    for (let i = 0; i < COLUMNS.length; i++) {
        const x = marginX + i * (colW + gap);
        const btnY = colTop + colH - 32;
        const btnX = x + 10;
        const btnW = colW - 20;
        const btnH = 24;
        if (mouseX >= btnX && mouseX <= btnX + btnW &&
            mouseY >= btnY && mouseY <= btnY + btnH) {
            openAddModal(i);
            return;
        }
    }

    // Check card delete
    for (let i = 0; i < COLUMNS.length; i++) {
        for (let j = cards[i].length - 1; j >= 0; j--) {
            const card = cards[i][j];
            if (card._delX !== undefined &&
                mouseX >= card._delX - 8 && mouseX <= card._delX + 8 &&
                mouseY >= card._delY - 8 && mouseY <= card._delY + 8) {
                deleteCard(i, card.id);
                return;
            }
        }
    }

    // Check card click for selection / connection
    for (let i = 0; i < COLUMNS.length; i++) {
        for (const card of cards[i]) {
            if (card._x !== undefined &&
                mouseX >= card._x && mouseX <= card._x + card._w &&
                mouseY >= card._y && mouseY <= card._y + card._h) {
                handleCardClick(i, card.id);
                return;
            }
        }
    }

    // Click on empty area cancels selection
    selectedCard = null;
}

function handleCardClick(col, id) {
    if (!selectedCard) {
        selectedCard = { col, id };
        return;
    }
    if (selectedCard.col === col && selectedCard.id === id) {
        selectedCard = null;
        return;
    }
    // Must connect to next column (left-to-right flow)
    if (col === selectedCard.col + 1) {
        // Avoid duplicate
        const dup = connections.some(c =>
            c.fromCol === selectedCard.col && c.fromId === selectedCard.id &&
            c.toCol === col && c.toId === id);
        if (!dup) {
            connections.push({
                fromCol: selectedCard.col, fromId: selectedCard.id,
                toCol: col, toId: id
            });
        }
        selectedCard = null;
    } else {
        // Switch selection
        selectedCard = { col, id };
    }
}

function openAddModal(col) {
    inputModalOpen = true;
    inputModalCol = col;
    modalText = '';
}

function commitModalCard() {
    const t = modalText.trim();
    if (t.length > 0) {
        cards[inputModalCol].push({ id: nextCardId++, text: t });
    }
    inputModalOpen = false;
    modalText = '';
}

function deleteCard(col, id) {
    cards[col] = cards[col].filter(c => c.id !== id);
    connections = connections.filter(c =>
        !(c.fromCol === col && c.fromId === id) &&
        !(c.toCol === col && c.toId === id));
    if (selectedCard && selectedCard.col === col && selectedCard.id === id) {
        selectedCard = null;
    }
}

function keyPressed() {
    if (inputModalOpen) {
        if (keyCode === ENTER || keyCode === RETURN) {
            commitModalCard();
            return false;
        }
        if (keyCode === ESCAPE) {
            inputModalOpen = false;
            modalText = '';
            return false;
        }
        if (keyCode === BACKSPACE) {
            modalText = modalText.slice(0, -1);
            return false;
        }
        if (key && key.length === 1 && modalText.length < 80) {
            modalText += key;
            return false;
        }
    }
    if (exportPanelOpen && keyCode === ESCAPE) {
        exportPanelOpen = false;
        return false;
    }
}

function openExport() {
    let lines = ['LOGIC MODEL SUMMARY', '===================', ''];
    for (let i = 0; i < COLUMNS.length; i++) {
        lines.push(COLUMNS[i].label.toUpperCase() + ':');
        if (cards[i].length === 0) {
            lines.push('  (none)');
        } else {
            for (const card of cards[i]) {
                lines.push('  - ' + card.text);
            }
        }
        lines.push('');
    }
    if (connections.length > 0) {
        lines.push('CONNECTIONS:');
        for (const c of connections) {
            const from = findCard(c.fromCol, c.fromId);
            const to = findCard(c.toCol, c.toId);
            if (from && to) {
                lines.push('  ' + from.text + '  ->  ' + to.text);
            }
        }
    }
    exportText = lines.join('\n');
    exportPanelOpen = true;
}

function resetAll() {
    cards = [[], [], [], [], []];
    connections = [];
    selectedCard = null;
    nextCardId = 1;
    inputModalOpen = false;
    exportPanelOpen = false;
    modalText = '';
}

function loadExample() {
    // Community Health Education Program: diabetes prevention
    resetAll();
    const exampleInputs = ['CDC funding ($250K)', 'Health educators (3 FTE)', 'Community center space'];
    const exampleActivities = ['Weekly nutrition classes', 'Walking group sessions', 'Cooking demonstrations'];
    const exampleOutputs = ['180 participants enrolled', '24 classes delivered', '4 cohorts completed'];
    const exampleOutcomes = ['Improved nutrition knowledge', 'Increased physical activity', 'Healthier food choices'];
    const exampleImpact = ['Lower diabetes incidence', 'Reduced health disparities'];

    const idsByCol = [[], [], [], [], []];
    const colData = [exampleInputs, exampleActivities, exampleOutputs, exampleOutcomes, exampleImpact];
    for (let i = 0; i < 5; i++) {
        for (const t of colData[i]) {
            const id = nextCardId++;
            cards[i].push({ id, text: t });
            idsByCol[i].push(id);
        }
    }
    // Wire a few illustrative connections
    connections.push({ fromCol: 0, fromId: idsByCol[0][0], toCol: 1, toId: idsByCol[1][0] });
    connections.push({ fromCol: 0, fromId: idsByCol[0][1], toCol: 1, toId: idsByCol[1][1] });
    connections.push({ fromCol: 1, fromId: idsByCol[1][0], toCol: 2, toId: idsByCol[2][0] });
    connections.push({ fromCol: 1, fromId: idsByCol[1][1], toCol: 2, toId: idsByCol[2][1] });
    connections.push({ fromCol: 2, fromId: idsByCol[2][0], toCol: 3, toId: idsByCol[3][0] });
    connections.push({ fromCol: 2, fromId: idsByCol[2][1], toCol: 3, toId: idsByCol[3][1] });
    connections.push({ fromCol: 3, fromId: idsByCol[3][0], toCol: 4, toId: idsByCol[4][0] });
    connections.push({ fromCol: 3, fromId: idsByCol[3][1], toCol: 4, toId: idsByCol[4][0] });
    connections.push({ fromCol: 3, fromId: idsByCol[3][2], toCol: 4, toId: idsByCol[4][1] });
}

function updateCanvasSize() {
    const el = document.querySelector('main');
    containerWidth = (el && el.offsetWidth) ? el.offsetWidth : canvasWidth;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    positionControls();
}
