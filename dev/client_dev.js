import {Store} from './react.js'
import {Cart} from './react.js'

// set the loadProducts function to global browser scope so it can be accessed from the DOM
//window.loadAll = loadAll

// set the loadProducts function to global browser scope so it can be accessed from the DOM
//window.loadCart = loadCart

let store = new Store()
window.store = store
let cart = new Cart()
window.cart = cart

// initialize cart parameters if cart is null
if (window.localStorage.getItem('cart') == null) {
    window.localStorage.setItem('cart', '[]')
    window.localStorage.setItem('itemCount', '0')
    window.localStorage.setItem('totalCount', '0')
}