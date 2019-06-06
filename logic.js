var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var myMap = L.map("map", {
  center: [39.8, -98.75],
  zoom: 3
});

 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(queryURL, function(response) {

  var quakeCircle = [];
  for (var i = 0; i < response.features.length; i++) {

    var color = "";
    if (response.features[i].properties.mag > 3) {
      color = "red";
    }
    else if (response.features[i].properties.mag > 2) {
      color = "yellow";
    }
    else if (response.features[i].properties.mag > 1) {
      color = "orange";
    }
    else {
      color = "green";
    }
    // Make circles
    quakeCircle.push(
      L.circle([response.features[i].geometry.coordinates[1], 
                response.features[i].geometry.coordinates[0]], {
        color: "white",
        fillColor: color,
        fillOpacity: 1,
        radius: response.features[i].properties.mag * 20000
      })
      .bindPopup("<h3>" + response.features[i].properties.place  +
      "</h3><hr><p>" + new Date(response.features[i].properties.time) + "</p>" + 
      "<p>" + "Mag:" + response.features[i].properties.mag + "</p>")
      .addTo(myMap)
    )
    }
})

