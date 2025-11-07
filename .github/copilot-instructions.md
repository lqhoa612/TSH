<!-- .github/copilot-instructions.md -->
# Quick guidance for AI coding agents working on this repo

This repository is a small mixed web + native C++ project that implements a Pythagorean Numerology calculator. The codebase has two primary surfaces:

- A static web UI (HTML/CSS/JS) served as a GitHub Pages site: `index.html`, `style.css`, `main.js`.
- A native console implementation in C++ under `TSH_CPP/ConsoleApplication1/ConsoleApplication1.cpp` (Visual Studio solution in `TSH_CPP/ConsoleApplication1.sln`).

Keep guidance short and specific. Only change behavior that is clearly represented by files in the tree.

Key files to inspect when making changes
- `index.html` — page structure, IDs used by the JS. Many strings are bound to specific element ids (e.g. `name`, `birthdate`, `calculateBtn`, `duongdoi`, `sumenh`, etc.).
- `main.js` — all application logic and translations. This file contains:
  - UI wiring, translatePage() and button listeners
  - Input parsing and normalization (removeAccents, formatDate)
  - Numerology calculation functions (reduceToSingleDigit, calculateCoreNumbers, calculateRationalThinking, calculateMilestonesAndChallanges, displayResults)
  - Important assumptions: name is expected as "Last Middle First"; birthdate input uses `dd/mm/yyyy` format. See the `translations` object for exact user-facing phrasing.
- `style.css` — site theming and responsive layout. Use CSS variables defined in `:root` for main colors. There is a theme toggle that toggles `body.old-theme`.
- `TSH_CPP/ConsoleApplication1/ConsoleApplication1.cpp` — a near-parallel implementation of the numerology logic used by the web UI. Use it as a reference for algorithmic intent and edge-case handling.

Project "why" and architecture notes
- The web UI is the primary user surface (GitHub Pages). `main.js` is single-file, imperative, and contains both UI glue and algorithmic code. When updating logic, prefer keeping the UI selectors/IDs stable to avoid breaking the page.
- The C++ console app mirrors the JS calculations and is useful for unit-test style checks. Behavior should remain consistent between the two implementations (e.g., master numbers 11/22/33 handling, how `y` is treated as vowel or consonant).

Workflows and commands
- Web preview: open `index.html` in a browser (double-click or via a simple static server). No build step is required for the web part.
- C++ build (Windows / Visual Studio): open `TSH_CPP/ConsoleApplication1.sln` in Visual Studio and build/run the `ConsoleApplication1` project. There is no other build automation in the repo.

Conventions and important behavioral details (explicit and discoverable)
- Name input: expects Last Middle First order. The algorithm treats alphabetic characters only; diacritics are removed by `removeAccents()` in `main.js`.
- Birthdate format: `dd/mm/yyyy` (slashes required). `formatDate()` in `main.js` normalizes user input but downstream code slices by `/`.
- Master numbers: 11, 22, 33 are treated specially in both implementations. Many reduction functions accept an `allowMaster` flag.
- Character mapping in JS uses `charCodeAt(0)-96` to map `a->1` .. `z->26`; C++ uses similar arithmetic. Both implementations reduce character values to core digits using `reduceToSingleDigit(..., false)` at various steps.
- Localization: `main.js` contains `translations` for `en` and `vi`. Use element IDs (keys in the translations mapping) to update or add UI strings.

When making edits
- Small visual changes (CSS or HTML): edit `style.css` and `index.html`. Keep element IDs intact.
- Algorithm changes: update `main.js` and, if relevant, mirror the change in `TSH_CPP/ConsoleApplication1/ConsoleApplication1.cpp` for consistency.
- Add tests or examples: the repository currently has no test harness. For algorithm validation, adding a small Node script or unit tests that import a refactored `main.js` function is acceptable, but prefer minimal, self-contained changes.

Examples (copy-paste friendly)
- To update a UI string (English) change the `translations.en` object key in `main.js` (the key must match an element id in `index.html`). Example: `calculateBtn` maps to the button with id `calculateBtn`.
- To change how vowels are detected: edit `isVowel()` in `TSH_CPP/...cpp` and the vowel logic in `calculateCoreNumbers()` / `calculateRationalThinking()` in `main.js`.

Common pitfalls to avoid
- Don't rename DOM element ids unless you update all usages in `main.js`.
- Don't change the `dd/mm/yyyy` parsing without updating both JS and C++ implementations.
- Avoid introducing new runtime dependencies for a small static site. Keep changes JS + CSS only unless there's a clear need.

If you need more context
- Inspect `index.html` IDs, `main.js` functions, and the C++ file side-by-side. The C++ file is the best reference for intended numeric handling.

If anything in this summary is unclear or you'd like a different emphasis (tests, refactor plan, or CI), tell me what to expand and I will iterate.
