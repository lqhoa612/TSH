
// main.js
import { ThemeManager } from './themeManager.js';
import { LanguageManager } from './languageManager.js';
import { MessageManager } from './messageManager.js';
import { MapManager } from './mapManager.js';
import { autoFormatBirthdate } from "./utils.js";
import { UIHelpers } from './uiHelpers.js';
import { NumerologyManager } from './numerologyManager.js';
import { ShareManager } from './shareManager.js';
import { SaveDataManager } from './saveData.js';

// Add event listener when the DOM content is loaded --->
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM Elements
    const theme = new ThemeManager();
    theme.init();

    const language = new LanguageManager();
    language.init();

    const message = new MessageManager(language);
    message.init();

    const map = new MapManager(language);
    map.init();

    autoFormatBirthdate();
    console.log("Utils initialized ✅");

    const ui = new UIHelpers();
    console.log("UIHelpers initialized ✅");
    ui.initHowToOverlay();
    ui.initMobileDayToggle();
    ui.enableMapScroll();


    const shareManager = new ShareManager(language);
    shareManager.ui = ui;
    shareManager.init();

    const numerologyManager = new NumerologyManager(ui);
    console.log("NumerologyManager initialized ✅");
    ui.numerology = numerologyManager; // Link back
    ui.initInputEvents();

    const saveData = new SaveDataManager();
    saveData.init();

    console.log("App initialized ✅");
});
