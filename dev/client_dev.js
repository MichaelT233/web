// import react component to render store items
// paths that will be present during build process, not dev environment
import {build_store} from './react.js'
import {getJSON, load_cart} from './utility.js'
// function made to load product data and render into elements in the store_view div
function load_all() {
    // call AJAX JSON get request to '/all' path and giving the build_store as callback
    getJSON('all', build_store)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.load_all = load_all

// set the loadProducts function to global browser scope so it can be accessed from the DOM (onload)
window.load_cart = load_cart