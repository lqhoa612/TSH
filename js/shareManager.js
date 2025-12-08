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

        // Toggle menu open/close
        this.shareBtn.addEventListener("click", () =>
            this.shareMenu.classList.toggle("show-menu")
        );

        // Hide when clicking outside
        document.addEventListener("click", (e) => {
            if (!this.shareBtn.contains(e.target) && !this.shareMenu.contains(e.target)) {
                this.shareMenu.classList.remove("show-menu");
            }
        });

        // Download handler
        this.actionDownload.addEventListener("click", () => this.downloadPDF());

        // Share handler
        this.actionShare.addEventListener("click", () => this.sharePDF());

        console.log("ShareManager initialized ✅");
    }

    downloadPDF() {
        const { blob, filename } = PDFGenerator.generate();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        this.shareMenu.classList.remove("show-menu");
    }

    async sharePDF() {
        const { blob, filename } = PDFGenerator.generate();
        const file = new File([blob], filename, { type: "application/pdf" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: "Numerology Result",
                text: "Here is my numerology report!",
                files: [file]
            });
        } else {
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            alert("Your PDF opened in a new tab. Save and share manually.");
        }

        this.shareMenu.classList.remove("show-menu");
    }
}
