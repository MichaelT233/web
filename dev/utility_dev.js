/*
*/
import {renderStore, ClearRoots} from './react.js'
export class Cart {
    getItemCount() {
        return Number(window.localStorage.getItem('itemCount'))
    }
    getTotalCount() {
        return Number(window.localStorage.getItem('totalCount'))
    }
    getTable() {
        return JSON.parse(window.localStorage.getItem('cart'))
    }
    write(table) {
        window.localStorage.setItem('cart', JSON.stringify(table))
    }
    addItemCount(value) {
        var itemCount = Number(window.localStorage.getItem('itemCount')) + value
        window.localStorage.setItem('itemCount', itemCount)
    }
    addTotalCount(value) {
        var totalCount = Number(window.localStorage.getItem('totalCount')) + value
        window.localStorage.setItem('totalCount', totalCount)
    }
    addItem(id) {
        var table = this.getTable()
        var quantity = Number(document.getElementById(id + 'q').value)
        this.addTotalCount(quantity)
        for (const item of table) {
            if (item[0] == id) {
                quantity += Number(item[1])
                item[1] = `${quantity}`
                this.write(table)
                console.log(window.localStorage)
                return
            }
        }
        table.push([id, quantity])
        this.write(table)
        this.addItemCount(1)
        console.log(window.localStorage)
    }
    deleteItem(id) {
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                this.addTotalCount(-Number(item[1]))
                table.splice(table.indexOf(item), 1)
                this.write(table)
                this.addItemCount(-1)
                loadCart()
                console.log(window.localStorage)
                return
            }
        }
    }
    incItem(id) {
        this.addTotalCount(1)
        var quantity = 0
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                quantity = Number(item[1]) + 1
                item[1] = `${quantity}`
                this.write(table)
                loadCart()
                console.log(window.localStorage)
                return
            }
        }
    }
    decItem(id) {
        this.addTotalCount(-1)
        var quantity = 0
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                if (item[1] == 1) {
                    table.splice(table.indexOf(item), 1)
                    this.write(table)
                    this.addItemCount(-1)
                    loadCart()
                    console.log(window.localStorage)
                    return
                }
                quantity = Number(item[1]) - 1
                item[1] = `${quantity}`
                this.write(table)
                loadCart()
                console.log(window.localStorage)
                return
            }
        }
    }
    getItemQuantity(id) {
        var table = this.getTable()
        for (const item of table) {
            if (item[0] == id) {
                return Number(item[1])
            }
        }
    }
}
export function loadCart() {
    if (window.localStorage.getItem('itemCount') != '0') {
        getJSON('cart-data' + buildQuery(), renderStore)
        return
    }
    else {
        ClearRoots()
    }
}
function buildQuery() {
    const query = '?cart=' + window.localStorage.getItem('cart')
    console.log(query)
    return query
}
export function getJSON(url, callback) {
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