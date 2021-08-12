//needs general error handling
//needs anti-spam mechanism

// AJAX API - GET then save into an html element
function get(url, callback) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var responseText = request.responseText
            const obj = JSON.parse(responseText)
            //initital draft of a react component that renders a single element in what will be a grid view store
            function Store(props) {
                return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, props.title), /*#__PURE__*/React.createElement("div", null, props.description), /*#__PURE__*/React.createElement("div", null, props.price));
            } 
            //calling react component to create view with valued props
            view = /*#__PURE__*/React.createElement(Store, {
                title: obj.products[0].name,
                description: obj.products[0].description,
                price: obj.products[0].price
            }); 
            //rendering finished view into store view
            ReactDOM.render(view, document.getElementById('store_view'));
        }
    }
    request.send()
    console.log('Loading...')
}

// simple function to render text in a given DOM element
function render(text, element) {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, text), document.getElementById(element))
}