describe('focus-trap', () => {
  beforeEach(() => cy.visit('index.html'));

  describe('demo: default', () => {
    it('traps focus tab sequence and allows deactivation by clicking deactivate button', () => {
      cy.get('#demo-default').as('testRoot');

      // activate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElementBeforeTrapIsActivated')
        .click();

      // 1st element should be focused
      cy.get('@testRoot')
        .findByRole('link', { name: 'with' })
        .as('firstElementInTrap')
        .should('be.focused');

      // trap is active(keep focus in trap by blocking clicks on outside focusable element)
      cy.get('#return-to-repo').click();
      cy.get('@firstElementInTrap').should('be.focused');

      // trap is active(keep focus in trap by blocking clicks on outside un-focusable element)
      cy.get('#default-heading').click();
      cy.get('@firstElementInTrap').should('be.focused');

      // trap is active(keep focus in trap by tabbing through the focus trap's tabbable elements)
      cy.get('@firstElementInTrap')
        .tab()
        .should('have.text', 'some')
        .should('be.focused')
        .tab()
        .should('have.text', 'focusable')
        .should('be.focused')
        .tab()
        .as('lastElementInTrap')
        .should('contain', 'deactivate trap')
        .should('be.focused')
        .tab();

      // trap is active(keep focus in trap by shift-tabbing through the focus trap's tabbable elements)
      cy.get('@firstElementInTrap').should('be.focused').tab({ shift: true });
      cy.get('@lastElementInTrap').should('be.focused');

      // trap can be deactivated and return focus to lastly focused element before trap is activated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      cy.get('@lastlyFocusedElementBeforeTrapIsActivated').should('have.focus');

      // focus can be transitioned freely when trap is unmounted
      let previousFocusedEl;
      cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
        .then(([lastlyFocusedEl]) => (previousFocusedEl = lastlyFocusedEl))
        .tab();
      cy.focused().should(([nextFocusedEl]) =>
        expect(nextFocusedEl).not.equal(previousFocusedEl)
      );
    });

    it('allows deactivation by pressing ESC', () => {
      cy.get('#demo-default').as('testRoot');

      // activate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElementBeforeTrapIsActivated')
        .click();

      // 1st element should be focused
      cy.get('@testRoot')
        .findByRole('link', { name: 'with' })
        .as('firstElementInTrap')
        .should('be.focused');

      // trap is active(keep focus in trap by blocking clicks on outside focusable element)
      cy.get('#return-to-repo').click();
      cy.get('@firstElementInTrap').should('be.focused');

      // trap can be deactivated with ESC and return focus to lastly focused element before trap is activated
      cy.get('@firstElementInTrap').type('{esc}');
      cy.get('@lastlyFocusedElementBeforeTrapIsActivated').should('have.focus');

      // focus can be transitioned freely when trap is unmounted
      let previousFocusedEl;
      cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
        .then(([lastlyFocusedEl]) => (previousFocusedEl = lastlyFocusedEl))
        .tab();
      cy.focused().should(([nextFocusedEl]) =>
        expect(nextFocusedEl).not.equal(previousFocusedEl)
      );
    });
  });

  describe('demo: iene', () => {
    // TODO
  });

  describe('demo: ifc', () => {
    // TODO
  });

  describe('demo: ht', () => {
    // TODO
  });

  describe('demo: nested', () => {
    // TODO
  });

  describe('demo: sibling', () => {
    // TODO
  });

  describe('demo: tif', () => {
    // TODO
  });

  describe('demo: input', () => {
    // TODO
  });

  describe('demo: delay', () => {
    // TODO
  });

  describe('demo: radio', () => {
    // TODO
  });

  describe('demo: iframe', () => {
    // TODO
  });

  describe('demo: allowoutsideclick', () => {
    // TODO
  });

  describe('demo: clickoutsidedeactivates', () => {
    // TODO
  });

  describe('demo: setreturnfocus', () => {
    // TODO
  });
});
