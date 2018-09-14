$(document).ready(function() {
// do I need a document on ready for this?? didnt use them in the class demos

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCe0rWPDIGnpUeb2hukQCNOVp6kCUOJPYs",
    authDomain: "train-scheduler-282b8.firebaseapp.com",
    databaseURL: "https://train-scheduler-282b8.firebaseio.com",
    projectId: "train-scheduler-282b8",
    storageBucket: "train-scheduler-282b8.appspot.com",
    messagingSenderId: "888975501304"
  };

  firebase.initializeApp(config);

// Create a variable to reference the database
    var database = firebase.database();

// Initial Values
let trainName = "";
let traindestination = "";
let trainFrequency = 0;
let nextArrival = 0;
let minutesAway = 0;
let firstTrainTime = 0;
// How do I reference current time...seems like it should be simple
let currentTime = 0;

// Capture Button Click
$(".btn-primary").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

// Getting the input data
trainName = $(".trainName").val().trim();
traindestination = $(".destination").val().trim();
firstTrainTime = parseInt($(".firstTrainTime").val().trim());
trainFrequency = parseInt($(".trainFrequency").val().trim());

// I dont know what this does
database.ref().set({
    trainName: trainName,
    traindestination: traindestination,
    trainFrequency: trainFrequency,
    // nextArrival: 
    // minutesAway:

});
});

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

// Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().traindestination);
      console.log(snapshot.val().trainFrequency);
      console.log(snapshot.val().firstTrainTime);
      console.log(snapshot.val().nextArrival);
      console.log(snapshot.val().minutesAway);

// Change the HTML to reflect
$(".showTrainName").text(snapshot.val().trainName);
$(".showDestination").text(snapshot.val().traindestination);
$(".showFrequency").text(snapshot.val().trainFrequency);
$(".showNextArrival").text(snapshot.val().nextArrival);
$(".showMinutesAway").text(snapshot.val().minutesAway);

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});

// Document on ready close brackets
});
