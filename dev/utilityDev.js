// client utility module

/*
class:
    async database access
*/
export class DB {
    readDB(url, callback) {
        var request = new XMLHttpRequest()
        request.open("GET", url)
        request.onreadystatechange = function ready() {
            if(request.readyState == XMLHttpRequest.DONE) {
                const res = JSON.parse(request.responseText)
                callback(res)
            }
        }
        request.send()
    }
    readRows(column, field, callback) {
        this.readDB(`product-data?column=${column}&field=${field}`, (rows) => {
            callback(rows)
        })
    }
    readTable(callback) {
        this.readDB('product-data', callback)
    }
    readCartData(callback) {
        this.readDB('cart-data?cart=' + window.localStorage.getItem('cart'), callback)
    }
}