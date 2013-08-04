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
	mapCenter = new google.maps.LatLng(37.6,-121); //new google.maps.LatLng(38.649043,-121.162897);
	mapZoom = 15;
	var mapOptions = {
		zoom: mapZoom,
		center: mapCenter,
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
	mapView.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256)));

	mapView.setMapTypeId(google.maps.MapTypeId.SATELLITE);
});

function getLocation()
{
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(showPosition);
	else {
	}
}