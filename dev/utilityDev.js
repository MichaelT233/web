// client utility module

// function: build URL query for cart page
export function buildQuery() {
    const query = '?cart=' + window.localStorage.getItem('cart')
    console.log(query)
    return query
}
/*
function
    make AJAX call to given URL, and pass given callback to access the response data
    AJAX response data is JSON parsed before being passed to callback 
*/
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

export class DB {
    readDB(query, callback) {
        var request = new XMLHttpRequest()
        request.open("GET", 'product-data' + query)
        request.onreadystatechange = function ready() {
            if(request.readyState == XMLHttpRequest.DONE) {
                const res = JSON.parse(request.responseText)
                callback(res)
            }
        }
        request.send()
    }
    readRow(id, callback) {
        this.readDB(`?id=${id}`, (row) => {
            callback(row[0])
        })
    }
    readTable(callback) {
        this.readDB('', callback)
    }
}

let db = new DB()

db.readRow('0001', (row) => {
    console.log(row)
})
db.readTable((rows) => {
    console.log(rows)
})