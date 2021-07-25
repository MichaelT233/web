const express = require('express')
const app = express()
const port = 3000

// serves static files from 'client' directory
app.use(express.static('client'))

// initializes web server
app.listen(port, () => {
  	console.log(`prototype listening on this machine:${port}`)
})

// testing postgres api
const { Pool } = require('pg')
//
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