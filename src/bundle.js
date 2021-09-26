/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./utility.js":
/*!********************!*\
  !*** ./utility.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getJSON": () => (/* binding */ getJSON),
/* harmony export */   "add_cart": () => (/* binding */ add_cart),
/* harmony export */   "remove_cart": () => (/* binding */ remove_cart)
/* harmony export */ });
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
var client_storage = window.localStorage;
function add_cart(id_num) {
  var quantity = document.getElementById(id_num).value;
  var cart_count = client_storage.getItem('cart-count');

  if (cart_count == null || cart_count == '0') {
    client_storage.setItem('cart-count', '1');
    var cart_init = [[id_num, quantity]];
    cart_init = JSON.stringify(cart_init);
    client_storage.setItem('cart', cart_init);
  } else {
    var cart = JSON.parse(client_storage['cart']);

    for (const item of cart) {
      if (item[0] == id_num) {
        console.log(client_storage);
        return;
      }
    }

    cart.push([id_num, quantity]);
    cart = JSON.stringify(cart);
    client_storage.setItem(`cart`, cart);
    cart_count = Number(cart_count);
    ++cart_count;
    client_storage.setItem('cart-count', "" + cart_count);
  }

  console.log(client_storage);
}
function remove_cart(id_num) {
  var cart_count = client_storage.getItem('cart-count');

  if (cart_count != '0' && cart_count != null) {
    var cart = JSON.parse(client_storage['cart']);
    var i = 0;

    for (const item of cart) {
      if (item[0] == id_num) {
        cart.splice(cart.indexOf(item), 1);
        cart = JSON.stringify(cart);
        client_storage.setItem('cart', cart);
        cart_count = Number(cart_count);
        --cart_count;
        client_storage.setItem('cart-count', "" + cart_count);
        console.log(client_storage);
        return;
      }
    }
  }

  console.log(client_storage);
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
/*!******************!*\
  !*** ./react.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility.js */ "./utility.js");



function build_store(obj) {
  var container = `<div class='item_wrapper' id='store_item0'></div>`;
  var i = 1;

  while (i < obj.products.length) {
    container = container + `<div class='item_wrapper' id='store_item${i}'></div>`;
    i++;
  }

  var container_jsx = React.createElement("div", {
    id: "store_wrapper",
    dangerouslySetInnerHTML: {
      __html: container
    }
  });
  ReactDOM.render(container_jsx, document.getElementById('store_view'));

  function Store_Item(props) {
    var cart_count = window.localStorage.getItem('cart-count');
    var quantity = null;

    if (document.location.pathname == '/cart' && cart_count != null && cart_count != 0) {
      var cart = JSON.parse(window.localStorage['cart']);

      for (item of cart) {
        if (item[0] == props.id) {
          quantity = item[1];
        }
      }
    }

    console.log('q = ' + quantity);
    return React.createElement("div", {
      className: "store_item"
    }, React.createElement("img", {
      alt: props.image_path,
      src: props.image_path,
      className: "product_image"
    }), React.createElement("div", {
      className: "product_text"
    }, React.createElement("h2", null, props.title), React.createElement("h2", null, props.price), React.createElement("p", null, props.description), React.createElement("label", {
      htmlFor: "quantity"
    }, "Qty:"), document.location.pathname == '/' && React.createElement("input", {
      id: props.id,
      type: "number",
      name: "quantity",
      min: "1",
      defaultValue: "1"
    }), document.location.pathname == '/cart' && React.createElement("input", {
      id: props.id,
      type: "number",
      name: "quantity",
      defaultValue: quantity
    }), React.createElement("button", {
      className: "add_cart",
      type: "button",
      onClick: () => (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.add_cart)(props.id)
    }, "Add to Cart"), React.createElement("button", {
      className: "remove_cart",
      type: "button",
      onClick: () => (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.remove_cart)(props.id)
    }, "Remove from Cart")));
  }

  i = 0;

  while (i < obj.products.length) {
    var item = React.createElement(Store_Item, {
      title: obj.products[i].title,
      price: obj.products[i].price,
      description: obj.products[i].descr,
      image_path: obj.products[i].image_path,
      id: obj.products[i].id
    });
    ReactDOM.render(item, document.getElementById('store_item' + i));
    i++;
  }
}

function load_all() {
  (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.getJSON)('all', build_store);
}

window.load_all = load_all;

function load_cart() {
  var cart_count = window.localStorage.getItem('cart-count');

  function build_query() {
    const query = '?cart=' + window.localStorage['cart'];
    return query;
  }

  if (cart_count != null && cart_count != '0') {
    const query = build_query();
    console.log(window.localStorage);
    console.log(query);
    (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.getJSON)('cart-data' + query, build_store);
  }
}

window.load_cart = load_cart;

})();

/******/ })()
;