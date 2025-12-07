// pdfGenerator.js
import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm";

export class PDFGenerator {

    static generate() {
        const doc = new jsPDF({
            unit: "pt",
            format: "a4"
        });

        const accent = "#12ADAD";
        const labelFont = 9.5;
        const valueFont = 10;
        const leftX = 40;
        const rightX = 300;
        let y = 40;

        /* ---------------- LOGOS ---------------- */
        const tshLogo = document.getElementById("tshLogo");

        if (tshLogo) {
            try { doc.addImage(tshLogo.src, "PNG", 500, 100, 60, 60); } catch { }
        }

        y += 70;

        /* ---------------- TITLE ---------------- */
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Numerology Report", leftX, y);
        y += 26;

        /* ----- BASIC INFO: Name / Birthdate / Date ----- */
        const fullname = document.getElementById("fullname")?.innerText || "";
        const birthdate = document.getElementById("birthdate2")?.innerText || "";
        const currentDate = document.getElementById("currentDate")?.innerText || "";

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);

        doc.text(`Name: ${fullname}`, leftX, y); y += 14;
        doc.text(`Birthdate: ${birthdate}`, leftX, y); y += 14;
        doc.text(`Generated: ${currentDate}`, leftX, y);

        y += 18;

        doc.setDrawColor(accent);
        doc.setLineWidth(1.5);
        doc.line(leftX, y, 555, y);
        y += 18;

        /* ---------------- FIELD SETS ---------------- */
        const fieldsLeft = [
            ["Life Path", "duongdoi"],
            ["Destiny", "sumenh"],
            ["Connection (LP-D)", "LKDgdoiSumenh"],
            ["Growth", "truongthanh"],
            ["Soul Urge", "linhhon"],
            ["Personality", "nhancach"],
            ["Connection (SU-P)", "LKLinhhonNhancach"],
            ["Balance", "canbang"],
            ["Rational Thought", "tuduylytri"]
        ];

        const fieldsRight = [
            ["Subconscious Self", "sucmanhtiemthuc"],
            ["Imbalanced Numbers", "sothieu"],
            ["Birthday Number", "ngaysinh"],
            ["Passion Number", "damme"],
            ["Personal Year", "namcanhan"],
            ["Personal Month", "thangcanhan"],
            ["Personal Day", "ngaycanhan"],
            ["Milestones", "chang"],
            ["Milestone Ages", "tuoi"],
            ["Challenges", "thachthuc"]
        ];

        let leftY = y;
        let rightY = y;

        /* -------- FIELD DRAWER (JUSTIFIED NUMBERS) -------- */
        function drawField(label, value, x, cursorY, isRightColumn = false) {
            if (!value) return cursorY;

            const columnWidth = 240;        // width per column (safe space)
            const valueColumnX = x + columnWidth; // number alignment point

            // Label
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(labelFont);
            doc.setTextColor("#000");
            const labelFull = label + ":";
            doc.text(labelFull, x, cursorY);

            // width of label text
            const labelWidth = doc.getTextWidth(labelFull);

            // -------- dotted leaders --------
            const dotsStart = x + labelWidth + 8;        // spacing after label
            const dotsEnd = valueColumnX - 25;           // leave space before numbers

            doc.setDrawColor("#AAAAAA");
            doc.setLineWidth(0.2);

            for (let dx = dotsStart; dx < dotsEnd; dx += 3) {
                doc.line(dx, cursorY - 2, dx + 1, cursorY - 2);
            }

            // -------- value (right aligned) --------
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(valueFont);
            doc.setTextColor("#000");

            doc.text(value, valueColumnX, cursorY, { align: "right" });

            return cursorY + 14;
        }

        /* LEFT COLUMN */
        fieldsLeft.forEach(([label, id]) => {
            const val = document.getElementById(id)?.innerText?.trim();
            leftY = drawField(label, val, leftX, leftY, false);
        });

        /* RIGHT COLUMN */
        fieldsRight.forEach(([label, id]) => {
            const val = document.getElementById(id)?.innerText?.trim();
            rightY = drawField(label, val, rightX, rightY, true);
        });

        /* Draw vertical separator line */
        const sepTop = y - 13;                          // below date section
        const sepBottom = Math.max(leftY, rightY); // end of fields

        doc.setDrawColor("#CCCCCC");
        doc.setLineWidth(1);

        doc.line(290, sepTop, 290, sepBottom);

        /* ---------------- MAPS ---------------- */
        const mapTop = Math.max(leftY, rightY) + 30;

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(accent);
        doc.text("Birth & Combined Maps", leftX, mapTop);

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

        this.drawMiniMap(doc, leftX, mapTop + 20, mapLayout, birthDigits, "Birth");
        this.drawMiniMap(doc, leftX + 240, mapTop + 20, mapLayout, combinedDigits, "Combined");

        /* ---------------- FOOTER ---------------- */
        doc.setDrawColor("#CCCCCC");
        doc.setLineWidth(1);
        doc.line(40, 810, 555, 810);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor("#555");
        doc.text("Contact: lqhoa612@gmail.com   |   Project TSH © 2023", 297, 825, {
            align: "center"
        });

        /* ---------------- SAVE ---------------- */
        const safeName = fullname.replace(/\s+/g, "_") || "numerology";
        doc.save(`numerology_${safeName}.pdf`);
    }

    /* ---------------- MAP DRAWER ---------------- */
    static drawMiniMap(doc, x, y, layout, digits, label) {
        const cell = 32;         // bigger map
        const size = cell * 3;

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.text(label, x, y - 5);

        doc.setDrawColor("#555");

        for (let i = 0; i < 4; i++) {
            doc.line(x, y + i * cell, x + size, y + i * cell);
            doc.line(x + i * cell, y, x + i * cell, y + size);
        }

        doc.setFont("Helvetica", "normal");
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