function msToMin(duration) {
	var milliseconds = parseInt((duration % 1000) / 100);
	var	seconds = parseInt((duration / 1000) % 60);
	var	minutes = parseInt((duration / (1000 * 60)) % 60);
	var	hours = parseInt((duration / (1000 * 60 * 60)) % 24);

	return minutes + " min " + seconds + "s";
}

var FormElt = document.querySelector("#Form > .container");
var infosElt = document.createElement("p");
var stationElt = document.createElement("span");
var timerElt = document.createElement("span");
var isReservedElt = document.createElement("span");
infosElt.appendChild(stationElt);
infosElt.appendChild(timerElt);
infosElt.appendChild(isReservedElt);
FormElt.appendChild(infosElt);

var form = document.getElementById("form");

if (localStorage.getItem("name") && localStorage.getItem("firstName")) {

	var inputName = localStorage.getItem("name");
	var inputFirstName = localStorage.getItem("firstName");

	document.getElementById("inputName").value = inputName;
	document.getElementById("inputFirstName").value = inputFirstName;

	// console.log("Nom : " + localStorage.getItem("name"));
	// console.log("Prénom : " + localStorage.getItem("firstName"));
}


form.addEventListener("submit", function(e) {
	e.preventDefault();

	var delay = 20;
	delay = delay * 60 * 1000; // 1200000
	var remaining;

	function clock() {
		if (delay > 0) {
			remaining = msToMin(delay);
			delay = delay - 1000;
			stationElt.innerHTML = "Votre vélo est réservé !<br />";
			timerElt.innerHTML = "Temps restant : " + remaining + "<br />";
		} else {
			stationElt.innerHTML = "Votre vélo est réservé !<br />";
			timerElt.innerHTML += "Temps écoulé, fin de la réservation<br />";
			clearInterval(clock);
			sessionStorage.removeItem("reserved");
		}
	}

	inputName = document.getElementById("inputName").value;
	inputFirstName = document.getElementById("inputFirstName").value;

	localStorage.setItem("name", inputName);
	localStorage.setItem("firstName", inputFirstName);

	if (sessionStorage.getItem("reserved") !== "reserved") {
		sessionStorage.setItem("reserved", "reserved");
		var timer = setInterval(clock, 1000);
	} else if (sessionStorage.getItem("reserved") === "reserved") {
		isReservedElt.innerHTML = "Vous avez déjà une réservation en cours";
	}

});

