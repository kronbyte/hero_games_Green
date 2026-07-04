/**
 * Класс игрока с анимацией
 */
class Player {
    constructor(stage) {
        this.frames = Sprites.getFrames(Sprites.textures.knight, 4, 32, 32);
        this.sprite = new PIXI.AnimatedSprite(this.frames);
        this.sprite.x = CONFIG.width / 2;
        this.sprite.y = CONFIG.height / 2;
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(1.5);
        this.sprite.animationSpeed = 0.15;
        this.sprite.play();
        stage.addChild(this.sprite);

        this.speed = CONFIG.playerSpeed;
        this.isInvulnerable = false;
        this.magnetActive = false;
    }

    update(delta, keys) {
        const speed = this.speed * delta / 60;
        let dx = 0, dy = 0;
        if (keys.left) dx -= 1;
        if (keys.right) dx += 1;
        if (keys.up) dy -= 1;
        if (keys.down) dy += 1;

        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }

        this.sprite.x += dx * speed;
        this.sprite.y += dy * speed;
        this.sprite.x = Math.max(20, Math.min(CONFIG.width - 20, this.sprite.x));
        this.sprite.y = Math.max(20, Math.min(CONFIG.height - 20, this.sprite.y));

        // АНИМАЦИЯ
        if (dx !== 0 || dy !== 0) {
            if (!this.sprite.playing) this.sprite.play();
            this.sprite.animationSpeed = 0.15;
            this.sprite.scale.x = dx < 0 ? -1.5 : 1.5;
        } else {
            this.sprite.stop();
            this.sprite.gotoAndStop(0);
        }
    }

    setInvulnerable(duration) {
        this.isInvulnerable = true;
        this.sprite.tint = 0x00ffff;
        setTimeout(() => {
            this.isInvulnerable = false;
            this.sprite.tint = 0xffffff;
        }, duration);
    }

    setMagnet(active) {
        this.magnetActive = active;
        this.sprite.tint = active ? 0x9b59b6 : 0xffffff;
    }

    destroy() {
        this.sprite.parent.removeChild(this.sprite);
    }
}