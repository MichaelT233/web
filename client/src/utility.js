// module class, state object
export class Module {
    constructor(name, startState) {
        this.name = name
        this.state = startState
    }
    setState(state) {
        this.state = state
        history.state[this.name].state = state
    }
    db = {
        readDB(url, callback) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    callback(data)
                })
        },
        readRows(column, field, callback) {
            this.readDB(`product-data?column=${column}&field=${field}`, callback)
        },
        readTable(callback) {
            this.readDB('product-data', callback)
        },
        readCartData(callback) {
            this.readDB('cart-data?cart=' + localStorage.getItem('cart'), callback)
        },
        readSearchData(pattern, callback) {
            this.readDB('search?column=title&field=' + pattern, callback)
        }
    }
}