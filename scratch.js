// when opening meeter page
// run returnArrayOfAllEventsWithinProximityWindow
// parameters currentLocation, proximityWindowInMiles
// returns array of objects
// within object
	// event name
	// event location
	// event address
	// start time
	// end time
	// greeter name
// object name is theEvent

// create a for loop to loop through the array to display to page
	// create the row (<tr>, give var)
	// create the data cell (<td>, give var)
	// newCell.text(theEvent[i].eventName)
	// newCell.text(theEvent[i].greeterName)
	// newCell.text(theEvent[i].location)
	// newCell.text(theEvent[i].address)
	// newCell.text(theEvent[i].startTime)
	// newCell.text(theEvent[i].endTime)
	// append newCell to newRow
	// append newRow to tbody

function displayProximateEventsToMeeterPage() {
	for (var i = 0; i < arrayToPopulateDivsWith.length; i++){
		var tr = $("<tr>");
		var td = $("<td>");
		td.text(arrayToPopulateDivsWith[i].eventName);
		td.text(arrayToPopulateDivsWith[i].greeterName);
		td.text(arrayToPopulateDivsWith[i].nameOfEventLocation);
		td.text(arrayToPopulateDivsWith[i].addressOfEvent);
		td.text(arrayToPopulateDivsWith[i].eventStartTime);
		td.text(arrayToPopulateDivsWith[i].eventEndTime);
		td.appendTo(tr);
		tr.appendTo("<tbody>");
	}
}