$(document).ready(function () {
       
    //Getting references 
var placeSelected = $("#place-review-list option:selected").text();
var placeReviewInput = $("#place-review");

 // When the form is submitted, we validate there's a user name, place name and description entered
 $("#review-submit").on("click", function (event) {
        event.preventDefault();
        var userData = {
            placeSelected: placeSelected,
            placeReview: placeReviewInput.val().trim(),
        };
        console.log(userData);
        if (!userData.placeSelected || !userData.placeReview) {
            return;
        }


        // Clear the form ** NOT WORKING PROPERLY 
        reviewPlace(userData.userName, userData.placeName, userData.placeDescription);
        placeSelectedInput.val("");
        placeReviewInput.val("");
    });

    //Still need to post to DB 

});

