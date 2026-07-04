/**
 * Обработчики HTML-кнопок
 */
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('btn-pause').addEventListener('click', () => {
        if (!window.game) return;
        const paused = window.game.togglePause();
        document.getElementById('btn-pause').textContent = paused ? '▶ Продолжить' : '⏸ Пауза';
    });

    document.getElementById('btn-shop').addEventListener('click', () => {
        if (!window.game) return;
        Shop.render();
        document.getElementById('shop-modal').classList.remove('hidden');
        if (!window.game.state.isPaused) {
            window.game.togglePause();
            document.getElementById('btn-pause').textContent = '▶ Продолжить';
        }
    });

    document.getElementById('btn-close-shop').addEventListener('click', () => {
        document.getElementById('shop-modal').classList.add('hidden');
    });

    document.getElementById('btn-rules').addEventListener('click', () => {
        document.getElementById('rules-modal').classList.remove('hidden');
        if (window.game && !window.game.state.isPaused) {
            window.game.togglePause();
            document.getElementById('btn-pause').textContent = '▶ Продолжить';
        }
    });

    document.getElementById('btn-close-rules').addEventListener('click', () => {
        document.getElementById('rules-modal').classList.add('hidden');
    });

    document.getElementById('btn-exit').addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите выйти из игры?')) {
            document.getElementById('game').innerHTML = `
                <div style="padding: 60px; color: white; font-size: 20px;">
                    <p> Игра завершена!</p>
                    <button onclick="location.reload()" style="
                        margin-top: 20px; padding: 10px 25px;
                        font-size: 16px; background: #e94560;
                        color: white; border: none; border-radius: 6px;
                        cursor: pointer;"> Перезапустить</button>
                </div>
            `;
        }
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        document.getElementById('gameover-modal').classList.add('hidden');
        if (window.game) window.game.restart();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!document.getElementById('shop-modal').classList.contains('hidden')) {
                document.getElementById('btn-close-shop').click();
            } else if (!document.getElementById('rules-modal').classList.contains('hidden')) {
                document.getElementById('btn-close-rules').click();
            } else {
                document.getElementById('btn-pause').click();
            }
        }
    });
});