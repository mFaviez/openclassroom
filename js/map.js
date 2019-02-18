//API GOOGLE MAP//
var map;
 
// Crée un nouveau tableau vide pour tous les marqueurs de liste.
var markers = [];
function initMap() {
   //Constructeur crait une nouvelle map- il faut seulement le centre et le zoom.
    map = new google.maps.Map(document.getElementById('map'), {
        center:{lat:48.866667 , lng:2.333333 },
        zoom:13
    });
 // Position des endroit a marquer
 
 var locations= "https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=8a21045d07375cf3ca1a9fbd663ca141df365f16";
 
 
        /*[
        {title: 'Tour Eiffel', location: {lat:48.8584 , lng:2.2945}},
        {title: 'Arc de Triomphe', location: {lat:48.8738 , lng:2.2959}},
        {title: 'Panthéon', location: {lat:48.8467 , lng:2.3464}},
        {title: 'Notre Dame', location: {lat:48.8526 , lng:2.3492}},
        {title: 'Elysée', location: {lat:48.8708 , lng:2.3169}},
        {title: 'Sacré coeur', location: {lat:48.8872 , lng:2.3434}}
    ];*/
 
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    // Le groupe suivant utilise le tableau d'emplacement pour créer un tableau de marqueurs à l'initialisation.
    for(var i = 0; i < locations.length; i++) {
        // Récupère la position du tableau de localisation.
        var position = locations[i].position;
        var name = locations[i].name;
       // Crée un marqueur par emplacement et le place dans le tableau des marqueurs.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            name:name,
            animation: google.maps.Animation.DROP,
            id: i
        });
       //Rajoute le marqueur sur notre tableau de marqueurs
        markers.push(marker);
        // Étend les limites de la carte pour chaque marqueur
        bounds.extend(marker.position);
      // Crée un événement onclick pour ouvrir une infowindow à chaque marqueur.
        marker.addListener('click',function(){
           populateInfoWindow(this, largeInfowindow); 
        });
    }
    map.fitBounds(bounds);
}
// Cette fonction remplit l'infowindow lorsque le marqueur est cliqué. Nous n'autoriserons que
**** // un infowindow qui s'ouvrira sur le marqueur sur lequel vous avez cliqué
**** // sur cette position de marqueurs.
    function populateInfoWindow(marker, infowindow) {
        // Vérifie que l'infowindow n'est pas déjà ouvert sur ce marqueur.
        if (infowindow.marker !=marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.name + '</div>');
            infowindow.open(map, marker);
       // vérifie que la propriété marqueur est effacée si l'infowindow est fermé.
            infowindow.addEventListener('closeclick',function(){
              infowindow.setMarker(null) ; 
            });
        }
    };

var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=8a21045d07375cf3ca1a9fbd663ca141df365f16';
var oXhr = new XMLHttpRequest();
oXhr.onload = function () {
  var data = JSON.parse(this.responseText);
  // ici les données sont exploitables
  console.log('retour : ', data);
};
oXhr.onerror = function (data) {
  console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);