function Request(verb, url) {

	this.verb = verb;
	this.url = url;

	var stations = [];

	this.call = function(callback) {
		var req = new XMLHttpRequest();
		req.open(verb, url);

		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				stations = JSON.parse(req.responseText);
				callback(req.responseText);
			} else {
				callback(req.status);
			}
		});

		req.addEventListener('error', function() {
			console.log("erreur avec l'url " + url);
		});

		req.send(null);
	};

	this.form = function(callback) {
		callback(stations);
	};

}
