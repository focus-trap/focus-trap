const fs = require('fs');
const path = require('path');

/**
 * Describes a DOM Fixture to load into a test env.
 * @typedef {Object} DomFixture
 * @property {string} html HTML string to set as the inner HTML in a container node.
 */

/**
 * Map of fixture name to DOM Fixture object.
 * @type {Record<string,DomFixture>}
 */
const domFixtures = {
  basic: {
    html: fs.readFileSync(path.resolve(__dirname, './dom/basic.html'), {
      encoding: 'utf-8',
    }),
  },
};

module.exports = {
  domFixtures,
};
