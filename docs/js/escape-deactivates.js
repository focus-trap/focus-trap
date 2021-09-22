const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('escape-deactivates');
  const escapeDeactivatesOption = document.getElementById(
    'escape-deactivates-option'
  );

  const focusTrap = createFocusTrap('#escape-deactivates', {
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
    escapeDeactivates: () => escapeDeactivatesOption.checked,

    // allow clicking on the checkbox or its label since it's outside the trap
    allowOutsideClick: (e) =>
      e.target === escapeDeactivatesOption ||
      e.target === escapeDeactivatesOption.parentNode,
  });

  document
    .getElementById('activate-escape-deactivates')
    .addEventListener('click', focusTrap.activate);
  document
    .getElementById('deactivate-escape-deactivates')
    .addEventListener('click', focusTrap.deactivate);
};
