// node web server

// load modules
var express = require('express')
var app = express()
var fs = require('fs')

// port number that the http web server will listen on
const webPort = 80

// use src directory as working directory for client resources
app.use(express.static('client/public'))
// application object listen on port value
app.listen(webPort, () => {
  	console.log(`web application listening on port ${webPort}...\nCtrl+C to exit`)
})

// GET root
app.get('/', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/home.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/cart', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/cart.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/checkout', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/checkout.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/checkoutfinal', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/checkoutFinal.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/product', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/product.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/about', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/about.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})