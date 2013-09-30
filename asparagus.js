function asparagus() {

	var app = require('express')()
	, express = require('express')
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, crypto = require('crypto')
	, _ = require('underscore')
	, events = require('events');

	params = require('./params.js');

	var mainAppScope = this;

	var mainAppMessenger = new events.EventEmitter();
	this.listener = mainAppMessenger;

	/* params = {
			appPort: 8080,
			appHostName: 'localhost',
			dbHost: 'localhost',
			dbPort: 5984,
			dbName: 'amasp',
			populationSize: 10,
			crossoverRate: 0.85,
			mutationRate: 0.05,
			currentGeneration: 0,
			fitnessFunction: function(t) {return t}
		}; //default params */

	var status = {
		readyToBoot: false,
		appBooted: false,
		appRunning: false
	};

	var sendStack = new Array();

	this.initialize = function(initParams){

		/* COME BACK AND FIX THIS
		if(!params) {
			params = defaultParams;
			console.log("DEFAULT PARAMS");
		} else {
			params = initParams;
		}*/

		nano = require('nano')('http://' + params.dbHost + ":" + params.dbPort );
		dbName = params.dbName;

		initializer = new events.EventEmitter();
		initializer.on('setupInitialized', function(){
			status.readyToBoot = true;
			console.log("App initialized");
			mainAppMessenger.emit('initialized');
			//console.log(status);
			//mainAppScope.boot(); //FIX THIS!! use a listener in app.js to call AmAsp.boot()
		});

		createGenerationZero();

		/*/TESTS //////////
		testMutate();
		testCrossover();
		/////////////////*/


	};

	this.boot = function(){
		if(status.readyToBoot && !(status.appRunning) && !(status.appBooted)) {
			console.log("Booting App...");

			io.set('log level', 0);
			server.listen(params.appPort);

			status.appRunning = true;
			status.appBooted = true;

			console.log("App booted; Running on port " + params.appPort);
			mainAppMessenger.emit("booted");

			herder = new events.EventEmitter();

			//Serving directory
			//static /lib directory
			app.use('/lib', express.static(__dirname + '/lib'));

			////Favicon
			app.get('/favicon.ico', function(req, res) {
				res.sendfile(__dirname + '/lib/favicon.ico');
			});

			var views = require('./views.js')(app, express);



			///REST
			/*app.get('/currentFitness', function(req,res){
				res.setHeader('Content-Type', 'application/json');
				res.end(getCurrentGenerationByFitness());
			});*/


			///////// Web Sockets

			io.sockets.on('connection', function(socket) {

				//push initial choromosome once it's ready
				herder.on("hereYouGo",function(individual){
					socket.emit('initialChromosome',individual);
				});

				//queue up next individual
				getNextIndividual();

				socket.on('death', function(data) {
					storeIndividual(data);
				});

				/*socket.on('test', function(){
					console.log("TEST");
				});*/
			});

		} else if (status.appBooted) {
			//if booted, start listener again
			console.log("opening listener");
			server.listen(params.appPort); 
		} else {
			mainAppMessenger.on('initialized', function(){
				mainAppScope.boot();
			});
			mainAppScope.initialize();
		}
	};

	this.halt = function(){
		server.close();
		mainAppMessenger.emit("halted");
	};

	this.reboot = function(){
		server.listen(params.appPort);
	};

	this.hardReboot = function(){};

	this.getStatus = function(){
		return status;
	};
	this.getParams = function(){
		return params;
	};

	this.setParam = function(param, value) {
		params[param] = value;
	};

	/////CLASSES//////

	function createGenerationZero() {

		params.currentGeneration = 0;
		
		nano.db.destroy(params.dbName, function() {
			nano.db.create(params.dbName, function() {
				var db = nano.use(params.dbName);

				//create view of all documents without "time"

				var designDoc = {
					"_id":"_design/gen0",
					"views":
					{
						"no_timing_info": {
							"map" : function(doc) { if(doc.time == "none") {emit(doc.generation,doc);} }
						},
						"with_timing_info": {
							"map" : function(doc) { if(doc.time != "none") emit(doc.generation,doc); }
						},
						"total_fitness_0": {
							"map" : function(doc) { if(doc.generation == 0 && doc.time != "none") { emit(doc.generation, doc.fitness)} },
							"reduce": "_sum"
						},
						"total_fitness": {
							"map" : function(doc) { if(doc.time != "none") { emit(doc.generation, doc.fitness)} },
							"reduce": "_sum"
						}
					}

				};
				db.insert(designDoc, '_design/aggregates', function(err, res) {});

				for (var i=0; i<params.populationSize; i++) {
					var currentChrom = createRandomChromosome(params.currentGeneration, i);
					db.insert(currentChrom, {}, function(err, body) {
						if (err) {
							console.log(err.message);
						}
						//console.log(body.id);
						lookup = db.get(body.id, function(err, body){
							//console.log(body);
							sendStack.push(body);
						});
						
					});
				}
			});
			//initial population done event
			initializer.emit("setupInitialized");
		});

	}; //end createPopulationZero

	function storeIndividual(individual) {

		var db = nano.use(params.dbName);

		var t = individual.time;
		var f = fitness(t);
		individual["fitness"] = f;

		db.insert(individual, individual._id, function(err, body) {});
	} //end storeIndividual()

	function fitness(t) {
		//squared fitness function
		//return t*t;

		//identity fitness function
		//return t;

		//logistic fitness
		//var calcFitness = ((1/(1+Math.exp(-t/10000))) - 0.5);
		//console.log("Time: " + t.toString());
		//console.log("Fitn: " + calcFitness.toString());
		//console.log("-------");

		var fitFunc = params.fitnessFunction;
		calcFitness = fitFunc(t);

		return calcFitness;
	}; //end fitness()

	function getNextIndividual() {
		//If there are still things on the stack, pop them and send
		if(sendStack.length > 0) {
			checkSendStack();
		} else {

			//need to impliment unused individuals checker
			// amasp/_design/aggregates/_view/no_timing_info?key=[currentGeneration]

			//make new generation and requeue
			var db = nano.use(params.dbName);
			db.view('aggregates', 'no_timing_info', function(err,body) {
				if(!err) {
					if(body.total_rows != 0) {
						body.rows.forEach(function(doc) {
						sendStack.push(doc.value);
						});

						checkSendStack();
					} else {
						herder.on("generationReady", function() { checkSendStack(); });
						requestNewGeneration();

					}
				}
			});
		}
	}; // end getNextIndividual()

	function checkSendStack() {
		if(sendStack.length > 0) {
			var data = sendStack.pop();
			herder.emit("hereYouGo", data);
		}
	}; //end checkSentStack()

	function requestNewGeneration() {
		var currentGenVal = params.currentGeneration;
		var nextGenVal = currentGenVal + 1;

		var nextGen = new Array();

		console.log("REQUEST NEW GENERATION");

		var db = nano.use(params.dbName);

		//get total fitness
		var generationTotalFitness;
		//var viewName = "total_fitness_" + currentGeneration;
		//console.log(viewName);

		db.view('aggregates', 'total_fitness',{keys: [currentGenVal]}, function(err,body) {
			if(!err) {
				if(body.total_rows != 0) {
					body.rows.forEach(function(doc) {
						generationTotalFitness = doc.value;
						//console.log(generationTotalFitness);
					});
				}
			}
		});

		var currentGen = new Array();

		var cloneArray = new Array();
		var cdfArray = new Array();
		var cdfLookup = {};
		var probLookup = {};
		var idLookup = {};

		eE = new events.EventEmitter();
		eE.on("doneLooping", function(){
			var numClones = ( (1 - params.crossoverRate) * params.populationSize ) | 0;

			//push clones
			if (numClones > 0) {
				var sorted = currentGen.sort(sort_by(fitness,true,parseInt));

				cloneArray = sorted.slice(0,numClones);
				for(var i = 0; i<numClones; i++) {
					var currentClone = cloneArray.pop();
					currentClone["generation"] = nextGenVal;
					currentClone["individual"] = i;
					currentClone["time"] = "none";
					currentClone["fitness"] = "none";
					delete currentClone["_id"];

					nextGen.push(currentClone);
				}
			}

			//push offspring
			for(var i = numClones; i<params.populationSize; i++) {
				var parent1 = cdfLookup[binarySearch(cdfArray, Math.random())];
				var parent1Prob = probLookup[parent1._id];

				//reduce lookup table so parent1 can't reproduce with itself
				

				/////////// \/ below be fucked

				var reducedProbLookup = _.extend({},probLookup);
				delete reducedProbLookup[parent1._id];

				var reducedCdfLookup = {};
				var reducedCdfArray = [];

				var tempSum = 0;
				for (key in reducedProbLookup) {
					var newProb = reducedProbLookup[key] / (1 - parent1Prob);
					tempSum = tempSum + newProb;
					reducedCdfArray.push(tempSum);
					//console.log("KEY IS");
					//console.log(key);
					reducedCdfLookup[tempSum] =  idLookup[key];
				}

				///////// ^ above be fucked

				var parent2 = reducedCdfLookup[binarySearch(reducedCdfArray, Math.random())];

				var childChrom = mutateGene(crossOver(parent1.chromosome,parent2.chromosome),params.mutationRate);

				//need constructor for "indivdual" object
				/*
				child = new Individual();
				child.setChromosome(childChrom);
				child.setParents({"parent2":parent1._id, "parent2":parent2._id});
				child.setGeneration(nextGenVal);
				child.setIndividual(i);
				nextGen.push(child.toJSON());
				*/

				//need md5 code

				var child = {
					chromosome: childChrom,
					md5: '',
					generation: nextGenVal,
					individual: i,
					parent1: parent1._id,
					parent2: parent2._id,
					time: "none",
					fitness: "none"
				};
				nextGen.push(child);


			};
			//console.log("NEXTGEN");
			//console.log(nextGen);

			db.bulk({"docs":nextGen},{},function(){
				//console.log("NEXTGEN INSERTED");

				//get and push inserted values
				//increment current generation
				//checksendstack
				db.view('aggregates','no_timing_info',{keys:[nextGenVal]}, function(err,body){
					if(!err) {
						body.rows.forEach(function(doc){
							sendStack.push(doc.value);
						});
						//console.log(sendStack);
					}
					params.currentGeneration = nextGenVal;
					checkSendStack();
				});
			});
		});

		db.view('aggregates', 'with_timing_info',{keys: [currentGenVal]}, function(err, body) {
			if(!err) {
				currentSum = 0;
				body.rows.forEach(function(doc) {

					cloneArray.sort();

					var currentDoc = doc.value;

					currentGen.push(currentDoc);

					var currentProp = currentDoc["fitness"] / generationTotalFitness;
					currentDoc["prop"] = currentProp;

					var currentCumulativeSum = currentSum + currentDoc["prop"];
					currentDoc["cumulativeSum"] = currentCumulativeSum;

					//holdingTank.push(currentDoc);
					cdfArray.push(currentCumulativeSum);
					cdfLookup[currentCumulativeSum] = currentDoc;
					probLookup[currentDoc._id] = currentDoc.prob;
					idLookup[currentDoc._id] = currentDoc;

					currentSum = currentCumulativeSum;
				});
				eE.emit("doneLooping");
			}
		});
	}; // end requestNewGeneration()

	function binarySearch(hist, searchValue) {
		hist.sort();

		//console.log("-------------");
		len = hist.length;
		//console.log(len);

		if(len == 1) {
			//console.log("FOUND");
			//console.log(hist[0]);
			return hist[0];
		}

		pivot = Math.floor((hist.length)/2);
		//console.log("pivot");
		//console.log(pivot);

		leftHalf = hist.slice(0,pivot);
		rightHalf = hist.slice(pivot,hist.length);

		//console.log("LEFT");
		//console.log(leftHalf);
		//console.log("RIGHT");
		//console.log(rightHalf);

		var returnVal;
		if(searchValue > hist[pivot-1]) {
			//console.log("GOING RIGHT");
			returnVal = binarySearch(rightHalf, searchValue);

		} else {
			//console.log("GOING LEFT");
			returnVal = binarySearch(leftHalf, searchValue);
		}

		return returnVal;
	}; //end binarySearch()

	var sort_by = function(field, reverse, primer){

	   var key = function (x) {return primer ? primer(x[field]) : x[field]};

	   return function (a,b) {
	       var A = key(a), B = key(b);
	       return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1,1][+!!reverse];                  
	   }
	}; // end sort_by

	function createRandomChromosome(generation,individual) {

		var md5sum = crypto.createHash('md5');

		var chromosomeLength = 201; // Chromosome length in BYTES
		var buf = crypto.randomBytes(chromosomeLength);
		var randomChrom = buf.toString('hex');
		md5sum.update(randomChrom);
		var gen = generation;
		var individ = individual;

		if(typeof(individ) == "undefined" || typeof(gen) == "undefined") {
			//gen = Math.random()*1000 | 0 ; // Truncate past decimal using bitwise OR
			//individ = Math.random()*100 | 0 ;
			gen = "[random]";
			individ = "[random]";
		} else {
			gen = generation;
			individ = individual;
		};

		var md5digest = md5sum.digest('hex');

		returnJSON = {chromosome: randomChrom,
					md5: md5digest,
					generation: gen,
					individual: individ,
					parent1: "none",
					parent1: "none",
					time: "none",
					fitness: "none"};
		return returnJSON;
	}; // end createRandomChromosome

	function crossOver(parent1String, parent2String) {
		
		// if needed, could make a lookup array of crossover points, to respect gene boundaries
		// binarysearch to nearest pivot

		var pivot = (Math.random() * parent1String.length) | 0;
		//console.log("pivot " + pivot.toString());
		var child;

		if(pivot == 0) {
			child = parent2String;
		} else if (pivot == parent1String.length) {
			child = parent2String;
		} else {
			var firstHalf = parent1String.substring(0,pivot);
			var secondHalf = parent2String.substring(pivot,parent2String.length);
			child = firstHalf + secondHalf
		}

		return child;
	}; //end crossOver()

	function mutateGene(hexGeneString, mutationProb) {

		var initialLength = hexGeneString.length;


		var hexArray = hexGeneString.split('');

		var binString = "";
		var newHexString = "";

		for (index in hexArray) {
			var work = "";
			var digit = parseInt(hexArray[index],16);

			var workingBinString = digit.toString(2);
			while (workingBinString.length < 4) { //pad with leading zeros if each chunk isn't 4 bits long
				workingBinString = "0" + workingBinString;
			}

			//mutate (or not) each bit
			var newHalfWord = "";
			for(var i=0; i < workingBinString.length; i++) {
				currentChar = workingBinString[i];
				if(Math.random() < mutationProb) {
					var newBit = ((parseInt(currentChar) + 1) % 2).toString();
					//workingBinString[i] = newBit;
					newHalfWord = newHalfWord + newBit;
				} else {
					newHalfWord = newHalfWord + currentChar;
				}
			}

			//convert each 4 bits back to hex
			var hexChunk = parseInt(newHalfWord, 2).toString(16);
			newHexString = newHexString + hexChunk;

			binString = binString + workingBinString;

		}

		return newHexString;
	}; //end mutateGene()

	////////TEST FUNCTIONS//////////

	function testMutate() {
		var source = createRandomChromosome();
		var starting = source.chromosome;

		console.log(mutationRate);

		mutated = mutateGene(starting, mutationRate);

		console.log("O: " + starting);
		console.log("M: " + mutated);
	}; //end testMutate()

	function testCrossover() {
		var parent1 = createRandomChromosome();
		var parent2 = createRandomChromosome();

		child = crossOver(parent1.chromosome,parent2.chromosome);

		console.log("parent 1: " + parent1.chromosome);
		console.log("parent 2: " + parent2.chromosome);
		console.log("child   : " + child);
		console.log(parent1.chromosome.length);
		console.log(child.length);
	}; //end testCrossover()

};

module.exports = asparagus;