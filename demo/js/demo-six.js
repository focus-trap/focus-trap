var createFocusTrap = require('../../');

var containerSix = document.getElementById('demo-six');
var nestedSix = document.getElementById('demo-six-nested');

var primaryFocusTrapSix = createFocusTrap('#demo-six', {
  onActivate: function () {
    containerSix.style.display = 'block';
  },
  onDeactivate: function () {
    containerSix.style.display = 'none';
  },
});

var nestedFocusTrapSix = createFocusTrap('#demo-six-nested', {
  onActivate: function () {
    nestedSix.style.display = 'block';
  },
  onDeactivate: function () {
    nestedSix.style.display = 'none';
    primaryFocusTrapSix.unpause();
  },
});;

document.getElementById('activate-six').addEventListener('click', function () {
  primaryFocusTrapSix.activate();
});

document.getElementById('deactivate-six').addEventListener('click', function () {
  primaryFocusTrapSix.deactivate();
});

document.getElementById('demo-six-activate-nested').addEventListener('click', function () {
  // primaryFocusTrapSix.pause();
  nestedFocusTrapSix.activate();
});

document.getElementById('demo-six-deactivate-nested').addEventListener('click', function () {
  nestedFocusTrapSix.deactivate();
});
