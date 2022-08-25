// Dependencies to install:
// $ npm install node-fetch --save

const fetch = require('node-fetch');
require('dotenv').config()

async function send_secret_message() {

    const morse_options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      
      const morse_response = await fetch('https://api.funtranslations.com/translate/morse.json?text=hey%20there%20secret%20agent%20x%20this%20is%20your%20message', morse_options)
        // .then(response => response.json())
        // .then(response => console.log(response.contents.translated))
        // .catch(err => console.error(err));
      const translation = await morse_response.json();
      const message = translation.contents.translated
      console.log(message)

    const courier_options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.APIKEY
        },
        body: JSON.stringify({
          "message": {
            "to": {
              "email": process.env.EMAIL,
              "phone_number": process.env.PHONENUMBER
            },
            "content": {
              "title": "new secret message",
              "body": message
            },
            "routing": {
              "method": "all",
              "channels": ["sms", "email"]
            },
          }
        })
      };
      
      fetch('https://api.courier.com/send', courier_options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

}

send_secret_message()