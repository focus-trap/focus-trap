var tabbable = require('tabbable');

var trap;
var tabbableNodes;
var previouslyFocused;
var activeFocusTrap;
var config;

function activate(element, options) {
  // There can be only one focus trap at a time
  if (activeFocusTrap) deactivate();
  activeFocusTrap = true;

  trap = (typeof element === 'string')
    ? document.querySelector(element)
    : element;
  config = options || {};
  previouslyFocused = document.activeElement;

  updateTabbableNodes();

  var focusNode = (function() {
    var node;
    if (!config.initialFocus) {
      node = tabbableNodes[0];
      if (!node) {
        throw new Error('You can\'t have a focus-trap without at least one focusable element');
      }
      return node;
    }

    if (typeof config.initialFocus === 'string') {
      node = document.querySelector(config.initialFocus);
    } else {
      node = config.initialFocus;
    }
    if (!node) {
      throw new Error('The `initialFocus` selector you passed referred to no known node');
    }
    return node;
  }());
  tryFocus(focusNode);

  document.addEventListener('focus', checkFocus, true);
  document.addEventListener('click', checkClick, true);
  document.addEventListener('touchend', checkClick, true);
  document.addEventListener('keydown', checkKey, true);
}

function deactivate() {
  if (!activeFocusTrap) return;
  activeFocusTrap = false;

  document.removeEventListener('focus', checkFocus, true);
  document.removeEventListener('click', checkClick, true);
  document.removeEventListener('touchend', checkClick, true);
  document.removeEventListener('keydown', checkKey, true);

  if (config.onDeactivate) config.onDeactivate();

  setTimeout(function() {
    tryFocus(previouslyFocused);
  }, 0);
}

function checkClick(e) {
  if (trap.contains(e.target)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
}

function checkFocus(e) {
  updateTabbableNodes();
  if (trap.contains(e.target)) return;
  tryFocus(tabbableNodes[0]);
}

function checkKey(e) {
  if (e.key === 'Tab' || e.keyCode === 9) {
    e.preventDefault();
    updateTabbableNodes();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);
    var lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
    var firstTabbableNode = tabbableNodes[0];
    if (e.shiftKey) {
      if (e.target === firstTabbableNode) {
        tryFocus(lastTabbableNode);
        return;
      }
      tryFocus(tabbableNodes[currentFocusIndex - 1]);
      return;
    }
    if (e.target === lastTabbableNode) {
      tryFocus(firstTabbableNode);
      return;
    }
    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    deactivate();
  }
}

function updateTabbableNodes() {
  tabbableNodes = tabbable(trap);
}

function tryFocus(node) {
  if (node && node.focus) node.focus();
}

module.exports = {
  activate: activate,
  deactivate: deactivate,
};
