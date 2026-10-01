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
