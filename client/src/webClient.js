import {Store} from './store.jsx'

var store = new Store()

switch (location.pathname) {
    case '/':
        store.sideEffect()
        break
}