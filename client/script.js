//needs general error handling
//needs anti-spam mechanism

// AJAX API - GET then save into an html element (currently text based)
function get(url, element) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var responseText = request.responseText
            console.log(responseText)
        }
    }
    request.send()
    console.log('Loading...')
}

// simple function to render text in a given DOM element
function render(text, element) {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, text), document.getElementById(element))
}