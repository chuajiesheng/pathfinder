document.addEventListener("deviceready", onDeviceReady, false);

// called when phonegap is ready
function onDeviceReady() {
	var element = document.getElementById('geo-geolocation');
	element.innerHTML = 
		'PhoneGap Loaded.';
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	var element = document.getElementById('geo-geolocation');
	element.innerHTML = 
		'Latitude: ' + position.coords.latitude + '<br />' +
		'Longitude: ' + position.coords.longitude + '<br />' +
		'Altitude: ' + position.coords.altitude + '<br />' +
		'Accuracy: ' + position.coords.accuracy + '<br />' +
		'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
		'Heading: ' + position.coords.heading + '<br />' +
		'Speed: ' + position.coords.speed + '<br />' +
		'Timestamp: ' + new Date(position.timestamp) + '<br />';

	$('#map').text("initalising map");
	initMap(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
}

function onError(error) {
	var element = document.getElementById('geo-geolocation');
	element.innerHTML = 
		'Code: ' + error.code +
		'<br />' +
		'Msg: ' + error.message;
}

// map js code
var map;
var infowindow;

function initMap(lat, long, rad) {
	var pyrmont = new google.maps.LatLng(lat, long);

	var map = new google.maps.Map(document.getElementById('geo-map'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	    center: pyrmont,
	    zoom: 15
	});

	// change radius to 500m dated 05102012
	rad = 1500;
	$('#geo-logs').append('radius = ' + rad + '<br />');

	var request = {
		location: pyrmont,
		radius: rad,
		types: ['subway_station', 'transit_station']
	};

	var service = new google.maps.places.PlacesService(map);
	service.search(request,mapCallBack);
}

var places = [];
var placesLoc = [];

function mapCallBack(results, status) {
	$('#geo-logs').append('map called back<br />');
	if (status == google.maps.places.PlacesServiceStatus.OK) {

		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			var placeLoc = place.geometry.location;
			var placeName = place.name;

			if ($.inArray(placeName, places) == -1) {
				places.push($.trim(placeName));
				placesLoc.push(placeLoc);
				$('#geo-logs').append('' + placeName + ' @ ' + placeLoc + '<br />');
			} else {
				$('#geo-logs').append('drop = "' + placeName + '"<br />');
			}
		}
	}
	$("#geo-places").autocomplete({
		source: places
	});
}
