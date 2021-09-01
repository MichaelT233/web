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
/* harmony export */   "default": () => (/* binding */ getJSON)
/* harmony export */ });
// client scripts
// function for making AJAX requests for JSON objects from a given URL and then executes a given callback with access to said JSON data
function getJSON(url, callback) {
    // creating AJAX request object
    var request = new XMLHttpRequest()
    // calling open method, creating connection
    request.open("GET", url)
    // conditional requiring the request to be completed in order to execute given callback
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            // ASYNC
            // converting the response text (which is in JSON format) into an actual JSON reference
            const obj = JSON.parse(request.responseText)
            // callback is.. called, with the JSON as it's argument
            callback(obj)
        }
    }
    // request being sent to server, executes before async callback above
    request.send()
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


function loadProducts() {
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
        class: "store_item"
      }, React.createElement("h2", null, props.title), React.createElement("img", {
        src: props.image_path,
        alt: "test image",
        class: "product_image"
      }), React.createElement("p", null, props.price), React.createElement("p", null, props.description), React.createElement("label", {
        for: "quantity"
      }, "Qty:"), React.createElement("input", {
        type: "number",
        name: "quantity",
        min: "1"
      }), React.createElement("button", {
        type: "button"
      }, "Add to Cart"));
    }

    i = 0;

    while (i < obj.products.length) {
      var item = React.createElement(Store_Item, {
        title: obj.products[i].name,
        description: obj.products[i].description,
        price: obj.products[i].price,
        image_path: obj.products[i].image_path
      });
      ReactDOM.render(item, document.getElementById('store_item' + i));
      i++;
    }
  }

  (0,_utility_js__WEBPACK_IMPORTED_MODULE_0__.default)('db', build_store);
}

window.loadProducts = loadProducts;

})();

/******/ })()
;