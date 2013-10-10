$.holdReady(true);
$(window).bind('load',function(){
	$.holdReady(false);
});

$(document).idleTimer(10000);
$(document).on("idle.idleTimer", function(){
	pageTimer.stop();
});

$(document).on("active.idleTimer",function(){
	pageTimer.start();
});

var dataSent = false;


var currentChromosome;
var currentCssChromosome;
var currentNeededFonts;
var googleFontList;

var documentLoader = new loader();
var pageTimer = new timer();

//INITIAL AND SOCKET CONNECTION
//*****************************
var socket = io.connect('/chromosomes'); // http://localhost:8080
//socket.emit('test');

socket.on('initialChromosome', function(data){
	if(!documentLoader.isLoaded("genomeLoaded")) {
		$.event.trigger({
			type: "newChromosome",
			chromosome: data
		});
	}
});

//EVENT LISTENERS
//***************
$(document).on("newChromosome", function(e){
	console.log("newChromosome");
	currentChromosome = e.chromosome;
	$.event.trigger({
		type: "paramLoaded",
		param: "genomeLoaded"
	});
});

$(document).on("genomeLoaded", function(){
	populateGenomeBox();
});
$(document).on("GoogleFontListLoaded", function(){
	console.log("Google Font List Loaded");

});

$(document).on("requestTranscribe", function(){
	console.log("Requesting Transcription");
	t = new chromosomeTranscriber(currentChromosome.chromosome);
	t.transcribe();
});

$(document).on("genomeTranscribed", function(){
	console.log("Genome Transcribed");

	loadGoogleFonts(cleanedFonts);
});

$(document).on("GoogleFontsLoaded", function(){
	console.log("GoogleFontsLoaded");
	doCss(currentCssChromosome);
});

$(document).on("paramLoaded", function(e){
	documentLoader.setParamLoaded(e.param);
});
$(document).on("loaderFinished", function(){
	//$.holdReady(false);
});

//scrollDepth event
$(document).on("scrollEvent", function(e) {
	console.log("PERCENTAGE");
	console.log(e.percentage);
	if (e.percentage) {
		currentChromosome["scroll"] = parseFloat(e.percentage);
	}
});