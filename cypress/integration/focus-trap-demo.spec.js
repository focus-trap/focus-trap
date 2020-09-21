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
    });

    it('On trap activation, focus on manually specified input element', () => {
      // activate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .click();

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
    beforeEach(() => {
      cy.get('#demo-ifc').as('testRoot');
    });

    it(`specify element to be focused(even with attribute tabindex="-1") after focus trap activation`, () => {
      // activate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .click();

      // instead of next tab-order element being focused, element specified should be focused
      cy.get('@testRoot').get('#ifc').as('focusedEl').should('be.focused');

      // active trap does not return focus back to 'tabindex="-1"' containing element, and keep focus inside of that containing element
      cy.get('@testRoot')
        .findByRole('button', { name: 'first' })
        .as('firstTabbableElInTrap')
        .tab()
        .tab()
        .tab();
      cy.get('@firstTabbableElInTrap').should('be.focused');

      // click on outside element deactivates this trap
      cy.findByRole('heading', { name: 'focus-trap demo' }).click();
      cy.get('@firstTabbableElInTrap').should('be.not.focused');
    });
  });

  describe('demo: ht', () => {
    beforeEach(() => {
      cy.get('#demo-ht').as('testRoot');
    });

    it('focusing on only visually available(display is not "none" and visibility is not "hidden") elements', () => {
      // activate trap
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .click();

      // only visually available elements can be tabbed thru
      cy.focused().as('firstTabbableElInTrap').tab().tab();
      cy.get('@firstTabbableElInTrap').should('be.focused');

      // Show some more elements within trap and they should be tabbable
      cy.get('@testRoot')
        .findByRole('button', { name: 'click to show more' })
        .click();
      cy.tab();
      cy.findByRole('button', { name: 'nothing again' }).should('be.focused');
      cy.tab();
      cy.findByRole('button', { name: 'click to show less' })
        .should('be.focused')
        .as('focusedElInTrap');

      verifyCrucialFocusTrapOnClicking('@focusedElInTrap');
    });
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
    it('activates the focus trap when delayInitialFocus is set to true', () => {
      cy.get('#delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('0.2');
      });
      cy.get('#activate-delay').type('{enter}');
      cy.get('#delay').should('have.class', 'trap is-active');
      cy.get('#delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('1');
      });
      cy.get('#close-button-delay').as('focusedEl').should('have.focus');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@focusedEl');
    });

    it('activates the focus trap when delayInitialFocus is set to false', () => {
      cy.get('#no-delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('0.2');
      });
      cy.get('#activate-no-delay').type('{enter}');
      cy.get('#no-delay').should('have.class', 'trap is-active');
      cy.get('#no-delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('1');
      });
      cy.get('#close-button-no-delay').as('focusedEl').should('have.focus');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@focusedEl');
    });
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
