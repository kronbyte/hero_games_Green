const k = kaboom({
    root: document.getElementById("game"),
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    background: [20, 20, 30],
    scale: 1,
    crisp: true
});

k.loadSprite("knight", createKnightSprite(), {
    sliceX: 4, sliceY: 1,
    anims: { idle: { from: 0, to: 0, loop: true }, run: { from: 0, to: 3, loop: true, speed: 8 } }
});
k.loadSprite("skeleton", createSkeletonSprite());
k.loadSprite("bat", createBatSprite(), {
    sliceX: 2, sliceY: 1,
    anims: { fly: { from: 0, to: 1, loop: true, speed: 6 } }
});
k.loadSprite("coin", createCoinSprite());
k.loadSprite("potion", createPotionSprite());
k.loadSprite("tile", createTileSprite());

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b };
}

function removeFromArray(arr, obj) {
    const idx = arr.indexOf(obj);
    if (idx > -1) arr.splice(idx, 1);
}

let inputEnabled = true;

k.scene("game", () => {
    k.add([
        k.sprite("tile"), k.pos(0, 0),
        k.scale(Math.ceil(GAME_CONFIG.width / 64), Math.ceil(GAME_CONFIG.height / 64)),
        k.fixed()
    ]);

    const player = k.add([
        k.sprite("knight", { anim: "idle" }),
        k.pos(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2),
        k.area({ shape: new k.Rect(k.vec2(8, 8), 16, 16) }),
        k.anchor("center"), k.scale(2), "player"
    ]);

    const coins = [], potions = [], skeletons = [], bats = [];

    const scoreLabel = k.add([k.text("Очки: 0", { size: 20 }), k.pos(10, 10), k.fixed()]);
    const goldLabel = k.add([k.text("Золото: 0", { size: 20 }), k.pos(10, 35), k.fixed()]);
    const livesLabel = k.add([k.text("❤️: 3", { size: 20 }), k.pos(10, 60), k.fixed()]);
    const levelLabel = k.add([k.text("Ур. 1", { size: 20 }), k.pos(GAME_CONFIG.width - 10, 10), k.fixed()]);
    levelLabel.anchor = "right";

    const activeTimers = [], activeLoops = [];

    function spawnCoin() {
        if (!inputEnabled) return;
        const x = k.rand(50, GAME_CONFIG.width - 50);
        const y = k.rand(50, GAME_CONFIG.height - 50);
        const coin = k.add([k.sprite("coin"), k.pos(x, y), k.area({ shape: new k.Rect(k.vec2(4, 4), 16, 16) }), k.anchor("center"), k.scale(1.5), "coin"]);
        coins.push(coin);
        const t = k.wait(6, () => { if (coin.exists()) { coin.destroy(); removeFromArray(coins, coin); } });
        activeTimers.push(t);
    }

    function spawnPotion() {
        if (!inputEnabled) return;
        const x = k.rand(50, GAME_CONFIG.width - 50);
        const y = k.rand(50, GAME_CONFIG.height - 50);
        const potion = k.add([k.sprite("potion"), k.pos(x, y), k.area({ shape: new k.Rect(k.vec2(4, 4), 16, 16) }), k.anchor("center"), k.scale(1.5), "potion"]);
        potions.push(potion);
        const t = k.wait(5, () => { if (potion.exists()) { potion.destroy(); removeFromArray(potions, potion); } });
        activeTimers.push(t);
    }

    function spawnSkeleton() {
        if (!inputEnabled) return;
        const side = k.randi(0, 4);
        let x, y;
        if (side === 0) { x = k.rand(0, GAME_CONFIG.width); y = -30; }
        else if (side === 1) { x = GAME_CONFIG.width + 30; y = k.rand(0, GAME_CONFIG.height); }
        else if (side === 2) { x = k.rand(0, GAME_CONFIG.width); y = GAME_CONFIG.height + 30; }
        else { x = -30; y = k.rand(0, GAME_CONFIG.height); }
        const sk = k.add([k.sprite("skeleton"), k.pos(x, y), k.area({ shape: new k.Rect(k.vec2(6, 6), 20, 20) }), k.anchor("center"), k.scale(1.5), "skeleton"]);
        skeletons.push(sk);
        if (state.level >= 3) sk.color = k.rgb(1, 0.8, 0.8);
        if (state.level >= 7) sk.color = k.rgb(1, 0.3, 0.3);
    }

    function spawnBat() {
        if (!inputEnabled) return;
        const side = k.randi(0, 4);
        let x, y;
        if (side === 0) { x = k.rand(0, GAME_CONFIG.width); y = -30; }
        else if (side === 1) { x = GAME_CONFIG.width + 30; y = k.rand(0, GAME_CONFIG.height); }
        else if (side === 2) { x = k.rand(0, GAME_CONFIG.width); y = GAME_CONFIG.height + 30; }
        else { x = -30; y = k.rand(0, GAME_CONFIG.height); }
        const bat = k.add([k.sprite("bat", { anim: "fly" }), k.pos(x, y), k.area({ shape: new k.Rect(k.vec2(6, 6), 20, 20) }), k.anchor("center"), k.scale(1.5), "bat"]);
        bat.time = 0;
        bats.push(bat);
        if (state.level >= 3) bat.scale = 1.8;
        if (state.level >= 5) bat.scale = 2.2;
    }

    activeLoops.push(k.loop(GAME_CONFIG.spawnCoinDelay, spawnCoin));
    activeLoops.push(k.loop(GAME_CONFIG.spawnPotionDelay, spawnPotion));
    const skeletonInterval = Math.max(0.8, GAME_CONFIG.spawnSkeletonDelay - (state.level - 1) * 0.3);
    const batInterval = Math.max(1.5, GAME_CONFIG.spawnBatDelay - (state.level - 1) * 0.4);

    activeLoops.push(k.loop(skeletonInterval, spawnSkeleton));
    activeLoops.push(k.loop(batInterval, spawnBat));

    for (let i = 0; i < 3; i++) spawnCoin();

    function showFloatingText(pos, text, color) {
        const rgb = hexToRgb(color);
        const txt = k.add([k.text(text, { size: 20 }), k.pos(pos.x, pos.y), k.anchor("center")]);
        txt.color = k.rgb(rgb.r, rgb.g, rgb.b);
        const startY = txt.pos.y;
        let elapsed = 0;
        txt.onUpdate(() => {
            elapsed += k.dt();
            txt.pos.y = startY - (elapsed / 1) * 40;
            txt.opacity = 1 - elapsed;
            if (elapsed >= 1) txt.destroy();
        });
    }

    function updateUI() {
        scoreLabel.text = "Очки: " + state.score;
        goldLabel.text = "Золото: " + state.gold;
        livesLabel.text = "❤️: " + state.lives;
        levelLabel.text = "Ур. " + state.level;
        document.getElementById("score-display").textContent = "Очки: " + state.score;
        document.getElementById("gold-display").textContent = "Золото: " + state.gold;
        document.getElementById("level-display").textContent = "Уровень: " + state.level;
        document.getElementById("lives-display").textContent = "❤️: " + state.lives;
    }

    function checkLevelUp() {
        if (state.score >= 100) {
            state.level++;
            state.score = 0;
            updateUI();
            skeletons.forEach(sk => { if (sk.exists()) sk.destroy(); }); skeletons.length = 0;
            bats.forEach(b => { if (b.exists()) b.destroy(); }); bats.length = 0;

            const msg = k.add([k.text("УРОВЕНЬ " + state.level + "!", { size: 40 }), k.pos(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2), k.anchor("center")]);
            msg.color = k.rgb(1, 0.8, 0);
            let elapsed = 0;
            msg.onUpdate(() => {
                elapsed += k.dt();
                msg.scale = k.vec2(1 + Math.sin(elapsed * 3) * 0.1);
                msg.opacity = 1 - (elapsed / 2);
                if (elapsed >= 2) msg.destroy();
            });
        }
    }

    function gameOver() {
        inputEnabled = false;
        activeLoops.forEach(t => { if (t && t.cancel) t.cancel(); });
        activeTimers.forEach(t => { if (t && t.cancel) t.cancel(); });
        document.getElementById("final-score").textContent = `Твой счёт: ${state.score} | Уровень: ${state.level} | Золото: ${state.gold}`;
        document.getElementById("gameover-modal").classList.remove("hidden");
    }

    function applyShopItem(item) {
        switch (item.id) {
            case 'life': state.lives = Math.min(state.lives + 1, 5); break;
            case 'magnet': state.magnetActive = true; break;
            case 'shield': player.color = k.rgb(0, 1, 1); setTimeout(() => { if (player.exists()) player.color = k.rgb(1, 1, 1); }, 10000); break;
            case 'doubleScore': state.scoreMultiplier *= 2; break;
            case 'bomb':
                skeletons.forEach(sk => { if (sk.exists()) sk.destroy(); }); skeletons.length = 0;
                bats.forEach(b => { if (b.exists()) b.destroy(); }); bats.length = 0;
                showFloatingText(player.pos, "БУМ!", "#b80600");
                break;
            case 'freeze':
                state.frozen = true; state.freezeTimer = 300;
                showFloatingText(player.pos, "ЗАМОРОЗКА!", "#3498db");
                setTimeout(() => state.frozen = false, 5000);
                break;
            case 'bigRadius': state.pickupRadius += 15; break;
        }
        updateUI();
    }
    k.onUpdate(() => {
        if (!inputEnabled) return;

        const left = k.isKeyDown("left") || k.isKeyDown("a");
        const right = k.isKeyDown("right") || k.isKeyDown("d");
        const up = k.isKeyDown("up") || k.isKeyDown("w");
        const down = k.isKeyDown("down") || k.isKeyDown("s");

        let dx = 0, dy = 0;
        if (left) dx -= 1;
        if (right) dx += 1;
        if (up) dy -= 1;
        if (down) dy += 1;
        if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

        player.pos.x += dx * GAME_CONFIG.playerSpeed * k.dt();
        player.pos.y += dy * GAME_CONFIG.playerSpeed * k.dt();
        player.pos.x = k.clamp(player.pos.x, 20, GAME_CONFIG.width - 20);
        player.pos.y = k.clamp(player.pos.y, 20, GAME_CONFIG.height - 20);

        if (dx !== 0 || dy !== 0) { player.play("run"); player.flipX = dx < 0; }
        else { player.play("idle"); }

        const skSpeed = GAME_CONFIG.skeletonSpeed + (state.level - 1) * 10;
        skeletons.forEach(sk => {
            if (!sk.exists() || state.frozen) return;
            const dir = player.pos.sub(sk.pos).unit();
            sk.pos = sk.pos.add(dir.scale(skSpeed * k.dt()));
        });

        const btSpeed = GAME_CONFIG.batSpeed;
        bats.forEach(bat => {
            if (!bat.exists() || state.frozen) return;
            bat.time = (bat.time || 0) + 0.05;
            const dx2 = player.pos.x - bat.pos.x;
            const dy2 = player.pos.y - bat.pos.y;
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (dist > 0) {
                bat.pos.x += (dx2 / dist) * btSpeed * k.dt();
                bat.pos.y += (dy2 / dist) * btSpeed * k.dt() + Math.sin(bat.time) * 2;
            }
            bat.flipX = dx2 > 0;
        });

        if (state.magnetActive) {
            coins.forEach(c => {
                if (!c.exists()) return;
                const d = player.pos.dist(c.pos);
                if (d < 150) {
                    c.pos.x += (player.pos.x - c.pos.x) * 0.1;
                    c.pos.y += (player.pos.y - c.pos.y) * 0.1;
                }
            });
        }

        coins.forEach(c => {
            if (!c.exists() || c.pos.dist(player.pos) >= state.pickupRadius) return;
            const p = c.pos.clone(); c.destroy(); removeFromArray(coins, c);
            const pts = 10 * state.scoreMultiplier;
            state.score += pts; state.gold += 10; updateUI();
            showFloatingText(p, "+" + pts, "#f1c40f"); checkLevelUp();
        });

        potions.forEach(p => {
            if (!p.exists() || p.pos.dist(player.pos) >= state.pickupRadius) return;
            const pos = p.pos.clone(); p.destroy(); removeFromArray(potions, p);
            state.lives = Math.min(state.lives + 1, 5); updateUI();
            showFloatingText(pos, "+❤️", "#e74c3c");
        });

        skeletons.forEach(sk => {
            if (!sk.exists() || sk.pos.dist(player.pos) >= state.pickupRadius) return;
            sk.destroy(); removeFromArray(skeletons, sk);
            state.lives--; updateUI(); showFloatingText(player.pos, "-❤️", "#e74c3c");
            player.opacity = 0.3;
            k.wait(0.1, () => { if (player.exists()) player.opacity = 1; });
            k.wait(0.2, () => { if (player.exists()) player.opacity = 0.3; });
            k.wait(0.3, () => { if (player.exists()) player.opacity = 1; });
            if (state.lives <= 0) gameOver();
        });

        bats.forEach(b => {
            if (!b.exists() || b.pos.dist(player.pos) >= state.pickupRadius) return;
            b.destroy(); removeFromArray(bats, b);
            state.lives--; updateUI(); showFloatingText(player.pos, "-❤️", "#e74c3c");
            player.opacity = 0.3;
            k.wait(0.1, () => { if (player.exists()) player.opacity = 1; });
            k.wait(0.2, () => { if (player.exists()) player.opacity = 0.3; });
            k.wait(0.3, () => { if (player.exists()) player.opacity = 1; });
            if (state.lives <= 0) gameOver();
        });

        if (state.frozen) {
            state.freezeTimer--;
            if (state.freezeTimer <= 0) state.frozen = false;
        }
    });

    window.gameAPI = {
        togglePause: () => {
            inputEnabled = !inputEnabled;
            return !inputEnabled;
        },
        isPaused: () => !inputEnabled,
        enableInput: () => { inputEnabled = true; },
        disableInput: () => { inputEnabled = false; },
        restart: () => {
            activeLoops.forEach(t => { if (t && t.cancel) t.cancel(); });
            activeTimers.forEach(t => { if (t && t.cancel) t.cancel(); });
            state.score = 0; state.gold = 0; state.lives = 3; state.level = 1;
            state.scoreMultiplier = 1; state.pickupRadius = 25;
            state.frozen = false; state.magnetActive = false;
            shopItems.forEach(i => { i.level = 0; i.price = i.basePrice; });
            document.getElementById("gameover-modal").classList.add("hidden");
            document.getElementById("shop-modal").classList.add("hidden");
            document.getElementById("rules-modal").classList.add("hidden");
            document.getElementById("btn-pause").textContent = "⏸";
            inputEnabled = true;
            k.go("game");
        },
        buyItem: (item) => {
            if (state.gold >= item.price) {
                state.gold -= item.price;
                item.level++;
                item.price = Math.floor(item.basePrice * Math.pow(1.5, item.level));
                applyShopItem(item);
                return true;
            }
            return false;
        },
        getState: () => state,
        getShopItems: () => shopItems
    };
});

k.go("game");