const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('isolate-subtree');
  const altContainer = document.getElementById('isolate-subtree-alt-container');

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

  document
    .getElementById('activate-isolate-subtree')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-isolate-subtree')
    .addEventListener('click', focusTrap.deactivate);
};
