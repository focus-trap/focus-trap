var { focusTrap: createFocusTrap } = require('../../dist/focus-trap');

var container = document.getElementById('radio');

var focusTrap = createFocusTrap('#radio', {
  onActivate: function () {
    container.className = 'trap is-active';
  },
  onDeactivate: function () {
    container.className = 'trap';
  },
});

document
  .getElementById('activate-radio')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-radio')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });
