/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model/condition.js":
/*!********************************!*\
  !*** ./src/model/condition.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var condition = {
  products: [{
    name: "Whitepeach",
    listImg: "http://placekitten.com/150/150?image=1",
    cartImg: "http://placekitten.com/50/50?image=1",
    price: 0.99,
    count: 0
  }, {
    name: "Tutou",
    listImg: "http://placekitten.com/150/150?image=2",
    cartImg: "http://placekitten.com/50/50?image=2",
    price: 2.73,
    count: 0
  }, {
    name: "Muffin",
    listImg: "http://placekitten.com/150/150?image=3",
    cartImg: "http://placekitten.com/50/50?image=3",
    price: 3.14,
    count: 0
  }],
  viewCart: false,
  getCartCount: function getCartCount() {
    var totalCount = 0;
    var products = condition.products;
    for (var i = 0; i < products.length; i++) {
      totalCount += products[i].count;
    }
    return totalCount;
  },
  getPerPrice: function getPerPrice(index) {
    var _condition$products$i = condition.products[index],
      count = _condition$products$i.count,
      price = _condition$products$i.price;
    return (count * price).toFixed(2);
  },
  getTotalPrice: function getTotalPrice() {
    var totalPrice = 0;
    var products = condition.products;
    for (var i = 0; i < products.length; i++) {
      totalPrice += products[i].count * products[i].price;
    }
    return totalPrice.toFixed(2);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (condition);

/***/ }),

/***/ "./src/view/render.js":
/*!****************************!*\
  !*** ./src/view/render.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _model_condition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/condition.js */ "./src/model/condition.js");

var productsEl = document.querySelector(".products");
var cartEl = document.querySelector(".cartlist");
function render() {
  if (_model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart) {
    renderCart(cartEl);
  } else {
    renderCartEmpty(cartEl);
  }
  renderProducts(productsEl);
}
function renderProducts(productsEl) {
  var listHtml = getListHtml();
  var viewCartBtn = getViewCartHtml();
  var productsHtml = "\n        <h2>Furry List</h2>\n        <ul class=\"lists\">".concat(listHtml, "</ul>\n        ").concat(viewCartBtn, "\n        ");
  productsEl.innerHTML = productsHtml;
}
function renderCartEmpty(cartEl) {
  cartEl.innerHTML = "";
}
function renderCart(cartEl) {
  var totalCount = _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCartCount();
  var cartListHtml;
  if (totalCount) {
    cartListHtml = getCartHtml();
  } else {
    cartListHtml = "<p>Cart is empty. Select some items.</p>";
  }
  cartEl.innerHTML = "\n    <h2>Shopping Cart</h2>\n    ".concat(cartListHtml, "\n    ");
}
function getListHtml() {
  var lists = [];
  var products = _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products;
  for (var index = 0; index < products.length; index++) {
    var product = products[index];
    lists.push("\n        <li class=\"product\">\n            <h3 data-index=\"".concat(index, "\">Name: ").concat(product.name, "</h3>\n            <img src=\"").concat(product.listImg, "\"/>\n            <p>&#128176 Price: $").concat(product.price, "</p>\n            <button \n              data-index=\"").concat(index, "\" class=\"add-to-cart\" type=\"button\">\n              &#128008 Add to cart\n            </button>\n        </li>\n        "));
  }
  return lists.join("");
}
function getViewCartHtml() {
  var totalCount = _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCartCount();
  var viewCartText = "View Cart";
  if (totalCount) {
    viewCartText = "View Cart (".concat(totalCount, ")");
  }
  var btnText;
  if (_model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart) {
    btnText = "Hide Cart";
  } else {
    btnText = viewCartText;
  }
  return "\n    <button type=\"button\" class=\"view-cart\">\n        &#128071".concat(btnText, "\n    </button>\n    ");
}
function getCartHtml() {
  var cartHtml = "";
  var productsInCart = _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products.filter(function (product) {
    return product.count > 0;
  });
  for (var index = 0; index < productsInCart.length; index++) {
    var product = productsInCart[index];
    var cartState = void 0;
    if (product.count) {
      cartState = "in-cart";
    } else {
      cartState = "not-in-cart";
    }
    cartHtml += "\n            <li class=\"cart ".concat(cartState, "\">\n                <h4 data-index=\"").concat(index, "\">\n                    ").concat(product.name, "\n                </h4>\n                <img src=\"").concat(product.cartImg, "\">\n                <div>\n                    <button data-index=\"").concat(index, "\" class=\"minus\" type=\"button\">-</button>\n                    <span>").concat(product.count, "</span>\n                    <button data-index=\"").concat(index, "\" class=\"add\" type=\"button\">+</button>\n                </div>\n                <p>&#128176; Price: $").concat(_model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPerPrice(index), "</p>\n            </li>\n        ");
  }
  cartHtml = "<ul class=\"carts\">".concat(cartHtml, "</ul>");
  var totalPriceHtml = "<p>&#127975; Total Price: $".concat(_model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalPrice(), "</p>");
  var checkoutBtn = "<button type=\"button\" class=\"checkout\">Checkout</button>";
  cartHtml += totalPriceHtml;
  cartHtml += checkoutBtn;
  return cartHtml;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/controller/cart.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_condition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/condition.js */ "./src/model/condition.js");
/* harmony import */ var _view_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/render.js */ "./src/view/render.js");


var appEl = document.querySelector("#app");
var handleClick = function handleClick(e) {
  var handleViewCartClick = function handleViewCartClick() {
    _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart = !_model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart;
  };
  var handleProductClick = function handleProductClick() {
    var index = e.target.dataset.index;
    _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].added = !_model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].added;
  };
  var handleAddToCartClick = function handleAddToCartClick() {
    var index = e.target.dataset.index;
    _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count = Math.max(1, _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count + 1);
  };
  var handleAddClick = function handleAddClick() {
    var index = e.target.dataset.index;
    _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count += 1;
  };
  var handleMinusClick = function handleMinusClick() {
    var index = e.target.dataset.index;
    _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count = Math.max(0, _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count - 1);
  };
  var handleCheckoutClick = function handleCheckoutClick() {
    _model_condition_js__WEBPACK_IMPORTED_MODULE_0__["default"].products.forEach(function (product) {
      product.count = 0;
    });
  };
  if (e.target.classList.contains("view-cart")) {
    handleViewCartClick();
  } else if (e.target.classList.contains("product")) {
    handleProductClick();
  } else if (e.target.classList.contains("add-to-cart")) {
    handleAddToCartClick();
  } else if (e.target.classList.contains("add")) {
    handleAddClick();
  } else if (e.target.classList.contains("minus")) {
    handleMinusClick();
  } else if (e.target.classList.contains("checkout")) {
    handleCheckoutClick();
  }
  (0,_view_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
};
appEl.addEventListener("click", handleClick);
(0,_view_render_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=cart.js.map