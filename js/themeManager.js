// js/themeManager.js
export class ThemeManager {
    constructor(buttonSelector = "#themeToggleBtn") {
        this.button = document.querySelector(buttonSelector);
        this.root = document.documentElement; // <html>
    }

    init() {
        if (!this.button) return;

        // Load saved theme (default = light)
        const saved = sessionStorage.getItem("theme") || "light";
        this.applyTheme(saved);

        // Toggle theme on click
        this.button.addEventListener("click", () => {
            const newTheme = this.root.dataset.theme === "dark" ? "light" : "dark";
            this.applyTheme(newTheme);
            sessionStorage.setItem("theme", newTheme);
        });

        console.log("ThemeManager initialized ✅");
    }

    applyTheme(theme) {
        if (theme === "dark") {
            this.root.setAttribute("data-theme", "dark");
            this.button.textContent = "🌙"; // dark icon
        } else {
            this.root.removeAttribute("data-theme"); // fallback to light
            this.button.textContent = "☀️"; // light icon
        }
    }
}
