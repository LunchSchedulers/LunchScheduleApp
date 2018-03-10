$(document).ready(function(){

    // Global Variables
    var arrayOfAllEvents = [];
    var arrayOfEventKeys=[];
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
        eventTypeEnum: 1, // not used for now
        eventExpiryTime: 999,
        eventName:"the name of the event"
    }
    var exampleLocation = {
        latitude:"",
        longitude:""
    }
    var currentLocation = {
        latitude:"",
        longitude:""
    }
    var database;
    // Data manipulation and calculations
    function convertStringToUnixTime(theDateAndTimeAsString){ // WORKS
        var convertedDate = moment(theDateAndTimeAsString).format("X");
        return convertedDate;
    }
    function doesUserHaveActiveEventInFirebase(greeterName){ // WORKS
        var currentTimeInUnix = convertStringToUnixTime(Date.now());
        for (var i=0;i<arrayOfAllEvents.length;i++){
            if (arrayOfAllEvents[i].greeterName == greeterName && arrayOfAllEvents[i].eventStartTime>= currentTimeInUnix){
                return true;
            }
        }
        return false;
    }
    function testIfEventIsInProximityWindow(currentLocation, theEvent, proximityWindowInMiles){ // WORKS
        var distanceBetweenEvents = getDistanceBetweenCoordinatesInMiles(currentLocation.latitude,currentLocation.longitude,theEvent.latitudeOfEvent,theEvent.longitudeOfEvent);
        if (distanceBetweenEvents <= proximityWindowInMiles) {
            return true;
        } else {
            return false;
        }
    }
    function returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles){ // WORKS
        var arrayOfProximateEvents = [];
        for (var i=0; i<arrayOfAllEvents.length; i++){
            if (testIfEventIsInProximityWindow(currentLocation, arrayOfAllEvents[i],proximityWindowInMiles)){
                arrayOfProximateEvents.push(arrayOfAllEvents[i]);
            }
        }
        return arrayOfProximateEvents;
    }
    function getDistanceBetweenCoordinatesInMiles(lat1,lon1,lat2,lon2) { // WORKS
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        var distanceInMiles = d * 0.621371;
        return d;
    }
    function deg2rad(deg) { // WORKS
        return deg * (Math.PI/180)
    }
    function getLocation() { // WORKS
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                currentLocation.latitude = position.coords.latitude;
                currentLocation.longitude = position.coords.longitude;
                console.log(currentLocation);
            });
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
        
    }

    // Database Functions
    function connectToFirebase(){ // WORKS
        // clears local array of events and connects program to firebase
        arrayOfAllEvents=[];
        console.log(arrayOfAllEvents);
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
        console.log(arrayOfAllEvents);
    }
    function testPushToDatabase(){  // DELETE eventually
        var eventToPush = putUserEntryInEventObject();
        database.ref().push(eventToPush);
    }
    function populateFireBaseWithEventInfo(){ // WORKS
        // Gets info from user entry, pushes to firebase and clears user fields
        var eventToPush = putUserEntryInEventObject();
        database.ref().push(eventToPush);
        clearUserInputFields();
    }

 
    // Interface functions
    function putUserEntryInEventObject(){ //Rewrite to interact with greeter page
    // pulls in user information and converts info to appropriate formats
        var localEventKey = Math.ceil(Math.random()*$("#lat-input").val());
        var userEvent = {
            greeterName: $("#greeterName-input").val(),
            eventName: $("#eventName-input").val(),
            latitudeOfEvent: parseInt($("#lat-input").val()),
            longitudeOfEvent: parseInt($("#long-input").val()),
            addressOfEvent: $("#eventAddress-input").val(),
            nameOfEventLocation: $("#locationName-input").val(),
            eventStartTime: parseInt(convertStringToUnixTime($("#startTime-input").val())),
            eventEndTime: parseInt(convertStringToUnixTime($("#endTime-input").val())),
            eventAdded:parseInt(convertStringToUnixTime(Date.now())),
            eventKey:localEventKey,
            eventExpiryTime:parseInt($("#endTime-input").val())+(30*60)
        }
        console.log(userEvent);
        return userEvent;
    }
    function pushEventToDatabase(){  // Works update for greeter page
        if (!doesUserHaveActiveEventInFirebase($("#greeterName-input"))){
            var eventToPush = putUserEntryInEventObject();
            database.ref().push(eventToPush);
        } else {
            clearUserInputFields();
        }
    }
    function populateTableWithEvents(){ // Need to add interface stuff
        var arrayOfProximateEvents = returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles);
        // jquery stuff to push events into repeating element
    }
    function clearUserInputFields(){ // EMPTY - needs work
        // jquery stuff
    }
    
    $("#click-button").on("click", function() { // DELETE - used for testing
        console.log("clicked");
        testPushToDatabase();
    });
    $("#proxTest").on("click", function() { // DELETE - used for testing
        console.log(returnArrayOfAllEventsWithinProximityWindow(currentLocation,5));
    });


    // page load activities
    getLocation();
    connectToFirebase();
    database.ref().on("child_added", function(snapshot) { // WORKS. Main firebase watcher
        var sv = snapshot.val();
        arrayOfAllEvents.push(sv);
        var theKey = snapshot.key;
        arrayOfEventKeys.push(theKey);
        console.log(arrayOfAllEvents);
        console.log(arrayOfEventKeys);
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});
