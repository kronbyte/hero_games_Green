const state = {
    score: 0,
    gold: 20,
    lives: 4,
    level: 1,
    isPaused: false,
    scoreMultiplier: 1,
    pickupRadius: 25,
    frozen: false,
    freezeTimer: 0,
    magnetActive: false
};
const shopItems = [
    { id: 'life', icon: '❤️', name: '', desc: '+1 жизнь сразу', basePrice: 50, price: 50, maxLevel: 99, level: 0 },
    { id: 'maxLife', icon: '', name: 'Макс. жизнь +1', desc: 'Увеличивает макс. жизни', basePrice: 150, price: 150, maxLevel: 5, level: 0 },
    { id: 'speed', icon: '', name: 'Скорость +20%', desc: 'Быстрее бегаешь', basePrice: 80, price: 80, maxLevel: 3, level: 0 },
    { id: 'magnet', icon: '', name: 'Магнит монет', desc: 'Притягивает монеты', basePrice: 100, price: 100, maxLevel: 1, level: 0 },
    { id: 'shield', icon: '', name: 'Щит 10 сек', desc: 'Временная неуязвимость', basePrice: 60, price: 60, maxLevel: 99, level: 0 },
    { id: 'slowEnemies', icon: '', name: 'Замедлить врагов', desc: 'Враги медленнее на 20%', basePrice: 120, price: 120, maxLevel: 3, level: 0 },
    { id: 'doubleScore', icon: '', name: 'Двойные очки', desc: 'Монеты дают x2 очков', basePrice: 200, price: 200, maxLevel: 3, level: 0 },
    { id: 'bomb', icon: '', name: 'Бомба', desc: 'Уничтожает всех врагов', basePrice: 75, price: 75, maxLevel: 99, level: 0 },
    { id: 'freeze', icon: '', name: 'Заморозка', desc: 'Замораживает врагов на 5 сек', basePrice: 90, price: 90, maxLevel: 99, level: 0 },
    { id: 'bigRadius', icon: '', name: 'Большой радиус', desc: '+15 к радиусу сбора', basePrice: 110, price: 110, maxLevel: 3, level: 0 }
];
const GAME_CONFIG = {
    width: 1280,
    height: 720,
    playerSpeed: 200,
    skeletonSpeed: 60,
    batSpeed: 100,
    spawnCoinDelay: 1.5,
    spawnPotionDelay: 7,
    spawnSkeletonDelay: 3.2,
    spawnBatDelay: 5,
    coinLifetime: 7,
    potionLifetime: 5
};