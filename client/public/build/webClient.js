/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./checkout.jsx":
/*!**********************!*\
  !*** ./checkout.jsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Checkout": () => (/* binding */ Checkout)
/* harmony export */ });
class Checkout {
  load() {
    const checkout = React.createElement(BuildCheckout, null);
    ReactDOM.render(React.createElement("h1", null, "Enter your Information"), document.getElementById('productHead'));
    ReactDOM.render(checkout, document.getElementById('mainView'));
  }

  setBehavior() {
    window.addEventListener('load', () => {
      this.load();
      document.getElementById('backIcon').addEventListener('click', () => {
        history.go(-1);
      });
    });
  }

}

function BuildCheckout() {
  return React.createElement("div", {
    id: "form"
  }, React.createElement("form", {
    action: "/checkout-data",
    method: "POST"
  }, React.createElement("div", null, React.createElement("label", {
    htmlFor: "firstName"
  }, "First Name: "), React.createElement("input", {
    type: "text",
    id: "firstName"
  })), React.createElement("div", null, React.createElement("label", {
    htmlFor: "lastName"
  }, "Last Name: "), React.createElement("input", {
    type: "text",
    id: "lastName"
  })), React.createElement("div", null, React.createElement("label", {
    htmlFor: "address"
  }, "Address: "), React.createElement("input", {
    type: "text",
    id: "address"
  })), React.createElement("div", null, React.createElement("label", {
    htmlFor: "city"
  }, "City: "), React.createElement("input", {
    type: "text",
    id: "city"
  })), React.createElement("div", null, React.createElement("label", {
    htmlFor: "state"
  }, "State: "), React.createElement("input", {
    type: "text",
    id: "state"
  })), React.createElement("input", {
    type: "submit",
    value: "Submit"
  })));
}


/***/ }),

/***/ "./store.jsx":
/*!*******************!*\
  !*** ./store.jsx ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Store": () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility.js */ "./utility.js");

var module = new _utility_js__WEBPACK_IMPORTED_MODULE_0__.Module('store', 'home');
class Store {
  constructor() {
    if (location.pathname == '/') {
      if (history.state == null) {
        history.pushState({
          store: {
            state: 'home',
            category: null,
            pattern: null
          }
        }, 'Store');
      }
    }

    if (localStorage.getItem('cart') == null) {
      localStorage.setItem('cart', '[]');
      localStorage.setItem('itemCount', '0');
      localStorage.setItem('totalCount', '0');
    }
  }

  loadAll() {
    ReactDOM.render(React.createElement("h1", null, "All Products"), document.getElementById('productHead'));
    module.db.readTable(rows => {
      const storeItems = React.createElement(BuildStore, {
        rows: rows
      });
      ReactDOM.render(storeItems, document.getElementById('mainView'));
    });
    document.getElementById('searchBar').value = '';
  }

  loadSearch(pattern) {
    ReactDOM.render(React.createElement("h1", null, "Search Results for \"", pattern, "\""), document.getElementById('productHead'));
    module.db.readSearchData(pattern, rows => {
      const storeItems = React.createElement(BuildStore, {
        rows: rows
      });
      ReactDOM.render(storeItems, document.getElementById('mainView'));
    });
  }

  loadCategory(category) {
    ReactDOM.render(React.createElement("h1", null, category), document.getElementById('productHead'));
    module.db.readRows('category', `'${category}'`, rows => {
      const storeItems = React.createElement(BuildStore, {
        rows: rows
      });
      ReactDOM.render(storeItems, document.getElementById('mainView'));
    });
    document.getElementById('searchBar').value = '';
  }

  displayDropdown() {
    if (document.getElementById('dropdownContent').className == 'dropdownContentOn') {
      document.getElementById('dropdownContent').className = 'dropdownContentOff';
    } else {
      document.getElementById('dropdownContent').className = 'dropdownContentOn';
    }
  }

  renderState() {
    switch (history.state.store.state) {
      case 'home':
        store.loadAll();
        break;

      case 'cart':
        store.cart.load();
        break;

      case 'search':
        store.loadSearch(history.state.store.pattern);
        document.getElementById('searchBar').value = history.state.store.pattern;
        break;

      case 'category':
        store.loadCategory(history.state.store.category);
        break;
    }
  }

  setBehavior() {
    window.addEventListener('load', () => {
      document.getElementById('mainTitle').addEventListener('click', () => {
        this.loadAll();
        history.pushState({
          store: {
            state: 'home'
          }
        }, 'Store');
      });
      document.getElementById('cartIcon').addEventListener('click', () => {
        this.cart.load();
        history.pushState({
          store: {
            state: 'cart'
          }
        }, 'Store');
      });
      var menu = document.getElementById('dropdownContent');

      for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].addEventListener('click', () => {
          this.loadCategory(`category${i}`);
          history.pushState({
            store: {
              state: 'category',
              category: `category${i}`
            }
          }, 'Store');
        });
      }

      var searchBar = document.getElementById('searchBar');
      searchBar.addEventListener('change', () => {
        const pattern = searchBar.value;
        this.loadSearch(pattern);
        history.pushState({
          store: {
            state: 'search',
            pattern: pattern
          }
        }, 'Store');
      });
      document.getElementById('menuIcon').addEventListener('click', () => {
        this.displayDropdown();
      });
      var dropdownContent = document.getElementById('dropdownContent');
      dropdownContent.addEventListener('click', () => {
        dropdownContent.className = 'dropdownContentOff';
      });
      this.renderState();
      window.addEventListener('popstate', () => {
        this.renderState();
      });
    });
  }

  cart = {
    getItemCount() {
      return Number(localStorage.getItem('itemCount'));
    },

    getTotalCount() {
      return Number(localStorage.getItem('totalCount'));
    },

    getTable() {
      return JSON.parse(localStorage.getItem('cart'));
    },

    getItemQuantity(id) {
      var table = this.getTable();

      for (const row of table) {
        if (row[0] == id) {
          return Number(row[1]);
        }
      }
    },

    overwrite(table) {
      localStorage.setItem('cart', JSON.stringify(table));
    },

    addItemCount(value) {
      var itemCount = Number(localStorage.getItem('itemCount')) + value;
      localStorage.setItem('itemCount', itemCount);
    },

    addTotalCount(value) {
      var totalCount = Number(localStorage.getItem('totalCount')) + value;
      localStorage.setItem('totalCount', totalCount);
    },

    addItem(id) {
      module.db.readRows('id', `'${id}'`, rows => {
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
              console.log(localStorage);
              return;
            } else if (Number(row[1]) == stock) {
              console.log(localStorage);
              return;
            } else if (total > stock) {
              this.addTotalCount(stock - row[1]);
              row[1] = `${stock}`;
              this.overwrite(table);
              console.log(localStorage);
              return;
            }
          }
        }

        if (quantity <= stock) {
          this.addTotalCount(quantity);
          table.push([id, quantity]);
          this.overwrite(table);
          this.addItemCount(1);
          console.log(localStorage);
          return;
        } else if (quantity > stock) {
          this.addTotalCount(stock);
          table.push([id, stock]);
          this.overwrite(table);
          this.addItemCount(1);
          console.log(localStorage);
          return;
        }

        console.log(localStorage);
      });
    },

    deleteItem(id) {
      var table = this.getTable();

      for (const row of table) {
        if (row[0] == id) {
          this.addTotalCount(-Number(row[1]));
          table.splice(table.indexOf(row), 1);
          this.overwrite(table);
          this.addItemCount(-1);
          this.load();
          console.log(localStorage);
          return;
        }
      }
    },

    incItem(id) {
      module.db.readRows('id', `'${id}'`, rows => {
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
              this.load();
              console.log(localStorage);
              return;
            }
          }
        }

        console.log(localStorage);
      });
    },

    decItem(id) {
      if (this.getItemQuantity(id) == 0) {
        console.log(localStorage);
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
            this.load();
            console.log(localStorage);
            return;
          } else {
            quantity = Number(row[1]) - 1;
            row[1] = `${quantity}`;
            this.overwrite(table);
            this.load();
            console.log(localStorage);
            return;
          }
        }
      }
    },

    load() {
      if (this.getItemCount() != 0) {
        module.db.readCartData(rows => {
          const cartItems = React.createElement(BuildCart, {
            rows: rows
          });
          ReactDOM.render(cartItems, document.getElementById('mainView'));
          var totalPrice = 0.0;

          for (const row of rows) {
            totalPrice += Number(row.price) * this.getItemQuantity(row.id);
          }

          totalPrice = totalPrice.toFixed(2);
          const head = React.createElement(BuildCartHeader, {
            totalPrice: totalPrice,
            totalQuantity: this.getTotalCount()
          });
          ReactDOM.render(head, document.getElementById('productHead'));
        });
        document.getElementById('searchBar').value = '';
      } else {
        ReactDOM.render(React.createElement("div", null), document.getElementById('productHead'));
        ReactDOM.render(React.createElement("div", null), document.getElementById('mainView'));
        document.getElementById('searchBar').value = '';
      }
    }

  };
}
var store = new Store();

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
    onClick: () => store.cart.addItem(row.id)
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
    onClick: () => store.cart.decItem(row.id)
  }, "-"), React.createElement("input", {
    id: row.id + 'q',
    className: "cartQuantity",
    type: "number",
    name: "quantity",
    value: store.cart.getItemQuantity(row.id),
    disabled: true
  }), React.createElement("button", {
    className: "updateCart",
    type: "button",
    onClick: () => store.cart.incItem(row.id)
  }, "+"), React.createElement("button", {
    className: "removeCart",
    type: "button",
    onClick: () => store.cart.deleteItem(row.id)
  }, "Delete"))));
  return React.createElement("div", {
    className: "products"
  }, roots);
}

function BuildCartHeader(props) {
  return React.createElement("div", {
    id: "cartHead"
  }, React.createElement("h2", null, "Total $", props.totalPrice), props.totalQuantity == 1 && React.createElement("a", {
    href: "/checkout"
  }, React.createElement("button", {
    type: "button"
  }, "Proceed to Checkout ", '(' + props.totalQuantity + ' item)')), props.totalQuantity != 1 && React.createElement("a", {
    href: "/checkout"
  }, React.createElement("button", {
    type: "button"
  }, "Proceed to Checkout ", '(' + props.totalQuantity + ' items)')));
}


/***/ }),

/***/ "./utility.js":
/*!********************!*\
  !*** ./utility.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DB": () => (/* binding */ DB),
/* harmony export */   "Module": () => (/* binding */ Module)
/* harmony export */ });
class DB {
  readDB(url, callback) {
    fetch(url).then(response => response.json()).then(data => {
      callback(data);
    });
  }

  readRows(column, field, callback) {
    this.readDB(`product-data?column=${column}&field=${field}`, callback);
  }

  readTable(callback) {
    this.readDB('product-data', callback);
  }

  readCartData(callback) {
    this.readDB('cart-data?cart=' + localStorage.getItem('cart'), callback);
  }

  readSearchData(pattern, callback) {
    this.readDB('search?column=title&field=' + pattern, callback);
  }

}
class Module {
  constructor(name, startState) {
    this.name = name;
    this.state = startState;
  }

  setState(state) {
    this.state = state;
    history.state[this.name].state = state;
  }

  db = {
    readDB(url, callback) {
      fetch(url).then(response => response.json()).then(data => {
        callback(data);
      });
    },

    readRows(column, field, callback) {
      this.readDB(`product-data?column=${column}&field=${field}`, callback);
    },

    readTable(callback) {
      this.readDB('product-data', callback);
    },

    readCartData(callback) {
      this.readDB('cart-data?cart=' + localStorage.getItem('cart'), callback);
    },

    readSearchData(pattern, callback) {
      this.readDB('search?column=title&field=' + pattern, callback);
    }

  };
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
/*!**********************!*\
  !*** ./webClient.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.jsx */ "./store.jsx");
/* harmony import */ var _checkout_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkout.jsx */ "./checkout.jsx");



if (localStorage.getItem('state') == null) {
  localStorage.setItem('state', 'start');
}

var core = {
  state: localStorage.getItem('state'),
  input: location.pathname,

  setState(state) {
    this.state = state;
    localStorage.setItem('state', state);
  },

  loadModule(module) {
    module.setBehavior();
  }

};
console.log(core);
var store = new _store_jsx__WEBPACK_IMPORTED_MODULE_0__.Store();
var checkout = new _checkout_jsx__WEBPACK_IMPORTED_MODULE_1__.Checkout();

if (core.input == '/') {
  core.loadModule(store);
  core.setState('store');
}

if (core.input == '/checkout' && core.state != 'start') {
  core.loadModule(checkout);
  core.setState('checkout');
} else if (core.input == '/checkout' && core.state == 'start') {
  core.setState('store');
  location.pathname = '/';
}

})();

/******/ })()
;