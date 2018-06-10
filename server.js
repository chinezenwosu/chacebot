var express = require("express")
var http = require("http")
var bodyParser = require("body-parser")
var router = express.Router();
var app = express()

app.set("port", process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.get("/", verificationHandler)

function verificationHandler(req, res) {
  console.log(req)
  if (req.query['hub.verify_token'] === 'verifycode') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token!');
}

http.createServer(app).listen(app.get("port"), function() {
  console.log("Server listening on port", app.get("port"))
})