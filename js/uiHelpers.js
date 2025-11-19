// uiHelpers.js
export class UIHelpers {
    constructor(numerologyManager) {
        this.numerology = numerologyManager;
    }

    initInputEvents() {
        const calcBtn = document.getElementById("calculateBtn");
        const nameInput = document.getElementById("name");
        const birthInput = document.getElementById("birthdate");

        if (calcBtn) {
            calcBtn.addEventListener("click", () => {
                this.numerology.calculateFromInputs();
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

    toggleDropdown(id) {
        const element = document.getElementById(id);
        // const dropdown = document.getElementById('dropdown');
        if (!element) return;
        element.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
    }

    displayResults(results) {
        //Helpers: safe DOM setter
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