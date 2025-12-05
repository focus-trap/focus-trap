const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('isolate-subtree');

  const focusTrap = createFocusTrap(container, {
    isolateSubtree: true,
  });

  document
    .getElementById('activate-isolate-subtree')
    .addEventListener('click', focusTrap.activate);

  document
    .getElementById('deactivate-isolate-subtree')
    .addEventListener('click', focusTrap.deactivate);
};
