/**
 * Магазин улучшений
 */
const Shop = {
    items: [
        {
            id: 'life',
            icon: '❤️',
            name: 'Доп. жизнь',
            desc: '+1 жизнь сразу',
            basePrice: 50,
            price: 50,
            maxLevel: 99,
            level: 0,
            apply(game) {
                game.state.lives = Math.min(game.state.lives + 1, CONFIG.maxLives + this.level);
            }
        },
        {
            id: 'maxLife',
            icon: '💖',
            name: 'Макс. жизнь +1',
            desc: 'Увеличивает макс. жизни',
            basePrice: 150,
            price: 150,
            maxLevel: 5,
            level: 0,
            apply(game) {
                CONFIG.maxLives++;
            }
        },
        {
            id: 'speed',
            icon: '⚡',
            name: 'Скорость +20%',
            desc: 'Быстрее бегаешь',
            basePrice: 80,
            price: 80,
            maxLevel: 3,
            level: 0,
            apply(game) {
                game.player.speed = CONFIG.playerSpeed * (1 + this.level * 0.2);
            }
        },
        {
            id: 'magnet',
            icon: '🧲',
            name: 'Магнит монет',
            desc: 'Притягивает монеты',
            basePrice: 100,
            price: 100,
            maxLevel: 1,
            level: 0,
            apply(game) {
                game.player.setMagnet(true);
            }
        },
        {
            id: 'shield',
            icon: '🛡️',
            name: 'Щит 10 сек',
            desc: 'Временная неуязвимость',
            basePrice: 60,
            price: 60,
            maxLevel: 99,
            level: 0,
            apply(game) {
                game.player.setInvulnerable(10000);
            }
        },
        {
            id: 'slowEnemies',
            icon: '🐌',
            name: 'Замедлить врагов',
            desc: 'Враги медленнее на 20%',
            basePrice: 120,
            price: 120,
            maxLevel: 3,
            level: 0,
            apply(game) {
                Enemies.speed *= 0.8;
            }
        }
    ],

    render() {
        const container = document.getElementById('shop-items');
        container.innerHTML = '';
        document.getElementById('shop-gold').textContent = '🪙 Золото: ' + window.game.state.gold;

        this.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'shop-item' + (item.level >= item.maxLevel ? ' sold-out' : '');
            div.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.desc}</div>
                <div class="item-price">${item.level >= item.maxLevel ? 'МАКС' : '🪙 ' + item.price}</div>
                ${item.level > 0 ? '<div class="item-level">Уровень: ' + item.level + '</div>' : ''}
            `;

            if (item.level < item.maxLevel) {
                div.addEventListener('click', () => this.buy(item));
            }

            container.appendChild(div);
        });
    },

    buy(item) {
        const game = window.game;
        if (game.state.gold >= item.price) {
            game.state.gold -= item.price;
            item.level++;
            item.price = Math.floor(item.basePrice * Math.pow(1.5, item.level));
            item.apply(game);
            this.render();
            game.updateUI();
        } else {
            alert('Недостаточно золота! Нужно: ' + item.price);
        }
    },

    reset() {
        this.items.forEach(item => {
            item.level = 0;
            item.price = item.basePrice;
        });
    }
};