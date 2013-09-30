function setViews(myExpressApp, myExpress) {
	var app = myExpressApp;
	var express = myExpress;

	app.get('/', function(req, res) {
		res.sendfile(__dirname + '/views/splash.html');
	});

	app.get('/example', function(req, res) {
		res.sendfile(__dirname + '/views/example.html');
	});

};

module.exports = setViews;