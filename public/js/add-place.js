$(document).ready(function() {
  //Getting references 
  var userNameInput = $("#add-place-user-name");
  var placeNameInput = $("#add-place-name");
  var placeDescriptionInput = $("#add-place-description");
  let placeCoordinates = [4.20, 69]; // Coordinates to be fetched by ajax call to mapbox

  // When the form is submitted, we validate there's a user name, place name and description entered
  $("#add-place-submit").on("click", function(event) {
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
        // If we have an email and password we run the addPlace function and clear the form **NOT WORKING PROPERLY
        // addPlace(userData.userName, userData.placeName, userData.placeDescription);
        // userNameInput.val("");
        // placeNameInput.val("");
        // placeDescriptionInput.val("");
        );

    //function to post userdata

  });
  function addPlace(userData) {
    console.log(userData)
    $.post("/api/add-place", userData)
  }
});