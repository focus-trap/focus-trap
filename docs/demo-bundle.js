(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('animated');

        var focusTrap = createFocusTrap('#animated', {
          // There is a delay between when the class is applied
          // and when the element is focusable
          checkCanActivate: function(trapElement) {
            return getComputedStyle(trapElement).visibility !== 'hidden';
          },
          onActivate: function() {
            container.classList.add('is-active');
          },
          onDeactivate: function() {
            container.classList.remove('is-active');
          }
        });

        document
          .getElementById('activate-animated')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-animated')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    2: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('default');

        var focusTrap = createFocusTrap('#default', {
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          }
        });

        document
          .getElementById('activate-default')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-default')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    3: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('delay');

        var focusTrap = createFocusTrap(container);

        document
          .getElementById('activate-delay')
          .addEventListener('keydown', showContainer);
        document
          .getElementById('close-button-delay')
          .addEventListener('click', hideContainer);

        function showContainer(e) {
          if (e.keyCode !== 13) return;

          container.style.opacity = '1';
          focusTrap.activate();
        }

        function hideContainer() {
          container.style.opacity = '0.2';
          focusTrap.deactivate();
        }
      },
      { '../..': 13 }
    ],
    4: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

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

        document
          .getElementById('activate-ht')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('ht-show-more')
          .addEventListener('click', function() {
            more.style.display = 'block';
          });

        document
          .getElementById('ht-show-less')
          .addEventListener('click', function() {
            more.style.display = 'none';
          });
      },
      { '../..': 13 }
    ],
    5: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('iframe');

        var focusTrap = createFocusTrap('#iframe', {
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          }
        });

        document
          .getElementById('activate-iframe')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-iframe')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    6: [
      function(require, module, exports) {
        require('./default');
        require('./animated');
        require('./initial-element-no-escape');
        require('./initially-focused-container');
        require('./hidden-treasures');
        require('./nested');
        require('./tricky-initial-focus');
        require('./input-activation');
        require('./delay');
        require('./radio');
        require('./iframe');
      },
      {
        './animated': 1,
        './default': 2,
        './delay': 3,
        './hidden-treasures': 4,
        './iframe': 5,
        './initial-element-no-escape': 7,
        './initially-focused-container': 8,
        './input-activation': 9,
        './nested': 10,
        './radio': 11,
        './tricky-initial-focus': 12
      }
    ],
    7: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('iene');

        var focusTrap = createFocusTrap(container, {
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          },
          initialFocus: '#focused-input',
          escapeDeactivates: false
        });

        document
          .getElementById('activate-iene')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-iene')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    8: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('ifc');

        var focusTrap = createFocusTrap('#ifc', {
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          },
          initialFocus: function() {
            return document.getElementById('ifc');
          },
          clickOutsideDeactivates: true
        });

        document
          .getElementById('activate-ifc')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-ifc')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    9: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('input-activation');

        var focusTrap = createFocusTrap(container, {
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          }
        });

        document
          .getElementById('focused-input8')
          .addEventListener('input', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-input-activation')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    10: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('nested');
        var nested = document.getElementById('nested-nested');

        var primaryFocusTrap = createFocusTrap('#nested', {
          onDeactivate: function() {
            container.style.display = 'none';
          }
        });

        var nestedFocusTrap = createFocusTrap('#nested-nested', {
          onDeactivate: function() {
            nested.style.display = 'none';
            primaryFocusTrap.unpause();
          }
        });

        document
          .getElementById('activate-nested')
          .addEventListener('click', function() {
            container.style.display = 'block';
            primaryFocusTrap.activate();
          });

        document
          .getElementById('deactivate-nested')
          .addEventListener('click', function() {
            primaryFocusTrap.deactivate();
          });

        document
          .getElementById('nested-activate-nested')
          .addEventListener('click', function() {
            nested.style.display = 'block';
            // primaryFocusTrap.pause();
            nestedFocusTrap.activate();
          });

        document
          .getElementById('nested-deactivate-nested')
          .addEventListener('click', function() {
            nestedFocusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    11: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('radio');

        var focusTrap = createFocusTrap('#radio', {
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          }
        });

        document
          .getElementById('activate-radio')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-radio')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });
      },
      { '../..': 13 }
    ],
    12: [
      function(require, module, exports) {
        var createFocusTrap = require('../..');

        var container = document.getElementById('tif');
        var focusable = document.getElementById('tif-hide-focusable');

        var focusTrap = createFocusTrap(container, {
          fallbackFocus: container,
          onActivate: function() {
            container.className = 'trap is-active';
          },
          onDeactivate: function() {
            container.className = 'trap';
          }
        });

        document
          .getElementById('activate-tif')
          .addEventListener('click', function() {
            focusTrap.activate();
          });

        document
          .getElementById('deactivate-tif')
          .addEventListener('click', function() {
            focusTrap.deactivate();
          });

        document
          .getElementById('tif-show-focusable')
          .addEventListener('click', function() {
            focusable.style.display = 'block';
          });

        document
          .getElementById('tif-hide-focusable')
          .addEventListener('click', function() {
            focusable.style.display = 'none';
          });
      },
      { '../..': 13 }
    ],
    13: [
      function(require, module, exports) {
        var tabbable = require('tabbable');
        var xtend = require('xtend');

        var listeningFocusTrap = null;

        function createFocusTrap(element, userOptions) {
          var doc = document;
          var container =
            typeof element === 'string' ? doc.querySelector(element) : element;

          var config = xtend(
            {
              returnFocusOnDeactivate: true,
              escapeDeactivates: true
            },
            userOptions
          );

          var state = {
            firstTabbableNode: null,
            lastTabbableNode: null,
            nodeFocusedBeforeActivation: null,
            mostRecentlyFocusedNode: null,
            active: false,
            paused: false
          };

          var trap = {
            activate: activate,
            deactivate: deactivate,
            pause: pause,
            unpause: unpause
          };

          return trap;

          function delayFocusTrapActivation(callback) {
            var startDate = Date.now();
            var interval = setInterval(function() {
              var canActivate = config.checkCanActivate(container);
              if (canActivate) {
                clearInterval(interval);
                callback();
              } else {
                var timeDifferenceInSeconds = (Date.now() - startDate) / 1000;
                if (timeDifferenceInSeconds > 10) {
                  // eslint-disable-next-line no-console
                  console.warn(
                    [
                      'Focus-Trap activation for the following element timed out after',
                      timeDifferenceInSeconds,
                      'seconds'
                    ].join(' '),
                    container
                  );
                  clearInterval(interval);
                }
              }
            }, 5);
          }

          function activate(activateOptions) {
            if (state.active) return;

            state.active = true;
            state.paused = false;
            state.nodeFocusedBeforeActivation = doc.activeElement;

            var onActivate =
              activateOptions && activateOptions.onActivate
                ? activateOptions.onActivate
                : config.onActivate;

            if (config.checkCanActivate) {
              if (onActivate) {
                onActivate();
              }

              delayFocusTrapActivation(function() {
                updateTabbableNodes();
                addListeners();
              });
            } else {
              updateTabbableNodes();
              if (onActivate) {
                onActivate();
              }
              addListeners();
            }

            return trap;
          }

          function deactivate(deactivateOptions) {
            if (!state.active) return;

            removeListeners();
            state.active = false;
            state.paused = false;

            var onDeactivate =
              deactivateOptions && deactivateOptions.onDeactivate !== undefined
                ? deactivateOptions.onDeactivate
                : config.onDeactivate;
            if (onDeactivate) {
              onDeactivate();
            }

            var returnFocus =
              deactivateOptions && deactivateOptions.returnFocus !== undefined
                ? deactivateOptions.returnFocus
                : config.returnFocusOnDeactivate;
            if (returnFocus) {
              delay(function() {
                tryFocus(state.nodeFocusedBeforeActivation);
              });
            }

            return trap;
          }

          function pause() {
            if (state.paused || !state.active) return;
            state.paused = true;
            removeListeners();
          }

          function unpause() {
            if (!state.paused || !state.active) return;
            state.paused = false;
            addListeners();
          }

          function addListeners() {
            if (!state.active) return;

            // There can be only one listening focus trap at a time
            if (listeningFocusTrap) {
              listeningFocusTrap.pause();
            }
            listeningFocusTrap = trap;

            updateTabbableNodes();

            // Delay ensures that the focused element doesn't capture the event
            // that caused the focus trap activation.
            delay(function() {
              tryFocus(getInitialFocusNode());
            });
            doc.addEventListener('focusin', checkFocusIn, true);
            doc.addEventListener('mousedown', checkPointerDown, true);
            doc.addEventListener('touchstart', checkPointerDown, true);
            doc.addEventListener('click', checkClick, true);
            doc.addEventListener('keydown', checkKey, true);

            return trap;
          }

          function removeListeners() {
            if (!state.active || listeningFocusTrap !== trap) return;

            doc.removeEventListener('focusin', checkFocusIn, true);
            doc.removeEventListener('mousedown', checkPointerDown, true);
            doc.removeEventListener('touchstart', checkPointerDown, true);
            doc.removeEventListener('click', checkClick, true);
            doc.removeEventListener('keydown', checkKey, true);

            listeningFocusTrap = null;

            return trap;
          }

          function getNodeForOption(optionName) {
            var optionValue = config[optionName];
            var node = optionValue;
            if (!optionValue) {
              return null;
            }
            if (typeof optionValue === 'string') {
              node = doc.querySelector(optionValue);
              if (!node) {
                throw new Error('`' + optionName + '` refers to no known node');
              }
            }
            if (typeof optionValue === 'function') {
              node = optionValue();
              if (!node) {
                throw new Error('`' + optionName + '` did not return a node');
              }
            }
            return node;
          }

          function getInitialFocusNode() {
            var node;
            if (getNodeForOption('initialFocus') !== null) {
              node = getNodeForOption('initialFocus');
            } else if (container.contains(doc.activeElement)) {
              node = doc.activeElement;
            } else {
              node =
                state.firstTabbableNode || getNodeForOption('fallbackFocus');
            }

            if (!node) {
              throw new Error(
                "You can't have a focus-trap without at least one focusable element"
              );
            }

            return node;
          }

          // This needs to be done on mousedown and touchstart instead of click
          // so that it precedes the focus event.
          function checkPointerDown(e) {
            if (container.contains(e.target)) return;
            if (config.clickOutsideDeactivates) {
              deactivate({
                returnFocus: !tabbable.isFocusable(e.target)
              });
            } else {
              e.preventDefault();
            }
          }

          // In case focus escapes the trap for some strange reason, pull it back in.
          function checkFocusIn(e) {
            // In Firefox when you Tab out of an iframe the Document is briefly focused.
            if (container.contains(e.target) || e.target instanceof Document) {
              return;
            }
            e.stopImmediatePropagation();
            tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
          }

          function checkKey(e) {
            if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
              e.preventDefault();
              deactivate();
              return;
            }
            if (isTabEvent(e)) {
              checkTab(e);
              return;
            }
          }

          // Hijack Tab events on the first and last focusable nodes of the trap,
          // in order to prevent focus from escaping. If it escapes for even a
          // moment it can end up scrolling the page and causing confusion so we
          // kind of need to capture the action at the keydown phase.
          function checkTab(e) {
            updateTabbableNodes();
            if (e.shiftKey && e.target === state.firstTabbableNode) {
              e.preventDefault();
              tryFocus(state.lastTabbableNode);
              return;
            }
            if (!e.shiftKey && e.target === state.lastTabbableNode) {
              e.preventDefault();
              tryFocus(state.firstTabbableNode);
              return;
            }
          }

          function checkClick(e) {
            if (config.clickOutsideDeactivates) return;
            if (container.contains(e.target)) return;
            e.preventDefault();
            e.stopImmediatePropagation();
          }

          function updateTabbableNodes() {
            var tabbableNodes = tabbable(container);
            state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
            state.lastTabbableNode =
              tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
          }

          function tryFocus(node) {
            if (node === doc.activeElement) return;
            if (!node || !node.focus) {
              tryFocus(getInitialFocusNode());
              return;
            }

            node.focus();
            state.mostRecentlyFocusedNode = node;
            if (isSelectableInput(node)) {
              node.select();
            }
          }
        }

        function isSelectableInput(node) {
          return (
            node.tagName &&
            node.tagName.toLowerCase() === 'input' &&
            typeof node.select === 'function'
          );
        }

        function isEscapeEvent(e) {
          return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
        }

        function isTabEvent(e) {
          return e.key === 'Tab' || e.keyCode === 9;
        }

        function delay(fn) {
          return setTimeout(fn, 0);
        }

        module.exports = createFocusTrap;
      },
      { tabbable: 14, xtend: 15 }
    ],
    14: [
      function(require, module, exports) {
        var candidateSelectors = [
          'input',
          'select',
          'textarea',
          'a[href]',
          'button',
          '[tabindex]',
          'audio[controls]',
          'video[controls]',
          '[contenteditable]:not([contenteditable="false"])'
        ];
        var candidateSelector = candidateSelectors.join(',');

        var matches =
          Element.prototype.matches ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector;

        function tabbable(el, options) {
          options = options || {};

          var elementDocument = el.ownerDocument || el;
          var regularTabbables = [];
          var orderedTabbables = [];

          var untouchabilityChecker = new UntouchabilityChecker(
            elementDocument
          );
          var candidates = el.querySelectorAll(candidateSelector);

          if (options.includeContainer) {
            if (matches.call(el, candidateSelector)) {
              candidates = Array.prototype.slice.apply(candidates);
              candidates.unshift(el);
            }
          }

          var i, candidate, candidateTabindex;
          for (i = 0; i < candidates.length; i++) {
            candidate = candidates[i];

            if (
              !isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)
            )
              continue;

            candidateTabindex = getTabindex(candidate);
            if (candidateTabindex === 0) {
              regularTabbables.push(candidate);
            } else {
              orderedTabbables.push({
                documentOrder: i,
                tabIndex: candidateTabindex,
                node: candidate
              });
            }
          }

          var tabbableNodes = orderedTabbables
            .sort(sortOrderedTabbables)
            .map(function(a) {
              return a.node;
            })
            .concat(regularTabbables);

          return tabbableNodes;
        }

        tabbable.isTabbable = isTabbable;
        tabbable.isFocusable = isFocusable;

        function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
          if (
            !isNodeMatchingSelectorFocusable(node, untouchabilityChecker) ||
            isNonTabbableRadio(node) ||
            getTabindex(node) < 0
          ) {
            return false;
          }
          return true;
        }

        function isTabbable(node, untouchabilityChecker) {
          if (!node) throw new Error('No node provided');
          if (matches.call(node, candidateSelector) === false) return false;
          return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
        }

        function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
          untouchabilityChecker =
            untouchabilityChecker ||
            new UntouchabilityChecker(node.ownerDocument || node);
          if (
            node.disabled ||
            isHiddenInput(node) ||
            untouchabilityChecker.isUntouchable(node)
          ) {
            return false;
          }
          return true;
        }

        var focusableCandidateSelector = candidateSelectors
          .concat('iframe')
          .join(',');
        function isFocusable(node, untouchabilityChecker) {
          if (!node) throw new Error('No node provided');
          if (matches.call(node, focusableCandidateSelector) === false)
            return false;
          return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
        }

        function getTabindex(node) {
          var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
          if (!isNaN(tabindexAttr)) return tabindexAttr;
          // Browsers do not return `tabIndex` correctly for contentEditable nodes;
          // so if they don't have a tabindex attribute specifically set, assume it's 0.
          if (isContentEditable(node)) return 0;
          return node.tabIndex;
        }

        function sortOrderedTabbables(a, b) {
          return a.tabIndex === b.tabIndex
            ? a.documentOrder - b.documentOrder
            : a.tabIndex - b.tabIndex;
        }

        // Array.prototype.find not available in IE.
        function find(list, predicate) {
          for (var i = 0, length = list.length; i < length; i++) {
            if (predicate(list[i])) return list[i];
          }
        }

        function isContentEditable(node) {
          return node.contentEditable === 'true';
        }

        function isInput(node) {
          return node.tagName === 'INPUT';
        }

        function isHiddenInput(node) {
          return isInput(node) && node.type === 'hidden';
        }

        function isRadio(node) {
          return isInput(node) && node.type === 'radio';
        }

        function isNonTabbableRadio(node) {
          return isRadio(node) && !isTabbableRadio(node);
        }

        function getCheckedRadio(nodes) {
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked) {
              return nodes[i];
            }
          }
        }

        function isTabbableRadio(node) {
          if (!node.name) return true;
          // This won't account for the edge case where you have radio groups with the same
          // in separate forms on the same page.
          var radioSet = node.ownerDocument.querySelectorAll(
            'input[type="radio"][name="' + node.name + '"]'
          );
          var checked = getCheckedRadio(radioSet);
          return !checked || checked === node;
        }

        // An element is "untouchable" if *it or one of its ancestors* has
        // `visibility: hidden` or `display: none`.
        function UntouchabilityChecker(elementDocument) {
          this.doc = elementDocument;
          // Node cache must be refreshed on every check, in case
          // the content of the element has changed. The cache contains tuples
          // mapping nodes to their boolean result.
          this.cache = [];
        }

        // getComputedStyle accurately reflects `visibility: hidden` of ancestors
        // but not `display: none`, so we need to recursively check parents.
        UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(
          node,
          nodeComputedStyle
        ) {
          if (node === this.doc.documentElement) return false;

          // Search for a cached result.
          var cached = find(this.cache, function(item) {
            return item === node;
          });
          if (cached) return cached[1];

          nodeComputedStyle =
            nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);

          var result = false;

          if (nodeComputedStyle.display === 'none') {
            result = true;
          } else if (node.parentNode) {
            result = this.hasDisplayNone(node.parentNode);
          }

          this.cache.push([node, result]);

          return result;
        };

        UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(
          node
        ) {
          if (node === this.doc.documentElement) return false;
          var computedStyle = this.doc.defaultView.getComputedStyle(node);
          if (this.hasDisplayNone(node, computedStyle)) return true;
          return computedStyle.visibility === 'hidden';
        };

        module.exports = tabbable;
      },
      {}
    ],
    15: [
      function(require, module, exports) {
        module.exports = extend;

        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function extend() {
          var target = {};

          for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        }
      },
      {}
    ]
  },
  {},
  [6]
);
