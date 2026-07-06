document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("btn-pause").addEventListener("click", () => {
        if (!window.gameAPI) return;
        const paused = window.gameAPI.togglePause();
        document.getElementById("btn-pause").textContent = paused ? "▶" : "⏸";
    });

    document.getElementById("btn-shop").addEventListener("click", () => {
        if (!window.gameAPI) return;
        const state = window.gameAPI.getState();
        const items = window.gameAPI.getShopItems();

        window.gameAPI.disableInput();
        
        document.getElementById("shop-gold").textContent = " Золото: " + state.gold;
        const container = document.getElementById("shop-items");
        container.innerHTML = "";

        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "shop-item" + (item.level >= item.maxLevel ? " sold-out" : "");
            div.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.desc}</div>
                <div class="item-price">${item.level >= item.maxLevel ? "МАКС" : "Золото " + item.price}</div>
                ${item.level > 0 ? "<div class='item-level'>Уровень: " + item.level + "</div>" : ""}
            `;

            if (item.level < item.maxLevel) {
                div.addEventListener("click", () => {
                    const success = window.gameAPI.buyItem(item);
                    if (success) {
                        document.getElementById("btn-shop").click();
                    } else {
                        alert("Недостаточно золота! Нужно: " + item.price);
                    }
                });
            }

            container.appendChild(div);
        });

        document.getElementById("shop-modal").classList.remove("hidden");
        document.getElementById("btn-pause").textContent = "▶";
    });

    document.getElementById("btn-close-shop").addEventListener("click", () => {
        document.getElementById("shop-modal").classList.add("hidden");
        if (window.gameAPI) window.gameAPI.enableInput();
        document.getElementById("btn-pause").textContent = "⏸";
    });

    document.getElementById("btn-rules").addEventListener("click", () => {
        document.getElementById("rules-modal").classList.remove("hidden");
        if (window.gameAPI) {
            window.gameAPI.disableInput();
            document.getElementById("btn-pause").textContent = "▶";
        }
    });

    document.getElementById("btn-close-rules").addEventListener("click", () => {
        document.getElementById("rules-modal").classList.add("hidden");
        if (window.gameAPI) {
            window.gameAPI.enableInput();
            document.getElementById("btn-pause").textContent = "⏸";
        }
    });

    document.getElementById("btn-exit").addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите выйти?")) {
            if (typeof k !== 'undefined' && k.quit) k.quit();
            const gameContainer = document.getElementById("game");
            gameContainer.innerHTML = `
                <div style="padding: 60px; color: white; font-size: 20px; text-align: center;">
                    <p style="font-size: 32px; margin-bottom: 20px;">Игра завершена!</p>
                    <button onclick="location.reload()" style="padding: 12px 30px; font-size: 16px; background: #301ba8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">🔄 Начать заново</button>
                </div>
            `;
            document.getElementById("ui-panel").style.display = "none";
        }
    });

    document.getElementById("btn-restart").addEventListener("click", () => {
        location.reload();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (!document.getElementById("shop-modal").classList.contains("hidden")) {
                document.getElementById("btn-close-shop").click();
            } else if (!document.getElementById("rules-modal").classList.contains("hidden")) {
                document.getElementById("btn-close-rules").click();
            } else if (!document.getElementById("gameover-modal").classList.contains("hidden")) {
                document.getElementById("btn-restart").click();
            } else {
                document.getElementById("btn-pause").click();
            }
        }
    });
});