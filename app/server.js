const express = require('express')
const app = express()
const port = 3000

// serves static files from 'client' directory
app.use(express.static('client'))

// determines whether given ip string is IPv6 or IPv4 and returns the address
function parseIP(ip) {
	if (ip.slice(0,7) == '::ffff:') {
		ip = ip.slice(7)
	}
	return ip
}

// function that parses traceroute's stdout into a more friendly format
function parseTrace(str){
    let regex0 = / \d /
    i = 1
    while (regex0.test(str) == true){
        str = str.replace(regex0, `[hop #${i}] host = `) 
        i++
    }
    let regex1 = /\) /g
    str = str.replace(regex1, `), RTT times = `)
	return str
}

// returns the client's socket
app.get('/socket', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
	var publicIP = parseIP(req.ip)
    var publicPort = req.socket.remotePort.toString()
	res.send(publicIP + ':' + publicPort)
})

// returns traceroute stdout
app.get('/trace', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    var ip = parseIP(req.ip)	
    const { exec } = require('child_process')
    var cmd = `traceroute ${ip}`
    exec(cmd, (error, stdout, stderr) => {
        //console.log(error)
        //console.log(stderr)
		var trace = parseTrace(stdout)
        res.send(trace)
    })
})

// returns nmap stdout
app.get('/map', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    var ip = parseIP(req.ip)	
    const { exec } = require('child_process')
    var cmd = `nmap ${ip}`
    exec(cmd, (error, stdout, stderr) => {
        //console.log(error)
        //console.log(stderr)
        res.send(stdout)
    })
})

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
        host: '127.0.0.1',
        database: 'postgres',
        password: 'rose1123',
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