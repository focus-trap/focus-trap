import { waitFor } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { createFocusTrap } from '../../index';

// NOTE: in jest, the only display check that's expected to work is 'none' because
//  jsDom doesn't support the APIs needed to make the other modes work
const tabbableOptions = {
  displayCheck: 'none',
  getShadowRoot: true,
};

function getInnermostActiveElement(root) {
  const activeElement = root.activeElement;
  if (!activeElement) {
    return null;
  }

  if (activeElement.shadowRoot?.activeElement) {
    return getInnermostActiveElement(activeElement.shadowRoot);
  }

  return activeElement;
}

function defineTestCustomElements(container) {
  function updateTrap(trap, isOpen) {
    if (isOpen) {
      trap.activate();
    } else {
      trap.deactivate();
    }
  }

  class TestCase extends HTMLElement {
    constructor() {
      super();
      const template = container.querySelector('#testCaseTemplate');
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.append(document.importNode(template.content, true));
    }
  }

  customElements.define('test-case', TestCase);

  class CustomDialog extends HTMLElement {
    static observedAttributes = ['open'];

    constructor() {
      super();

      const template = container.querySelector('#testDialogTemplate');
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.append(document.importNode(template.content, true));

      this.focusTrap = createFocusTrap(this, {
        tabbableOptions: {
          ...tabbableOptions,
        },
      });
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'open') {
        updateTrap(this.focusTrap, newValue !== null);
      }
    }
  }

  customElements.define('test-dialog', CustomDialog);

  class CustomPicker extends HTMLElement {
    static observedAttributes = ['open'];

    constructor() {
      super();

      const template = container.querySelector('#testPickerTemplate');
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.append(document.importNode(template.content, true));

      this.trigger = shadowRoot.querySelector('#trigger');
      this.optionsContainer = shadowRoot.querySelector('#optionsContainer');

      this.focusTrap = createFocusTrap(this.optionsContainer, {
        clickOutsideDeactivates: true,
        tabbableOptions: {
          ...tabbableOptions,
        },
        setReturnFocus: false,
        onDeactivate: () => {
          this.removeAttribute('open');
        },
      });
    }

    connectedCallback() {
      this.trigger.addEventListener('click', () => {
        this.toggleAttribute('open');
      });
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'open') {
        updateTrap(this.focusTrap, newValue !== null);
      }
    }
  }

  customElements.define('test-picker', CustomPicker);
}

describe('shadow DOM', () => {
  it('should use innermost active element when parent trap resumes in shadow DOM', async () => {
    /** @type {import('../tools/testingUtility.js').RenderResults} */
    const { containerEl } = renderFixture('shadowDom');
    defineTestCustomElements(containerEl);

    const testCase = containerEl.querySelector('test-case');

    const testCaseInput = testCase.shadowRoot.querySelector('#input');
    const dialog = testCase.shadowRoot.querySelector('#dialog');
    const dialogCloseButton = dialog.shadowRoot.querySelector('#closeButton');
    const picker = testCase.shadowRoot.querySelector('#picker');
    const pickerTrigger = picker.shadowRoot.querySelector('#trigger');
    const pickerInput = picker.shadowRoot.querySelector('#input');

    expect(document.body).toHaveFocus();

    dialog.toggleAttribute('open');

    await waitFor(() => expect(dialog.focusTrap.active).toBe(true));

    await waitFor(() =>
      expect(getInnermostActiveElement(document)).toBe(dialogCloseButton)
    );

    await userEvent.click(pickerTrigger);

    await waitFor(() => {
      expect(picker.focusTrap.active).toBe(true);
      expect(dialog.focusTrap.paused).toBe(true);
    });

    await waitFor(() => {
      expect(getInnermostActiveElement(document)).toBe(pickerInput);
    });

    await userEvent.click(testCaseInput);

    await waitFor(() => {
      expect(picker.focusTrap.active).toBe(false);
      expect(dialog.focusTrap.paused).toBe(false);
    });

    await waitFor(() => {
      expect(getInnermostActiveElement(document)).toBe(testCaseInput);
    });
  });
});
