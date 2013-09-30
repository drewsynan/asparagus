function setViews(myExpressApp, myExpress) {
	var app = myExpressApp;
	var express = myExpress;

	app.get('/example', function(req, res) {
		res.sendfile(__dirname + '/views/example.html');
	});

};

module.exports = setViews;