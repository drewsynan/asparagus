var express = require('express')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, events = require('events');

function adminConsole(application) {
	var params = {};
	//default params;
	params = {
		adminPort: 9000,
		theApp: application} /*,
		appParameters: application.getParams()
	}*/

	this.consoleSet = function(param, value) {
		params[param] = value;
	};

	this.consoleBoot = function() {
		//boot client app, wait for app ready

		io.set('log level', 0);
		server.listen(params.adminPort);
		console.log("Admin console running on port " + params.adminPort);

		app.get('/', function(req, res) {
			res.sendfile("admin.html");
		});

		app.use('/lib', express.static(__dirname + '/lib'));

		io.sockets.on('connection', function(socket) {

			socket.emit("adminParams", getWebParams());
			//console.log(webParams);

			socket.on('bootRequest',function(){
				console.log("BOOT REQUEST");
				params.theApp.boot();
				params.theApp.listener.on("booted", function() {
					socket.emit("adminParams", getWebParams());
				});
			});
			socket.on('haltRequest', function(){
				console.log("Halt Request");
				params.theApp.halt();
				params.theApp.listener.on("halted", function(){
					socket.emit("adminParams",getWebParams());
				});
			});

			socket.on('updateParams',function(newParams) {
				var set = params.theApp.setParam;
				set("appPort", newParams.appPort);
				set("dbHost", newParams.dbServer);
				set("dbPort", newParams.dbPort);
				set("dbName", newParams.dbName);
				set("populationSize", newParams.populationSize);
				set("crossoverRate", newParams.crossoverRate);
				set("mutationRate", newParams.mutationRate);

				socket.emit('updated');
				console.log("updated params");
			});
		});
	};
	this.consoleReboot = function() {};

	/*this.bootApp = function(){
		var appStatus = params.theApp.getStatus();

		console.log("APP STATUS");
		console.log(appStatus);

		if (appStatus.readyToBoot) {
			params.theApp.boot();
		}

	};*/

	this.rebootApp = function() {};

	this.setApp = function(param, value) {};

	function getWebParams() {
		var webParams = {
				adminPort: params.adminPort,
				appParams: params.theApp.getParams(),
				appStatus: params.theApp.getStatus()
			};

		return webParams
	};

};
module.exports = adminConsole;