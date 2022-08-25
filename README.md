# secret-messages
### I**ntro**

- [x]  Welcome to the Courier Lab.
- [x]  In this video, we will be building a node.js app that sends multi-channel notifications in morse code.
- [x]  We are secret agents today and our goal is to send encoded messages to our spy network.
- [x]  Some spies prefer reading emails and other prefer reading texts, so we need to make sure that our app can accommodate all spy preferences.
- [x]  The first 5 Secret Agents to complete this tutorial and this task successfully will receive a gift from Courier.
- [x]  In Chapter 1, we will first integrate the Gmail and Twilio APIs, which Courier will use to send emails and text messages.
- [x]  In Chapter 2, we will demonstrate how to send single messages and setup routing to send multi-channel notifications.
- [x]  In Chapter 3, we will integrate a translation API to convert our messages into Morse code.
- [ ]  We are hosting our first hackathon next month, starting September 5th until September 30th. If you want to submit this project for a chance to win some cool prizes, the link to register is in description.

### **Body**

**Chapter 1: setting up**

In this first Chapter, we will need to authorize our API to send the secret messages.

Let’s get started by integrating the Gmail and Twilio APIs, which will enable Courier to send emails and messages from a single API call.

First we will log into our Courier account and create a secret workspace.

For the onboarding process, we will select the email channel and let Courier know we prefer building with Node.js. We’ll start with the Gmail API since it only takes seconds to setup and our spies don’t have time to waste. All we need to do to authorization is login via Gmail.

Now the API is ready to send messages.

We can copy the starter code, which is a basic API call using cURL, and paste it in the a new terminal. It has our API key saved already, knows which email address we want to send to, and has a message already built in.

Once we can see Agent Pigeon dancing, we know we were successful at sending our first message and are ready to use Courier to communicate with our spies.

Before we build out our application, we just need to set up the Twilio provider to enable text messages.

To do this we can head over to “Channels" in the left menu and search for Twilio. We need an Account SID, Auth Token, and a Messaging Service SID to authorize Twilio.

When you open [twilio.com](http://twilio.com), login and open the Console and you will find the first two tokens on that page. We can save the Account SID and Auth Token in Courier. We lastly just need to locate the Messaging Service SID, which can be created in the Messaging tab on the left menu. We have already created one, and this can be found within the data related to the active numbers. Checkout Twilio’s docs on how to create a Messaging Service SID, linked in the description.

Once we have all three pieces of information, we can install the provider and now our Courier account is authorized to send any email or SMS within one API call.

**Chapter 2: sending messages**

In this next Chapter, we will start sending messages.

To actually send the secret messages, we’re going to head over to the Send API documentation. You can access the Docs from [courier.com](http://courier.com), and locate the specific page under API Reference.

Here we can find everything related to sending messages.

On the right, we can see some starter code and can select a language of our choice from cURL, Node.js, Ruby, Python, Go, or PHP. We are going to use Node.js on this mission.

This is a basic POST request that can be edited to include our spies’ data such as how to contact them and the message we need to send. The “Notification Template” needs to be replaced with our own template.

We can’t share our spies’ real contact information, so for this video we will use some fake data. We can add an email address in the email field on the left, which you will notice automatically appears in the code snippet on the right.

Next we need to add the actual message we are sending. Our messages are going to be pretty simple, so we can directly write them into the API call instead of creating a template.

The title refers to an email’s subject. We’ll write in “new subject” temporarily and change it later. In the email body, we’ll just write “message” for now.

Just as before, the data on the left automatically appeared in the code snippet on the right. We can see there is a content object that encompasses the title and body parameters.

Now we just need to make sure that this API call has access to our Courier account, which is linked to the Gmail and Twilio APIs, so we can replace the Auth Token. We can find the Courier auth token stores safely in our account in settings, under API Keys. 

We can send this code out from here to test that the API call works. Within our Courier logs we can see that 3 seconds ago, we sent a message and this is how it rendered for the user receiving the message.

Now we can integrate this code into our own Node.js application. Let’s open VS Code and open a new project with a file called index.js.

Once we have pasted our code in, we can see that we do need to install the node-fetch npm package, which will enable us to make API calls. Open a terminal and paste the command to install the package.

Once your code is ready, we can try running our program for the first time.

Here we run into our first error, which is caused by the require statement on line 4. To fix this, we can check out the node-fetch documentation, which tells us to install a different version of the package. This allows us to continue.

Now when we run this program, we get a response from Courier that includes the requestID. This indicates that the API call was made successfully and we can head over to the Courier datalog to determine if the message was sent successfully as well, which it was.

Since we are Secret Agents, we should probably protect the API key in case our code gets in the wrong hands. We can do this by storing the Key in a .env file and installing the dotenv npm package, which will allow us to access it as a variable in our index.js file. Once the package is installed, we can access the key by referring to it as process.env.APIKEY. We also need to ensure that we have required the npm package in this file specifically after installing it.

Now we can run this program to confirm that it still works the same, even after we have protected our API Key from the eyes of our enemies.

At this point, we can send a single message to our spies via email. However, we know that some of our spies prefer to use text messages, so we will need to enable multi-channel notifications. Let’s head back to our Courier docs and scroll down to the routing object, which contains method and channels. There are two types of methods available to us - all and single. All means that Courier will attempt to send the message to every channel listed. Single means that Courier will attempt to send it to the first channel that works. Let’s integrate this into our program.

We can add the routing object anywhere within the message object, at the same level as “to” and “content”. We will add it below content. We also need to define the channels within the same routing object - we can choose SMS or email, in this case, since we already have our email address defined.

Since we want to define multiple channels, we can convert this into an array and list both email and SMS. We now have 2 different channels that this message can be sent to. As we know, all methods would send this message to both email and SMS. Single method would try to send this to the first that works. Since we have the user’s email address but not their phone number, we could only send it via email. If the two channels were reversed, Courier would try to send an SMS, fail to do so, and then default to sending an email. In order for the SMS channel to work, we need to add the user’s phone number. Again, we’ll use a fake number in order to protect the identities of our spies. Now this program is able to send text messages via Twilio.

Once we change the single method to all and run the program again, we can see that Courier is able to send via Twilio and Gmail within the same API call.

**Chapter 3: morse code api**

In this last Chapter, we can integrate the Fun Translations Morse API to encode our secret messages and send them over to the spies. On the Fun Translations website, you can search for documentation on the Morse API. Here we have access to all of the information we need to make the call - we have an endpoint and an example that demonstrates that the original message is a parameter for the endpoint.

In our code, we can start by encasing the Courier API call in a function.

Before sending the message, we first need to make a call to the Morse API to translate the message. We can use node-fetch in the same way as we did for Courier to make this call. Let’s copy and edit the code to make the new API call.

We can update our endpoint and refactor some of the variables such as options to morse_options for the first call and courier_options for the second one. We can remove the authorization token in the Morse API call since it does not require an API Key. This API call does not need a body so we can remove that. Lastly, we can add the message - “hey secret agent x this is your message” - as a parameter and replace all spaces in the message with its url-encode (%20).

Let’s check to make sure this works. We can run this function and comment out the Courier API call, since we only need to test the code we just added. When we run this program, we receive an error that states that there is an error parsing the JSON. This issue is caused by an error in the documentation, which here states that it should be POST request. However, on a separate API documentation that I’ve seen before it says it is a GET request. When we update the call type to GET, it works and we can see the translated message within the response.

Clearly, we don’t want to send all of this information to our spies. We only need the secret message. We can isolate the message by logging response.contents.translated.

We also know that we need to be able to access the translation from this API call in the body of the Courier API call. If we create a variable called morse_response, the entire response from this call will be saved within, allowing us to manipulate it and pass it along to the Courier API call below. Next we need to convert the JSON object into a JavaScript object so that we can read it within our code. Lastly we can get the translated message out of that object and save it in a new variable called message. We can log this variable to confirm that it works.

We just ran into an issue, which upon inspection can be attributed to a typo in the translation variable name.

The final step is to replace the message within the body of the Courier API call with the encoded message we just received. When we run this code, we are running into another error since we have reached the rate limit of the Morse API which means we have tried to use it too many times within the hour.

After a short break interrogating one of our prisoners, we can try to run this program again and notice that it works. The Courier datalog shows that the messages were successfully encoded and sent via both SMS and email. Here’s what the email looks like.

### Conclusion

Our spies are now ready to receive their secret encoded messages. Try changing the body of the content to your own secret message and send it over to courier.demos+secretmessage@gmail.com and we will send the first 5 Secret Agents to complete this task a gift! Don’t forget to submit your project to our hackathon for a chance to win XYZ. You can find the registration link in the description below.
