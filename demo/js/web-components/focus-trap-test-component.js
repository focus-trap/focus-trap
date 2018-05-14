'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FocusTrapTestComponent = function (_HTMLElement) {
  _inherits(FocusTrapTestComponent, _HTMLElement);

  function FocusTrapTestComponent() {
    _classCallCheck(this, FocusTrapTestComponent);

    var _this = _possibleConstructorReturn(this, (FocusTrapTestComponent.__proto__ || Object.getPrototypeOf(FocusTrapTestComponent)).call(this));

    _this.attachShadow({ mode: 'open' });

    var button = document.createElement('button');
    button.id = 'shadow-button';
    button.innerText = 'Shadow Button';
    _this.shadowRoot.appendChild(button);

    var defaultSlot = document.createElement('slot');
    _this.shadowRoot.appendChild(defaultSlot);
    return _this;
  }

  return FocusTrapTestComponent;
}(HTMLElement);

window.customElements.define('focus-trap-test-component', FocusTrapTestComponent);