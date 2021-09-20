// client side react jsx scripts
// dependency requirment, also a flag for webpack
import getJSON from './utility.js'
// function made to load product data and render into elements in the store viewport 
function loadProducts() {
    // wrapping this code as a callback to use later in this function, takes JSON response from product database as it's argument
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
            <div class="store_item">
                {/*product image source*/}
                <img src={props.image_path} class="product_image"/>
                {/*wrapper for non-image content of a store item*/}
                <div class="product_text">
                {/*products title heading*/}
                <h2>{props.title}</h2>
                {/*product price*/}
                <h2>{props.price}</h2>
                {/*product description*/}
                <p>{props.description}</p>
                {/*product quantity selector*/}
                <label for="quantity">Qty:</label>
                <input type="number" name="quantity" min="1"/>
                {/*an add to cart button*/}
                <button type="button">Add to Cart</button>
                </div>
            </div>)
        }
        // loop for populating the previously rendered divs with store items/products
        i = 0
        while (i < obj.products.length) { 
            // calling react component to create store items with product data from the database
            var item = <Store_Item title = {obj.products[i].name}
                description = {obj.products[i].description}
                price = {obj.products[i].price}
                image_path = {obj.products[i].image_path}/>
            // rendering finished item into it's div
            ReactDOM.render(item, document.getElementById('store_item' + i));
            // increment counter value
            i ++
        }
    }
    // call AJAX JSON get request to product database URL and giving the above function as callback
    getJSON('db', build_store)
}
// set the loadProducts function to global browser scope so it can be accessed from the DOM
window.loadProducts = loadProducts