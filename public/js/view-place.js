$(document).ready(function() {
  var key ="pk.eyJ1Ijoibm1pY2hlbDEyMyIsImEiOiJja2Q3azgzcjIweXRkMnJsb2thNjNxMHl1In0.P9dKHEfZIr3UNoSM2A3PxA";
  mapboxgl.accessToken = key;

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-97.7, 30.3], // starting position [lng, lat]
    zoom: 8 // starting zoom
  });

  var geojson = {
    type: 'FeatureCollection',
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
  getAllPlaces();

  // function to get *a* place based on id which should be stored as data-id in the html tag
  function getPlace(id) {
    $.get("api/place/:id", function(data) {
      console.log("getting place..." + id);
    });
  }
  // function to get all places to be rendered in another function
  function getAllPlaces() {
    $.get("/api/place", function(data) {
        //data = JSON.stringify(data);
      console.log("getting all places..." + data);
      renderPlaceList(data);
    })
}

  function renderPlaceList(data) {
      console.log("rendering list from" + data);
      $('.place-div').empty();
      var ulGen = $('<ul>');
        ulGen.addClass('place-ul');
      $('.place-div').append(ulGen);
      console.log(data[0]);
    for(i=0; i<data.length; i++){
        console.log(data[i])
        var liGen = $('<li href="#">');
        liGen.addClass('place-list');
        liGen.addClass('go-to');
        liGen.data('placeId', data[i].id);
        liGen.data('count', i);
        liGen.text(data[i].name);
        //console.log(liGen)
        $('.place-ul').append(liGen);
    }
  }

$('.go-here').click((e) => {
    e.preventDefault();
    var placeId = $(this).parent('li').data('id');
        console.log(placeId)
    getPlace(placeId).then(new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: data.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
      }));
})

});
