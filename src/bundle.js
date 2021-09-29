/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./react.js":
/*!******************!*\
  !*** ./react.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "build_store": () => (/* binding */ build_store),
/* harmony export */   "clear_roots": () => (/* binding */ clear_roots)
/* harmony export */ });
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility.js */ "./utility.js");

let cart = new _utility_js__WEBPACK_IMPORTED_MODULE_0__.Cart();
function build_store(obj) {
  const store = React.createElement(Store_Item, {
    products: obj.products
  });
  ReactDOM.render(store, document.getElementById('store_view'));

  if (document.location.pathname == '/cart' && cart.getItemCount() != '0') {
    var totalPrice = 0.0;

    for (const row of obj.products) {
      totalPrice += Number(row.price) * cart.getItemQuantity(row.id);
    }

    totalPrice = totalPrice.toFixed(2);
    const head = React.createElement(Build_Head, {
      totalPrice: totalPrice,
      totalQuantity: cart.getTotalCount()
    });
    ReactDOM.render(head, document.getElementById('cart_head'));
  }
}
function clear_roots() {
  ReactDOM.render(React.createElement("div", null), document.getElementById('cart_head'));
  ReactDOM.render(React.createElement("div", null), document.getElementById('store_view'));
}

function Store_Item(props) {
  const roots = props.products.map(row => React.createElement("div", {
    key: row.id,
    className: "store_item",
    id: row.id
  }, React.createElement("img", {
    alt: row.image_path,
    src: row.image_path,
    className: "product_image"
  }), React.createElement("div", {
    className: "product_text"
  }, React.createElement("h2", null, row.title), React.createElement("h2", null, "$", row.price), React.createElement("p", null, row.description), React.createElement("label", {
    htmlFor: "quantity"
  }, "Qty: "), document.location.pathname == '/cart' && React.createElement("button", {
    className: "update_cart",
    type: "button",
    onClick: () => cart.decItem(row.id)
  }, "-"), document.location.pathname == '/' && React.createElement("input", {
    id: row.id + 'q',
    type: "number",
    name: "quantity",
    min: "1",
    defaultValue: "1"
  }), document.location.pathname == '/cart' && React.createElement("input", {
    id: row.id + 'q',
    className: "cart_quantity",
    type: "number",
    name: "quantity",
    value: cart.getItemQuantity(row.id),
    disabled: true
  }), document.location.pathname == '/' && React.createElement("button", {
    className: "add_cart",
    type: "button",
    onClick: () => cart.addItem(row.id)
  }, "Add to Cart"), document.location.pathname == '/cart' && React.createElement("button", {
    className: "update_cart",
    type: "button",
    onClick: () => cart.incItem(row.id)
  }, "+"), document.location.pathname == '/cart' && React.createElement("button", {
    className: "remove_cart",
    type: "button",
    onClick: () => cart.deleteItem(row.id)
  }, "Delete"))));
  return React.createElement("div", null, roots);
}

function Build_Head(props) {
  return React.createElement("div", {
    id: "cart_head"
  }, React.createElement("h2", null, "Total $", props.totalPrice), props.totalQuantity == 1 && React.createElement("button", {
    type: "button"
  }, "Proceed to Checkout ", '(' + props.totalQuantity + ' item)'), props.totalQuantity != 1 && React.createElement("button", {
    type: "button"
  }, "Proceed to Checkout ", '(' + props.totalQuantity + ' items)'));
}


/***/ }),

/***/ "./utility.js":
/*!********************!*\
  !*** ./utility.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cart": () => (/* binding */ Cart),
/* harmony export */   "loadCart": () => (/* binding */ loadCart),
/* harmony export */   "getJSON": () => (/* binding */ getJSON)
/* harmony export */ });
/* harmony import */ var _react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react.js */ "./react.js");

class Cart {
  getItemCount() {
    return Number(window.localStorage.getItem('itemCount'));
  }

  getTotalCount() {
    return Number(window.localStorage.getItem('totalCount'));
  }

  getTable() {
    return JSON.parse(window.localStorage.getItem('cart'));
  }

  write(table) {
    window.localStorage.setItem('cart', JSON.stringify(table));
  }

  addItemCount(value) {
    var itemCount = Number(window.localStorage.getItem('itemCount')) + value;
    window.localStorage.setItem('itemCount', itemCount);
  }

  addTotalCount(value) {
    var totalCount = Number(window.localStorage.getItem('totalCount')) + value;
    window.localStorage.setItem('totalCount', totalCount);
  }

  addItem(id) {
    var table = this.getTable();
    var quantity = Number(document.getElementById(id + 'q').value);
    this.addTotalCount(quantity);

    for (const item of table) {
      if (item[0] == id) {
        quantity += Number(item[1]);
        item[1] = `${quantity}`;
        this.write(table);
        console.log(window.localStorage);
        return;
      }
    }

    table.push([id, quantity]);
    this.write(table);
    this.addItemCount(1);
    console.log(window.localStorage);
  }

  deleteItem(id) {
    var table = this.getTable();

    for (const item of table) {
      if (item[0] == id) {
        this.addTotalCount(-Number(item[1]));
        table.splice(table.indexOf(item), 1);
        this.write(table);
        this.addItemCount(-1);
        loadCart();
        console.log(window.localStorage);
        return;
      }
    }
  }

  incItem(id) {
    this.addTotalCount(1);
    var quantity = 0;
    var table = this.getTable();

    for (const item of table) {
      if (item[0] == id) {
        quantity = Number(item[1]) + 1;
        item[1] = `${quantity}`;
        this.write(table);
        loadCart();
        console.log(window.localStorage);
        return;
      }
    }
  }

  decItem(id) {
    this.addTotalCount(-1);
    var quantity = 0;
    var table = this.getTable();

    for (const item of table) {
      if (item[0] == id) {
        if (item[1] == 1) {
          table.splice(table.indexOf(item), 1);
          this.write(table);
          this.addItemCount(-1);
          loadCart();
          console.log(window.localStorage);
          return;
        }

        quantity = Number(item[1]) - 1;
        item[1] = `${quantity}`;
        this.write(table);
        loadCart();
        console.log(window.localStorage);
        return;
      }
    }
  }

  getItemQuantity(id) {
    var table = this.getTable();

    for (const item of table) {
      if (item[0] == id) {
        return Number(item[1]);
      }
    }
  }

}
function loadCart() {
  if (window.localStorage.getItem('itemCount') != '0') {
    getJSON('cart-data' + buildQuery(), _react_js__WEBPACK_IMPORTED_MODULE_0__.build_store);
    return;
  } else {
    (0,_react_js__WEBPACK_IMPORTED_MODULE_0__.clear_roots)();
  }
}

function buildQuery() {
  const query = '?cart=' + window.localStorage.getItem('cart');
  console.log(query);
  return query;
}

function getJSON(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.onreadystatechange = function ready() {
    if (request.readyState == XMLHttpRequest.DONE) {
      const obj = JSON.parse(request.responseText);
      callback(obj);
    }
  };

  request.send();
}


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
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react.js */ "./react.js");
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility.js */ "./utility.js");



function load_all() {
  (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__.getJSON)('all', _react_js__WEBPACK_IMPORTED_MODULE_0__.build_store);
}

window.load_all = load_all;
window.loadCart = _utility_js__WEBPACK_IMPORTED_MODULE_1__.loadCart;

if (window.localStorage.getItem('cart') == null) {
  window.localStorage.setItem('cart', '[]');
  window.localStorage.setItem('itemCount', '0');
  window.localStorage.setItem('totalCount', '0');
}

})();

/******/ })()
;