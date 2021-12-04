require('./default')();
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

// loading this in a Cypress env causes Chrome to fail in GitHub CI (even with
//  the `"chromeWebSecurity": false` option set in the cypress.json config file),
//  and causes FireFox to fail both locally and in CI due to security context
//  violations; but it's still a good demo to have, and at least we can test
//  it manually
// eslint-disable-next-line no-undef -- process is defined via Rollup
if (!process.env.IS_CYPRESS_ENV) {
  require('./in-iframe')();
}

require('./allow-outside-click')();
require('./click-outside-deactivates')();
require('./set-return-focus')();
require('./set-return-focus-function')();
require('./no-delay')();
require('./multiple-elements')();
require('./multiple-elements-delete')();
require('./multiple-elements-delete-all')();
require('./multiple-elements-multiple-traps')();
require('./in-open-shadow-dom')();
