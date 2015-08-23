var focusTrap = require('../../');

var el = document.getElementById('demo-two');

document.getElementById('activate-two').addEventListener('click', function() {
  focusTrap.activate('#demo-two', {
    onDeactivate: removeActiveClass,
    initialFocus: '#focused-input',
  });
  el.className = 'trap is-active';
});

document.getElementById('deactivate-two').addEventListener('click', function() {
  focusTrap.deactivate();
  removeActiveClass();
});

function removeActiveClass() {
  el.className = 'trap';
}
