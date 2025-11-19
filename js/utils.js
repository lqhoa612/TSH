// utils.js

// Remove Vietnamese or accented characters
export function removeAccents(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f\u1dc0-\u1dff\u20d0-\u20ff\u2cef-\u2cff]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

// -------------------- SIMPLE FAST MASK --------------------
export function autoFormatBirthdate() {
    const input = document.getElementById("birthdate");
    input.addEventListener("input", () => {
        let v = input.value.replace(/\D/g, ""); // keep numbers only

        // DD
        if (v.length >= 3) {
            v = v.replace(/(\d{2})(\d)/, "$1/$2");
        }

        // DD/MM
        if (v.length >= 6) {
            v = v.replace(/(\d{2}\/\d{2})(\d+)/, "$1/$2");
        }

        input.value = v.substring(0, 10); // DD/MM/YYYY max

        // ---- VALIDATION START ----
        if (input.value.length === 10) {
            if (validateBirthdate(input.value)) {
                input.classList.remove("invalid");
                input.classList.add("valid");
            } else {
                input.classList.remove("valid");
                input.classList.add("invalid");
            }
        } else {
            // incomplete input is neutral
            input.classList.remove("valid");
            input.classList.remove("invalid");
        }
        // ---- VALIDATION END ----
    });
}

// -------------------- VALIDATION --------------------
export function validateBirthdate(dateStr) {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return false;

    let [dd, mm, yyyy] = parts.map(Number);

    if (yyyy < 1900 || yyyy > 2100) return false;
    if (mm < 1 || mm > 12) return false;
    if (dd < 1 || dd > 31) return false;

    const max = new Date(yyyy, mm, 0).getDate();
    if (dd > max) return false;

    return true;
}

// -------------------- PARSE DD/MM/YYYY --------------------
export function parseMaskedDate(input) {
    if (!input || typeof input !== 'string') return null;

    const cleaned = input.trim();
    const parts = cleaned.split(/\D+/).filter(Boolean);

    if (parts.length < 3) return null;

    let day = parts[0];
    let month = parts[1];
    let year = parts[2].padStart(4, "0");

    day = day.padStart(2, "0");
    month = month.padStart(2, "0");

    const d = Number(day), m = Number(month), y = Number(year);
    if (m < 1 || m > 12) return null;
    const max = new Date(y, m, 0).getDate();
    if (d < 1 || d > max) return null;

    return { day: d, month: m, year: y };
}

// -------------------- NUMBER REDUCTION --------------------
export function reduceToSingleDigit(number, masterNumbers = true) {
    let num = parseInt(number, 10);
    if (isNaN(num) || num === 0) return 0;

    if (masterNumbers && (num === 11 || num === 22 || num === 33)) return num;

    let reduced = (num - 1) % 9 + 1;
    return reduced;
}
