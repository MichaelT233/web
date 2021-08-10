const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const { Pool } = require('pg')

// uses home directory as base reference for app logic (js), css styling, favicon, possible by bundling
app.use(express.static('client'))

// initializes web server
app.listen(port, () => {
  	console.log(`prototype listening on this machine:${port}`)
})

// serves home page
app.get('/', (req, res) => {
    fs.readFile('home/index0.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})

// testing routing
app.get('/route', (req, res) => {
    fs.readFile('testRoute/index1.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})

// testing postgres api
app.get('/db', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const pool = new Pool({
        user: 'postgres',
        host: '172.17.0.3',
        database: 'postgres',
        password: 'devPass',
        port: 5432,
    })
    function sendData(data){
        console.log(data)
        res.send(data)
    }
    pool.query('SELECT * FROM products;', (err, res) => {
        /* 
        const title = res.rows[0].name
        const products = []
        const rowQuantity = res.rows.length
        const rowCount = 0
        while (rowQuantity != rowCount){
            products[rowCount][0] = res.rows[0].name
            products[rowCount][1] = res.rows[1].description
            products[rowCount][2] = res.rows[2].price
        }
        pool.end()
        const response = JSON.stringify()
        sendData(response)
        */
        const products = JSON.stringify(res.rows)
        const response = '{"products":' + products + "}" 
        console.log(response)
        sendData(response)
    })
})