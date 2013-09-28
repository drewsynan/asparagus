var adminConsole = require('./admin.js')
    , amApp = require('./amasp.js')
    , events = require('events');

//var L = new events.EventListener();

var AmericanAsparagus = new amApp();
AmericanAsparagus.initialize();

var console = new adminConsole(AmericanAsparagus);
console.consoleBoot();

AmericanAsparagus.listener.on('initialized', function(){
	//AmericanAsparagus.boot();
});

//console.bootApp();