import {loadCart, loadAll} from './react.js'

// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.loadAll = loadAll

// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.loadCart = loadCart

// initialize cart parameters if cart is null
if (window.localStorage.getItem('cart') == null) {
    window.localStorage.setItem('cart', '[]')
    window.localStorage.setItem('itemCount', '0')
    window.localStorage.setItem('totalCount', '0')
}