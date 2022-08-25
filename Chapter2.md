# Chapter 2

## Send single and multi-channel notifications

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