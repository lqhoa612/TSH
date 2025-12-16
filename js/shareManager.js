// shareManager.js
import { PDFGenerator } from './pdfGenerator.js';

export class ShareManager {
    constructor(languageManager) {
        this.language = languageManager;
        this.shareBtn = document.getElementById("shareBtn");
        this.shareMenu = document.getElementById("shareMenu");
        this.actionShare = document.getElementById("actionShare");
        this.actionDownload = document.getElementById("actionDownload");
    }

    init() {
        if (!this.shareBtn || !this.shareMenu) {
            console.warn("ShareManager: UI elements missing.");
            return;
        }

        this.shareBtn.addEventListener("click", () => {
            if (!this.hasResults()) {
                alert(this.language.languages[this.language.currentLanguage].pdfNullWarning
                    || "Please generate your numerology report first.");
                return;
            }
            this.shareMenu.classList.toggle("show-menu");
        });

        // Hide when clicking outside
        document.addEventListener("click", (e) => {
            if (!this.shareBtn.contains(e.target) && !this.shareMenu.contains(e.target)) {
                this.shareMenu.classList.remove("show-menu");
            }
        });

        this.actionDownload.addEventListener("click", () => this.downloadPDF());
        this.actionShare.addEventListener("click", () => this.sharePDF());

        console.log("ShareManager initialized ✅");
    }

    // ---- CHECK IF RESULTS EXIST ----
    hasResults() {
        const name = document.getElementById("fullname")?.innerText.trim();
        const lifePath = document.getElementById("duongdoi")?.innerText.trim();

        // Require at least a name + 1 calculated value
        return name && name.length > 0 && lifePath && lifePath.length > 0;
    }

    // ---- DOWNLOAD PDF ----
    async downloadPDF() {
        this.shareMenu.classList.remove("show-menu");
        // 1. Show spinner and WAIT for it to finish
        await this.ui.showSpinner(this.language, 1500);
        // 2. Now start heavy work
        const { blob, filename } = PDFGenerator.generate(this.language);
        // 3. Hide spinner AFTER work
        this.ui.hideSpinner();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    // ---- SHARE PDF ----
    async sharePDF() {
        if (!this.hasResults()) {
            alert(
                this.language.languages[this.language.currentLanguage].pdfNullWarning
                || "Please generate your numerology report first."
            );
            return;
        }

        this.shareMenu.classList.remove("show-menu");

        // 1. Spinner first, fully
        await this.ui.showSpinner(this.language, 1500);

        // 2. Generate PDF only AFTER spinner finished
        const { blob, filename } = PDFGenerator.generate(this.language);
        const file = new File([blob], filename, { type: "application/pdf" });

        this.ui.hideSpinner();

        const t = key =>
            this.language.languages[this.language.currentLanguage][key] || key;

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: t("shareTitle"),
                text: t("shareText"),
                files: [file]
            });
        } else {
            window.open(URL.createObjectURL(blob), "_blank");
            alert(t("pdfOpenedTab"));
        }
    }
}