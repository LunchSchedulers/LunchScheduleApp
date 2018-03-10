//google api location vars ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ //
      var addressLat; //address selected from autocomplete searchbar latitude//
      var addressLng; //address selected from autocomplete searchbar longitude//
      var latitude; //latitude of users current location//
      var longitude; //longitude of users current location//
      var addressString; //string of address array from google api//


      //gets users current latitude and longitude//↓ ↓ ↓ ↓ 
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        var latitude=position.coords.latitude
        var longitude=position.coords.longitude
        initAutocomplete(latitude, longitude);
        getInfo(latitude,longitude)

      });
      //function for an onlick event to capture all information//
      //↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ //
      function getInfo(addressLat, addressLng) {
        console.log(addressLat, addressLng);
        console.log(addressString)
        console.log(longitude, latitude)

      }

      //initializes google api Autocomplete//
      //↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ //
      function initAutocomplete(lat, long) {
        console.log(lat, long)
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: long},
          zoom: 13,
          mapTypeId: 'roadmap'
        });


        // Create the search box and link it to the UI element.
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        //array of markers//
        //↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ //
        var markers = [];



        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.↓ ↓ ↓ ↓ ↓ ↓ ↓ 


        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          console.log(places[0])
          console.log(places[0].address_components)
          var addressComponents= places[0].address_components;
          console.log(places.address_components)

       addressString = places[0].address_components[0].long_name+ " " + places[0].address_components[1].long_name + " " + places[0].address_components[2].long_name + ", " + places[0].address_components[4].short_name + " " + places[0].address_components[6].long_name

       console.log(addressString)
          

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);

          });
          markers = [];

          
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            
            }

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          //getting the lattitude and longitude of the  address searched//
          map.fitBounds(bounds);
          console.log(markers[0].position.lat());
          console.log(markers[0].position.lng());
          var addressLat = markers[0].position.lat();
          var addressLng = markers[0].position.lng();ß

          
        });
      }