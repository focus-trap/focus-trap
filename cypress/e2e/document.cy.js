import { createFocusTrap } from '../../index';

describe('document option', () => {
  let trap;
  let input;

  beforeEach(() => {
    cy.visit('index.html?bundle=cypress');
    cy.document()
      .then(
        (doc) =>
          new Cypress.Promise((resolve) => {
            const iframe = doc.createElement('iframe');
            // Wait for the initial load before inserting content into the iframe.
            iframe.addEventListener(
              'load',
              () => resolve(iframe.contentDocument),
              { once: true }
            );
            doc.body.appendChild(iframe);
          })
      )
      .then((iframeDocument) => {
        const container = iframeDocument.createElement('div');
        iframeDocument.body.appendChild(container);
        input = iframeDocument.createElement('input');
        input.value = 'hello';
        container.appendChild(input);
        input.focus();

        trap = createFocusTrap(container, {
          document: iframeDocument,
          delayInitialFocus: false,
        });
      });
  });

  afterEach(() => {
    trap?.deactivate({ returnFocus: false });
  });

  it('preserves a draft when activating a trap in an iframe', () => {
    input.setSelectionRange(5, 5);
    trap.activate();

    cy.wrap(input).should('have.prop', 'selectionStart', 5);
    cy.wrap(input).should('have.prop', 'selectionEnd', 5);
    cy.wrap(input).type('!');
    cy.wrap(input).should('have.value', 'hello!');
  });

  it('restores focus when the initially focused iframe input is removed', () => {
    const button = input.ownerDocument.createElement('button');
    button.textContent = 'Next';
    input.after(button);

    trap.activate();
    input.remove();

    cy.wrap(button).should('be.focused');
  });
});
