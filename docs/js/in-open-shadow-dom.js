const { createFocusTrap } = require('../../index');
module.exports = () => {
  class CustomButton extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' }).innerHTML =
        '<button id="button-inside-custom-button"><slot></slot></button>';
    }
  }

  class CustomSpan extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' }).innerHTML =
        '<span id="span-inside-custom-span"><slot></slot></span>';
    }
  }

  class FocusTrapModal extends HTMLElement {
    focusTrap;

    constructor() {
      super();
      this.id = 'in-open-shadow-dom-host';

      // use same styles as host
      const styleLinkEl = document.createElement('link');
      styleLinkEl.setAttribute('rel', 'stylesheet');
      styleLinkEl.setAttribute('href', 'style.css');

      const shadowEl = this.attachShadow({ mode: 'open' });
      shadowEl.innerHTML = '<slot></slot>';

      shadowEl.appendChild(styleLinkEl);

      this.focusTrap = createFocusTrap(this, {
        onActivate: () => {
          const content = this.querySelector('custom-content');

          content.classList.add('is-active');
        },
        onDeactivate: () => {
          const content = this.querySelector('custom-content');

          content.classList.remove('is-active');
        },
        // allow outside clicks to deactivate to verify clicking on shadowDOM components within
        //  a focus trap's container should not deactivate the focus trap (#959)
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        tabbableOptions: {
          getShadowRoot: true,
        },
      });

      document
        .getElementById('activate-in-open-shadow-dom')
        .addEventListener('click', this.focusTrap.activate);
    }

    connectedCallback() {
      const customContent = this.querySelector('custom-content');

      if (customContent) {
        customContent.focusTrap = this.focusTrap;
      }
    }
  }

  class FocusableCustomContent extends HTMLElement {
    constructor() {
      super();

      const modalEl = document.createElement('div');
      modalEl.id = 'in-open-shadow-dom-trap';
      modalEl.className = 'trap';
      modalEl.innerHTML = `
        <p>
          Here is a focus trap in an open Shadow DOM
          <a href="#">with</a> <a href="#">some</a> <a href="#">focusable</a> parts.
        </p>
        <p>
          💬 Clicking anywhere outside the trap will deactivate it, but clicking on any element
          inside it, including those in nested shadow DOMs, will not.
        </p>
        <p>
          <custom-button>Shadow Button</custom-button>
          <button>Light DOM Button</button>
          <custom-span>Shadow Span</custom-span>
          <button id="deactivate-in-open-shadow-dom" aria-describedby="in-open-shadow-dom-heading">
            deactivate trap
          </button>
        </p>
      `;

      const style = document.createElement('style');
      style.innerHTML = `
        :host(:focus-visible) #in-open-shadow-dom-trap {
          outline: 5px solid lightblue; 
        }

        :host(.is-active) #in-open-shadow-dom-trap {
          background: #fee9ff;
        }
      `;
      // use same styles as host
      const styleLinkEl = document.createElement('link');
      styleLinkEl.setAttribute('rel', 'stylesheet');
      styleLinkEl.setAttribute('href', 'style.css');

      const shadowRoot = this.attachShadow({ mode: 'open' });

      shadowRoot.appendChild(styleLinkEl);
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(modalEl);

      modalEl
        .querySelector('#deactivate-in-open-shadow-dom')
        .addEventListener('click', () => {
          this.deactivate();
        });
    }

    deactivate = () => {
      this.focusTrap.deactivate();
    };
  }

  customElements.define('focus-trap-modal', FocusTrapModal);
  customElements.define('custom-button', CustomButton);
  customElements.define('custom-span', CustomSpan);
  customElements.define('custom-content', FocusableCustomContent);
};
