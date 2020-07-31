$(document).ready(function () {
  //Getting references 
  var userNameInput = $("#add-place-user-name");
  var placeNameInput = $("#add-place-name");
  var placeDescriptionInput = $("#add-place-description");
  let placeCoordinates = [4.20, 69]; // Coordinates to be fetched by ajax call to mapbox
  var key =
    "pk.eyJ1Ijoibm1pY2hlbDEyMyIsImEiOiJja2Q3azgzcjIweXRkMnJsb2thNjNxMHl1In0.P9dKHEfZIr3UNoSM2A3PxA";
  mapboxgl.accessToken = key;

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [-97.7, 30.3], // starting position [lng, lat]
    zoom: 8 // starting zoom
  });
  // When the form is submitted, we validate there's a user name, place name and description entered
  $("#add-place-submit").on("click", function (event) {
    event.preventDefault();

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