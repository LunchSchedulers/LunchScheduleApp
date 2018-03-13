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
    function convertUnixTimeToUserReadable(unixTimeValue){
        // solution taken from https://stackoverflow.com/questions/20943089/how-to-convert-unix-timestamp-to-calendar-date-moment-js
        var dateString = moment.unix(unixTimeValue).format("MM/DD/YYYY hh:mm");
        return dateString
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
    function returnArrayOfEventsAfterTime(targetTime, arrayToInspect){ // need to test
        var returnedArray=[];
        if (targetTime == ""){
            targetTime = convertStringToUnixTime(Date.now());
        } else {
            targetTime = convertStringToUnixTime(targetTime);
        }
        if (arrayToInspect==[]){
            arrayToInspect = arrayOfAllEvents;
        }
        for (var i=0;i<arrayToInspect.length; i++){
            if (arrayToInspect[i].eventEndTime>=targetTime){
                returnedArray.push(arrayToInspect[i]);
            }
        }
        return returnedArray;
    }
    function getDistanceBetweenCoordinatesInMiles(lat1,lon1,lat2,lon2) { // WORKS
        // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong
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
    function testPushToDatabase(){  // DELETE eventually
        var eventToPush = putUserEntryInEventObject();
        database.ref().push(eventToPush);
        $("input").val("");
        $("#startEvent").val("");
        $("#end").val("");
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
        var startTimeToChangeToUnix = $("#greeter-date").val() + " " + $("#startEvent").val();
        var endTimeToChangeToUnix = $("#greeter-date").val() + " " + $("#end").val();

        var userEvent = {
            // direct user inputs
            greeterName: $("#name").val(),
            eventName: $("#event").val(),
            eventStartTime: convertStringToUnixTime(startTimeToChangeToUnix),
            eventEndTime: convertStringToUnixTime(endTimeToChangeToUnix),

            // info received from google location search
            // need to integrate with places.js
            latitudeOfEvent: googleInfoLatAndLong.googleLat,
            longitudeOfEvent: googleInfoLatAndLong.googleLong,
            addressOfEvent: addressString,
            nameOfEventLocation: addressString,

            
            // stuff we probably don't need
            eventAdded:parseInt(convertStringToUnixTime(Date.now())),
            // eventKey:localEventKey,
            // eventExpiryTime:parseInt($("#endTime-input").val())+(30*60)
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
            //populate UI div to explain to user
        }
    }
    function returnArrayToPopulateDivs(proximityWindowInMiles){ // 
        var arrayOfProximateEvents = returnArrayOfAllEventsWithinProximityWindow(currentLocation, proximityWindowInMiles);
        var arrayToPopulateTableWith = returnArrayOfEventsAfterTime(Date.now(),arrayOfProximateEvents);
        return arrayToPopulateTableWith;
    }
    function clearUserInputFields(){ // EMPTY - needs work
        // jquery stuff
    }
    function displayProximateEventsToMeeterPage() {
        $(".event-table").find("tr:gt(0)").remove();

        var userSelectedProximity = $("#radius").val();
        console.log(userSelectedProximity);
        var arrayToPopulateDivsWith = returnArrayToPopulateDivs(userSelectedProximity);
        for (var i = 0; i < arrayToPopulateDivsWith.length; i++){
            var tr = $("<tr>");

            // create td's for data
            var td1 = $("<td>");
            var td2 = $("<td>");
            var td3 = $("<td>");
            var td4 = $("<td>");
            var td5 = $("<td>");
            var td6 = $("<td>");

            td1.text(arrayToPopulateDivsWith[i].eventName);
            td2.text(arrayToPopulateDivsWith[i].greeterName);
            td3.text(arrayToPopulateDivsWith[i].nameOfEventLocation);
            td4.text(arrayToPopulateDivsWith[i].addressOfEvent);
            td5.text(convertUnixTimeToUserReadable(arrayToPopulateDivsWith[i].eventStartTime));
            td6.text(convertUnixTimeToUserReadable(arrayToPopulateDivsWith[i].eventEndTime));

            // append td's to tr
            td1.appendTo(tr);
            td2.appendTo(tr);
            td3.appendTo(tr);
            td4.appendTo(tr);
            td5.appendTo(tr);
            td6.appendTo(tr);

            tr.appendTo("#appendTableInfoHere");
        }
    }

    // Weather information
    function updateDescriptionOfWeather(){
        var userDate = $("#greeter-weather-date").val();
        var userTime = $("#start").val();
        var userDateAndTime = userDate+" "+userTime;
        var userDateAndTimeInUnix = convertStringToUnixTime(userDateAndTime);
        var weatherQueryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4d7a5f366d026dfd52097e2d1c9481f4/"+currentLocation.latitude+","+currentLocation.longitude+","+userDateAndTimeInUnix;
            // https://cors-anywhere.herokuapp.com/

        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.currently.apparentTemperature + " " + response.currently.summary);
            $("#testWeather").html(Math.floor(response.currently.apparentTemperature) + "&deg;F " + response.currently.summary);
        });
    }

    // Click listeners
    $("#click-button").on("click", function() { // DELETE - used for testing
        console.log("clicked");
        testPushToDatabase();
    });
    $("#proxTest").on("click", function() { // DELETE - used for testing
        console.log(returnArrayOfAllEventsWithinProximityWindow(currentLocation,5));
    });
    $("#get-weather").on("click", function() { // DELETE - used for testing
        event.preventDefault();
        updateDescriptionOfWeather();
    });
    $("#search").on("click", function() { // proximity search
        event.preventDefault();
        console.log("prox search clicked:");
        console.log(returnArrayOfAllEventsWithinProximityWindow(currentLocation,5));
        displayProximateEventsToMeeterPage();
    });
    $("#submit").on("click", function() { // proximity search
        event.preventDefault();
        testPushToDatabase();
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