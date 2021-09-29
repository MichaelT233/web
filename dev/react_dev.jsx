// client side react jsx scripts
// dependency requirment, also a flag for webpack
import {Cart} from './utility.js'
let cart = new Cart()
// populate store with products, take postgresql rows object from product database as input
export function renderStore(obj) {
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

export function ClearRoots() {
    ReactDOM.render(<div></div>, document.getElementById('cart_head'))
    ReactDOM.render(<div></div>, document.getElementById('store_view'))
}
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