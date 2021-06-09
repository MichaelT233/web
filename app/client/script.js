//needs general error handling

//REST API get call
function get(url, callback, id) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var text = request.responseText
            callback(id, text)
        }
    }
    request.send()
}

//displays text in given HTML element id
function displayText(id, text) {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, text), document.getElementById(id))
}