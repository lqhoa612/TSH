// messageManager.js
import { clearUI } from "./uiClearManager.js";
import { CalendarManager } from "./calendarManager.js"

export class MessageManager {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.languages = languageManager.languages;
        this.currentLanguage = languageManager.getLanguage();

        this.calendarManager = new CalendarManager();

        // message containers (#message1 to #message4)
        this.messageElements = [
            document.getElementById('message1'),
            document.getElementById('message2'),
            document.getElementById('message3'),
            document.getElementById('message4')
        ];

        // optional bottom heading (if used)
        this.bottomHead = document.getElementById('bottomHead');

        // track which button’s messages are being shown
        this.lastButtonId = null;
    }

    init() {
        this.setupButtonListeners();
        this.handleLanguageChange();
        this.calendarManager.calendarHandler();
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

        if (!messages || !Array.isArray(messages)) {
            // console.warn(`⚠️ No message set defined for button "${buttonId}" in ${lang}.`);
            return;
        }

        window.requestAnimationFrame(() => {
            this.messageElements.forEach((el, i) => {
                if (!el) return;
                el.textContent = messages[i] || '';
            });
        });

        // optional: heading above messages
        if (this.bottomHead && dict.buttonMessageHead && dict.buttonMessageHead[buttonId]) {
            this.bottomHead.textContent = dict.buttonMessageHead[buttonId];
        }

        // display up to 4 messages
        this.messageElements.forEach((el, i) => {
            if (!el) return;
            el.textContent = messages[i] || '';
        });
    }
}