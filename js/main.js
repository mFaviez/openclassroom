// Coordonnées GPS centre de Lyon
// Zoom 13
var map = L.map('map').setView([45.75, 4.85], 13);

// affiche la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	maxZoom: 18
}).addTo(map);

//  Appelle l'api de Jc Decaux
var requestApiJcDecaux = new Request("GET",
	"https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=86336f490faeca7a6183865a8cd9bd7e226a74f6");

requestApiJcDecaux.call(function (response) {

	response = JSON.parse(response);
	response.forEach(function (info) {
		var latitude = info.position.lat;
		var longitude = info.position.lng;
		L.marker([latitude, longitude]).on('click', onMarkerClick).addTo(map);
	});

	function onMarkerClick(e) {
		var addressElt = document.getElementById("address");
		var bikeStandsElt = document.getElementById("bikeStands");
		var availableBikesElt = document.getElementById("availableBikes");
		requestApiJcDecaux.form(function (infos) {
			infos.forEach(function (info) {
				if ((e.latlng.lat === info.position.lat) && (e.latlng.lng === info.position.lng)) {
					addressElt.innerText = info.address;
					bikeStandsElt.innerText = info.bike_stands;
					availableBikesElt.innerText = info.available_bikes;
					return;
				}
			});
		});
	}	
});
