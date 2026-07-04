/**
 * Главный файл игры — инициализация Pixi и игровой цикл
 */
const Game = {
    app: null,
    player: null,
    bgGroup: null,
    state: null,
    keys: { left: false, right: false, up: false, down: false },
    timers: [],

    init() {
        Sprites.init();

        this.app = new PIXI.Application({
            width: CONFIG.width,
            height: CONFIG.height,
            backgroundColor: CONFIG.backgroundColor,
            resolution: 1,
            autoDensity: true
        });
        document.getElementById('game').appendChild(this.app.view);

        this.setupInput();
        this.startGame();
    },

    startGame() {
        this.app.stage.removeChildren();
        this.timers.forEach(t => clearInterval(t));
        this.timers = [];

        this.state = {
            score: 0,
            gold: 0,
            lives: CONFIG.startLives,
            level: 1,
            isPaused: false,
            scoreToNextLevel: CONFIG.scoreToNextLevel
        };

        // Фон
        this.bgGroup = new PIXI.Container();
        this.app.stage.addChild(this.bgGroup);
        for (let y = -64; y < CONFIG.height + 64; y += 64) {
            for (let x = -64; x < CONFIG.width + 64; x += 64) {
                const tile = new PIXI.Sprite(Sprites.textures.tile);
                tile.x = x;
                tile.y = y;
                this.bgGroup.addChild(tile);
            }
        }

        // Игрок
        this.player = new Player(this.app.stage);

        // Враги и предметы
        Enemies.init(this.app.stage);
        Items.init(this.app.stage);

        // UI текст
        this.scoreText = new PIXI.Text('🏆 0', { fontSize: 20, fill: 0xf1c40f });
        this.scoreText.x = 10; this.scoreText.y = 10;
        this.app.stage.addChild(this.scoreText);

        this.goldText = new PIXI.Text('🪙 0', { fontSize: 20, fill: 0xf39c12 });
        this.goldText.x = 10; this.goldText.y = 35;
        this.app.stage.addChild(this.goldText);

        this.livesText = new PIXI.Text('❤️ ' + this.state.lives, { fontSize: 20, fill: 0xe74c3c });
        this.livesText.x = 10; this.livesText.y = 60;
        this.app.stage.addChild(this.livesText);

        this.levelText = new PIXI.Text('🏰 Ур. 1', { fontSize: 20, fill: 0x3498db });
        this.levelText.x = CONFIG.width - 10; this.levelText.y = 10;
        this.levelText.anchor.x = 1;
        this.app.stage.addChild(this.levelText);

        // Начальные монеты
        for (let i = 0; i < 3; i++) Items.spawnCoin();

        // Таймеры
        this.timers.push(setInterval(() => {
            if (!this.state.isPaused) Items.spawnCoin();
        }, CONFIG.spawnCoinDelay));

        this.timers.push(setInterval(() => {
            if (!this.state.isPaused) Items.spawnPotion();
        }, CONFIG.spawnPotionDelay));

        this.timers.push(setInterval(() => {
            if (!this.state.isPaused) Enemies.spawn(this.player.sprite.x, this.player.sprite.y);
        }, CONFIG.spawnEnemyDelay));

        this.updateUI();

        // Игровой цикл
        this.app.ticker.add((delta) => this.update(delta));
    },

    setupInput() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = true;
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.keys.up = true;
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.down = true;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = false;
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.keys.up = false;
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.down = false;
        });
    },

    update(delta) {
        if (this.state.isPaused) return;

        // Фон
        this.bgGroup.children.forEach(bg => {
            bg.x -= 0.5;
            if (bg.x < -64) bg.x += CONFIG.width + 64;
        });

        // Игрок
        this.player.update(delta, this.keys);

        // Предметы
        Items.update(delta, this.player.sprite.x, this.player.sprite.y, this.player.magnetActive);

        // Враги
        Enemies.update(delta, this.player.sprite.x, this.player.sprite.y);

        // Столкновения
        Items.checkCoinCollision(this.player.sprite.x, this.player.sprite.y, (x, y) => {
            this.state.score += 10;
            this.state.gold += 10;
            this.updateUI();
            this.showFloatingText(x, y, '+10', 0xf1c40f);
            this.checkLevelUp();
        });

        Items.checkPotionCollision(this.player.sprite.x, this.player.sprite.y, (x, y) => {
            this.state.lives = Math.min(this.state.lives + 1, CONFIG.maxLives);
            this.updateUI();
            this.showFloatingText(x, y, '+❤️', 0xe74c3c);
        });

        if (!this.player.isInvulnerable) {
            Enemies.checkCollision(this.player.sprite.x, this.player.sprite.y, (x, y) => {
                this.state.lives--;
                this.updateUI();
                this.showFloatingText(this.player.sprite.x, this.player.sprite.y, '-❤️', 0xe74c3c);

                this.player.sprite.alpha = 0.3;
                setTimeout(() => this.player.sprite.alpha = 1, 100);
                setTimeout(() => this.player.sprite.alpha = 0.3, 200);
                setTimeout(() => this.player.sprite.alpha = 1, 300);

                if (this.state.lives <= 0) this.gameOver();
            });
        }
    },

    showFloatingText(x, y, text, color) {
        const txt = new PIXI.Text(text, { fontSize: 20, fill: color });
        txt.x = x; txt.y = y;
        txt.anchor.set(0.5);
        this.app.stage.addChild(txt);

        let elapsed = 0;
        const animate = () => {
            elapsed++;
            txt.y -= 1;
            txt.alpha = 1 - elapsed / 60;
            if (elapsed < 60) requestAnimationFrame(animate);
            else this.app.stage.removeChild(txt);
        };
        animate();
    },

    checkLevelUp() {
        if (this.state.score >= this.state.scoreToNextLevel) {
            this.state.level++;
            this.state.score = 0;
            this.state.scoreToNextLevel += 50;
            Enemies.increaseDifficulty(this.state.level);
            this.updateUI();

            Enemies.clear();

            const msg = new PIXI.Text(' УРОВЕНЬ ' + this.state.level + '!', {
                fontSize: 40, fill: 0xf1c40f
            });
            msg.x = CONFIG.width / 2; msg.y = CONFIG.height / 2;
            msg.anchor.set(0.5);
            this.app.stage.addChild(msg);
            setTimeout(() => this.app.stage.removeChild(msg), 2000);
        }
    },

    updateUI() {
        this.scoreText.text = '🏆 ' + this.state.score;
        this.goldText.text = ' ' + this.state.gold;
        this.livesText.text = '❤️ ' + this.state.lives;
        this.levelText.text = '🏰 Ур. ' + this.state.level;

        document.getElementById('score-display').textContent = '🏆 Очки: ' + this.state.score;
        document.getElementById('gold-display').textContent = '🪙 Золото: ' + this.state.gold;
        document.getElementById('level-display').textContent = '🏰 Уровень: ' + this.state.level;
        document.getElementById('lives-display').textContent = '❤️ Жизни: ' + this.state.lives;
    },

    togglePause() {
        this.state.isPaused = !this.state.isPaused;
        return this.state.isPaused;
    },

    gameOver() {
        this.state.isPaused = true;
        document.getElementById('final-score').textContent =
            'Твой счёт: ' + this.state.score + ' | Уровень: ' + this.state.level + ' | Золото: ' + this.state.gold;
        document.getElementById('gameover-modal').classList.remove('hidden');
    },

    restart() {
        Shop.reset();
        CONFIG.maxLives = 5;
        this.startGame();
    }
};

// Экспорт для других модулей
window.game = Game;

// Запуск
Game.init();