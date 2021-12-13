/*global L*/
/*global fetch*/


// let map = L.map("map").setView([40.7007, -73.9771], 11.25);


// L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attribution/">CartoDB</a>',
//     subdomains: "abcd",
//     maxZoom: 35
// }).addTo(map);

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2hheWFuaXR0b2V5IiwiYSI6ImNrd3FsaDg5dDBudWkydXM2ZDA5OHZ1emoifQ.0Id53dpAEDVDWdpeeRGu6A';
// const map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/chayanittoey/ckwqlnnhp0kpv14mhmyj61r5l',
// center: [12.550343, 55.665957],
// zoom: 8
// });
 
// Create a default Marker and add it to the map.
// const marker1 = new mapboxgl.Marker()
// .setLngLat([12.554729, 55.70651])
// .addTo(map);
 
// // Create a default Marker, colored black, rotated 45 degrees.
// const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
// .setLngLat([12.65147, 55.608166])
// .addTo(map);


      


// Load GeoJSON from an external file
fetch("dataset/world.geo.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {  // Add GeoJSON layer to the map once the file is loaded
        L.geoJSON(data, {style: style,onEachFeature: onEachFeature}).addTo(map);
    });

// Learning source : https://leafletjs.com/examples/choropleth/
 
 function getColor(d) {
    return d > 9 ? '#800026' :
           d > 8.5  ? '#BD0026' :
           d > 8  ? '#E31A1C' :
           d > 7.5 ? '#FC4E2A' :
           d > 7   ? '#FD8D3C' :
           d > 6.5   ? '#FEB24C' :
           d > 6   ? '#FED976' :
                      '#FFEDA0';
 }
 

function style(feature) {
    return {
        fillColor: getColor(feature.properties.Red_wine),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);

}
function resetHighlight(e) {
    geojson.resetStyle(e);
    info.update();
}

var geojson;
// ... our listeners
geojson = L.geoJson();

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Fine Particulate Matter (PM2.5)</h4>' +  (props ?
        '<b>' + props.NAME + '</b><br />' + props.Red_wine + ' mcg per cubic meter'
        : 'Hover over a neighbourhood');
};

info.addTo(map);



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [2, 3, 5, 6, 7, 8, 9, 10],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


// fetch("dataset/winedata.json")
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {  // Add GeoJSON layer to the map once the file is loaded
//         JSON.parse(data);
//         alert(data.title);
// });


function getRedWine() {
  var x = document.getElementById("redWineList");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function getWhiteWine() {
  var x = document.getElementById("whiteWineList");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}




var fs=require('fs');
var data=fs.readFileSync('dataset/winedata.json', 'utf8');
var words=JSON.parse(data);
var bodyparser=require('body-parser');
console.log(words);
var express=require('express');

var app=express();

var server=app.listen(3030,listening);

function listening(){
console.log("listening..");
}
app.use(express.static('website'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());







