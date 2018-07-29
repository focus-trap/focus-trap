var createFocusTrap = require('../../');

var container = document.getElementById('ht');
var more = document.getElementById('ht-more');

var focusTrap = createFocusTrap(container, {
  onActivate: function() {
    container.className = 'trap is-active';
  },
  onDeactivate: function() {
    container.className = 'trap';
  }
});

document.getElementById('activate-ht').addEventListener('click', function() {
  focusTrap.activate();
});

document.getElementById('ht-show-more').addEventListener('click', function() {
  more.style.display = 'block';
});

document.getElementById('ht-show-less').addEventListener('click', function() {
  more.style.display = 'none';
});
