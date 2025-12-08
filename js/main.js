
// main.js
import { ThemeManager } from './themeManager.js';
import { LanguageManager } from './languageManager.js';
import { MessageManager } from './messageManager.js';
import { MapManager } from './mapManager.js';
import { autoFormatBirthdate } from "./utils.js";
import { UIHelpers } from './uiHelpers.js';
import { NumerologyManager } from './numerologyManager.js';
import { ShareManager } from './shareManager.js';

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

    const shareManager = new ShareManager();
    shareManager.init();
    console.log("ShareManager initialized ✅");

    const numerologyManager = new NumerologyManager(ui);
    console.log("NumerologyManager initialized ✅");
    ui.numerology = numerologyManager; // Link back
    ui.initInputEvents();

    console.log("App initialized ✅");
});
