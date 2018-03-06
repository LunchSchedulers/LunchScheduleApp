// Global Variables
var arrayOfAllEvents = [];
var exampleEvent = {
    greeterName: "name of person who made event",
    latitudeOfEvent: "lat",
    longitudeOfEvent: "long",
    addressOfEvent: "address",
    nameOfEventLocation: "name",
    eventKey: "math.ceiling(math.random() * latitude)",
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

function calculateDistanceBetweenTwoPoints(latAndLongOne, latAndLongTwo){
    // taken directly from https://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    return d;
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

connectToFirebase();