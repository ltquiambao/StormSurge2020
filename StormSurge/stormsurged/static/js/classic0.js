

var url_str = "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/"
var kml_docs = ["inundation_Haiyan.geojson"];
var i;
var loc=[];
var notif_arr=[];
var kybarangays;

var barangays = $.ajax({
url: url_str.concat(kml_docs[0]),
dataType: "json",
success: console.log("Barangay data successfully loaded."),
error: function (xhr) {
    alert(xhr.statusText)
}
})



function style(feature) {
return {
    weight: 0,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: feature.properties.fill
    };
}

$.when(barangays).done(function() {
    var map = L.map('map').setView([11.2142199211672, 125.009497200035], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var sidebar = L.control.sidebar('sidebar').addTo(map);


    kybarangays = L.geoJSON(barangays.responseJSON,{style:style} ).addTo(map);


});

var bar = $(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/timeseriesHaiyan_1_0_new.txt",
        dataType: "text",
        success: function(data) {processData(data);}
    });
});


function processData(data) {
    Papa.parse(data, {
        complete: function(results) {
            console.log("done!");
            notif_arr=results.data
            // main algo
            kybarangays.eachlayer(function(layer){
                layer.setStyle({fillColor : 'white'})
            });
            console.log("animation done!");
        }
    });
    
}


