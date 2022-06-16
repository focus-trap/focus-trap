const { defineConfig } = require('cypress');
const setupPlugins = require('./cypress/plugins/index.js');

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return setupPlugins(on, config);
    },
    baseUrl: 'http://localhost:9966',
  },
});
