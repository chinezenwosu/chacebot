var request = require('request')

var url = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`

function sendHelp(id) {
  var options = {
    uri: url,
    method: 'POST',
    json: {
      "recipient": {
        "id": id
      },
      "message": {
        "text": "Send wiki space 'Your query' to search wikipedia"
      }
    }
  }

  request(options, function(error, response, body) {
    console.log("Request sent to", id)
    if (error) {
      console.log(error.message);
    }
  });
}

module.exports = {
  sendHelp
}