const express = require('express')
const app = express()
const port = 3000

//serves static files from 'client' directory
app.use(express.static('client'))

//returns the client's public IP address
app.get('/ip', (req, res) => {
    var publicIP = req.ip
    res.set('Access-Control-Allow-Origin', '*')
    if (publicIP.slice(0,7) == '::ffff:') {
        publicIP = publicIP.slice(7)
        res.send(publicIP + ' (IPv4)')
    } else {
        res.send(publicIP + ' (IPv6)')
    }
  	console.log(publicIP + ': checked IP')
})

//returns the client's public port
app.get('/port', (req, res) => {
    var publicPort = req.socket.remotePort
	publicPort = publicPort.toString()
  	console.log(publicPort + ': checked port')
  	res.set('Access-Control-Allow-Origin', '*')
  	res.send(publicPort)
})

//returns traceroute stdout, needs to be changed to number of hops, hop addresses, and times
app.get('/trace', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    var ip = req.ip.slice(7)
    console.log(ip)	
    const { exec } = require('child_process')
    var cmd = `traceroute ${ip}`
    exec(cmd, (error, stdout, stderr) => {
        console.log(stdout)
        res.send(stdout)
    })
})

//initializes web server
app.listen(port, () => {
  	console.log(`prototype listening at designated IP:${port}`)
})
