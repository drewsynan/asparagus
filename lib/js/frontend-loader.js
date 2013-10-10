//LOADER
//******

function loader(){
	var topBinding = this;
	this.params = {
		GoogleFontListLoaded: false,
		GoogleFontsLoaded: false,
		genomeLoaded: false,
		genomeTranscribed: false,
		contentFilled: true,
		cssApplied: false
	}

	if(googleFontList) { this.params["GoogleFontsLoaded"]=true };

	this.setParamLoaded = function(param) {
		this.params[param] = true;

		$.event.trigger({
			type: param
		});

		triggerSweep();

		if(allLoaded()) {
			$.event.trigger({
				type: 'loaderFinished'
			});
		}
	};

	this.unsetParamLoaded = function(param) {
		this.params[param] = false;
	};

	this.isLoaded = function(param) {
		return this.params[param]
	}

	function allLoaded () {
		test = true;
		for(param in this.params) {
			test = test && this.params[param];
		}
		return test;
	}

	function triggerSweep() {
		if((topBinding.params["GoogleFontListLoaded"] && topBinding.params["genomeLoaded"]) && ( ! topBinding.params["genomeTranscribed"])) {
			$.event.trigger({
				type: "requestTranscribe"
			});
		}
	};

	//things to initialize here
	loadGoogleFontList();
};

function loadGoogleFontList() {
		$.getJSON("/lib/js/googleFonts.json",function(response){
			googleFontList = response;
			$.event.trigger({
				type: "paramLoaded",
				param: "GoogleFontListLoaded"
			});
		});
};

function loadGoogleFonts(familyNameArray) {

	var cleanArray = new Array()
	for (x in familyNameArray) { //DON'T USE "item" as an interator in IE... name conflict
		if(typeof(familyNameArray[x]) !== typeof undefined) {
			cleanArray.push(familyNameArray[x]);
		}
	};

	//asynchronous loader
	WebFontConfig = {
		google: {families: cleanArray},
		timeout: 500,
		active: function(){
			$.event.trigger({
				type: "paramLoaded",
				param: "GoogleFontsLoaded"
			});
		}
	
	};
	
	(function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1.4.10/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
  	})();
};