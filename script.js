// Initialize my own map
var map = L.map('crimeMap').setView([37.755432, -122.429865], 12);

// Initialize the basemap
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);


// Use jQuery to grab Greg's SF crime data
var crimeData = jQuery.getJSON("https://raw.githubusercontent.com/gbrunner/adv-programming-for-gis-and-rs/f94237ceb15208e985207e7f3d48e292d330a6fa/Web%20Development%20Module/Unit%201%20-%20GitHub%20and%20Leaflet/sf_crime.geojson",function(data) {
  // Build a layer of crime points with proper marker popups.
  var crimes = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng);
        marker.bindPopup(feature.properties.title + '<br/>' + feature.properties.description + '<br/>' + feature.properties.date);
        return marker;
      }
    });
  
    // Turn the layer of crime points into a cluster map
    var clusters = L.markerClusterGroup();
    clusters.addLayer(crimes);
    map.addLayer(clusters);
});
