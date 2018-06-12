require('dotenv').config()
var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var router = express.Router()
var app = express()
var apis = require('./apis.js')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.get('/', verificationHandler)
app.post('/', handleMessage)

function verificationHandler(req, res) {
  if (req.query['hub.verify_token'] === 'verifycode') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong validation token!')
}

function handleMessage(req, res) {
  var messagingEvents = req.body.entry[0].messaging
  var messages = []

  for (i = 0; i < messagingEvents.length; i++) {
    event = req.body.entry[0].messaging[i]
    sender = event.sender.id;

    if (event.message && event.message.text) {
      text = event.message.text
      messages.push(text)
      apis.sendHelp(sender)
    }
  }

  if (messages.length > 0) {
    return res.send(`Received!</br>Messages: ${messages.join('\n')}`)
  }
  res.send('Received!')
}

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server listening on port', app.get('port'))
})