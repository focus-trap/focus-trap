const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('multipleelements-delete-all');
  const selectors = [
    '#multipleelements-delete-all-1',
    '#multipleelements-delete-all-2',
  ];

  const focusTrap = createFocusTrap(selectors, {
    fallbackFocus: '#deactivate-multipleelements-delete-all',
    allowOutsideClick(event) {
      return event.target.id === 'deactivate-multipleelements-delete-all';
    },
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
    .getElementById('activate-multipleelements-delete-all')
    .addEventListener('click', function () {
      focusTrap.activate();
    });

  document
    .getElementById('deactivate-multipleelements-delete-all')
    .addEventListener('click', function () {
      focusTrap.deactivate();
    });

  document
    .getElementById('multipleelements-delete-all-remove')
    .addEventListener('click', function (event) {
      document
        .getElementById('multipleelements-delete-all-removed-node')
        .remove();
      event.target.remove();
    });
};
