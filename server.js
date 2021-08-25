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
app.get('/about', (req, res) => {
    fs.readFile('about/index1.html', 'utf8' , (err, data) => {
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
        host: '172.17.0.2', //for only db docker build
        //host: '172.17.0.3', //for full docker build
        database: 'postgres',
        password: 'devPass',
        port: 5432,
    })
    function sendData(data){
        res.type('json')
        res.send(data)
    }
    pool.query('SELECT * FROM products;', (err, res) => {
        const products = JSON.stringify(res.rows)
        const response = '{"products": ' + products + "}" 
        sendData(response)
    })
})