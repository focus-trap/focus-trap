# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: focus-trap — a small, framework-agnostic JS library to trap keyboard focus within one or more DOM containers. Builds to ESM, CJS, and UMD; types provided via index.d.ts. E2E behavior is validated via Cypress against the demo site in /docs.

Common commands

- Install dependencies
  - npm install
  - CI uses npm ci
- Build
  - Build everything: npm run build
  - Build variants: npm run compile:esm | npm run compile:cjs | npm run compile:umd
  - Clean: npm run clean
- Lint and format
  - Check formatting: npm run format:check
  - Write formatting: npm run format
  - Lint: npm run lint
  - Format on change: npm run format:watch
- Dev demo server (used for local development and as the Cypress target)
  - Start: npm start
  - Open http://localhost:9966
- Tests
  - Full test suite (format+lint+unit placeholder+types+e2e in headless Chrome): npm test
  - Type checks only: npm run test:types
  - E2E headless (choose browser):
    - Chrome: npm run test:e2e:chrome
    - Firefox (example): CYPRESS_BROWSER=firefox npm run test:e2e
  - E2E interactive (Cypress open): npm run test:e2e:dev
  - Run a single Cypress spec headlessly with the app server auto-started:
    - start-server-and-test start:cypress 9966 "cypress run --browser chrome --headless --spec cypress/e2e/focus-trap-demo.cy.js"
    - Replace the spec path with any matching pattern (e.g., cypress/e2e/**/*.cy.js)
- Docs demo bundle
  - Build the demo bundle used by /docs: npm run demo-bundle
- Release (Changesets)
  - Add a changeset: npx changeset
  - Publish (after building): npm run release

Architecture overview

- Entry points and distribution
  - Source entry is index.js (ESM). Types are declared in index.d.ts.
  - Rollup builds to dist/ as:
    - CJS: dist/focus-trap.js (+ .min.js)
    - ESM: dist/focus-trap.esm.js (+ .esm.min.js)
    - UMD (global name focusTrap): dist/focus-trap.umd.js (+ .umd.min.js)
  - The tabbable dependency is externalized in all builds; for UMD you must include tabbable before focus-trap.
- Core library design (index.js)
  - Public API: createFocusTrap(containers, options) => trap object with .activate(), .deactivate(), .pause(), .unpause(), .updateContainerElements().
  - Trap lifecycle/state: internally tracks containers, computed containerGroups (tabbable/focusable nodes, first/last nodes), mostRecentlyFocusedNode, activation/paused flags, and a delayInitialFocusTimer when configured.
  - Multi-trap coordination: a global trapStack (or an injected stack via options.trapStack) ensures only one active trap listens at a time; activating a new trap auto-pauses the previous one until the new one deactivates.
  - Event handling: installs document-level listeners (capture where needed) for focusin, mousedown/touchstart, click, and keydown. Keyboard navigation uses configurable predicates isKeyForward/isKeyBackward (TAB and SHIFT+TAB by default); Escape deactivates by default. Pointer events outside the trap respect allowOutsideClick and clickOutsideDeactivates.
  - Navigation and boundaries: next focus target is computed per-container via tabbable()/focusable() with awareness of positive tabindex edge cases. Positive tabindex is only supported for single-container traps; a runtime error is thrown otherwise. Focus wrap-around across containers is handled explicitly.
  - Shadow DOM and composed paths: events resolve the actual target using composedPath() when available; activeElement resolution recurses into open shadow roots. Options that accept selector strings won’t work into closed shadows.
  - DOM mutation resilience: a MutationObserver watches containers; if the focused node is removed, focus is redirected to the initial focus target.
  - Options surface (selected): initialFocus, fallbackFocus, setReturnFocus, escapeDeactivates, clickOutsideDeactivates, allowOutsideClick, returnFocusOnDeactivate, preventScroll, delayInitialFocus, document (for trapping inside iframes), tabbableOptions, trapStack, isKeyForward, isKeyBackward. Many accept values or functions evaluated at activation/deactivation time.
- Linting and typing
  - ESLint (flat config) covers ESM/CJS tooling, source, docs, and Cypress tests, with plugins for Babel, TypeScript (types only in this repo), import rules, Jest/Testing Library, and Cypress. Prettier is used to disable style rules and for formatting.
  - Type coverage is enforced by compiling index.d.ts via tsc in test:types.
- Demos and testing harness
  - /docs contains the demo app and serves as the E2E test surface. The Rollup demo build (BUILD_ENV=demo) injects RUP_* constants and serves the site at http://localhost:9966 (npm start). Cypress runs against this server in headless or interactive modes.
- CI
  - GitHub Actions run format, lint, type checks, and a build on every push/PR; separate matrix runs Cypress E2E in Chrome and Firefox containers. Releases are handled via Changesets action and npm publish.

Notes for working in this repo

- Unit tests are intentionally minimal; behavioral correctness is validated via Cypress against the demo. If adding new behavior, prefer adding/updating a demo scenario and a corresponding Cypress spec.
- When running the full npm test locally, ensure Chrome is installed for the default headless run; set CYPRESS_BROWSER to switch browsers.
- For Safari manual testing of the demo, enable “Press Tab to highlight each item on a webpage” in Safari Preferences > Advanced to match expected tab order.

