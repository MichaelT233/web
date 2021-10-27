// store page module

// import primary classes
import {Store} from './react.js'

// instantiate new Store object
var store = new Store()

window.addEventListener('load', () => {
    document.getElementById('mainTitle').addEventListener('click', () => {
        store.loadAll()
        history.pushState({page: 'home'}, 'Home')
        console.log(history.state.page)
    })
    document.getElementById('cartIcon').addEventListener('click', () => {
        store.loadCart()
        history.pushState({page: 'cart'}, 'Cart')
        console.log(history.state.page)
    })
    const menu = document.getElementById('dropdownContent')
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].addEventListener('click', () => {
            store.loadCategory(`category${i}`)
            history.pushState({page: 'category', category: `category${i}`}, `Category${i}`)
            console.log(history.state.page)
        })
    }
    const searchBar = document.getElementById('searchBar')
    searchBar.addEventListener('change', () => {
        const pattern = searchBar.value
        store.loadSearch(pattern)
        history.pushState({page: 'search', pattern: pattern}, 'Search')
        console.log(history.state.page)
    })
    document.getElementById('menuIcon').addEventListener('click', () => {
        store.displayDropdown()
    })
    const dropdownContent = document.getElementById('dropdownContent')
    dropdownContent.addEventListener('click', () => {
        dropdownContent.className = 'dropdownContentOff'
    })
    if (history.state == null) {
        store.loadAll()
        history.pushState({page: 'home'}, 'Home')
    }
    else {
        switch (history.state.page) {
            case 'cart':
                store.loadCart()
                break
            case 'home':
                store.loadAll()
                break
            case 'category':
                store.loadCategory(history.state.category)
                break
            case 'search':
                store.loadSearch(history.state.pattern)
                document.getElementById('searchBar').value = history.state.pattern
                break
        }
    }
    console.log(history.state.page)
})
window.addEventListener('popstate', () => {
    if (history.state != null) {
        switch (history.state.page) {
            case 'cart':
                store.loadCart()
                break
            case 'home':
                store.loadAll()
                break
            case 'category':
                store.loadCategory(history.state.category)
                break
            case 'search':
                store.loadSearch(history.state.pattern)
                document.getElementById('searchBar').value = history.state.pattern
                break
        }
        console.log(history.state.page) 
    }
    else {
        history.go(-1)
    }
})