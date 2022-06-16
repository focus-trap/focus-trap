const { defineConfig } = require('cypress');
const setupPlugins = require('./cypress/plugins/index.js');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return setupPlugins(on, config);
    },
    baseUrl: 'http://localhost:9966',
  },
});
