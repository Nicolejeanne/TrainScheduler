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
let trainDestination = "";
let trainFrequency = 0;
let nextArrival;
let minutesAway;
let firstTrainTime;
let currentTime;
let firstTimeConverted;
let diffTime;
let tRemainder;

// Capture Button Click
$(".btn-primary").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

// Getting the input data
trainName = $(".trainName").val().trim();
trainDestination = $(".destination").val().trim();
firstTrainTime = moment($(".firstTrainTime").val().trim(), "HH:mm").format();
trainFrequency = parseInt($(".trainFrequency").val().trim());

// Creates last two calculated variables
    // First Time (pushed back 1 year to make sure it comes before current time)
    firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);
    // Minute Until Train
    minutesAway = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    // Next Train
    nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

// Creates local "temporary" object for holding employee data
let newTrain = {
    trainName: trainName,
    trainDestination: trainDestination,
    trainFrequency: trainFrequency,
    firstTrainTime: firstTrainTime,
};

// Uploads train data to the database
    database.ref().push(newTrain);

// Clears all of the text boxes
$(".trainName").val("");
$(".destination").val("");
$(".firstTrainTime").val("");
$(".trainFrequency").val("");
});


// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot) {

// Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().trainDestination);
      console.log(snapshot.val().trainFrequency);
      console.log(snapshot.val().firstTrainTime);
    //   console.log(snapshot.val().nextArrival);
    //   console.log(snapshot.val().minutesAway);

// Store new values in variables
let newTrainName = snapshot.val().trainName;
let newTrainDestination = snapshot.val().trainDestination;
let newFrequency = snapshot.val().trainFrequency;

// Create new table row
let newRow = $("<tr>").append(
    $("<td>").text(newTrainName),
    $("<td>").text(newTrainDestination),
    $("<td>").text(newFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
);

// Append the new row to the table
$(".table > tbody").append(newRow);

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});

// Document on ready close brackets
});
