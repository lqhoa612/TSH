// mapManager.js
import { clearUI } from "./uiClearManager.js";

export class MapManager {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.birthdateMap = null;
        this.combinedMap = null;
        this.birthComments = null;
        this.combinedComments = null;

        this.lastBirthdate = '';
        this.lastName = '';
    }

    init() {
        this.cacheElements();
        this.setupListeners();
        this.handleLanguageChange();
    }

    cacheElements() {
        this.birthdateMap = document.getElementById('birthdate-map');
        this.combinedMap = document.getElementById('combined-map');
        this.birthComments = document.getElementById('birth-comments');
        this.combinedComments = document.getElementById('combined-comments');
    }

    setupListeners() {
        const yourMapBtn = document.getElementById('yourmapBtn');
        if (!yourMapBtn) return;

        yourMapBtn.addEventListener('click', () => {
            this.lastBirthdate = document.getElementById('birthdate').value;
            this.lastName = document.getElementById('name').value;

            clearUI();
            this.displayBirthdateMap();
            this.displayCombinedMap();
        });
    }

    handleLanguageChange() {
        document.addEventListener('languageChanged', () => {
            if (!this.lastBirthdate || !this.lastName) return;
            clearUI();
            this.displayBirthdateMap();
            this.displayCombinedMap();
        });
    }

    /* ----------------------  MAP GENERATION ---------------------- */

    displayBirthdateMap() {
        const dict = this.languageManager.languages[this.languageManager.getLanguage()];
        const title = dict.birthdateMapTitle || 'Birthdate Map';

        const digits = this.lastBirthdate.replace(/\D/g, '').split('').map(Number);
        const gridHTML = this.generateNumberGrid(digits);

        this.birthdateMap.innerHTML = `
            <h4>${title}</h4>
            ${gridHTML}
        `;

        // detect arrows for birthdate only
        const arrows = this.handleMapArrows(digits);
        this.renderComments(arrows, dict, this.birthComments, 'birth');
    }

    displayCombinedMap() {
        const dict = this.languageManager.languages[this.languageManager.getLanguage()];
        const title = dict.combinedMapTitle || 'Combined Map';

        const birthDigits = this.lastBirthdate.replace(/\D/g, '').split('').map(Number);
        const name = this.lastName.toUpperCase().replace(/[^A-Z]/g, '');
        const nameDigits = Array.from(name).map(ch => ((ch.charCodeAt(0) - 64) % 9) || 9);

        const combinedDigits = birthDigits.concat(nameDigits);
        const gridHTML = this.generateCombinedGrid(birthDigits, nameDigits);

        this.combinedMap.innerHTML = `
            <h4>${title}</h4>
            ${gridHTML}
        `;

        // detect arrows for combined map
        const arrows = this.handleMapArrows(combinedDigits);
        this.renderComments(arrows, dict, this.combinedComments, 'combined');
    }

    /* ----------------------  GRID CREATION ---------------------- */

    generateNumberGrid(digits) {
        const layout = [
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7]
        ];

        let html = '<div class="map-grid">';
        layout.forEach(row => {
            row.forEach(num => {
                const count = digits.filter(d => d === num).length;
                html += `
                <div class="map-cell ${count ? 'filled' : 'empty'}">
                    ${count ? num.toString().repeat(count) : ''}
                </div>`;
            });
        });
        html += '</div>';
        return html;
    }

    generateCombinedGrid(birthDigits, nameDigits) {
        const layout = [
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7]
        ];

        let html = '<div class="map-grid">';
        layout.forEach(row => {
            row.forEach(num => {
                const birthCount = birthDigits.filter(d => d === num).length;
                const nameCount = nameDigits.filter(d => d === num).length;
                const totalCount = birthCount + nameCount;

                let content = '';
                if (totalCount > 0) {
                    content += '<div class="combined-content">';
                    for (let i = 0; i < birthCount; i++)
                        content += `<span class="birth-num">${num}</span>`;
                    for (let i = 0; i < nameCount; i++)
                        content += `<span class="name-num">${num}</span>`;
                    content += '</div>';
                }

                html += `
                <div class="map-cell ${totalCount ? 'filled' : 'empty'}">
                    ${content}
                </div>`;
            });
        });
        html += '</div>';
        return html;
    }

    /* ----------------------  ARROW DETECTION ---------------------- */

    handleMapArrows(digits) {
        const arrows = {
            willpower: [1, 5, 9],
            sharpness: [3, 5, 7],
            intelligence: [3, 6, 9],
            spiritual: [2, 5, 8],
            physical: [1, 4, 7],
            action: [7, 8, 9],
            selfControl: [4, 5, 6],
            planning: [1, 2, 3]
        };

        const results = [];
        for (const [name, nums] of Object.entries(arrows)) {
            const hasAll = nums.every(n => digits.includes(n));
            const hasNone = nums.every(n => !digits.includes(n));
            if (hasAll) results.push({ name, type: 'present' });
            else if (hasNone) results.push({ name, type: 'missing' });
        }
        return results;
    }

    /* ----------------------  COMMENT RENDER ---------------------- */

    renderComments(arrows, dict, container, mapType) {
        const comments = dict.mapComments || {};
        let html = `<h4>${mapType === 'birth' ? dict.birthCommentsTitle || 'Birthdate Arrows' : dict.combinedCommentsTitle || 'Combined Arrows'}</h4>`;

        arrows.forEach(a => {
            const text = comments[a.name]?.[a.type] || '';
            if (text) {
                html += `<p>${text}</p>`;
            }
        });

        container.innerHTML = html || `<p>${dict.noArrowDetected || 'No special arrows detected.'}</p>`;
    }
}
