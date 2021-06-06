const express = require('express')
const app = express()
const port = 3000

app.use(express.static('client'))

/*
app.get('/', (req, res) => {
  	res.send('Hello World!')
})
*/

app.get('/findip', (req, res) => {
    var publicIP = req.ip
  	publicIP = publicIP.slice(7,18)
  	console.log(publicIP + ': checked IP')
  	res.set('Access-Control-Allow-Origin', '*')
  	res.send(publicIP)
}) 

app.listen(port, () => {
  	console.log(`prototype listening at http://192.168.1.16:${port}`)
})
