import { createFocusTrap } from '../../index';

describe('cancelled activation', () => {
  it('does not trap focus after initial focus synchronously deactivates it', () => {
    cy.visit('index.html?bundle=cypress');
    cy.document().then((doc) => {
      const outside = doc.createElement('button');
      const container = doc.createElement('div');
      const inside = doc.createElement('button');
      container.appendChild(inside);
      doc.body.append(outside, container);
      const trap = createFocusTrap(container, {
        document: doc,
        delayInitialFocus: false,
      });
      inside.addEventListener(
        'focus',
        () => trap.deactivate({ returnFocus: false }),
        {
          once: true,
        }
      );
      trap.activate();
      expect(trap.active).to.equal(false);
      outside.focus();
      expect(doc.activeElement).to.equal(outside);
      outside.remove();
      container.remove();
    });
  });

  it('does not finish a cancelled asynchronous activation', () => {
    cy.visit('index.html?bundle=cypress');
    cy.document().then((doc) => {
      const trigger = doc.createElement('button');
      const container = doc.createElement('div');
      container.appendChild(doc.createElement('button'));
      doc.body.append(trigger, container);
      trigger.focus();

      let resolvePermission;
      const onPostActivate = cy.stub();
      const trap = createFocusTrap(container, {
        document: doc,
        delayInitialFocus: false,
        checkCanFocusTrap: () =>
          new Cypress.Promise((resolve) => (resolvePermission = resolve)),
        onPostActivate,
      });
      trap.activate();
      trap.deactivate({ returnFocus: false });
      resolvePermission();
      return Cypress.Promise.resolve().then(() => {
        expect(onPostActivate).not.to.have.been.called;
        expect(doc.activeElement).to.equal(trigger);
        trigger.remove();
        container.remove();
      });
    });
  });
});
