import { createFocusTrap } from '../../index';

describe('document option', () => {
  let trap;

  beforeEach(() => cy.visit('index.html?bundle=cypress'));

  afterEach(() => {
    trap?.deactivate({ returnFocus: false });
  });

  it('preserves a draft when activating a trap in an iframe', () => {
    cy.document().then((doc) => {
      const iframe = doc.createElement('iframe');
      doc.body.appendChild(iframe);
      const iframeDocument = iframe.contentDocument;
      const input = iframeDocument.createElement('input');
      input.value = 'hello';
      iframeDocument.body.appendChild(input);
      input.focus();
      input.setSelectionRange(5, 5);

      trap = createFocusTrap(iframeDocument.body, {
        document: iframeDocument,
        delayInitialFocus: false,
      });
      trap.activate();

      cy.wrap(input).should('have.prop', 'selectionStart', 5);
      cy.wrap(input).should('have.prop', 'selectionEnd', 5);
      cy.wrap(input).type('!');
      cy.wrap(input).should('have.value', 'hello!');
    });
  });
});
