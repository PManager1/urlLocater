// glolat = 39.6237;
glolat = 37.870004;
// glolong = -104.8738;
glolong = -121.88000;


function getLat() {
    return glolat;
};

function getLong() {
    return glolong;
};


function initialize(long, lat) {

    var lat = getLat();
    var long = getLong();

    console.log(' lat ', lat);
    console.log(' long ', long);


    // var lat = 39.6237;
    // var long = -104.8738;
    var myLatlng = new google.maps.LatLng(lat, long);
    // var myLatlng = new google.maps.LatLng(37.870004,-121.88000);
    var myOptions = {
        zoom: 5,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
    });
    marker.setMap(map);
}

function loadScript(foo, bar) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
}

// window.onload = loadScript;

function callsite(siteVal) {
    console.log('calling callsite', siteVal);
    var url = "http://freegeoip.net/json/" + siteVal;
    console.log(' url =', url);
    var jqxhr = $.ajax(url)
        .done(function(data) {
            // alert("success");
            console.log(' done =', data);

            glolat = data.latitude; 
            glolong = data.longitude
            loadScript(glolong, glolat);



            // var lat_w = data.latitude = glolat;
            // console.log(' w, lat=', data.latitude);
            // var long_w = data.longitude = glolong;
            // console.log(' w. long=', data.longitude);
            // loadScript(long_w, lat_w);
        })
        .fail(function() {
            alert("error");
        })
        .always(function() {
            // alert("complete");
        });
}


$(document).ready(function() {
    console.log('jquery loaded');
    $('#locate_website').on('click', function() {
        console.log(' button clicked');
        console.log(' input val =', $('#siteval').val());
        siteVal = $('#siteval').val();

        console.log('site val =', siteVal);
        callsite(siteVal);
    });
    $('#locate_coordinates').on('click', function() {
        console.log(' locate_coordinates clicked');
        var long = 37.870004;
        var lat = -121.88000;
        execute(long, lat);
    });



    $('#del').on('click', function() {
        console.log(' del clicked');
        var long = getLong();
        var lat = getLat();
        loadScript(long, lat);
    });



    // loadScript(long, lat);
});
