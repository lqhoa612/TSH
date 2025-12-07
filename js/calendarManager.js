// calendarManager.js
import { reduceToSingleDigit } from "./utils.js";
import { LanguageManager } from "./languageManager.js";
import { clearUI } from "./uiClearmanager.js"

export class CalendarManager {

    constructor() {
        this.container = document.getElementById("personalCalendar");
        this.languageManager = new LanguageManager();
        if (this.languageManager.getLanguage() == null) {
            this.languageManager.currentLanguage = 'en';
        }
    }

    calendarHandler() {
        const namcanhanBtn = document.getElementById("namcanhanBtn");
        const thangcanhanBtn = document.getElementById("thangcanhanBtn");

        if (namcanhanBtn) {
            namcanhanBtn.addEventListener("click", () => {
                this.displayPersonalYearCalendar();
            });
        }

        if (thangcanhanBtn) {
            thangcanhanBtn.addEventListener("click", () => {
                this.displayPersonalMonthCalendar();
            });
        }
    }

    // ---------------------------------------------------
    // PERSONAL YEAR CALENDAR
    // ---------------------------------------------------
    displayPersonalYearCalendar() {
        clearUI();
        const namcanhan = parseInt(document.getElementById("namcanhan").textContent);

        if (isNaN(namcanhan)) {
            console.error("Personal year unavailable.");
            return;
        }

        const language = this.languageManager.getLanguage();
        const today = new Date();
        const year = today.getFullYear();
        const currentMonth = today.getMonth() + 1;

        // TITLE
        const title = document.createElement("h3");
        title.textContent = language === "en"
            ? `Personal Months for ${year} (Personal Year: ${namcanhan})`
            : `Tháng cá nhân trong năm ${year} (Năm cá nhân: ${namcanhan})`;

        this.container.appendChild(title);

        // LEGEND
        this.appendLegend(language);

        // LIST
        const list = this.generatePersonalYearList(namcanhan, language, year, currentMonth);
        this.container.appendChild(list);
    }

    appendLegend(language) {
        const legend = document.createElement("div");
        legend.id = "personalMonthLegend";
        legend.className = "personal-month-card";

        const monthTxt = language === "en" ? "MONTH" : "THÁNG";
        const personalTxt = language === "en" ? "PERSONAL MONTH" : "THÁNG CÁ NHÂN";

        legend.innerHTML = `
            <span class="month-name">${monthTxt}</span>
            <span class="month-number">${personalTxt}</span>
        `;

        this.container.appendChild(legend);
    }

    generatePersonalYearList(namcanhan, language, year, currentMonth) {
        const list = document.createElement("div");
        list.id = "personalYearList";

        for (let m = 1; m <= 12; m++) {
            const reducedMonth = reduceToSingleDigit(m, false);
            const preReduced = namcanhan + reducedMonth;
            const personalMonth = reduceToSingleDigit(preReduced, false);

            const name = new Date(year, m - 1, 1)
                .toLocaleString(language, { month: "long" });

            const card = document.createElement("div");
            card.className = "personal-month-card";
            card.innerHTML = `
                <span class="month-name">${name}</span>
                <span class="month-number">${personalMonth}</span>
            `;

            if (m === currentMonth) card.classList.add("current-month-row");
            list.appendChild(card);
        }

        return list;
    }

    // ---------------------------------------------------
    // PERSONAL MONTH CALENDAR
    // ---------------------------------------------------
    displayPersonalMonthCalendar() {
        clearUI();
        const thangcanhan = parseInt(document.getElementById("thangcanhan").textContent);
        if (isNaN(thangcanhan)) return;

        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const day = now.getDate();

        const language = this.languageManager.getLanguage();
        const monthName = new Date(y, m, 1).toLocaleString(language, { month: "long" });

        // TITLE
        const header = document.createElement("h3");
        header.textContent = language === "en"
            ? `Personal Day Calendar for ${monthName} (Personal Month: ${thangcanhan})`
            : `Lịch Ngày Cá Nhân trong tháng ${m + 1} (Tháng cá nhân: ${thangcanhan})`;

        this.container.appendChild(header);

        // GRID
        const grid = this.generatePersonalMonthGrid(y, m, day, thangcanhan);
        this.container.appendChild(grid);

        enableMobileDayToggle();
    }

    generatePersonalMonthGrid(year, month, today, thangcanhan) {
        const first = new Date(year, month, 1);
        const last = new Date(year, month + 1, 0);

        const days = last.getDate();
        const startDay = (first.getDay() + 6) % 7; // Monday=0

        const grid = document.createElement("div");
        grid.className = "personal-day-calendar";

        const lang = this.languageManager.getLanguage();
        const daysOfWeek = lang === "en"
            ? ["M", "T", "W", "T", "F", "S", "S"]
            : ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

        // Headers
        daysOfWeek.forEach(d => {
            const h = document.createElement("div");
            h.className = "day-header";
            h.textContent = d;
            grid.appendChild(h);
        });

        // Empty pre-cells
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement("div");
            empty.className = "day-cell empty";
            grid.appendChild(empty);
        }

        // Days
        let personalDay = reduceToSingleDigit(thangcanhan + 1, false);

        for (let d = 1; d <= days; d++) {
            const cell = document.createElement("div");
            cell.className = "day-cell";

            if (d === today) cell.classList.add("today");

            const dateEl = document.createElement("div");
            dateEl.className = "day-number";
            dateEl.textContent = d;

            const pEl = document.createElement("div");
            pEl.className = "personal-day";
            pEl.textContent = personalDay;

            cell.appendChild(dateEl);
            cell.appendChild(pEl);
            grid.appendChild(cell);

            personalDay++;
            if (personalDay > 9) personalDay = 1;
        }

        return grid;
    }

    enableMobileDayToggle() {
        const cells = document.querySelectorAll('.day-cell');

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                // remove from others first
                cells.forEach(c => c.classList.remove('active'));

                // toggle on this one
                cell.classList.add('active');
            });
        });
    }

}
