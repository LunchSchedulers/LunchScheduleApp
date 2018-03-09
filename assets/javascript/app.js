$(document).ready(function(){

    // FOR INTERFACE: assume object name is theEvent

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
    // Database Helper Functions
    function pushEventKeyToLocalStorage(eventKey){
        localStorage.setItem("eventkey", exampleEvent.eventKey);
    }
    function testIfLocalEventExistsInFirebase(){
        var localEventID = localStorage.getItem("eventKey");
        if (localEventID != ""){
            // for each event in firebase, see if localEventID matches
        }
    }
    function testIfEventIsInProximityWindow(currentLocation, eventLocation, proximityWindowInMiles){
        var distanceBetweenEvents = getDistanceBetweenCoordinatesInMiles(currentLocation.latitude,currentLocation.longitude,eventLocation.latitude,eventLocation.longitude);
        if (distanceBetweenEvents <= proximityWindowInMiles) {
            return true;
        } else {
            return false;
        }
    }
    function returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles){
        var arrayOfProximateEvents = [];
        for (var i=0; i<arrayOfAllEvents.length; i++){

        }
        
        return arrayOfProximateEvents;
    }
    function testPushToDatabase(){
        var eventToPush = putUserEntryInEventObject();
        database.ref().push(eventToPush);
    }
    function putUserEntryInEventObject(){
        var localEventKey = Math.ceil(Math.random()*$("#lat-input").val());
        var userEvent = {
            greeterName: $("#greeterName-input").val(),
            eventName: $("#eventName-input").val(),
            latitudeOfEvent: $("#lat-input").val(),
            longitudeOfEvent: $("#long-input").val(),
            addressOfEvent: $("#eventAddress-input").val(),
            nameOfEventLocation: $("#locationName-input").val(),
            eventStartTime: $("#startTime-input").val(),
            eventEndTime: $("#endTime-input").val(),
            eventAdded:Date.now(),
            eventKey:localEventKey,
            eventExpiryTime:$("#endTime-input").val()+(30*60)
        }
        console.log(userEvent);
        return userEvent;
    }
    function populateFireBaseWithEventInfo(){
        // jquery to populate info for event

        // get all exampleEvent element from HTML
        // push exampleEventObject to firebase
    }
    function connectToFirebase(){
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
    function snapshotToArray(snapshot) {
        var returnArr = [];
    
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
    
            returnArr.push(item);
        });
    
        return returnArr;
    };
    function getDistanceBetweenCoordinatesInMiles(lat1,lon1,lat2,lon2) {
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
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
    function listArrayValues(){
        for (var i=0; i<arrayOfAllEvents.length;i++){
            console.log(arrayOfAllEvents[i]);
        }
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
                currentLocation.latitude = position.coords.latitude;
                currentLocation.longitude = position.coords.longitude;
                console.log(currentLocation);
            });
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
        
    }
    $("#click-button").on("click", function() {
        console.log("clicked");
        testPushToDatabase();
    });

    // page load activities
    // getLocation();
    connectToFirebase();
    database.ref().on("child_added", function(snapshot) {
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
