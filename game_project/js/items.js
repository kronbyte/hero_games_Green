/**
 * Монеты и зелья
 */
const Items = {
    coinsContainer: null,
    potionsContainer: null,

    init(stage) {
        this.coinsContainer = new PIXI.Container();
        this.potionsContainer = new PIXI.Container();
        stage.addChild(this.coinsContainer);
        stage.addChild(this.potionsContainer);
    },

    spawnCoin() {
        const coin = new PIXI.Sprite(Sprites.textures.coin);
        coin.x = Math.random() * (CONFIG.width - 100) + 50;
        coin.y = Math.random() * (CONFIG.height - 100) + 50;
        coin.anchor.set(0.5);
        coin.scale.set(1.2);
        this.coinsContainer.addChild(coin);

        setTimeout(() => {
            if (coin.parent) coin.parent.removeChild(coin);
        }, CONFIG.coinLifetime);
    },

    spawnPotion() {
        const potion = new PIXI.Sprite(Sprites.textures.potion);
        potion.x = Math.random() * (CONFIG.width - 100) + 50;
        potion.y = Math.random() * (CONFIG.height - 100) + 50;
        potion.anchor.set(0.5);
        potion.scale.set(1.2);
        this.potionsContainer.addChild(potion);

        setTimeout(() => {
            if (potion.parent) potion.parent.removeChild(potion);
        }, CONFIG.potionLifetime);
    },

    update(delta, playerX, playerY, playerMagnet) {
        // Вращение монет
        this.coinsContainer.children.forEach(c => {
            c.rotation += 0.05;
            // Магнит — притягивает монеты
            if (playerMagnet) {
                const dist = Math.hypot(playerX - c.x, playerY - c.y);
                if (dist < 150) {
                    c.x += (playerX - c.x) * 0.1;
                    c.y += (playerY - c.y) * 0.1;
                }
            }
        });
        this.potionsContainer.children.forEach(p => {
            p.rotation += 0.03;
        });
    },

    checkCoinCollision(playerX, playerY, onCollect) {
        for (let i = this.coinsContainer.children.length - 1; i >= 0; i--) {
            const coin = this.coinsContainer.children[i];
            const dist = Math.hypot(playerX - coin.x, playerY - coin.y);
            if (dist < CONFIG.pickupRadius) {
                this.coinsContainer.removeChild(coin);
                onCollect(coin.x, coin.y);
            }
        }
    },

    checkPotionCollision(playerX, playerY, onCollect) {
        for (let i = this.potionsContainer.children.length - 1; i >= 0; i--) {
            const potion = this.potionsContainer.children[i];
            const dist = Math.hypot(playerX - potion.x, playerY - potion.y);
            if (dist < CONFIG.pickupRadius) {
                this.potionsContainer.removeChild(potion);
                onCollect(potion.x, potion.y);
            }
        }
    },

    destroy() {
        this.coinsContainer.parent.removeChild(this.coinsContainer);
        this.potionsContainer.parent.removeChild(this.potionsContainer);
    }
};