/*!
* focus-trap demo bundle
*/
var focusTrapDemoBundle = (function () {
	'use strict';

	function getAugmentedNamespace(n) {
	  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				var isInstance = false;
	      try {
	        isInstance = this instanceof a;
	      } catch {}
				if (isInstance) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
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

	function _arrayLikeToArray(r, a) {
	  (null == a || a > r.length) && (a = r.length);
	  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	  return n;
	}
	function _arrayWithoutHoles(r) {
	  if (Array.isArray(r)) return _arrayLikeToArray(r);
	}
	function _assertThisInitialized(e) {
	  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  return e;
	}
	function asyncGeneratorStep(n, t, e, r, o, a, c) {
	  try {
	    var i = n[a](c),
	      u = i.value;
	  } catch (n) {
	    return void e(n);
	  }
	  i.done ? t(u) : Promise.resolve(u).then(r, o);
	}
	function _asyncToGenerator(n) {
	  return function () {
	    var t = this,
	      e = arguments;
	    return new Promise(function (r, o) {
	      var a = n.apply(t, e);
	      function _next(n) {
	        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
	      }
	      function _throw(n) {
	        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
	      }
	      _next(void 0);
	    });
	  };
	}
	function _callSuper(t, o, e) {
	  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
	}
	function _classCallCheck(a, n) {
	  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _construct(t, e, r) {
	  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
	  var o = [null];
	  o.push.apply(o, e);
	  var p = new (t.bind.apply(t, o))();
	  return r && _setPrototypeOf(p, r.prototype), p;
	}
	function _defineProperties(e, r) {
	  for (var t = 0; t < r.length; t++) {
	    var o = r[t];
	    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
	  }
	}
	function _createClass(e, r, t) {
	  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
	    writable: false
	  }), e;
	}
	function _createForOfIteratorHelper(r, e) {
	  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (!t) {
	    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
	      t && (r = t);
	      var n = 0,
	        F = function () {};
	      return {
	        s: F,
	        n: function () {
	          return n >= r.length ? {
	            done: true
	          } : {
	            done: false,
	            value: r[n++]
	          };
	        },
	        e: function (r) {
	          throw r;
	        },
	        f: F
	      };
	    }
	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }
	  var o,
	    a = true,
	    u = false;
	  return {
	    s: function () {
	      t = t.call(r);
	    },
	    n: function () {
	      var r = t.next();
	      return a = r.done, r;
	    },
	    e: function (r) {
	      u = true, o = r;
	    },
	    f: function () {
	      try {
	        a || null == t.return || t.return();
	      } finally {
	        if (u) throw o;
	      }
	    }
	  };
	}
	function _defineProperty(e, r, t) {
	  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
	    value: t,
	    enumerable: true,
	    configurable: true,
	    writable: true
	  }) : e[r] = t, e;
	}
	function _getPrototypeOf(t) {
	  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
	    return t.__proto__ || Object.getPrototypeOf(t);
	  }, _getPrototypeOf(t);
	}
	function _inherits(t, e) {
	  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	  t.prototype = Object.create(e && e.prototype, {
	    constructor: {
	      value: t,
	      writable: true,
	      configurable: true
	    }
	  }), Object.defineProperty(t, "prototype", {
	    writable: false
	  }), e && _setPrototypeOf(t, e);
	}
	function _isNativeFunction(t) {
	  try {
	    return -1 !== Function.toString.call(t).indexOf("[native code]");
	  } catch (n) {
	    return "function" == typeof t;
	  }
	}
	function _isNativeReflectConstruct() {
	  try {
	    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	  } catch (t) {}
	  return (_isNativeReflectConstruct = function () {
	    return !!t;
	  })();
	}
	function _iterableToArray(r) {
	  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function ownKeys(e, r) {
	  var t = Object.keys(e);
	  if (Object.getOwnPropertySymbols) {
	    var o = Object.getOwnPropertySymbols(e);
	    r && (o = o.filter(function (r) {
	      return Object.getOwnPropertyDescriptor(e, r).enumerable;
	    })), t.push.apply(t, o);
	  }
	  return t;
	}
	function _objectSpread2(e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var t = null != arguments[r] ? arguments[r] : {};
	    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
	      _defineProperty(e, r, t[r]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
	      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
	    });
	  }
	  return e;
	}
	function _possibleConstructorReturn(t, e) {
	  if (e && ("object" == typeof e || "function" == typeof e)) return e;
	  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	  return _assertThisInitialized(t);
	}
	function _regenerator() {
	  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	  var e,
	    t,
	    r = "function" == typeof Symbol ? Symbol : {},
	    n = r.iterator || "@@iterator",
	    o = r.toStringTag || "@@toStringTag";
	  function i(r, n, o, i) {
	    var c = n && n.prototype instanceof Generator ? n : Generator,
	      u = Object.create(c.prototype);
	    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
	      var i,
	        c,
	        u,
	        f = 0,
	        p = o || [],
	        y = false,
	        G = {
	          p: 0,
	          n: 0,
	          v: e,
	          a: d,
	          f: d.bind(e, 4),
	          d: function (t, r) {
	            return i = t, c = 0, u = e, G.n = r, a;
	          }
	        };
	      function d(r, n) {
	        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
	          var o,
	            i = p[t],
	            d = G.p,
	            l = i[2];
	          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
	        }
	        if (o || r > 1) return a;
	        throw y = true, n;
	      }
	      return function (o, p, l) {
	        if (f > 1) throw TypeError("Generator is already running");
	        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
	          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
	          try {
	            if (f = 2, i) {
	              if (c || (o = "next"), t = i[o]) {
	                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
	                if (!t.done) return t;
	                u = t.value, c < 2 && (c = 0);
	              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
	              i = e;
	            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
	          } catch (t) {
	            i = e, c = 1, u = t;
	          } finally {
	            f = 1;
	          }
	        }
	        return {
	          value: t,
	          done: y
	        };
	      };
	    }(r, o, i), true), u;
	  }
	  var a = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  t = Object.getPrototypeOf;
	  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
	      return this;
	    }), t),
	    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
	  function f(e) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
	    return this;
	  }), _regeneratorDefine(u, "toString", function () {
	    return "[object Generator]";
	  }), (_regenerator = function () {
	    return {
	      w: i,
	      m: f
	    };
	  })();
	}
	function _regeneratorDefine(e, r, n, t) {
	  var i = Object.defineProperty;
	  try {
	    i({}, "", {});
	  } catch (e) {
	    i = 0;
	  }
	  _regeneratorDefine = function (e, r, n, t) {
	    function o(r, n) {
	      _regeneratorDefine(e, r, function (e) {
	        return this._invoke(r, n, e);
	      });
	    }
	    r ? i ? i(e, r, {
	      value: n,
	      enumerable: !t,
	      configurable: !t,
	      writable: !t
	    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
	  }, _regeneratorDefine(e, r, n, t);
	}
	function _setPrototypeOf(t, e) {
	  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
	    return t.__proto__ = e, t;
	  }, _setPrototypeOf(t, e);
	}
	function _toConsumableArray(r) {
	  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r);
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (String )(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : i + "";
	}
	function _unsupportedIterableToArray(r, a) {
	  if (r) {
	    if ("string" == typeof r) return _arrayLikeToArray(r, a);
	    var t = {}.toString.call(r).slice(8, -1);
	    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	  }
	}
	function _wrapNativeSuper(t) {
	  var r = "function" == typeof Map ? new Map() : void 0;
	  return _wrapNativeSuper = function (t) {
	    if (null === t || !_isNativeFunction(t)) return t;
	    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
	    if (void 0 !== r) {
	      if (r.has(t)) return r.get(t);
	      r.set(t, Wrapper);
	    }
	    function Wrapper() {
	      return _construct(t, arguments, _getPrototypeOf(this).constructor);
	    }
	    return Wrapper.prototype = Object.create(t.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    }), _setPrototypeOf(Wrapper, t);
	  }, _wrapNativeSuper(t);
	}

	/*!
	* tabbable 6.3.0
	* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
	*/
	// NOTE: separate `:not()` selectors has broader browser support than the newer
	//  `:not([inert], [inert] *)` (Feb 2023)
	// CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
	//  the entire query to fail, resulting in no nodes found, which will break a lot
	//  of things... so we have to rely on JS to identify nodes inside an inert container
	var candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])'];
	var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
	var NoElement = typeof Element === 'undefined';
	var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
	  var _element$getRootNode;
	  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
	} : function (element) {
	  return element === null || element === void 0 ? void 0 : element.ownerDocument;
	};

	/**
	 * Determines if a node is inert or in an inert ancestor.
	 * @param {Element} [node]
	 * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
	 *  see if any of them are inert. If false, only `node` itself is considered.
	 * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
	 *  False if `node` is falsy.
	 */
	var _isInert = function isInert(node, lookUp) {
	  var _node$getAttribute;
	  if (lookUp === void 0) {
	    lookUp = true;
	  }
	  // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
	  //  JS API property; we have to check the attribute, which can either be empty or 'true';
	  //  if it's `null` (not specified) or 'false', it's an active element
	  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
	  var inert = inertAtt === '' || inertAtt === 'true';

	  // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
	  //  if it weren't for `matches()` not being a function on shadow roots; the following
	  //  code works for any kind of node
	  // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
	  //  so it likely would not support `:is([inert] *)` either...
	  var result = inert || lookUp && node && _isInert(node.parentNode); // recursive

	  return result;
	};

	/**
	 * Determines if a node's content is editable.
	 * @param {Element} [node]
	 * @returns True if it's content-editable; false if it's not or `node` is falsy.
	 */
	var isContentEditable = function isContentEditable(node) {
	  var _node$getAttribute2;
	  // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
	  //  to use the attribute directly to check for this, which can either be empty or 'true';
	  //  if it's `null` (not specified) or 'false', it's a non-editable element
	  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
	  return attValue === '' || attValue === 'true';
	};

	/**
	 * @param {Element} el container to check in
	 * @param {boolean} includeContainer add container to check
	 * @param {(node: Element) => boolean} filter filter candidates
	 * @returns {Element[]}
	 */
	var getCandidates = function getCandidates(el, includeContainer, filter) {
	  // even if `includeContainer=false`, we still have to check it for inertness because
	  //  if it's inert, all its children are inert
	  if (_isInert(el)) {
	    return [];
	  }
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
	 * @callback ShadowRootFilter
	 * @param {Element} shadowHostNode the element which contains shadow content
	 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
	 */

	/**
	 * @typedef {Object} CandidateScope
	 * @property {Element} scopeParent contains inner candidates
	 * @property {Element[]} candidates list of candidates found in the scope parent
	 */

	/**
	 * @typedef {Object} IterativeOptions
	 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
	 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
	 *  or a boolean stating if it has an undisclosed shadow root
	 * @property {(node: Element) => boolean} filter filter candidates
	 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
	 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
	 */

	/**
	 * @param {Element[]} elements list of element containers to match candidates from
	 * @param {boolean} includeContainer add container list to check
	 * @param {IterativeOptions} options
	 * @returns {Array.<Element|CandidateScope>}
	 */
	var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
	  var candidates = [];
	  var elementsToCheck = Array.from(elements);
	  while (elementsToCheck.length) {
	    var element = elementsToCheck.shift();
	    if (_isInert(element, false)) {
	      // no need to look up since we're drilling down
	      // anything inside this container will also be inert
	      continue;
	    }
	    if (element.tagName === 'SLOT') {
	      // add shadow dom slot scope (slot itself cannot be focusable)
	      var assigned = element.assignedElements();
	      var content = assigned.length ? assigned : element.children;
	      var nestedCandidates = _getCandidatesIteratively(content, true, options);
	      if (options.flatten) {
	        candidates.push.apply(candidates, nestedCandidates);
	      } else {
	        candidates.push({
	          scopeParent: element,
	          candidates: nestedCandidates
	        });
	      }
	    } else {
	      // check candidate element
	      var validCandidate = matches.call(element, candidateSelector);
	      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
	        candidates.push(element);
	      }

	      // iterate over shadow content if possible
	      var shadowRoot = element.shadowRoot ||
	      // check for an undisclosed shadow
	      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

	      // no inert look up because we're already drilling down and checking for inertness
	      //  on the way down, so all containers to this root node should have already been
	      //  vetted as non-inert
	      var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
	      if (shadowRoot && validShadowRoot) {
	        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
	        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
	        //  child candidates found because they're likely slotted elements (elements that are
	        //  children of the web component element (which has the shadow), in the light dom, but
	        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
	        //  _after_ we return from this recursive call
	        var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
	        if (options.flatten) {
	          candidates.push.apply(candidates, _nestedCandidates);
	        } else {
	          candidates.push({
	            scopeParent: element,
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

	/**
	 * @private
	 * Determines if the node has an explicitly specified `tabindex` attribute.
	 * @param {HTMLElement} node
	 * @returns {boolean} True if so; false if not.
	 */
	var hasTabIndex = function hasTabIndex(node) {
	  return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
	};

	/**
	 * Determine the tab index of a given node.
	 * @param {HTMLElement} node
	 * @returns {number} Tab order (negative, 0, or positive number).
	 * @throws {Error} If `node` is falsy.
	 */
	var getTabIndex = function getTabIndex(node) {
	  if (!node) {
	    throw new Error('No node provided');
	  }
	  if (node.tabIndex < 0) {
	    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
	    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
	    // yet they are still part of the regular tab order; in FF, they get a default
	    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
	    // order, consider their tab index to be 0.
	    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
	    // so if they don't have a tabindex attribute specifically set, assume it's 0.
	    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
	      return 0;
	    }
	  }
	  return node.tabIndex;
	};

	/**
	 * Determine the tab index of a given node __for sort order purposes__.
	 * @param {HTMLElement} node
	 * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
	 *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
	 *  inserted into the correct sort position.
	 * @returns {number} Tab order (negative, 0, or positive number).
	 */
	var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
	  var tabIndex = getTabIndex(node);
	  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
	    return 0;
	  }
	  return tabIndex;
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

	// determines if a node is ultimately attached to the window's document
	var isNodeAttached = function isNodeAttached(node) {
	  var _nodeRoot;
	  // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
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
	  // To further complicate things, we have to look all the way up until we find a shadow HOST
	  //  that is attached (or find none) because the node might be in nested shadows...
	  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
	  //  document (per the docs) and while it's a Document-type object, that document does not
	  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
	  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
	  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
	  //  node is actually detached.
	  // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
	  //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
	  //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
	  //  `ownerDocument` will be `null`, hence the optional chaining on it.
	  var nodeRoot = node && getRootNode(node);
	  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;

	  // in some cases, a detached node will return itself as the root instead of a document or
	  //  shadow root object, in which case, we shouldn't try to look further up the host chain
	  var attached = false;
	  if (nodeRoot && nodeRoot !== node) {
	    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
	    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
	    while (!attached && nodeRootHost) {
	      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
	      // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
	      //  which means we need to get the host's host and check if that parent host is contained
	      //  in (i.e. attached to) the document
	      nodeRoot = getRootNode(nodeRootHost);
	      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
	      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
	    }
	  }
	  return attached;
	};
	var isZeroArea = function isZeroArea(node) {
	  var _node$getBoundingClie = node.getBoundingClientRect(),
	    width = _node$getBoundingClie.width,
	    height = _node$getBoundingClie.height;
	  return width === 0 && height === 0;
	};
	var isHidden = function isHidden(node, _ref) {
	  var displayCheck = _ref.displayCheck,
	    getShadowRoot = _ref.getShadowRoot;
	  if (displayCheck === 'full-native') {
	    if ('checkVisibility' in node) {
	      // Chrome >= 105, Edge >= 105, Firefox >= 106, Safari >= 17.4
	      // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#browser_compatibility
	      var visible = node.checkVisibility({
	        // Checking opacity might be desirable for some use cases, but natively,
	        // opacity zero elements _are_ focusable and tabbable.
	        checkOpacity: false,
	        opacityProperty: false,
	        contentVisibilityAuto: true,
	        visibilityProperty: true,
	        // This is an alias for `visibilityProperty`. Contemporary browsers
	        // support both. However, this alias has wider browser support (Chrome
	        // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
	        // we include it anyway.
	        checkVisibilityCSS: true
	      });
	      return !visible;
	    }
	    // Fall through to manual visibility checks
	  }

	  // NOTE: visibility will be `undefined` if node is detached from the document
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
	  }
	  if (!displayCheck || displayCheck === 'full' ||
	  // full-native can run this branch when it falls through in case
	  // Element#checkVisibility is unsupported
	  displayCheck === 'full-native' || displayCheck === 'legacy-full') {
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
	    }
	    // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
	    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
	    //  it might be a falsy value, which means shadow DOM support is disabled

	    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
	    //  now we can just test to see if it would normally be visible or not, provided it's
	    //  attached to the main document.
	    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
	    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

	    if (isNodeAttached(node)) {
	      // this works wherever the node is: if there's at least one client rect, it's
	      //  somehow displayed; it also covers the CSS 'display: contents' case where the
	      //  node itself is hidden in place of its contents; and there's no need to search
	      //  up the hierarchy either
	      return !node.getClientRects().length;
	    }

	    // Else, the node isn't attached to the document, which means the `getClientRects()`
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
	    //
	    // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
	    //  nodes as visible with the 'none' fallback.__
	    if (displayCheck !== 'legacy-full') {
	      return true; // hidden
	    }
	    // else, fallback to 'none' mode and consider the node visible
	  } else if (displayCheck === 'non-zero-area') {
	    // NOTE: Even though this tests that the node's client rect is non-zero to determine
	    //  whether it's displayed, and that a detached node will __always__ have a zero-area
	    //  client rect, we don't special-case for whether the node is attached or not. In
	    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
	    //  times, and that includes attached or not.
	    return isZeroArea(node);
	  }

	  // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
	  //  it's visible
	  return false;
	};

	// form fields (nested) inside a disabled fieldset are not focusable/tabbable
	//  unless they are in the _first_ <legend> element of the top-most disabled
	//  fieldset
	var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
	  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
	    var parentNode = node.parentElement;
	    // check if `node` is contained in a disabled <fieldset>
	    while (parentNode) {
	      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
	        // look for the first <legend> among the children of the disabled <fieldset>
	        for (var i = 0; i < parentNode.children.length; i++) {
	          var child = parentNode.children.item(i);
	          // when the first <legend> (in document order) is found
	          if (child.tagName === 'LEGEND') {
	            // if its parent <fieldset> is not nested in another disabled <fieldset>,
	            // return whether `node` is a descendant of its first <legend>
	            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
	          }
	        }
	        // the disabled <fieldset> containing `node` has no <legend>
	        return true;
	      }
	      parentNode = parentNode.parentElement;
	    }
	  }

	  // else, node's tabbable/focusable state should not be affected by a fieldset's
	  //  enabled/disabled state
	  return false;
	};
	var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
	  if (node.disabled ||
	  // we must do an inert look up to filter out any elements inside an inert ancestor
	  //  because we're limited in the type of selectors we can use in JSDom (see related
	  //  note related to `candidateSelectors`)
	  _isInert(node) || isHiddenInput(node) || isHidden(node, options) ||
	  // For a details element with a summary, the summary element gets the focus
	  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
	    return false;
	  }
	  return true;
	};
	var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
	  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
	    return false;
	  }
	  return true;
	};
	var isShadowRootTabbable = function isShadowRootTabbable(shadowHostNode) {
	  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
	  if (isNaN(tabIndex) || tabIndex >= 0) {
	    return true;
	  }
	  // If a custom element has an explicit negative tabindex,
	  // browsers will not allow tab targeting said element's children.
	  return false;
	};

	/**
	 * @param {Array.<Element|CandidateScope>} candidates
	 * @returns Element[]
	 */
	var _sortByOrder = function sortByOrder(candidates) {
	  var regularTabbables = [];
	  var orderedTabbables = [];
	  candidates.forEach(function (item, i) {
	    var isScope = !!item.scopeParent;
	    var element = isScope ? item.scopeParent : item;
	    var candidateTabindex = getSortOrderTabIndex(element, isScope);
	    var elements = isScope ? _sortByOrder(item.candidates) : element;
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
	var tabbable = function tabbable(container, options) {
	  options = options || {};
	  var candidates;
	  if (options.getShadowRoot) {
	    candidates = _getCandidatesIteratively([container], options.includeContainer, {
	      filter: isNodeMatchingSelectorTabbable.bind(null, options),
	      flatten: false,
	      getShadowRoot: options.getShadowRoot,
	      shadowRootFilter: isShadowRootTabbable
	    });
	  } else {
	    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
	  }
	  return _sortByOrder(candidates);
	};
	var focusable = function focusable(container, options) {
	  options = options || {};
	  var candidates;
	  if (options.getShadowRoot) {
	    candidates = _getCandidatesIteratively([container], options.includeContainer, {
	      filter: isNodeMatchingSelectorFocusable.bind(null, options),
	      flatten: true,
	      getShadowRoot: options.getShadowRoot
	    });
	  } else {
	    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
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

	var activeFocusTraps = {
	  // Returns the trap from the top of the stack.
	  getActiveTrap: function getActiveTrap(trapStack) {
	    if ((trapStack === null || trapStack === void 0 ? void 0 : trapStack.length) > 0) {
	      return trapStack[trapStack.length - 1];
	    }
	    return null;
	  },
	  // Pauses the currently active trap, then adds a new trap to the stack.
	  activateTrap: function activateTrap(trapStack, trap) {
	    var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
	    if (trap !== activeTrap) {
	      activeFocusTraps.pauseTrap(trapStack);
	    }
	    var trapIndex = trapStack.indexOf(trap);
	    if (trapIndex === -1) {
	      trapStack.push(trap);
	    } else {
	      // move this existing trap to the front of the queue
	      trapStack.splice(trapIndex, 1);
	      trapStack.push(trap);
	    }
	  },
	  // Removes the trap from the top of the stack, then unpauses the next trap down.
	  deactivateTrap: function deactivateTrap(trapStack, trap) {
	    var trapIndex = trapStack.indexOf(trap);
	    if (trapIndex !== -1) {
	      trapStack.splice(trapIndex, 1);
	    }
	    activeFocusTraps.unpauseTrap(trapStack);
	  },
	  // Pauses the trap at the top of the stack.
	  pauseTrap: function pauseTrap(trapStack) {
	    var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
	    activeTrap === null || activeTrap === void 0 || activeTrap._setPausedState(true);
	  },
	  // Unpauses the trap at the top of the stack.
	  unpauseTrap: function unpauseTrap(trapStack) {
	    var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
	    if (activeTrap && !activeTrap._isManuallyPaused()) {
	      activeTrap._setPausedState(false);
	    }
	  }
	};
	var isSelectableInput = function isSelectableInput(node) {
	  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
	};
	var isEscapeEvent = function isEscapeEvent(e) {
	  return (e === null || e === void 0 ? void 0 : e.key) === 'Escape' || (e === null || e === void 0 ? void 0 : e.key) === 'Esc' || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
	};
	var isTabEvent = function isTabEvent(e) {
	  return (e === null || e === void 0 ? void 0 : e.key) === 'Tab' || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
	};

	// checks for TAB by default
	var isKeyForward = function isKeyForward(e) {
	  return isTabEvent(e) && !e.shiftKey;
	};

	// checks for SHIFT+TAB by default
	var isKeyBackward = function isKeyBackward(e) {
	  return isTabEvent(e) && e.shiftKey;
	};
	var delay$1 = function delay(fn) {
	  return setTimeout(fn, 0);
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

	// NOTE: this must be _outside_ `createFocusTrap()` to make sure all traps in this
	//  current instance use the same stack if `userOptions.trapStack` isn't specified
	var internalTrapStack = [];
	var createFocusTrap$D = function createFocusTrap(elements, userOptions) {
	  // SSR: a live trap shouldn't be created in this type of environment so this
	  //  should be safe code to execute if the `document` option isn't specified
	  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
	  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
	  var config = _objectSpread2({
	    returnFocusOnDeactivate: true,
	    escapeDeactivates: true,
	    delayInitialFocus: true,
	    isolateSubtrees: false,
	    isKeyForward: isKeyForward,
	    isKeyBackward: isKeyBackward
	  }, userOptions);
	  var state = {
	    // containers given to createFocusTrap()
	    /** @type {Array<HTMLElement>} */
	    containers: [],
	    // list of objects identifying tabbable nodes in `containers` in the trap
	    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
	    //  is active, but the trap should never get to a state where there isn't at least one group
	    //  with at least one tabbable node in it (that would lead to an error condition that would
	    //  result in an error being thrown)
	    /** @type {Array<{
	     *    container: HTMLElement,
	     *    tabbableNodes: Array<HTMLElement>, // empty if none
	     *    focusableNodes: Array<HTMLElement>, // empty if none
	     *    posTabIndexesFound: boolean,
	     *    firstTabbableNode: HTMLElement|undefined,
	     *    lastTabbableNode: HTMLElement|undefined,
	     *    firstDomTabbableNode: HTMLElement|undefined,
	     *    lastDomTabbableNode: HTMLElement|undefined,
	     *    nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
	     *  }>}
	     */
	    containerGroups: [],
	    // same order/length as `containers` list

	    // references to objects in `containerGroups`, but only those that actually have
	    //  tabbable nodes in them
	    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
	    //  the same length
	    tabbableGroups: [],
	    // references to nodes that are siblings to the ancestors of this trap's containers.
	    /** @type {Set<HTMLElement>} */
	    adjacentElements: new Set(),
	    // references to nodes that were inert or aria-hidden before the trap was activated.
	    /** @type {Set<HTMLElement>} */
	    alreadySilent: new Set(),
	    nodeFocusedBeforeActivation: null,
	    mostRecentlyFocusedNode: null,
	    active: false,
	    paused: false,
	    manuallyPaused: false,
	    // timer ID for when delayInitialFocus is true and initial focus in this trap
	    //  has been delayed during activation
	    delayInitialFocusTimer: undefined,
	    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
	    recentNavEvent: undefined
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
	   * @param {Event} [event] If available, and `element` isn't directly found in any container,
	   *  the event's composed path is used to see if includes any known trap containers in the
	   *  case where the element is inside a Shadow DOM.
	   * @returns {number} Index of the container in either `state.containers` or
	   *  `state.containerGroups` (the order/length of these lists are the same); -1
	   *  if the element isn't found.
	   */
	  var findContainerIndex = function findContainerIndex(element, event) {
	    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : undefined;
	    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
	    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
	    //  and we still need to find the element in there
	    return state.containerGroups.findIndex(function (_ref) {
	      var container = _ref.container,
	        tabbableNodes = _ref.tabbableNodes;
	      return container.contains(element) || (// fall back to explicit tabbable search which will take into consideration any
	      //  web components if the `tabbableOptions.getShadowRoot` option was used for
	      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
	      //  look inside web components even if open)
	      composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function (node) {
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
	   * @param {Object} options
	   * @param {boolean} [options.hasFallback] True if the option could be a selector string
	   *  and the option allows for a fallback scenario in the case where the selector is
	   *  valid but does not match a node (i.e. the queried node doesn't exist in the DOM).
	   * @param {Array} [options.params] Params to pass to the option if it's a function.
	   * @returns {undefined | null | false | HTMLElement | SVGElement} Returns
	   *  `undefined` if the option is not specified; `null` if the option didn't resolve
	   *  to a node but `options.hasFallback=true`, `false` if the option resolved to `false`
	   *  (node explicitly not given); otherwise, the resolved DOM node.
	   * @throws {Error} If the option is set, not `false`, and is not, or does not
	   *  resolve to a node, unless the option is a selector string and `options.hasFallback=true`.
	   */
	  var getNodeForOption = function getNodeForOption(optionName) {
	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref2$hasFallback = _ref2.hasFallback,
	      hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback,
	      _ref2$params = _ref2.params,
	      params = _ref2$params === void 0 ? [] : _ref2$params;
	    var optionValue = config[optionName];
	    if (typeof optionValue === 'function') {
	      optionValue = optionValue.apply(void 0, _toConsumableArray(params));
	    }
	    if (optionValue === true) {
	      optionValue = undefined; // use default value
	    }
	    if (!optionValue) {
	      if (optionValue === undefined || optionValue === false) {
	        return optionValue;
	      }
	      // else, empty string (invalid), null (invalid), 0 (invalid)

	      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
	    }
	    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

	    if (typeof optionValue === 'string') {
	      try {
	        node = doc.querySelector(optionValue); // resolve to node, or null if fails
	      } catch (err) {
	        throw new Error("`".concat(optionName, "` appears to be an invalid selector; error=\"").concat(err.message, "\""));
	      }
	      if (!node) {
	        if (!hasFallback) {
	          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
	        }
	        // else, `node` MUST be `null` because that's what `Document.querySelector()` returns
	        //  if the selector is valid but doesn't match anything
	      }
	    }
	    return node;
	  };
	  var getInitialFocusNode = function getInitialFocusNode() {
	    var node = getNodeForOption('initialFocus', {
	      hasFallback: true
	    });

	    // false explicitly indicates we want no initialFocus at all
	    if (node === false) {
	      return false;
	    }
	    if (node === undefined || node && !isFocusable(node, config.tabbableOptions)) {
	      // option not specified nor focusable: use fallback options
	      if (findContainerIndex(doc.activeElement) >= 0) {
	        node = doc.activeElement;
	      } else {
	        var firstTabbableGroup = state.tabbableGroups[0];
	        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;

	        // NOTE: `fallbackFocus` option function cannot return `false` (not supported)
	        node = firstTabbableNode || getNodeForOption('fallbackFocus');
	      }
	    } else if (node === null) {
	      // option is a VALID selector string that doesn't yield a node: use the `fallbackFocus`
	      //  option instead of the default behavior when the option isn't specified at all
	      node = getNodeForOption('fallbackFocus');
	    }
	    if (!node) {
	      throw new Error('Your focus-trap needs to have at least one focusable element');
	    }
	    return node;
	  };
	  var updateTabbableNodes = function updateTabbableNodes() {
	    state.containerGroups = state.containers.map(function (container) {
	      var tabbableNodes = tabbable(container, config.tabbableOptions);

	      // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
	      //  are a superset of tabbable nodes since nodes with negative `tabindex` attributes
	      //  are focusable but not tabbable
	      var focusableNodes = focusable(container, config.tabbableOptions);
	      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : undefined;
	      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : undefined;
	      var firstDomTabbableNode = focusableNodes.find(function (node) {
	        return isTabbable(node);
	      });
	      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function (node) {
	        return isTabbable(node);
	      });
	      var posTabIndexesFound = !!tabbableNodes.find(function (node) {
	        return getTabIndex(node) > 0;
	      });
	      return {
	        container: container,
	        tabbableNodes: tabbableNodes,
	        focusableNodes: focusableNodes,
	        /** True if at least one node with positive `tabindex` was found in this container. */
	        posTabIndexesFound: posTabIndexesFound,
	        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
	        firstTabbableNode: firstTabbableNode,
	        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
	        lastTabbableNode: lastTabbableNode,
	        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
	        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
	        //  because that API doesn't work with Shadow DOM as well as it should (@see
	        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
	        //  to address an edge case related to positive tabindex support, this seems like a much easier,
	        //  "close enough most of the time" alternative for positive tabindexes which should generally
	        //  be avoided anyway...
	        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
	        firstDomTabbableNode: firstDomTabbableNode,
	        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
	        lastDomTabbableNode: lastDomTabbableNode,
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
	          var nodeIdx = tabbableNodes.indexOf(node);
	          if (nodeIdx < 0) {
	            // either not tabbable nor focusable, or was focused but not tabbable (negative tabindex):
	            //  since `node` should at least have been focusable, we assume that's the case and mimic
	            //  what browsers do, which is set focus to the next node in __document position order__,
	            //  regardless of positive tabindexes, if any -- and for reasons explained in the NOTE
	            //  above related to `firstDomTabbable` and `lastDomTabbable` properties, we fall back to
	            //  basic DOM order
	            if (forward) {
	              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function (el) {
	                return isTabbable(el);
	              });
	            }
	            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function (el) {
	              return isTabbable(el);
	            });
	          }
	          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
	        }
	      };
	    });
	    state.tabbableGroups = state.containerGroups.filter(function (group) {
	      return group.tabbableNodes.length > 0;
	    });

	    // throw if no groups have tabbable nodes and we don't have a fallback focus node either
	    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
	    ) {
	      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
	    }

	    // NOTE: Positive tabindexes are only properly supported in single-container traps because
	    //  doing it across multiple containers where tabindexes could be all over the place
	    //  would require Tabbable to support multiple containers, would require additional
	    //  specialized Shadow DOM support, and would require Tabbable's multi-container support
	    //  to look at those containers in document position order rather than user-provided
	    //  order (as they are treated in Focus-trap, for legacy reasons). See discussion on
	    //  https://github.com/focus-trap/focus-trap/issues/375 for more details.
	    if (state.containerGroups.find(function (g) {
	      return g.posTabIndexesFound;
	    }) && state.containerGroups.length > 1) {
	      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
	    }
	  };

	  /**
	   * Gets the current activeElement. If it's a web-component and has open shadow-root
	   * it will recursively search inside shadow roots for the "true" activeElement.
	   *
	   * @param {Document | ShadowRoot} el
	   *
	   * @returns {HTMLElement} The element that currently has the focus
	   **/
	  var _getActiveElement = function getActiveElement(el) {
	    var activeElement = el.activeElement;
	    if (!activeElement) {
	      return;
	    }
	    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
	      return _getActiveElement(activeElement.shadowRoot);
	    }
	    return activeElement;
	  };
	  var _tryFocus = function tryFocus(node) {
	    if (node === false) {
	      return;
	    }
	    if (node === _getActiveElement(document)) {
	      return;
	    }
	    if (!node || !node.focus) {
	      _tryFocus(getInitialFocusNode());
	      return;
	    }
	    node.focus({
	      preventScroll: !!config.preventScroll
	    });
	    // NOTE: focus() API does not trigger focusIn event so set MRU node manually
	    state.mostRecentlyFocusedNode = node;
	    if (isSelectableInput(node)) {
	      node.select();
	    }
	  };
	  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
	    var node = getNodeForOption('setReturnFocus', {
	      params: [previousActiveElement]
	    });
	    return node ? node : node === false ? false : previousActiveElement;
	  };

	  /**
	   * Finds the next node (in either direction) where focus should move according to a
	   *  keyboard focus-in event.
	   * @param {Object} params
	   * @param {Node} [params.target] Known target __from which__ to navigate, if any.
	   * @param {KeyboardEvent|FocusEvent} [params.event] Event to use if `target` isn't known (event
	   *  will be used to determine the `target`). Ignored if `target` is specified.
	   * @param {boolean} [params.isBackward] True if focus should move backward.
	   * @returns {Node|undefined} The next node, or `undefined` if a next node couldn't be
	   *  determined given the current state of the trap.
	   */
	  var findNextNavNode = function findNextNavNode(_ref3) {
	    var target = _ref3.target,
	      event = _ref3.event,
	      _ref3$isBackward = _ref3.isBackward,
	      isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
	    target = target || getActualTarget(event);
	    updateTabbableNodes();
	    var destinationNode = null;
	    if (state.tabbableGroups.length > 0) {
	      // make sure the target is actually contained in a group
	      // NOTE: the target may also be the container itself if it's focusable
	      //  with tabIndex='-1' and was given initial focus
	      var containerIndex = findContainerIndex(target, event);
	      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;
	      if (containerIndex < 0) {
	        // target not found in any group: quite possible focus has escaped the trap,
	        //  so bring it back into...
	        if (isBackward) {
	          // ...the last node in the last group
	          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
	        } else {
	          // ...the first node in the first group
	          destinationNode = state.tabbableGroups[0].firstTabbableNode;
	        }
	      } else if (isBackward) {
	        // REVERSE

	        // is the target the first tabbable node in a group?
	        var startOfGroupIndex = state.tabbableGroups.findIndex(function (_ref4) {
	          var firstTabbableNode = _ref4.firstTabbableNode;
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
	          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
	        } else if (!isTabEvent(event)) {
	          // user must have customized the nav keys so we have to move focus manually _within_
	          //  the active group: do this based on the order determined by tabbable()
	          destinationNode = containerGroup.nextTabbableNode(target, false);
	        }
	      } else {
	        // FORWARD

	        // is the target the last tabbable node in a group?
	        var lastOfGroupIndex = state.tabbableGroups.findIndex(function (_ref5) {
	          var lastTabbableNode = _ref5.lastTabbableNode;
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
	          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
	        } else if (!isTabEvent(event)) {
	          // user must have customized the nav keys so we have to move focus manually _within_
	          //  the active group: do this based on the order determined by tabbable()
	          destinationNode = containerGroup.nextTabbableNode(target);
	        }
	      }
	    } else {
	      // no groups available
	      // NOTE: the fallbackFocus option does not support returning false to opt-out
	      destinationNode = getNodeForOption('fallbackFocus');
	    }
	    return destinationNode;
	  };

	  // This needs to be done on mousedown and touchstart instead of click
	  // so that it precedes the focus event.
	  var checkPointerDown = function checkPointerDown(e) {
	    var target = getActualTarget(e);
	    if (findContainerIndex(target, e) >= 0) {
	      // allow the click since it ocurred inside the trap
	      return;
	    }
	    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
	      // immediately deactivate the trap
	      trap.deactivate({
	        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
	        //  which will result in the outside click setting focus to the node
	        //  that was clicked (and if not focusable, to "nothing"); by setting
	        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
	        //  on activation (or the configured `setReturnFocus` node), whether the
	        //  outside click was on a focusable node or not
	        returnFocus: config.returnFocusOnDeactivate
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
	  // NOTE: the focusIn event is NOT cancelable, so if focus escapes, it may cause unexpected
	  //  scrolling if the node that got focused was out of view; there's nothing we can do to
	  //  prevent that from happening by the time we discover that focus escaped
	  var checkFocusIn = function checkFocusIn(event) {
	    var target = getActualTarget(event);
	    var targetContained = findContainerIndex(target, event) >= 0;

	    // In Firefox when you Tab out of an iframe the Document is briefly focused.
	    if (targetContained || target instanceof Document) {
	      if (targetContained) {
	        state.mostRecentlyFocusedNode = target;
	      }
	    } else {
	      // escaped! pull it back in to where it just left
	      event.stopImmediatePropagation();

	      // focus will escape if the MRU node had a positive tab index and user tried to nav forward;
	      //  it will also escape if the MRU node had a 0 tab index and user tried to nav backward
	      //  toward a node with a positive tab index
	      var nextNode; // next node to focus, if we find one
	      var navAcrossContainers = true;
	      if (state.mostRecentlyFocusedNode) {
	        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
	          // MRU container index must be >=0 otherwise we wouldn't have it as an MRU node...
	          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
	          // there MAY not be any tabbable nodes in the container if there are at least 2 containers
	          //  and the MRU node is focusable but not tabbable (focus-trap requires at least 1 container
	          //  with at least one tabbable node in order to function, so this could be the other container
	          //  with nothing tabbable in it)
	          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
	          if (tabbableNodes.length > 0) {
	            // MRU tab index MAY not be found if the MRU node is focusable but not tabbable
	            var mruTabIdx = tabbableNodes.findIndex(function (node) {
	              return node === state.mostRecentlyFocusedNode;
	            });
	            if (mruTabIdx >= 0) {
	              if (config.isKeyForward(state.recentNavEvent)) {
	                if (mruTabIdx + 1 < tabbableNodes.length) {
	                  nextNode = tabbableNodes[mruTabIdx + 1];
	                  navAcrossContainers = false;
	                }
	                // else, don't wrap within the container as focus should move to next/previous
	                //  container
	              } else {
	                if (mruTabIdx - 1 >= 0) {
	                  nextNode = tabbableNodes[mruTabIdx - 1];
	                  navAcrossContainers = false;
	                }
	                // else, don't wrap within the container as focus should move to next/previous
	                //  container
	              }
	              // else, don't find in container order without considering direction too
	            }
	          }
	          // else, no tabbable nodes in that container (which means we must have at least one other
	          //  container with at least one tabbable node in it, otherwise focus-trap would've thrown
	          //  an error the last time updateTabbableNodes() was run): find next node among all known
	          //  containers
	        } else {
	          // check to see if there's at least one tabbable node with a positive tab index inside
	          //  the trap because focus seems to escape when navigating backward from a tabbable node
	          //  with tabindex=0 when this is the case (instead of wrapping to the tabbable node with
	          //  the greatest positive tab index like it should)
	          if (!state.containerGroups.some(function (g) {
	            return g.tabbableNodes.some(function (n) {
	              return getTabIndex(n) > 0;
	            });
	          })) {
	            // no containers with tabbable nodes with positive tab indexes which means the focus
	            //  escaped for some other reason and we should just execute the fallback to the
	            //  MRU node or initial focus node, if any
	            navAcrossContainers = false;
	          }
	        }
	      } else {
	        // no MRU node means we're likely in some initial condition when the trap has just
	        //  been activated and initial focus hasn't been given yet, in which case we should
	        //  fall through to trying to focus the initial focus node, which is what should
	        //  happen below at this point in the logic
	        navAcrossContainers = false;
	      }
	      if (navAcrossContainers) {
	        nextNode = findNextNavNode({
	          // move FROM the MRU node, not event-related node (which will be the node that is
	          //  outside the trap causing the focus escape we're trying to fix)
	          target: state.mostRecentlyFocusedNode,
	          isBackward: config.isKeyBackward(state.recentNavEvent)
	        });
	      }
	      if (nextNode) {
	        _tryFocus(nextNode);
	      } else {
	        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
	      }
	    }
	    state.recentNavEvent = undefined; // clear
	  };

	  // Hijack key nav events on the first and last focusable nodes of the trap,
	  // in order to prevent focus from escaping. If it escapes for even a
	  // moment it can end up scrolling the page and causing confusion so we
	  // kind of need to capture the action at the keydown phase.
	  var checkKeyNav = function checkKeyNav(event) {
	    var isBackward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    state.recentNavEvent = event;
	    var destinationNode = findNextNavNode({
	      event: event,
	      isBackward: isBackward
	    });
	    if (destinationNode) {
	      if (isTabEvent(event)) {
	        // since tab natively moves focus, we wouldn't have a destination node unless we
	        //  were on the edge of a container and had to move to the next/previous edge, in
	        //  which case we want to prevent default to keep the browser from moving focus
	        //  to where it normally would
	        event.preventDefault();
	      }
	      _tryFocus(destinationNode);
	    }
	    // else, let the browser take care of [shift+]tab and move the focus
	  };
	  var checkTabKey = function checkTabKey(event) {
	    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
	      checkKeyNav(event, config.isKeyBackward(event));
	    }
	  };

	  // we use a different event phase for the Escape key to allow canceling the event and checking for this in escapeDeactivates
	  var checkEscapeKey = function checkEscapeKey(event) {
	    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
	      event.preventDefault();
	      trap.deactivate();
	    }
	  };
	  var checkClick = function checkClick(e) {
	    var target = getActualTarget(e);
	    if (findContainerIndex(target, e) >= 0) {
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
	  };

	  //
	  // EVENT LISTENERS
	  //

	  var addListeners = function addListeners() {
	    if (!state.active) {
	      return;
	    }

	    // There can be only one listening focus trap at a time
	    activeFocusTraps.activateTrap(trapStack, trap);

	    // Delay ensures that the focused element doesn't capture the event
	    // that caused the focus trap activation.
	    state.delayInitialFocusTimer = config.delayInitialFocus ? delay$1(function () {
	      _tryFocus(getInitialFocusNode());
	    }) : _tryFocus(getInitialFocusNode());
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
	    doc.addEventListener('keydown', checkTabKey, {
	      capture: true,
	      passive: false
	    });
	    doc.addEventListener('keydown', checkEscapeKey);
	    return trap;
	  };

	  /**
	   * Traverses up the DOM from each of `containers`, collecting references to
	   * the elements that are siblings to `container` or an ancestor of `container`.
	   * @param {Array<HTMLElement>} containers
	   */
	  var collectAdjacentElements = function collectAdjacentElements(containers) {
	    // Re-activate all adjacent elements & clear previous collection.
	    if (state.active && !state.paused) {
	      trap._setSubtreeIsolation(false);
	    }
	    state.adjacentElements.clear();
	    state.alreadySilent.clear();

	    // Collect all ancestors of all containers to avoid redundant processing.
	    var containerAncestors = new Set();
	    var adjacentElements = new Set();

	    // Compile all elements adjacent to the focus trap containers & lineage.
	    var _iterator = _createForOfIteratorHelper(containers),
	      _step;
	    try {
	      for (_iterator.s(); !(_step = _iterator.n()).done;) {
	        var container = _step.value;
	        containerAncestors.add(container);
	        var insideShadowRoot = typeof ShadowRoot !== 'undefined' && container.getRootNode() instanceof ShadowRoot;
	        var current = container;
	        while (current) {
	          containerAncestors.add(current);
	          var parent = current.parentElement;
	          var siblings = [];
	          if (parent) {
	            siblings = parent.children;
	          } else if (!parent && insideShadowRoot) {
	            siblings = current.getRootNode().children;
	            parent = current.getRootNode().host;
	            insideShadowRoot = typeof ShadowRoot !== 'undefined' && parent.getRootNode() instanceof ShadowRoot;
	          }

	          // Add all the children, we'll remove container lineage later.
	          var _iterator2 = _createForOfIteratorHelper(siblings),
	            _step2;
	          try {
	            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	              var child = _step2.value;
	              adjacentElements.add(child);
	            }
	          } catch (err) {
	            _iterator2.e(err);
	          } finally {
	            _iterator2.f();
	          }
	          current = parent;
	        }
	      }

	      // Multi-container traps may overlap.
	      // Remove elements within container lineages.
	    } catch (err) {
	      _iterator.e(err);
	    } finally {
	      _iterator.f();
	    }
	    containerAncestors.forEach(function (el) {
	      adjacentElements["delete"](el);
	    });
	    state.adjacentElements = adjacentElements;
	  };
	  var removeListeners = function removeListeners() {
	    if (!state.active) {
	      return;
	    }
	    doc.removeEventListener('focusin', checkFocusIn, true);
	    doc.removeEventListener('mousedown', checkPointerDown, true);
	    doc.removeEventListener('touchstart', checkPointerDown, true);
	    doc.removeEventListener('click', checkClick, true);
	    doc.removeEventListener('keydown', checkTabKey, true);
	    doc.removeEventListener('keydown', checkEscapeKey);
	    return trap;
	  };

	  //
	  // MUTATION OBSERVER
	  //

	  var checkDomRemoval = function checkDomRemoval(mutations) {
	    var isFocusedNodeRemoved = mutations.some(function (mutation) {
	      var removedNodes = Array.from(mutation.removedNodes);
	      return removedNodes.some(function (node) {
	        return node === state.mostRecentlyFocusedNode;
	      });
	    });

	    // If the currently focused is removed then browsers will move focus to the
	    // <body> element. If this happens, try to move focus back into the trap.
	    if (isFocusedNodeRemoved) {
	      _tryFocus(getInitialFocusNode());
	    }
	  };

	  // Use MutationObserver - if supported - to detect if focused node is removed
	  // from the DOM.
	  var mutationObserver = typeof window !== 'undefined' && 'MutationObserver' in window ? new MutationObserver(checkDomRemoval) : undefined;
	  var updateObservedNodes = function updateObservedNodes() {
	    if (!mutationObserver) {
	      return;
	    }
	    mutationObserver.disconnect();
	    if (state.active && !state.paused) {
	      state.containers.map(function (container) {
	        mutationObserver.observe(container, {
	          subtree: true,
	          childList: true
	        });
	      });
	    }
	  };

	  //
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

	      // If a currently-active trap is isolating its subtree, we need to remove
	      // that isolation to allow the new trap to find tabbable nodes.
	      var preexistingTrap = activeFocusTraps.getActiveTrap(trapStack);
	      var revertState = false;
	      if (preexistingTrap && !preexistingTrap.paused) {
	        preexistingTrap._setSubtreeIsolation(false);
	        revertState = true;
	      }
	      try {
	        if (!checkCanFocusTrap) {
	          updateTabbableNodes();
	        }
	        state.active = true;
	        state.paused = false;
	        state.nodeFocusedBeforeActivation = _getActiveElement(doc);
	        onActivate === null || onActivate === void 0 || onActivate();
	        var finishActivation = function finishActivation() {
	          if (checkCanFocusTrap) {
	            updateTabbableNodes();
	          }
	          addListeners();
	          updateObservedNodes();
	          if (config.isolateSubtrees) {
	            trap._setSubtreeIsolation(true);
	          }
	          onPostActivate === null || onPostActivate === void 0 || onPostActivate();
	        };
	        if (checkCanFocusTrap) {
	          checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
	          return this;
	        }
	        finishActivation();
	      } catch (error) {
	        // If our activation throws an exception and the stack hasn't changed,
	        // we need to re-enable the prior trap's subtree isolation.
	        if (preexistingTrap === activeFocusTraps.getActiveTrap(trapStack) && revertState) {
	          preexistingTrap._setSubtreeIsolation(true);
	        }
	        throw error;
	      }
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

	      // Prior to removing this trap from the trapStack, we need to remove any applications of `inert`.
	      // This allows the next trap down to update its tabbable nodes properly.
	      //
	      // If this trap is not top of the stack, don't change any current isolation.
	      if (!state.paused) {
	        trap._setSubtreeIsolation(false);
	      }
	      state.alreadySilent.clear();
	      removeListeners();
	      state.active = false;
	      state.paused = false;
	      updateObservedNodes();
	      activeFocusTraps.deactivateTrap(trapStack, trap);
	      var onDeactivate = getOption(options, 'onDeactivate');
	      var onPostDeactivate = getOption(options, 'onPostDeactivate');
	      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
	      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');
	      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
	      var finishDeactivation = function finishDeactivation() {
	        delay$1(function () {
	          if (returnFocus) {
	            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
	          }
	          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
	        });
	      };
	      if (returnFocus && checkCanReturnFocus) {
	        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
	        return this;
	      }
	      finishDeactivation();
	      return this;
	    },
	    pause: function pause(pauseOptions) {
	      if (!state.active) {
	        return this;
	      }
	      state.manuallyPaused = true;
	      return this._setPausedState(true, pauseOptions);
	    },
	    unpause: function unpause(unpauseOptions) {
	      if (!state.active) {
	        return this;
	      }
	      state.manuallyPaused = false;
	      if (trapStack[trapStack.length - 1] !== this) {
	        return this;
	      }
	      return this._setPausedState(false, unpauseOptions);
	    },
	    updateContainerElements: function updateContainerElements(containerElements) {
	      var elementsAsArray = [].concat(containerElements).filter(Boolean);
	      state.containers = elementsAsArray.map(function (element) {
	        return typeof element === 'string' ? doc.querySelector(element) : element;
	      });
	      if (config.isolateSubtrees) {
	        collectAdjacentElements(state.containers);
	      }
	      if (state.active) {
	        updateTabbableNodes();
	        if (config.isolateSubtrees && !state.paused) {
	          trap._setSubtreeIsolation(true);
	        }
	      }
	      updateObservedNodes();
	      return this;
	    }
	  };
	  Object.defineProperties(trap, {
	    _isManuallyPaused: {
	      value: function value() {
	        return state.manuallyPaused;
	      }
	    },
	    _setPausedState: {
	      value: function value(paused, options) {
	        if (state.paused === paused) {
	          return this;
	        }
	        state.paused = paused;
	        if (paused) {
	          var onPause = getOption(options, 'onPause');
	          var onPostPause = getOption(options, 'onPostPause');
	          onPause === null || onPause === void 0 || onPause();
	          removeListeners();
	          updateObservedNodes();
	          trap._setSubtreeIsolation(false);
	          onPostPause === null || onPostPause === void 0 || onPostPause();
	        } else {
	          var onUnpause = getOption(options, 'onUnpause');
	          var onPostUnpause = getOption(options, 'onPostUnpause');
	          onUnpause === null || onUnpause === void 0 || onUnpause();
	          trap._setSubtreeIsolation(true);
	          updateTabbableNodes();
	          addListeners();
	          updateObservedNodes();
	          onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
	        }
	        return this;
	      }
	    },
	    _setSubtreeIsolation: {
	      value: function value(isEnabled) {
	        if (config.isolateSubtrees) {
	          state.adjacentElements.forEach(function (el) {
	            var _el$getAttribute;
	            if (isEnabled) {
	              switch (config.isolateSubtrees) {
	                case 'aria-hidden':
	                  // check both attribute and property to ensure initial state is captured
	                  // correctly across different browsers and test environments (like JSDOM)
	                  if (el.ariaHidden === 'true' || ((_el$getAttribute = el.getAttribute('aria-hidden')) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.toLowerCase()) === 'true') {
	                    state.alreadySilent.add(el);
	                  }
	                  el.setAttribute('aria-hidden', 'true');
	                  break;
	                default:
	                  // check both attribute and property to ensure initial state is captured
	                  // correctly across different browsers and test environments (like JSDOM)
	                  if (el.inert || el.hasAttribute('inert')) {
	                    state.alreadySilent.add(el);
	                  }
	                  el.setAttribute('inert', true);
	                  break;
	              }
	            } else {
	              if (state.alreadySilent.has(el)) ; else {
	                switch (config.isolateSubtrees) {
	                  case 'aria-hidden':
	                    el.removeAttribute('aria-hidden');
	                    break;
	                  default:
	                    el.removeAttribute('inert');
	                    break;
	                }
	              }
	            }
	          });
	        }
	      }
	    }
	  });

	  // initialize container elements
	  trap.updateContainerElements(elements);
	  return trap;
	};

	var focusTrap = /*#__PURE__*/Object.freeze({
		__proto__: null,
		createFocusTrap: createFocusTrap$D
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(focusTrap);

	var createFocusTrap$C = require$$0.createFocusTrap;
	var _default = function _default() {
	  var container = document.getElementById('default');
	  var focusTrap = createFocusTrap$C('#default', {
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

	var createFocusTrap$B = require$$0.createFocusTrap;
	var globalTrapStack = function globalTrapStack() {
	  var container = document.getElementById('global-trap-stack');
	  var counter = container.querySelector('.counter');
	  window.__trapStack = [];
	  var updateCounter = function updateCounter() {
	    counter.innerHTML = window.__trapStack.length;
	  };
	  var focusTrap = createFocusTrap$B('#global-trap-stack', {
	    trapStack: window.__trapStack,
	    onPostActivate: function onPostActivate() {
	      container.classList.add('is-active');
	      updateCounter();
	    },
	    onPostDeactivate: function onPostDeactivate() {
	      container.classList.remove('is-active');
	      updateCounter();
	    }
	  });
	  updateCounter();
	  document.getElementById('activate-global-trap-stack').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-global-trap-stack').addEventListener('click', focusTrap.deactivate);
	};

	var createFocusTrap$A = require$$0.createFocusTrap;
	var animatedDialog = function animatedDialog() {
	  var container = document.getElementById('animated-dialog');
	  var activatedFlag = document.getElementById('animated-dialog-trap-activated');
	  var focusTrap = createFocusTrap$A('#animated-dialog', {
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
	      });
	      // Return a promise that resolves when all the trap containers are able to receive focus
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

	var createFocusTrap$z = require$$0.createFocusTrap;
	var animatedTrigger = function animatedTrigger() {
	  var container = document.getElementById('animated-trigger');
	  var trigger = document.getElementById('activate-animated-trigger');
	  var deactivatedFlag = document.getElementById('animated-trigger-trap-deactivated');
	  var returnFocusCheckbox = document.getElementById('animated-trigger-returnfocus');
	  var focusTrap = createFocusTrap$z('#animated-trigger', {
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

	var createFocusTrap$y = require$$0.createFocusTrap;
	var _escapeDeactivates = function escapeDeactivates() {
	  var container = document.getElementById('escape-deactivates');
	  var escapeDeactivatesOption = document.getElementById('escape-deactivates-option');
	  var focusTrap = createFocusTrap$y('#escape-deactivates', {
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

	var createFocusTrap$x = require$$0.createFocusTrap;
	var escapeKeyCancelation = function escapeKeyCancelation() {
	  var container = document.getElementById('escape-key-cancelation');
	  var escapeCancelingInput = document.getElementById('escape-handling-input');
	  escapeCancelingInput.addEventListener('keydown', function (event) {
	    if (event.key === 'Escape') {
	      event.preventDefault();
	    }
	  });
	  var focusTrap = createFocusTrap$x('#escape-key-cancelation', {
	    onActivate: function onActivate() {
	      return container.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    },
	    escapeDeactivates: function escapeDeactivates(event) {
	      return !event.defaultPrevented;
	    }
	  });
	  document.getElementById('activate-escape-key-cancelation').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-escape-key-cancelation').addEventListener('click', focusTrap.deactivate);
	};

	var createFocusTrap$w = require$$0.createFocusTrap;
	var initialElementNoEscape = function initialElementNoEscape() {
	  var container = document.getElementById('iene');
	  var activateTrigger = document.getElementById('activate-iene');
	  var deactivateTrigger = document.getElementById('deactivate-iene');
	  var select = document.getElementById('select-iene');
	  var initialize = function initialize(_ref) {
	    var _ref$initialFocus = _ref.initialFocus,
	      initialFocus = _ref$initialFocus === void 0 ? '#focused-input' : _ref$initialFocus;
	    return createFocusTrap$w(container, {
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
	    }
	    // else, assume it's a selector

	    focusTrap = initialize({
	      initialFocus: initialFocus
	    });
	  });
	};

	var createFocusTrap$v = require$$0.createFocusTrap;
	var trickyInitialFocus = function trickyInitialFocus() {
	  var container = document.getElementById('tif');
	  var focusable = document.getElementById('tif-hide-focusable');
	  var focusTrap = createFocusTrap$v(container, {
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

	var createFocusTrap$u = require$$0.createFocusTrap;
	var initialSelectorWithFallback = function initialSelectorWithFallback() {
	  var container = document.getElementById('iswf');
	  var activateTrigger = document.getElementById('activate-iswf');
	  var deactivateTrigger = document.getElementById('deactivate-iswf');
	  var checkbox = document.getElementById('checkbox-iswf');
	  var button = document.getElementById('initial-focus-btn-iswf');
	  var buttonParent = button.parentNode;
	  var initialize = function initialize() {
	    return createFocusTrap$u(container, {
	      onActivate: function onActivate() {
	        return container.classList.add('is-active');
	      },
	      onDeactivate: function onDeactivate() {
	        return container.classList.remove('is-active');
	      },
	      fallbackFocus: container,
	      // NOTE: it's important to use a selector, not a reference to `button`,
	      //  as the option so that every time the trap is initialized, the DOM
	      //  is queried for the node, and the resulting trap behavior reflects
	      //  whether the node can be found or not
	      initialFocus: '#initial-focus-btn-iswf'
	    });
	  };
	  var focusTrap = initialize();
	  activateTrigger.addEventListener('click', function () {
	    return focusTrap.activate();
	  });
	  deactivateTrigger.addEventListener('click', function () {
	    return focusTrap.deactivate();
	  });
	  checkbox.addEventListener('change', function (event) {
	    if (event.currentTarget.checked) {
	      buttonParent.appendChild(button);
	    } else {
	      button.remove();
	    }
	  });
	};

	var createFocusTrap$t = require$$0.createFocusTrap;
	var initiallyFocusedContainer = function initiallyFocusedContainer() {
	  var container = document.getElementById('ifc');
	  var focusTrap = createFocusTrap$t('#ifc', {
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

	var createFocusTrap$s = require$$0.createFocusTrap;
	var hiddenTreasures = function hiddenTreasures() {
	  var container = document.getElementById('ht');
	  var more = document.getElementById('ht-more');
	  var focusTrap = createFocusTrap$s(container, {
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

	var createFocusTrap$r = require$$0.createFocusTrap;
	var nested = function nested() {
	  var primary = document.getElementById('nested');
	  var nested = document.getElementById('nested-nested');

	  // for e2e test purposes
	  primary.dataset.ftTestPrimaryOnPauseCalledTimes = 0;
	  primary.dataset.ftTestPrimaryOnPostPauseCalledTimes = 0;
	  primary.dataset.ftTestPrimaryOnUnpauseCalledTimes = 0;
	  primary.dataset.ftTestPrimaryOnPostUnpauseCalledTimes = 0;
	  var primaryFocusTrap = createFocusTrap$r('#nested', {
	    onDeactivate: function onDeactivate() {
	      return primary.style.display = 'none';
	    },
	    onPause: function onPause() {
	      return primary.dataset.ftTestPrimaryOnPauseCalledTimes++;
	    },
	    onPostPause: function onPostPause() {
	      return primary.dataset.ftTestPrimaryOnPostPauseCalledTimes++;
	    },
	    onUnpause: function onUnpause() {
	      return primary.dataset.ftTestPrimaryOnUnpauseCalledTimes++;
	    },
	    onPostUnpause: function onPostUnpause() {
	      return primary.dataset.ftTestPrimaryOnPostUnpauseCalledTimes++;
	    }
	  });
	  var nestedFocusTrap = createFocusTrap$r('#nested-nested', {
	    onDeactivate: function onDeactivate() {
	      nested.style.display = 'none';
	    }
	  });
	  document.getElementById('activate-nested').addEventListener('click', function () {
	    primary.style.display = 'block';
	    primaryFocusTrap.activate();
	  });
	  document.getElementById('deactivate-nested').addEventListener('click', primaryFocusTrap.deactivate);
	  document.getElementById('nested-activate-nested').addEventListener('click', function () {
	    nested.style.display = 'block';
	    nestedFocusTrap.activate();
	  });
	  document.getElementById('nested-deactivate-nested').addEventListener('click', nestedFocusTrap.deactivate);
	};

	var createFocusTrap$q = require$$0.createFocusTrap;
	var sibling = function sibling() {
	  var container = document.getElementById('sibling-first');
	  var second = document.getElementById('sibling-second');
	  var firstFocusTrap = createFocusTrap$q('#sibling-first', {
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    }
	  });
	  var secondFocusTrap = createFocusTrap$q('#sibling-second', {
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

	var createFocusTrap$p = require$$0.createFocusTrap;
	var inputActivation = function inputActivation() {
	  var container = document.getElementById('input-activation');
	  var focusTrap = createFocusTrap$p(container, {
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

	var createFocusTrap$o = require$$0.createFocusTrap;
	var container = document.getElementById('delay');
	var delay = function delay() {
	  var focusTrap = createFocusTrap$o(container, {
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

	var createFocusTrap$n = require$$0.createFocusTrap;
	var radio = function radio() {
	  var container = document.getElementById('radio');
	  var focusTrap = createFocusTrap$n('#radio', {
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

	var createFocusTrap$m = require$$0.createFocusTrap;
	var iframe = function iframe() {
	  var container = document.getElementById('iframe');
	  var focusTrap = createFocusTrap$m('#iframe', {
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

	var createFocusTrap$l = require$$0.createFocusTrap;
	var allowOutsideClick = function allowOutsideClick() {
	  var container = document.getElementById('allowoutsideclick');
	  var trigger = document.getElementById('activate-allowoutsideclick');
	  var active = false;
	  var allowOutsideClick = true;
	  function initialize() {
	    return createFocusTrap$l('#allowoutsideclick', {
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
	  }
	  function deactivate() {
	    focusTrap.deactivate();
	    active = false;
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

	var createFocusTrap$k = require$$0.createFocusTrap;
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
	    return createFocusTrap$k('#clickoutsidedeactivates', {
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

	var createFocusTrap$j = require$$0.createFocusTrap;
	var setReturnFocus = function setReturnFocus() {
	  var container = document.getElementById('setreturnfocus');
	  var focusTrap = createFocusTrap$j('#setreturnfocus', {
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

	var createFocusTrap$i = require$$0.createFocusTrap;
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
	  var focusTrap = createFocusTrap$i('#setreturnfocus-function', {
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

	var createFocusTrap$h = require$$0.createFocusTrap;
	var noDelay = function noDelay() {
	  var container = document.getElementById('no-delay');
	  var focusTrap = createFocusTrap$h(container, {
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

	var createFocusTrap$g = require$$0.createFocusTrap;
	var multipleElements = function multipleElements() {
	  var container = document.getElementById('multipleelements');
	  var selectors = ['#multipleelements-1', '#multipleelements-3'];
	  var focusTrap = createFocusTrap$g(selectors, {
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

	var createFocusTrap$f = require$$0.createFocusTrap;
	var multipleElementsDelete = function multipleElementsDelete() {
	  var container = document.getElementById('multipleelements-delete');
	  var selectors = ['#multipleelements-delete-1', '#multipleelements-delete-2'];
	  var focusTrap = createFocusTrap$f(selectors, {
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

	var createFocusTrap$e = require$$0.createFocusTrap;
	var multipleElementsDeleteAll = function multipleElementsDeleteAll() {
	  var container = document.getElementById('multipleelements-delete-all');
	  var selectors = ['#multipleelements-delete-all-1', '#multipleelements-delete-all-2'];
	  var focusTrap = createFocusTrap$e(selectors, {
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

	var createFocusTrap$d = require$$0.createFocusTrap;
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
	  var focusTrap1 = createFocusTrap$d(trap1Selectors, {
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
	  var focusTrap2 = createFocusTrap$d(trap2Selectors, {
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

	var createFocusTrap$c = require$$0.createFocusTrap;
	var multipleTrapsManualPause = function multipleTrapsManualPause() {
	  var container = document.getElementById('multipletraps-manual-pause');
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
	  var trap1Selectors = ['#multipletraps-manual-pause-1'];
	  var trap2Selectors = ['#multipletraps-manual-pause-2'];
	  var focusTrap1 = createFocusTrap$c(trap1Selectors, {
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
	  var focusTrap2 = createFocusTrap$c(trap2Selectors, {
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
	  document.getElementById('activate-multipletraps-manual-pause-1').addEventListener('click', function () {
	    focusTrap1.activate();
	  });
	  document.getElementById('deactivate-multipletraps-manual-pause-1').addEventListener('click', function () {
	    focusTrap1.deactivate();
	  });
	  document.getElementById('pause-multipletraps-manual-pause-1').addEventListener('click', function () {
	    focusTrap1.pause();
	  });
	  document.getElementById('unpause-multipletraps-manual-pause-1').addEventListener('click', function () {
	    focusTrap1.unpause();
	  });
	  document.getElementById('activate-multipletraps-manual-pause-2').addEventListener('click', function () {
	    focusTrap2.activate();
	  });
	  document.getElementById('deactivate-multipletraps-manual-pause-2').addEventListener('click', function () {
	    focusTrap2.deactivate();
	  });
	  document.getElementById('pause-multipletraps-manual-pause-2').addEventListener('click', function () {
	    focusTrap2.pause();
	  });
	  document.getElementById('unpause-multipletraps-manual-pause-2').addEventListener('click', function () {
	    focusTrap2.unpause();
	  });
	};

	var createFocusTrap$b = require$$0.createFocusTrap;
	var arrowKeys = function arrowKeys() {
	  var container = document.getElementById('arrow-keys');
	  var focusTrap = createFocusTrap$b('#arrow-keys', {
	    onActivate: function onActivate() {
	      return container.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    },
	    isKeyForward: function isKeyForward(event) {
	      return event.key === 'k';
	    },
	    isKeyBackward: function isKeyBackward(event) {
	      return event.key === 'j';
	    }
	  });
	  document.getElementById('activate-arrow-keys').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-arrow-keys').addEventListener('click', focusTrap.deactivate);
	};

	var createFocusTrap$a = require$$0.createFocusTrap;
	var domRemove = function domRemove() {
	  var container = document.getElementById('dom-remove');
	  document.getElementById('dom-remove-button').addEventListener('click', function (event) {
	    event.target.remove();
	  });
	  var focusTrap = createFocusTrap$a('#dom-remove', {
	    onActivate: function onActivate() {
	      return container.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    }
	  });
	  document.getElementById('activate-dom-remove').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-dom-remove').addEventListener('click', focusTrap.deactivate);
	};

	var createFocusTrap$9 = require$$0.createFocusTrap;
	var isolateSubtree = function isolateSubtree() {
	  var container = document.getElementById('isolate-subtree');
	  var altContainer = document.getElementById('isolate-subtree-alt-container');
	  var nestedTrapContainer = document.getElementById('isolate-subtree-nested');
	  var secondTrapContainer = document.getElementById('isolate-subtree-sibling');
	  var focusTrap = createFocusTrap$9([container, altContainer], {
	    isolateSubtrees: true,
	    onActivate: function onActivate() {
	      container.classList.add('is-active');
	      altContainer.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      container.classList.remove('is-active');
	      altContainer.classList.remove('is-active');
	    }
	  });
	  var focusTrap_ariaHidden = createFocusTrap$9([container, altContainer], {
	    isolateSubtrees: 'aria-hidden',
	    onActivate: function onActivate() {
	      container.classList.add('is-active');
	      altContainer.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      container.classList.remove('is-active');
	      altContainer.classList.remove('is-active');
	    }
	  });
	  var nestedTrap = createFocusTrap$9(nestedTrapContainer, {
	    isolateSubtrees: true,
	    onActivate: function onActivate() {
	      nestedTrapContainer.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      nestedTrapContainer.classList.remove('is-active');
	    }
	  });
	  var nestedTrap_ariaHidden = createFocusTrap$9(nestedTrapContainer, {
	    isolateSubtrees: 'aria-hidden',
	    onActivate: function onActivate() {
	      nestedTrapContainer.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      nestedTrapContainer.classList.remove('is-active');
	    }
	  });
	  var secondTrap = createFocusTrap$9(secondTrapContainer, {
	    isolateSubtrees: true,
	    onActivate: function onActivate() {
	      secondTrapContainer.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      secondTrapContainer.classList.remove('is-active');
	    }
	  });
	  var secondTrap_ariaHidden = createFocusTrap$9(secondTrapContainer, {
	    isolateSubtrees: 'aria-hidden',
	    onActivate: function onActivate() {
	      secondTrapContainer.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      secondTrapContainer.classList.remove('is-active');
	    }
	  });
	  document.getElementById('activate-isolate-subtree').addEventListener('click', focusTrap.activate);
	  document.getElementById('activate-isolate-subtree-aria').addEventListener('click', focusTrap_ariaHidden.activate);
	  document.getElementById('deactivate-isolate-subtree').addEventListener('click', function () {
	    focusTrap.deactivate();
	    focusTrap_ariaHidden.deactivate();
	  });
	  document.getElementById('activate-nested-isolate-subtree').addEventListener('click', nestedTrap.activate);
	  document.getElementById('activate-nested-isolate-subtree-aria').addEventListener('click', nestedTrap_ariaHidden.activate);
	  document.getElementById('deactivate-nested-isolate-subtree').addEventListener('click', function () {
	    nestedTrap.deactivate();
	    nestedTrap_ariaHidden.deactivate();
	  });
	  document.getElementById('activate-second-isolate-subtree').addEventListener('click', secondTrap.activate);
	  document.getElementById('activate-second-isolate-subtree-aria').addEventListener('click', secondTrap_ariaHidden.activate);
	  document.getElementById('deactivate-second-isolate-subtree').addEventListener('click', function () {
	    secondTrap.deactivate();
	    secondTrap_ariaHidden.deactivate();
	  });
	};

	// needed for the async function we export here

	var createFocusTrap$8 = require$$0.createFocusTrap;
	var inIframe = /*#__PURE__*/function () {
	  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
	    var contextIframe, targetDocument, trapWrapper, focusTrap;
	    return _regenerator().w(function (_context) {
	      while (1) switch (_context.n) {
	        case 0:
	          contextIframe = document.getElementById('in-iframe'); // wait for iFrame DOM to completely load
	        case 1:
	          if (contextIframe.contentWindow.document.getElementById('in-iframe-trap')) {
	            _context.n = 3;
	            break;
	          }
	          _context.n = 2;
	          return new Promise(function (r) {
	            return setTimeout(r, 500);
	          });
	        case 2:
	          _context.n = 1;
	          break;
	        case 3:
	          targetDocument = contextIframe.contentWindow.document;
	          if (targetDocument) {
	            trapWrapper = targetDocument.getElementById('in-iframe-trap');
	            focusTrap = createFocusTrap$8('#in-iframe-trap', {
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
	        case 4:
	          return _context.a(2);
	      }
	    }, _callee);
	  }));
	  return function inIframe() {
	    return _ref.apply(this, arguments);
	  };
	}();

	var createFocusTrap$7 = require$$0.createFocusTrap;
	var activationElementShadowDom = function activationElementShadowDom() {
	  var CustomShadowDomButton = /*#__PURE__*/function (_HTMLElement) {
	    function CustomShadowDomButton() {
	      var _this;
	      _classCallCheck(this, CustomShadowDomButton);
	      _this = _callSuper(this, CustomShadowDomButton);
	      _this.attachShadow({
	        mode: 'open'
	      }).innerHTML = '<button id="button-inside-shadow-dom"><slot></slot></button>';
	      return _this;
	    }
	    _inherits(CustomShadowDomButton, _HTMLElement);
	    return _createClass(CustomShadowDomButton);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
	  var container = document.getElementById('aesd');
	  var focusTrap = createFocusTrap$7('#aesd', {
	    onActivate: function onActivate() {
	      return container.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    }
	  });
	  document.getElementById('activate-aesd').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-aesd').addEventListener('click', focusTrap.deactivate);
	  customElements.define('custom-shadow-dom-button', CustomShadowDomButton);
	};

	var createFocusTrap$6 = require$$0.createFocusTrap;
	var inOpenShadowDom = function inOpenShadowDom() {
	  var CustomButton = /*#__PURE__*/function (_HTMLElement) {
	    function CustomButton() {
	      var _this;
	      _classCallCheck(this, CustomButton);
	      _this = _callSuper(this, CustomButton);
	      _this.attachShadow({
	        mode: 'open'
	      }).innerHTML = '<button id="button-inside-custom-button"><slot></slot></button>';
	      return _this;
	    }
	    _inherits(CustomButton, _HTMLElement);
	    return _createClass(CustomButton);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
	  var CustomSpan = /*#__PURE__*/function (_HTMLElement2) {
	    function CustomSpan() {
	      var _this2;
	      _classCallCheck(this, CustomSpan);
	      _this2 = _callSuper(this, CustomSpan);
	      _this2.attachShadow({
	        mode: 'open'
	      }).innerHTML = '<span id="span-inside-custom-span"><slot></slot></span>';
	      return _this2;
	    }
	    _inherits(CustomSpan, _HTMLElement2);
	    return _createClass(CustomSpan);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
	  var FocusTrapModal = /*#__PURE__*/function (_HTMLElement3) {
	    function FocusTrapModal() {
	      var _this3;
	      _classCallCheck(this, FocusTrapModal);
	      _this3 = _callSuper(this, FocusTrapModal);
	      _defineProperty(_this3, "focusTrap", void 0);
	      _this3.id = 'in-open-shadow-dom-host';

	      // use same styles as host
	      var styleLinkEl = document.createElement('link');
	      styleLinkEl.setAttribute('rel', 'stylesheet');
	      styleLinkEl.setAttribute('href', 'style.css');
	      var shadowEl = _this3.attachShadow({
	        mode: 'open'
	      });
	      shadowEl.innerHTML = '<slot></slot>';
	      shadowEl.appendChild(styleLinkEl);
	      _this3.focusTrap = createFocusTrap$6(_this3, {
	        onActivate: function onActivate() {
	          var content = _this3.querySelector('custom-content');
	          content.classList.add('is-active');
	        },
	        onDeactivate: function onDeactivate() {
	          var content = _this3.querySelector('custom-content');
	          content.classList.remove('is-active');
	        },
	        // allow outside clicks to deactivate to verify clicking on shadowDOM components within
	        //  a focus trap's container should not deactivate the focus trap (#959)
	        clickOutsideDeactivates: true,
	        escapeDeactivates: true,
	        tabbableOptions: {
	          getShadowRoot: true
	        }
	      });
	      document.getElementById('activate-in-open-shadow-dom').addEventListener('click', _this3.focusTrap.activate);
	      return _this3;
	    }
	    _inherits(FocusTrapModal, _HTMLElement3);
	    return _createClass(FocusTrapModal, [{
	      key: "connectedCallback",
	      value: function connectedCallback() {
	        var customContent = this.querySelector('custom-content');
	        if (customContent) {
	          customContent.focusTrap = this.focusTrap;
	        }
	      }
	    }]);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
	  var FocusableCustomContent = /*#__PURE__*/function (_HTMLElement4) {
	    function FocusableCustomContent() {
	      var _this4;
	      _classCallCheck(this, FocusableCustomContent);
	      _this4 = _callSuper(this, FocusableCustomContent);
	      _defineProperty(_this4, "deactivate", function () {
	        _this4.focusTrap.deactivate();
	      });
	      var modalEl = document.createElement('div');
	      modalEl.id = 'in-open-shadow-dom-trap';
	      modalEl.className = 'trap';
	      modalEl.innerHTML = "\n        <p>\n          Here is a focus trap in an open Shadow DOM\n          <a href=\"#\">with</a> <a href=\"#\">some</a> <a href=\"#\">focusable</a> parts.\n        </p>\n        <p>\n          \uD83D\uDCAC Clicking anywhere outside the trap will deactivate it, but clicking on any element\n          inside it, including those in nested shadow DOMs, will not.\n        </p>\n        <p>\n          <custom-button>Shadow Button</custom-button>\n          <button>Light DOM Button</button>\n          <custom-span>Shadow Span</custom-span>\n          <button id=\"deactivate-in-open-shadow-dom\" aria-describedby=\"in-open-shadow-dom-heading\">\n            deactivate trap\n          </button>\n        </p>\n      ";
	      var style = document.createElement('style');
	      style.innerHTML = "\n        :host(:focus-visible) #in-open-shadow-dom-trap {\n          outline: 5px solid lightblue; \n        }\n\n        :host(.is-active) #in-open-shadow-dom-trap {\n          background: #fee9ff;\n        }\n      ";
	      // use same styles as host
	      var styleLinkEl = document.createElement('link');
	      styleLinkEl.setAttribute('rel', 'stylesheet');
	      styleLinkEl.setAttribute('href', 'style.css');
	      var shadowRoot = _this4.attachShadow({
	        mode: 'open'
	      });
	      shadowRoot.appendChild(styleLinkEl);
	      shadowRoot.appendChild(style);
	      shadowRoot.appendChild(modalEl);
	      modalEl.querySelector('#deactivate-in-open-shadow-dom').addEventListener('click', function () {
	        _this4.deactivate();
	      });
	      return _this4;
	    }
	    _inherits(FocusableCustomContent, _HTMLElement4);
	    return _createClass(FocusableCustomContent);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
	  customElements.define('focus-trap-modal', FocusTrapModal);
	  customElements.define('custom-button', CustomButton);
	  customElements.define('custom-span', CustomSpan);
	  customElements.define('custom-content', FocusableCustomContent);
	};

	var createFocusTrap$5 = require$$0.createFocusTrap;
	var withShadowDom = function withShadowDom() {
	  var OpenShadowTest = /*#__PURE__*/function (_HTMLElement) {
	    function OpenShadowTest() {
	      var _this;
	      _classCallCheck(this, OpenShadowTest);
	      _this = _callSuper(this, OpenShadowTest);
	      _this.id = 'with-shadow-dom-open-host';
	      var containerEl = document.createElement('div');
	      containerEl.id = 'with-shadow-dom-open-container';
	      containerEl.style = 'border: 1px dotted black; padding: 10px;';
	      containerEl.innerHTML = "\n        <p style=\"margin-top: 0; padding-top: 0;\">\n          This field is inside an <strong>open</strong> Shadow DOM:\n        </p>\n        <input id=\"input\" type=\"text\" />\n      ";

	      // use same styles as host
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
	    _inherits(OpenShadowTest, _HTMLElement);
	    return _createClass(OpenShadowTest);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
	  var createClosedShadow = function createClosedShadow(hostEl) {
	    var containerEl = document.createElement('div');
	    containerEl.id = 'with-shadow-dom-closed-container';
	    containerEl.style = 'border: 1px dotted black; margin-top: 10px; padding: 10px; background-color: rgba(0, 0, 0, 0.05);';
	    containerEl.innerHTML = "\n      <p style=\"margin-top: 0; padding-top: 0;\">\n        This field is inside a <strong>closed</strong> Shadow DOM:\n      </p>\n      <label><input id=\"check\" type=\"checkbox\" /> Checkbox</label>\n    ";

	    // use same styles as host
	    var styleLinkEl = document.createElement('link');
	    styleLinkEl.setAttribute('rel', 'stylesheet');
	    styleLinkEl.setAttribute('href', 'style.css');
	    var shadowEl = hostEl.attachShadow({
	      mode: 'closed'
	    });
	    shadowEl.appendChild(styleLinkEl);
	    shadowEl.appendChild(containerEl);
	    return shadowEl;
	  };

	  // open shadow used for a web component; tabbable will just find it on its own
	  //  because it's open
	  customElements.define('open-shadow-test', OpenShadowTest);

	  // for the closed shadow, we need a reference to the closed shadow root, so a
	  //  web component doesn't work well because we wouldn't have a way of getting
	  //  the shadow; attaching a closed shadow to an existing element works better
	  //  for this demo since we get the shadow root and can give it to tabbable
	  //  when it requests it
	  var closedShadowHostEl = document.getElementById('with-shadow-dom-closed-shadow');
	  var closedShadowEl = createClosedShadow(closedShadowHostEl);
	  var containerEl = document.getElementById('with-shadow-dom');
	  var focusTrap = createFocusTrap$5('#with-shadow-dom', {
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

	var createFocusTrap$4 = require$$0.createFocusTrap;
	var negativeTabindex = function negativeTabindex() {
	  var container = document.getElementById('negative-tabindex');
	  var focusTrap = createFocusTrap$4('#negative-tabindex', {
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

	var createFocusTrap$3 = require$$0.createFocusTrap;
	var negativeTabindexLast = function negativeTabindexLast() {
	  var container = document.getElementById('negative-tabindex-last');
	  var focusTrap = createFocusTrap$3('#negative-tabindex-last', {
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

	var createFocusTrap$2 = require$$0.createFocusTrap;
	var positiveTabindex = function positiveTabindex() {
	  var container = document.getElementById('positive-tabindex');
	  var focusTrap = createFocusTrap$2(container, {
	    onActivate: function onActivate() {
	      return container.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    }
	  });
	  document.getElementById('activate-positive-tabindex').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-positive-tabindex').addEventListener('click', focusTrap.deactivate);
	};

	var createFocusTrap$1 = require$$0.createFocusTrap;
	var withOpenWebComponent = function withOpenWebComponent() {
	  var container = document.getElementById('with-open-web-component');
	  customElements.define('open-web-component', /*#__PURE__*/function (_HTMLElement) {
	    function _class() {
	      _classCallCheck(this, _class);
	      return _callSuper(this, _class, arguments);
	    }
	    _inherits(_class, _HTMLElement);
	    return _createClass(_class, [{
	      key: "connectedCallback",
	      value: function connectedCallback() {
	        this.attachShadow({
	          mode: 'open'
	        });
	        this.shadowRoot.innerHTML = "\n          <p>\n            <button id=\"with-open-web-component-button\">open-web-component</button>\n          </p>\n        ";
	      }
	    }]);
	  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement)));
	  container.innerHTML = "\n    <button>button 1</button>\n    <button>button 2</button>\n    <button>button 3</button>\n    <open-web-component></open-web-component>\n    <button>button 4</button>\n    <button>button 5</button>\n    <p>\n      <button id=\"deactivate-with-open-web-component\" aria-describedby=\"with-open-web-component-heading\">\n        deactivate trap\n      </button>\n    </p>\n  ";
	  var focusTrap = createFocusTrap$1('#with-open-web-component', {
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

	var createFocusTrap = require$$0.createFocusTrap;
	var inert = function inert() {
	  var container = document.getElementById('inert');
	  var focusTrap = createFocusTrap('#inert', {
	    onActivate: function onActivate() {
	      return container.classList.add('is-active');
	    },
	    onDeactivate: function onDeactivate() {
	      return container.classList.remove('is-active');
	    }
	  });
	  document.getElementById('activate-inert').addEventListener('click', focusTrap.activate);
	  document.getElementById('deactivate-inert').addEventListener('click', focusTrap.deactivate);
	};

	_default();
	globalTrapStack();
	animatedDialog();
	animatedTrigger();
	_escapeDeactivates();
	escapeKeyCancelation();
	initialElementNoEscape();
	trickyInitialFocus();
	initialSelectorWithFallback();
	initiallyFocusedContainer();
	hiddenTreasures();
	nested();
	sibling();
	inputActivation();
	delay();
	radio();
	iframe();
	allowOutsideClick();
	clickOutsideDeactivates();
	setReturnFocus();
	setReturnFocusFunction();
	noDelay();
	multipleElements();
	multipleElementsDelete();
	multipleElementsDeleteAll();
	multipleElementsMultipleTraps();
	multipleTrapsManualPause();
	arrowKeys();
	domRemove();
	isolateSubtree();

	//
	// ❗️ MANUALLY TESTED DEMOS ❗️
	// These are demos that can't be auto-tested in JSDom (Jest) or Cypress, typically
	//  because of tab handling.
	//
	// Consider running them in SAFARI to also check, at the same, that features work
	//  under this browser, which tends to be a late adopter of newer Web APIs.
	//  Cypress doesn't support Safari yet, so tests can't be automated.
	//

	// loading this in a Cypress env causes Chrome to fail in GitHub CI (even with
	//  the `"chromeWebSecurity": false` option set in the cypress.json config file),
	//  and causes FireFox to fail both locally and in CI due to security context
	//  violations; but it's still a good demo to have
	{
	  // TEST MANUALLY (causes Cypress to fail due to security context violations)
	  // http://localhost:9966/#demo-in-iframe
	  inIframe();
	}

	// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
	// http://localhost:9966/#demo-aesd
	activationElementShadowDom();

	// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
	// http://localhost:9966/#demo-in-open-shadow-dom
	inOpenShadowDom();

	// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
	// http://localhost:9966/#demo-with-shadow-dom
	withShadowDom();

	// TEST MANUALLY (cypress-plugin-tab doesn't support non-tabbable but still focusable nodes)
	// http://localhost:9966/#demo-negative-tabindex
	negativeTabindex();

	// TEST MANUALLY (cypress-plugin-tab doesn't support non-tabbable but still focusable nodes)
	// http://localhost:9966/#demo-negative-tabindex-last
	negativeTabindexLast();

	// TEST MANUALLY (cypress-plugin-tab doesn't support non-tabbable but still focusable nodes)
	// - Check tabbing FWD from the "tabindex -1" button moves focus to "tabindex 3" button.
	// - Check tabbing BWD from "tabindex -1" moves to "tabindex 1".
	// - Rest is covered by a Cypress test.
	// http://localhost:9966/#demo-positive-tabindex
	positiveTabindex();

	// TEST MANUALLY (Cypress doesn't support Shadow DOM well)
	// http://localhost:9966/#demo-with-open-web-component
	withOpenWebComponent();

	// TEST MANUALLY (cypress-plugin-tab doesn't support inert)
	// http://localhost:9966/#demo-inert
	inert();

	return js;

})();
//# sourceMappingURL=demo-bundle.js.map
