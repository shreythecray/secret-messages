# Chapter 3

## Integrate a translation API to convert messages to Morse code

*NOTE: The Morse API has a rate limit, which may give you an error if you run it too too many times within the hour. In this case, you will have to wait for some time before continuing.*

In this last Chapter, you will integrate the Fun Translations Morse API to encode the secret messages and send them over to the spies. On the Fun Translations website, you can search for documentation on the Morse API. Here you have access to all of the information you need to make the call - you have an endpoint and an example that demonstrates that the original message is a parameter for the endpoint.
* Fun Translations: [https://funtranslations.com/api/#morse](https://funtranslations.com/api/#morse)
* Fun Translations API: [https://api.funtranslations.com/](https://api.funtranslations.com/)

31. Start by encasing the Courier API call in a function.
32. Add a call to that function below the async function definition.
33. Refactor `options` to `courier_options`.

```javascript
// Dependencies to install:
// $ npm install node-fetch --save

const fetch = require('node-fetch');
require('dotenv').config()

async function send_secret_message() {

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
              "title": "new subject",
              "body": "message"
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
```

Before sending the message, you first need to make a call to the Morse API to translate the message. You can use node-fetch in the same way as you did for Courier to make this call.

34. Copy the code within async function to make the new API call.
35. Paste the code above the Courier API call.
36. Update the endpoint to the Morse API endpoint.
37. Refactor `options` to `morse_options` for the first call. 
38. Remove the authorization token in the Morse API call since it does not require an API Key.
39. Remove the `body` object.
40. Add the message - “hey secret agent x this is your message” - as a parameter within the endpoint and replace all spaces in the message with its url-encode (%20).

```javascript
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

      const original_message = "hey%20secret%20agent%20x%20this%20is%20your%20message"
      const morse_endpoint = "https://api.funtranslations.com/translate/morse.json?text="+original_message
      
      fetch(morse_endpoint, morse_options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

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
              "title": "new subject",
              "body": "message"
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
```

41. Comment out the Courier API call, since you only need to test the code you just added.

When you run this program, we may receive an error that states that there is an error parsing the JSON. This issue is caused by an error in the documentation, which here states that it should be `POST` request. However, on a separate API documentation it is written as a `GET` request. Update the call type to `GET` and you should see the translated message within the response.

Clearly, you don’t want to send all of this information to the spies. You only need the secret message.

42. Isolate the message by logging `response.contents.translated`.

```javascript
fetch(morse_endpoint, morse_options)
    .then(response => response.json())
    .then(response => console.log(response.contents.translated))
    .catch(err => console.error(err));
```

You need to be able to access the translation from this API call in the body of the Courier API call.

43. Create a variable called `morse_response`, which will hold the entire response from this call.
44. Convert the JSON object into a JavaScript object so that you can read it within your code.
45. Get the translated message out of that object and save it in a new variable called `message`.
46. Log this variable to confirm that it works.

```javascript
const morse_response = await fetch(morse_endpoint, morse_options)
    // .then(response => response.json())
    // .then(response => console.log(response.contents.translated))
    // .catch(err => console.error(err));
const translation = await morse_response.json();
const message = translation.contents.translated
console.log(message)
```

47. Replace the message within the body of the Courier API call with the encoded message you just saved in the `message` variable.

```javascript
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
```

The Courier datalog should show that the messages were successfully encoded and sent via both SMS and email. Here’s what the email looks like:

![Encoded email example](https://user-images.githubusercontent.com/28051494/186561441-db9d6b04-7865-41ff-97b7-86c59166d14d.png)