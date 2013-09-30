var params = {
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
};

module.exports = params;