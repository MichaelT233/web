// web client
import {Store} from './store.jsx'
import {Checkout} from './checkout.jsx'

console.log(localStorage.getItem('state'))
if (localStorage.getItem('state') == null) {
    localStorage.setItem('state', 'start')
}
// core object
var core = {
    state: localStorage.getItem('state'),
    input: location.pathname,
    setState(state) {
        this.state = state
        localStorage.setItem('state', state)
    },
    loadModule(module) {
        module.setBehavior()
    }
}
console.log(core)
// initialize state objects
var store = new Store()
var checkout = new Checkout()
// top state level control flow
if (core.input == '/' && core.state == 'start') {
    console.log('load0')
    core.loadModule(store)
    core.setState('store')
}
else if (core.input == '/' && core.state == 'store') {
    console.log('load1')
    core.loadModule(store)
}
else if (core.input == '/' && core.state == 'checkout') {
    console.log('load2')
    core.loadModule(store)
    core.setState('store')
}
if (core.input == '/checkout' && core.state != 'start') {
    core.loadModule(checkout)
    core.setState('checkout')
}
else if (core.input == '/checkout' && core.state == 'start') {
    core.setState('store')
    location.pathname = '/'
}