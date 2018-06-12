var request = require('request')

var baseUrl = 'https://graph.facebook.com/v2.6/'
var messageUrl = `${baseUrl}me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`
var myUrl = 'https://www.facebook.com/chineze.nwosu'
var getUserInfoUrl = function (userId) {
  return `${baseUrl}${userId}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`
}

function sendHelp(id) {
  var options = {
    uri: messageUrl,
    method: 'POST',
    json: {
      "recipient": {
        "id": id
      },
      "message": {
        "text": "I feel lonely. Please say 'hello' to me"
      }
    }
  }

  request(options, function(error, response, body) {
    console.log("Request sent to", id)
    if (error) {
      console.log(error.message)
    }
  })
}

function sayHello(id) {
  request(getUserInfoUrl(id), function(error, response, body) {
    var userInfo = JSON.parse(response.body)
    var message = {
      "text": `Hello ${userInfo.first_name} ${userInfo.last_name}`,
    }

    if (userInfo.profile_pic) {
      message = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
               {
                "title": "Hi There!",
                "image_url": userInfo.profile_pic,
                "subtitle": `I know your name is ${userInfo.first_name} ${userInfo.last_name}`,
                "buttons": [{
                  "type": "web_url",
                  "url": myUrl,
                  "title": "View My Creator's Page"
                }]      
              }
            ]
          }
        }
      }
    }

    var options = {
      uri: messageUrl,
      method: 'POST',
      json: {
        "recipient": {
          "id": id
        },
        "message": message
      }
    }

    request(options, function(error) {
      if (error) {
        console.log(error.message)
      }
    })
  })
}

module.exports = {
  sendHelp,
  sayHello
}