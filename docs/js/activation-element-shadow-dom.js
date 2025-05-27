const { createFocusTrap } = require('../../index');

module.exports = () => {
  class CustomShadowDomButton extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' }).innerHTML =
        '<button id="button-inside-shadow-dom"><slot></slot></button>';
    }
  }

  const container = document.getElementById('aesd');

  const focusTrap = createFocusTrap('#aesd', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });

  document
    .getElementById('activate-aesd')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-aesd')
    .addEventListener('click', focusTrap.deactivate);

  customElements.define('custom-shadow-dom-button', CustomShadowDomButton);
};
