Quake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
Api_key = "pk.eyJ1IjoiYnJvb2thbm4iLCJhIjoiY2tvcDI5ZzQ4MDF6eTJxbGM0YzJ6d3N3YiJ9.UPSAHkGUAQB4nJo0NnXv9g"
// Perform a GET request to the query URL
d3.json(Quake).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});
function size (Magnitude){
    return Magnitude *30000
}

function color (Depth){
    if (Depth > 90) return "red"
    else if (Depth > 70) return "dark orange"
    else if (Depth > 50) return "orange"
    else if (Depth > 30) return "yellow"
    else if (Depth > 10) return "purple"
    else  return "blue"}

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature,location){
          return new L.circle(location,
            {
                radius:size (feature.properties.mag)
                ,fillColor:color (feature.geometry.coordinates[2])
                ,fillOpacity:.1
                ,color: "tan"
                ,stroke: true
                ,weight: 1
            })
      }
    ,onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var stmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
           tileSize: 512,
             maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: Api_key
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: Api_key
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": stmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [stmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}