// client modules

// import utility functions
import {accessProductDB, buildQuery} from './utility.js'
/*
class:
    main store page functionality
*/
export class Store {
    // get data for all products and pass this.#render as a callback
    loadAll() {
        accessProductDB('all', this.#render)
    }
    /*
    input: JSON object array where each item is a row object of column fields from the product database server
    fields: id, title, price, desc, imagePath
    */
    #render(rows) {
        const storeItems = <BuildStore rows={rows}/>
        ReactDOM.render(storeItems, document.getElementById('store_view'))
    }
    // overwrite store
    clear() {
        ReactDOM.render(<div></div>, document.getElementById('store_view'))
    }
}
/*
class:
    shopping cart page functionality
    cross-page data storage
        cart is formatted as 2D array(table) [[id, quantity], [id, quantity], [id, quantity]]
*/
export class Cart {
    getItemCount() {
        return Number(window.localStorage.getItem('itemCount'))
    }
    getTotalCount() {
        return Number(window.localStorage.getItem('totalCount'))
    }
    getTable() {
        return JSON.parse(window.localStorage.getItem('cart'))
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
        window.localStorage.setItem('cart', JSON.stringify(table))
    }
    addItemCount(value) {
        var itemCount = Number(window.localStorage.getItem('itemCount')) + value
        window.localStorage.setItem('itemCount', itemCount)
    }
    addTotalCount(value) {
        var totalCount = Number(window.localStorage.getItem('totalCount')) + value
        window.localStorage.setItem('totalCount', totalCount)
    }
    // add item and it's quantity to cart table
    addItem(id) {
        var table = this.getTable()
        // access item quantity, convention for DOM id is product id ending with q
        var quantity = Number(document.getElementById(id + 'q').value)
        this.addTotalCount(quantity)
        for (const row of table) {
            if (row[0] == id) {
                quantity += Number(row[1])
                row[1] = `${quantity}`
                this.overwrite(table)
                console.log(window.localStorage)
                return
            }
        }
        table.push([id, quantity])
        this.overwrite(table)
        this.addItemCount(1)
        console.log(window.localStorage)
    }
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
                console.log(window.localStorage)
                return
            }
        }
    }
    // increment an item's quantity
    incItem(id) {
        this.addTotalCount(1)
        var quantity = 0
        var table = this.getTable()
        for (const row of table) {
            if (row[0] == id) {
                quantity = Number(row[1]) + 1
                row[1] = `${quantity}`
                this.overwrite(table)
                this.load()
                console.log(window.localStorage)
                return
            }
        }
    }
    // decrement an item's quantity
    decItem(id) {
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
                    console.log(window.localStorage)
                    return
                }
                else {
                    quantity = Number(row[1]) - 1
                    row[1] = `${quantity}`
                    this.overwrite(table)
                    this.load()
                    console.log(window.localStorage)
                    return
                }
            }
        }
    }
    // load product data for cart items and pass this.#render as a callback 
    load() {
        if (this.getItemCount() != 0) {
            accessProductDB('cart-data' + buildQuery(), this.#render)
        }
        else {
            this.clear()
        }
    }
    /*
    input: JSON object array where each item is a row object of column fields from the product database server
    fields: id, title, price, desc, imagePath
    */
    #render(rows) {
        const cartItems = <BuildCart rows={rows}/>
        ReactDOM.render(cartItems, document.getElementById('store_view'))
        var totalPrice = 0.0
        for (const row of rows) {
            totalPrice += Number(row.price) * cart.getItemQuantity(row.id)
        }
        totalPrice = totalPrice.toFixed(2)
        const head = <BuildCartHeader totalPrice={totalPrice} totalQuantity={cart.getTotalCount()}/>
        ReactDOM.render(head, document.getElementById('cart_head'))
    }
    // overwrite the store and cart header
    clear() {
        ReactDOM.render(<div></div>, document.getElementById('cart_head'))
        ReactDOM.render(<div></div>, document.getElementById('store_view'))
    }
}
// instantiate new Cart object for use in react components
let cart = new Cart()
// react component: build main store page items
function BuildStore(props) {
    const roots = props.rows.map((row) =>    
    <div key={row.id} className="store_item" id={row.id}>
        {/*product image source*/}
        <img alt={row.image_path} src={row.image_path} className="product_image"/>
        {/*wrapper for non-image content of a store item*/}
        <div className="product_text">
            {/*products title heading*/}
            <h2>{row.title}</h2>
            {/*product price*/}
            <h2>${row.price}</h2>
            {/*product description*/}
            <p>{row.description}</p>
            {/*product quantity selector*/}
            <label htmlFor="quantity">Qty: </label>
            {/*quantity input*/}
            <input id={row.id + 'q'} type="number" name="quantity" min="1" defaultValue="1"/>
            {/*add to cart button*/}
            <button className="add_cart" type="button" onClick={ () => cart.addItem(row.id)}>Add to Cart</button>
        </div>
    </div>)
    return (
        <div>
            {roots}
        </div>
    )
}
// react component: build cart page items
function BuildCart(props) {
    const roots = props.rows.map((row) =>    
    <div key={row.id} className="store_item" id={row.id}>
        {/*product image source*/}
        <img alt={row.image_path} src={row.image_path} className="product_image"/>
        {/*wrapper for non-image content of a store item*/}
        <div className="product_text">
            {/*products title heading*/}
            <h2>{row.title}</h2>
            {/*product price*/}
            <h2>${row.price}</h2>
            {/*product description*/}
            <p>{row.description}</p>
            {/*product quantity selector*/}
            <label htmlFor="quantity">Qty: </label>
            {/*decrement button*/}
            <button className="update_cart" type="button" onClick={ () => cart.decItem(row.id)}>-</button>
            {/*quantity display*/}
            <input id={row.id + 'q'} className="cart_quantity" type="number" name="quantity" value={cart.getItemQuantity(row.id)} disabled/>
            {/*increment button*/}
            <button className="update_cart" type="button" onClick={ () => cart.incItem(row.id)}>+</button>
            {/*delete button*/}
            <button className="remove_cart" type="button" onClick={ () => cart.deleteItem(row.id)}>Delete</button>
        </div>
    </div>)
    return (
        <div>
            {roots}
        </div>
    )
}
// react component: build cart page header
function BuildCartHeader(props) {
    return (
        <div id='cart_head'>
            <h2>Total ${props.totalPrice}</h2>
            {props.totalQuantity == 1 && <button type='button'>Proceed to Checkout {'('+props.totalQuantity+' item)'}</button>}
            {props.totalQuantity != 1 && <button type='button'>Proceed to Checkout {'('+props.totalQuantity+' items)'}</button>}
        </div>
    )
}