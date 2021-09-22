// client side react jsx scripts
// dependency requirment, also a flag for webpack
import {getJSON} from './utility.js'
import {add_cart} from './utility.js'

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
            <input id={"quantity" + props.index} type="number" name="quantity" min="1" defaultValue="1"/>
            {/*an add to cart button*/}
            <button type="button" onClick={ () => add_cart(props.id)}>Add to Cart</button>
            </div>
        </div>)
    }
    // loop for populating the previously rendered divs with store items/products
    i = 0
    while (i < obj.products.length) {
        var index = `${i}`
        // calling react component to create store items with product data from the database
        var item = <Store_Item title = {obj.products[i].title}
            price = {obj.products[i].price}
            description = {obj.products[i].descr}
            image_path = {obj.products[i].image_path}
            id = {obj.products[i].id}/>
        // rendering finished item into it's div
        ReactDOM.render(item, document.getElementById('store_item' + i));
        // increment counter value
        i ++
    }
}
// function made to load product data and render into elements in the store viewport 
function load_all() {
    // call AJAX JSON get request to product database URL and giving the above function as callback
    getJSON('all', build_store)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.load_all = load_all

// function: load cart products on cart page
function load_cart() {
    function build_query() {
        const count = Number(window.localStorage.getItem('cart-count'))
        var query = "?"
        var i = 0
        while (i < count) {
            query += `id${i}=`
            query += window.localStorage.getItem(`id${i}`)
            query += "&"
            ++i
        }
        return query
    }
    // call AJAX JSON get request to product database URL and giving the above function as callback
    getJSON('cart-data' + build_query(), build_store)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.load_cart = load_cart