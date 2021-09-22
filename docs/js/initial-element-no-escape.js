const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('iene');
  const activateTrigger = document.getElementById('activate-iene');
  const deactivateTrigger = document.getElementById('deactivate-iene');
  const select = document.getElementById('select-iene');

  const initialize = function ({ initialFocus = '#focused-input' }) {
    return createFocusTrap(container, {
      onActivate: () => container.classList.add('is-active'),
      onDeactivate: () => container.classList.remove('is-active'),
      initialFocus,
      escapeDeactivates: false,
    });
  };

  let focusTrap = initialize({ initialFocus: select.value });

  activateTrigger.addEventListener('click', () => focusTrap.activate());
  deactivateTrigger.addEventListener('click', () => focusTrap.deactivate());

  select.addEventListener('change', function (event) {
    let initialFocus = event.target.value;
    if (initialFocus === 'false') {
      initialFocus = false;
    } else if (initialFocus === 'function-false') {
      initialFocus = () => false;
    }
    // else, assume it's a selector

    focusTrap = initialize({
      initialFocus,
    });
  });
};
