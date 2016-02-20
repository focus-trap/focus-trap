var focusTrap = require('../../');

var el = document.getElementById('demo-four');

document.getElementById('activate-four').addEventListener('click', function() {
  focusTrap.activate('#demo-four', {
    onDeactivate: removeActiveClass,
    initialFocus: '#demo-four',
  });
  el.className = 'trap is-active';
});

document.getElementById('deactivate-four').addEventListener('click', function() {
  focusTrap.deactivate();
  removeActiveClass();
});

function removeActiveClass() {
  el.className = 'trap';
}
