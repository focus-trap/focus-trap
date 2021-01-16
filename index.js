import { tabbable, isFocusable } from 'tabbable';

let activeFocusDelay;

const activeFocusTraps = (function () {
  const trapQueue = [];
  return {
    activateTrap(trap) {
      if (trapQueue.length > 0) {
        const activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      const trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },

    deactivateTrap(trap) {
      const trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    },
  };
})();

const isSelectableInput = function (node) {
  return (
    node.tagName &&
    node.tagName.toLowerCase() === 'input' &&
    typeof node.select === 'function'
  );
};

const isEscapeEvent = function (e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

const isTabEvent = function (e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

const delay = function (fn) {
  return setTimeout(fn, 0);
};

// Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs
const findIndex = function (arr, fn) {
  let idx = -1;

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
const valueOrHandler = function (value, ...params) {
  return typeof value === 'function' ? value(...params) : value;
};

const createFocusTrap = function (elements, userOptions) {
  const doc = document;

  const config = {
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    ...userOptions,
  };

  const state = {
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
    paused: false,
  };

  let trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  const containersContain = function (element) {
    return state.containers.some((container) => container.contains(element));
  };

  const getNodeForOption = function (optionName) {
    const optionValue = config[optionName];
    if (!optionValue) {
      return null;
    }

    let node = optionValue;

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error(`\`${optionName}\` refers to no known node`);
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error(`\`${optionName}\` did not return a node`);
      }
    }

    return node;
  };

  const getInitialFocusNode = function () {
    let node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (containersContain(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      const firstTabbableGroup = state.tabbableGroups[0];
      const firstTabbableNode =
        firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
      node = firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error(
        'Your focus-trap needs to have at least one focusable element'
      );
    }

    return node;
  };

  const updateTabbableNodes = function () {
    state.tabbableGroups = state.containers
      .map((container) => {
        const tabbableNodes = tabbable(container);

        if (tabbableNodes.length > 0) {
          return {
            container,
            firstTabbableNode: tabbableNodes[0],
            lastTabbableNode: tabbableNodes[tabbableNodes.length - 1],
          };
        }

        return undefined;
      })
      .filter((group) => !!group); // remove groups with no tabbable nodes

    // throw if no groups have tabbable nodes and we don't have a fallback focus node either
    if (
      state.tabbableGroups.length <= 0 &&
      !getNodeForOption('fallbackFocus')
    ) {
      throw new Error(
        'Your focus-trap must have at least one container with at least one tabbable node in it at all times'
      );
    }
  };

  const tryFocus = function (node) {
    if (node === doc.activeElement) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({ preventScroll: !!config.preventScroll });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  const getReturnFocusNode = function (previousActiveElement) {
    const node = getNodeForOption('setReturnFocus');

    return node ? node : previousActiveElement;
  };

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.
  const checkPointerDown = function (e) {
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
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(e.target),
      });
      return;
    }

    // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)
    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    }

    // otherwise, prevent the click
    e.preventDefault();
  };

  // In case focus escapes the trap for some strange reason, pull it back in.
  const checkFocusIn = function (e) {
    const targetContained = containersContain(e.target);
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (targetContained || e.target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = e.target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  };

  // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.
  const checkTab = function (e) {
    updateTabbableNodes();

    let destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      const containerIndex = findIndex(state.tabbableGroups, ({ container }) =>
        container.contains(e.target)
      );

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode =
            state.tabbableGroups[state.tabbableGroups.length - 1]
              .lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        const startOfGroupIndex = findIndex(
          state.tabbableGroups,
          ({ firstTabbableNode }) => e.target === firstTabbableNode
        );

        if (startOfGroupIndex >= 0) {
          const destinationGroupIndex =
            startOfGroupIndex === 0
              ? state.tabbableGroups.length - 1
              : startOfGroupIndex - 1;

          const destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        const lastOfGroupIndex = findIndex(
          state.tabbableGroups,
          ({ lastTabbableNode }) => e.target === lastTabbableNode
        );

        if (lastOfGroupIndex >= 0) {
          const destinationGroupIndex =
            lastOfGroupIndex === state.tabbableGroups.length - 1
              ? 0
              : lastOfGroupIndex + 1;

          const destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    }
  };

  const checkKey = function (e) {
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

  const checkClick = function (e) {
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
  };

  //
  // EVENT LISTENERS
  //

  const addListeners = function () {
    if (!state.active) {
      return;
    }

    // There can be only one listening focus trap at a time
    activeFocusTraps.activateTrap(trap);

    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    activeFocusDelay = config.delayInitialFocus
      ? delay(function () {
          tryFocus(getInitialFocusNode());
        })
      : tryFocus(getInitialFocusNode());

    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false,
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false,
    });

    return trap;
  };

  const removeListeners = function () {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);

    return trap;
  };

  //
  // TRAP DEFINITION
  //

  trap = {
    activate(activateOptions) {
      if (state.active) {
        return this;
      }

      updateTabbableNodes();

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      const onActivate =
        activateOptions && activateOptions.onActivate
          ? activateOptions.onActivate
          : config.onActivate;
      if (onActivate) {
        onActivate();
      }

      addListeners();
      return this;
    },

    deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      clearTimeout(activeFocusDelay);

      removeListeners();
      state.active = false;
      state.paused = false;

      activeFocusTraps.deactivateTrap(trap);

      const onDeactivate =
        deactivateOptions && deactivateOptions.onDeactivate !== undefined
          ? deactivateOptions.onDeactivate
          : config.onDeactivate;
      if (onDeactivate) {
        onDeactivate();
      }

      const returnFocus =
        deactivateOptions && deactivateOptions.returnFocus !== undefined
          ? deactivateOptions.returnFocus
          : config.returnFocusOnDeactivate;

      if (returnFocus) {
        delay(function () {
          tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
        });
      }

      return this;
    },

    pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();

      return this;
    },

    unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();

      return this;
    },

    updateContainerElements(containerElements) {
      const elementsAsArray = [].concat(containerElements).filter(Boolean);

      state.containers = elementsAsArray.map((element) =>
        typeof element === 'string' ? doc.querySelector(element) : element
      );

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    },
  };

  // initialize container elements
  trap.updateContainerElements(elements);

  return trap;
};

export { createFocusTrap };
