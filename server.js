require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const twilio = require('twilio');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const accountSid = process.env.ACCOUNT_SID; // Retrieve Twilio Account SID from environment variables
const authToken = process.env.AUTH_TOKEN; // Retrieve Twilio Auth Token from environment variables
const client = twilio(accountSid, authToken); // Create Twilio client with Account SID and Auth Token

const twilioNumber = process.env.TWILIO_NUMBER; // Retrieve Twilio phone number from environment variables
const myNumber = process.env.MY_NUMBER; // Retrieve your phone number from environment variables

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('query', (data) => {
    console.log('Query received:', data);

    // Send the query to your phone using Twilio
    client.messages.create({
      from: twilioNumber,
      to: myNumber,
      body: data.query,
    });

    // Send a response to the client
    const response = 'Thank you for your query. We will get back to you shortly.';
    socket.emit('response', { response });
  });
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // ... other event handlers ...
  
    socket.on('referFriend', (data) => {
      console.log('Refer a Friend:', data);
  
      // Send a referral message to the friend using Twilio
      const referralMessage = `Hey there! I thought you might be interested in this service. Check it out: ${data.serviceUrl}`;
      client.messages.create({
        from: twilioNumber,
        to: data.friendPhoneNumber,
        body: referralMessage,
      });
  
      // Send a response to the client
      const response = 'Your referral has been sent successfully!';
      socket.emit('referFriendResponse', { response });
    });
  });
  
const port = process.env.PORT || 3000; // Use the PORT environment variable if available, otherwise use port 3000
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


