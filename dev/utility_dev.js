// client scripts
// function for making AJAX requests for JSON objects from a given URL and then executes a given callback with access to said JSON data
export function getJSON(url, callback) {
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
// count of items in cart
var client_storage = window.localStorage
// function add item to cart
export function add_cart(id_num) {
    if (client_storage.getItem('cart-count') == null) {
        client_storage.setItem('cart-count', '1')
        client_storage.setItem('id0', id_num)
    }
    else {
        var count = client_storage.getItem('cart-count')
        client_storage.setItem(`id${count}`, id_num)
        count = Number(count)
        ++count
        client_storage.setItem('cart-count', "" + count)
    }
}
export function remove_cart(id_num) {
    for (const key in client_storage) {
        if (client_storage[key] == id_num) {
            client_storage.removeItem(key)
            var count = Number(client_storage.getItem('cart-count'))
            --count
            client_storage.setItem('cart-count', "" + count)
            return
        }
    }
}