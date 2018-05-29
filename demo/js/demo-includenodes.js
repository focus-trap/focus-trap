var createFocusTrap = require('../../');

var containerExclude = document.getElementById('demo-includenode-container');
var includedElements = document.querySelectorAll('.included-element');

var focusTrapExclude = createFocusTrap(containerExclude, {
  isOutsideElementClickable: function (element) {
    return Array.prototype.slice.call(includedElements).indexOf(element) !== -1;
  },
  onActivate: function () {
    containerExclude.className = 'trap is-active';
  },
  onDeactivate: function () {
    containerExclude.className = 'trap';
  },
});

document.getElementById('demo-includenode-activate').addEventListener('click', function () {
  focusTrapExclude.activate();
});
document.getElementById('demo-includenode-deactivate').addEventListener('click', function () {
  focusTrapExclude.deactivate();
});

includedElements[0].addEventListener('click', logOutsideElement);
includedElements[1].addEventListener('click', logOutsideElement);

function logOutsideElement() {
  console.log('clicked on outside element');
}
