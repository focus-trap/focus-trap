const { createFocusTrap } = require('../../index');
module.exports = () => {
  class FocusTrapModal extends HTMLElement {
    constructor() {
      super();
      this.id = 'in-open-shadow-dom-host';

      const modalEl = document.createElement('div');
      modalEl.id = 'in-open-shadow-dom-trap';
      modalEl.className = 'trap';
      modalEl.innerHTML = `
        <p>
          Here is a focus trap in an open Shadow DOM
          <a href="#">with</a> <a href="#">some</a> <a href="#">focusable</a> parts.
        </p>
        <p>
          <button id="deactivate-in-open-shadow-dom" aria-describedby="in-open-shadow-dom-heading">
            deactivate trap
          </button>
        </p>
      `;

      // use same styles as host
      const styleLinkEl = document.createElement('link');
      styleLinkEl.setAttribute('rel', 'stylesheet');
      styleLinkEl.setAttribute('href', 'style.css');

      const shadowEl = this.attachShadow({ mode: 'open' });
      shadowEl.appendChild(styleLinkEl);
      shadowEl.appendChild(modalEl);

      const focusTrap = createFocusTrap(modalEl, {
        onActivate: () => modalEl.classList.add('is-active'),
        onDeactivate: () => modalEl.classList.remove('is-active'),
        escapeDeactivates: true,
      });

      document
        .getElementById('activate-in-open-shadow-dom')
        .addEventListener('click', focusTrap.activate);
      modalEl
        .querySelector('#deactivate-in-open-shadow-dom')
        .addEventListener('click', focusTrap.deactivate);
    }
  }

  customElements.define('focus-trap-modal', FocusTrapModal);
};
