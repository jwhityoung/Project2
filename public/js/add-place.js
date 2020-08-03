$(document).ready(function () {
  //Getting references 
  var userNameInput = $("#add-place-user-name");
  var placeNameInput = $("#add-place-name");
  var placeDescriptionInput = $("#add-place-description");
  var placeCoordinates = [-97.7, 30.3]; // Coordinates to be fetched by ajax call to mapbox
  const key =
  "pk.eyJ1Ijoibm1pY2hlbDEyMyIsImEiOiJja2Q3azgzcjIweXRkMnJsb2thNjNxMHl1In0.P9dKHEfZIr3UNoSM2A3PxA";
mapboxgl.accessToken = key;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-97.7, 30.3], // starting position [lng, lat]
  zoom: 8 // starting zoom
});

var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California"
      }
    }
  ]
};

map.on('click', function(e) {
      var point = JSON.stringify(e.point);
      var coordinates = e.lngLat.wrap();
        console.log("clicked here: " + point, coordinates);
      placeCoordinates = [coordinates.lng, coordinates.lat];
        console.log("writing coordinates " + placeCoordinates)  
    });
// Retrieve coordinates of place on map

  // When the form is submitted, we validate there's a user name, place name and description entered
  $("#add-place-submit").on("click", function (event) {
    event.preventDefault();
      console.log("writing coordinates " + placeCoordinates)
    var userData = {
      userName: userNameInput.val().trim(),
      placeName: placeNameInput.val().trim(),
      placeDescription: placeDescriptionInput.val().trim(),
      coordinates: placeCoordinates,
    };
    console.log(userData);
    // Calling addPlace function which will post data to place-api
    addPlace(userData);
    if (
      !userData.userName ||
      !userData.placeName ||
      !userData.placeDescription) {
            return;
        }

        userNameInput.val("");
      placeNameInput.val("");
      placeDescriptionInput.val("");
   

  });

  function addPlace(userData) {
    console.log(userData)
    $.post("/api/add-place", userData)
  };
});