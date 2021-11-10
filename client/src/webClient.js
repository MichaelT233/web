// web client
import {Store} from './store.jsx'
import {Checkout} from './checkout.jsx'
// initialize state objects
var store = new Store()
var checkout = new Checkout()
// head controller class
class Controller {
    constructor() {
        if (localStorage.getItem('state') == null) {
            localStorage.setItem('state', 'start')
        }
    }
    state = {
        behavior: localStorage.getItem('state'),
        ui: history.state.name
    }
    instructionTable = {
        behavior: [
            {input: '/', state: 'start', instruction: ()=>this.writeBehavior('store'), newState: 'store'},
            {input: '/', state: 'store', instruction: ()=>this.writeBehavior('store'), newState: 'store'},
            {input: '/', state: 'checkout', instruction: ()=>this.writeBehavior('store'), newState: 'store'},
            {input: '/checkout', state: 'start', instruction: ()=>location.pathname='/', newState: 'store'},
            {input: '/checkout', state: 'store', instruction: ()=>this.writeBehavior('checkout'), newState: 'checkout'},
            {input: '/checkout', state: 'checkout', instruction: ()=>this.writeBehavior('checkout'), newState: 'checkout'},
        ],
        ui: [
            {input: 'clickTitle', state: 'home', instruction: ()=>this.writeUI('home'), newState: 'home'},
            {input: 'clickTitle', state: 'cart', instruction: ()=>this.writeUI('home'), newState: 'home'},
            {input: 'clickTitle', state: 'search', instruction: ()=>this.writeUI('home'), newState: 'home'},
            {input: 'clickTitle', state: 'category', instruction: ()=>this.writeUI('home'), newState: 'home'},
            {input: 'clickCart', state: 'home', instruction: ()=>this.writeUI('cart'), newState: 'cart'},
            {input: 'clickCart', state: 'cart', instruction: ()=>this.writeUI('cart'), newState: 'cart'},
            {input: 'clickCart', state: 'search', instruction: ()=>this.writeUI('cart'), newState: 'cart'},
            {input: 'clickCart', state: 'category', instruction: ()=>this.writeUI('cart'), newState: 'cart'},
            {input: 'clickCategory', state: 'home', instruction: (params)=>this.writeUI('category', params), newState: 'category'},
            {input: 'clickCategory', state: 'cart', instruction: (params)=>this.writeUI('category', params), newState: 'category'},
            {input: 'clickCategory', state: 'search', instruction: (params)=>this.writeUI('category', params), newState: 'category'},
            {input: 'clickCategory', state: 'category', instruction: (params)=>this.writeUI('category', params), newState: 'category'},
            {input: 'search', state: 'home', instruction: (params)=>this.writeUI('search', params), newState: 'search'},
            {input: 'search', state: 'cart', instruction: (params)=>this.writeUI('search', params), newState: 'search'},
            {input: 'search', state: 'search', instruction: (params)=>this.writeUI('search', params), newState: 'search'},
            {input: 'search', state: 'category', instruction: (params)=>this.writeUI('search', params), newState: 'search'},
            {input: 'popstate', state: 'home', instruction: ()=>store.loadAll(), newState: 'home'},
            {input: 'popstate', state: 'cart', instruction: ()=>store.cart.load(), newState: 'cart'},
            {input: 'popstate', state: 'search', instruction: ()=>{store.loadSearch(history.state.pattern);document.getElementById('searchBar').value=history.state.pattern}, newState: 'search'},
            {input: 'popstate', state: 'category', instruction: ()=>store.loadCategory(history.state.category), newState: 'category'}
        ]
    }
    controlLayer(layer, input, params) {
        if (layer == 'ui') {
            this.state.ui = history.state.name
        }
        for (const row of this.instructionTable[layer]) {
            if (input == row.input && this.state[layer] == row.state) {
                console.log(row.instruction)
                row.instruction(params)
                if (layer == 'behavior') {
                    localStorage.setItem('state', row.newState)
                }
                this.state[layer] = row.newState
                return
            }
        }
    }
    writeBehavior(state) {
        switch (state) {
            case 'store':
                window.addEventListener('load', () => {
                    /***********************************/
                    document.getElementById('mainTitle').addEventListener('click', () => {
                        this.controlLayer('ui', 'clickTitle')
                    })
                    document.getElementById('cartIcon').addEventListener('click', () => {
                        this.controlLayer('ui', 'clickCart')
                    })
                    var menu = document.getElementById('dropdownContent')
                    for (let i = 0; i < menu.children.length; i++) {
                        menu.children[i].addEventListener('click', () => {
                            this.controlLayer('ui', 'clickCategory', i)
                        })
                    }
                    var searchBar = document.getElementById('searchBar')
                    searchBar.addEventListener('change', () => {
                        const pattern = searchBar.value
                        this.controlLayer('ui', 'search', pattern)
                    })
                    document.getElementById('menuIcon').addEventListener('click', () => {
                        store.displayDropdown()
                    })
                    var dropdownContent = document.getElementById('dropdownContent')
                    dropdownContent.addEventListener('click', () => {
                        dropdownContent.className = 'dropdownContentOff'
                    })
                    /***********************************/
                    this.controlLayer('ui', 'popstate')
                })
                window.addEventListener('popstate', () => {
                    if (history.state != null) {
                        this.controlLayer('ui', 'popstate')
                    }
                    else {
                        history.go(-1)
                    }
                })
                break
            case 'checkout':
                window.addEventListener('load', () => {
                    checkout.load()
                    document.getElementById('backIcon').addEventListener('click', () => {
                        history.go(-1)
                    })
                })                
                break
        }
    }
    writeUI(pageState, params) {
        switch (this.state.behavior) {
            case 'store':
                switch (pageState) {
                    case 'home':
                        store.loadAll()
                        history.pushState({name: 'home'}, 'Home')
                        break
                    case 'category':
                        store.loadCategory(`category${params}`)
                        history.pushState({name: 'category', category: `category${params}`}, `Category${params}`)
                        break
                    case 'cart':
                        store.cart.load()
                        history.pushState({name: 'cart'}, 'Cart')
                        break
                    case 'search':
                        store.loadSearch(params)
                        history.pushState({name: 'search', pattern: params}, 'Search')
                        break
                }
                break
        }
    }
    // db access object is used directly within state objects because of the data's async nature
}
// initialize web client
var webClient = new Controller()
// write client behavior to DOM based on url path
webClient.controlLayer('behavior', location.pathname)