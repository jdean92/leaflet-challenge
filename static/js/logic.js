var Url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";

d3.json(Url, function(data) {
    createFeatures(data.features);
  });

function createFeatures(earthquakeData) {
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.light",
        accessToken: API_KEY
      });
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.dark",
        accessToken: API_KEY
      });
    
      var circleGroup = [];
      for (var i = 0; i < earthquakeData.length; i++) {
        coordinates = [earthquakeData[i].geometry.coordinates[1],earthquakeData[i].geometry.coordinates[0]]
        properties = earthquakeData[i].properties;