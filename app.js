///PROXY SERVER

/*
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
*/

var asparagus = require('./asparagus.js')
    , events = require('events');

var myAsparagus = new asparagus();
myAsparagus.initialize();

//var console = new adminConsole(myAsparagus); //rework admin console into amasp main app
//console.consoleBoot();

myAsparagus.listener.on('initialized', function(){
	myAsparagus.boot();
});

myAsparagus.listener.on('booted', function(){
	console.log(myAsparagus.getParams());
	console.log(myAsparagus.getStatus());
});