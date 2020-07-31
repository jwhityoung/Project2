$(document).ready(function() {
  //Getting references
  var placeSelected = $("#place-review-list");
  var placeReviewInput = $("#place-review");
  var reviewTitle = $("#review-title");

  // When the form is submitted, we validate there's a user name, place name and description entered
  $("#review-submit").on("click", function(event) {
    event.preventDefault();
    var userData = {
      placeSelected: placeSelected.find(":selected").data("placeId"),
      placeReview: placeReviewInput.val().trim(),
      reviewTitle: reviewTitle.val().trim()
    };
    console.log(userData);
    if (
      !userData.placeSelected ||
      !userData.placeReview ||
      !userData.reviewTitle
    ) {
      return;
    } else {
      addReview(userData);
      // Clear the form ** NOT WORKING PROPERLY
      // reviewPlace(
      //   userData.userName,
      //   userData.placeName,
      //   userData.placeDescription
      // );
      placeSelected.val("");
      placeReviewInput.val("");
      reviewTitle.val("");
    }
  });
  //Function to displace place list
  function getAllPlaces() {
    $.get("/api/place", function(data) {
      var places = data;
      console.log(places);
      for (i = 0; i < places.length; i++) {
        console.log(places[i].name, places[i].id);
        var placeList = $("<option>");
        placeList.text(places[i].name);
        placeList.data("placeId", places[i].id);
        $("#place-review-list").append(placeList);
      }
    });
  }

  function addReview(userData) {
    console.log(userData);
    $.post("/api/review", userData);
  }

  getAllPlaces();
});
