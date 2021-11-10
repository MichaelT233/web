// store and cart classes along with their react components
// import database api
import {DB} from './utility.js'
var db = new DB()
/*
class:
    main store page functionality
*/
export class Store {
    constructor() {
        if (location.pathname == '/') {
            if (history.state == null) {
                history.pushState({name: 'home'}, 'Home')
            }
        }
        if (localStorage.getItem('cart') == null) {
            localStorage.setItem('cart', '[]')
            localStorage.setItem('itemCount', '0')
            localStorage.setItem('totalCount', '0')
        }
    }
    // get data for all products and render on page
    loadAll() {
        ReactDOM.render(<h1>All Products</h1>, document.getElementById('productHead'))
        db.readTable((rows) => {
            const storeItems = <BuildStore rows={rows}/>
            ReactDOM.render(storeItems, document.getElementById('mainView'))
        })
        document.getElementById('searchBar').value = ''
    }
    // load products from search bar query
    loadSearch(pattern) {
        ReactDOM.render(<h1>Search Results for "{pattern}"</h1>, document.getElementById('productHead'))
        db.readSearchData(pattern, (rows) => {
            const storeItems = <BuildStore rows={rows}/>
            ReactDOM.render(storeItems, document.getElementById('mainView'))
        })
    }
    loadCategory(category) {
        ReactDOM.render(<h1>{category}</h1>, document.getElementById('productHead'))
        db.readRows('category', `'${category}'`, (rows) => {
            const storeItems = <BuildStore rows={rows}/>
            ReactDOM.render(storeItems, document.getElementById('mainView'))
        })
        document.getElementById('searchBar').value = ''
    }
    displayDropdown() {
        if (document.getElementById('dropdownContent').className == 'dropdownContentOn') {
            document.getElementById('dropdownContent').className = 'dropdownContentOff'
        }
        else {
            document.getElementById('dropdownContent').className = 'dropdownContentOn'
        }
    }
    /*
    object:
        shopping cart functionality
        cross-page data storage (localStorage)
            cart is formatted as 2D array(table) [[id, quantity], [id, quantity], [id, quantity]]
    */
    cart = {
        getItemCount() {
            return Number(localStorage.getItem('itemCount'))
        },
        getTotalCount() {
            return Number(localStorage.getItem('totalCount'))
        },
        getTable() {
            return JSON.parse(localStorage.getItem('cart'))
        },
        getItemQuantity(id) {
            var table = this.getTable()
            for (const row of table) {
                if (row[0] == id) {
                    return Number(row[1])
                }
            }
        },
        overwrite(table) {
            localStorage.setItem('cart', JSON.stringify(table))
        },
        addItemCount(value) {
            var itemCount = Number(localStorage.getItem('itemCount')) + value
            localStorage.setItem('itemCount', itemCount)
        },
        addTotalCount(value) {
            var totalCount = Number(localStorage.getItem('totalCount')) + value
            localStorage.setItem('totalCount', totalCount)
        },
        // add item and it's quantity to cart table
        addItem(id) {
            db.readRows('id', `'${id}'`, (rows) => {
                const stock = rows[0].stock 
                var table = this.getTable()
                // access item quantity, convention for DOM id is product id ending with q
                var quantity = Number(document.getElementById(id + 'q').value)
                for (const row of table) {
                    if (row[0] == id) {
                        console.log(stock)
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
        },
        // remove item from cart table
        deleteItem(id) {
            var table = this.getTable()
            for (const row of table) {
                if (row[0] == id) {
                    this.addTotalCount(-Number(row[1]))
                    table.splice(table.indexOf(row), 1)
                    this.overwrite(table)
                    this.addItemCount(-1)
                    this.load()
                    console.log(localStorage)
                    return
                }
            }
        },
        // increment an item's quantity
        incItem(id) {
            db.readRows('id', `'${id}'`, (rows) => {
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
                            this.load()
                            console.log(localStorage)
                            return
                        }
                    }
                }
                console.log(localStorage)
            })
        },
        // decrement an item's quantity
        decItem(id) {
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
                        this.load()
                        console.log(localStorage)
                        return
                    }
                    else {
                        quantity = Number(row[1]) - 1
                        row[1] = `${quantity}`
                        this.overwrite(table)
                        this.load()
                        console.log(localStorage)
                        return
                    }
                }
            }
        },
        // load product data for cart items
        load() {
            if (this.getItemCount() != 0) {
                db.readCartData((rows) => {
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
}
var store = new Store()
// react component: build main store page items
function BuildStore(props) {
    const roots = props.rows.map((row) =>    
    <div key={row.id} className="product" id={row.id}>
        {/*product image source*/}
        <img alt={row.image_path} src={row.image_path}/>
        {/*wrapper for non-image content of a store item*/}
        <div className="productText">
            {/*products title heading*/}
            <h2>{row.title}</h2>
            {/*product price*/}
            <h2>${row.price}</h2>
            {/*product stock*/}
            {row.stock > 0 && <p>In Stock ({row.stock})</p>}
            {row.stock == 0 && <p>Out of Stock</p>}
            {/*product description*/}
            <p>{row.descr}</p>
            {/*product quantity selector*/}
            <label htmlFor="quantity">Qty: </label>
            {/*quantity input*/}
            <input id={row.id + 'q'} type="number" name="quantity" min="1" defaultValue="1"/>
            {/*add to cart button*/}
            <button className="addCart" type="button" onClick={ () => store.cart.addItem(row.id)}>Add to Cart</button>
        </div>
    </div>)
    return (
        <div className='products'>
            {roots}
        </div>
    )
}
// react component: build cart page items
function BuildCart(props) {
    const roots = props.rows.map((row) =>    
    <div key={row.id} className="product" id={row.id}>
        {/*product image source*/}
        <img alt={row.image_path} src={row.image_path}/>
        {/*wrapper for non-image content of a store item*/}
        <div className="productText">
            {/*products title heading*/}
            <h2>{row.title}</h2>
            {/*product price*/}
            <h2>${row.price}</h2>
            {/*product stock*/}
            {row.stock > 0 && <p>In Stock ({row.stock})</p>}
            {row.stock == 0 && <p>Out of Stock</p>}
            {/*product description*/}
            <p>{row.descr}</p>
            {/*product quantity selector*/}
            <label htmlFor="quantity">Qty: </label>
            {/*decrement button*/}
            <button className="updateCart" type="button" onClick={ () => store.cart.decItem(row.id)}>-</button>
            {/*quantity display*/}
            <input id={row.id + 'q'} className="cartQuantity" type="number" name="quantity" value={store.cart.getItemQuantity(row.id)} disabled/>
            {/*increment button*/}
            <button className="updateCart" type="button" onClick={ () => store.cart.incItem(row.id)}>+</button>
            {/*delete button*/}
            <button className="removeCart" type="button" onClick={ () => store.cart.deleteItem(row.id)}>Delete</button>
        </div>
    </div>)
    return (
        <div className='products'>
            {roots}
        </div>
    )
}
// react component: build cart page header
function BuildCartHeader(props) {
    return (
        <div id='cartHead'>
            <h2>Total ${props.totalPrice}</h2>
            {props.totalQuantity == 1 && <a href = '/checkout'><button type='button'>Proceed to Checkout {'('+props.totalQuantity+' item)'}</button></a>}
            {props.totalQuantity != 1 && <a href = '/checkout'><button type='button'>Proceed to Checkout {'('+props.totalQuantity+' items)'}</button></a>}
        </div>
    )
}