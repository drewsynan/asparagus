$.holdReady(true);

var dataSent = false;


var currentChromosome;
var currentCssChromosome;
var currentNeededFonts;
var googleFontList;

var documentLoader = new loader();

//INITIAL AND SOCKET CONNECTION
//*****************************
var socket = io.connect('/avg'); // http://localhost:8080
//socket.emit('test');

socket.on('avgChrom', function(data){
	console.log(data);
		if (data.chromosome != "not ready") {
			userString = String(data.connectedUsers) + " readers online now";
			$("#users").text(userString);
			
			$.event.trigger({
				type: "newChromosome",
				chromosome: data
			});
			$.holdReady(false);
		};
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
	console.log("Requesting Transcription");
	t = new chromosomeTranscriber(currentChromosome.chromosome);
	t.transcribe();
});

$(document).on("GoogleFontListLoaded", function(){
	console.log("Google Font List Loaded");

});

$(document).on("genomeTranscribed", function(){
	console.log("Genome Transcribed");
	loadGoogleFonts(currentNeededFonts);
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
