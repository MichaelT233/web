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
document.cookie = "cart_count=0"
// function add item to cart
export function add_cart(product_index) {
    // fetch product data from DOM
    const title = document.getElementById(`title${product_index}`).innerText
    const price = document.getElementById(`price${product_index}`).innerText
    const description = document.getElementById(`description${product_index}`).innerText
    const image_path = document.getElementById(`image_path${product_index}`).alt
    const quantity = document.getElementById(`quantity${product_index}`).value
    // save product data into array and convert to string
    var item_data = [title, price, description, image_path, quantity]
    var cart_item_string = JSON.stringify(item_data)
    // create cookie array
    var cookie_array = document.cookie.split("; ")
    // fetch cart count
    var cart_key = cookie_array[cookie_array.length-1]
    var cart_count = Number(cart_key.split("=")[1])
    // save product data array as a cookie with an index
    document.cookie = `cart_item${cart_count}=${cart_item_string}`
    // increment cart count
    ++cart_count
    document.cookie = `cart_count=${cart_count}`
}