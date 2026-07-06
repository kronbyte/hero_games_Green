function createKnightSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    for (let f = 0; f < 4; f++) {
        const x = f * 32;
        const cx = x + 16;
        const cy = 16;

        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + 13, 10, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#2c3e50";
        if (f === 0) { ctx.fillRect(cx - 5, cy + 4, 4, 9); ctx.fillRect(cx + 1, cy + 4, 4, 9); }
        else if (f === 1) { ctx.fillRect(cx - 7, cy + 4, 4, 9); ctx.fillRect(cx + 3, cy + 2, 4, 9); }
        else if (f === 2) { ctx.fillRect(cx - 4, cy + 4, 4, 9); ctx.fillRect(cx + 0, cy + 4, 4, 9); }
        else { ctx.fillRect(cx - 3, cy + 2, 4, 9); ctx.fillRect(cx + 3, cy + 4, 4, 9); }

        ctx.fillStyle = "#7f8c8d";
        ctx.fillRect(cx - 7, cy - 6, 14, 12);
        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(cx - 5, cy - 4, 10, 6);
        ctx.fillStyle = "#f1c40f";
        ctx.fillRect(cx - 1, cy - 2, 2, 2);
        ctx.fillStyle = "#8b4513";
        ctx.fillRect(cx - 7, cy + 4, 14, 2);

        ctx.fillStyle = "#7f8c8d";
        if (f === 0) { ctx.fillRect(cx - 10, cy - 4, 3, 8); ctx.fillRect(cx + 7, cy - 4, 3, 8); }
        else if (f === 1) { ctx.fillRect(cx - 10, cy - 2, 3, 8); ctx.fillRect(cx + 7, cy - 6, 3, 8); }
        else if (f === 2) { ctx.fillRect(cx - 10, cy - 4, 3, 8); ctx.fillRect(cx + 7, cy - 4, 3, 8); }
        else { ctx.fillRect(cx - 10, cy - 6, 3, 8); ctx.fillRect(cx + 7, cy - 2, 3, 8); }

        ctx.fillStyle = "#bdc3c7";
        ctx.fillRect(cx + 8, cy - 10, 2, 10);
        ctx.fillStyle = "#f1c40f";
        ctx.fillRect(cx + 6, cy - 2, 6, 2);
        ctx.fillStyle = "#8b4513";
        ctx.fillRect(cx + 7, cy, 2, 4);

        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(cx - 6, cy - 14, 12, 9);
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(cx - 5, cy - 11, 10, 3);
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy - 14);
        ctx.lineTo(cx + 2, cy - 14);
        ctx.lineTo(cx, cy - 20);
        ctx.closePath();
        ctx.fill();
    }

    return canvas.toDataURL();
}

function createSkeletonSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const cx = 16, cy = 16;

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 13, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ecf0f1";
    ctx.fillRect(cx - 5, cy + 4, 3, 9);
    ctx.fillRect(cx + 2, cy + 4, 3, 9);
    ctx.fillRect(cx - 6, cy - 4, 12, 10);
    ctx.fillRect(cx - 10, cy - 4, 3, 10);
    ctx.fillRect(cx + 7, cy - 4, 3, 10);
    ctx.fillRect(cx - 6, cy - 14, 12, 10);

    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(cx - 4, cy - 2, 8, 1);
    ctx.fillRect(cx - 4, cy + 1, 8, 1);
    ctx.fillRect(cx - 4, cy + 4, 8, 1);

    ctx.fillStyle = "#000";
    ctx.fillRect(cx - 4, cy - 11, 3, 3);
    ctx.fillRect(cx + 1, cy - 11, 3, 3);
    ctx.fillRect(cx - 1, cy - 7, 2, 2);

    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(cx - 3, cy - 10, 1, 1);
    ctx.fillRect(cx + 2, cy - 10, 1, 1);

    return canvas.toDataURL();
}

function createBatSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    for (let f = 0; f < 2; f++) {
        const x = f * 32;
        const cx = x + 16;
        const cy = 16;

        ctx.fillStyle = "#4a2c5a";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 6, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6b3a7d";
        if (f === 0) {
            ctx.beginPath();
            ctx.moveTo(cx - 6, cy);
            ctx.lineTo(cx - 14, cy - 8);
            ctx.lineTo(cx - 10, cy + 2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx + 6, cy);
            ctx.lineTo(cx + 14, cy - 8);
            ctx.lineTo(cx + 10, cy + 2);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(cx - 6, cy);
            ctx.lineTo(cx - 14, cy + 8);
            ctx.lineTo(cx - 10, cy - 2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx + 6, cy);
            ctx.lineTo(cx + 14, cy + 8);
            ctx.lineTo(cx + 10, cy - 2);
            ctx.closePath();
            ctx.fill();
        }
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(cx - 3, cy - 2, 2, 2);
        ctx.fillRect(cx + 1, cy - 2, 2, 2);

        ctx.fillStyle = "#fff";
        ctx.fillRect(cx - 2, cy + 4, 1, 2);
        ctx.fillRect(cx + 1, cy + 4, 1, 2);
    }

    return canvas.toDataURL();
}

function createCoinSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(12, 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.arc(12, 12, 6, 0, Math.PI * 2);
    ctx.fill();
    return canvas.toDataURL();
}

function createPotionSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath();
    ctx.arc(12, 14, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c0392b";
    ctx.fillRect(10, 4, 4, 6);
    ctx.fillStyle = "#fff";
    ctx.fillRect(9, 3, 6, 2);
    return canvas.toDataURL();
}

function createTileSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#3d3d3d";
    ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 64, 64);
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(30, 25);
    ctx.lineTo(20, 40);
    ctx.stroke();
    return canvas.toDataURL();
}