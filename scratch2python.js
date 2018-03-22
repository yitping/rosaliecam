(function(ext) {
	// Cleanup function when the extension is unloaded
	ext._shutdown = function() {};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
		return {status: 2, msg: 'Ready'};
	};

	ext.my_first_block = function () {
		// code here
	};

	ext.wait_random = function(callback) {
		wait = Math.random();
		console.log('Waiting for ' + wait + ' seconds');
		window.setTimeout(function() {
			callback();
		}, wait*1000);
	};

	ext.get_temp = function(city, callback) {
		l = encodeURIComponent(city);
		u = 'http://api.openweathermap.org/data/2.5/weather?q='+l+'&units=metric&appid=4527311db98205a2bbb345df8e797d7c';
		// Make an AJAX call to the Open Weather Maps API
		$.ajax({
			url: u,
			dataType: 'json',
			timeout: 500,
			success: function(weather_data) {
				// Got the data - parse it and return the temperature
				temperature = weather_data['main']['temp'];
				callback(temperature);
			},
			error: function(e) {
				callback(e.responseJSON['message']);
			}
		});
	};

	// Blocks and block menu descriptions
	var descriptor = {
		blocks: [
			// block type, block name, function name
			[' ', 'my first block', 'my_first_block'],
			['w', 'wait for random time', 'wait_random'],
			['R', 'current temperature in city %s', 'get_temp', 'Sydney'],
		]
	};

	// Register the extension
	ScratchExtensions.register('My first extension', descriptor, ext);
})({});
