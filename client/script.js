//needs general error handling
//needs anti-spam mechanism

// AJAX API - function that fetches product data from psql database and renders it into the DOM 
function get(url, callback) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var responseText = request.responseText
            const obj = JSON.parse(responseText)
            //initital draft of a react component that renders a single element in what will be a grid view store
            container = `<div class='item_wrapper' id='store_item0'></div>`;            
            // loop that creates all necessary divs for store items
            var i = 1
            while (i < 10) {
                //container divs for store items
                container = container + `<div class='item_wrapper' id='store_item${i}'></div>`
                //increment counter value
                i ++
            }
            container_jsx = /*#__PURE__*/React.createElement("div", {
                id: "store_wrapper",
                dangerouslySetInnerHTML: {
                  __html: container
                }
            });
            ReactDOM.render(container_jsx, document.getElementById('store_view'))
            function Store(props) {
                return /*#__PURE__*/React.createElement("div", {className: "store_item"}, 
                /*#__PURE__*/React.createElement("h2", null, props.title), 
                /*#__PURE__*/React.createElement("img", {src: props.image_path, alt: "test image", className: "product_image"}), 
                /*#__PURE__*/React.createElement("p", null, props.price), 
                /*#__PURE__*/React.createElement("p", null, props.description), 
                /*#__PURE__*/React.createElement("label", {htmlFor: "quantity"}, "Qty:"), 
                /*#__PURE__*/React.createElement("input", {type: "number", name: "quantity", min: "1"}), 
                /*#__PURE__*/React.createElement("button", {type: "button"}, "Add to Cart")
                );
            }
            i = 0
            console.log(obj.products.length)
            while (i < obj.products.length) { 
                //calling react component to creaate view with valued props
                view = /*#__PURE__*/React.createElement(Store, {
                    title: obj.products[i].name,
                    description: obj.products[i].description,
                    price: obj.products[i].price,
                    image_path: obj.products[i].image_path
                }); 
                //rendering finished view into store view
                ReactDOM.render(view, document.getElementById('store_item' + i));
                //increment counter value
                i ++
            }
        }
    }
    request.send()
    console.log('Loading...')
}