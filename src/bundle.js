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
  var container = '';
  var i = 0;

  while (i < obj.products.length) {
    container += `<div class='item_wrapper' id='store_item${i}'></div>`;
    ++i;
  }

  var container_jsx = React.createElement("div", {
    id: "store_wrapper",
    dangerouslySetInnerHTML: {
      __html: container
    }
  });
  ReactDOM.render(container_jsx, document.getElementById('store_view'));
  i = 0;
  var total_price = 0;

  while (i < obj.products.length) {
    var item = React.createElement(Store_Item, {
      title: obj.products[i].title,
      price: obj.products[i].price,
      description: obj.products[i].descr,
      image_path: obj.products[i].image_path,
      id: obj.products[i].id,
      quantity: "" + cart.getItemQuantity(obj.products[i].id)
    });
    ReactDOM.render(item, document.getElementById('store_item' + i));
    total_price += Number(obj.products[i].price) * cart.getItemQuantity(obj.products[i].id);
    ++i;
  }

  if (document.location.pathname == '/cart' && cart.getItemCount() != '0') {
    total_price = total_price.toFixed(2);
    var head = React.createElement(Build_Head, {
      totalPrice: total_price,
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
  return React.createElement("div", {
    className: "store_item"
  }, React.createElement("img", {
    alt: props.image_path,
    src: props.image_path,
    className: "product_image"
  }), React.createElement("div", {
    className: "product_text"
  }, React.createElement("h2", null, props.title), React.createElement("h2", null, "$", props.price), React.createElement("p", null, props.description), React.createElement("label", {
    htmlFor: "quantity"
  }, "Qty: "), document.location.pathname == '/cart' && React.createElement("button", {
    className: "update_cart",
    type: "button",
    onClick: () => cart.decItem(props.id)
  }, "-"), document.location.pathname == '/' && React.createElement("input", {
    id: props.id,
    type: "number",
    name: "quantity",
    min: "1",
    defaultValue: "1"
  }), document.location.pathname == '/cart' && React.createElement("input", {
    id: props.id,
    className: "cart_quantity",
    type: "number",
    name: "quantity",
    value: props.quantity,
    disabled: true
  }), document.location.pathname == '/' && React.createElement("button", {
    className: "add_cart",
    type: "button",
    onClick: () => cart.addItem(props.id)
  }, "Add to Cart"), document.location.pathname == '/cart' && React.createElement("button", {
    className: "update_cart",
    type: "button",
    onClick: () => cart.incItem(props.id)
  }, "+"), document.location.pathname == '/cart' && React.createElement("button", {
    className: "remove_cart",
    type: "button",
    onClick: () => cart.deleteItem(props.id)
  }, "Delete")));
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
    var quantity = Number(document.getElementById(id).value);
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