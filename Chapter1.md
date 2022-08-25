# Chapter 1

## Authorize Courier to send messages using Gmail and Twilio APIs 

In this first Chapter, we will need to authorize our API to send the secret messages. Let’s get started by integrating the Gmail and Twilio APIs, which will enable Courier to send emails and messages from a single API call.

1. Log into your Courier account and create a new secret workspace.
2. For the onboarding process, select the email channel and let Courier and build with Node.js. Start with the Gmail API since it only takes seconds to setup. All we need to do to authorization is login via Gmail. Now the API is ready to send messages.
3. Copy the starter code, which is a basic API call using cURL, and paste it in the a new terminal. It has your API key saved already, knows which email address you want to send to, and has a message already built in.

Once you can see the dancing pigeon, you are ready to use Courier to send more notifications. Before we build out our application, we just need to set up the Twilio provider to enable text messages.

4.  Head over to “Channels" in the left menu and search for Twilio. You will need an Account SID, Auth Token, and a Messaging Service SID to authorize Twilio.
5. Open [twilio.com](http://twilio.com), login and open the Console, and find the first two tokens on that page. Save the Account SID and Auth Token in Courier.

You lastly just need to locate the Messaging Service SID, which can be created in the Messaging tab on the left menu. Checkout Twilio’s docs on [how to create a Messaging Service SID](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services), linked in the description.

6. Once we have all three pieces of information, install the provider and now your Courier account is authorized to send any email or SMS within one API call.