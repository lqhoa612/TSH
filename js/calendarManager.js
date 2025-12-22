// calendarManager.js
import { reduceToSingleDigit } from "./utils.js";
import { LanguageManager } from "./languageManager.js";
import { clearUI } from "./uiClearmanager.js";

export class CalendarManager {

    constructor() {
        this.container = document.getElementById("personalCalendar");
        this.languageManager = new LanguageManager();

        if (!this.languageManager.getLanguage()) {
            this.languageManager.currentLanguage = "en";
        }

        const today = new Date();
        this.state = {
            year: today.getFullYear(),
            month: today.getMonth(), // 0–11
            today
        };

        this.overlayMode = null;
        this.ignoreOutsideClose = false;
    }

    init() {
        const calculateBtn = document.getElementById("calculateBtn");

        calculateBtn.addEventListener("click", () => {
            // allow numerology calculations to complete first
            setTimeout(() => {
                this.showAndRender();
            }, 0);
        });
    }

    // --------------------------------------------------
    // CORE RENDER
    // --------------------------------------------------
    renderUnifiedCalendar(direction = null) {
        if (!this.container) {
            this.container = document.getElementById("personalCalendar");
        }

        this.container.innerHTML = "";

        const gridWrapper = document.createElement("div");
        gridWrapper.className = "calendar-card";

        const header = this.renderHeader(this.state.year, this.state.month);
        const grid = this.renderDayGrid(this.state.year, this.state.month);

        if (direction) {
            grid.classList.add(direction === "next" ? "enter-right" : "enter-left");
        }

        gridWrapper.appendChild(header);

        if (this.overlayMode) {
            gridWrapper.appendChild(this.renderOverlay());
        }

        gridWrapper.appendChild(grid);
        this.container.appendChild(gridWrapper);
    }

    renderOverlay() {
        const overlay = document.createElement("div");
        overlay.className = "calendar-overlay";

        if (this.overlayMode === "month") {
            overlay.appendChild(this.renderMonthGrid(this.state.year));
        }

        if (this.overlayMode === "year") {
            overlay.appendChild(this.renderYearGrid());
        }

        this.bindOutsideClick(overlay);

        requestAnimationFrame(() => {
            if (this.overlayMode === "year") {
                const current = overlay.querySelector('[data-current="true"]');
                if (current) {
                    current.scrollIntoView({
                        block: "center",
                        behavior: "instant"
                    });
                }
            }
        });

        return overlay;
    }

    renderMonthGrid(year) {
        const lang = this.languageManager.getLanguage();
        const grid = document.createElement("div");
        grid.className = "month-grid";

        const birth = this.getBirthDate();

        for (let m = 0; m < 12; m++) {
            const name = new Date(year, m, 1).toLocaleString(lang, { month: "short" });
            const btn = document.createElement("button");
            btn.textContent = name;

            if (m === this.state.month) {
                btn.classList.add("active");
            }

            const target = new Date(year, m, 1);
            if (birth && target < new Date(birth.getFullYear(), birth.getMonth(), 1)) {
                btn.disabled = true;
            }

            btn.addEventListener("click", (e) => {
                this.clearActiveDay();
                e.stopPropagation(); // CRITICAL
                if (this.activeCloseHandler) {
                    document.removeEventListener("click", this.activeCloseHandler);
                    this.activeCloseHandler = null;
                }
                this.overlayMode = null;
                if (m !== undefined) this.state.month = m;
                this.renderUnifiedCalendar("next");
            });

            grid.appendChild(btn);
        }

        const yearBtn = document.createElement("button");
        yearBtn.className = "year-switch";
        yearBtn.textContent = this.state.year;

        yearBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // ◀ ADD THIS LINE
            this.overlayMode = "year";
            this.renderUnifiedCalendar();
        });

        grid.appendChild(yearBtn);
        return grid;
    }

    renderYearGrid() {
        const grid = document.createElement("div");
        grid.className = "year-grid";

        const birth = this.getBirthDate();
        const startYear = birth ? birth.getFullYear() : this.state.year - 100;
        const endYear = this.state.year + 100;

        for (let y = startYear; y <= endYear; y++) {
            const btn = document.createElement("button");
            btn.textContent = y;

            if (y === this.state.year) {
                btn.classList.add("active");
                btn.dataset.current = "true";
            }

            btn.addEventListener("click", (e) => {
                this.clearActiveDay();
                e.stopPropagation(); // CRITICAL
                if (this.activeCloseHandler) {
                    document.removeEventListener("click", this.activeCloseHandler);
                    this.activeCloseHandler = null;
                }
                this.overlayMode = null;
                if (y !== undefined) this.state.year = y;
                this.renderUnifiedCalendar("next");
            });

            grid.appendChild(btn);
        }

        return grid;
    }

    bindOutsideClick(overlayEl) {
        // 1. If there's an old listener still hanging around, kill it now
        if (this.activeCloseHandler) {
            document.removeEventListener("click", this.activeCloseHandler);
        }

        // 2. Define the new listener
        this.activeCloseHandler = (e) => {
            const isHeader = e.target.closest(".calendar-header");
            const isOverlay = overlayEl.contains(e.target);

            if (!isHeader && !isOverlay) {
                this.overlayMode = null;
                // Clean up before re-rendering
                document.removeEventListener("click", this.activeCloseHandler);
                this.activeCloseHandler = null;
                this.renderUnifiedCalendar();
            }
        };

        // 3. Attach it with a tiny delay
        setTimeout(() => {
            document.addEventListener("click", this.activeCloseHandler);
        }, 10);
    }

    showAndRender() {
        this.container.classList.add("active");
        this.renderUnifiedCalendar();
    }

    // --------------------------------------------------
    // HEADER
    // --------------------------------------------------
    renderHeader(year, month) {
        const lang = this.languageManager.getLanguage();

        const systemMonthName = new Date(year, month, 1)
            .toLocaleString(lang, { month: "long", year: "numeric" });


        const birthText = document.getElementById("birthdate2")?.textContent;
        const [birthDay, birthMonth, birthYear] = birthText.split("/").map(Number);
        const reducedYear = reduceToSingleDigit(year, false);
        const reducedBirthMonthDay = reduceToSingleDigit(birthMonth + birthDay, false);
        const personalYear = reduceToSingleDigit(reducedYear + reducedBirthMonthDay, false);
        const reducedMonth = reduceToSingleDigit(month + 1, false);
        const personalMonth = reduceToSingleDigit(personalYear + reducedMonth, false);

        const header = document.createElement("div");
        header.className = "calendar-header";

        header.innerHTML = `
            <div class="calendar-titles">
                <div class="system-title clickable" id="monthToggle">${systemMonthName}</div>
                <div class="personal-title">
                    ${lang === "en" ? "Personal:" : "Cá nhân:"}
                    ${lang === "en" ? "Year" : "Năm"} ${personalYear} ·
                    ${lang === "en" ? "Month" : "Tháng"} ${personalMonth}
                </div>
            </div>
            <div class="calendar-nav">
                <button class="nav-btn" data-dir="prev">◀</button>
                <button class="nav-btn" data-dir="next">▶</button>
            </div>
        `;

        header.querySelectorAll(".nav-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const dir = btn.dataset.dir;
                const newMonth = dir === "next" ? month + 1 : month - 1;
                const newDate = new Date(year, newMonth, 1);

                if (this.isBeforeBirth(newDate)) return;

                this.state.year = newDate.getFullYear();
                this.state.month = newDate.getMonth();
                this.renderUnifiedCalendar(dir);
            });
        });

        header.querySelector("#monthToggle").addEventListener("click", (e) => {
            e.stopPropagation();
            this.overlayMode = this.overlayMode === "month" ? null : "month";
            this.renderUnifiedCalendar();
        });

        return header;
    }

    // --------------------------------------------------
    // DAY GRID
    // --------------------------------------------------
    renderDayGrid(year, month) {
        document.querySelectorAll(".day-cell.active").forEach(c => c.classList.remove("active"));

        const lang = this.languageManager.getLanguage();
        const grid = document.createElement("div");
        grid.className = "calendar-grid";

        const daysOfWeek = lang === "en"
            ? ["M", "T", "W", "T", "F", "S", "S"]
            : ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

        daysOfWeek.forEach(d => {
            const h = document.createElement("div");
            h.className = "day-header";
            h.textContent = d;
            grid.appendChild(h);
        });

        const first = new Date(year, month, 1);
        const last = new Date(year, month + 1, 0);
        const startDay = (first.getDay() + 6) % 7;

        for (let i = 0; i < startDay; i++) {
            grid.appendChild(this.emptyCell());
        }

        const birthText = document.getElementById("birthdate2")?.textContent;
        const [birthDay, birthMonth, birthYear] = birthText.split("/").map(Number);
        const reducedYear = reduceToSingleDigit(year, false);
        const reducedBirthMonthDay = reduceToSingleDigit(birthMonth + birthDay, false);
        const personalYear = reduceToSingleDigit(reducedYear + reducedBirthMonthDay, false);
        const reducedMonth = reduceToSingleDigit(month + 1, false);
        const personalMonth = reduceToSingleDigit(personalYear + reducedMonth, false);

        for (let d = 1; d <= last.getDate(); d++) {
            const cell = document.createElement("div");
            cell.className = "day-cell";

            const date = new Date(year, month, d);
            if (this.isToday(date)) cell.classList.add("today");

            const systemEl = document.createElement("div");
            systemEl.className = "system-day";
            systemEl.textContent = d;

            const personalEl = document.createElement("div");
            personalEl.className = "personal-day";
            personalEl.textContent = reduceToSingleDigit(
                personalMonth + reduceToSingleDigit(d, false),
                false
            );

            cell.appendChild(systemEl);
            cell.appendChild(personalEl);
            grid.appendChild(cell);

            // mobile toggle
            cell.addEventListener("click", () => {
                document
                    .querySelectorAll(".day-cell.active")
                    .forEach(c => c.classList.remove("active"));
                cell.classList.add("active");
            });
        }

        return grid;
    }

    emptyCell() {
        const div = document.createElement("div");
        div.className = "day-cell empty";
        return div;
    }

    // --------------------------------------------------
    // HELPERS
    // --------------------------------------------------
    isToday(date) {
        const t = this.state.today;
        return (
            date.getDate() === t.getDate() &&
            date.getMonth() === t.getMonth() &&
            date.getFullYear() === t.getFullYear()
        );
    }

    isBeforeBirth(date) {
        const birthText = document.getElementById("birthdate2")?.textContent;
        if (!birthText) return false;

        const [d, m, y] = birthText.split("/").map(Number);
        const birth = new Date(y, m - 1, d);

        return date < new Date(birth.getFullYear(), birth.getMonth(), 1);
    }

    getBirthDate() {
        const text = document.getElementById("birthdate2")?.textContent;
        if (!text) return null;
        const [d, m, y] = text.split("/").map(Number);
        return new Date(y, m - 1, d);
    }

    clearActiveDay() {
        this.activeDay = null;
    }
}