describe('focus-trap', () => {
  beforeEach(() => cy.visit('index.html'));

  function verifyCrucialFocusTrapOnClicking(focusedElAlias) {
    // trap is active(keep focus in trap by blocking clicks on outside focusable element)
    cy.findAllByRole('link', { name: 'Return to the repository' })
      .first()
      .click();
    cy.get(focusedElAlias).should('be.focused');

    // trap is active(keep focus in trap by blocking clicks on outside un-focusable element)
    cy.findByRole('heading', { name: 'focus-trap demo' }).click();
    cy.get(focusedElAlias).should('be.focused');
  }

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
    beforeEach(() => {
      cy.get('#demo-iene').as('testRoot');
    })

    it('On trap activation, focus on manually specified input element', () => {
      // activate trap
      cy.get('@testRoot').findByRole('button', { name: 'activate trap' }).click();

      // instead of next tab-order element being focused, element specified should be focused
      cy.get('@testRoot')
        .findByRole('textbox', { name: 'Initially focused input' })
        .as('focusedEl')
        .should('be.focused');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@focusedEl');
    });

    it('Escape key does not deactivate trap. Instead, click on "deactivate trap" to deactivate trap', () => {
      // activate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElementBeforeTrapIsActivated')
        .click();

      // trying deactivate trap by ESC
      cy.get('@testRoot')
        .findByRole('textbox', { name: 'Initially focused input' })
        .as('trapChild')
        .focus()
        .type('{esc}');

      // ESC does not deactivate the trap
      cy.get('@trapChild').should('exist').should('be.focused');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@trapChild');

      // click on deactivate trap button to deactivate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      cy.get('@lastlyFocusedElementBeforeTrapIsActivated').should('be.focused');
    });

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
