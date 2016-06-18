var tabbable = require('tabbable');

var trap;
var tabbableNodes;
var previouslyFocused;
var activeFocusTrap;
var config;

function activate(element, options) {
  // There can be only one focus trap at a time
  if (activeFocusTrap) deactivate({ returnFocus: false });
  activeFocusTrap = true;

  trap = (typeof element === 'string')
    ? document.querySelector(element)
    : element;

  config = options || {};

  previouslyFocused = document.activeElement;

  updateTabbableNodes();

  tryFocus(firstFocusNode());

  document.addEventListener('focus', checkFocus, true);
  document.addEventListener('click', checkClick, true);
  document.addEventListener('mousedown', checkClickInit, true);
  document.addEventListener('touchstart', checkClickInit, true);
  document.addEventListener('keydown', checkKey, true);
}

function firstFocusNode() {
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
    throw new Error('The `initialFocus` selector you passed refers to no known node');
  }
  return node;
}

function deactivate(deactivationOptions) {
  deactivationOptions = deactivationOptions || {};
  if (!activeFocusTrap) return;
  activeFocusTrap = false;

  document.removeEventListener('focus', checkFocus, true);
  document.removeEventListener('click', checkClick, true);
  document.removeEventListener('mousedown', checkClickInit, true);
  document.removeEventListener('touchstart', checkClickInit, true);
  document.removeEventListener('keydown', checkKey, true);

  if (config.onDeactivate) config.onDeactivate();

  if (deactivationOptions.returnFocus !== false) {
    setTimeout(function() {
      tryFocus(previouslyFocused);
    }, 0);
  }
}

// This needs to be done on mousedown and touchstart instead of click
// so that it precedes the focus event
function checkClickInit(e) {
  if (config.clickOutsideDeactivates) {
    deactivate({ returnFocus: false });
  }
}

function checkClick(e) {
  if (config.clickOutsideDeactivates) return;
  if (trap.contains(e.target)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
}

function checkFocus(e) {
  if (trap.contains(e.target)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  e.target.blur();
}

function checkKey(e) {
  if (e.key === 'Tab' || e.keyCode === 9) {
    handleTab(e);
  }

  if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
    deactivate();
  }
}

function handleTab(e) {
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

function updateTabbableNodes() {
  tabbableNodes = tabbable(trap);
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

module.exports = {
  activate: activate,
  deactivate: deactivate,
};
