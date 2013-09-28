var adminConsole = require('./admin.js')
    , amApp = require('./amasp.js')
    , events = require('events')
    , http = require('http')
    , httpProxy = require('http-proxy');

var options = {
	pathnameOnly: true,
	router: {
		'/admin': '127.0.0.1:9000',
		'/1': '127.0.0.1:8080'
	}
};

httpProxy.createServer(options).listen(80);

//var L = new events.EventListener();

var AmericanAsparagus = new amApp();
AmericanAsparagus.initialize();

var console = new adminConsole(AmericanAsparagus);
console.consoleBoot();

AmericanAsparagus.listener.on('initialized', function(){
	//AmericanAsparagus.boot();
});

//console.bootApp();