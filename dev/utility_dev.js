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
            // callback is called, with the JSON object as it's argument
            callback(obj)
        }
    }
    // request being sent to server, executes before async callback above
    request.send()
}
var client_storage = window.localStorage
// function add item to cart
export function add_cart(id_num) {
    // get item quantity from dom
    var quantity = document.getElementById(id_num).value
    // get cart item count from storage
    var cart_count = client_storage.getItem('cart-count')
    // if cart is empty or not initialized
    if (cart_count == null || cart_count == '0') {
        // initialize cart count
        client_storage.setItem('cart-count', '1')
        // initialize 2D cart array
        var cart_init = [[id_num, quantity]]
        cart_init = JSON.stringify(cart_init)
        client_storage.setItem('cart', cart_init)
    }
    // if cart is not empty
    else {
        // access cart array
        var cart = JSON.parse(client_storage['cart'])
        // iterate cart array
        for (const item of cart) {
            // if item is already in cart
            if (item[0] == id_num) {
                // create new total quantity
                quantity = Number(quantity) + Number(item[1])
                // set new quantity
                item[1] = `${quantity}`
                // set new cart array in storage
                cart = JSON.stringify(cart)
                client_storage.setItem(`cart`, cart)
                console.log(client_storage)
                // exit function
                return
            }
        }
        // add item and quantity as an array to cart array
        cart.push([id_num, quantity])
        // set new cart array in storage
        cart = JSON.stringify(cart)
        client_storage.setItem(`cart`, cart)
        // increment and set new cart count in storage
        cart_count = Number(cart_count)
        ++cart_count
        client_storage.setItem('cart-count', "" + cart_count)
        }
    console.log(client_storage)
}
/*
function remove item to cart
I/O
assumptions
more docs
*/
export function remove_cart(id_num) {
    // get cart item count from storage
    var cart_count = client_storage.getItem('cart-count')
    // if cart is not empty
    if (cart_count != '0' && cart_count != null) {
        // access cart array
        var cart = JSON.parse(client_storage['cart'])
        // iterate cart array 
        for (const item of cart) {
            // if item is in cart
            if (item[0] == id_num) {
                // remove item array from cart array
                cart.splice(cart.indexOf(item), 1)
                // set new cart array in storage
                cart = JSON.stringify(cart)
                client_storage.setItem('cart', cart)
                // decrement and set new cart count in storage        
                cart_count = Number(cart_count)
                --cart_count
                client_storage.setItem('cart-count', "" + cart_count)
                console.log(client_storage)
                // exit function
                return
            }
        }
    }
    console.log(client_storage)
}