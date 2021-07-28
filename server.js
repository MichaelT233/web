const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

// uses home directory as base reference for app logic (js) and css styling, possible by bundling
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
        res.set('html')
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
        res.set('html')
        res.send(data)
    })
})

// testing postgres api
const { Pool } = require('pg')
app.get('/db', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const pool = new Pool({
        user: 'postgres',
        host: '172.17.0.3',
        database: 'postgres',
        password: 'devPass',
        port: 5432,
    })
    function sendData(text){
        console.log(text)
        res.send(text)
    }
    pool.query('SELECT * FROM products;', (err, res) => { 
        var name = res.rows[0].name
        var description = res.rows[0].description
        var price = res.rows[0].price
        pool.end()
        sendData(name + description + price)
    })
})