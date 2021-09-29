/*
*/
export function buildQuery() {
    const query = '?cart=' + window.localStorage.getItem('cart')
    console.log(query)
    return query
}
export function accessProductDB(url, callback) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            const obj = JSON.parse(request.responseText)
            callback(obj)
        }
    }
    request.send()
}