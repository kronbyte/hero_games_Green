/**
 * Генерация всех спрайтов игры через Canvas
 */
const Sprites = {
    textures: {},

    init() {
        this.textures.knight = this.createKnight();
        this.textures.skeleton = this.createSkeleton();
        this.textures.coin = this.createCoin();
        this.textures.potion = this.createPotion();
        this.textures.tile = this.createTile();
    },

    createKnight() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        for (let frame = 0; frame < 4; frame++) {
            const x = frame * 32;
            const cx = x + 16;
            const cy = 16;

            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.beginPath();
            ctx.ellipse(cx, cy + 13, 10, 3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ноги
            ctx.fillStyle = '#2c3e50';
            if (frame === 0) {
                ctx.fillRect(cx - 5, cy + 4, 4, 9);
                ctx.fillRect(cx + 1, cy + 4, 4, 9);
            } else if (frame === 1) {
                ctx.fillRect(cx - 7, cy + 4, 4, 9);
                ctx.fillRect(cx + 3, cy + 2, 4, 9);
            } else if (frame === 2) {
                ctx.fillRect(cx - 4, cy + 4, 4, 9);
                ctx.fillRect(cx + 0, cy + 4, 4, 9);
            } else {
                ctx.fillRect(cx - 3, cy + 2, 4, 9);
                ctx.fillRect(cx + 3, cy + 4, 4, 9);
            }

            // Ботинки
            ctx.fillStyle = '#1a1a1a';
            if (frame === 0) {
                ctx.fillRect(cx - 6, cy + 12, 5, 2);
                ctx.fillRect(cx + 1, cy + 12, 5, 2);
            } else if (frame === 1) {
                ctx.fillRect(cx - 8, cy + 12, 5, 2);
                ctx.fillRect(cx + 3, cy + 10, 5, 2);
            } else if (frame === 2) {
                ctx.fillRect(cx - 5, cy + 12, 5, 2);
                ctx.fillRect(cx + 0, cy + 12, 5, 2);
            } else {
                ctx.fillRect(cx - 3, cy + 10, 5, 2);
                ctx.fillRect(cx + 3, cy + 12, 5, 2);
            }

            // Тело
            ctx.fillStyle = '#7f8c8d';
            ctx.fillRect(cx - 7, cy - 6, 14, 12);
            ctx.fillStyle = '#95a5a6';
            ctx.fillRect(cx - 5, cy - 4, 10, 6);
            ctx.fillStyle = '#f1c40f';
            ctx.fillRect(cx - 1, cy - 2, 2, 2);
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(cx - 7, cy + 4, 14, 2);

            // Руки
            ctx.fillStyle = '#7f8c8d';
            if (frame === 0) {
                ctx.fillRect(cx - 10, cy - 4, 3, 8);
                ctx.fillRect(cx + 7, cy - 4, 3, 8);
            } else if (frame === 1) {
                ctx.fillRect(cx - 10, cy - 2, 3, 8);
                ctx.fillRect(cx + 7, cy - 6, 3, 8);
            } else if (frame === 2) {
                ctx.fillRect(cx - 10, cy - 4, 3, 8);
                ctx.fillRect(cx + 7, cy - 4, 3, 8);
            } else {
                ctx.fillRect(cx - 10, cy - 6, 3, 8);
                ctx.fillRect(cx + 7, cy - 2, 3, 8);
            }

            // Меч
            ctx.fillStyle = '#bdc3c7';
            ctx.fillRect(cx + 8, cy - 10, 2, 10);
            ctx.fillStyle = '#f1c40f';
            ctx.fillRect(cx + 6, cy - 2, 6, 2);
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(cx + 7, cy, 2, 4);

            // Голова
            ctx.fillStyle = '#95a5a6';
            ctx.fillRect(cx - 6, cy - 14, 12, 9);
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(cx - 5, cy - 11, 10, 3);
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.moveTo(cx - 2, cy - 14);
            ctx.lineTo(cx + 2, cy - 14);
            ctx.lineTo(cx, cy - 20);
            ctx.closePath();
            ctx.fill();
        }

        return PIXI.Texture.from(canvas);
    },

    createSkeleton() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const cx = 16, cy = 16;

        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 13, 10, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(cx - 5, cy + 4, 3, 9);
        ctx.fillRect(cx + 2, cy + 4, 3, 9);
        ctx.fillRect(cx - 6, cy - 4, 12, 10);
        ctx.fillRect(cx - 10, cy - 4, 3, 10);
        ctx.fillRect(cx + 7, cy - 4, 3, 10);
        ctx.fillRect(cx - 6, cy - 14, 12, 10);

        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(cx - 4, cy - 2, 8, 1);
        ctx.fillRect(cx - 4, cy + 1, 8, 1);
        ctx.fillRect(cx - 4, cy + 4, 8, 1);

        ctx.fillStyle = '#000000';
        ctx.fillRect(cx - 4, cy - 11, 3, 3);
        ctx.fillRect(cx + 1, cy - 11, 3, 3);
        ctx.fillRect(cx - 1, cy - 7, 2, 2);

        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(cx - 3, cy - 10, 1, 1);
        ctx.fillRect(cx + 2, cy - 10, 1, 1);

        return PIXI.Texture.from(canvas);
    },

    createCoin() {
        const canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(12, 12, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(12, 12, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f1c40f';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 12, 13);
        return PIXI.Texture.from(canvas);
    },

    createPotion() {
        const canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(12, 14, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(10, 4, 4, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(9, 3, 6, 2);
        return PIXI.Texture.from(canvas);
    },

    createTile() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#3d3d3d';
        ctx.fillRect(0, 0, 64, 64);
        ctx.strokeStyle = '#2a2a2a';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 64, 64);
        ctx.strokeStyle = '#2a2a2a';
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(30, 25);
        ctx.lineTo(20, 40);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(45, 50);
        ctx.lineTo(55, 35);
        ctx.stroke();
        return PIXI.Texture.from(canvas);
    },

    getFrames(texture, frameCount, frameWidth, frameHeight) {
        const frames = [];
        for (let i = 0; i < frameCount; i++) {
            frames.push(new PIXI.Texture(
                texture.baseTexture,
                new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight)
            ));
        }
        return frames;
    }
};