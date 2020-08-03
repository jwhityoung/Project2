$(document).ready(function() {
  //Getting references
  var placeSelected = $("#place-review-list");
  var placeReviewInput = $("#place-review");
  var reviewTitle = $("#review-title");

  // When the form is submitted, we validate there's a user name, place name and description entered
  $("#review-submit").on("click", function(event) {
    event.preventDefault();
    console.log(parseInt($("#place-review-list :selected").data("placeId")));
    var userData = {
      reviewTitle: reviewTitle.val().trim(),
      placeReview: placeReviewInput.val().trim(),
      placeId: $("#place-review-list :selected").data("placeId")
    };
    console.log("submitting review..." + JSON.stringify(userData));
    if (!userData.placeId || !userData.placeReview || !userData.reviewTitle) {
      return;
    } else {
      addReview(userData);
      // Clearing out form
      placeSelected.val("");
      placeReviewInput.val("");
      reviewTitle.val("");
    }
  });
  //Function to render a places list
  function getAllPlaces() {
    $.get("/api/place", function(data) {
      var places = data;
      console.log(places);
      for (i = 0; i < places.length; i++) {
        console.log("Rendering places list: " + places[i].name, places[i].id);
        var placeList = $("<option>");
        placeList.text(places[i].name);
        placeList.data("placeId", places[i].id);
        $("#place-review-list").append(placeList);
      }
    });
  }

  function addReview(userData) {
    console.log("adding review: " + userData);
    $.post("/api/review/", userData);
  }

  getAllPlaces();
});
