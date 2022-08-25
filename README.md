# Node.js Tutorial - Sending Secret Messages with the Courier API

Follow along the video tutorial:

[![Thumbnail](https://user-images.githubusercontent.com/28051494/186563254-e7a504a9-fce3-45bf-a2a0-9d1386203890.png)](https://youtu.be/6W2rIyUdmas)

Welcome to the Courier Lab. In this tutorial, we will be building a Node.js app that sends multi-channel notifications in morse code.

### What’s going on?

We are secret agents today and our goal is to send encoded messages to our spy network. Some spies prefer reading emails and other prefer reading texts, so we need to make sure that our app can accommodate all spy preferences.

**Note:** the first 5 Secret Agents to complete this tutorial and this task successfully will receive a gift from Courier.

In Chapter 1, we will first integrate the Gmail and Twilio APIs, which Courier will use to send emails and text messages. In Chapter 2, we will demonstrate how to send single messages and setup routing to send multi-channel notifications. In Chapter 3, we will integrate a translation API to convert our messages into Morse code.

We are hosting our first hackathon next month, starting September 5th until September 30th. Register now to submit this project for a chance to win some cool prizes.

Register for the Hackathon: [https://jkfr7wbzytt.typeform.com/courier-hacks](https://jkfr7wbzytt.typeform.com/courier-hacks)

# Instructions

### Chapter 1: Authorize Courier to send messages using Gmail and Twilio APIs 

In this first Chapter, we will need to authorize our API to send the secret messages. Let’s get started by integrating the Gmail and Twilio APIs, which will enable Courier to send emails and messages from a single API call.

1. Log into your Courier account and create a new secret workspace.
2. For the onboarding process, select the email channel and let Courier and build with Node.js. Start with the Gmail API since it only takes seconds to setup. All we need to do to authorization is login via Gmail. Now the API is ready to send messages.
3. Copy the starter code, which is a basic API call using cURL, and paste it in the a new terminal. It has your API key saved already, knows which email address you want to send to, and has a message already built in.

Once you can see the dancing pigeon, you are ready to use Courier to send more notifications. Before we build out our application, we just need to set up the Twilio provider to enable text messages.

4.  Head over to “Channels" in the left menu and search for Twilio. You will need an Account SID, Auth Token, and a Messaging Service SID to authorize Twilio.
5. Open [twilio.com](http://twilio.com), login and open the Console, and find the first two tokens on that page. Save the Account SID and Auth Token in Courier.

You lastly just need to locate the Messaging Service SID, which can be created in the Messaging tab on the left menu. Checkout Twilio’s docs on [how to create a Messaging Service SID](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services), linked in the description.

6. Once we have all three pieces of information, install the provider and now your Courier account is authorized to send any email or SMS within one API call.

### Chapter 2: Send single and multi-channel notifications

In this next Chapter, you will start sending messages. To actually send the secret messages, head over to the [Send API documentation](https://www.courier.com/docs/reference/send/message/). Here you can find everything related to sending messages.

On the right, you will see some starter code and can select a language of your choice from cURL, Node.js, Ruby, Python, Go, or PHP. 

7. Select Node.js to get started.

```javascript
// Dependencies to install:
// $ npm install node-fetch --save

const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "message": {
      "template": "NOTIFICATION_TEMPLATE"
    }
  })
};

fetch('https://api.courier.com/send', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

This is a basic POST request that can be edited to include the spies’ data such as how to contact them and the message you need to send. The “Notification Template” can to be replaced with your own template.

8. Add an email address in the email field on the left, which you will notice automatically appears in the code snippet on the right.

```javascript
// Dependencies to install:
// $ npm install node-fetch --save

const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "message": {
      "template": "NOTIFICATION_TEMPLATE",
      "to": {
        "email": "courier.demos+secretmessage@gmail.com"
      }
    }
  })
};

fetch('https://api.courier.com/send', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

Next you need to add the actual message you are sending. These messages are pretty simple, so you can directly write them into the API call instead of creating a template.

9. Write in a subject in the title object (this can be changed anytime).
10.  In the email body, write your message.

```javascript
// Dependencies to install:
// $ npm install node-fetch --save

const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "message": {
      "to": {
        "email": "courier.demos+secretmessage@gmail.com"
      },
      "content": {
        "title": "new subject",
        "body": "message"
      }
    }
  })
};

fetch('https://api.courier.com/send', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

Just as before, the data on the left automatically appears in the code snippet on the right. There is a content object that encompasses the title and body parameters.

Now you just need to make sure that this API call has access to your Courier account, which is linked to the Gmail and Twilio APIs

11.  Replace the Auth Token with the Courier API Key (stored in Courier account settings under API Keys)[https://www.courier.com/docs/guides/getting-started/nodejs/#getting-your-api-keys].

```javascript
// Dependencies to install:
// $ npm install node-fetch --save

const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer apikey'
  },
  body: JSON.stringify({
    "message": {
      "to": {
        "email": "courier.demos+secretmessage@gmail.com"
      },
      "content": {
        "title": "new subject",
        "body": "message"
      }
    }
  })
};

fetch('https://api.courier.com/send', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

12.  Send this code out from here to test that the API call works (click "Try it" above the code snippet).
13.  Go to your [Courier logs](https://app.courier.com/logs/messages) and click on the latest log for more information. You should be able to view how it rendered for the user receiving the message. If there was an error, you should be able to access an error code there as well.

Now you can integrate this code into our own Node.js application.

14. Open VS Code and open a new project with a file called `index.js`.
15. Past the code into the `index.js` file.
16. Install the node-fetch npm package, which will enable you to make API calls.
17. Open a terminal and paste the command to install the package.

```shell
$ npm install node-fetch --save
```

18. Run the program in terminal.

```shell
$ node index.js
```

19. Here you may run into an error with node-fetch, which is caused by the require statement on line 4. To fix this, install a different version of the package found on the node-fetch documentation: [https://www.npmjs.com/package/node-fetch#class-response](https://www.npmjs.com/package/node-fetch#class-response).

```shell
npm install node-fetch@2
```

Now when you run this program, you should get a response from Courier that includes the `requestID` in the VS Code console. This indicates that the API call was made successfully and you can head over to the Courier datalog to determine if the message was sent successfully as well.

Since you a are Secret Agent, you should probably protect the API key in case our code gets in the wrong hands. 

20. Create a new file called `.env`.
21. Store the API Key as a variable in the .env file.

```
APIKEY="fksdjfgjsdkfgndfsmn"
```

22.  Install the dotenv npm package, which will allow you to access the variable in the `index.js` file.
23.  Once the package is installed, access the key by referring to it as `process.env.APIKEY`.
24.  Add `require('dotenv').config()` to the top of the `index.js` file.
25. Run this program to confirm that it still works the same.

At this point, you can send a single message to the spies via email. However, you know that some of spies prefer to use text messages, so you will need to enable multi-channel notifications. Let’s head back to the Courier docs and scroll down to the `routing` object, which contains the `method` and `channels`. There are two types of methods available - `all` and `single`. All means is that Courier will attempt to send the message to every channel listed. Single means that Courier will attempt to send it to the first channel that works. Let’s integrate this into our program.

26. Add the `routing` object anywhere within the `message` object, at the same level as `to` and `content`.
27. Define the channels within the same `routing` object - you can choose SMS or email, in this case, since you already have an email address defined.

```javascript
"message": {
    "to": {
      "email": process.env.EMAIL
    },
    "content": {
      "title": "new subject",
      "body": "message"
    },
    "routing": {
      "method": "single",
      "channels": "email"
    },
}
```

28. Convert the `channels` property into an array to define multiple channels and list both email and SMS.

```javascript
"channels": ["email", "sms"]
```

You now have 2 different channels that this message can be sent to. `all` methods would send this message to both email and SMS. `single` method would try to send this to the first that works. Since you have the user’s email address but not their phone number, this program can only send it via email.

If the two channels were reversed, Courier would try to send an SMS, fail to do so, and then default to sending an email.

```javascript
"channels": ["sms", "email"]
```

29. Add the user’s phone number in order to make the SMS channel work. Now this program should be able to send text messages via Twilio.

```javascript
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
      "method": "single",
      "channels": ["sms", "email"]
    },
}
```

30. Change the single method to `all` and run the program again.

```javascript
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
```

Courier is now able to send via Twilio and Gmail within the same API call.

### Chapter 3: Integrate a translation API to convert messages to Morse code

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

### Conclusion

Our spies are now ready to receive their secret encoded messages. Try changing the body of the content to your own secret message and send it over to `courier.demos+secretmessage@gmail.com` and we will send the first 5 Secret Agents to complete this task a gift! Don’t forget to submit your project to our [hackathon](https://jkfr7wbzytt.typeform.com/courier-hacks) for a chance to win XYZ.

# Quick Links

Register for the Hackathon: [https://jkfr7wbzytt.typeform.com/courier-hacks](https://jkfr7wbzytt.typeform.com/courier-hacks)

Courier's Get Started with Node.js: [https://www.courier.com/docs/guides/getting-started/nodejs/](https://www.courier.com/docs/guides/getting-started/nodejs/)

Courier Send API Docs: [https://www.courier.com/docs/reference/send/message/](https://www.courier.com/docs/reference/send/message/)

Twilio Messaging Service SID Docs: [https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services)

Node-fetch: [https://www.npmjs.com/package/node-fetch](https://www.npmjs.com/package/node-fetch)

Dotenv: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

Fun Translations: [https://funtranslations.com/api/#morse](https://funtranslations.com/api/#morse)

Fun Translations API: [https://api.funtranslations.com/](https://api.funtranslations.com/)