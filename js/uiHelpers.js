// uiHelpers.js
import { ResultCardManager } from "./ui/ResultCardManager.js";
import { RESULT_SCHEMA } from "./config/resultSchema.js";
import { LanguageManager } from "./languageManager.js";

export class UIHelpers {
    constructor(numerologyManager) {
        this.numerology = numerologyManager;
        this.resultCards = new ResultCardManager('result-cards-container');
        this.languages = new LanguageManager();
    }

    initInputEvents() {
        const calcBtn = document.getElementById("calculateBtn");
        const nameInput = document.getElementById("name");
        const birthInput = document.getElementById("birthdate");

        if (calcBtn) {
            calcBtn.addEventListener("click", () => {
                this.numerology.calculateFromInputs();
                this.resultCards.render(RESULT_SCHEMA);
                document.dispatchEvent(new Event('ui:updated'));
                this.resultCards.enableCollapse();
            });
        }

        // Press ENTER inside name field triggers calculation
        if (nameInput) {
            nameInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    this.numerology.calculateFromInputs();
                }
            });
        }

        // Press ENTER inside birthdate input also triggers calculation
        if (birthInput) {
            birthInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    this.numerology.calculateFromInputs();
                }
            });
        }
    }

    initHowToOverlay() {
        const howToBtn = document.getElementById("howToBtn");
        const overlay = document.getElementById("howToOverlay");
        const closeBtn = document.getElementById("closeHowTo");

        const freezeScreen = (state) => {
            if (state) {
                document.body.classList.add("no-scroll");
            } else {
                document.body.classList.remove("no-scroll");
            }
        };

        const toggleOverlay = () => {
            const isOn = overlay.style.display === "flex";
            if (isOn) {
                overlay.style.display = "none";
                freezeScreen(false);
            } else {
                overlay.style.display = "flex";
                freezeScreen(true);
            }
        };

        howToBtn.addEventListener("click", toggleOverlay);
        closeBtn.addEventListener("click", toggleOverlay);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) toggleOverlay();
        });

        overlay.style.display = "none";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
    }

    // Show skeleton loaders on result buttons
    showResultSkeleton() {
        this._skeletonStart = performance.now();

        document.querySelectorAll(
            "#index-container .index-button, #index-container .index-button-visual"
        ).forEach(el => {
            el.classList.add("skeleton");
            el.classList.remove("skeleton-fade-out");
            el.style.opacity = "";
        });
    }

    hideResultSkeleton(minDuration = 250, fadeDuration = 250) {
        const elapsed = performance.now() - (this._skeletonStart || 0);
        const wait = Math.max(0, minDuration - elapsed);

        setTimeout(() => {
            const nodes = document.querySelectorAll(
                "#index-container .index-button, #index-container .index-button-visual"
            );

            // 1. Fade skeleton out
            nodes.forEach(el => el.classList.add("skeleton-fade-out"));

            // 2. Remove skeleton AFTER fade completes
            setTimeout(() => {
                nodes.forEach(el => {
                    el.classList.remove("skeleton", "skeleton-fade-out");
                    el.style.opacity = "";
                });
            }, fadeDuration);

        }, wait);
    }

    // Spinner for PDF generation
    showSpinner(languageManager, minDuration = 1000) {
        this.setRandomSpinnerText(languageManager);

        const spinner = document.getElementById("loadingSpinner");
        if (!spinner) return Promise.resolve();

        document.body.classList.add("spinner-active");
        spinner.classList.remove("visually-hidden");
        const start = performance.now();

        // Return a promise that resolves only after minDuration
        return new Promise(resolve => {
            const elapsed = performance.now() - start;
            const remaining = Math.max(0, minDuration - elapsed);
            setTimeout(resolve, remaining);
        });
    }

    hideSpinner() {
        const spinner = document.getElementById("loadingSpinner");
        spinner?.classList.add("visually-hidden");
        document.body.classList.remove("spinner-active");
    }

    setRandomSpinnerText(languageManager) {
        const el = document.getElementById("spinnerText");
        if (!el || !languageManager) return;

        const lang = languageManager.languages[languageManager.currentLanguage];
        const texts = lang?.spinnerTexts;

        if (!Array.isArray(texts) || texts.length === 0) {
            el.textContent = "Loading…";
            return;
        }

        el.textContent = texts[Math.floor(Math.random() * texts.length)];
    }

    toggleDropdown(id) {
        const element = document.getElementById(id);
        // const dropdown = document.getElementById('dropdown');
        if (!element) return;
        element.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
    }

    initMobileDayToggle() {
        const isMobile = window.matchMedia("(max-width: 550px)").matches;
        if (!isMobile) return;

        const cells = document.querySelectorAll(".day-cell");

        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                cell.classList.toggle("active");
            });
        });
    }

    displayResults(results) {
        const set = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        };

        set('fullname', results.rawName);
        set('birthdate2', results.birthdate);
        set('currentDate', results.currentDateFormatted);

        set('duongdoi', results.duongdoi);
        set('sumenh', results.sumenh);
        set('LKDgdoiSumenh', results.LKDgdoiSumenh);
        set('truongthanh', results.truongthanh);
        set('linhhon', results.linhhon);
        set('nhancach', results.nhancach);
        set('LKLinhhonNhancach', results.LKLinhhonNhancach);
        set('canbang', results.canbang);
        set('tuduylytri', results.tuduylytri);
        set('sucmanhtiemthuc', results.sucmanhtiemthuc);
        set('sothieu', results.sothieu);
        set('ngaysinh', results.ngaysinhIndex);
        set('damme', results.damme);

        set('namcanhan', results.namcanhan);
        set('thangcanhan', results.thangcanhan);
        set('ngaycanhan', results.ngaycanhan);

        set('chang', results.chang?.join(', ') || '');
        set('tuoi', results.tuoi?.join(', ') || '');
        set('thachthuc', results.thachthuc?.join(', ') || '');
    }
}