/*
@author [Md Rasheduzzaman]
@email [jmrashed@mail.com]
@create date 2023-05-17 14:49:33
@modify date 2023-05-17 14:49:33
@desc [Draw polyline on google map using latitude and longitude coordinates] 
*/

// Load the Google Maps JavaScript API asynchronously
function loadMapScript() {
  var script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
  document.head.appendChild(script);
}

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.773481433356284, lng: 90.41602417477222 },
    zoom: 12,
  });

  // Load coordinates from the JSON file
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var coordinates = JSON.parse(xhr.responseText);

        var polyline = new google.maps.Polyline({
          path: coordinates,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });

        // Add location point labels with time
        for (var i = 0; i < coordinates.length; i++) {
          var marker = new google.maps.Marker({
            position: coordinates[i],
            label: {
              text: coordinates[i].label + "\n" + coordinates[i].time,
              color: "white",
            },
            map: map,
          });
        }

        // Mark the start point with a custom icon
        var startPoint = coordinates[0];
        var startMarker = new google.maps.Marker({
          position: startPoint,
          icon: {
            url: "./assets/images/green-dot.png",
            labelOrigin: new google.maps.Point(12, 10),
          },
          label: {
            text: "Start",
            color: "white",
          },
          map: map,
        });

        // Mark the end point with a custom icon
        var endPoint = coordinates[coordinates.length - 1];
        var endMarker = new google.maps.Marker({
          position: endPoint,
          icon: {
            url: "./assets/images/yellow-dot.png",
            labelOrigin: new google.maps.Point(12, 10),
          },
          label: {
            text: "End",
            color: "white",
          },
          map: map,
        });
      } else {
        console.error("Failed to load coordinates from JSON file.");
      }
    }
  };
  xhr.open("GET", "./assets/json/coordinates.json");
  xhr.send();
}
// Call the function to load the map script
loadMapScript();
