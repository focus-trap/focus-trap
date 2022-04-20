const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('with-open-web-component');

  customElements.define(
    'open-web-component',
    class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
          <p>
            <button id="with-open-web-component-button">open-web-component</button>
          </p>
        `;
      }
    }
  );

  container.innerHTML = `
    <button>button 1</button>
    <button>button 2</button>
    <button>button 3</button>
    <open-web-component></open-web-component>
    <button>button 4</button>
    <button>button 5</button>
    <p>
      <button id="deactivate-with-open-web-component" aria-describedby="with-open-web-component-heading">
        deactivate trap
      </button>
    </p>
  `;

  const focusTrap = createFocusTrap('#with-open-web-component', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    tabbableOptions: { getShadowRoot: true },
  });

  document
    .getElementById('activate-with-open-web-component')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-with-open-web-component')
    .addEventListener('click', focusTrap.deactivate);
};
