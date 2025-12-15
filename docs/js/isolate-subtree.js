const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('isolate-subtree');
  const altContainer = document.getElementById('isolate-subtree-alt-container');
  const nestedTrapContainer = document.getElementById('isolate-subtree-nested');
  const secondTrapContainer = document.getElementById(
    'isolate-subtree-sibling'
  );

  const stack = [];

  const focusTrap = createFocusTrap([container, altContainer], {
    trapStack: stack,
    isolateSubtrees: true,
    onActivate: () => {
      container.classList.add('is-active');
      altContainer.classList.add('is-active');
    },
    onDeactivate: () => {
      container.classList.remove('is-active');
      altContainer.classList.remove('is-active');
    },
  });

  const nestedTrap = createFocusTrap(nestedTrapContainer, {
    trapStack: stack,
    isolateSubtrees: true,
    onActivate: () => {
      nestedTrapContainer.classList.add('is-active');
    },
    onDeactivate: () => {
      nestedTrapContainer.classList.remove('is-active');
    },
  });

  const secondTrap = createFocusTrap(secondTrapContainer, {
    trapStack: stack,
    isolateSubtrees: true,
    onActivate: () => {
      secondTrapContainer.classList.add('is-active');
      stack.at(-1).pause();
    },
    onDeactivate: () => {
      secondTrapContainer.classList.remove('is-active');
    },
    checkCanFocusTrap: (trapContainers) => {
      const results = trapContainers.map((trapContainer) => {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (!trapContainer.closest('[inert]')) {
              resolve();
              clearInterval(interval);
            }
          }, 5);
        });
      });
      // Return a promise that resolves when all the trap containers are able to receive focus
      return Promise.all(results);
    },
  });

  document
    .getElementById('activate-isolate-subtree')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-isolate-subtree')
    .addEventListener('click', focusTrap.deactivate);

  document
    .getElementById('activate-nested-isolate-subtree')
    .addEventListener('click', nestedTrap.activate);

  document
    .getElementById('deactivate-nested-isolate-subtree')
    .addEventListener('click', nestedTrap.deactivate);

  document
    .getElementById('activate-second-isolate-subtree')
    .addEventListener('click', secondTrap.activate);

  document
    .getElementById('deactivate-second-isolate-subtree')
    .addEventListener('click', secondTrap.deactivate);
};
