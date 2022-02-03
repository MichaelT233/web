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
app.get('/membership', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/membership.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/contact', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/contact.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/faq', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/faq.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})
app.get('/participants', (req, res) => {
    // read and serve html file
    fs.readFile('client/doc/participants.html', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.type('html')
        res.send(data)
    })
})