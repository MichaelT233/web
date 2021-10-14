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
/* harmony export */   "Store": () => (/* binding */ Store),
/* harmony export */   "Cart": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility.js */ "./utility.js");

class Store {
  loadAll() {
    ReactDOM.render(React.createElement("h1", null, "All Products"), document.getElementById('productHead'));
    db.readTable(rows => {
      const storeItems = React.createElement(BuildStore, {
        rows: rows
      });
      ReactDOM.render(storeItems, document.getElementById('mainView'));
    });
  }

  loadSearch() {
    const pattern = location.hash.split('=')[1];
    ReactDOM.render(React.createElement("h1", null, "Search Results for \"", pattern, "\""), document.getElementById('productHead'));
    db.readSearchData(pattern, rows => {
      const storeItems = React.createElement(BuildStore, {
        rows: rows
      });
      ReactDOM.render(storeItems, document.getElementById('mainView'));
    });
  }

  loadCategory(category) {
    ReactDOM.render(React.createElement("h1", null, category), document.getElementById('productHead'));
    db.readRows('category', `'${category}'`, rows => {
      const storeItems = React.createElement(BuildStore, {
        rows: rows
      });
      ReactDOM.render(storeItems, document.getElementById('mainView'));
    });
  }

  loadCart() {
    if (cart.getItemCount() != 0) {
      db.readCartData(rows => {
        const cartItems = React.createElement(BuildCart, {
          rows: rows
        });
        ReactDOM.render(cartItems, document.getElementById('mainView'));
        var totalPrice = 0.0;

        for (const row of rows) {
          totalPrice += Number(row.price) * cart.getItemQuantity(row.id);
        }

        totalPrice = totalPrice.toFixed(2);
        const head = React.createElement(BuildCartHeader, {
          totalPrice: totalPrice,
          totalQuantity: cart.getTotalCount()
        });
        ReactDOM.render(head, document.getElementById('productHead'));
      });
    } else {
      this.clear();
    }
  }

  clear() {
    ReactDOM.render(React.createElement("div", null), document.getElementById('productHead'));
    ReactDOM.render(React.createElement("div", null), document.getElementById('mainView'));
  }

  displayDropdown() {
    if (document.getElementById('dropdownContent').className == 'dropdownContentOn') {
      document.getElementById('dropdownContent').className = 'dropdownContentOff';
    } else {
      document.getElementById('dropdownContent').className = 'dropdownContentOn';
    }
  }

}
class Cart {
  constructor() {
    if (window.localStorage.getItem('cart') == null) {
      window.localStorage.setItem('cart', '[]');
      window.localStorage.setItem('itemCount', '0');
      window.localStorage.setItem('totalCount', '0');
    }
  }

  getItemCount() {
    return Number(window.localStorage.getItem('itemCount'));
  }

  getTotalCount() {
    return Number(window.localStorage.getItem('totalCount'));
  }

  getTable() {
    return JSON.parse(window.localStorage.getItem('cart'));
  }

  getItemQuantity(id) {
    var table = this.getTable();

    for (const row of table) {
      if (row[0] == id) {
        return Number(row[1]);
      }
    }
  }

  overwrite(table) {
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
    db.readRows('id', `'${id}'`, rows => {
      const stock = rows[0].stock;
      var table = this.getTable();
      var quantity = Number(document.getElementById(id + 'q').value);

      for (const row of table) {
        if (row[0] == id) {
          console.log(stock);
          var total = Number(row[1]) + quantity;

          if (total <= stock) {
            this.addTotalCount(quantity);
            quantity += Number(row[1]);
            row[1] = `${quantity}`;
            this.overwrite(table);
            console.log(window.localStorage);
            return;
          } else if (Number(row[1]) == stock) {
            console.log(window.localStorage);
            return;
          } else if (total > stock) {
            this.addTotalCount(stock - row[1]);
            row[1] = `${stock}`;
            this.overwrite(table);
            console.log(window.localStorage);
            return;
          }
        }
      }

      if (quantity <= stock) {
        this.addTotalCount(quantity);
        table.push([id, quantity]);
        this.overwrite(table);
        this.addItemCount(1);
        console.log(window.localStorage);
        return;
      } else if (quantity > stock) {
        this.addTotalCount(stock);
        table.push([id, stock]);
        this.overwrite(table);
        this.addItemCount(1);
        console.log(window.localStorage);
        return;
      }

      console.log(window.localStorage);
    });
  }

  deleteItem(id) {
    var table = this.getTable();

    for (const row of table) {
      if (row[0] == id) {
        this.addTotalCount(-Number(row[1]));
        table.splice(table.indexOf(row), 1);
        this.overwrite(table);
        this.addItemCount(-1);
        store.loadCart();
        console.log(window.localStorage);
        return;
      }
    }
  }

  incItem(id) {
    db.readRows('id', `'${id}'`, rows => {
      const stock = rows[0].stock;

      if (this.getItemQuantity(id) < stock) {
        this.addTotalCount(1);
        var quantity = 0;
        var table = this.getTable();

        for (const row of table) {
          if (row[0] == id) {
            quantity = Number(row[1]) + 1;
            row[1] = `${quantity}`;
            this.overwrite(table);
            store.loadCart();
            console.log(window.localStorage);
            return;
          }
        }
      }

      console.log(window.localStorage);
    });
  }

  decItem(id) {
    if (this.getItemQuantity(id) == 0) {
      console.log(window.localStorage);
      return;
    }

    this.addTotalCount(-1);
    var quantity = 0;
    var table = this.getTable();

    for (const row of table) {
      if (row[0] == id) {
        if (row[1] == 1) {
          table.splice(table.indexOf(row), 1);
          this.overwrite(table);
          this.addItemCount(-1);
          store.loadCart();
          console.log(window.localStorage);
          return;
        } else {
          quantity = Number(row[1]) - 1;
          row[1] = `${quantity}`;
          this.overwrite(table);
          store.loadCart();
          console.log(window.localStorage);
          return;
        }
      }
    }
  }

}

function BuildStore(props) {
  const roots = props.rows.map(row => React.createElement("div", {
    key: row.id,
    className: "product",
    id: row.id
  }, React.createElement("img", {
    alt: row.image_path,
    src: row.image_path
  }), React.createElement("div", {
    className: "productText"
  }, React.createElement("h2", null, row.title), React.createElement("h2", null, "$", row.price), row.stock > 0 && React.createElement("p", null, "In Stock (", row.stock, ")"), row.stock == 0 && React.createElement("p", null, "Out of Stock"), React.createElement("p", null, row.descr), React.createElement("label", {
    htmlFor: "quantity"
  }, "Qty: "), React.createElement("input", {
    id: row.id + 'q',
    type: "number",
    name: "quantity",
    min: "1",
    defaultValue: "1"
  }), React.createElement("button", {
    className: "addCart",
    type: "button",
    onClick: () => cart.addItem(row.id)
  }, "Add to Cart"))));
  return React.createElement("div", {
    className: "products"
  }, roots);
}

function BuildCart(props) {
  const roots = props.rows.map(row => React.createElement("div", {
    key: row.id,
    className: "product",
    id: row.id
  }, React.createElement("img", {
    alt: row.image_path,
    src: row.image_path
  }), React.createElement("div", {
    className: "productText"
  }, React.createElement("h2", null, row.title), React.createElement("h2", null, "$", row.price), row.stock > 0 && React.createElement("p", null, "In Stock (", row.stock, ")"), row.stock == 0 && React.createElement("p", null, "Out of Stock"), React.createElement("p", null, row.descr), React.createElement("label", {
    htmlFor: "quantity"
  }, "Qty: "), React.createElement("button", {
    className: "updateCart",
    type: "button",
    onClick: () => cart.decItem(row.id)
  }, "-"), React.createElement("input", {
    id: row.id + 'q',
    className: "cartQuantity",
    type: "number",
    name: "quantity",
    value: cart.getItemQuantity(row.id),
    disabled: true
  }), React.createElement("button", {
    className: "updateCart",
    type: "button",
    onClick: () => cart.incItem(row.id)
  }, "+"), React.createElement("button", {
    className: "removeCart",
    type: "button",
    onClick: () => cart.deleteItem(row.id)
  }, "Delete"))));
  return React.createElement("div", {
    className: "products"
  }, roots);
}

function BuildCartHeader(props) {
  return React.createElement("div", {
    id: "cartHead"
  }, React.createElement("h2", null, "Total $", props.totalPrice), props.totalQuantity == 1 && React.createElement("button", {
    type: "button"
  }, "Proceed to Checkout ", '(' + props.totalQuantity + ' item)'), props.totalQuantity != 1 && React.createElement("button", {
    type: "button"
  }, "Proceed to Checkout ", '(' + props.totalQuantity + ' items)'));
}

let db = new _utility_js__WEBPACK_IMPORTED_MODULE_0__.DB();
let cart = new Cart();
let store = new Store();


/***/ }),

/***/ "./utility.js":
/*!********************!*\
  !*** ./utility.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DB": () => (/* binding */ DB)
/* harmony export */ });
class DB {
  readDB(url, callback) {
    fetch(url).then(response => response.json()).then(data => {
      callback(data);
    });
  }

  readRows(column, field, callback) {
    this.readDB(`product-data?column=${column}&field=${field}`, rows => {
      callback(rows);
    });
  }

  readTable(callback) {
    this.readDB('product-data', callback);
  }

  readCartData(callback) {
    this.readDB('cart-data?cart=' + window.localStorage.getItem('cart'), callback);
  }

  readSearchData(exp, callback) {
    console.log(exp);
    this.readDB('search?column=title&field=' + exp, callback);
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
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react.js */ "./react.js");


let store = new _react_js__WEBPACK_IMPORTED_MODULE_0__.Store();
let cart = new _react_js__WEBPACK_IMPORTED_MODULE_0__.Cart();
window.store = store;
window.cart = cart;
window.addEventListener('load', () => {
  if (location.hash == '') {
    location.hash = 'home';
    return;
  }

  console.log(location.hash);

  switch (location.hash) {
    case '#cart':
      store.loadCart();
      break;

    case '#home':
      store.loadAll();
      break;

    default:
      let pattern = /#category\d/;

      if (pattern.test(location.hash)) {
        const category = location.hash.split('#')[1];
        store.loadCategory(category);
        return;
      }

      pattern = /#search\W/;

      if (pattern.test(location.hash)) {
        store.loadSearch();
      }

  }
});
window.addEventListener('hashchange', () => {
  console.log(location.hash);

  switch (location.hash) {
    case '#cart':
      store.loadCart();
      break;

    case '#home':
      store.loadAll();
      break;

    default:
      let pattern = /#category\d/;

      if (pattern.test(location.hash)) {
        const category = location.hash.split('#')[1];
        store.loadCategory(category);
      }

      pattern = /#search\W/;

      if (pattern.test(location.hash)) {
        store.loadSearch();
      }

  }
});

})();

/******/ })()
;