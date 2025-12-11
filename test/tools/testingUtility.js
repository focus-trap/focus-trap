const { domFixtures } = require('../fixtures/fixtures');

/**
 * Results of rendering a fixture
 * @typedef {Object} RenderResults
 * @property {HTMLElement} containerEl Container element into which the fixture was rendered.
 * @property {HTMLElement|null} activateEl Element with ID 'activate' if found __inside the
 *  container__; null otherwise.
 * @property {HTMLElement|null} deactivateEl Element with ID 'deactivate' if found __inside the
 *  container__; null otherwise.
 * @property {HTMLElement|null} trapEl Element with ID 'trap' if found __inside the
 *  container__; null otherwise.
 */

/**
 * Renders the specified DOM fixture into a `DIV` element.
 * @param {'default'} name Name of the DOM fixture to render.
 * @returns {RenderResults} Render results.
 */
global.renderFixture = (name) => {
  if (!name || !domFixtures[name]) {
    throw new Error(`[global.renderFixture] Fixture "${name}" does not exist`);
  }

  const containerEl = document.createElement('div');
  containerEl.dataset.fixture = name;

  // NOTE: Though we do NOT expect any <script> blocks in HTML fixtures (they are only
  //  meant to help setup the DOM structure), it's worth mentioning that while a browser
  //  would execute script blocks found in the inner HTML string, jsdom specifically does
  //  NOT execute them (they would have to be parsed out and individually set as the source
  //  for dedicated programmatically-created script elements) for various reasons including
  //  purity, no side effects, etc.
  containerEl.innerHTML = domFixtures[name].html;

  document.body.appendChild(containerEl);

  return {
    containerEl,
    activateEl: containerEl.querySelector('#activate'),
    deactivateEl: containerEl.querySelector('#deactivate'),
    trapEl: containerEl.querySelector('#trap'),
  };
};

afterEach(() => {
  // remove all fixture containers
  const fixtureEls = document.querySelectorAll('[data-fixture]');
  fixtureEls.forEach((n) => n.remove());

  // clear any remaining DOM (if other nodes got appended without data-fixture)
  document.body.innerHTML = '';

  // reset mocks, timers, etc
  jest.resetAllMocks();
  jest.clearAllTimers();
});
