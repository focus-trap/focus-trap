require('./default')();
require('./global-trap-stack')();
require('./animated-dialog')();
require('./animated-trigger')();
require('./escape-deactivates')();
require('./escape-key-cancelation')();
require('./initial-element-no-escape')();
require('./tricky-initial-focus')();
require('./initial-selector-with-fallback')();
require('./initially-focused-container')();
require('./hidden-treasures')();
require('./nested')();
require('./sibling')();
require('./input-activation')();
require('./delay')();
require('./radio')();
require('./iframe')();
require('./allow-outside-click')();
require('./click-outside-deactivates')();
require('./set-return-focus')();
require('./set-return-focus-function')();
require('./no-delay')();
require('./multiple-elements')();
require('./multiple-elements-delete')();
require('./multiple-elements-delete-all')();
require('./multiple-elements-multiple-traps')();
require('./multiple-traps-manual-pause')();
require('./arrow-keys')();
require('./dom-remove')();
require('./isolate-subtree')();

//
// ❗️ MANUALLY TESTED DEMOS ❗️
// These are demos that can't be auto-tested in JSDom (Jest) or Cypress, typically
//  because of tab handling.
//
// Consider running them in SAFARI to also check, at the same, that features work
//  under this browser, which tends to be a late adopter of newer Web APIs.
//  Cypress doesn't support Safari yet, so tests can't be automated.
//

// loading this in a Cypress env causes Chrome to fail in GitHub CI (even with
//  the `"chromeWebSecurity": false` option set in the cypress.json config file),
//  and causes FireFox to fail both locally and in CI due to security context
//  violations; but it's still a good demo to have
if (!RUP_IS_CYPRESS_ENV) {
  // TEST MANUALLY (causes Cypress to fail due to security context violations)
  // http://localhost:9966/#demo-in-iframe
  require('./in-iframe')();
}

// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
// http://localhost:9966/#demo-aesd
require('./activation-element-shadow-dom')();

// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
// http://localhost:9966/#demo-in-open-shadow-dom
require('./in-open-shadow-dom')();

// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
// http://localhost:9966/#demo-with-shadow-dom
require('./with-shadow-dom')();

// TEST MANUALLY (cypress-plugin-tab doesn't support non-tabbable but still focusable nodes)
// http://localhost:9966/#demo-negative-tabindex
require('./negative-tabindex')();

// TEST MANUALLY (cypress-plugin-tab doesn't support non-tabbable but still focusable nodes)
// http://localhost:9966/#demo-negative-tabindex-last
require('./negative-tabindex-last')();

// TEST MANUALLY (cypress-plugin-tab doesn't support non-tabbable but still focusable nodes)
// - Check tabbing FWD from the "tabindex -1" button moves focus to "tabindex 3" button.
// - Check tabbing BWD from "tabindex -1" moves to "tabindex 1".
// - Rest is covered by a Cypress test.
// http://localhost:9966/#demo-positive-tabindex
require('./positive-tabindex')();

// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
// http://localhost:9966/#demo-with-open-web-component
require('./with-open-web-component')();

// TEST MANUALLY (cypress-plugin-tab doesn't support inert)
// http://localhost:9966/#demo-inert
require('./inert')();
