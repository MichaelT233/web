// client side js that includes react jsx
import {accessProductDB, buildQuery} from './utility.js'
// class: main store
export class Store {
    loadAll() {
        accessProductDB('all', render)
    }
}
// class: shopping cart
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
        for (const item of table) {
            if (item[0] == id) {
                return Number(item[1])
            }
        }
    }
    write(table) {
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
    addItem(id) {
        var table = this.getTable()
        var quantity = Number(document.getElementById(id + 'q').value)
        this.addTotalCount(quantity)
        for (const item of table) {
            if (item[0] == id) {
                quantity += Number(item[1])
                item[1] = `${quantity}`
                this.write(table)
                console.log(window.localStorage)
                return
            }
        }
        table.push([id, quantity])
        this.write(table)
        this.addItemCount(1)
        console.log(window.localStorage)
    }
    deleteItem(id) {
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                this.addTotalCount(-Number(item[1]))
                table.splice(table.indexOf(item), 1)
                this.write(table)
                this.addItemCount(-1)
                this.load()
                console.log(window.localStorage)
                return
            }
        }
    }
    incItem(id) {
        this.addTotalCount(1)
        var quantity = 0
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                quantity = Number(item[1]) + 1
                item[1] = `${quantity}`
                this.write(table)
                this.load()
                console.log(window.localStorage)
                return
            }
        }
    }
    decItem(id) {
        this.addTotalCount(-1)
        var quantity = 0
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                if (item[1] == 1) {
                    table.splice(table.indexOf(item), 1)
                    this.write(table)
                    this.addItemCount(-1)
                    this.load()
                    console.log(window.localStorage)
                    return
                }
                quantity = Number(item[1]) - 1
                item[1] = `${quantity}`
                this.write(table)
                this.load()
                console.log(window.localStorage)
                return
            }
        }
    }
    load() {
        if (window.localStorage.getItem('itemCount') != '0') {
            accessProductDB('cart-data' + buildQuery(), render)
            return
        }
        else {
            clear()
        }
    }
}
let cart = new Cart()
// react component for each store item
function BuildStore(props) {
    const roots = props.products.map((row) =>    
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
            {document.location.pathname == '/cart' && <button className="update_cart" type="button" onClick={ () => cart.decItem(row.id)}>-</button>}
            {/*quantity input*/}
            {document.location.pathname == '/' && <input id={row.id + 'q'} type="number" name="quantity" min="1" defaultValue="1"/>}
            {document.location.pathname == '/cart' && <input id={row.id + 'q'} className="cart_quantity" type="number" name="quantity" value={cart.getItemQuantity(row.id)} disabled/>}
            {/*add to cart button*/}
            {document.location.pathname == '/' && <button className="add_cart" type="button" onClick={ () => cart.addItem(row.id)}>Add to Cart</button>}
            {/*increment button*/}
            {document.location.pathname == '/cart' && <button className="update_cart" type="button" onClick={ () => cart.incItem(row.id)}>+</button>}
            {/*delete button*/}
            {document.location.pathname == '/cart' && <button className="remove_cart" type="button" onClick={ () => cart.deleteItem(row.id)}>Delete</button>}
        </div>
    </div>)
    return (
        <div>
            {roots}
        </div>
    )
}
function BuildHeaderAppend(props) {
    return (
        <div id='cart_head'>
            <h2>Total ${props.totalPrice}</h2>
            {props.totalQuantity == 1 && <button type='button'>Proceed to Checkout {'('+props.totalQuantity+' item)'}</button>}
            {props.totalQuantity != 1 && <button type='button'>Proceed to Checkout {'('+props.totalQuantity+' items)'}</button>}
        </div>
    )
}
// populate store with products, take postgresql rows object from product database as input
function render(obj) {
    const store = <BuildStore products={obj.products}/>
    ReactDOM.render(store, document.getElementById('store_view'))
    if (document.location.pathname == '/cart' && cart.getItemCount() != '0') {
        var totalPrice = 0.0
        for (const row of obj.products) {
            totalPrice += Number(row.price) * cart.getItemQuantity(row.id)
        }
        totalPrice = totalPrice.toFixed(2)
        const head = <BuildHeaderAppend totalPrice={totalPrice} totalQuantity={cart.getTotalCount()}/>
        ReactDOM.render(head, document.getElementById('cart_head'))
    }
}
function clear() {
    ReactDOM.render(<div></div>, document.getElementById('cart_head'))
    ReactDOM.render(<div></div>, document.getElementById('store_view'))
}