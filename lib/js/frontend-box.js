function populateGenomeBox() {
	var chrom = currentChromosome.chromosome;
	first3 = chrom.substring(0,3);
	rest = chrom.substring(3,chrom.length);

	$("#generation").text(currentChromosome.generation);
	$("#individual").text(currentChromosome.individual);
	$(".md5").text(currentChromosome.md5);
	$(".Parent1").text(currentChromosome.parent1);
	$(".Parent2").text(currentChromosome.parent2);

	$("#box-container").append("<div class='box' style='background-color:#" + first3 + "'></div>");
	var i = 0;
	while (i < rest.length - 1) {
		var currentColor = rest.substring(i,i+6);
		var htmlString = "<div class='box' style='background-color:#" + currentColor + "'></div>";
		$("#box-container").append(htmlString);
		i = i+6;
	}
}

function sendDeath() {
	pageTime = pageTimer.stop();
	currentChromosome["time"] = pageTime;
	socket.emit('death',currentChromosome);
}