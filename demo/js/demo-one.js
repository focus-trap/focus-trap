var focusTrap = require('../../');

var el = document.getElementById('demo-one');

document.getElementById('activate-one').addEventListener('click', function() {
  focusTrap.activate('#demo-one', {
    onDeactivate: removeActiveClass,
  });
  el.className = 'trap is-active';
});

document.getElementById('deactivate-one').addEventListener('click', function() {
  focusTrap.deactivate();
  removeActiveClass();
});

function removeActiveClass() {
  el.className = 'trap';
}
