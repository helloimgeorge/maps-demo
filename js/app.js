/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {

    function createMap(center, zoom) { // center of map and zoom
        var mapElem = document.getElementById('map');
        var map = new google.maps.Map(mapElem, {
            center: center, // setting center to center
            zoom: zoom // setting zoom to zoom
        });

        var marker = new google.maps.Marker({
            position: center, // location of marker
            map: map, // map to be set upon
            animation: google.maps.Animation.DROP
        });

        var infoWindow = new google.maps.InfoWindow(); // info window, used for marker
        infoWindow.setContent('<p>Here I am</p>');

        google.maps.event.addListener(marker, 'click', function () { // google maps event listner for clicks
            console.log('marker clicked!');
            infoWindow.open(map, marker); // map that you're on, and marker that is anchored on
            //map.panTo(center); // pans to center when you click on marker
            map.panTo(marker.getPosition()); 
        }); // createMap()
    }

    var uwCoords = {
        lat: 45,
        lng: -100 // google maps need it to be negative if West
    }; // semi colon for objects

    function onGeoSuccess(position) {
        var center = {
            lat: position.coords.latitude, // curr lat
            lng: position.coords.longitude // curr lng
        };
        createMap(center, 14);
    } // onGeoSuccess()

    function onGeoError(position) { // not allowed to navigate GPS location
        console.log(error);


    } // onGeoErr()

    if (navigator && navigator.geolocation) { // test whether geoservices available // have to test if these exist b/c old browsers
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { // two functions-
            //enableHighAccuracy: true // for mobile devices, even more acurate slower response
            // PositionOptions.maximumAge indicate max age in MS of possible cached position so that you don't have to always update live
        });
    }
    else {
        createMap(uwCoords, 10);
    }
}); // on doc ready