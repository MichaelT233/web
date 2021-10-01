// main client module

// import primary classes
import {Store} from './react.js'
import {Cart} from './react.js'

// instantiate new Store object
let store = new Store()
// instantiate new Cart object
let cart = new Cart()
// make objects' scope accessible from DOM
window.store = store
window.cart = cart
// initialize localStorage parameters if cart is null
if (window.localStorage.getItem('cart') == null) {
    window.localStorage.setItem('cart', '[]')
    window.localStorage.setItem('itemCount', '0')
    window.localStorage.setItem('totalCount', '0')
}