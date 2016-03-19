var focusTrap = require('../../');

var el = document.getElementById('demo-three');

document.getElementById('activate-three').addEventListener('click', function() {
  focusTrap.activate(el, {
    onDeactivate: removeActiveClass,
    clickOutsideDeactivates: true,
  });
  el.className = 'trap is-active';
});

document.getElementById('deactivate-three').addEventListener('click', function() {
  focusTrap.deactivate();
  removeActiveClass();
});

function removeActiveClass() {
  el.className = 'trap';
}
