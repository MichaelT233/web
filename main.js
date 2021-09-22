// node web server
// load the express module
const express = require('express')
// create express application object
const app = express()
// port number that the http web server will listen on
const web_port = 80
// load file system (acesss) module
const fs = require('fs')
// load postgreSQL driver module and create constructor for the pg Pool class
const { Pool } = require('pg')
// password that will be used for queries to the database
const db_password = 'devPass'
// port number that the database will listen on
const db_port = 5432
// use src directory as working directory for client resources
app.use(express.static('src'))
// application object listen on port value
app.listen(web_port, () => {
  	console.log(`web application listening on port ${web_port}...\nCtrl+C to exit, stdout->:`)
})
// create new instance of Pool object for DB access
const psql = new Pool({
    // building object properties
    // local docker env user defined in /infra/Site_Deploy.sh
    user: 'postgres',
    // default first IP assigned by docker to containers
    host: '172.17.0.2',
    // psql database defined in /infra/Site_Deploy.sh
    database: 'postgres',
    password: db_password,
    port: db_port,
})

/***********************************/

// callback to be executed when the / directory is requested
app.get('/', (req, res) => {
    // read html file to be served
    fs.readFile('html/store.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // set response type to HTML
        res.type('html')
        // serve HTML file
        res.send(data)
    })
})

/***********************************/

// callback to be executed when the /db directory is requested
app.get('/all', (req, res) => {
    // callback for sending reponse
    function send_response(data) {
        // set response type to text/html
        res.type('html')
        // send response
        res.send(data)
    }
    // using Pool instance to query postgreSQL database
    psql.query('SELECT * FROM products;', (err, res) => {
        // converting JSON object into a string in order to edit and transfer
        const all = JSON.stringify(res.rows)
        // encapsulating JSON string into a "products" object
        const all_response = '{"products": ' + all + "}"
        // send response
        send_response(all_response)
    })
})

// callback to be executed when the /cart directory is requested
app.get('/cart', (req, res) => {
    // read html file to be served
    fs.readFile('html/cart.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // set response type to HTML
        res.type('html')
        // serve HTML file
        res.send(data)
    })
    //console.log(req.cookies)
})

app.get('/load', (req, res) => {
    // callback for sending reponse
    function send_response(data) {
        // set response type to text/html
        res.type('html')
        // send response
        res.send(data)
    }
    var sql = "SELECT id, title, price, descr, image_path FROM products WHERE"
    const cart = req.query
    for (const key in cart) {
        console.log(cart[key])
        if (key == "id0") {
            sql += " id = " + `'${cart[key]}'`
        }
        else {
            sql += " OR id = " + `'${cart[key]}'`
        }
    }
    sql += ";"
    console.log(sql)
    // using Pool instance to query postgreSQL database
    psql.query(sql, (err, res) => {
        // converting JSON object into a string in order to edit and transfer
        console.log(err)
        const shop = JSON.stringify(res.rows)
        // encapsulating JSON string into a "products" object
        const shop_response = '{"products": ' + shop + "}"
        // send response
        send_response(shop_response)
    })
})