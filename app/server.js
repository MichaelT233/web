const express = require('express')
const app = express()
const port = 3000

//serves static files from 'client' directory
app.use(express.static('client'))

//determines whether given ip string is IPv6 or IPv4 and returns the address
function parseIP(ip) {
	if (ip.slice(0,7) == '::ffff:') {
		ip = ip.slice(7)
	} else {
		ip = ip
	}
	return ip
}

//returns the client's public IP address
app.get('/ip', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
	var publicIP = parseIP(req.ip)
  	console.log(publicIP + ': checked IP')
	res.send(publicIP)
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
    var ip = parseIP(req.ip)
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
