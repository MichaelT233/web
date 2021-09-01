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