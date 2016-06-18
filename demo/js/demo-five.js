var focusTrap = require('../../');

var el = document.getElementById('demo-five');
var more = document.getElementById('demo-five-more');

document.getElementById('activate-five').addEventListener('click', function() {
  focusTrap.activate('#demo-five', {
    onDeactivate: removeActiveClass,
  });
  el.className = 'trap is-active';
});

document.getElementById('demo-five-show-more').addEventListener('click', function() {
  more.style.display = 'block';
});

document.getElementById('demo-five-show-less').addEventListener('click', function() {
  more.style.display = 'none';
});

function removeActiveClass() {
  el.className = 'trap';
}
