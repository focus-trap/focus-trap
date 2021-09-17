const { createFocusTrap } = require('../../dist/focus-trap');
module.exports = () => {
  // const container = document.getElementById('open-shadow-dom');
  // const escapeDeactivatesOption = document.getElementById(
  //   'escape-deactivates-option'
  // );

  // const focusTrap = createFocusTrap('#escape-deactivates', {
  //   onActivate: () => container.classList.add('is-active'),
  //   onDeactivate: () => container.classList.remove('is-active'),
  //   escapeDeactivates: () => escapeDeactivatesOption.checked,

  //   // allow clicking on the checkbox or its label since it's outside the trap
  //   allowOutsideClick: (e) =>
  //     e.target === escapeDeactivatesOption ||
  //     e.target === escapeDeactivatesOption.parentNode,
  // });

  // document
  //   .getElementById('activate-escape-deactivates')
  //   .addEventListener('click', focusTrap.activate);
  // document
  //   .getElementById('deactivate-escape-deactivates')
  //   .addEventListener('click', focusTrap.deactivate);

  class FocusTrapModal extends HTMLElement {
    constructor() {
      super();

      const modalEl = document.createElement('div');
      modalEl.id = 'open-shadow-dom';
      modalEl.className = 'trap';
      modalEl.innerHTML = `
        <p>
          Here is a focus trap in an open Shadow DOM
          <a href="#">with</a> <a href="#">some</a> <a href="#">focusable</a> parts.
        </p>
        <p>
          <button id="deactivate-open-shadow-dom" aria-describedby="open-shadow-dom-heading">
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
        .getElementById('activate-open-shadow-dom')
        .addEventListener('click', focusTrap.activate);
      modalEl
        .querySelector('#deactivate-open-shadow-dom')
        .addEventListener('click', focusTrap.deactivate);
    }
  }

  customElements.define('focus-trap-modal', FocusTrapModal);
};
