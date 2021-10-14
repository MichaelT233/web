// client utility module

/*
class:
    async database access
*/
export class DB {
    readDB(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
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
    readSearchData(exp, callback) {
        console.log(exp)
        this.readDB('search?column=title&field=' + exp, callback)
    }
}