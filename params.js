var params = {
	appPort: 8080,
	appHostName: 'localhost',
	dbProtocol: 'http',
	dbHost: 'localhost',
	dbPort: 5984,
	dbName: 'amasp',
	populationSize: 10,
	crossoverRate: 0.85,
	mutationRate: 0.05,
	currentGeneration: 0,
	fitnessFunction: function(t, s) {
		fitness = t * Math.exp(parseFloat(s))
		return fitness
	},
	resume: false
};

module.exports = params;