// pdfGenerator.js
import { registerNotoSans } from "./fonts/NotoSans.js";

export class PDFGenerator {
    static generate(languageManager) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        registerNotoSans(doc);
        console.log(doc.getFontList());

        // Set default Unicode font
        doc.setFont("NotoSans", "normal");

        const accent = "#12ADAD";
        const labelFont = 9.5;
        const valueFont = 10;
        const leftX = 40;
        const rightX = 300;
        let y = 40;

        const t = key =>
            languageManager?.languages[languageManager.currentLanguage][key] || key;

        /* ---------------- LOGO ---------------- */
        const tshLogo = document.getElementById("tshLogo");
        if (tshLogo) {
            try {
                doc.addImage(tshLogo.src, "PNG", 500, 100, 60, 60);
            } catch { }
        }

        y += 70;

        /* ---------------- TITLE ---------------- */
        doc.setFont("NotoSans", "bold");
        doc.setFontSize(18);
        doc.text(t("pdfTitle") || "Numerology Report", leftX, y);
        y += 26;

        /* ----- BASIC INFO: Name / Birthdate / Date ----- */
        const fullname = document.getElementById("fullname")?.innerText || "";
        const birthdate = document.getElementById("birthdate2")?.innerText || "";
        const currentDate = document.getElementById("currentDate")?.innerText || "";

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(10);

        doc.text(`${t("fullnameLabel")}: ${fullname}`, leftX, y); y += 14;
        doc.text(`${t("birthdate2Label")}: ${birthdate}`, leftX, y); y += 14;
        doc.text(`${t("currentDateLabel")}: ${currentDate}`, leftX, y);
        y += 18;

        doc.setDrawColor(accent);
        doc.setLineWidth(1.5);
        doc.line(leftX, y, 555, y);
        y += 18;

        /* ---------------- FIELD SETS ---------------- */
        const fieldsLeft = [
            ["duongdoiLabel", "duongdoi"],
            ["sumenhLabel", "sumenh"],
            ["LKDgdoiSumenhLabel", "LKDgdoiSumenh"],
            ["truongthanhLabel", "truongthanh"],
            ["linhhonLabel", "linhhon"],
            ["nhancachLabel", "nhancach"],
            ["LKLinhhonNhancachLabel", "LKLinhhonNhancach"],
            ["canbangLabel", "canbang"],
            ["tuduylytriLabel", "tuduylytri"]
        ];

        const fieldsRight = [
            ["sucmanhtiemthucLabel", "sucmanhtiemthuc"],
            ["sothieuLabel", "sothieu"],
            ["ngaysinhLabel", "ngaysinh"],
            ["dammeLabel", "damme"],
            ["namcanhanLabel", "namcanhan"],
            ["thangcanhanLabel", "thangcanhan"],
            ["ngaycanhanLabel", "ngaycanhan"],
            ["changLabel", "chang"],
            ["tuoiLabel", "tuoi"],
            ["thachthucLabel", "thachthuc"]
        ];

        let leftY = y;
        let rightY = y;

        /* -------- FIELD DRAWER -------- */
        function drawField(label, value, x, cursorY) {
            if (!value) return cursorY;

            const columnWidth = 240;
            const valueColumnX = x + columnWidth;

            doc.setFont("NotoSans", "bold");
            doc.setFontSize(labelFont);
            doc.setTextColor("#000");

            const labelFull = label + ":";
            doc.text(labelFull, x, cursorY);

            const labelWidth = doc.getTextWidth(labelFull);

            // Dotted leaders
            const dotsStart = x + labelWidth + 8;
            const dotsEnd = valueColumnX - 25;

            doc.setDrawColor("#AAAAAA");
            doc.setLineWidth(0.2);
            for (let dx = dotsStart; dx < dotsEnd; dx += 3) {
                doc.line(dx, cursorY - 2, dx + 1, cursorY - 2);
            }

            // Value
            doc.setFont("NotoSans", "normal");
            doc.setFontSize(valueFont);
            doc.setTextColor("#000");
            doc.text(value, valueColumnX, cursorY, { align: "right" });

            return cursorY + 14;
        }

        fieldsLeft.forEach(([labelKey, id]) => {
            const value = document.getElementById(id)?.innerText?.trim();
            leftY = drawField(t(labelKey), value, leftX, leftY);
        });

        fieldsRight.forEach(([labelKey, id]) => {
            const value = document.getElementById(id)?.innerText?.trim();
            rightY = drawField(t(labelKey), value, rightX, rightY);
        });

        /* Vertical separator */
        const sepTop = y - 13;
        const sepBottom = Math.max(leftY, rightY);

        doc.setDrawColor("#CCCCCC");
        doc.setLineWidth(1);
        doc.line(290, sepTop, 290, sepBottom);

        /* ---------------- MAPS ---------------- */
        const mapTop = Math.max(leftY, rightY) + 30;
        const bothTitle = languageManager.languages === "en" ? "Birth & Combined Maps" : "Bản đồ Ngày Sinh & bản đồ Kết Hợp";
        const birthTitle = languageManager.languages === "en" ? "Birth Map" : "Bản đồ Ngày Sinh";
        const combinedTitle = languageManager.languages === "en" ? "Combined Map" : "Bản đồ Kết Hợp";

        doc.setFont("NotoSans", "bold");
        doc.setFontSize(11);
        doc.setTextColor(accent);
        doc.text(bothTitle, leftX, mapTop);

        const birthDigits = document
            .getElementById("birthdate")
            .value.replace(/\D/g, "")
            .split("")
            .map(Number);

        const name = document.getElementById("name")
            .value.toUpperCase()
            .replace(/[^A-Z]/g, "");

        const nameDigits = Array.from(name)
            .map(ch => ((ch.charCodeAt(0) - 64) % 9) || 9);

        const combinedDigits = birthDigits.concat(nameDigits);

        const mapLayout = [
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7]
        ];

        this.drawMiniMap(doc, leftX + 60, mapTop + 30, mapLayout, birthDigits, birthTitle);
        this.drawMiniMap(doc, leftX + 320, mapTop + 30, mapLayout, combinedDigits, combinedTitle);

        /* ---------------- FOOTER ---------------- */
        doc.setDrawColor("#CCCCCC");
        doc.setLineWidth(1);
        doc.line(40, 810, 555, 810);

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(9);
        doc.setTextColor("#555");
        doc.text("Contact: lqhoa612@gmail.com   |   Project TSH © 2023", 297, 825, {
            align: "center"
        });

        const safeName = fullname.replace(/\s+/g, "_") || "numerology";
        return { blob: doc.output("blob"), filename: `numerology_${safeName}.pdf` };
    }


    /* ---------------- MAP DRAWER ---------------- */
    static drawMiniMap(doc, x, y, layout, digits, label) {
        const cell = 32;
        const size = cell * 3;

        doc.setFont("NotoSans", "bold");
        doc.setFontSize(10);
        doc.text(label, x, y - 5);

        doc.setDrawColor("#555");

        for (let i = 0; i < 4; i++) {
            doc.line(x, y + i * cell, x + size, y + i * cell);
            doc.line(x + i * cell, y, x + i * cell, y + size);
        }

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(10);

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const num = layout[r][c];
                const count = digits.filter(d => d === num).length;
                const text = count ? num.toString().repeat(count) : "";

                doc.text(
                    text,
                    x + c * cell + 10,
                    y + r * cell + 18
                );
            }
        }
    }
}