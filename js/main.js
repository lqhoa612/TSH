
// main.js
import { ThemeManager } from './themeManager.js';
import { LanguageManager } from './languageManager.js';
import { MessageManager } from './messageManager.js';
import { MapManager } from './mapManager.js';
import { autoFormatBirthdate, validateBirthdate } from "./utils.js";
import { UIHelpers } from './uiHelpers.js';
import { NumerologyManager } from './numerologyManager.js';
import { PDFGenerator } from './pdfGenerator.js';

// Add event listener when the DOM content is loaded --->
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM Elements
    const theme = new ThemeManager();
    theme.init();
    console.log("ThemeManager initialized ✅");

    const language = new LanguageManager('en');
    language.init();
    console.log("LanguageManager initialized ✅");

    const message = new MessageManager(language);
    message.init();
    console.log("MessageManager initialized ✅");

    const map = new MapManager(language);
    map.init();
    console.log("MapManager initialized ✅");

    autoFormatBirthdate();
    console.log("Utils initialized ✅");

    const ui = new UIHelpers();
    console.log("UIHelpers initialized ✅");
    ui.initHowToOverlay();
    ui.initMobileDayToggle();

    console.log("PDFGenerator initialized ✅");
    document.getElementById("downloadPdfBtn")
        .addEventListener("click", () => PDFGenerator.generate());

    const numerologyManager = new NumerologyManager(ui);
    console.log("NumerologyManager initialized ✅");
    ui.numerology = numerologyManager; // Link back
    ui.initInputEvents();

    console.log("App initialized ✅");
});
