document.addEventListener("deviceready", onDeviceReady, false);

// called when phonegap is ready
function onDeviceReady() {
	var element = document.getElementById('geolocation');
	element.innerHTML = 
		'PhoneGap Loaded.';
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	var element = document.getElementById('geolocation');
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
	var element = document.getElementById('geolocation');
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

	var map = new google.maps.Map(document.getElementById('map'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	    center: pyrmont,
	    zoom: 15
	});

	// change radius to 500m dated 05102012
	rad = 500;
	$('#logs').append('radius = ' + rad + '<br />');

	var request = {
		location: pyrmont,
		radius: rad,
		types: ['accounting', 'airport ', 'amusement_park', 
		'aquarium ', 'art_gallery', 'bakery ', 
		'bank ', 'bar ', 'beauty_salon', 
		'bicycle_store', 'book_store', 'bowling_alley', 
		'bus_station', 'cafe ', 'campground ', 
		'car_dealer', 'car_rental', 'car_repair', 
		'casino ', 'church ', 'city_hall', 
		'clothing_store', 'convenience_store', 
		'courthouse', 'dentist ', 'department_store', 
		'doctor', 'electrician', 'electronics_store', 
		'embassy ', 'establishment ', 'finance ', 
		'florist ', 'food ', 'furniture_store', 
		'gas_station', 'general_contractor', 'grocery_or_supermarket', 
		'gym ', 'hair_care', 'hardware_store', 
		'health ', 'hindu_temple', 'home_goods_store', 
		'hospital ', 'insurance_agency', 'jewelry_store', 
		'laundry ', 'lawyer ', 'library ', 
		'liquor_store', 'local_government_office', 'locksmith ', 
		'lodging ', 'meal_delivery', 'meal_takeaway', 
		'mosque', 'movie_rental', 'movie_theater', 
		'moving_company', 'museum ', 'night_club', 
		'painter ', 'park ', 'pet_store', 
		'pharmacy ', 'physiotherapist ', 'place_of_worship', 
		'plumber ', 'police ', 'post_office', 
		'real_estate_agency', 'restaurant ', 'roofing_contractor', 
		'rv_park', 'school ', 'shoe_store', 
		'shopping_mall', 'spa', 'stadium ', 
		'storage ', 'store ', 'subway_station', 
		'synagogue ', 'taxi_stand', 'train_station', 
		'travel_agency', 'university', 'veterinary_care', 
		'zoo ', 'colloquial_area', 'floor', 
		'point_of_interest', 'post_box', 'premise', 
		'room', 'subpremise', 'transit_station']
	};

	var service = new google.maps.places.PlacesService(map);
	service.search(request,mapCallBack);
}

var places = [];
var placesLoc = [];

function mapCallBack(results, status) {
	$('#logs').append('map called back<br />');
	if (status == google.maps.places.PlacesServiceStatus.OK) {

		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			var placeLoc = place.geometry.location;
			var placeName = place.name;

			if ($.inArray(placeName, places) == -1) {
				places.push($.trim(placeName));
				placesLoc.push(placeLoc);
				//$('#logs').append('' + placeName + ' @ ' + placeLoc + '<br />');
			} else {
				$('#logs').append('drop = "' + placeName + '"<br />');
			}
		}
	}
	$("#places").autocomplete({
		source: places
	});
}
