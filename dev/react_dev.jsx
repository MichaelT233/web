// client side react jsx scripts
// dependency requirment, also a flag for webpack
import {getJSON} from './utility.js'
import {add_cart, remove_cart} from './utility.js'

// populate store with products, take postgresql rows object from product database as input
function build_store(obj) {
    // loop that generates the necessary html divs based on product quantity, for react to plug into
    // initial string
    var container = `<div class='item_wrapper' id='store_item0'></div>`;
    // creating a counter value            
    var i = 1
    // loops as many times as their are products in the JSON response
    while (i < obj.products.length) {
        // building string (and divs)
        container = container + `<div class='item_wrapper' id='store_item${i}'></div>`
        //increment counter value
        i ++
    }
    // converting the jsx string into an actual react jsx reference
    var container_jsx = (<div id='store_wrapper' dangerouslySetInnerHTML={{__html: container}}/>)
    // rendering the react jsx into the store viewport
    ReactDOM.render(container_jsx, document.getElementById('store_view'))
    // react component for each store item
    function Store_Item(props) {
        // access cart item count
        var cart_count = window.localStorage.getItem('cart-count')
        // initialize quantity variable globally in function
        var quantity = null
        // if on cart page and cart is not empty
        if (document.location.pathname == '/cart' && (cart_count != null && cart_count != '0')) {
            // access and iterate cart array
            var cart = JSON.parse(window.localStorage['cart'])
            // iterate item arrays
            for (item of cart) {
                // if id prop is in the cart
                if (item[0] == props.id) {
                    // set the quantity variable to the quantity of the item in the cart that is currently being rendered
                    quantity = item[1]
                }
            }
        }
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
            <h2>{props.price}</h2>
            {/*product description*/}
            <p>{props.description}</p>
            {/*product quantity selector*/}
            <label htmlFor="quantity">Qty:</label>
            {/*if on home page*/}
            {document.location.pathname == '/' && <input id={props.id} type="number" name="quantity" min="1" defaultValue="1"/>}
            {/*if on cart page*/}
            {document.location.pathname == '/cart' && <input id={props.id} type="number" name="quantity" defaultValue={quantity}/>}
            {/*an add to cart button*/}
            <button className="add_cart" type="button" onClick={ () => add_cart(props.id)}>Add to Cart</button>
            {/*a remove from cart button*/}
            <button className="remove_cart" type="button" onClick={ () => remove_cart(props.id)}>Remove from Cart</button>
            </div>
        </div>)
    }
    // loop for populating the previously rendered divs with store items/products
    i = 0
    while (i < obj.products.length) {
        // calling react component to create store items with product data from the database
        var item = <Store_Item title = {obj.products[i].title}
            price = {obj.products[i].price}
            description = {obj.products[i].descr}
            image_path = {obj.products[i].image_path}
            id = {obj.products[i].id}/>
        // rendering finished item into it's div
        ReactDOM.render(item, document.getElementById('store_item' + i));
        // increment counter value
        ++i
    }
}
// function made to load product data and render into elements in the store_view div
function load_all() {
    // call AJAX JSON get request to '/all' path and giving the build_store as callback
    getJSON('all', build_store)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.load_all = load_all

// function: load cart products on cart page
function load_cart() {
    // access cart item count
    var cart_count = window.localStorage.getItem('cart-count')
    // function: build URL query to send cart data to server
    function build_query() {
        // build query string from cart data and return it
        const query = '?cart=' + window.localStorage['cart']
        return query
    }
    // if cart is not initialized and not empty
    if (cart_count != null && cart_count != '0') {
        const query = build_query()
        console.log(window.localStorage)
        console.log(query)
        // call AJAX JSON get request to '/cart-data' path with query and passing build_store as callback
        getJSON('cart-data' + query, build_store)
    }
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM (onload)
window.load_cart = load_cart