const { createFocusTrap } = require('../../index');

module.exports = () => {
  class OpenShadowTest extends HTMLElement {
    constructor() {
      super();
      this.id = 'with-shadow-dom-open-host';

      const containerEl = document.createElement('div');
      containerEl.id = 'with-shadow-dom-open-container';
      containerEl.style = 'border: 1px dotted black; padding: 10px;';
      containerEl.innerHTML = `
        <p style="margin-top: 0; padding-top: 0;">
          This field is inside an <strong>open</strong> Shadow DOM:
        </p>
        <input id="input" type="text" />
      `;

      // use same styles as host
      const styleLinkEl = document.createElement('link');
      styleLinkEl.setAttribute('rel', 'stylesheet');
      styleLinkEl.setAttribute('href', 'style.css');

      const shadowEl = this.attachShadow({ mode: 'open' });
      shadowEl.appendChild(styleLinkEl);
      shadowEl.appendChild(containerEl);
    }
  }

  const createClosedShadow = function (hostEl) {
    const containerEl = document.createElement('div');
    containerEl.id = 'with-shadow-dom-closed-container';
    containerEl.style =
      'border: 1px dotted black; margin-top: 10px; padding: 10px; background-color: rgba(0, 0, 0, 0.05);';
    containerEl.innerHTML = `
      <p style="margin-top: 0; padding-top: 0;">
        This field is inside a <strong>closed</strong> Shadow DOM:
      </p>
      <label><input id="check" type="checkbox" /> Checkbox</label>
    `;

    // use same styles as host
    const styleLinkEl = document.createElement('link');
    styleLinkEl.setAttribute('rel', 'stylesheet');
    styleLinkEl.setAttribute('href', 'style.css');

    const shadowEl = hostEl.attachShadow({ mode: 'closed' });
    shadowEl.appendChild(styleLinkEl);
    shadowEl.appendChild(containerEl);

    return shadowEl;
  };

  // open shadow used for a web component; tabbable will just find it on its own
  //  because it's open
  customElements.define('open-shadow-test', OpenShadowTest);

  // for the closed shadow, we need a reference to the closed shadow root, so a
  //  web component doesn't work well because we wouldn't have a way of getting
  //  the shadow; attaching a closed shadow to an existing element works better
  //  for this demo since we get the shadow root and can give it to tabbable
  //  when it requests it
  const closedShadowHostEl = document.getElementById(
    'with-shadow-dom-closed-shadow'
  );
  const closedShadowEl = createClosedShadow(closedShadowHostEl);

  const containerEl = document.getElementById('with-shadow-dom');

  const focusTrap = createFocusTrap('#with-shadow-dom', {
    onActivate: () => containerEl.classList.add('is-active'),
    onDeactivate: () => containerEl.classList.remove('is-active'),
    tabbableOptions: {
      getShadowRoot(node) {
        if (node === closedShadowHostEl) {
          return closedShadowEl;
        }
      },
    },
  });

  document
    .getElementById('activate-with-shadow-dom')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-with-shadow-dom')
    .addEventListener('click', focusTrap.deactivate);
};
