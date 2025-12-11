// languageManager.js
import { english } from './languages/english.js';
import { vietnamese } from './languages/vietnamese.js';

export class LanguageManager {
    constructor(defaultLanguage = 'en') {
        this.languages = { en: english, vi: vietnamese };
        this.currentLanguage = defaultLanguage;
        this.translateElements = null;
        this.placeholderElements = null;
    }

    init() {
        this.loadSavedLanguage();
        this.applyTranslations(this.currentLanguage, false);
        this.setupLanguageSelector();

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

    applyTranslations(languageCode, dispatch = true) {
        const dictionary = this.languages[languageCode] || this.languages['en'];

        if (!this.translateElements) this.translateElements = [...document.querySelectorAll('[data-translate]')];
        if (!this.placeholderElements) this.placeholderElements = [...document.querySelectorAll('[data-placeholder]')];

        // Normal text content (for <p>, <button>, etc.)
        this.translateElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translateValue = dictionary[key];
            if (translateValue && element.textContent !== translateValue) element.textContent = translateValue;
        });

        // Apply placeholders for inputs
        this.placeholderElements.forEach(element => {
            const path = element.getAttribute('data-placeholder'); // e.g. "placeholders.name"
            const placeholderValue = this.resolvePath(dictionary, path);
            if (placeholderValue && element.placeholder !== placeholderValue) element.placeholder = placeholderValue;
        });

        if (dispatch) {
            // Notify listeners about language change
            document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: languageCode } }));
        }
    }

    resolvePath(obj, path) {
        if (!path) return undefined;
        return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
    }

    getLanguage() {
        return this.currentLanguage;
    }
}
