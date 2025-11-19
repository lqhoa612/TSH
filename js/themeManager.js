// js/themeManager.js
export class ThemeManager {
    constructor(buttonSelector = "#themeToggleBtn") {
        this.button = document.querySelector(buttonSelector);
        this.body = document.body;
    }

    init() {
        if (!this.button) return;

        const savedTheme = sessionStorage.getItem("theme");
        this.applyTheme(savedTheme === "old" ? "old" : "new");

        this.button.addEventListener("click", () => {
            const isOld = this.body.classList.toggle("old-theme");
            this.applyTheme(isOld ? "old" : "new");
            sessionStorage.setItem("theme", isOld ? "old" : "new");
        });
    }

    applyTheme(theme) {
        if (theme === "old") {
            this.body.classList.add("old-theme");
            this.button.textContent = "🌙";
        } else {
            this.body.classList.remove("old-theme");
            this.button.textContent = "☀️";
        }
    }
}