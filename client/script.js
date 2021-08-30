// client scripts
// function for making AJAX requests for JSON objects from a given URL and then executes a given callback with access to said JSON data
function getJSON(url, callback) {
    // creating AJAX request object
    var request = new XMLHttpRequest()
    // calling open method, creating connection
    request.open("GET", url)
    // conditional requiring the request to be completed in order to execute given callback
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            // ASYNC
            // converting the response text (which is in JSON format) into an actual JSON reference
            const obj = JSON.parse(request.responseText)
            // callback is.. called, with the JSON as it's argument
            callback(obj)
        }
    }
    // request being sent to server, executes before async callback above
    request.send()
}

// function made to load product data and render into elements in the store viewport 
function loadProducts() {
    // wrapping this code as a callback to use later in this function, takes JSON response from product database as it's argument
    function build_store(obj) {
        // loop that generates the necessary html divs based on product quantity, for react to plug into
        // initial string
        container = `<div class='item_wrapper' id='store_item0'></div>`;
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
        container_jsx = /*#__PURE__*/React.createElement("div", {
            id: "store_wrapper",
            dangerouslySetInnerHTML: {
            __html: container
            }
        })
        // rendering the react jsx into the store viewport
        ReactDOM.render(container_jsx, document.getElementById('store_view'))
        // react component for each store item
        function Store(props) {
            return /*#__PURE__*/React.createElement("div", {className: "store_item"}, 
            /*#__PURE__*/React.createElement("h2", null, props.title), 
            /*#__PURE__*/React.createElement("img", {src: props.image_path, alt: "test image", className: "product_image"}), 
            /*#__PURE__*/React.createElement("p", null, props.price), 
            /*#__PURE__*/React.createElement("p", null, props.description), 
            /*#__PURE__*/React.createElement("label", {htmlFor: "quantity"}, "Qty:"), 
            /*#__PURE__*/React.createElement("input", {type: "number", name: "quantity", min: "1"}), 
            /*#__PURE__*/React.createElement("button", {type: "button"}, "Add to Cart")
            )
        }
        // loop for populating the previously rendered divs with store items/products
        i = 0
        while (i < obj.products.length) { 
            // calling react component to create store items with product data from the database
            view = /*#__PURE__*/React.createElement(Store, {
                title: obj.products[i].name,
                description: obj.products[i].description,
                price: obj.products[i].price,
                image_path: obj.products[i].image_path
            }); 
            // rendering finished item into it's div
            ReactDOM.render(view, document.getElementById('store_item' + i));
            // increment counter value
            i ++
        }
    }
    // call AJAX JSON get request to product database URL and giving the above function as callback
    getJSON('db', build_store)
}