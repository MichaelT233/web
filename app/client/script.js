//needs general error handling
//needs anti-spam mechanism

//function that calls the associated functions according to the DOM's drop down menu
function selectCallback() {
    var selections = document.getElementById('actions')
    var value = selections.value
    switch (value){
        case 'socket':
            get('socket', 'output')
            break
        case 'traceroute':
            get('trace', 'output')
            break
        case 'map':
            get('map', 'output')
            break
    }
}

// AJAX API - GET then save into an html element (currently text based)
function get(url, element) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var responseText = request.responseText
            render(responseText, element)
        }
    }
    request.send()
    render('Loading...', 'output')
}
// simple function to render text in a given DOM element
function render(text, element) {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, text), document.getElementById(element))
}