// module class, state object
export class Module {
    constructor(name, startState) {
        this.name = name
        this.state = startState
        if (localStorage.getItem('cart') == null) {
            localStorage.setItem('cart', '[]')
            localStorage.setItem('itemCount', '0')
            localStorage.setItem('totalCount', '0')
        }
    }
    setState(state) {
        this.state = state
        history.state[this.name].state = state
    }
    readDB(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
    }
    readRows(column, field, callback) {
        this.readDB(`product-data?column=${column}&field=${field}`, callback)
    }
    readTable(callback) {
        this.readDB('product-data', callback)
    }
    readCartData(callback) {
        this.readDB('cart-data?cart=' + localStorage.getItem('cart'), callback)
    }
    readSearchData(pattern, callback) {
        this.readDB('search?column=title&field=' + pattern, callback)
    }
    getItemCount() {
        return Number(localStorage.getItem('itemCount'))
    }
    getTotalCount() {
        return Number(localStorage.getItem('totalCount'))
    }
    getTable() {
        return JSON.parse(localStorage.getItem('cart'))
    }
    getItemQuantity(id) {
        var table = this.getTable()
        for (const row of table) {
            if (row[0] == id) {
                return Number(row[1])
            }
        }
    }
    overwrite(table) {
        localStorage.setItem('cart', JSON.stringify(table))
    }
    addItemCount(value) {
        var itemCount = Number(localStorage.getItem('itemCount')) + value
        localStorage.setItem('itemCount', itemCount)
    }
    addTotalCount(value) {
        var totalCount = Number(localStorage.getItem('totalCount')) + value
        localStorage.setItem('totalCount', totalCount)
    }
    // add item and it's quantity to cart table
    addItem(id) {
        console.log('add'+id)
        this.readRows('id', `'${id}'`, (rows) => {
            const stock = rows[0].stock 
            var table = this.getTable()
            // access item quantity, convention for DOM id is product id ending with q
            var quantity = Number(document.getElementById(id + 'q').value)
            for (const row of table) {
                if (row[0] == id) {
                    var total = Number(row[1]) + quantity
                    if (total <= stock) {
                        this.addTotalCount(quantity)
                        quantity += Number(row[1])
                        row[1] = `${quantity}`
                        this.overwrite(table)
                        console.log(localStorage)
                        return
                    }
                    else if (Number(row[1]) == stock ) {
                        console.log(localStorage)
                        return
                    }
                    else if (total > stock) {
                        this.addTotalCount(stock - row[1])
                        row[1] = `${stock}`
                        this.overwrite(table)
                        console.log(localStorage)
                        return
                    }
                }
            }
            if (quantity <= stock) {
                this.addTotalCount(quantity)
                table.push([id, quantity])
                this.overwrite(table)
                this.addItemCount(1)
                console.log(localStorage)
                return
            }
            else if (quantity > stock) {
                this.addTotalCount(stock)
                table.push([id, stock])
                this.overwrite(table)
                this.addItemCount(1)
                console.log(localStorage)
                return
            }
            console.log(localStorage)
        })
    }
    // remove item from cart table
    deleteItem(id, render) {
        var table = this.getTable()
        for (const row of table) {
            if (row[0] == id) {
                this.addTotalCount(-Number(row[1]))
                table.splice(table.indexOf(row), 1)
                this.overwrite(table)
                this.addItemCount(-1)
                render()
                console.log(localStorage)
                return
            }
        }
    }
    // increment an item's quantity
    incItem(id, render) {
        this.readRows('id', `'${id}'`, (rows) => {
            const stock = rows[0].stock
            if (this.getItemQuantity(id) < stock) {
                this.addTotalCount(1)
                var quantity = 0
                var table = this.getTable()
                for (const row of table) {
                    if (row[0] == id) {
                        quantity = Number(row[1]) + 1
                        row[1] = `${quantity}`
                        this.overwrite(table)
                        render()
                        console.log(localStorage)
                        return
                    }
                }
            }
            console.log(localStorage)
        })
    }
    // decrement an item's quantity
    decItem(id, render) {
        if (this.getItemQuantity(id) == 0) {
            console.log(localStorage)
            return
        }
        this.addTotalCount(-1)
        var quantity = 0
        var table = this.getTable()
        for (const row of table) {
            if (row[0] == id) {
                if (row[1] == 1) {
                    table.splice(table.indexOf(row), 1)
                    this.overwrite(table)
                    this.addItemCount(-1)
                    render()
                    console.log(localStorage)
                    return
                }
                else {
                    quantity = Number(row[1]) - 1
                    row[1] = `${quantity}`
                    this.overwrite(table)
                    render()
                    console.log(localStorage)
                    return
                }
            }
        }
    }
    // load product data for cart items
    load() {
        if (this.getItemCount() != 0) {
            this.readCartData((rows) => {
                const cartItems = <BuildCart rows={rows}/>
                ReactDOM.render(cartItems, document.getElementById('mainView'))
                var totalPrice = 0.0
                for (const row of rows) {
                    totalPrice += Number(row.price) * this.getItemQuantity(row.id)
                }
                totalPrice = totalPrice.toFixed(2)
                const head = <BuildCartHeader totalPrice={totalPrice} totalQuantity={this.getTotalCount()}/>
                ReactDOM.render(head, document.getElementById('productHead'))
            })
            document.getElementById('searchBar').value = ''
        }
        else {
            ReactDOM.render(<div></div>, document.getElementById('productHead'))
            ReactDOM.render(<div></div>, document.getElementById('mainView'))
            document.getElementById('searchBar').value = ''
        }
    }
}