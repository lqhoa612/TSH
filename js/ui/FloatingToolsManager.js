// FloatingToolsManager.js
export class FloatingToolsManager {
    constructor() {
        this.utils = document.getElementById('utils-buttons');
        if (!this.utils) return;

        this.handle = null;
        this.INITIAL_VISIBLE_MS = 15000; // 15 seconds
        this.AUTO_HIDE_MS = 5000; // 5 seconds
        this.OPEN_INTERACTION_DELAY = 500; // ms

        this.hideTimer = null;
        this.initialTimer = null;

        this.hasSeen = localStorage.getItem("seenFloatingTools") === "true";

        this.isExpanded = false;
        this.isScrolling = false;
        this.scrollCloseRAF = null;
        this.justOpened = false;

        this.init();
    }

    init() {
        this.createHandle();
        this.bindEvents();

        if (!this.hasSeen) {
            this.expand();
            this.initialTimer = setTimeout(() => {
                this.collapse();
                localStorage.setItem("seenFloatingTools", "true");
            }, this.INITIAL_VISIBLE_MS);
        } else {
            this.collapse();
        }
    }

    createHandle() {
        this.handle = document.createElement("div");
        this.handle.id = "utils-drawer-handle";
        this.handle.setAttribute("aria-label", "Open tools");

        if (!this.utils.querySelector("#utils-drawer-handle")) {
            this.utils.appendChild(this.handle);
        }

        this.handle.addEventListener("click", () => {
            this.expand();
        });
    }

    bindEvents() {
        // Any interaction keeps tools visible
        const interactionEvents = ["click", "touchstart", "keydown"];

        this.bindScrollClose();

        interactionEvents.forEach(evt => {
            this.utils.addEventListener(evt, () => this.resetAutoHide());
        });

        // Click handling with just-opened guard
        this.utils.addEventListener("click", (e) => {
            if (this.justOpened) {
                e.stopPropagation();
                e.preventDefault();
                return;
            }

            this.resetAutoHide();
        });

        // Global UI interactions reset timer
        document.addEventListener("ui:interaction", () => {
            this.resetAutoHide();
        });

        // Click outside collapses
        document.addEventListener("click", (e) => {
            if (!this.utils.contains(e.target) && !this.handle.contains(e.target)) {
                this.scheduleAutoHide();
            }
        });
    }

    expand() {
        clearTimeout(this.hideTimer);
        this.isExpanded = true;
        this.justOpened = true;

        this.utils.classList.remove("is-collapsed");
        this.utils.setAttribute("aria-hidden", "false");

        this.utils.classList.add("interaction-locked"); // Temporarily disable button interaction

        setTimeout(() => {
            this.justOpened = false;
            this.utils.classList.remove("interaction-locked");
        }, this.OPEN_INTERACTION_DELAY);

        // this.handle.style.transform = "translateX(100%)";s

        this.scheduleAutoHide();
    }

    collapse() {
        clearTimeout(this.hideTimer);
        this.isExpanded = false;

        this.utils.classList.add("is-collapsed");
        this.utils.setAttribute("aria-hidden", "true");

        // this.handle.style.transform = "translateX(0)";
    }

    scheduleAutoHide() {
        clearTimeout(this.hideTimer);
        this.hideTimer = setTimeout(() => {
            this.collapse();
        }, this.AUTO_HIDE_MS);
    }

    bindScrollClose() {
        let scrollTimeout;

        window.addEventListener(
            "scroll",
            () => {
                this.isScrolling = true;

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.isScrolling = false;
                }, 120);

                if (!this.isExpanded) return;

                if (this.scrollCloseRAF) return;

                this.scrollCloseRAF = requestAnimationFrame(() => {
                    setTimeout(() => this.collapse(), 20);
                    this.scrollCloseRAF = null;
                });
            },
            { passive: true }
        );
    }

    resetAutoHide() {
        if (this.isScrolling) return;
        this.expand();
    }

    // Optional API for spinner / overlays
    suspend() {
        clearTimeout(this.hideTimer);
    }

    resume() {
        this.scheduleAutoHide();
    }
}