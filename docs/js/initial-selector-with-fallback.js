const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('iswf');
  const activateTrigger = document.getElementById('activate-iswf');
  const deactivateTrigger = document.getElementById('deactivate-iswf');
  const checkbox = document.getElementById('checkbox-iswf');
  const button = document.getElementById('initial-focus-btn-iswf');
  const buttonParent = button.parentNode;

  const initialize = function () {
    return createFocusTrap(container, {
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => container.classList.remove('is-active'),
      fallbackFocus: container,

      // NOTE: it's important to use a selector, not a reference to `button`,
      //  as the option so that every time the trap is initialized, the DOM
      //  is queried for the node, and the resulting trap behavior reflects
      //  whether the node can be found or not
      initialFocus: '#initial-focus-btn-iswf',
    });
  };

  const focusTrap = initialize();

  activateTrigger.addEventListener('click', () => focusTrap.activate());
  deactivateTrigger.addEventListener('click', () => focusTrap.deactivate());
  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      buttonParent.appendChild(button);
    } else {
      button.remove();
    }
  });
};
