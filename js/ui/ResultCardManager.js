// ResultCardManager.js

export class ResultCardManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(definitions) {
        this.container.innerHTML = '';

        definitions.forEach(def => {
            const card = document.createElement('div');
            card.className = 'card collapsible';

            card.innerHTML = `
                <button class="card-header" type="button">
                    <span data-translate="${def.label}"></span>
                    <span id="${def.key}"></span>
                    <span class="chevron">▾</span>
                </button>
                <div class="card-body">
                    <p class="card-desc" data-translate="${def.desc}"></p>
                </div>
                `;

            this.container.appendChild(card);
        });
    }

    enableCollapse() {
        const cards = this.container.querySelectorAll('.collapsible');

        cards.forEach(card => {
            const header = card.querySelector('.card-header');

            if (header.dataset.bound) return;
            header.dataset.bound = 'true';

            header.addEventListener('click', () => {
                // Close all other cards
                cards.forEach(c => {
                    if (c !== card) c.classList.remove('open');
                });

                // Toggle current card
                card.classList.toggle('open');
            });
        });
    }

}