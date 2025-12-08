// shareManager.js
import { PDFGenerator } from './pdfGenerator.js';

export class ShareManager {
    constructor() {
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
                alert("Please generate your numerology report first.");
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
    downloadPDF() {
        const { blob, filename } = PDFGenerator.generate();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        this.shareMenu.classList.remove("show-menu");
    }

    // ---- SHARE PDF ----
    async sharePDF() {
        if (!this.hasResults()) {
            alert("Please generate your numerology report first.");
            return;
        }

        const { blob, filename } = PDFGenerator.generate();
        const file = new File([blob], filename, { type: "application/pdf" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: "Pythagorean Numerology Calculator TSH Report",
                text: "Here is my numerology report from Pythagorean Numerology Calculator TSH.",
                files: [file]
            });
        } else {
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            alert("PDF opened in a new tab. Save and share manually.");
        }

        this.shareMenu.classList.remove("show-menu");
    }
}
