// node web server

// load modules
const express = require('express')
const app = express()
const fs = require('fs')
const { Pool } = require('pg')

// port number that the http web server will listen on
const webPort = 80
// password that will be used for queries to the database
const dbPassword = 'devPass'
// port number that the database will listen on
const dbPort = 5432

// create new instance of Pool object for DB access
const psql = new Pool({
    // local docker env user defined in /infra/siteDeploy.sh
    user: 'postgres',
    // default first IP assigned by docker to containers
    host: '172.17.0.2',
    // psql database defined in /infra/siteDeploy.sh
    database: 'postgres',
    password: dbPassword,
    port: dbPort,
})

// use src directory as working directory for client resources
app.use(express.static('src'))
// application object listen on port value
app.listen(webPort, () => {
  	console.log(`web application listening on port ${webPort}...\nCtrl+C to exit`)
})

// GET root
app.get('/', (req, res) => {
    // read and serve html file
    fs.readFile('html/store.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})

// GET cart
app.get('/cart', (req, res) => {
    // read and serve html file
    fs.readFile('html/cart.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})

// GET all
app.get('/all', (req, res) => {
    // callback for sending reponse
    function sendResponse(data) {
        res.type('html')
        res.send(data)
    }
    // using Pool instance to query postgreSQL database
    psql.query('SELECT * FROM products;', (err, res) => {
        // converting JSON object into a string in order to send as response text
        const rows = JSON.stringify(res.rows)
        sendResponse(rows)
    })
})

// GET search
app.get('/search', (req, res) => {
    // callback for sending reponse
    function sendResponse(data) {
        res.type('html')
        res.send(data)
    }
    var sql = ''
    if (req.query['title'] != undefined) {
        // set initial sql string to find product data from database, according to what is in the client's cart
        sql = "SELECT id, category, title, price, descr, image_path FROM products WHERE title = "
        // add first item to sql string
        sql += `'${req.query['title']}';`
        console.log(sql)
    }
    else if (req.query['category'] != undefined) {
        // set initial sql string to find product data from database, according to what is in the client's cart
        sql = "SELECT id, category, title, price, descr, image_path FROM products WHERE category = "
        // add first item to sql string
        sql += `'${req.query['category']}';`
        console.log(sql)
    }
    // using Pool instance to query postgreSQL database, passing the sql string as it's query
    psql.query(sql, (err, res) => {
        if (err) {
            console.error(err)
            return
        }
        // converting JSON object into a string in order to send as response text
        const rows = JSON.stringify(res.rows)
        sendResponse(rows)
    })
})

// GET cart-data
app.get('/cart-data', (req, res) => {
    // callback for sending reponse
    function sendResponse(data) {
        res.type('html')
        res.send(data)
    }
    // set initial sql string to find product data from database, according to what is in the client's cart
    var sql = "SELECT id, title, price, descr, image_path FROM products WHERE id = "
    // access cart data sent in the request URL query 
    const cart = JSON.parse(req.query['cart'])
    // add first item to sql string
    sql += `'${cart[0][0]}'`
    // starting from the second item, add each item as an equivalency check to the sql string
    var i = 1
    while (i < cart.length) {
        sql += ' OR id = ' + `'${cart[i][0]}'`
        ++i
    }
    // terminate sql string
    sql += ';'
    console.log(sql)
    // using Pool instance to query postgreSQL database, passing the sql string as it's query
    psql.query(sql, (err, res) => {
        if (err) {
            console.error(err)
            return
        }
        // converting JSON object into a string in order to send as response text
        const rows = JSON.stringify(res.rows)
        sendResponse(rows)
    })
})

// GET search
app.get('/product-data', (req, res) => {
    // callback for sending reponse
    function sendResponse(data) {
        res.type('html')
        res.send(data)
    }
    if (Object.keys(req.query).length == 0) {
        var sql = "SELECT * FROM products;"
        console.log(sql)
    }
    else {
        // set initial sql string to find product data from database, according to what is in the client's cart
        var sql = "SELECT * FROM products WHERE id = "
        // add first item to sql string
        sql += `'${req.query['id']}';`
        console.log(sql)
    }
    // using Pool instance to query postgreSQL database, passing the sql string as it's query
    psql.query(sql, (err, res) => {
        if (err) {
            console.error(err)
            return
        }
        // converting JSON object into a string in order to send as response text
        const row = JSON.stringify(res.rows)
        sendResponse(row)
    })
})