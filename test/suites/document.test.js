import { waitFor } from '@testing-library/dom';

import { createFocusTrap } from '../../index';

describe.each(['main document', 'iframe', 'iframe with shadow DOM'])(
  'input selection in %s',
  (context) => {
    let trap;
    let input;

    beforeEach(() => {
      let doc = document;
      if (context !== 'main document') {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        doc = iframe.contentDocument;
      }

      const container = doc.createElement('div');
      doc.body.appendChild(container);
      const inputContainer =
        context === 'iframe with shadow DOM'
          ? container.attachShadow({ mode: 'open' })
          : container;
      input = doc.createElement('input');
      input.value = 'hello';
      inputContainer.appendChild(input);

      trap = createFocusTrap(container, {
        document: doc,
        delayInitialFocus: false,
        tabbableOptions: { displayCheck: 'none', getShadowRoot: true },
      });
    });

    afterEach(() => {
      trap.deactivate({ returnFocus: false });
    });

    it.each([
      ['caret', 5, 5],
      ['selection', 1, 3],
    ])('preserves the %s of an already focused input', (_, start, end) => {
      input.focus();
      input.setSelectionRange(start, end);

      trap.activate();

      expect(input.getRootNode().activeElement).toBe(input);
      expect(input.selectionStart).toBe(start);
      expect(input.selectionEnd).toBe(end);
    });

    it('selects the text when moving focus to a different input', () => {
      trap.activate();

      expect(input.getRootNode().activeElement).toBe(input);
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(input.value.length);
    });
  }
);

describe.each(['main document', 'iframe'])(
  'removal of an already-focused input in %s',
  (context) => {
    let trap;

    afterEach(() => {
      trap?.deactivate({ returnFocus: false });
    });

    it.each([
      ['default delayed', {}],
      ['synchronous', { delayInitialFocus: false }],
    ])('restores focus with %s activation', async (_, options) => {
      let doc = document;
      if (context === 'iframe') {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        doc = iframe.contentDocument;
      }

      const container = doc.createElement('div');
      const input = doc.createElement('input');
      const remainingButton = doc.createElement('button');
      remainingButton.textContent = 'Remaining';
      container.append(input, remainingButton);
      doc.body.appendChild(container);
      input.focus();

      const onPostActivate = jest.fn();
      trap = createFocusTrap(container, {
        document: doc,
        tabbableOptions: { displayCheck: 'none' },
        onPostActivate,
        ...options,
      });
      trap.activate();
      await waitFor(() => expect(onPostActivate).toHaveBeenCalledTimes(1));
      expect(input).toHaveFocus();

      input.remove();

      await waitFor(() => expect(remainingButton).toHaveFocus());
    });
  }
);
