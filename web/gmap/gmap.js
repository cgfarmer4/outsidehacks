function CoordMapType(tileSize) {
	this.tileSize = tileSize;
}

CoordMapType.prototype.getTile = function(coord, zoom, owner) {
	var div = owner.createElement('div');
	div.style.width = this.tileSize.width + 'px';
	div.style.height = this.tileSize.height + 'px';

	div.style.backgroundSize =  "100% 100%";
	div.style.backgroundRepeat = "no-repeat";
	// div.style.backgroundPosition = "left top";
	// div.style.backgroundAttachment = "fixed";
/*
	div.style.backgroundImage = "url('" +
		'http://www.hec.usace.army.mil/maps/demo/modesto-dev/GetImage.ashx'+
		'?zoom=' + zoom +
		'&x=' + coord.x +
		'&y=' + coord.y +
		'&time=' + '01Jan2005_0100' +
	"')";
*/
	div.style.border = "1px solid red";

	return div;
};

$(window).load(function()
{
	var mapOptions = {
		zoom: 18,
		center: new google.maps.LatLng(37.7754, -122.4),
		mapTypeId : google.maps.MapTypeId.SATELLITE
	};
	mapView = new google.maps.Map(document.getElementById("map"), mapOptions);

	var mapType = new google.maps.StyledMapType([{
		elementType: "all",
		featureType: "all",
	    stylers: [
	        { visibility: "on" }
	    ]
	}], { name: "Background Style" });
    mapView.mapTypes.set("Background Style", mapType);
    mapView.setMapTypeId("Background Style");
	//mapView.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256)));

	mapView.setMapTypeId(google.maps.MapTypeId.SATELLITE);

	heatmap = new HeatmapOverlay(mapView, {
        "radius": 10,
        "opacity": 50,
        "visible": true
    });

    $.getJSON("http://54.221.56.166/get_status.php"+"?callback=?", function(data) {
		for(var i in data) {
			var coord = data[i];
			heatmap.addDataPoint(coord.x, coord.y, 1);
		}
	});

	retrieveLocation();
});

function positionCallback(position)
{
	mapView.setCenter(new google.maps.LatLng(position.coords.latitude,
											 position.coords.longitude));
	$.get("http://54.221.56.166/get_status.php?x=" + position.coords.latitude + "&y=" +
		position.coords.longitude);

}
function retrieveLocation()
{
	if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(positionCallback);
	else console.log("Geolocation Unavailable");
}