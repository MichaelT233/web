// import react component to render store items
// paths that will be present during build process, not dev environment
import {renderStore} from './react.js'
import {getJSON, loadCart} from './utility.js'
// function made to load product data and render into elements in the store_view div
function load_all() {
    // call AJAX JSON get request to '/all' path and giving the build_store as callback
    getJSON('all', renderStore)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.load_all = load_all

// set the loadProducts function to global browser scope so it can be accessed from the DOM (onload)
window.loadCart = loadCart

if (window.localStorage.getItem('cart') == null) {
    window.localStorage.setItem('cart', '[]')
    window.localStorage.setItem('itemCount', '0')
    window.localStorage.setItem('totalCount', '0')
}