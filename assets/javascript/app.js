// Global Variables
var arrayOfAllEvents = [];
var exampleEvent = {
    greeterName: "name of person who made event",
    latitudeOfEvent: "lat",
    longitudeOfEvent: "long",
    addressOfEvent: "address",
    nameOfEventLocation: "name",
    eventKey: "math.ceiling(math.random() * latitude)",
    eventAdded:1111, // unix time
    eventStartTime: 1234, // unix time
    eventEndTime: 4321, // unix time
    eventTypeEnum: 1 // not used for now
}

var database;

// Database Helper Functions
function pushUserKeyToLocalStorage(){
    localStorage.setItem("eventkey", exampleEvent.eventKey);
}

function testIfLocalEventExistsInFirebase(){
    var localEventID = localStorage.getItem("eventKey");
    if (localEventID != ""){
        // for each event in firebase, see if localEventID matches
    }
}

function testIfEventIsInProximityWindow(currentLocation, eventLocation, proximityWindowInMiles){
    return true;
}

function returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles){
    return arrayOfProximateEvents;
}

function testPushToDatabase(){
    
    database.ref().push({
        greeterName:exampleEvent.greeterName,

    });
}

function populateFireBaseWithEventInfo(){
    // jquery to populate info for event
    
    // get all exampleEvent element from HTML
    // push exampleEventObject to firebase
}

function connectToFirebase(){
    var config = {
        apiKey: "AIzaSyAboCNAM8LyGsG2dV-fzJBiZu4UVQhxgHk",
        authDomain: "meetupschedule-ab2c2.firebaseapp.com",
        databaseURL: "https://meetupschedule-ab2c2.firebaseio.com",
        projectId: "meetupschedule-ab2c2",
        storageBucket: "",
        messagingSenderId: "799738528055"
    };
    firebase.initializeApp(config);
    database = firebase.database();

}

// Interface functions
function populateTableWithEvents(){
    var arrayOfProximateEvents = returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles);
    // jquery stuff to push events into repeating element
}

function clearUserInputFields(){
    // jquery stuff
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            do_something(position.coords.latitude, position.coords.longitude);
          });
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function do_something(lat, long){
    console.log(lat);
    console.log(long);
}

getLocation();
connectToFirebase();
testPushToDatabase();