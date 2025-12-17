const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('isolate-subtree');
  const altContainer = document.getElementById('isolate-subtree-alt-container');
  const nestedTrapContainer = document.getElementById('isolate-subtree-nested');
  const secondTrapContainer = document.getElementById(
    'isolate-subtree-sibling'
  );

  const focusTrap = createFocusTrap([container, altContainer], {
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
    isolateSubtrees: true,
    onActivate: () => {
      nestedTrapContainer.classList.add('is-active');
    },
    onDeactivate: () => {
      nestedTrapContainer.classList.remove('is-active');
    },
  });

  const secondTrap = createFocusTrap(secondTrapContainer, {
    isolateSubtrees: true,
    onActivate: () => {
      secondTrapContainer.classList.add('is-active');
    },
    onDeactivate: () => {
      secondTrapContainer.classList.remove('is-active');
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
