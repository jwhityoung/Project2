$(document).ready(function () {
    //Getting references 
    var addPlaceForm = $("form.add-place-form");
    var userNameInput = $("#add-place-user-name");
    var placeNameInput = $("#add-place-name");
    var placeDescriptionInput = $("#add-place-description");


    // When the form is submitted, we validate there's a user name, place name and description entered
    $("#add-place-submit").on("click", function (event) {
        event.preventDefault();
        var userData = {
            userName: userNameInput.val().trim(),
            placeName: placeNameInput.val().trim(),
            placeDescription: placeDescriptionInput.val().trim()
        };
        console.log(userData);
        if (!userData.userName || !userData.placeName || !userData.placeDescription) {
            return;
        }


        // If we have an email and password we run the addPlace function and clear the form
        addPlace(userData.userName, userData.placeName, userData.placeDescription);
        userNameInput.val("");
        placeNameInput.val("");
        placeDescriptionInput.val("");
    });

    // function addPlace(userName, placeName, placeDescription) {
    //     $.post("/api/add-place", {

    //         name: placeName, 
    //         description: placeDescription
            

    //     })
    // }
});
