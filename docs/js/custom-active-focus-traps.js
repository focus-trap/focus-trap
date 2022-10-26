const { createFocusTrap } = require('../../index');

module.exports = () => {
  const container = document.getElementById('custom-active-focus-traps');

  const activeFocusTraps = {
    activateTrap: (trap) => {
      container.classList.add('is-active');
    },
    deactivateTrap: (trap) => {
      container.classList.remove('is-active');
    },
  };

  const focusTrap = createFocusTrap(container, {
    activeFocusTraps,
  });

  document
    .getElementById('custom-active-focus-traps-activate')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('custom-active-focus-traps-deactivate')
    .addEventListener('click', focusTrap.deactivate);
};
