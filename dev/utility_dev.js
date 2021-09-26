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
var client_storage = window.localStorage
// function add item to cart
export function add_cart(id_num) {
    var cart_count = client_storage.getItem('cart-count')
    if (cart_count == null || cart_count == '0') {
        client_storage.setItem('cart-count', '1')
        var cart_init = [id_num]
        cart_init = JSON.stringify(cart_init)
        client_storage.setItem('cart', cart_init)
    }
    else {
        var cart = JSON.parse(client_storage['cart'])
        for (const item of cart) {
            if (item == id_num) {
                console.log(client_storage)
                console.log(client_storage['cart-count'])
                return
            }
        }
        cart.push(id_num)
        cart = JSON.stringify(cart)
        client_storage.setItem(`cart`, cart)
        cart_count = Number(cart_count)
        ++cart_count
        client_storage.setItem('cart-count', "" + cart_count)
        }
    console.log(client_storage)
    console.log(client_storage['cart-count'])
}
/*
function remove item to cart
I/O
assumptions
more docs
*/
export function remove_cart(id_num) {
    var cart_count = client_storage.getItem('cart-count')
    if (cart_count != '0' && cart_count != null) {
        var cart = JSON.parse(client_storage['cart'])
        var i = 0
        for (const item of cart) {
            if (item == id_num) {
                cart.splice(cart.indexOf(item), 1)
                cart = JSON.stringify(cart)
                client_storage.setItem('cart', cart)
                cart_count = Number(cart_count)
                --cart_count
                client_storage.setItem('cart-count', "" + cart_count)
                console.log(client_storage)
                console.log(client_storage['cart-count'])
                return
            }
        }
    }
    console.log(client_storage)
    console.log(client_storage['cart-count'])
}