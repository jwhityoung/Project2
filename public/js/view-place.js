$(document).ready(function() {
  var key =
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
  // Making API call to GET from database list of places then renders places with a render function
  let globalId = 1;
  getAllPlaces();
  getReviews(globalId);
  // function to get *a* place based on id which should be stored as data-id in the html tag
  function getPlace(id) {
      $(".info").empty();
    $.get("api/place/" + id, function(data) {
      console.log("getting place..." + id);
      renderPlaceInfo(data);
      getReviews(id);
      globalId = id;
      let coordinates = [parseFloat(data.latitude), parseFloat(data.longitude)];
        console.log("moving map to: " + coordinates)  
      new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: coordinates, // starting position [lng, lat]
          zoom: 8 // starting zoom
        })
    });
  }
  // function to get all places to be rendered in another function
  function getAllPlaces() {
    $.get("/api/place", function(data) {
      //data = JSON.stringify(data);
      console.log("getting all places..." + data);
      renderPlaceInfo(data[0]);
      renderPlaceList(data);
    });
  }

  function getReviews(id) {
      $.get("/api/review/" + id, function(data) {
          renderReviews(data);
          listenDeleteRev(data);
      })
  }

  function listenDeleteRev(data) {
    for(i = 0; i < data.length; i++){
    $("#rev-del-" + i).on("click", function(e) {
      e.stopPropagation()
      var revId = this.data("revid");
        console.log("clicked on review-" + revId) // DEL
      if(revId){
        deleteReview(revId);
      }
    })
  }
}

  function deleteReview(id) {
    $.ajax({
      method: "DELETE",
      url:"/api/review/" + id
    }).then(getReviews(id))
  }

  function renderPlaceList(data) {
    console.log("...rendering list from " + data); // DEL
    $(".place-div").empty();
    var ulGen = $("<ul>");
    ulGen.addClass("place-ul");
    $(".place-div").append(ulGen);
    console.log(data[0]);
    for (i = 0; i < data.length; i++) {
      console.log(data[i]);
      var liGen = $("<li>");
      liGen.addClass("place-list");
      //liGen.addClass("go-here")
      liGen.data("placeId", data[i].id);
      
      var aTag = $("<a href='#'>");
      aTag.addClass("go-here");
      aTag.attr("id", "place-"+i)
      aTag.data("placeId", data[i].id);
      aTag.attr("style", "--animation-order: " + i + ";");
      aTag.text(data[i].name);
      liGen.html(aTag);
      //console.log(liGen)
      $(".place-ul").append(liGen);

      $("#place-" + i).on("click", function(e) {
        e.preventDefault();
        var placeId = $(this).data("placeId");
        console.log("place " + placeId + " has been clicked...");
        getPlace(placeId)
      });
    }
  }

  function renderPlaceInfo(data) {
    console.log("...rendering place data from " + data);
    var divGen = $("<div>");
    divGen.addClass("content");
    var placeId = data.id
    divGen.html(
      "<h2>" + data.name + "</h2><button class='delete' id='place-del' data-placeId='" + placeId +"'> delete </button>" + "<br><p>" + data.description + "</p>"
    );
    $(".info").append(divGen);
  }

 function renderReviews(data) {
     console.log("...rendering reviews from " + data); // DEL
     $(".reviews").empty();
     for (i = 0; i < data.length; i++) {
            console.log(data[i]);
        var btnGen = $("<button>");
        btnGen.addClass("accordion");
        btnGen.data("reviewId", data[i].id);
        btnGen.attr("Id", "button-" + i);
        btnGen.attr("style", "--animation-order: " + i + ";")
        btnGen.text(data[i].title)
        $(".reviews").append(btnGen)
        // Generating collapsible panel div that holds the review text
        var divGen = $("<div>");
        divGen.addClass("panel");
        divGen.attr("Id", "panel-" + i);
        divGen.html("<p>" + data[i].body + "</p><button class='delete' id='rev-del-" + i +"' data-revId='" + i +"'> delete </button>")
        $(".reviews").append(divGen)
        $("#button-" + i).on("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          })
     }
 }

// EVENT LISTENTERS ===============================
window.setTimeout(function() {
  $(".go-here").on("click", function(e) {
    e.stopPropagation()
    var placeId = $(this).data("placeId");
    console.log("place " + placeId + " has been clicked...");
    getPlace(placeId).then(
      new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: data.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
      })
    );
  });

  $("#place-del").on("click", function(e) {
    e.stopPropagation();
    var placeId = $(this).data("placeid");
      console.log("deleting place " + placeId)
    $.ajax({
      method: "DELETE",
      url: "/api/place/" + placeId
    }).then(getAllPlaces);
  })
}, 4200);
});
