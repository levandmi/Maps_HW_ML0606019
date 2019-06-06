
    
var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var techURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

  // Define arrays to hold created city and state markers
  var quakeCircle = [];

  
  // Loop through locations and create city and state markers
  d3.json(quakeURL, function(response) {

    // Circles loop
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
        "<p>" + "Mag: " + response.features[i].properties.mag + "</p>")
      )
      }
      d3.json(techURL, function(data) {
        // Creating a GeoJSON layer with the retrieved data
       techPlate = L.geoJson(data)



// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  
  var satmap =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  })
  
  // Create two separate layer groups: one for cities and one for states
  var quakes = L.layerGroup(quakeCircle);
  var plates = L.layerGroup([techPlate]);
  
  // Create a baseMaps object
  var baseMaps = {
    "Satellite Map": satmap,
    "Street Map": streetmap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Earthquakes": quakes,
    "Tectonic Plates": plates
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [39.8, -98.75],
    zoom: 3,
    layers: [satmap, quakes, plates]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);





      })
  })


//   Tech plates





  
  