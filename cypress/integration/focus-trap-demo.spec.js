describe('focus-trap', () => {
  beforeEach(() => cy.visit('index.html'));

  /**
   * Verify focus trap is **trapping** focus by clicking outside element
   * @param focusedElSelectorOrAliasInTrap Element in trap that should have focus when outside element is clicked
   */
  function verifyCrucialFocusTrapOnClicking(focusedElSelectorOrAliasInTrap) {
    // trap is active(keep focus in trap by blocking clicks on outside focusable element)
    cy.findAllByRole('link', { name: 'Return to the repository' })
      .first()
      .click();
    cy.get(focusedElSelectorOrAliasInTrap).should('be.focused');

    // trap is active(keep focus in trap by blocking clicks on outside un-focusable element)
    cy.findByRole('heading', { name: 'focus-trap demo' }).click();
    cy.get(focusedElSelectorOrAliasInTrap).should('be.focused');
  }

  /**
   * Verify focus trap is **NOT** trapping focus by tab
   * @param cyWrapper Cypress object of outside focused element yielded from `cy.get/contains/findByRole...etc`
   */
  function verifyFocusIsNotTrapped(cyWrapper) {
    const outsideFocusedElAlias = `outsideFocusedEl`;
    cyWrapper.as(outsideFocusedElAlias).should('be.focused');
    // focus can be transitioned freely when trap is unmounted
    let previousFocusedEl;
    cy.get(`@${outsideFocusedElAlias}`)
      .then(([lastlyFocusedEl]) => {
        return (previousFocusedEl = lastlyFocusedEl);
      })
      .tab();
    cy.focused().should(([nextFocusedEl]) =>
      expect(nextFocusedEl).not.equal(previousFocusedEl)
    );
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

      // focus can be transitioned freely when trap is deactivated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      verifyFocusIsNotTrapped(
        cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
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

      // focus can be transitioned freely when trap is deactivated
      cy.get('@firstElementInTrap').type('{esc}');
      verifyFocusIsNotTrapped(
        cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
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
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .click();

      // instead of next tab-order element being focused, element specified should be focused
      cy.get('@testRoot')
        .findByRole('textbox', { name: 'Initially focused input' })
        .as('focusedEl')
        .should('be.focused');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@focusedEl');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
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

      // focus can be transitioned freely when trap is deactivated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      verifyFocusIsNotTrapped(
        cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
      );
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
      cy.findByRole('heading', { name: 'focus-trap demo' })
        .as('outsideFocusedEl')
        .click();
      cy.get('@firstTabbableElInTrap').should('be.not.focused');

      // focus can be transitioned freely when trap is deactivated
      verifyFocusIsNotTrapped(cy.get('@outsideFocusedEl'));
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
        .as('lastlyFocusedElBeforeTrapIsActivated')
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

      // focus can be transitioned freely when trap is deactivated
      cy.focused().type('{esc}');
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('demo: nested', () => {
    it('focus is trapped in the innermost trap of nested traps', () => {
      cy.get('#demo-nested').as('testRoot');

      // activate outer trap and element in outer trap should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .click();

      cy.findByRole('button', { name: 'deactivate outer trap' })
        .as('firstTabbableElInOuterTrap')
        .should('be.focused');

      verifyCrucialFocusTrapOnClicking('@firstTabbableElInOuterTrap');

      // activate inner trap and element in inner trap should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate inner trap' })
        .as('lastlyFocusedElInOuterTrap')
        .click();

      cy.get('@testRoot')
        .findByRole('button', { name: 'nothing' })
        .should('be.focused')
        .as('focusedElInInnerTrap');

      verifyCrucialFocusTrapOnClicking('@focusedElInInnerTrap');

      // only element in the innermost active trap can be focused
      cy.get('@firstTabbableElInOuterTrap').click().should('not.be.focused');

      // deactivate inner trap and outer trap element can be focused again
      cy.findByRole('button', {
        name: 'deactivate and close inner trap',
      }).click();
      cy.get('@lastlyFocusedElInOuterTrap').should('be.focused');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@firstTabbableElInOuterTrap').click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('demo: sibling', () => {
    it('focus returns to lastly activated sibling trap when current trap is deactivated', () => {
      cy.get('#demo-sibling').as('testRoot');

      // activate 1st sibling trap and element in 1st sibling trap should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate first trap' })
        .as('elInFirstTrap')
        .click();
      verifyCrucialFocusTrapOnClicking('@elInFirstTrap');

      // activate 2nd sibling trap and element in 2nd sibling trap should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate second trap' })
        .as('firstElInFirstTrap')
        .click();
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate second trap' })
        .as('deactivateElInSecondTrap');
      verifyCrucialFocusTrapOnClicking('@deactivateElInSecondTrap');

      // deactivate 2nd sibling trap and element should return to lastly focused element in 1st sibling trap
      cy.get('@deactivateElInSecondTrap').click();
      cy.get('@firstElInFirstTrap').should('be.focused');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate first trap' })
        .click();
      cy.findByRole('heading', { name: 'focus-trap demo' })
        .as('outsideEl')
        .click();
      verifyFocusIsNotTrapped(cy.get('@outsideEl'));
    });
  });

  describe('demo: tif', () => {
    it(`when trap is activated, if there is not any tabbable element in the trap, focus-trap will try to focus the element specified by option "fallbackFocus"`, () => {
      cy.get('#demo-tif').as('testRoot');

      // activate trap(no tabbable element inside) and the container element(which is the fallback element specified) should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('activate')
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .click();
      cy.get('@testRoot').get('#tif').should('be.focused');
      verifyCrucialFocusTrapOnClicking('#tif');

      // deactivate trap and element outside of trap can be focused again
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .as('deactivate')
        .click();
      cy.get('@lastlyFocusedElBeforeTrapIsActivated').should('be.focused');

      // activate trap(tabbable element inside) and the first tabbable element should be focused;
      cy.get('@testRoot')
        .findByRole('button', { name: 'show focusable button' })
        .click();
      cy.get('@activate').click();
      cy.get('@testRoot')
        .findByRole('button', { name: 'hide focusable button' })
        .as('firstTabbableElInOuterTrap')
        .should('be.focused');
      verifyCrucialFocusTrapOnClicking('@firstTabbableElInOuterTrap');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@deactivate').click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('demo: input', () => {
    it(`if current focused element is already in the trap, focus activation does not change its selection range"`, () => {
      cy.get('#demo-input-activation').as('testRoot');

      // trap is activated after input change and input selection range is not changed
      cy.get('@testRoot')
        .get('#focused-input8')
        .as('inputElInTrap')
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .type('1');
      verifyCrucialFocusTrapOnClicking('@inputElInTrap');

      cy.get('@inputElInTrap').then(([input]) => {
        expect(input.selectionStart).to.equal('1'.length);
        expect(input.selectionEnd).to.equal('1'.length);
      });

      // focus can be transitioned freely when trap is deactivated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('demo: delay', () => {
    it('activates the focus trap when delayInitialFocus is set to true', () => {
      cy.get('#delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('0.2');
      });
      cy.get('#activate-delay')
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .type('{enter}');
      cy.get('#delay').should('have.class', 'trap is-active');
      cy.get('#delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('1');
      });
      cy.get('#close-button-delay').as('hideButtonInTrap').should('have.focus');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@hideButtonInTrap');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@hideButtonInTrap').click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });

    it('activates the focus trap when delayInitialFocus is set to false', () => {
      cy.get('#no-delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('0.2');
      });
      cy.get('#activate-no-delay')
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .type('{enter}');
      cy.get('#no-delay').should('have.class', 'trap is-active');
      cy.get('#no-delay').should(($div) => {
        expect($div[0].style.opacity).to.equal('1');
      });
      cy.get('#close-button-no-delay')
        .as('hideButtonInTrap')
        .should('have.focus');

      // crucial focus-trap feature: mouse click is trapped
      verifyCrucialFocusTrapOnClicking('@hideButtonInTrap');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@hideButtonInTrap').click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('demo: radio', () => {
    it('radio group in active trap can have its value changed', () => {
      cy.get('#demo-radio').as('testRoot');

      // activate trap and 1st element in focus should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .click();
      cy.get('@testRoot').findByRole('radio', { name: 'b' }).as('radioB');
      verifyCrucialFocusTrapOnClicking('@radioB');

      /*
       radio group value can be changed
      */

      // Cypress limitation to radio group value change: keyboard arrow keys can't change value
      // so forcibly change the value by `check` command
      //    cy.findByRole('group', { name: 'Radio group in trap' }).type('{downArrow}');
      //    cy.get('@radioB').type('{downArrow}');
      cy.get('@testRoot')
        .findByRole('radio', { name: 'c' })
        .as('radioC')
        .check()
        .should('be.checked');

      // 'Tab' in trap should only focus the checked radio item without changing radio group value
      cy.get('@radioC').focus();
      cy.tab();
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .as('deactivateElInTrap')
        .should('be.focused');
      cy.tab();
      cy.get('@radioC').should('be.focused');

      // focus can be transitioned freely when trap is deactivated
      cy.get('@deactivateElInTrap').click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('demo: iframe', () => {
    it('focus can be moved freely in the iframe inside of trap', () => {
      cy.get('#demo-iframe').as('testRoot');

      // activate trap and element trap should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .click();
      cy.get('@testRoot')
        .findByRole('button', { name: 'nothing' })
        .as('firstElInTrap')
        .should('be.focused');
      verifyCrucialFocusTrapOnClicking('@firstElInTrap');

      /*
       focus can move into/out of iframe in trap
       Due to cypress limitation(see below), `tab` is not tested
      */

      // Cypress limitation: `cy.tab()` skips focus on <iframe>
      // cy.tab();
      cy.get('@testRoot').find('iframe').as('iframeInTrap');
      cy.get('@iframeInTrap').then(([iframe]) => {
        // Cypress limitation: TypeError: Cannot read property 'call' of undefined
        // cy.wrap(iframe.contentDocument).find('a').should('exist');
        const buttonEl = iframe.contentDocument.querySelector('button');
        cy.wrap(buttonEl).as('buttonInIFrame').click();
        cy.get('@buttonInIFrame').should('be.focused');

        verifyCrucialFocusTrapOnClicking('@buttonInIFrame');
      });

      // focus can be transitioned freely when trap is deactivated
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .as('deactivateElInTrap')
        .click();
      verifyFocusIsNotTrapped(cy.get('@lastlyFocusedElBeforeTrapIsActivated'));
    });
  });

  describe('Click outside go through', () => {
    const activateTrap = function () {
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElementBeforeTrapIsActivated')
        .click();
    };

    const checkTrap = function (lastElementInTrapText) {
      // 1st element should be focused
      cy.get('@testRoot')
        .findByRole('link', { name: 'with' })
        .as('firstElementInTrap')
        .should('be.focused');

      // trap is active (keep focus in trap by tabbing through the focus trap's tabbable elements)
      cy.get('@firstElementInTrap')
        .tab()
        .should('have.text', 'some')
        .should('be.focused')
        .tab()
        .should('have.text', 'focusable')
        .should('be.focused')
        .tab()
        .as('lastElementInTrap')
        .should('contain', lastElementInTrapText)
        .should('be.focused')
        .tab();

      // trap is active (keep focus in trap by shift-tabbing through the focus trap's tabbable elements)
      cy.get('@firstElementInTrap').should('be.focused').tab({ shift: true });
      cy.get('@lastElementInTrap').should('be.focused');
    };

    describe('demo: allowoutsideclick', () => {
      it('click on outside element should work while keeping focus trapped inside of trap(createOptions.allowOutsideClick: boolean(true)', () => {
        cy.get('#demo-allowoutsideclick').as('testRoot');

        // activate trap and element trap should be focused
        activateTrap();
        checkTrap('deactivate trap');

        // click on outside element goes through. In this case, the click deactivates the trap
        cy.get('@lastlyFocusedElementBeforeTrapIsActivated').click();
        verifyFocusIsNotTrapped(
          cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
        );
      });

      it('click on outside element should work while keeping focus trapped inside of trap(createOptions.allowOutsideClick = () => true)', () => {
        cy.get('#demo-allowoutsideclick').as('testRoot');
        cy.get('@testRoot')
          .findByRole('combobox', { name: 'Set allowOutsideClick as:' })
          .select('function');

        // activate trap and element trap should be focused
        activateTrap();
        checkTrap('deactivate trap');

        // click on outside element goes through. In this case, the click deactivates the trap
        cy.get('@lastlyFocusedElementBeforeTrapIsActivated').click();
        verifyFocusIsNotTrapped(
          cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
        );
      });
    });

    describe('demo: clickoutsidedeactivates', () => {
      it('traps focus, deactivates on outside click on checkbox and checkbox focused, returnFocusOnDeactivate=true', () => {
        cy.get('#demo-clickoutsidedeactivates').as('testRoot');

        // set returnFocusOnDeactivate=TRUE
        cy.get(
          '#select-returnfocusondeactivate-clickoutsidedeactivates'
        ).select('true');

        activateTrap();
        checkTrap('nothing');

        // deactivate trap by toggling FOCUSABLE checkbox
        cy.get('#checkbox-clickoutsidedeactivates').click();
        cy.get('#checkbox-clickoutsidedeactivates').should('be.checked');

        // implies trap no longer active since checkbox is outside trap
        cy.get('#checkbox-clickoutsidedeactivates').should('be.focused');

        cy.get('@lastElementInTrap').should('not.be.focused');

        // focus can be transitioned freely when trap is deactivated
        verifyFocusIsNotTrapped(cy.get('#checkbox-clickoutsidedeactivates'));
      });

      it('traps focus, deactivates on outside click on document and "activate trap" button focused', () => {
        cy.get('#demo-clickoutsidedeactivates').as('testRoot');

        // set returnFocusOnDeactivate=TRUE
        cy.get(
          '#select-returnfocusondeactivate-clickoutsidedeactivates'
        ).select('true');

        activateTrap();
        checkTrap('nothing');

        // deactivate trap by clicking NON-focusable element
        cy.get('#clickoutsidedeactivates-heading').click();
        cy.get('@lastlyFocusedElementBeforeTrapIsActivated').should(
          'be.focused'
        );

        cy.get('@lastElementInTrap').should('not.be.focused');

        // focus can be transitioned freely when trap is deactivated
        verifyFocusIsNotTrapped(
          cy.get('@lastlyFocusedElementBeforeTrapIsActivated')
        );
      });

      it('traps focus, deactivates on outside click on checkbox and checkbox focused, returnFocusOnDeactivate=false', () => {
        cy.get('#demo-clickoutsidedeactivates').as('testRoot');

        // set returnFocusOnDeactivate=FALSE
        cy.get(
          '#select-returnfocusondeactivate-clickoutsidedeactivates'
        ).select('false');

        activateTrap();
        checkTrap('nothing');

        // deactivate trap by toggling FOCUSABLE checkbox
        cy.get('#checkbox-clickoutsidedeactivates').click();
        cy.get('#checkbox-clickoutsidedeactivates').should('be.checked');

        // implies trap no longer active since checkbox is outside trap
        cy.get('#checkbox-clickoutsidedeactivates').should('be.focused');

        cy.get('@lastElementInTrap').should('not.be.focused');

        // focus can be transitioned freely when trap is deactivated
        verifyFocusIsNotTrapped(cy.get('#checkbox-clickoutsidedeactivates'));
      });

      it('traps focus, deactivates on outside click on document, and nothing is focused', () => {
        cy.get('#demo-clickoutsidedeactivates').as('testRoot');

        // set returnFocusOnDeactivate=FALSE
        cy.get(
          '#select-returnfocusondeactivate-clickoutsidedeactivates'
        ).select('false');

        activateTrap();
        checkTrap('nothing');

        // deactivate trap by clicking NON-focusable element
        cy.get('#clickoutsidedeactivates-heading').click();

        cy.get('@lastlyFocusedElementBeforeTrapIsActivated').should(
          'not.be.focused'
        );
        cy.get('@lastElementInTrap').should('not.be.focused');
        cy.get('*:focus').should('not.exist'); // nothing has focus

        // focus can be transitioned freely when trap is deactivated
        cy.tab().as('outsideFocusedEl');
        verifyFocusIsNotTrapped(cy.get('@outsideFocusedEl'));
      });
    });
  });

  describe('demo: setreturnfocus', () => {
    it('specify element to receive focus after trap deactivation', () => {
      cy.get('#demo-setreturnfocus').as('testRoot');

      // activate trap and element trap should be focused
      cy.get('@testRoot')
        .findByRole('button', { name: 'activate trap' })
        .as('lastlyFocusedElBeforeTrapIsActivated')
        .click();
      cy.get('@testRoot')
        .findByRole('link', { name: 'with' })
        .as('firstElInTrap')
        .should('be.focused');
      verifyCrucialFocusTrapOnClicking('@firstElInTrap');

      // after trap deactivation, focus returns on element specified by `setReturnFocus` instead of lastly focused element before trap
      // activation
      cy.get('@testRoot')
        .findByRole('button', { name: 'deactivate trap' })
        .click();
      cy.get('@lastlyFocusedElBeforeTrapIsActivated').should('not.be.focused');
      cy.get('@testRoot')
        .findByRole('button', { name: 'Element to return' })
        .as('outsideFocusedEl')
        .should('be.focused');

      // focus can be transitioned freely when trap is deactivated
      verifyFocusIsNotTrapped(cy.get('@outsideFocusedEl'));
    });
  });
});
