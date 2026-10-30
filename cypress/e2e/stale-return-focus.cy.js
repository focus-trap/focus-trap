import { createFocusTrap } from '../../index';

function deferred() {
  let resolve;
  const promise = new Cypress.Promise((finish) => {
    resolve = finish;
  });
  return { promise, resolve };
}

describe('superseded return focus', () => {
  [
    'pending activation',
    'parent callback',
    'separate stack',
    'reopen and close',
  ].forEach((scenario) => {
    it(`does not briefly steal focus after ${scenario}`, () => {
      cy.visit('index.html?bundle=cypress');
      cy.document().then((doc) => {
        const nodes = [];
        const traps = [];
        const stack = [];
        const returning = deferred();
        const activating = deferred();
        const completed = deferred();
        function mount(extra = {}) {
          const trigger = doc.createElement('button');
          const container = doc.createElement('div');
          const input = doc.createElement('input');
          input.value = 'keep this draft';
          container.appendChild(input);
          doc.body.append(trigger, container);
          nodes.push(trigger, container);
          const trap = createFocusTrap(container, {
            document: doc,
            trapStack: stack,
            delayInitialFocus: false,
            delayReturnFocus: false,
            ...extra,
          });
          traps.push(trap);
          return { trap, trigger, container, input };
        }
        let openThird = false;
        let next;
        const parent =
          scenario === 'parent callback'
            ? mount({
                onPostUnpause: () => {
                  if (openThird) {
                    next.trap.activate();
                    next.input.setSelectionRange(4, 4);
                  }
                },
              })
            : undefined;
        const first = mount({
          checkCanReturnFocus: () => returning.promise,
          onPostDeactivate: () => completed.resolve(),
        });
        next =
          scenario === 'reopen and close'
            ? first
            : mount({
                ...(scenario === 'pending activation' && {
                  checkCanFocusTrap: () => activating.promise,
                }),
                ...(scenario === 'separate stack' && { trapStack: [] }),
              });
        if (parent) {
          parent.container.appendChild(first.trigger);
          parent.trap.activate();
        }
        first.trigger.focus();
        first.trap.activate();
        const oldFocus = cy.stub();
        first.trigger.addEventListener('focus', oldFocus);
        openThird = true;
        first.trap.deactivate();
        if (!parent) next.trap.activate();
        if (scenario === 'reopen and close') {
          first.trap.deactivate({
            returnFocus: false,
            onPostDeactivate: () => {},
          });
        }
        next.input.setSelectionRange(4, 4);
        returning.resolve();
        return completed.promise
          .then(() => {
            expect(oldFocus).not.to.have.been.called;
            if (scenario !== 'pending activation') {
              expect(doc.activeElement).to.equal(next.input);
              expect(next.input.selectionStart).to.equal(4);
              expect(next.input.selectionEnd).to.equal(4);
            }
            activating.resolve();
            return Cypress.Promise.resolve();
          })
          .then(() => {
            expect(doc.activeElement).to.equal(next.input);
          })
          .finally(() => {
            openThird = false;
            traps
              .reverse()
              .forEach((trap) => trap.deactivate({ returnFocus: false }));
            nodes.forEach((node) => node.remove());
          });
      });
    });
  });
});
