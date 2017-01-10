var createFocusTrap = require('../../');

var containerFive = document.getElementById('demo-five');
var moreFive = document.getElementById('demo-five-more');

var focusTrapFive = createFocusTrap(containerFive, {
  onActivate: function () {
    containerFive.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerFive.className = 'trap';
  },
});

document.getElementById('activate-five').addEventListener('click', function () {
  focusTrapFive.activate();
});

document.getElementById('demo-five-show-more').addEventListener('click', function () {
  moreFive.style.display = 'block';
});

document.getElementById('demo-five-show-less').addEventListener('click', function () {
  moreFive.style.display = 'none';
});
