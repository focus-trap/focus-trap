/*!
* focus-trap 6.8.0-beta.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
var focusTrapDemoBundle = (function () {
    'use strict';

    (function() {
        const env = {"BUILD_ENV":"demo"};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    function getAugmentedNamespace(n) {
    	if (n.__esModule) return n;
    	var a = Object.defineProperty({}, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    var js = {};

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }

      return target;
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
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

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      Object.defineProperty(subClass, "prototype", {
        writable: false
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct(Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }

    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;

      _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class);
      };

      return _wrapNativeSuper(Class);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }

      return _assertThisInitialized(self);
    }

    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();

      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;

        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;

          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }

        return _possibleConstructorReturn(this, result);
      };
    }

    /*!
    * tabbable 5.3.0-beta.0
    * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
    */

    var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
    var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
    var NoElement = typeof Element === 'undefined';
    var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
      return element.getRootNode();
    } : function (element) {
      return element.ownerDocument;
    };
    /**
     * @param {Element} el container to check in
     * @param {boolean} includeContainer add container to check
     * @param {(node: Element) => boolean} filter filter candidates
     * @returns {Element[]}
     */

    var getCandidates = function getCandidates(el, includeContainer, filter) {
      var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

      if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
      }

      candidates = candidates.filter(filter);
      return candidates;
    };
    /**
     * @callback GetShadowRoot
     * @param {Element} element to check for shadow root
     * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
     */

    /**
     * @typedef {Object} CandidatesScope
     * @property {Element} scope contains inner candidates
     * @property {Element[]} candidates
     */

    /**
     * @typedef {Object} IterativeOptions
     * @property {GetShadowRoot} getShadowRoot returns the shadow root of an element or a boolean stating if it has a shadow root
     * @property {(node: Element) => boolean} filter filter candidates
     * @property {boolean} flatten if true then result will flatten any CandidatesScope into the returned list
     */

    /**
     * @param {Element[]} elements list of element containers to match candidates from
     * @param {boolean} includeContainer add container list to check
     * @param {IterativeOptions} options
     * @returns {Array.<Element|CandidatesScope>}
     */


    var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
      var candidates = [];
      var elementsToCheck = Array.from(elements);

      while (elementsToCheck.length) {
        var element = elementsToCheck.shift();

        if (element.tagName === 'SLOT') {
          // add shadow dom slot scope (slot itself cannot be focusable)
          var assigned = element.assignedElements();
          var content = assigned.length ? assigned : element.children;
          var nestedCandidates = getCandidatesIteratively(content, true, options);

          if (options.flatten) {
            candidates.push.apply(candidates, nestedCandidates);
          } else {
            candidates.push({
              scope: element,
              candidates: nestedCandidates
            });
          }
        } else {
          // check candidate element
          var validCandidate = matches.call(element, candidateSelector);

          if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
            candidates.push(element);
          } // iterate over content


          var shadowRoot = element.shadowRoot || options.getShadowRoot(element);

          if (shadowRoot) {
            // add shadow dom scope
            var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);

            if (options.flatten) {
              candidates.push.apply(candidates, _nestedCandidates);
            } else {
              candidates.push({
                scope: element,
                candidates: _nestedCandidates
              });
            }
          } else {
            // add light dom scope
            elementsToCheck.unshift.apply(elementsToCheck, element.children);
          }
        }
      }

      return candidates;
    };

    var isContentEditable = function isContentEditable(node) {
      return node.contentEditable === 'true';
    };

    var getTabindex = function getTabindex(node, isScope) {
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
      //
      // isScope is positive for custom element with shadow root or slot that by default
      // have tabIndex -1, but need to be sorted by document order in order for their
      // content to be inserted in the correct position


      if ((isScope || node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
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

      var radioScope = node.form || getRootNode(node);

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

    var noop = function noop() {};

    var isZeroArea = function isZeroArea(node) {
      var _node$getBoundingClie = node.getBoundingClientRect(),
          width = _node$getBoundingClie.width,
          height = _node$getBoundingClie.height;

      return width === 0 && height === 0;
    };

    var isHidden = function isHidden(node, _ref) {
      var displayCheck = _ref.displayCheck,
          _ref$getShadowRoot = _ref.getShadowRoot,
          getShadowRoot = _ref$getShadowRoot === void 0 ? noop : _ref$getShadowRoot;

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

          var parentElement = node.parentElement;
          var rootNode = getRootNode(node);

          if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement)) {
            // fallback to zero area size for unreachable shadow dom
            return isZeroArea(node);
          } else if (node.assignedSlot) {
            // iterate up slot
            node = node.assignedSlot;
          } else if (!parentElement && rootNode !== node.ownerDocument) {
            // cross shadow boundary
            node = rootNode.host;
          } else {
            // iterate up normal dom
            node = parentElement;
          }
        }
      } else if (displayCheck === 'non-zero-area') {
        return isZeroArea(node);
      }

      return false;
    }; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
    //  unless they are in the _first_ <legend> element of the top-most disabled
    //  fieldset


    var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
      if (isInput(node) || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'BUTTON') {
        var parentNode = node.parentElement;

        while (parentNode) {
          if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
            // look for the first <legend> as an immediate child of the disabled
            //  <fieldset>: if the node is in that legend, it'll be enabled even
            //  though the fieldset is disabled; otherwise, the node is in a
            //  secondary/subsequent legend, or somewhere else within the fieldset
            //  (however deep nested) and it'll be disabled
            for (var i = 0; i < parentNode.children.length; i++) {
              var child = parentNode.children.item(i);

              if (child.tagName === 'LEGEND') {
                if (child.contains(node)) {
                  return false;
                } // the node isn't in the first legend (in doc order), so no matter
                //  where it is now, it'll be disabled


                return true;
              }
            } // the node isn't in a legend, so no matter where it is now, it'll be disabled


            return true;
          }

          parentNode = parentNode.parentElement;
        }
      } // else, node's tabbable/focusable state should not be affected by a fieldset's
      //  enabled/disabled state


      return false;
    };

    var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
      if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
      isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
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
    /**
     * @param {Array.<Element|CandidatesScope>} candidates
     * @returns Element[]
     */


    var sortByOrder = function sortByOrder(candidates) {
      var regularTabbables = [];
      var orderedTabbables = [];
      candidates.forEach(function (item, i) {
        var isScope = !!item.scope;
        var element = isScope ? item.scope : item;
        var candidateTabindex = getTabindex(element, isScope);
        var elements = isScope ? sortByOrder(item.candidates) : element;

        if (candidateTabindex === 0) {
          isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
        } else {
          orderedTabbables.push({
            documentOrder: i,
            tabIndex: candidateTabindex,
            item: item,
            isScope: isScope,
            content: elements
          });
        }
      });
      return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
        sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
        return acc;
      }, []).concat(regularTabbables);
    };

    var tabbable = function tabbable(el, options) {
      options = options || {};
      var candidates;

      if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([el], options.includeContainer, {
          filter: isNodeMatchingSelectorTabbable.bind(null, options),
          flatten: false,
          getShadowRoot: options.getShadowRoot
        });
      } else {
        candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
      }

      return sortByOrder(candidates);
    };

    var focusable = function focusable(el, options) {
      options = options || {};
      var candidates;

      if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([el], options.includeContainer, {
          filter: isNodeMatchingSelectorFocusable.bind(null, options),
          flatten: true,
          getShadowRoot: options.getShadowRoot
        });
      } else {
        candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
      }

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

    var getActualTarget = function getActualTarget(event) {
      // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
      //  shadow host. However, event.target.composedPath() will be an array of
      //  nodes "clicked" from inner-most (the actual element inside the shadow) to
      //  outer-most (the host HTML document). If we have access to composedPath(),
      //  then use its first element; otherwise, fall back to event.target (and
      //  this only works for an _open_ shadow DOM; otherwise,
      //  composedPath()[0] === event.target always).
      return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
    };

    var createFocusTrap$1 = function createFocusTrap(elements, userOptions) {
      // SSR: a live trap shouldn't be created in this type of environment so this
      //  should be safe code to execute if the `document` option isn't specified
      var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

      var config = _objectSpread2({
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
        // @type {Array<{
        //   container: HTMLElement,
        //   firstTabbableNode: HTMLElement|null,
        //   lastTabbableNode: HTMLElement|null,
        //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
        // }>}
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: false,
        paused: false,
        // timer ID for when delayInitialFocus is true and initial focus in this trap
        //  has been delayed during activation
        delayInitialFocusTimer: undefined
      };
      var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

      /**
       * Gets a configuration option value.
       * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
       *  value will be taken from this object. Otherwise, value will be taken from base configuration.
       * @param {string} optionName Name of the option whose value is sought.
       * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
       *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
       */

      var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
        return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
      };

      var containersContain = function containersContain(element) {
        return !!(element && // DEBUG TODO: this doesn't look inside web components (even open ones),
        //  which means if we're about to tab onto an element inside a web component,
        //  even if we've found it via tabbable() with shadow DOM enabled, we're
        //  going to think the elemene isn't contained, we're then going to bring
        //  focus back into the trap (thinking it has escaped, because the fact we're
        //  testing `element` means the browser moved focus to it) and it'll be to
        //  the most recently focused node, which will make it look like the tab
        //  key is stuck on the element just before the one in the web component...
        //  See issue https://github.com/focus-trap/focus-trap/issues/643
        state.containers.some(function (container) {
          return container.contains(element);
        }));
      };
      /**
       * Gets the node for the given option, which is expected to be an option that
       *  can be either a DOM node, a string that is a selector to get a node, `false`
       *  (if a node is explicitly NOT given), or a function that returns any of these
       *  values.
       * @param {string} optionName
       * @returns {undefined | false | HTMLElement | SVGElement} Returns
       *  `undefined` if the option is not specified; `false` if the option
       *  resolved to `false` (node explicitly not given); otherwise, the resolved
       *  DOM node.
       * @throws {Error} If the option is set, not `false`, and is not, or does not
       *  resolve to a node.
       */


      var getNodeForOption = function getNodeForOption(optionName) {
        var optionValue = config[optionName];

        if (typeof optionValue === 'function') {
          for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            params[_key2 - 1] = arguments[_key2];
          }

          optionValue = optionValue.apply(void 0, params);
        }

        if (!optionValue) {
          if (optionValue === undefined || optionValue === false) {
            return optionValue;
          } // else, empty string (invalid), null (invalid), 0 (invalid)


          throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
        }

        var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

        if (typeof optionValue === 'string') {
          node = doc.querySelector(optionValue); // resolve to node, or null if fails

          if (!node) {
            throw new Error("`".concat(optionName, "` as selector refers to no known node"));
          }
        }

        return node;
      };

      var getInitialFocusNode = function getInitialFocusNode() {
        var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

        if (node === false) {
          return false;
        }

        if (node === undefined) {
          // option not specified: use fallback options
          if (containersContain(doc.activeElement)) {
            node = doc.activeElement;
          } else {
            var firstTabbableGroup = state.tabbableGroups[0];
            var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

            node = firstTabbableNode || getNodeForOption('fallbackFocus');
          }
        }

        if (!node) {
          throw new Error('Your focus-trap needs to have at least one focusable element');
        }

        return node;
      };

      var updateTabbableNodes = function updateTabbableNodes() {
        state.tabbableGroups = state.containers.map(function (container) {
          var _config$tabbableOptio;

          var tabbableNodes = tabbable(container, {
            getShadowRoot: (_config$tabbableOptio = config.tabbableOptions) === null || _config$tabbableOptio === void 0 ? void 0 : _config$tabbableOptio.getShadowRoot
          }); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
          //  are a superset of tabbable nodes

          var focusableNodes = focusable(container);

          if (tabbableNodes.length > 0) {
            return {
              container: container,
              firstTabbableNode: tabbableNodes[0],
              lastTabbableNode: tabbableNodes[tabbableNodes.length - 1],

              /**
               * Finds the __tabbable__ node that follows the given node in the specified direction,
               *  in this container, if any.
               * @param {HTMLElement} node
               * @param {boolean} [forward] True if going in forward tab order; false if going
               *  in reverse.
               * @returns {HTMLElement|undefined} The next tabbable node, if any.
               */
              nextTabbableNode: function nextTabbableNode(node) {
                var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                // NOTE: If tabindex is positive (in order to manipulate the tab order separate
                //  from the DOM order), this __will not work__ because the list of focusableNodes,
                //  while it contains tabbable nodes, does not sort its nodes in any order other
                //  than DOM order, because it can't: Where would you place focusable (but not
                //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
                // Support for positive tabindex is already broken and hard to manage (possibly
                //  not supportable, TBD), so this isn't going to make things worse than they
                //  already are, and at least makes things better for the majority of cases where
                //  tabindex is either 0/unset or negative.
                // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
                var nodeIdx = focusableNodes.findIndex(function (n) {
                  return n === node;
                });

                if (forward) {
                  return focusableNodes.slice(nodeIdx + 1).find(function (n) {
                    return isTabbable(n);
                  });
                }

                return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
                  return isTabbable(n);
                });
              }
            };
          }

          return undefined;
        }).filter(function (group) {
          return !!group;
        }); // remove groups with no tabbable nodes
        // throw if no groups have tabbable nodes and we don't have a fallback focus node either

        if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
        ) {
          throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
        }
      };

      var tryFocus = function tryFocus(node) {
        if (node === false) {
          return;
        }

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
        var node = getNodeForOption('setReturnFocus', previousActiveElement);
        return node ? node : node === false ? false : previousActiveElement;
      }; // This needs to be done on mousedown and touchstart instead of click
      // so that it precedes the focus event.


      var checkPointerDown = function checkPointerDown(e) {
        var target = getActualTarget(e);

        if (containersContain(target)) {
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
            returnFocus: config.returnFocusOnDeactivate && !isFocusable(target)
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
        var target = getActualTarget(e);
        var targetContained = containersContain(target); // In Firefox when you Tab out of an iframe the Document is briefly focused.

        if (targetContained || target instanceof Document) {
          if (targetContained) {
            state.mostRecentlyFocusedNode = target;
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
        var target = getActualTarget(e);
        updateTabbableNodes();
        var destinationNode = null;

        if (state.tabbableGroups.length > 0) {
          // make sure the target is actually contained in a group
          // NOTE: the target may also be the container itself if it's focusable
          //  with tabIndex='-1' and was given initial focus
          var containerIndex = findIndex(state.tabbableGroups, function (_ref) {
            var container = _ref.container;
            return container.contains(target);
          });
          var containerGroup = containerIndex >= 0 ? state.tabbableGroups[containerIndex] : undefined;

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
              return target === firstTabbableNode;
            });

            if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target) && !isTabbable(target) && !containerGroup.nextTabbableNode(target, false))) {
              // an exception case where the target is either the container itself, or
              //  a non-tabbable node that was given focus (i.e. tabindex is negative
              //  and user clicked on it or node was programmatically given focus)
              //  and is not followed by any other tabbable node, in which
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
              return target === lastTabbableNode;
            });

            if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target) && !isTabbable(target) && !containerGroup.nextTabbableNode(target))) {
              // an exception case where the target is the container itself, or
              //  a non-tabbable node that was given focus (i.e. tabindex is negative
              //  and user clicked on it or node was programmatically given focus)
              //  and is not followed by any other tabbable node, in which
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
          // NOTE: the fallbackFocus option does not support returning false to opt-out
          destinationNode = getNodeForOption('fallbackFocus');
        }

        if (destinationNode) {
          e.preventDefault();
          tryFocus(destinationNode);
        } // else, let the browser take care of [shift+]tab and move the focus

      };

      var checkKey = function checkKey(e) {
        if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
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

        var target = getActualTarget(e);

        if (containersContain(target)) {
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
        if (!state.active) {
          return;
        } // There can be only one listening focus trap at a time


        activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
        // that caused the focus trap activation.

        state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
          tryFocus(getInitialFocusNode());
        }) : tryFocus(getInitialFocusNode());
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

            addListeners();

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

          clearTimeout(state.delayInitialFocusTimer); // noop if undefined

          state.delayInitialFocusTimer = undefined;
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

    var focusTrap = /*#__PURE__*/Object.freeze({
        __proto__: null,
        createFocusTrap: createFocusTrap$1
    });

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(focusTrap);

    var createFocusTrap = require$$0.createFocusTrap;

    var withOpenWebComponent = function withOpenWebComponent() {
      var container = document.getElementById('with-open-web-component');
      customElements.define('open-web-component', /*#__PURE__*/function (_HTMLElement) {
        _inherits(_class, _HTMLElement);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.apply(this, arguments);
        }

        _createClass(_class, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            this.attachShadow({
              mode: 'open'
            });
            this.shadowRoot.innerHTML = "\n          <p>\n            <button id=\"with-open-web-component-button\">open-web-component</button>\n          </p>\n        ";
          }
        }]);

        return _class;
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
      container.innerHTML = "\n    <button>button 1</button>\n    <button>button 2</button>\n    <button>button 3</button>\n    <open-web-component></open-web-component>\n    <button>button 4</button>\n    <button>button 5</button>\n    <p>\n      <button id=\"deactivate-with-open-web-component\" aria-describedby=\"with-open-web-component-heading\">\n        deactivate trap\n      </button>\n    </p>\n  ";
      var focusTrap = createFocusTrap('#with-open-web-component', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        },
        tabbableOptions: {
          getShadowRoot: function getShadowRoot() {
            return true;
          }
        }
      });
      document.getElementById('activate-with-open-web-component').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-with-open-web-component').addEventListener('click', focusTrap.deactivate);
    };

    // require('./default')();
    // require('./animated-dialog')();
    // require('./animated-trigger')();
    // require('./escape-deactivates')();
    // require('./initial-element-no-escape')();
    // require('./initially-focused-container')();
    // require('./hidden-treasures')();
    // require('./nested')();
    // require('./sibling')();
    // require('./tricky-initial-focus')();
    // require('./input-activation')();
    // require('./delay')();
    // require('./radio')();
    // require('./iframe')();
    // // loading this in a Cypress env causes Chrome to fail in GitHub CI (even with
    // //  the `"chromeWebSecurity": false` option set in the cypress.json config file),
    // //  and causes FireFox to fail both locally and in CI due to security context
    // //  violations; but it's still a good demo to have, and at least we can test
    // //  it manually
    // // eslint-disable-next-line no-undef -- process is defined via Rollup
    // if (!process.env.IS_CYPRESS_ENV) {
    //   require('./in-iframe')();
    // }
    // require('./allow-outside-click')();
    // require('./click-outside-deactivates')();
    // require('./set-return-focus')();
    // require('./set-return-focus-function')();
    // require('./no-delay')();
    // require('./multiple-elements')();
    // require('./multiple-elements-delete')();
    // require('./multiple-elements-delete-all')();
    // require('./multiple-elements-multiple-traps')();
    // require('./in-open-shadow-dom')();
    // require('./negative-tabindex')();
    // require('./negative-tabindex-last')();

    withOpenWebComponent();

    return js;

})();
//# sourceMappingURL=demo-bundle.js.map
