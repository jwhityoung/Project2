$(document).ready(function() {
    getAllPlaces().then()
  // function to get *a* place based on id which should be stored as data-id in the html tag
  function getPlace() {
    var listItemData = $(this).data("place");
    var id = listItemData.id;
    $.get("api/place/:id", function(data) {
      console.log("getting place..." + id);
    });
  }
  // function to get all places to be rendered in another function
  function getAllPlaces() {
    $.get("/api/place", function(data) {
      console.log("getting place..." + data);
    });
  }
});