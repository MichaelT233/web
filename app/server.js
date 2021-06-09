const express = require('express')
const app = express()
const port = 3000

app.use(express.static('client'))

//returns the client's public IP address
app.get('/ip', (req, res) => {
    var publicIP = req.ip
    res.set('Access-Control-Allow-Origin', '*')
    if (publicIP.slice(0,6) == '::ffff:') {
        publicIP = publicIP.slice(7)
        res.send(publicIP)
    } else {
        res.send(publicIP)
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

//initializes web server
app.listen(port, () => {
  	console.log(`prototype listening at designated IP://localhost:${port}`)
})
