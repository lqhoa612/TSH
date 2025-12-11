// messageManager.js
import { clearUI } from "./uiClearmanager.js";
import { CalendarManager } from "./calendarManager.js"

export class MessageManager {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.languages = languageManager.languages;
        this.currentLanguage = languageManager.getLanguage();

        this.calendarManager = new CalendarManager();

        // message containers
        this.messageContainer = document.getElementById("messages");

        // optional bottom heading (if used)
        this.bottomHead = document.getElementById('bottomHead');

        // track which button’s messages are being shown
        this.lastButtonId = null;
    }

    init() {
        this.setupButtonListeners();
        this.handleLanguageChange();
        this.calendarManager.calendarHandler();

        console.log("MessageManager initialized ✅");
    }

    setupButtonListeners() {
        const container = document.getElementById('index-container');
        if (!container) {
            console.warn('⚠️ MessageManager: #index-container not found.');
            return;
        }

        container.addEventListener('click', (event) => {
            const button = event.target.closest('.index-button');
            if (!button) return;
            clearUI();
            this.lastButtonId = button.id;
            this.displayMessage(button.id);
        });
    }

    handleLanguageChange() {
        document.addEventListener('languageChanged', (event) => {
            this.currentLanguage = event.detail.lang || this.languageManager.getLanguage();

            // retranslate active messages dynamically
            if (this.lastButtonId) {
                this.displayMessage(this.lastButtonId);
            }
        });
    }

    displayMessage(buttonId) {
        const lang = this.languageManager.getLanguage();
        const dict = this.languages[lang] || this.languages['en'];
        const messages = dict.buttonMessages?.[buttonId];

        if (!messages || !Array.isArray(messages)) return;

        // Clear old messages
        this.messageContainer.innerHTML = '';

        // Add new messages
        messages.forEach(msg => {
            const p = document.createElement("p");
            p.textContent = msg;
            this.messageContainer.appendChild(p);
        });

        // Optional bottom heading
        if (this.bottomHead && dict.buttonMessageHead && dict.buttonMessageHead[buttonId]) {
            this.bottomHead.textContent = dict.buttonMessageHead[buttonId];
        }
    }
}