var createFocusTrap = require('../../');

var container = document.getElementById('nested');
var nested = document.getElementById('nested-nested');

var primaryFocusTrap = createFocusTrap('#nested', {
  onActivate: function () {
    container.style.display = 'block';
  },
  onDeactivate: function () {
    container.style.display = 'none';
  },
});

var nestedFocusTrap = createFocusTrap('#nested-nested', {
  onActivate: function () {
    nested.style.display = 'block';
  },
  onDeactivate: function () {
    nested.style.display = 'none';
    primaryFocusTrap.unpause();
  },
});;

document.getElementById('activate-nested').addEventListener('click', function () {
  primaryFocusTrap.activate();
});

document.getElementById('deactivate-nested').addEventListener('click', function () {
  primaryFocusTrap.deactivate();
});

document.getElementById('nested-activate-nested').addEventListener('click', function () {
  // primaryFocusTrap.pause();
  nestedFocusTrap.activate();
});

document.getElementById('nested-deactivate-nested').addEventListener('click', function () {
  nestedFocusTrap.deactivate();
});
