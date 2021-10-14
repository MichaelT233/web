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

window.addEventListener('load', () => {
    if (location.hash == '') {
        location.hash = 'home'
        return
    }
    console.log(location.hash)
    switch (location.hash) {
        case '#cart':
            store.loadCart()
            break
        case '#home':
            store.loadAll()
            break
        default:
            let pattern = /#category\d/
            if (pattern.test(location.hash)) {
                const category = location.hash.split('#')[1]
                store.loadCategory(category)
                return
            }
            pattern = /#search\W/
            if (pattern.test(location.hash)) {
                store.loadSearch()
            }
    }
})
window.addEventListener('hashchange', () => {
    console.log(location.hash)
    switch (location.hash) {
        case '#cart':
            store.loadCart()
            break
        case '#home':
            store.loadAll()
            break
        default:
            let pattern = /#category\d/
            if (pattern.test(location.hash)) {
                const category = location.hash.split('#')[1]
                store.loadCategory(category)
            }
            pattern = /#search\W/
            if (pattern.test(location.hash)) {
                store.loadSearch()
            }
    }
})