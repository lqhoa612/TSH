// saveData.js
export class SaveDataManager {

    constructor() {
        this.KEY = "tsh_numerology_saved_data";
        this.nameInput = null;
        this.birthInput = null;
        this.checkbox = null;
        this.calculateBtn = null;
    }

    init() {
        this.nameInput = document.getElementById("name");
        this.birthInput = document.getElementById("birthdate");
        this.checkbox = document.getElementById("saveMyData");
        this.calculateBtn = document.getElementById("calculateBtn");

        if (!this.nameInput || !this.birthInput || !this.checkbox || !this.calculateBtn) {
            console.warn("SaveDataManager: Missing required DOM elements.");
            return;
        }

        // Step 1 — Load saved data automatically
        this.loadData();

        // Step 2 — Auto-save after calculation
        this.calculateBtn.addEventListener("click", () => this.handleSave());

        // Step 3 — If user unchecks → delete immediately
        this.checkbox.addEventListener("change", () => {
            if (!this.checkbox.checked) this.clear();
        });

        console.log("SaveDataManager initialized ✅");
    }

    loadData() {
        try {
            const saved = JSON.parse(localStorage.getItem(this.KEY));
            if (!saved) return;

            this.nameInput.value = saved.name;
            this.birthInput.value = saved.birthdate;
            this.checkbox.checked = true;
        } catch (e) {
            console.error("SaveDataManager load error:", e);
        }
    }

    handleSave() {
        const nameValue = this.nameInput.value.trim();
        const birthValue = this.birthInput.value.trim();

        if (this.checkbox.checked && nameValue && birthValue) {
            this.save(nameValue, birthValue);
        } else {
            this.clear();
        }
    }

    save(name, birthdate) {
        localStorage.setItem(this.KEY, JSON.stringify({ name, birthdate }));
    }

    clear() {
        localStorage.removeItem(this.KEY);
    }
}