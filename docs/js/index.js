require('./default')();
require('./global-trap-stack')();
require('./animated-dialog')();
require('./animated-trigger')();
require('./escape-deactivates')();
require('./initial-element-no-escape')();
require('./initially-focused-container')();
require('./hidden-treasures')();
require('./nested')();
require('./sibling')();
require('./tricky-initial-focus')();
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
require('./arrow-keys')();
require('./dom-remove')();
require('./positive-tabindex')();

// loading this in a Cypress env causes Chrome to fail in GitHub CI (even with
//  the `"chromeWebSecurity": false` option set in the cypress.json config file),
//  and causes FireFox to fail both locally and in CI due to security context
//  violations; but it's still a good demo to have, and at least we can test
//  it manually
// eslint-disable-next-line no-undef -- process is defined via Rollup
if (!process.env.IS_CYPRESS_ENV) {
  // TEST MANUALLY (causes Cypress to fail due to security context violations)
  // http://localhost:9966/#demo-in-iframe
  require('./in-iframe')();
}

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

// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
// http://localhost:9966/#demo-with-open-web-component
require('./with-open-web-component')();

// TEST MANUALLY (cypress-plugin-tab doesn't support inert)
// http://localhost:9966/#demo-inert
require('./inert')();
