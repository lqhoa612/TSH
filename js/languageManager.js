// languageManager.js
import { english } from './languages/english.js';
import { vietnamese } from './languages/vietnamese.js';

export class LanguageManager {
    constructor(defaultLanguage = 'en') {
        this.languages = { en: english, vi: vietnamese };
        this.currentLanguage = defaultLanguage;
    }

    init() {
        this.detectBrowserLanguage();
        this.applyTranslations(this.currentLanguage, false);
        this.setupLanguageSelector();

        // 🔑 React to dynamic UI updates
        document.addEventListener('ui:updated', () => {
            this.applyTranslations(this.currentLanguage, false);
        });

        console.log("LanguageManager initialized ✅");
    }


    setupLanguageSelector() {
        // Floating toggle button
        const toggleBtn = document.getElementById('languageToggleBtn');
        const flagIcon = document.getElementById('flagIcon');

        if (!toggleBtn) return;

        // Initialize correct icon
        flagIcon.src = this.currentLanguage === "en" ? "flags/en.svg" : "flags/vi.svg";

        toggleBtn.addEventListener("click", () => {
            // Swap language
            this.currentLanguage = (this.currentLanguage === "en") ? "vi" : "en";

            // Save
            localStorage.setItem("language", this.currentLanguage);

            // Update flag icon
            flagIcon.src = this.currentLanguage === "en" ? "flags/en.svg" : "flags/vi.svg";

            // Apply translations
            this.applyTranslations(this.currentLanguage);

            // Notify other managers
            document.dispatchEvent(
                new CustomEvent("languageChanged", { detail: { lang: this.currentLanguage } })
            );
        });
    }

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && this.languages[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }
    }

    applyTranslations(languageCode = this.currentLanguage, dispatch = true) {
        const dictionary = this.languages[languageCode] || this.languages['en'];

        // Always query fresh DOM
        const translateElements = document.querySelectorAll('[data-translate]');
        const placeholderElements = document.querySelectorAll('[data-placeholder]');

        translateElements.forEach(element => {
            const key = element.dataset.translate;
            const value = dictionary[key];
            if (value) element.textContent = value;
        });

        placeholderElements.forEach(element => {
            const path = element.dataset.placeholder;
            const value = this.resolvePath(dictionary, path);
            if (value) element.placeholder = value;
        });

        if (dispatch) {
            document.dispatchEvent(
                new CustomEvent('languageChanged', { detail: { lang: languageCode } })
            );
        }
    }

    resolvePath(obj, path) {
        if (!path) return undefined;
        return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
    }

    getLanguage() {
        return this.currentLanguage;
    }

    detectBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage || "en";
        const short = lang.substring(0, 2).toLowerCase();

        const supported = ["en", "vi"];

        if (supported.includes(short)) {
            this.currentLanguage = short;
        } else {
            this.currentLanguage = "en"; // fallback
        }
    }
}
