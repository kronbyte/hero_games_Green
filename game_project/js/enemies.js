/**
 * Управление врагами (скелетами)
 */
const Enemies = {
    container: null,
    speed: CONFIG.enemyBaseSpeed,

    init(stage) {
        this.container = new PIXI.Container();
        stage.addChild(this.container);
        this.speed = CONFIG.enemyBaseSpeed;
    },

    spawn(playerX, playerY) {
        const skeleton = new PIXI.Sprite(Sprites.textures.skeleton);
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { skeleton.x = Math.random() * CONFIG.width; skeleton.y = -30; }
        else if (side === 1) { skeleton.x = CONFIG.width + 30; skeleton.y = Math.random() * CONFIG.height; }
        else if (side === 2) { skeleton.x = Math.random() * CONFIG.width; skeleton.y = CONFIG.height + 30; }
        else { skeleton.x = -30; skeleton.y = Math.random() * CONFIG.height; }

        skeleton.anchor.set(0.5);
        skeleton.scale.set(1.3);
        this.container.addChild(skeleton);
    },

    update(delta, playerX, playerY) {
        const speed = this.speed * delta / 60;
        this.container.children.forEach(sk => {
            const dx = playerX - sk.x;
            const dy = playerY - sk.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                sk.x += (dx / dist) * speed;
                sk.y += (dy / dist) * speed;
            }
        });
    },

    checkCollision(playerX, playerY, onHit) {
        for (let i = this.container.children.length - 1; i >= 0; i--) {
            const sk = this.container.children[i];
            const dist = Math.hypot(playerX - sk.x, playerY - sk.y);
            if (dist < CONFIG.pickupRadius) {
                this.container.removeChild(sk);
                onHit(sk.x, sk.y);
            }
        }
    },

    clear() {
        this.container.removeChildren();
    },

    increaseDifficulty(level) {
        this.speed = CONFIG.enemyBaseSpeed + (level - 1) * 15;
    },

    destroy() {
        this.container.parent.removeChild(this.container);
    }
};