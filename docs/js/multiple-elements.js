const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('multipleelements');
  const selectors = ['#multipleelements-1', '#multipleelements-3'];

  const focusTrap = createFocusTrap(selectors, {
    clickOutsideDeactivates: true,
    onActivate: function () {
      container.classList.add('is-active');
      selectors.forEach(
        (selector) =>
          (document.querySelector(selector).className = 'is-active-nested')
      );
    },
    onDeactivate: function () {
      container.classList.remove('is-active');
      selectors.forEach(
        (selector) => (document.querySelector(selector).className = null)
      );
    },
  });

  document
    .getElementById('activate-multipleelements')
    .addEventListener('click', function () {
      focusTrap.activate();
    });

  document
    .getElementById('deactivate-multipleelements')
    .addEventListener('click', function () {
      focusTrap.deactivate();
    });
};
