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