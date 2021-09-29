// client side react jsx scripts
// dependency requirment, also a flag for webpack
import {Cart} from './utility.js'
let cart = new Cart()
// populate store with products, take postgresql rows object from product database as input
export function build_store(obj) {
    var container = ''
    var i = 0
    while (i < obj.products.length) {
        container+= `<div class='item_wrapper' id='store_item${i}'></div>`
        ++i
    }
    // converting the jsx string into an actual react jsx reference
    var container_jsx = (<div id='store_wrapper' dangerouslySetInnerHTML={{__html: container}}/>)
    // rendering the react jsx into the store viewport
    ReactDOM.render(container_jsx, document.getElementById('store_view'))

    // loop for populating the previously rendered divs with store items/products
    i = 0
    var total_price = 0
    while (i < obj.products.length) {
        // calling react component to create store items with product data from the database
        var item = <Store_Item title = {obj.products[i].title}
            price = {obj.products[i].price}
            description = {obj.products[i].descr}
            image_path = {obj.products[i].image_path}
            id = {obj.products[i].id}
            quantity = {""+cart.getItemQuantity(obj.products[i].id)}/>
        // rendering finished item into it's div
        ReactDOM.render(item, document.getElementById('store_item' + i));
        total_price += Number(obj.products[i].price) * cart.getItemQuantity(obj.products[i].id)
        // increment counter value
        ++i
    }
    if (document.location.pathname == '/cart' && cart.getItemCount() != '0') {
        total_price = total_price.toFixed(2)
        var head = <Build_Head totalPrice={total_price}
                    totalQuantity={cart.getTotalCount()}/>
        ReactDOM.render(head, document.getElementById('cart_head'))
    }
}

export function clear_roots() {
    ReactDOM.render(<div></div>, document.getElementById('cart_head'))
    ReactDOM.render(<div></div>, document.getElementById('store_view'))
}
// react component for each store item
function Store_Item(props) {
    return (
    // creation of store item class instance
    <div className="store_item">
        {/*product image source*/}
        <img alt={props.image_path} src={props.image_path} className="product_image"/>
        {/*wrapper for non-image content of a store item*/}
        <div className="product_text">
        {/*products title heading*/}
        <h2>{props.title}</h2>
        {/*product price*/}
        <h2>${props.price}</h2>
        {/*product description*/}
        <p>{props.description}</p>
        {/*product quantity selector*/}
        <label htmlFor="quantity">Qty: </label>
        {/**/}
        {document.location.pathname == '/cart' && <button className="update_cart" type="button" onClick={ () => cart.decItem(props.id)}>-</button>}

        {document.location.pathname == '/' && <input id={props.id} type="number" name="quantity" min="1" defaultValue="1"/>}
        {document.location.pathname == '/cart' && <input id={props.id} className="cart_quantity" type="number" name="quantity" value={props.quantity} disabled/>}

        {document.location.pathname == '/' && <button className="add_cart" type="button" onClick={ () => cart.addItem(props.id)}>Add to Cart</button>}

        {document.location.pathname == '/cart' && <button className="update_cart" type="button" onClick={ () => cart.incItem(props.id)}>+</button>}
        {document.location.pathname == '/cart' && <button className="remove_cart" type="button" onClick={ () => cart.deleteItem(props.id)}>Delete</button>}
        </div>
    </div>)
}
function Build_Head(props) {
    return (
        <div id='cart_head'>
        <h2>Total ${props.totalPrice}</h2>
        {props.totalQuantity == 1 && <button type='button'>Proceed to Checkout {'('+props.totalQuantity+' item)'}</button>}
        {props.totalQuantity != 1 && <button type='button'>Proceed to Checkout {'('+props.totalQuantity+' items)'}</button>}
        </div>
    )
}