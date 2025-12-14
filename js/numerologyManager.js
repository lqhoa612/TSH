// numerologyManager.js
import { removeAccents, reduceToSingleDigit, parseMaskedDate } from './utils.js';
export class NumerologyManager {
    constructor(uiHelperInstance) {
        this.ui = uiHelperInstance;
    }

    async calculateFromInputs() {
        this.ui?.showResultSkeleton();

        const rawName = (document.getElementById('name')?.value || '').trim();
        const birthdateStr = (document.getElementById('birthdate')?.value || '').trim();

        const parsed = parseMaskedDate(birthdateStr);
        if (!parsed) {
            this.ui?.hideResultSkeleton();
            this.ui?.showError?.('Invalid birthdate. Use DD/MM/YYYY');
            return null;
        }

        const name = removeAccents(rawName);
        const { day, month, year } = parsed;

        // Calculate immediately (no delay)
        const results = this.calculateAll(name, day, month, year);

        // Wait until skeleton is fully gone
        await new Promise(resolve =>
            this.ui.hideResultSkeleton(250, 250) || setTimeout(resolve, 500)
        );

        // NOW write numbers
        this.ui?.displayResults?.({
            rawName,
            birthdate: birthdateStr,
            currentDateFormatted: new Date().toLocaleDateString(),
            ...results
        });

        return results;
    }

    calculateAll(name, ngaysinh, thangsinh, namsinh) {
        // Core numerology calculations
        const core = this.calculateCoreNumbers(name, ngaysinh, thangsinh, namsinh);
        const duongdoi = core.duongdoi;
        const sumenh = core.sumenh;
        const linhhon = core.linhhon;
        const nhancach = core.nhancach;
        const canbang = core.canbang;
        const sucmanhtiemthuc = core.sucmanhtiemthuc;
        const sothieu = core.sothieu;
        const damme = core.damme;

        // Connections and other indices
        const LKDgdoiSumenh = Math.abs(reduceToSingleDigit(duongdoi, false) - reduceToSingleDigit(sumenh, false));
        const truongthanh = reduceToSingleDigit(duongdoi + sumenh, true);
        const LKLinhhonNhancach = Math.abs(reduceToSingleDigit(linhhon, false) - reduceToSingleDigit(nhancach, false));
        const tuduylytri = this.calculateRationalThinking(name, ngaysinh);
        const ngaysinhIndex = reduceToSingleDigit(ngaysinh, true);

        // Personal date, milestones, challenges
        const namcanhan = reduceToSingleDigit(ngaysinh + thangsinh + reduceToSingleDigit(namsinh, false), false);
        const thangcanhan = reduceToSingleDigit(namcanhan + reduceToSingleDigit((new Date()).getMonth() + 1, false), false);
        // In the original code you used current month/day. Here we leave day used by caller if needed:
        const ngaycanhan = reduceToSingleDigit(thangcanhan + reduceToSingleDigit((new Date()).getDate(), false), false);

        const [chang, thachthuc] = this.calculateMilestonesAndChallenges(ngaysinh, thangsinh, namsinh);
        const tuoi = this.calculateMilestoneAges(duongdoi);

        return {
            duongdoi,
            sumenh,
            linhhon,
            nhancach,
            canbang,
            sucmanhtiemthuc,
            sothieu,
            damme,
            LKDgdoiSumenh,
            truongthanh,
            LKLinhhonNhancach,
            tuduylytri,
            ngaysinhIndex,
            namcanhan,
            thangcanhan,
            ngaycanhan,
            chang,
            tuoi,
            thachthuc
        };
    }

    calculateCoreNumbers(name, ngaysinh, thangsinh, namsinh) {
        // initialise
        let duongdoi = 0, sumenh = 0, linhhon = 0, nhancach = 0, canbang = 0, sucmanhtiemthuc = 0, damme = 0;
        const nCharNumStorage = [];
        const vowelsNumStorage = [];
        const consonantsNumStorage = [];
        const initialsNumStorage = [];
        const sothieu = [];

        // normalise
        name = (name || '').toLowerCase();

        duongdoi = reduceToSingleDigit(ngaysinh, false) + reduceToSingleDigit(thangsinh, false) + reduceToSingleDigit(namsinh, false);
        duongdoi = reduceToSingleDigit(duongdoi, true);

        // iterate name characters
        let prevChar = '';
        for (let i = 0; i < name.length; i++) {
            const nChar = name.charAt(i);
            if (/[a-z]/.test(nChar)) {
                const nCharNum = reduceToSingleDigit(nChar.charCodeAt(0) - 96, false); // a=1, b=2, ..., z=26
                sumenh += nCharNum;
                nCharNumStorage.push(nCharNum);

                // vowels
                if (/[aeiou]/.test(nChar)) {
                    linhhon += nCharNum;
                    vowelsNumStorage.push(nCharNum);
                } else if (/[y]/.test(nChar) && !/[aeiou]/.test(prevChar)) {
                    linhhon += nCharNum;
                    vowelsNumStorage.push(nCharNum);
                } else {
                    nhancach += nCharNum;
                    consonantsNumStorage.push(nCharNum);
                }

                // initials
                if (!/[a-z]/.test(prevChar)) {
                    canbang += nCharNum;
                    initialsNumStorage.push(nCharNum);
                }
            }
            prevChar = nChar;
        }

        // missing numbers (1..9)
        for (let i = 1; i <= 9; i++) {
            if (!nCharNumStorage.includes(i)) sothieu.push(i);
        }

        // find most repeated number for damme
        const countMap = new Map();
        let maxCount = 0;
        for (const num of nCharNumStorage) {
            const count = (countMap.get(num) || 0) + 1;
            countMap.set(num, count);
            if (count > maxCount) {
                maxCount = count;
                damme = num;
            }
        }

        sumenh = reduceToSingleDigit(sumenh, true);
        linhhon = reduceToSingleDigit(linhhon, true);
        nhancach = reduceToSingleDigit(nhancach, true);
        canbang = reduceToSingleDigit(canbang, true);
        sucmanhtiemthuc = 9 - sothieu.length;

        return {
            duongdoi,
            sumenh,
            linhhon,
            nhancach,
            canbang,
            sucmanhtiemthuc,
            sothieu,
            damme
        };
    }

    calculateRationalThinking(name, ngaysinh) {
        let tuduylytri = Number(ngaysinh) || 0;
        name = (name || '').toLowerCase();
        for (let i = name.length - 1; i >= 0; i--) {
            const nChar = name.charAt(i);
            if (/[a-z]/.test(nChar)) {
                const nCharNum = reduceToSingleDigit(nChar.charCodeAt(0) - 96, false); // a=1, b=2, ..., z=26
                tuduylytri += nCharNum;
            } else break;
        }

        return reduceToSingleDigit(tuduylytri, true);
    }

    calculateMilestonesAndChallenges(ngaysinh, thangsinh, namsinh) {
        let chang = [], thachthuc = [];
        ngaysinh = reduceToSingleDigit(ngaysinh, false);
        thangsinh = reduceToSingleDigit(thangsinh, false);
        namsinh = reduceToSingleDigit(namsinh, false);

        chang.push(reduceToSingleDigit(thangsinh + ngaysinh, true));
        chang.push(reduceToSingleDigit(namsinh + ngaysinh, true));
        chang.push(reduceToSingleDigit(chang[0] + chang[1], true));
        chang.push(reduceToSingleDigit(thangsinh + namsinh, true));

        thachthuc.push(Math.abs(reduceToSingleDigit(thangsinh - ngaysinh), true));
        thachthuc.push(Math.abs(reduceToSingleDigit(namsinh - ngaysinh), true));
        thachthuc.push(Math.abs(reduceToSingleDigit(thachthuc[0] - thachthuc[1]), true));
        thachthuc.push(Math.abs(reduceToSingleDigit(thangsinh - namsinh), true));

        return [chang, thachthuc];
    }

    calculateMilestoneAges(duongdoi) {
        const tuoi = [];
        tuoi.push(36 - reduceToSingleDigit(duongdoi, false));
        tuoi.push(tuoi[0] + 9);
        tuoi.push(tuoi[1] + 9);
        tuoi.push(tuoi[2] + 9);
        return tuoi;
    }

}