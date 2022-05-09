/*!
* focus-trap 6.9.1
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
var focusTrapDemoBundle = (function () {
    'use strict';

    (function() {
        const env = {"BUILD_ENV":"demo","IS_CYPRESS_ENV":"chrome"};
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
      var f = n.default;
    	if (typeof f == "function") {
    		var a = function () {
    			return f.apply(this, arguments);
    		};
    		a.prototype = f.prototype;
      } else a = {};
      Object.defineProperty(a, '__esModule', {value: true});
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

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
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
    * tabbable 5.3.2
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
     * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
     *  if a function, implies shadow support is enabled and either returns the shadow root of an element
     *  or a boolean stating if it has an undisclosed shadow root
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
          } // iterate over shadow content if possible


          var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
          typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

          if (shadowRoot) {
            // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
            //  shadow exists, so look at light dom children as fallback BUT create a scope for any
            //  child candidates found because they're likely slotted elements (elements that are
            //  children of the web component element (which has the shadow), in the light dom, but
            //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
            //  _after_ we return from this recursive call
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
            // there's not shadow so just dig into the element's (light dom) children
            //  __without__ giving the element special scope treatment
            elementsToCheck.unshift.apply(elementsToCheck, element.children);
          }
        }
      }

      return candidates;
    };

    var getTabindex = function getTabindex(node, isScope) {
      if (node.tabIndex < 0) {
        // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
        // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
        // yet they are still part of the regular tab order; in FF, they get a default
        // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
        // order, consider their tab index to be 0.
        // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
        // so if they don't have a tabindex attribute specifically set, assume it's 0.
        //
        // isScope is positive for custom element with shadow root or slot that by default
        // have tabIndex -1, but need to be sorted by document order in order for their
        // content to be inserted in the correct position
        if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
          return 0;
        }
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

    var isZeroArea = function isZeroArea(node) {
      var _node$getBoundingClie = node.getBoundingClientRect(),
          width = _node$getBoundingClie.width,
          height = _node$getBoundingClie.height;

      return width === 0 && height === 0;
    };

    var isHidden = function isHidden(node, _ref) {
      var displayCheck = _ref.displayCheck,
          getShadowRoot = _ref.getShadowRoot; // NOTE: visibility will be `undefined` if node is detached from the document
      //  (see notes about this further down), which means we will consider it visible
      //  (this is legacy behavior from a very long way back)
      // NOTE: we check this regardless of `displayCheck="none"` because this is a
      //  _visibility_ check, not a _display_ check

      if (getComputedStyle(node).visibility === 'hidden') {
        return true;
      }

      var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

      if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
        return true;
      } // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
      //  (but NOT _the_ document; see second 'If' comment below for more).
      // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
      //  is attached, and the one we need to check if it's in the document or not (because the
      //  shadow, and all nodes it contains, is never considered in the document since shadows
      //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
      //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
      //  visibility, including all the nodes it contains). The host could be any normal node,
      //  or a custom element (i.e. web component). Either way, that's the one that is considered
      //  part of the document, not the shadow root, nor any of its children (i.e. the node being
      //  tested).
      // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
      //  document (per the docs) and while it's a Document-type object, that document does not
      //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
      //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
      //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
      //  node is actually detached.


      var nodeRootHost = getRootNode(node).host;
      var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);

      if (!displayCheck || displayCheck === 'full') {
        if (typeof getShadowRoot === 'function') {
          // figure out if we should consider the node to be in an undisclosed shadow and use the
          //  'non-zero-area' fallback
          var originalNode = node;

          while (node) {
            var parentElement = node.parentElement;
            var rootNode = getRootNode(node);

            if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
            ) {
              // node has an undisclosed shadow which means we can only treat it as a black box, so we
              //  fall back to a non-zero-area test
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

          node = originalNode;
        } // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
        //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
        //  it might be a falsy value, which means shadow DOM support is disabled
        // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
        //  now we can just test to see if it would normally be visible or not, provided it's
        //  attached to the main document.
        // NOTE: We must consider case where node is inside a shadow DOM and given directly to
        //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.


        if (nodeIsAttached) {
          // this works wherever the node is: if there's at least one client rect, it's
          //  somehow displayed; it also covers the CSS 'display: contents' case where the
          //  node itself is hidden in place of its contents; and there's no need to search
          //  up the hierarchy either
          return !node.getClientRects().length;
        } // Else, the node isn't attached to the document, which means the `getClientRects()`
        //  API will __always__ return zero rects (this can happen, for example, if React
        //  is used to render nodes onto a detached tree, as confirmed in this thread:
        //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
        //
        // It also means that even window.getComputedStyle(node).display will return `undefined`
        //  because styles are only computed for nodes that are in the document.
        //
        // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
        //  somehow. Though it was never stated officially, anyone who has ever used tabbable
        //  APIs on nodes in detached containers has actually implicitly used tabbable in what
        //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
        //  considering __everything__ to be visible because of the innability to determine styles.

      } else if (displayCheck === 'non-zero-area') {
        // NOTE: Even though this tests that the node's client rect is non-zero to determine
        //  whether it's displayed, and that a detached node will __always__ have a zero-area
        //  client rect, we don't special-case for whether the node is attached or not. In
        //  this mode, we do want to consider nodes that have a zero area to be hidden at all
        //  times, and that includes attached or not.
        return isZeroArea(node);
      } // visible, as far as we can tell, or per current `displayCheck` mode


      return false;
    }; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
    //  unless they are in the _first_ <legend> element of the top-most disabled
    //  fieldset


    var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
      if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
        var parentNode = node.parentElement; // check if `node` is contained in a disabled <fieldset>

        while (parentNode) {
          if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
            // look for the first <legend> among the children of the disabled <fieldset>
            for (var i = 0; i < parentNode.children.length; i++) {
              var child = parentNode.children.item(i); // when the first <legend> (in document order) is found

              if (child.tagName === 'LEGEND') {
                // if its parent <fieldset> is not nested in another disabled <fieldset>,
                // return whether `node` is a descendant of its first <legend>
                return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
              }
            } // the disabled <fieldset> containing `node` has no <legend>


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
      if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
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

    var delay$1 = function delay(fn) {
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

    var createFocusTrap$s = function createFocusTrap(elements, userOptions) {
      // SSR: a live trap shouldn't be created in this type of environment so this
      //  should be safe code to execute if the `document` option isn't specified
      var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

      var config = _objectSpread2({
        returnFocusOnDeactivate: true,
        escapeDeactivates: true,
        delayInitialFocus: true
      }, userOptions);

      var state = {
        // containers given to createFocusTrap()
        // @type {Array<HTMLElement>}
        containers: [],
        // list of objects identifying tabbable nodes in `containers` in the trap
        // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
        //  is active, but the trap should never get to a state where there isn't at least one group
        //  with at least one tabbable node in it (that would lead to an error condition that would
        //  result in an error being thrown)
        // @type {Array<{
        //   container: HTMLElement,
        //   tabbableNodes: Array<HTMLElement>, // empty if none
        //   focusableNodes: Array<HTMLElement>, // empty if none
        //   firstTabbableNode: HTMLElement|null,
        //   lastTabbableNode: HTMLElement|null,
        //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
        // }>}
        containerGroups: [],
        // same order/length as `containers` list
        // references to objects in `containerGroups`, but only those that actually have
        //  tabbable nodes in them
        // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
        //  the same length
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
      /**
       * Finds the index of the container that contains the element.
       * @param {HTMLElement} element
       * @returns {number} Index of the container in either `state.containers` or
       *  `state.containerGroups` (the order/length of these lists are the same); -1
       *  if the element isn't found.
       */


      var findContainerIndex = function findContainerIndex(element) {
        // NOTE: search `containerGroups` because it's possible a group contains no tabbable
        //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
        //  and we still need to find the element in there
        return state.containerGroups.findIndex(function (_ref) {
          var container = _ref.container,
              tabbableNodes = _ref.tabbableNodes;
          return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
          //  web components if the `tabbableOptions.getShadowRoot` option was used for
          //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
          //  look inside web components even if open)
          tabbableNodes.find(function (node) {
            return node === element;
          });
        });
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

        if (optionValue === true) {
          optionValue = undefined; // use default value
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
          if (findContainerIndex(doc.activeElement) >= 0) {
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
        state.containerGroups = state.containers.map(function (container) {
          var tabbableNodes = tabbable(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
          //  are a superset of tabbable nodes

          var focusableNodes = focusable(container, config.tabbableOptions);
          return {
            container: container,
            tabbableNodes: tabbableNodes,
            focusableNodes: focusableNodes,
            firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
            lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,

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

              if (nodeIdx < 0) {
                return undefined;
              }

              if (forward) {
                return focusableNodes.slice(nodeIdx + 1).find(function (n) {
                  return isTabbable(n, config.tabbableOptions);
                });
              }

              return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
                return isTabbable(n, config.tabbableOptions);
              });
            }
          };
        });
        state.tabbableGroups = state.containerGroups.filter(function (group) {
          return group.tabbableNodes.length > 0;
        }); // throw if no groups have tabbable nodes and we don't have a fallback focus node either

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

        if (findContainerIndex(target) >= 0) {
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
            returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
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
        var targetContained = findContainerIndex(target) >= 0; // In Firefox when you Tab out of an iframe the Document is briefly focused.

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
          var containerIndex = findContainerIndex(target);
          var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;

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

            if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
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

            if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
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
        var target = getActualTarget(e);

        if (findContainerIndex(target) >= 0) {
          return;
        }

        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
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

        state.delayInitialFocusTimer = config.delayInitialFocus ? delay$1(function () {
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
        get active() {
          return state.active;
        },

        get paused() {
          return state.paused;
        },

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

          var options = _objectSpread2({
            onDeactivate: config.onDeactivate,
            onPostDeactivate: config.onPostDeactivate,
            checkCanReturnFocus: config.checkCanReturnFocus
          }, deactivateOptions);

          clearTimeout(state.delayInitialFocusTimer); // noop if undefined

          state.delayInitialFocusTimer = undefined;
          removeListeners();
          state.active = false;
          state.paused = false;
          activeFocusTraps.deactivateTrap(trap);
          var onDeactivate = getOption(options, 'onDeactivate');
          var onPostDeactivate = getOption(options, 'onPostDeactivate');
          var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
          var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');

          if (onDeactivate) {
            onDeactivate();
          }

          var finishDeactivation = function finishDeactivation() {
            delay$1(function () {
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
        createFocusTrap: createFocusTrap$s
    });

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(focusTrap);

    var createFocusTrap$r = require$$0.createFocusTrap;

    var _default = function _default() {
      var container = document.getElementById('default');
      var focusTrap = createFocusTrap$r('#default', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-default').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-default').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$q = require$$0.createFocusTrap;

    var animatedDialog = function animatedDialog() {
      var container = document.getElementById('animated-dialog');
      var activatedFlag = document.getElementById('animated-dialog-trap-activated');
      var focusTrap = createFocusTrap$q('#animated-dialog', {
        // Called before focus is sent
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        // There is a delay between when the class is applied
        // and when the element is focusable
        checkCanFocusTrap: function checkCanFocusTrap(trapContainers) {
          var results = trapContainers.map(function (trapContainer) {
            return new Promise(function (resolve) {
              var interval = setInterval(function () {
                if (getComputedStyle(trapContainer).visibility !== 'hidden') {
                  resolve();
                  clearInterval(interval);
                }
              }, 5);
            });
          }); // Return a promise that resolves when all the trap containers are able to receive focus

          return Promise.all(results);
        },
        // Called after focus is sent to the focus trap
        onPostActivate: function onPostActivate() {
          return activatedFlag.classList.remove('is-hidden');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        },
        onPostDeactivate: function onPostDeactivate() {
          return activatedFlag.classList.add('is-hidden');
        }
      });
      document.getElementById('activate-animated-dialog').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-animated-dialog').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$p = require$$0.createFocusTrap;

    var animatedTrigger = function animatedTrigger() {
      var container = document.getElementById('animated-trigger');
      var trigger = document.getElementById('activate-animated-trigger');
      var deactivatedFlag = document.getElementById('animated-trigger-trap-deactivated');
      var returnFocusCheckbox = document.getElementById('animated-trigger-returnfocus');
      var focusTrap = createFocusTrap$p('#animated-trigger', {
        // Called before focus is sent
        onActivate: function onActivate() {
          container.classList.add('is-active');
          trigger.classList.add('is-triggered');
          deactivatedFlag.classList.add('is-hidden');
        },
        onDeactivate: function onDeactivate() {
          container.classList.remove('is-active');
          trigger.classList.remove('is-triggered');
        },
        // There is a delay between when the class is removed
        // and when the trigger is focusable
        checkCanReturnFocus: function checkCanReturnFocus(triggerButton) {
          return new Promise(function (resolve) {
            var interval = setInterval(function () {
              if (getComputedStyle(triggerButton).visibility !== 'hidden') {
                resolve();
                clearInterval(interval);
              }
            }, 5);
          });
        },
        // Called after focus is sent to the trigger button
        onPostDeactivate: function onPostDeactivate() {
          deactivatedFlag.classList.remove('is-hidden');
        }
      });
      document.getElementById('activate-animated-trigger').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-animated-trigger').addEventListener('click', function () {
        focusTrap.deactivate({
          returnFocus: returnFocusCheckbox.checked
        });
      });
    };

    var createFocusTrap$o = require$$0.createFocusTrap;

    var escapeDeactivates = function escapeDeactivates() {
      var container = document.getElementById('escape-deactivates');
      var escapeDeactivatesOption = document.getElementById('escape-deactivates-option');
      var focusTrap = createFocusTrap$o('#escape-deactivates', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        },
        escapeDeactivates: function escapeDeactivates() {
          return escapeDeactivatesOption.checked;
        },
        // allow clicking on the checkbox or its label since it's outside the trap
        allowOutsideClick: function allowOutsideClick(e) {
          return e.target === escapeDeactivatesOption || e.target === escapeDeactivatesOption.parentNode;
        }
      });
      document.getElementById('activate-escape-deactivates').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-escape-deactivates').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$n = require$$0.createFocusTrap;

    var initialElementNoEscape = function initialElementNoEscape() {
      var container = document.getElementById('iene');
      var activateTrigger = document.getElementById('activate-iene');
      var deactivateTrigger = document.getElementById('deactivate-iene');
      var select = document.getElementById('select-iene');

      var initialize = function initialize(_ref) {
        var _ref$initialFocus = _ref.initialFocus,
            initialFocus = _ref$initialFocus === void 0 ? '#focused-input' : _ref$initialFocus;
        return createFocusTrap$n(container, {
          onActivate: function onActivate() {
            return container.classList.add('is-active');
          },
          onDeactivate: function onDeactivate() {
            return container.classList.remove('is-active');
          },
          initialFocus: initialFocus,
          escapeDeactivates: false
        });
      };

      var focusTrap = initialize({
        initialFocus: select.value
      });
      activateTrigger.addEventListener('click', function () {
        return focusTrap.activate();
      });
      deactivateTrigger.addEventListener('click', function () {
        return focusTrap.deactivate();
      });
      select.addEventListener('change', function (event) {
        var initialFocus = event.target.value;

        if (initialFocus === 'false') {
          initialFocus = false;
        } else if (initialFocus === 'function-false') {
          initialFocus = function initialFocus() {
            return false;
          };
        } // else, assume it's a selector


        focusTrap = initialize({
          initialFocus: initialFocus
        });
      });
    };

    var createFocusTrap$m = require$$0.createFocusTrap;

    var initiallyFocusedContainer = function initiallyFocusedContainer() {
      var container = document.getElementById('ifc');
      var focusTrap = createFocusTrap$m('#ifc', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        },
        initialFocus: function initialFocus() {
          return document.getElementById('ifc');
        },
        clickOutsideDeactivates: true
      });
      document.getElementById('activate-ifc').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-ifc').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$l = require$$0.createFocusTrap;

    var hiddenTreasures = function hiddenTreasures() {
      var container = document.getElementById('ht');
      var more = document.getElementById('ht-more');
      var focusTrap = createFocusTrap$l(container, {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-ht').addEventListener('click', focusTrap.activate);
      document.getElementById('ht-show-more').addEventListener('click', function () {
        more.style.display = 'block';
      });
      document.getElementById('ht-show-less').addEventListener('click', function () {
        more.style.display = 'none';
      });
    };

    var createFocusTrap$k = require$$0.createFocusTrap;

    var nested = function nested() {
      var container = document.getElementById('nested');
      var nested = document.getElementById('nested-nested');
      var primaryFocusTrap = createFocusTrap$k('#nested', {
        onDeactivate: function onDeactivate() {
          return container.style.display = 'none';
        }
      });
      var nestedFocusTrap = createFocusTrap$k('#nested-nested', {
        onDeactivate: function onDeactivate() {
          nested.style.display = 'none';
          primaryFocusTrap.unpause();
        }
      });
      document.getElementById('activate-nested').addEventListener('click', function () {
        container.style.display = 'block';
        primaryFocusTrap.activate();
      });
      document.getElementById('deactivate-nested').addEventListener('click', primaryFocusTrap.deactivate);
      document.getElementById('nested-activate-nested').addEventListener('click', function () {
        nested.style.display = 'block';
        nestedFocusTrap.activate();
      });
      document.getElementById('nested-deactivate-nested').addEventListener('click', nestedFocusTrap.deactivate);
    };

    var createFocusTrap$j = require$$0.createFocusTrap;

    var sibling = function sibling() {
      var container = document.getElementById('sibling-first');
      var second = document.getElementById('sibling-second');
      var firstFocusTrap = createFocusTrap$j('#sibling-first', {
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      var secondFocusTrap = createFocusTrap$j('#sibling-second', {
        onDeactivate: function onDeactivate() {
          second.style.display = 'none';
          second.classList.remove('is-active');
        }
      });
      document.getElementById('activate-first-sibling').addEventListener('click', function () {
        container.classList.add('is-active');
        firstFocusTrap.activate();
      });
      document.getElementById('deactivate-first-sibling').addEventListener('click', firstFocusTrap.deactivate);
      document.getElementById('activate-second-sibling').addEventListener('click', function () {
        second.style.display = 'block';
        second.className = 'trap is-active-nested';
        secondFocusTrap.activate();
      });
      document.getElementById('deactivate-second-sibling').addEventListener('click', secondFocusTrap.deactivate);
    };

    var createFocusTrap$i = require$$0.createFocusTrap;

    var trickyInitialFocus = function trickyInitialFocus() {
      var container = document.getElementById('tif');
      var focusable = document.getElementById('tif-hide-focusable');
      var focusTrap = createFocusTrap$i(container, {
        fallbackFocus: container,
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-tif').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-tif').addEventListener('click', focusTrap.deactivate);
      document.getElementById('tif-show-focusable').addEventListener('click', function () {
        return focusable.style.display = 'block';
      });
      document.getElementById('tif-hide-focusable').addEventListener('click', function () {
        return focusable.style.display = 'none';
      });
    };

    var createFocusTrap$h = require$$0.createFocusTrap;

    var inputActivation = function inputActivation() {
      var container = document.getElementById('input-activation');
      var focusTrap = createFocusTrap$h(container, {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('focused-input8').addEventListener('input', focusTrap.activate);
      document.getElementById('deactivate-input-activation').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$g = require$$0.createFocusTrap;
    var container = document.getElementById('delay');

    var delay = function delay() {
      var focusTrap = createFocusTrap$g(container, {
        onActivate: function onActivate() {
          container.style.opacity = '1';
          container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          container.style.opacity = '0.2';
          container.classList.remove('is-active');
        }
      });

      var showContainer = function showContainer(e) {
        if (e.keyCode === 13) {
          focusTrap.activate();
        }
      };

      var hideContainer = function hideContainer() {
        focusTrap.deactivate();
      };

      document.getElementById('activate-delay').addEventListener('keydown', showContainer);
      document.getElementById('close-button-delay').addEventListener('click', hideContainer);
    };

    var createFocusTrap$f = require$$0.createFocusTrap;

    var radio = function radio() {
      var container = document.getElementById('radio');
      var focusTrap = createFocusTrap$f('#radio', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-radio').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-radio').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$e = require$$0.createFocusTrap;

    var iframe = function iframe() {
      var container = document.getElementById('iframe');
      var focusTrap = createFocusTrap$e('#iframe', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-iframe').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-iframe').addEventListener('click', focusTrap.deactivate);
    };

    var runtime = {exports: {}};

    var hasRequiredRuntime;

    function requireRuntime() {
      if (hasRequiredRuntime) return runtime.exports;
      hasRequiredRuntime = 1;

      (function (module) {
        var runtime = function (exports) {

          var Op = Object.prototype;
          var hasOwn = Op.hasOwnProperty;
          var undefined$1; // More compressible than void 0.

          var $Symbol = typeof Symbol === "function" ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || "@@iterator";
          var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
          var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

          function define(obj, key, value) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
            return obj[key];
          }

          try {
            // IE 8 has a broken Object.defineProperty that only works on DOM objects.
            define({}, "");
          } catch (err) {
            define = function define(obj, key, value) {
              return obj[key] = value;
            };
          }

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
            var generator = Object.create(protoGenerator.prototype);
            var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.

            generator._invoke = makeInvokeMethod(innerFn, self, context);
            return generator;
          }

          exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.

          function tryCatch(fn, obj, arg) {
            try {
              return {
                type: "normal",
                arg: fn.call(obj, arg)
              };
            } catch (err) {
              return {
                type: "throw",
                arg: err
              };
            }
          }

          var GenStateSuspendedStart = "suspendedStart";
          var GenStateSuspendedYield = "suspendedYield";
          var GenStateExecuting = "executing";
          var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.

          var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.

          function Generator() {}

          function GeneratorFunction() {}

          function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.


          var IteratorPrototype = {};

          IteratorPrototype[iteratorSymbol] = function () {
            return this;
          };

          var getProto = Object.getPrototypeOf;
          var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

          if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
          }

          var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
          GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
          GeneratorFunctionPrototype.constructor = GeneratorFunction;
          GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.

          function defineIteratorMethods(prototype) {
            ["next", "throw", "return"].forEach(function (method) {
              define(prototype, method, function (arg) {
                return this._invoke(method, arg);
              });
            });
          }

          exports.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === "function" && genFun.constructor;
            return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
          };

          exports.mark = function (genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              define(genFun, toStringTagSymbol, "GeneratorFunction");
            }

            genFun.prototype = Object.create(Gp);
            return genFun;
          }; // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.


          exports.awrap = function (arg) {
            return {
              __await: arg
            };
          };

          function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);

              if (record.type === "throw") {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;

                if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
                  return PromiseImpl.resolve(value.__await).then(function (value) {
                    invoke("next", value, resolve, reject);
                  }, function (err) {
                    invoke("throw", err, resolve, reject);
                  });
                }

                return PromiseImpl.resolve(value).then(function (unwrapped) {
                  // When a yielded Promise is resolved, its final value becomes
                  // the .value of the Promise<{value,done}> result for the
                  // current iteration.
                  result.value = unwrapped;
                  resolve(result);
                }, function (error) {
                  // If a rejected Promise was yielded, throw the rejection back
                  // into the async generator function so it can be handled there.
                  return invoke("throw", error, resolve, reject);
                });
              }
            }

            var previousPromise;

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }

              return previousPromise = // If enqueue has been called before, then we want to wait until
              // all previous Promises have been resolved before calling invoke,
              // so that results are always delivered in the correct order. If
              // enqueue has not been called before, then it is important to
              // call invoke immediately, without waiting on a callback to fire,
              // so that the async generator function has the opportunity to do
              // any necessary setup in a predictable way. This predictability
              // is why the Promise constructor synchronously invokes its
              // executor callback, and why async functions synchronously
              // execute code before the first await. Since we implement simple
              // async functions in terms of async generators, it is especially
              // important to get this right, even though it requires care.
              previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            } // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).


            this._invoke = enqueue;
          }

          defineIteratorMethods(AsyncIterator.prototype);

          AsyncIterator.prototype[asyncIteratorSymbol] = function () {
            return this;
          };

          exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.

          exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
            if (PromiseImpl === void 0) PromiseImpl = Promise;
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
            return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
            : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
          };

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;
            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error("Generator is already running");
              }

              if (state === GenStateCompleted) {
                if (method === "throw") {
                  throw arg;
                } // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


                return doneResult();
              }

              context.method = method;
              context.arg = arg;

              while (true) {
                var delegate = context.delegate;

                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);

                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }

                if (context.method === "next") {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg;
                } else if (context.method === "throw") {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                  }

                  context.dispatchException(context.arg);
                } else if (context.method === "return") {
                  context.abrupt("return", context.arg);
                }

                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);

                if (record.type === "normal") {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                  if (record.arg === ContinueSentinel) {
                    continue;
                  }

                  return {
                    value: record.arg,
                    done: context.done
                  };
                } else if (record.type === "throw") {
                  state = GenStateCompleted; // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.

                  context.method = "throw";
                  context.arg = record.arg;
                }
              }
            };
          } // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.


          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];

            if (method === undefined$1) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null;

              if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = "return";
                  context.arg = undefined$1;
                  maybeInvokeDelegate(delegate, context);

                  if (context.method === "throw") {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                  }
                }

                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
              }

              return ContinueSentinel;
            }

            var record = tryCatch(method, delegate.iterator, context.arg);

            if (record.type === "throw") {
              context.method = "throw";
              context.arg = record.arg;
              context.delegate = null;
              return ContinueSentinel;
            }

            var info = record.arg;

            if (!info) {
              context.method = "throw";
              context.arg = new TypeError("iterator result is not an object");
              context.delegate = null;
              return ContinueSentinel;
            }

            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

              context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.

              if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined$1;
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info;
            } // The delegate iterator is finished, so forget it and continue with
            // the outer generator.


            context.delegate = null;
            return ContinueSentinel;
          } // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.


          defineIteratorMethods(Gp);
          define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.

          Gp[iteratorSymbol] = function () {
            return this;
          };

          Gp.toString = function () {
            return "[object Generator]";
          };

          function pushTryEntry(locs) {
            var entry = {
              tryLoc: locs[0]
            };

            if (1 in locs) {
              entry.catchLoc = locs[1];
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal";
            delete record.arg;
            entry.completion = record;
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{
              tryLoc: "root"
            }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }

          exports.keys = function (object) {
            var keys = [];

            for (var key in object) {
              keys.push(key);
            }

            keys.reverse(); // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.

            return function next() {
              while (keys.length) {
                var key = keys.pop();

                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              } // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.


              next.done = true;
              return next;
            };
          };

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];

              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }

              if (typeof iterable.next === "function") {
                return iterable;
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                    next = function next() {
                  while (++i < iterable.length) {
                    if (hasOwn.call(iterable, i)) {
                      next.value = iterable[i];
                      next.done = false;
                      return next;
                    }
                  }

                  next.value = undefined$1;
                  next.done = true;
                  return next;
                };

                return next.next = next;
              }
            } // Return an iterator with no values.


            return {
              next: doneResult
            };
          }

          exports.values = values;

          function doneResult() {
            return {
              value: undefined$1,
              done: true
            };
          }

          Context.prototype = {
            constructor: Context,
            reset: function reset(skipTempReset) {
              this.prev = 0;
              this.next = 0; // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.

              this.sent = this._sent = undefined$1;
              this.done = false;
              this.delegate = null;
              this.method = "next";
              this.arg = undefined$1;
              this.tryEntries.forEach(resetTryEntry);

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                    this[name] = undefined$1;
                  }
                }
              }
            },
            stop: function stop() {
              this.done = true;
              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;

              if (rootRecord.type === "throw") {
                throw rootRecord.arg;
              }

              return this.rval;
            },
            dispatchException: function dispatchException(exception) {
              if (this.done) {
                throw exception;
              }

              var context = this;

              function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;

                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = "next";
                  context.arg = undefined$1;
                }

                return !!caught;
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;

                if (entry.tryLoc === "root") {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle("end");
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, "catchLoc");
                  var hasFinally = hasOwn.call(entry, "finallyLoc");

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error("try statement without catch or finally");
                  }
                }
              }
            },
            abrupt: function abrupt(type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                  var finallyEntry = entry;
                  break;
                }
              }

              if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }

              var record = finallyEntry ? finallyEntry.completion : {};
              record.type = type;
              record.arg = arg;

              if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
              }

              return this.complete(record);
            },
            complete: function complete(record, afterLoc) {
              if (record.type === "throw") {
                throw record.arg;
              }

              if (record.type === "break" || record.type === "continue") {
                this.next = record.arg;
              } else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
              } else if (record.type === "normal" && afterLoc) {
                this.next = afterLoc;
              }

              return ContinueSentinel;
            },
            finish: function finish(finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },
            "catch": function _catch(tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;

                  if (record.type === "throw") {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }

                  return thrown;
                }
              } // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.


              throw new Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
              };

              if (this.method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined$1;
              }

              return ContinueSentinel;
            }
          }; // Regardless of whether this script is executing as a CommonJS module
          // or not, return the runtime object so that we can declare the variable
          // regeneratorRuntime in the outer scope, which allows this module to be
          // injected easily by `bin/regenerator --include-runtime script.js`.

          return exports;
        }( // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        module.exports );

        try {
          regeneratorRuntime = runtime;
        } catch (accidentalStrictMode) {
          // This module should not be running in strict mode, so the above
          // assignment should always work unless something is misconfigured. Just
          // in case runtime.js accidentally runs in strict mode, we can escape
          // strict mode using a global Function call. This could conceivably fail
          // if a Content Security Policy forbids using Function, but in that case
          // the proper solution is to fix the accidental strict mode problem. If
          // you've misconfigured your bundler to force strict mode and applied a
          // CSP to forbid Function, and you're not willing to fix either of those
          // problems, please detail your unique predicament in a GitHub issue.
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      })(runtime);

      return runtime.exports;
    }

    var inIframe;
    var hasRequiredInIframe;

    function requireInIframe() {
      if (hasRequiredInIframe) return inIframe;
      hasRequiredInIframe = 1;
      requireRuntime(); // needed for the async function we export here

      var createFocusTrap = require$$0.createFocusTrap;

      inIframe = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var contextIframe, targetDocument, trapWrapper, focusTrap;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  contextIframe = document.getElementById('in-iframe'); // wait for iFrame DOM to completely load

                case 1:
                  if (contextIframe.contentWindow.document.getElementById('in-iframe-trap')) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 4;
                  return new Promise(function (r) {
                    return setTimeout(r, 500);
                  });

                case 4:
                  _context.next = 1;
                  break;

                case 6:
                  targetDocument = contextIframe.contentWindow.document;

                  if (targetDocument) {
                    trapWrapper = targetDocument.getElementById('in-iframe-trap');
                    focusTrap = createFocusTrap('#in-iframe-trap', {
                      document: targetDocument,
                      onActivate: function onActivate() {
                        return trapWrapper.classList.add('is-active');
                      },
                      onDeactivate: function onDeactivate() {
                        return trapWrapper.classList.remove('is-active');
                      }
                    });
                    document.getElementById('activate-in-iframe').addEventListener('click', focusTrap.activate);
                    targetDocument.getElementById('deactivate-in-iframe').addEventListener('click', focusTrap.deactivate);
                  }

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function inIframe() {
          return _ref.apply(this, arguments);
        };
      }();

      return inIframe;
    }

    var createFocusTrap$d = require$$0.createFocusTrap;

    var allowOutsideClick = function allowOutsideClick() {
      var container = document.getElementById('allowoutsideclick');
      var trigger = document.getElementById('activate-allowoutsideclick');
      var active = false;
      var allowOutsideClick = true;

      function initialize() {
        return createFocusTrap$d('#allowoutsideclick', {
          allowOutsideClick: allowOutsideClick,
          escapeDeactivates: false,
          onActivate: function onActivate() {
            return container.classList.add('is-active');
          },
          onDeactivate: function onDeactivate() {
            return container.classList.remove('is-active');
          }
        });
      }

      var focusTrap = initialize();

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
      document.getElementById('deactivate-allowoutsideclick').addEventListener('click', deactivate);
      document.getElementById('select-allowoutsideclick').addEventListener('change', function (event) {
        allowOutsideClick = {
          "boolean": true,
          "function": function _function(e) {
            if (e.target === trigger) {
              return true;
            }
          }
        }[event.target.value];
        focusTrap = initialize();
      });
    };

    var createFocusTrap$c = require$$0.createFocusTrap;

    var clickOutsideDeactivates = function clickOutsideDeactivates() {
      var container = document.getElementById('clickoutsidedeactivates');
      var trigger = document.getElementById('activate-clickoutsidedeactivates');
      var select = document.getElementById('select-clickoutsidedeactivates');
      var checkbox = document.getElementById('checkbox-clickoutsidedeactivates');
      var active = false;
      var clickOutsideDeactivates = true;
      var returnFocusOnDeactivate = true;
      var notice = document.createElement('span');
      notice.appendChild(document.createTextNode('-> Must click on checkbox to deactivate'));

      var initialize = function initialize() {
        return createFocusTrap$c('#clickoutsidedeactivates', {
          returnFocusOnDeactivate: returnFocusOnDeactivate,
          clickOutsideDeactivates: clickOutsideDeactivates,
          escapeDeactivates: false,
          onActivate: function onActivate() {
            return container.classList.add('is-active');
          },
          onDeactivate: function onDeactivate() {
            active = false;
            container.classList.remove('is-active');
          }
        });
      };

      var focusTrap = initialize();

      var activate = function activate() {
        active = true;
        focusTrap.activate();
      };

      trigger.addEventListener('click', function () {
        if (!active) {
          activate();
        }
      });
      document.getElementById('select-returnfocusondeactivate-clickoutsidedeactivates').addEventListener('change', function (event) {
        returnFocusOnDeactivate = event.target.value === 'true';
        focusTrap = initialize();
      });
      select.addEventListener('change', function (event) {
        clickOutsideDeactivates = {
          "boolean": true,
          // deactivate when click on anything
          "function": function _function(e) {
            // only deactivate when click on checkbox
            return e.target === checkbox;
          }
        }[event.target.value];

        if (event.target.value === 'function') {
          select.parentNode.append(notice);
        } else {
          select.parentNode.removeChild(notice);
        }

        focusTrap = initialize();
      });
    };

    var createFocusTrap$b = require$$0.createFocusTrap;

    var setReturnFocus = function setReturnFocus() {
      var container = document.getElementById('setreturnfocus');
      var focusTrap = createFocusTrap$b('#setreturnfocus', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        },
        setReturnFocus: '#overwritten-element'
      });
      document.getElementById('activate-setreturnfocus').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-setreturnfocus').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$a = require$$0.createFocusTrap;

    var setReturnFocusFunction = function setReturnFocusFunction() {
      var container = document.getElementById('setreturnfocus-function');
      var clickedElement;

      var isAllowedTarget = function isAllowedTarget(e) {
        return e.target.id === 'focus-this' || e.target.id === 'focus-initial' || e.target.id === 'no-focus';
      };

      var setReturnFocus = function setReturnFocus(previousActiveElement) {
        if (clickedElement && clickedElement.id === 'focus-this') {
          return clickedElement;
        } else if (clickedElement && clickedElement.id === 'focus-initial') {
          return previousActiveElement;
        }

        return false;
      };

      var focusTrap = createFocusTrap$a('#setreturnfocus-function', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        },
        setReturnFocus: setReturnFocus,
        allowOutsideClick: function allowOutsideClick(e) {
          return isAllowedTarget(e);
        }
      });

      var handleDeactivate = function handleDeactivate(e) {
        clickedElement = e.target;
        focusTrap.deactivate();
      };

      document.getElementById('activate-setreturnfocus-function').addEventListener('click', focusTrap.activate);
      document.querySelector('#deactivate-setreturnfocus-function > #focus-this').addEventListener('click', handleDeactivate);
      document.querySelector('#deactivate-setreturnfocus-function > #focus-initial').addEventListener('click', handleDeactivate);
      document.querySelector('#deactivate-setreturnfocus-function > #no-focus').addEventListener('click', handleDeactivate);
    };

    var createFocusTrap$9 = require$$0.createFocusTrap;

    var noDelay = function noDelay() {
      var container = document.getElementById('no-delay');
      var focusTrap = createFocusTrap$9(container, {
        delayInitialFocus: false,
        onActivate: function onActivate() {
          container.style.opacity = '1';
          container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          container.style.opacity = '0.2';
          container.classList.remove('is-active');
        }
      });

      var showContainer = function showContainer(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          focusTrap.activate();
        }
      };

      var hideContainer = function hideContainer() {
        focusTrap.deactivate();
      };

      document.getElementById('activate-no-delay').addEventListener('keydown', showContainer);
      document.getElementById('close-button-no-delay').addEventListener('click', hideContainer);
    };

    var createFocusTrap$8 = require$$0.createFocusTrap;

    var multipleElements = function multipleElements() {
      var container = document.getElementById('multipleelements');
      var selectors = ['#multipleelements-1', '#multipleelements-3'];
      var focusTrap = createFocusTrap$8(selectors, {
        clickOutsideDeactivates: true,
        onActivate: function onActivate() {
          container.classList.add('is-active');
          selectors.forEach(function (selector) {
            return document.querySelector(selector).className = 'is-active-nested';
          });
        },
        onDeactivate: function onDeactivate() {
          container.classList.remove('is-active');
          selectors.forEach(function (selector) {
            return document.querySelector(selector).className = null;
          });
        }
      });
      document.getElementById('activate-multipleelements').addEventListener('click', function () {
        focusTrap.activate();
      });
      document.getElementById('deactivate-multipleelements').addEventListener('click', function () {
        focusTrap.deactivate();
      });
    };

    var createFocusTrap$7 = require$$0.createFocusTrap;

    var multipleElementsDelete = function multipleElementsDelete() {
      var container = document.getElementById('multipleelements-delete');
      var selectors = ['#multipleelements-delete-1', '#multipleelements-delete-2'];
      var focusTrap = createFocusTrap$7(selectors, {
        allowOutsideClick: function allowOutsideClick(event) {
          return event.target.id === 'deactivate-multipleelements-delete';
        },
        onActivate: function onActivate() {
          container.classList.add('is-active');
          selectors.forEach(function (selector) {
            return document.querySelector(selector).className = 'is-active-nested';
          });
        },
        onDeactivate: function onDeactivate() {
          container.classList.remove('is-active');
          selectors.forEach(function (selector) {
            return document.querySelector(selector).className = null;
          });
        }
      });
      document.getElementById('activate-multipleelements-delete').addEventListener('click', function () {
        focusTrap.activate();
      });
      document.getElementById('deactivate-multipleelements-delete').addEventListener('click', function () {
        focusTrap.deactivate();
      });
      document.getElementById('multipleelements-delete-remove').addEventListener('click', function () {
        document.getElementById('multipleelements-delete-removed-node').remove();
      });
    };

    var createFocusTrap$6 = require$$0.createFocusTrap;

    var multipleElementsDeleteAll = function multipleElementsDeleteAll() {
      var container = document.getElementById('multipleelements-delete-all');
      var selectors = ['#multipleelements-delete-all-1', '#multipleelements-delete-all-2'];
      var focusTrap = createFocusTrap$6(selectors, {
        fallbackFocus: '#deactivate-multipleelements-delete-all',
        allowOutsideClick: function allowOutsideClick(event) {
          return event.target.id === 'deactivate-multipleelements-delete-all';
        },
        onActivate: function onActivate() {
          container.classList.add('is-active');
          selectors.forEach(function (selector) {
            return document.querySelector(selector).className = 'is-active-nested';
          });
        },
        onDeactivate: function onDeactivate() {
          container.classList.remove('is-active');
          selectors.forEach(function (selector) {
            return document.querySelector(selector).className = null;
          });
        }
      });
      document.getElementById('activate-multipleelements-delete-all').addEventListener('click', function () {
        focusTrap.activate();
      });
      document.getElementById('deactivate-multipleelements-delete-all').addEventListener('click', function () {
        focusTrap.deactivate();
      });
      document.getElementById('multipleelements-delete-all-remove').addEventListener('click', function (event) {
        document.getElementById('multipleelements-delete-all-removed-node').remove();
        event.target.remove();
      });
    };

    var createFocusTrap$5 = require$$0.createFocusTrap;

    var multipleElementsMultipleTraps = function multipleElementsMultipleTraps() {
      var container = document.getElementById('multipleelements-multipletraps');
      var isTrap1Active = false;
      var isTrap2Active = false;

      var onActivateTrap = function onActivateTrap() {
        container.classList.add('is-active');
      };

      var onDeactivateTrap = function onDeactivateTrap() {
        if (!isTrap1Active && !isTrap2Active) {
          container.classList.remove('is-active');
        }
      };

      var allowOutsideClick = function allowOutsideClick(e) {
        return e.target.className === 'enable-outside';
      };

      var setActive = function setActive(selectors) {
        var isActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        selectors.forEach(function (selector) {
          return document.querySelector(selector).className = isActive ? 'is-active-nested' : null;
        });
      };

      var trap1Selectors = ['#multipleelements-multipletraps-1', '#multipleelements-multipletraps-3'];
      var trap2Selectors = ['#multipleelements-multipletraps-2', '#multipleelements-multipletraps-4'];
      var focusTrap1 = createFocusTrap$5(trap1Selectors, {
        onActivate: function onActivate() {
          onActivateTrap();

          if (isTrap2Active) {
            setActive(trap2Selectors, false);
          }

          setActive(trap1Selectors);
          isTrap1Active = true;
        },
        onDeactivate: function onDeactivate() {
          setActive(trap1Selectors, false);

          if (isTrap2Active) {
            setActive(trap2Selectors);
          }

          isTrap1Active = false;
          onDeactivateTrap();
        },
        allowOutsideClick: allowOutsideClick
      });
      var focusTrap2 = createFocusTrap$5(trap2Selectors, {
        onActivate: function onActivate() {
          onActivateTrap();

          if (isTrap1Active) {
            setActive(trap1Selectors, false);
          }

          setActive(trap2Selectors);
          isTrap2Active = true;
        },
        onDeactivate: function onDeactivate() {
          setActive(trap2Selectors, false);

          if (isTrap1Active) {
            setActive(trap1Selectors);
          }

          isTrap2Active = false;
          onDeactivateTrap();
        },
        allowOutsideClick: allowOutsideClick
      });
      document.getElementById('activate-multipleelements-multipletraps-1').addEventListener('click', function () {
        focusTrap1.activate();
      });
      document.getElementById('deactivate-multipleelements-multipletraps-1').addEventListener('click', function () {
        focusTrap1.deactivate();
      });
      document.getElementById('activate-multipleelements-multipletraps-2').addEventListener('click', function () {
        focusTrap2.activate();
      });
      document.getElementById('deactivate-multipleelements-multipletraps-2').addEventListener('click', function () {
        focusTrap2.deactivate();
      });
    };

    var createFocusTrap$4 = require$$0.createFocusTrap;

    var inOpenShadowDom = function inOpenShadowDom() {
      var FocusTrapModal = /*#__PURE__*/function (_HTMLElement) {
        _inherits(FocusTrapModal, _HTMLElement);

        var _super = _createSuper(FocusTrapModal);

        function FocusTrapModal() {
          var _this;

          _classCallCheck(this, FocusTrapModal);

          _this = _super.call(this);
          _this.id = 'in-open-shadow-dom-host';
          var modalEl = document.createElement('div');
          modalEl.id = 'in-open-shadow-dom-trap';
          modalEl.className = 'trap';
          modalEl.innerHTML = "\n        <p>\n          Here is a focus trap in an open Shadow DOM\n          <a href=\"#\">with</a> <a href=\"#\">some</a> <a href=\"#\">focusable</a> parts.\n        </p>\n        <p>\n          <button id=\"deactivate-in-open-shadow-dom\" aria-describedby=\"in-open-shadow-dom-heading\">\n            deactivate trap\n          </button>\n        </p>\n      "; // use same styles as host

          var styleLinkEl = document.createElement('link');
          styleLinkEl.setAttribute('rel', 'stylesheet');
          styleLinkEl.setAttribute('href', 'style.css');

          var shadowEl = _this.attachShadow({
            mode: 'open'
          });

          shadowEl.appendChild(styleLinkEl);
          shadowEl.appendChild(modalEl);
          var focusTrap = createFocusTrap$4(modalEl, {
            onActivate: function onActivate() {
              return modalEl.classList.add('is-active');
            },
            onDeactivate: function onDeactivate() {
              return modalEl.classList.remove('is-active');
            },
            escapeDeactivates: true
          });
          document.getElementById('activate-in-open-shadow-dom').addEventListener('click', focusTrap.activate);
          modalEl.querySelector('#deactivate-in-open-shadow-dom').addEventListener('click', focusTrap.deactivate);
          return _this;
        }

        return _createClass(FocusTrapModal);
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

      customElements.define('focus-trap-modal', FocusTrapModal);
    };

    var createFocusTrap$3 = require$$0.createFocusTrap;

    var withShadowDom = function withShadowDom() {
      var OpenShadowTest = /*#__PURE__*/function (_HTMLElement) {
        _inherits(OpenShadowTest, _HTMLElement);

        var _super = _createSuper(OpenShadowTest);

        function OpenShadowTest() {
          var _this;

          _classCallCheck(this, OpenShadowTest);

          _this = _super.call(this);
          _this.id = 'with-shadow-dom-open-host';
          var containerEl = document.createElement('div');
          containerEl.id = 'with-shadow-dom-open-container';
          containerEl.style = 'border: 1px dotted black; padding: 10px;';
          containerEl.innerHTML = "\n        <p style=\"margin-top: 0; padding-top: 0;\">\n          This field is inside an <strong>open</strong> Shadow DOM:\n        </p>\n        <input id=\"input\" type=\"text\" />\n      "; // use same styles as host

          var styleLinkEl = document.createElement('link');
          styleLinkEl.setAttribute('rel', 'stylesheet');
          styleLinkEl.setAttribute('href', 'style.css');

          var shadowEl = _this.attachShadow({
            mode: 'open'
          });

          shadowEl.appendChild(styleLinkEl);
          shadowEl.appendChild(containerEl);
          return _this;
        }

        return _createClass(OpenShadowTest);
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

      var createClosedShadow = function createClosedShadow(hostEl) {
        var containerEl = document.createElement('div');
        containerEl.id = 'with-shadow-dom-closed-container';
        containerEl.style = 'border: 1px dotted black; margin-top: 10px; padding: 10px; background-color: rgba(0, 0, 0, 0.05);';
        containerEl.innerHTML = "\n      <p style=\"margin-top: 0; padding-top: 0;\">\n        This field is inside a <strong>closed</strong> Shadow DOM:\n      </p>\n      <label><input id=\"check\" type=\"checkbox\" /> Checkbox</label>\n    "; // use same styles as host

        var styleLinkEl = document.createElement('link');
        styleLinkEl.setAttribute('rel', 'stylesheet');
        styleLinkEl.setAttribute('href', 'style.css');
        var shadowEl = hostEl.attachShadow({
          mode: 'closed'
        });
        shadowEl.appendChild(styleLinkEl);
        shadowEl.appendChild(containerEl);
        return shadowEl;
      }; // open shadow used for a web component; tabbable will just find it on its own
      //  because it's open


      customElements.define('open-shadow-test', OpenShadowTest); // for the closed shadow, we need a reference to the closed shadow root, so a
      //  web component doesn't work well because we wouldn't have a way of getting
      //  the shadow; attaching a closed shadow to an existing element works better
      //  for this demo since we get the shadow root and can give it to tabbable
      //  when it requests it

      var closedShadowHostEl = document.getElementById('with-shadow-dom-closed-shadow');
      var closedShadowEl = createClosedShadow(closedShadowHostEl);
      var containerEl = document.getElementById('with-shadow-dom');
      var focusTrap = createFocusTrap$3('#with-shadow-dom', {
        onActivate: function onActivate() {
          return containerEl.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return containerEl.classList.remove('is-active');
        },
        tabbableOptions: {
          getShadowRoot: function getShadowRoot(node) {
            if (node === closedShadowHostEl) {
              return closedShadowEl;
            }
          }
        }
      });
      document.getElementById('activate-with-shadow-dom').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-with-shadow-dom').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$2 = require$$0.createFocusTrap;

    var negativeTabindex = function negativeTabindex() {
      var container = document.getElementById('negative-tabindex');
      var focusTrap = createFocusTrap$2('#negative-tabindex', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-negative-tabindex').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-negative-tabindex').addEventListener('click', focusTrap.deactivate);
    };

    var createFocusTrap$1 = require$$0.createFocusTrap;

    var negativeTabindexLast = function negativeTabindexLast() {
      var container = document.getElementById('negative-tabindex-last');
      var focusTrap = createFocusTrap$1('#negative-tabindex-last', {
        onActivate: function onActivate() {
          return container.classList.add('is-active');
        },
        onDeactivate: function onDeactivate() {
          return container.classList.remove('is-active');
        }
      });
      document.getElementById('activate-negative-tabindex-last').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-negative-tabindex-last').addEventListener('click', focusTrap.deactivate);
    };

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
          getShadowRoot: true
        }
      });
      document.getElementById('activate-with-open-web-component').addEventListener('click', focusTrap.activate);
      document.getElementById('deactivate-with-open-web-component').addEventListener('click', focusTrap.deactivate);
    };

    _default();
    animatedDialog();
    animatedTrigger();
    escapeDeactivates();
    initialElementNoEscape();
    initiallyFocusedContainer();
    hiddenTreasures();
    nested();
    sibling();
    trickyInitialFocus();
    inputActivation();
    delay();
    radio();
    iframe(); // loading this in a Cypress env causes Chrome to fail in GitHub CI (even with
    //  the `"chromeWebSecurity": false` option set in the cypress.json config file),
    //  and causes FireFox to fail both locally and in CI due to security context
    //  violations; but it's still a good demo to have, and at least we can test
    //  it manually
    // eslint-disable-next-line no-undef -- process is defined via Rollup

    if (!process.env.IS_CYPRESS_ENV) {
      requireInIframe()();
    }

    allowOutsideClick();
    clickOutsideDeactivates();
    setReturnFocus();
    setReturnFocusFunction();
    noDelay();
    multipleElements();
    multipleElementsDelete();
    multipleElementsDeleteAll();
    multipleElementsMultipleTraps();
    inOpenShadowDom();
    withShadowDom(); // TEST MANUALLY (Cypress doesn't support Shadow DOM well)

    negativeTabindex();
    negativeTabindexLast();
    withOpenWebComponent(); // TEST MANUALLY (Cypress doesn't support Shadow DOM well)

    return js;

})();
//# sourceMappingURL=demo-bundle.js.map
