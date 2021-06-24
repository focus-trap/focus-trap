(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
* focus-trap 6.5.1
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tabbable = require('tabbable');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusDelay;

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  var doc = document;

  var config = _objectSpread2({
    initialFocusOnActivate: true,
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying the first and last tabbable nodes in all containers/groups in
    //  the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{ container: HTMLElement, firstTabbableNode: HTMLElement|null, lastTabbableNode: HTMLElement|null }>}
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };

  var containersContain = function containersContain(element) {
    return state.containers.some(function (container) {
      return container.contains(element);
    });
  };

  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (!optionValue) {
      return null;
    }

    var node = optionValue;

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error("`".concat(optionName, "` refers to no known node"));
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error("`".concat(optionName, "` did not return a node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (containersContain(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      var firstTabbableGroup = state.tabbableGroups[0];
      var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
      node = firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.tabbableGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable.tabbable(container);

      if (tabbableNodes.length > 0) {
        return {
          container: container,
          firstTabbableNode: tabbableNodes[0],
          lastTabbableNode: tabbableNodes[tabbableNodes.length - 1]
        };
      }

      return undefined;
    }).filter(function (group) {
      return !!group;
    }); // remove groups with no tabbable nodes
    // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus')) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus');
    return node ? node : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    if (containersContain(e.target)) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !tabbable.isFocusable(e.target)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var targetContained = containersContain(e.target); // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || e.target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = e.target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's tabbable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findIndex(state.tabbableGroups, function (_ref) {
        var container = _ref.container;
        return container.contains(e.target);
      });

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return e.target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === e.target) {
          // an exception case where the target is the container itself, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return e.target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === e.target) {
          // an exception case where the target is the container itself, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    if (containersContain(e.target)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        initialFocusOnActivate = _ref4.initialFocusOnActivate;

    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap);

    if (initialFocusOnActivate) {
      // Delay ensures that the focused element doesn't capture the event
      // that caused the focus trap activation.
      activeFocusDelay = config.delayInitialFocus ? delay(function () {
        tryFocus(getInitialFocusNode());
      }) : tryFocus(getInitialFocusNode());
    }

    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');
      var initialFocusOnActivate = getOption(activateOptions, 'initialFocusOnActivate');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners({
          initialFocusOnActivate: initialFocusOnActivate
        });

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      clearTimeout(activeFocusDelay);
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(deactivateOptions, 'onDeactivate');
      var onPostDeactivate = getOption(deactivateOptions, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(deactivateOptions, 'checkCanReturnFocus');

      if (onDeactivate) {
        onDeactivate();
      }

      var returnFocus = getOption(deactivateOptions, 'returnFocus', 'returnFocusOnDeactivate');

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

exports.createFocusTrap = createFocusTrap;


},{"tabbable":25}],2:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('allowoutsideclick');
const trigger = document.getElementById('activate-allowoutsideclick');
let active = false;
let allowOutsideClick = true;

function initialize() {
  return createFocusTrap('#allowoutsideclick', {
    allowOutsideClick: allowOutsideClick,
    escapeDeactivates: false,
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => container.classList.remove('is-active'),
  });
}

let focusTrap = initialize();

function activate() {
  focusTrap.activate();
  active = true;
  trigger.innerText = 'deactivate trap';
}

function deactivate() {
  focusTrap.deactivate();
  active = false;
  trigger.innerText = 'activate trap';
}

trigger.addEventListener('click', function () {
  if (active) {
    deactivate();
  } else {
    activate();
  }
});

document
  .getElementById('deactivate-allowoutsideclick')
  .addEventListener('click', deactivate);

document
  .getElementById('select-allowoutsideclick')
  .addEventListener('change', function (event) {
    allowOutsideClick = {
      boolean: true,
      function: function (e) {
        if (e.target === trigger) {
          return true;
        }
      },
    }[event.target.value];

    focusTrap = initialize();
  });

},{"../../dist/focus-trap":1}],3:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('animated-dialog');
const activatedFlag = document.getElementById('animated-dialog-trap-activated');

const focusTrap = createFocusTrap('#animated-dialog', {
  // Called before focus is sent
  onActivate: () => container.classList.add('is-active'),

  // There is a delay between when the class is applied
  // and when the element is focusable
  checkCanFocusTrap: (trapContainers) => {
    const results = trapContainers.map((trapContainer) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (getComputedStyle(trapContainer).visibility !== 'hidden') {
            resolve();
            clearInterval(interval);
          }
        }, 5);
      });
    });
    // Return a promise that resolves when all the trap containers are able to receive focus
    return Promise.all(results);
  },

  // Called after focus is sent to the focus trap
  onPostActivate: () => activatedFlag.classList.remove('is-hidden'),

  onDeactivate: () => container.classList.remove('is-active'),
  onPostDeactivate: () => activatedFlag.classList.add('is-hidden'),
});

document
  .getElementById('activate-animated-dialog')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-animated-dialog')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],4:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('animated-trigger');
const trigger = document.getElementById('activate-animated-trigger');
const deactivatedFlag = document.getElementById(
  'animated-trigger-trap-deactivated'
);
const returnFocusCheckbox = document.getElementById(
  'animated-trigger-returnfocus'
);

const focusTrap = createFocusTrap('#animated-trigger', {
  // Called before focus is sent
  onActivate: () => {
    container.classList.add('is-active');
    trigger.classList.add('is-triggered');
    deactivatedFlag.classList.add('is-hidden');
  },
  onDeactivate: () => {
    container.classList.remove('is-active');
    trigger.classList.remove('is-triggered');
  },
  // There is a delay between when the class is removed
  // and when the trigger is focusable
  checkCanReturnFocus: (triggerButton) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (getComputedStyle(triggerButton).visibility !== 'hidden') {
          resolve();
          clearInterval(interval);
        }
      }, 5);
    });
  },
  // Called after focus is sent to the trigger button
  onPostDeactivate: () => {
    deactivatedFlag.classList.remove('is-hidden');
  },
});

document
  .getElementById('activate-animated-trigger')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-animated-trigger')
  .addEventListener('click', () => {
    focusTrap.deactivate({
      returnFocus: returnFocusCheckbox.checked,
    });
  });

},{"../../dist/focus-trap":1}],5:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('clickoutsidedeactivates');
const trigger = document.getElementById('activate-clickoutsidedeactivates');
const select = document.getElementById('select-clickoutsidedeactivates');
const checkbox = document.getElementById('checkbox-clickoutsidedeactivates');

let active = false;
let clickOutsideDeactivates = true;
let returnFocusOnDeactivate = true;

const notice = document.createElement('span');
notice.appendChild(
  document.createTextNode('-> Must click on checkbox to deactivate')
);

const initialize = function () {
  return createFocusTrap('#clickoutsidedeactivates', {
    returnFocusOnDeactivate,
    clickOutsideDeactivates,
    escapeDeactivates: false,
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => {
      active = false;
      container.classList.remove('is-active');
    },
  });
};

let focusTrap = initialize();

const activate = function () {
  active = true;
  focusTrap.activate();
};

trigger.addEventListener('click', function () {
  if (!active) {
    activate();
  }
});

document
  .getElementById('select-returnfocusondeactivate-clickoutsidedeactivates')
  .addEventListener('change', function (event) {
    returnFocusOnDeactivate = event.target.value === 'true';
    focusTrap = initialize();
  });

select.addEventListener('change', function (event) {
  clickOutsideDeactivates = {
    boolean: true, // deactivate when click on anything
    function: function (e) {
      // only deactivate when click on checkbox
      return e.target === checkbox;
    },
  }[event.target.value];

  if (event.target.value === 'function') {
    select.parentNode.append(notice);
  } else {
    select.parentNode.removeChild(notice);
  }

  focusTrap = initialize();
});

},{"../../dist/focus-trap":1}],6:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('default');

const focusTrap = createFocusTrap('#default', {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-default')
  .addEventListener('click', focusTrap.activate);
document
  .getElementById('deactivate-default')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],7:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('delay');

const focusTrap = createFocusTrap(container, {
  onActivate() {
    container.style.opacity = '1';
    container.classList.add('is-active');
  },
  onDeactivate() {
    container.style.opacity = '0.2';
    container.classList.remove('is-active');
  },
});

const showContainer = function (e) {
  if (e.keyCode === 13) {
    focusTrap.activate();
  }
};

const hideContainer = function () {
  focusTrap.deactivate();
};

document
  .getElementById('activate-delay')
  .addEventListener('keydown', showContainer);
document
  .getElementById('close-button-delay')
  .addEventListener('click', hideContainer);

},{"../../dist/focus-trap":1}],8:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('ht');
const more = document.getElementById('ht-more');

const focusTrap = createFocusTrap(container, {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-ht')
  .addEventListener('click', focusTrap.activate);

document.getElementById('ht-show-more').addEventListener('click', function () {
  more.style.display = 'block';
});

document.getElementById('ht-show-less').addEventListener('click', function () {
  more.style.display = 'none';
});

},{"../../dist/focus-trap":1}],9:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('iframe');

const focusTrap = createFocusTrap('#iframe', {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-iframe')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-iframe')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],10:[function(require,module,exports){
require('./default');
require('./animated-dialog');
require('./animated-trigger');
require('./initial-element-no-escape');
require('./initially-focused-container');
require('./hidden-treasures');
require('./nested');
require('./sibling');
require('./tricky-initial-focus');
require('./input-activation');
require('./delay');
require('./radio');
require('./iframe');
require('./allow-outside-click');
require('./click-outside-deactivates');
require('./set-return-focus');
require('./initial-focus-on-activate');
require('./no-delay');
require('./multiple-elements');
require('./multiple-elements-delete');
require('./multiple-elements-delete-all');
require('./multiple-elements-multiple-traps');

},{"./allow-outside-click":2,"./animated-dialog":3,"./animated-trigger":4,"./click-outside-deactivates":5,"./default":6,"./delay":7,"./hidden-treasures":8,"./iframe":9,"./initial-element-no-escape":11,"./initial-focus-on-activate":12,"./initially-focused-container":13,"./input-activation":14,"./multiple-elements":18,"./multiple-elements-delete":16,"./multiple-elements-delete-all":15,"./multiple-elements-multiple-traps":17,"./nested":19,"./no-delay":20,"./radio":21,"./set-return-focus":22,"./sibling":23,"./tricky-initial-focus":24}],11:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('iene');

const focusTrap = createFocusTrap(container, {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
  initialFocus: '#focused-input',
  escapeDeactivates: false,
});

document
  .getElementById('activate-iene')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-iene')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],12:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('initialfocusonactivate');
const activateTrigger = document.getElementById(
  'activate-initialfocusonactivate'
);
const deactivateTrigger = document.getElementById(
  'deactivate-initialfocusonactivate'
);
const select = document.getElementById('select-initialfocusonactivate');

let active = false;
let initialFocusOnActivate = true;

const initialize = function () {
  return createFocusTrap('#initialfocusonactivate', {
    initialFocusOnActivate,
    onActivate: () => container.classList.add('is-active'),
    onDeactivate: () => {
      active = false;
      container.classList.remove('is-active');
    },
  });
};

let focusTrap = initialize();

const activate = function () {
  active = true;
  focusTrap.activate();
};

activateTrigger.addEventListener('click', function () {
  if (!active) {
    activate();
  }
});

deactivateTrigger.addEventListener('click', function () {
  if (active) {
    focusTrap.deactivate();
  }
});

select.addEventListener('change', function (event) {
  initialFocusOnActivate = event.target.value === 'true';

  focusTrap = initialize();
});

},{"../../dist/focus-trap":1}],13:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('ifc');

const focusTrap = createFocusTrap('#ifc', {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
  initialFocus: () => document.getElementById('ifc'),
  clickOutsideDeactivates: true,
});

document
  .getElementById('activate-ifc')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-ifc')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],14:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('input-activation');

const focusTrap = createFocusTrap(container, {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('focused-input8')
  .addEventListener('input', focusTrap.activate);

document
  .getElementById('deactivate-input-activation')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],15:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('multipleelements-delete-all');
const selectors = [
  '#multipleelements-delete-all-1',
  '#multipleelements-delete-all-2',
];

const focusTrap = createFocusTrap(selectors, {
  fallbackFocus: '#deactivate-multipleelements-delete-all',
  allowOutsideClick(event) {
    return event.target.id === 'deactivate-multipleelements-delete-all';
  },
  onActivate: function () {
    container.classList.add('is-active');
    selectors.forEach(
      (selector) =>
        (document.querySelector(selector).className = 'is-active-nested')
    );
  },
  onDeactivate: function () {
    container.classList.remove('is-active');
    selectors.forEach(
      (selector) => (document.querySelector(selector).className = null)
    );
  },
});

document
  .getElementById('activate-multipleelements-delete-all')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-multipleelements-delete-all')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });

document
  .getElementById('multipleelements-delete-all-remove')
  .addEventListener('click', function (event) {
    document
      .getElementById('multipleelements-delete-all-removed-node')
      .remove();
    event.target.remove();
  });

},{"../../dist/focus-trap":1}],16:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('multipleelements-delete');
const selectors = ['#multipleelements-delete-1', '#multipleelements-delete-2'];

const focusTrap = createFocusTrap(selectors, {
  allowOutsideClick(event) {
    return event.target.id === 'deactivate-multipleelements-delete';
  },
  onActivate: function () {
    container.classList.add('is-active');
    selectors.forEach(
      (selector) =>
        (document.querySelector(selector).className = 'is-active-nested')
    );
  },
  onDeactivate: function () {
    container.classList.remove('is-active');
    selectors.forEach(
      (selector) => (document.querySelector(selector).className = null)
    );
  },
});

document
  .getElementById('activate-multipleelements-delete')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-multipleelements-delete')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });

document
  .getElementById('multipleelements-delete-remove')
  .addEventListener('click', function () {
    document.getElementById('multipleelements-delete-removed-node').remove();
  });

},{"../../dist/focus-trap":1}],17:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('multipleelements-multipletraps');
let isTrap1Active = false;
let isTrap2Active = false;

const onActivateTrap = function () {
  container.classList.add('is-active');
};

const onDeactivateTrap = function () {
  if (!isTrap1Active && !isTrap2Active) {
    container.classList.remove('is-active');
  }
};

const allowOutsideClick = (e) => e.target.className === 'enable-outside';

const setActive = function (selectors, isActive = true) {
  selectors.forEach(
    (selector) =>
      (document.querySelector(selector).className = isActive
        ? 'is-active-nested'
        : null)
  );
};

const trap1Selectors = [
  '#multipleelements-multipletraps-1',
  '#multipleelements-multipletraps-3',
];

const trap2Selectors = [
  '#multipleelements-multipletraps-2',
  '#multipleelements-multipletraps-4',
];

const focusTrap1 = createFocusTrap(trap1Selectors, {
  onActivate() {
    onActivateTrap();

    if (isTrap2Active) {
      setActive(trap2Selectors, false);
    }

    setActive(trap1Selectors);
    isTrap1Active = true;
  },
  onDeactivate() {
    setActive(trap1Selectors, false);

    if (isTrap2Active) {
      setActive(trap2Selectors);
    }

    isTrap1Active = false;
    onDeactivateTrap();
  },
  allowOutsideClick,
});

const focusTrap2 = createFocusTrap(trap2Selectors, {
  onActivate() {
    onActivateTrap();

    if (isTrap1Active) {
      setActive(trap1Selectors, false);
    }

    setActive(trap2Selectors);
    isTrap2Active = true;
  },
  onDeactivate() {
    setActive(trap2Selectors, false);

    if (isTrap1Active) {
      setActive(trap1Selectors);
    }

    isTrap2Active = false;
    onDeactivateTrap();
  },
  allowOutsideClick,
});

document
  .getElementById('activate-multipleelements-multipletraps-1')
  .addEventListener('click', function () {
    focusTrap1.activate();
  });

document
  .getElementById('deactivate-multipleelements-multipletraps-1')
  .addEventListener('click', function () {
    focusTrap1.deactivate();
  });

document
  .getElementById('activate-multipleelements-multipletraps-2')
  .addEventListener('click', function () {
    focusTrap2.activate();
  });

document
  .getElementById('deactivate-multipleelements-multipletraps-2')
  .addEventListener('click', function () {
    focusTrap2.deactivate();
  });

},{"../../dist/focus-trap":1}],18:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('multipleelements');
const selectors = ['#multipleelements-1', '#multipleelements-3'];

const focusTrap = createFocusTrap(selectors, {
  clickOutsideDeactivates: true,
  onActivate: function () {
    container.classList.add('is-active');
    selectors.forEach(
      (selector) =>
        (document.querySelector(selector).className = 'is-active-nested')
    );
  },
  onDeactivate: function () {
    container.classList.remove('is-active');
    selectors.forEach(
      (selector) => (document.querySelector(selector).className = null)
    );
  },
});

document
  .getElementById('activate-multipleelements')
  .addEventListener('click', function () {
    focusTrap.activate();
  });

document
  .getElementById('deactivate-multipleelements')
  .addEventListener('click', function () {
    focusTrap.deactivate();
  });

},{"../../dist/focus-trap":1}],19:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('nested');
const nested = document.getElementById('nested-nested');

const primaryFocusTrap = createFocusTrap('#nested', {
  onDeactivate: () => (container.style.display = 'none'),
});

const nestedFocusTrap = createFocusTrap('#nested-nested', {
  onDeactivate: function () {
    nested.style.display = 'none';
    primaryFocusTrap.unpause();
  },
});

document
  .getElementById('activate-nested')
  .addEventListener('click', function () {
    container.style.display = 'block';
    primaryFocusTrap.activate();
  });

document
  .getElementById('deactivate-nested')
  .addEventListener('click', primaryFocusTrap.deactivate);

document
  .getElementById('nested-activate-nested')
  .addEventListener('click', function () {
    nested.style.display = 'block';
    nestedFocusTrap.activate();
  });

document
  .getElementById('nested-deactivate-nested')
  .addEventListener('click', nestedFocusTrap.deactivate);

},{"../../dist/focus-trap":1}],20:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('no-delay');

const focusTrap = createFocusTrap(container, {
  delayInitialFocus: false,
  onActivate() {
    container.style.opacity = '1';
    container.classList.add('is-active');
  },
  onDeactivate() {
    container.style.opacity = '0.2';
    container.classList.remove('is-active');
  },
});

const showContainer = function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    focusTrap.activate();
  }
};

const hideContainer = function () {
  focusTrap.deactivate();
};

document
  .getElementById('activate-no-delay')
  .addEventListener('keydown', showContainer);
document
  .getElementById('close-button-no-delay')
  .addEventListener('click', hideContainer);

},{"../../dist/focus-trap":1}],21:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('radio');

const focusTrap = createFocusTrap('#radio', {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-radio')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-radio')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],22:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('setreturnfocus');

const focusTrap = createFocusTrap('#setreturnfocus', {
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
  setReturnFocus: '#overwritten-element',
});

document
  .getElementById('activate-setreturnfocus')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-setreturnfocus')
  .addEventListener('click', focusTrap.deactivate);

},{"../../dist/focus-trap":1}],23:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('sibling-first');
const second = document.getElementById('sibling-second');

const firstFocusTrap = createFocusTrap('#sibling-first', {
  onDeactivate: () => container.classList.remove('is-active'),
});

const secondFocusTrap = createFocusTrap('#sibling-second', {
  onDeactivate: function () {
    second.style.display = 'none';
    second.classList.remove('is-active');
  },
});

document
  .getElementById('activate-first-sibling')
  .addEventListener('click', function () {
    container.classList.add('is-active');
    firstFocusTrap.activate();
  });

document
  .getElementById('deactivate-first-sibling')
  .addEventListener('click', firstFocusTrap.deactivate);

document
  .getElementById('activate-second-sibling')
  .addEventListener('click', function () {
    second.style.display = 'block';
    second.className = 'trap is-active-nested';
    secondFocusTrap.activate();
  });

document
  .getElementById('deactivate-second-sibling')
  .addEventListener('click', secondFocusTrap.deactivate);

},{"../../dist/focus-trap":1}],24:[function(require,module,exports){
const { createFocusTrap } = require('../../dist/focus-trap');

const container = document.getElementById('tif');
const focusable = document.getElementById('tif-hide-focusable');

const focusTrap = createFocusTrap(container, {
  fallbackFocus: container,
  onActivate: () => container.classList.add('is-active'),
  onDeactivate: () => container.classList.remove('is-active'),
});

document
  .getElementById('activate-tif')
  .addEventListener('click', focusTrap.activate);

document
  .getElementById('deactivate-tif')
  .addEventListener('click', focusTrap.deactivate);

document
  .getElementById('tif-show-focusable')
  .addEventListener('click', () => (focusable.style.display = 'block'));

document
  .getElementById('tif-hide-focusable')
  .addEventListener('click', () => (focusable.style.display = 'none'));

},{"../../dist/focus-trap":1}],25:[function(require,module,exports){
/*!
* tabbable 5.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};

var isContentEditable = function isContentEditable(node) {
  return node.contentEditable === 'true';
};

var getTabindex = function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.


  if (isContentEditable(node)) {
    return 0;
  } // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if ((node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || node.ownerDocument;

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isHidden = function isHidden(node, displayCheck) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }

  if (!displayCheck || displayCheck === 'full') {
    while (node) {
      if (getComputedStyle(node).display === 'none') {
        return true;
      }

      node = node.parentElement;
    }
  } else if (displayCheck === 'non-zero-area') {
    var _node$getBoundingClie = node.getBoundingClientRect(),
        width = _node$getBoundingClie.width,
        height = _node$getBoundingClie.height;

    return width === 0 && height === 0;
  }

  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) ||
  /* For a details element with a summary, the summary element gets the focused  */
  isDetailsWithSummary(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
};

var tabbable = function tabbable(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  candidates.forEach(function (candidate, i) {
    var candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  });
  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
};

var focusable = function focusable(el, options) {
  options = options || {};
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  return candidates;
};

var isTabbable = function isTabbable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(options, node);
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};

exports.focusable = focusable;
exports.isFocusable = isFocusable;
exports.isTabbable = isTabbable;
exports.tabbable = tabbable;


},{}]},{},[10]);
