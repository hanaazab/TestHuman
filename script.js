// script.js

document.getElementById("questionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var questionInput = document.getElementById("questionInput");
    var responseContainer = document.getElementById("responseContainer");
    var response = document.getElementById("response");
  
    // Get user input and send it to Twilio for processing
    var question = questionInput.value;
    
    // Make an AJAX request to the server to send the question to Twilio for processing
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendQuestion", true); // Update with your server's endpoint for sending question
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Update the response container with the received response
        response.textContent = "Response: " + xhr.responseText; // Update with actual response from Twilio
      }
    };
    xhr.send(JSON.stringify({ question: question }));
  
    // Show the feedback form
    document.getElementById("feedbackForm").style.display = "block";
  
    // Clear the question input
    questionInput.value = "";
  });
  
  
  document.getElementById("feedbackSubmit").addEventListener("click", function() {
    var feedbackForm = document.getElementById("feedbackForm");
    var ageInput = document.getElementById("ageInput");
    var thankYouMessage = document.getElementById("thankYouMessage");
  
    // Get feedback and age input values
    var feedback = document.querySelector('input[name="feedback"]:checked').value;
    var age = ageInput.value;
  
    // Process feedback and age values
    // For example, you can send the feedback and age values to the server using an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/submitFeedback", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Handle successful response from server
        // For example, show thank you message and hide feedback form
        thankYouMessage.style.display = "block";
        feedbackForm.style.display = "none";
      }
    };
    xhr.send(JSON.stringify({ feedback: feedback, age: age }));
  });

  
  document.getElementById("referFriendButton").addEventListener("click", function() {
    var friendNameInput = document.getElementById("friendNameInput");
    var friendPhoneNumberInput = document.getElementById("friendPhoneNumberInput");
  
    // Get friend's name and phone number input values
    var friendName = friendNameInput.value;
    var friendPhoneNumber = friendPhoneNumberInput.value;

    socket.emit('referFriend', { friendName, friendPhoneNumber, serviceUrl: 'https://example.com' });
  
    // Send referral message using Twilio
    fetch('/refer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            friendName: friendName,
            friendPhoneNumber: friendPhoneNumber 
        })
    })
    .then(response => response.json())
    .then(data => {
        // Show success message
        alert("Referral message sent successfully to " + friendName);
  
        // Clear friend's name and phone number input fields
        friendNameInput.value = "";
        friendPhoneNumberInput.value = "";
    })
    .catch(error => console.error('Error:', error));
});

  
document.getElementById("restartButton").addEventListener("click", function() {
    var questionInput = document.getElementById("questionInput");
    var responseContainer = document.getElementById("responseContainer");
    var response = document.getElementById("response");
    var feedbackForm = document.getElementById("feedbackForm");
    var ageInput = document.getElementById("ageInput");
    var thankYouMessage = document.getElementById("thankYouMessage");
    var friendNameInput = document.getElementById("friendNameInput");
    var friendPhoneNumberInput = document.getElementById("friendPhoneNumberInput");
  
    // Reset form inputs
    questionInput.value = "";
    response.textContent = "";
    feedbackForm.reset();
    ageInput.value = "";
    thankYouMessage.style.display = "none";
    friendNameInput.value = "";
    friendPhoneNumberInput.value = "";
  
    // Hide feedback form
    feedbackForm.style.display = "none";
});

  