class FocusTrapTestComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    var button = document.createElement('button');
    button.id = 'shadow-button';
    button.innerText = 'Shadow Button';
    this.shadowRoot.appendChild(button);

    var defaultSlot = document.createElement('slot');
    this.shadowRoot.appendChild(defaultSlot);
  }
}

window.customElements.define('focus-trap-test-component', FocusTrapTestComponent);
