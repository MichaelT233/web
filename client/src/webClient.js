// import classes
import {Store, Cart} from './store.jsx'
import {Checkout} from './checkout.jsx'
var cart = new Cart()
var store = new Store()
var checkout = new Checkout()
// main control mechanism
class StateController {
    // browser url path is state of this unit
    setPathState() {
        switch (location.pathname) {
            case '/':
                window.addEventListener('load', () => {
                    /***********************************/
                    document.getElementById('mainTitle').addEventListener('click', () => {
                        store.loadAll()
                        history.pushState({name: 'home'}, 'Home')
                        console.log(history.state.name)
                    })
                    document.getElementById('cartIcon').addEventListener('click', () => {
                        cart.load()
                        history.pushState({name: 'cart'}, 'Cart')
                        console.log(history.state.name)
                    })
                    var menu = document.getElementById('dropdownContent')
                    for (let i = 0; i < menu.children.length; i++) {
                        menu.children[i].addEventListener('click', () => {
                            store.loadCategory(`category${i}`)
                            history.pushState({name: 'category', category: `category${i}`}, `Category${i}`)
                            console.log(history.state.name)
                        })
                    }
                    var searchBar = document.getElementById('searchBar')
                    searchBar.addEventListener('change', () => {
                        const pattern = searchBar.value
                        store.loadSearch(pattern)
                        history.pushState({name: 'search', pattern: pattern}, 'Search')
                        console.log(history.state.name)
                    })
                    document.getElementById('menuIcon').addEventListener('click', () => {
                        store.displayDropdown()
                    })
                    var dropdownContent = document.getElementById('dropdownContent')
                    dropdownContent.addEventListener('click', () => {
                        dropdownContent.className = 'dropdownContentOff'
                    })
                    /***********************************/
                    this.setStoreState()
                    console.log(history.state.name)
                })
                window.addEventListener('popstate', () => {
                    if (history.state != null) {
                        this.setStoreState()
                        console.log(history.state.name) 
                    }
                    else {
                        history.go(-1)
                    }
                })
                break
            case '/checkout':
                window.addEventListener('load', () => {
                    checkout.load()
                    document.getElementById('backIcon').addEventListener('click', () => {
                        history.go(-1)
                    })
                })                
                break
        }
    }
    setStoreState() {
        switch (history.state.name) {
            case 'home':
                store.loadAll()
                break
            case 'category':
                store.loadCategory(history.state.category)
                break
            case 'cart':
                cart.load()
                break
            case 'search':
                store.loadSearch(history.state.pattern)
                document.getElementById('searchBar').value = history.state.pattern
                break
        }
    }
}
// waterfall control from initial state
var control = new StateController()
control.setPathState()