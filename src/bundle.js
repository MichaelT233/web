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
/* harmony export */   "add_cart": () => (/* binding */ add_cart)
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
  if (client_storage.getItem('cart-count') == null) {
    client_storage.setItem('cart-count', '1');
    client_storage.setItem('id0', id_num);
  } else {
    var count = client_storage.getItem('cart-count');
    client_storage.setItem(`id${count}`, id_num);
    count = Number(count);
    ++count;
    client_storage.setItem('cart-count', "" + count);
  }
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
    }, "Qty:"), React.createElement("input", {
      id: "quantity" + props.index,
      type: "number",
      name: "quantity",
      min: "1",
      defaultValue: "1"
    }), React.createElement("button", {
      type: "button",
      onClick: () => (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.add_cart)(props.id)
    }, "Add to Cart")));
  }

  i = 0;

  while (i < obj.products.length) {
    var index = `${i}`;
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
  function build_query() {
    const count = Number(window.localStorage.getItem('cart-count'));
    var query = "?";
    var i = 0;

    while (i < count) {
      query += `id${i}=`;
      query += window.localStorage.getItem(`id${i}`);
      query += "&";
      ++i;
    }

    return query;
  }

  (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.getJSON)('cart-data' + build_query(), build_store);
}

window.load_cart = load_cart;

})();

/******/ })()
;