const { createFocusTrap } = require('../../index');
module.exports = () => {
  const container = document.getElementById('nested');
  const nested = document.getElementById('nested-nested');

  const primaryFocusTrap = createFocusTrap('#nested', {
    onDeactivate: () => (container.style.display = 'none'),
  });

  const nestedFocusTrap = createFocusTrap('#nested-nested', {
    onDeactivate: function () {
      nested.style.display = 'none';
      primaryFocusTrap.unpause();
    },
  });

  document
    .getElementById('activate-nested')
    .addEventListener('click', function () {
      container.style.display = 'block';
      primaryFocusTrap.activate();
    });

  document
    .getElementById('deactivate-nested')
    .addEventListener('click', primaryFocusTrap.deactivate);

  document
    .getElementById('nested-activate-nested')
    .addEventListener('click', function () {
      nested.style.display = 'block';
      nestedFocusTrap.activate();
    });

  document
    .getElementById('nested-deactivate-nested')
    .addEventListener('click', nestedFocusTrap.deactivate);
};
