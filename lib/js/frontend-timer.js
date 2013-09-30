//TIMER
//*****
function timer() {
	var storedTime;
	var startTime;
	var endTime;

	var running = false;

	this.start = function() {
		if(! storedTime) {
			d = new Date();
			startTime = d.getTime();
			running = true;
		} else {
			d = new Date();
			now = d.getTime();
			startTime = now - storedTime;
			running = true;
		}
	}

	this.stop = function() {
		if(running) {
			d = new Date();
			now = d.getTime();
			elapsed = now - startTime;
			storedTime = elapsed;
			running = false;
			return elapsed;
		} else {
			return storedTime;
		}
	}

	this.reset = function() {
		storedTime = 0;
		startTime = 0;
		endTime = 0;
		running = false;
	}

};