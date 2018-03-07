// document.ready for jquery
$(function() {

    // Global Variables
    var arrayOfAllEvents = [];
    var exampleEvent = {
        latitudeOfEvent = "lat",
        longitudeOfEvent = "long",
        eventHostName = "host",
        eventName = "event",
        nameOfEventLocation = "name",
        addressOfEvent = "address",
        creatorUserKey = "long user key as a string",
        eventStartTime = 1234, // unix time
        eventEndTime = 4321, // unix time
        eventTypeEnum = 1 // not used for now
    }
    var database;

    //event handler for create event
    $("#submit").click(populateFireBaseWithEventInfo);


    // Database Helper Functions
    function pushUserKeyToLocalStorage(){
    }

    function testIfEventIsInProximityWindow(currentLocation, eventLocation, proximityWindowInMiles){
        return true;
    }

    function returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles){
        return arrayOfProximateEvents;
    }

    function populateTableWithEvents(){
        var arrayOfProximateEvents = returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles);
        // jquery stuff to push events into repeating element
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

});