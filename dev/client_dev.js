// import react component to render store items
// paths that will be present during build process, not dev environment
import {build_store} from './react.js'
import {getJSON} from './utility.js'
// function made to load product data and render into elements in the store_view div
function load_all() {
    // call AJAX JSON get request to '/all' path and giving the build_store as callback
    getJSON('all', build_store)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.load_all = load_all
// function: load cart products on cart page
function load_cart() {
    // access cart item count
    var cart_count = window.localStorage.getItem('cart-count')
    // function: build URL query to send cart data to server
    function build_query() {
        // build query string from cart data and return it
        const query = '?cart=' + window.localStorage['cart']
        return query
    }
    // if cart is not initialized and not empty
    if (cart_count != null && cart_count != '0') {
        const query = build_query()
        console.log(window.localStorage)
        console.log(query)
        // call AJAX JSON get request to '/cart-data' path with query and passing build_store as callback
        getJSON('cart-data' + query, build_store)
    }
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM (onload)
window.load_cart = load_cart