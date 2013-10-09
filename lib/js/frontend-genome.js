//GENE MAPPING
//************
function gene(geneString) {
	mainBinding = this;
	this.gene = geneString;
	this.map = {};
	this.cssTranscription = {};

	this.transcribe = function(){ return; };
};

function textGene(gene, selector, length) {

	binding = this;
	this.gene = gene;
	this.geneLen = parseInt(length,10);					
	this.cssTranscription = {};
	this.neededFont = "";
	this.selector = selector;

	var selector = this.selector;

	var map = {
		TYP:	{start: 1, len: 3, callback: function(FFF){
					
					//set typeface
					var raw = parseInt(FFF,16);

					var numFonts = googleFontList.items.length;
					var val = raw % numFonts - 1;

					var name = googleFontList.items[val].family;
					
					if(name) {
						binding.neededFont = name;
						//console.log(binding.neededFont);

						binding.cssTranscription["font-family"]=name;
					}

				}},
		STY: 	{start: 4, len: 1, callback: function(F){
					//set style
					var val = parseInt(F,16);

					switch(val) {
						case 0:
							//$(selector).css({"font-style":"normal"});

							binding.cssTranscription["font-style"] = "normal";
							break;
						case 1:
							//$(selector).css({"font-style":"normal"});

							binding.cssTranscription["font-style"]="normal";
							break;
						case 2:
							//$(selector).css({"font-style":"normal"});

							binding.cssTranscription["font-style"]="normal";
							break;
						case 3:
							//$(selector).css({"font-style":"normal"});
							binding.cssTranscription["font-style"]="normal";
							break;
						case 4:
							//$(selector).css({"font-style":"normal"});
							binding.cssTranscription["font-style"]="normal";
							break;
						case 5:
							//$(selector).css({"font-style":"italic"});
							binding.cssTranscription["font-style"]="italic";
							break;
						case 6:
							//$(selector).css({"font-style":"normal"});
							binding.cssTranscription["font-style"]="normal";
							break;
						case 7:
							//$(selector).css({"font-style":"italic"});
							binding.cssTranscription["font-style"]="italic";
							break;
						case 8:
							//$(selector).css({"font-style":"normal"});
							binding.cssTranscription["font-style"]="normal";
							break;
						case 9:
							//$(selector).css({"font-style":"normal"});
							binding.cssTranscription["font-style"]="normal";
							break;
						case 10:
							//$(selector).css({"font-weight":"bold"});
							binding.cssTranscription["font-weight"]="bold";
							break;
						case 11:
							//$(selector).css({"font-style":"italic","font-weight":"bold"});
							binding.cssTranscription["font-style"]="italic";
							binding.cssTranscription["font-weight"]="bold";
							break;
						case 12:
							//$(selector).css({"font-style":"normal"});
							binding.cssTranscription["font-style"]="normal";
							break;
						case 13:
							//$(selector).css({"font-style":"italic"});
							binding.cssTranscription["font-style"]="italic";
							break;
						case 14:
							//$(selector).css({"font-weight":"bold"});
							binding.cssTranscription["font-weight"]="bold";
							break;
						case 15:
							//$(selector).css({"font-style":"italic","font-weight":"bold"});
							binding.cssTranscription["font-style"]="italic";
							binding.cssTranscription["font-weight"]="bold";
							break;
					}
				}},
		CAS:	{start: 5, len: 1, callback: function(F){
					//set case
					var bits = parseInt(F, 16).toString(2);

					while (bits.length < 4) {
						bits = "0" + bits;
					}


					var first2 = parseInt(bits.substring(0,2),2);
					var last2 = parseInt(bits.substring(2,4),2);
					var val = first2 & last2;

					switch(val) {
						case 0:
							//$(selector).css({"text-transform":"none"});
							binding.cssTranscription["text-transform"]="none";
							break;
						case 1:
							//$(selector).css({"text-transform":"lowercase"});
							binding.cssTranscription["text-transform"]="lowercase";
							break;
						case 2:
							//$(selector).css({"text-transform":"uppercase"});
							binding.cssTranscription["text-transform"]="uppercase";
							break;
						case 3:
							//$(selector).css({"text-transform":"none"});
							binding.cssTranscription["text-transform"]="none";
					}


				}},
		ALI:	{start: 6, len: 1, callback: function(F){
					//set alignment
					var val = parseInt(F,16);

					switch(val) {
						case 0:
							//$(selector).css({"text-align": "right"});
							binding.cssTranscription["text-align"]="right";
							break;
						case 1:
							//$(selector).css({"text-align": "left"});
							binding.cssTranscription["text-align"]="left";
							break;
						case 2:
							//$(selector).css({"text-align": "center"});
							binding.cssTranscription["text-align"]="center";
							break;
						case 3:
							//$(selector).css({"text-align":"justify", "text-align-last": "left"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="left";
							break;
						case 4:
							//$(selector).css({"text-align":"justify", "text-align-last":"right"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="right";
							break;
						case 5:
							//$(selector).css({"text-align":"justify", "text-align-last":"left"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="left";
							break;
						case 6:
							//$(selector).css({"text-align":"justify", "text-align-last":"left"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="left";
							break;
						case 7:
							//$(selector).css({"text-align": "justify", "text-align-last":"justify"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="justify";
							break;
						case 8:
							//$(selector).css({"text-align": "center"});
							binding.cssTranscription["text-align"]="center";
							break;
						case 9:
							//$(selector).css({"text-align": "justify", "text-align-last":"left"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="left";
							break;
						case 10:
							//$(selector).css({"text-align": "justify", "text-align-last":"justify"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="justify";
							break;
						case 11:
							//$(selector).css({"text-align": "justify", "text-align-last":"right"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="right";
							break;
						case 12:
							//$(selector).css({"text-align": "justify", "text-align-last":"left"});
							binding.cssTranscription["text-indent"]="justify";
							binding.cssTranscription["text-align-last"]="left";
							break;
						case 13:
							//$(selector).css({"text-align": "justify", "text-align-last":"justify"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="justify";
							break;
						case 14:
							//$(selector).css({"text-align": "justify", "text-align-last":"justify"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="justify";
							break;
						case 15:
							//$(selector).css({"text-align": "justify", "text-align-last":"center"});
							binding.cssTranscription["text-align"]="justify";
							binding.cssTranscription["text-align-last"]="center";
							break;
					}
				}},
		DEC:	{start: 7, len: 1, callback: function(F){
					//set decoration
					var bits = parseInt(F,16).toString(2);

					while (bits.length < 4) {
						bits = "0" + bits;
					}

					var first2 = bits.substring(0,2);
					var last2 = bits.substring(2,4);
					var val = parseInt(first2,2) & parseInt(last2,2);

					switch(val) {
						case 0:
							//$(selector).css({"text-decoration":"none"});
							binding.cssTranscription["text-decoration"]="none";
							break;
						case 1:
							//$(selector).css({"text-decoration": "underline"});
							binding.cssTranscription["text-decoration"]="underline";
							break;
						case 2:
							//$(selector).css({"text-decoration": "overline"});
							binding.cssTranscription["text-decoration"]="overline";
							break;
						case 3:
							//$(selector).css({"text-decoration": "linethrough"});
							binding.cssTranscription["text-decoration"]="linethrough";
							break;
					}
				}},
		SIZ:	{start: 8, len: 2, callback: function(FF){
					//set size
					size = parseInt(FF,16);
					//$(selector).css({"font-size": size + "pt"});
					binding.cssTranscription["font-size"]=size + "pt";
				}},
		LDG:	{start: 10, len: 2, callback: function(FF){
					//set leading (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"line-height": val + "pt"});
					binding.cssTranscription["line-height"]=val + "pt";
				}},
		BUL:	{start: 12, len: 1, callback: function(F){
					//set bullet
					var raw = parseInt(F,16);
					if(raw = 15) {
						//$(selector).css({"list-style-type": "square"});
						binding.cssTranscription["list-style-type"]="square";
					}
				}},
		IN1:	{start: 13, len: 2, callback: function(FF){
					//set 1st line indent (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"text-indent":val+"pt"});
					binding.cssTranscription["text-indent"]=val + "pt";
				}},
		INO: 	{start: 15, len: 2, callback: function(FF){
					//set other line indent (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"padding-left":val+"pt"});
					binding.cssTranscription["padding-left"]=val + "pt";
				}},
		SPB: 	{start: 17, len: 2, callback: function(FF){
					//set space before (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"margin-top":val+"pt"});
					binding.cssTranscription["margin-top"]=val + "pt";
				}},
		SPA: 	{start: 19, len: 2, callback: function(FF){
					//set space after (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"margin-bottom":val+"pt"});
					binding.cssTranscription["margin-bottom"]=val + "pt";
				}},
		SPL: 	{start: 21, len: 2, callback: function(FF){
					//set space left (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"margin-left":val+"pt"});
					binding.cssTranscription["margin-left"] = val + "pt";
				}},
		SPR:	{start: 23, len: 2, callback: function(FF){
					//set space right (signed)
					var raw = parseInt(FF,16);
					var val;
					if(raw > 128) {
						val = - (raw - 128);
					} else {
						val = raw;
					}
					//$(selector).css({"margin-right":val+"pt"});
					binding.cssTranscription["margin-right"]= val + "pt";
				}},
		FGC:	{start: 25, len: 6, callback: function(FFFFFF){
					//set foreground color
					//$(selector).css({color: "#"+FFFFFF});
					binding.cssTranscription["color"] = "#" + FFFFFF;
				}},
		BGC: {start: 31, len: 6, callback: function(FFFFFF){
					//set background color
					//$(selector).css({"background-color": "#" + FFFFFF});
					binding.cssTranscription["background-color"] = "#" + FFFFFF;
			}}
		};

	this.transcribe = function() {

		for(readpoint in map) {
			var start = map[readpoint].start - 1;
			var length = map[readpoint].len;
			var callback = map[readpoint].callback;
			var string = gene.substring(start,start+length);
			callback(string);
		};

	};

	this.map = map;
};

function paragraphGene(gene) {
	this.cssTranscription = {};

	this.transcribe = function() {
		return;
	};
};

function imageGene(gene, selector) {
	binding = this;
	this.gene = gene;
	this.cssTranscription = {};

	var map = {
		HGT: {start: 1, len: 2, callback: function(FF){
			binding.cssTranscription["height"] = 100 * (parseFloat(parseInt(FF,16)) / parseFloat(parseInt("FF",16))) + "%";
		}},
		WID: {start: 3, len: 2, callback: function(FF){
			binding.cssTranscription["width"] = 100 * (parseFloat(parseInt(FF,16)) / parseFloat(parseInt("FF",16))) + "%";
		}},
		DSP: {start: 5, len: 2, callback: function(FF){
			//display mode
		}},
		ROT: {start: 7, len: 3, callback: function(FFF){
			//rotation
			var angle = parseInt(FFF, 16) % 360;

			binding.cssTranscription["transform"] = "rotate(" + String(angle) + "deg)";
			binding.cssTranscription["-ms-transform"] = "rotate(" + String(angle) + "deg)"; /* IE 9 */
			binding.cssTranscription["-webkit-transform"] = "rotate(" + String(angle) + "deg)"; /* Safari and Chrome */
		}},
		SKW: {start: 10, len: 6, callback: function(F6){
			//skew
			var angle1 = parseInt(F6.substring(0,3),16) % 360;
			var angle2 = parseInt(F6.substring(3,6),16) % 360;

			binding.cssTranscription["transform"] = "skew(" + String(angle1) + "deg," + String(angle2) + "deg)";
			binding.cssTranscription["-ms-transform"] = "skew(" + String(angle1) + "deg," + String(angle2) + "deg)"; /* IE 9 */
			binding.cssTranscription["-webkit-transform"] = "skew(" + String(angle1) + "deg," + String(angle2) + "deg)"; /* Safari and Chrome */
		}},
		BDR: {start: 26, len: 8, callback: function(F8){
			//border
			//first 2 width
			var borderWidth = parseInt(F8.substring(0,2),16);
			//last 6 color
			var borderColor = F8.substring(2,8);

			binding.cssTranscription["border"] = String(borderWidth) + "pt solid #" + borderColor;

		}},

	};

	this.transcribe = function() {
		for(readpoint in map) {
			var start = map[readpoint].start - 1;
			var length = map[readpoint].len;
			var callback = map[readpoint].callback;
			var string = gene.substring(start,start+length);
			callback(string);
		};
	};

	this.map = map;

};

function mainGenome(gene) {
	mainBinding = this;
	this.gene = gene;

	this.cssTranscription = {};
	this.neededFonts = new Array();

	this.map = {
	DIR: {start: 1, len: 1, callback: function(F){
			//set read direction
			}},
	WID: {start: 2, len: 2, callback: function(FF){
			//column width
				widthVar = (parseInt(FF, 16)/256)*100;
				widthStr = "'" + widthVar + "%'";

				//$('.column').css({width: widthStr});
				mainBinding.cssTranscription[".column"] = {width: "'" + widthVar + "'"};
			}},
	HGT: {start: 4, len: 2, callback: function(FF){
			//column height
			/*	height = (toDecimal(4_FF)/256)*100;
				heightStr = "'" + width + "%'";
				$('.column').css({height: heightStr});
			*/
			}},
	TXT: {start: 6, len: 36, callback: function(F36){
			//text
					g = new textGene(F36, ".text");
					g.transcribe()
					mainBinding.cssTranscription[".text"] = g.cssTranscription;
					mainBinding.cssTranscription[".articlebody"] = g.cssTranscription; //for text after footnotes
					mainBinding.neededFonts.push(g.neededFont);
				}
			},
	EMP: {start: 42, len: 36, callback: function(F36){
			//emphasis
					g = new textGene(F36, "em, i");
					g.transcribe()
					mainBinding.cssTranscription["em, i"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	LNK: {start: 78, len: 36, callback: function(F36){
			//links
					g = new textGene(F36, ".articlebody a:link, a:visited");
					g.transcribe()
					mainBinding.cssTranscription[".articlebody a:link, a:visited"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	BIB: {start: 114, len: 36, callback: function(F36){
					g = new textGene(F36, ".bibliography");
					g.transcribe()
					mainBinding.cssTranscription[".bibliography"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	LST: {start: 150, len: 36, callback: function(F36){
			//lists
					g = new textGene(F36, ".list");
					g.transcribe()
					mainBinding.cssTranscription[".list"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	QUO: {start: 186, len: 36, callback: function(F36){
			//quotes
					g = new textGene(F36, ".quote");
					g.transcribe()
					mainBinding.cssTranscription[".quote"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	PAR: {start: 222, len: 36, callback: function(F36){
			//paragraph
					g = new paragraphGene(F36);
					g.transcribe()
					mainBinding.cssTranscription["p"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	HD1: {start: 258, len: 36, callback: function(F36){
			//heading1
					g = new textGene(F36, ".heading1");
					g.transcribe()
					mainBinding.cssTranscription[".heading1"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	HD2: {start: 294, len: 36, callback: function(F36){
			//heading2
					g = new textGene(F36, ".heading2");
					g.transcribe();
					mainBinding.cssTranscription[".heading2"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	TTL: {start: 330, len: 36, callback: function(F36){
			//title
					g = new textGene(F36, ".title");
					g.transcribe();
					mainBinding.cssTranscription[".title"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	AUT: {start: 366, len: 36, callback: function(F36){
			//author
					g = new textGene(F36, ".author");
					g.transcribe();
					mainBinding.cssTranscription[".author"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	FNN: {start: 402, len: 36, callback: function(F36){
			//footnote number
					g = new textGene(F36, ".footnotenumber");
					g.transcribe();
					mainBinding.cssTranscription[".footnotenumber"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);

			}},
	FNT: {start: 438, len: 36, callback: function(F36){
			//footnote
					g = new textGene(F36, ".footnote");
					g.transcribe();
					mainBinding.cssTranscription[".footnote"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);

			}},
	EPI: {start: 474, len: 36, callback: function(F36){
			//epigraphs
					g = new textGene(F36, ".epigraph");
					g.transcribe();
					mainBinding.cssTranscription[".epigraph"] = g.cssTranscription;
					mainBinding.neededFonts.push(g.neededFont);
			}},
	IMI: {start: 510, len: 72, callback: function(F72){
			//inline images
					var F36 = F72.substring(0,36);
					g = new imageGene(F36, ".inline-picture img");
					g.transcribe();
					mainBinding.cssTranscription[".inline-picture img"] = g.cssTranscription;

					var F36_2 = F72.substring(36,72);
					h = new textGene(F36_2);
					//modify the text genome to replace the bullet gene with a float gene
					h.map["BUL"] = {start: 12, len: 1, callback: function(F){
						var num = parseInt(F,16);
						var floatVal;
						if (num < 8) {
							floatVal = "none";
						} else if (num < 12) {
							floatVal = "left";
						} else {
							floatVal = "right";
						};

						binding.cssTranscription["float"] = floatVal;
					}};
					h.transcribe();
					mainBinding.cssTranscription[".inline-picture"] = h.cssTranscription;
					mainBinding.cssTranscription[".inline-picture:after"] = {
						"content": ".", 
						"display": "block",
						"height": "0",
						"visibility": "hidden",
						"clear": "both"
					}; //clear floats after
					mainBinding.neededFonts.push(h.neededFont);
	}},
	IMD: {start: 546, len: 72, callback: function(F72){
			//display images
					var F36 = F72.substring(0,36);
					g = new imageGene(F36, ".display-picture img");
					g.transcribe();
					mainBinding.cssTranscription[".display-picture img"] = g.cssTranscription;

					var F36_2 = F72.substring(36,72);
					h = new textGene(F36_2);
					//modify the text gene to replace the bullet gene with a floating gene
					h.map["BUL"] = {start: 12, len: 1, callback: function(F){
						var num = parseInt(F,16);
						var floatVal;
						if (num < 8) {
							floatVal = "none";
						} else if (num < 12) {
							floatVal = "left";
						} else {
							floatVal = "right";
						};

						binding.cssTranscription["float"] = floatVal;
					}};
					h.transcribe();
					mainBinding.cssTranscription[".display-picture"] = h.cssTranscription;
					mainBinding.cssTranscription[".display-picture:after"] = {
						"content": ".", 
						"display": "block",
						"height": "0",
						"visibility": "hidden",
						"clear": "both"
					}; //clear floats after
					mainBinding.neededFonts.push(h.neededFont);

	}},
	BOD: {start: 115, len: 6, callback: function(F6){
			//body
					//$("body").css({"background-color":"#"+F6});
					mainBinding.cssTranscription["body"] = {"background-color":"#"+F6};
		}}
	};

	this.transcribe = function () {
		for(readpoint in mainBinding.map) {
			var start = mainBinding.map[readpoint].start - 1;
			var strLen = mainBinding.map[readpoint].len;

			var end = start + strLen;

			var callback = mainBinding.map[readpoint].callback;
			var string = mainBinding.gene.substring(start, end);
			//console.log(string);
			callback(string);
		};
	};
};

function chromosomeTranscriber(genetics) {
	if(!documentLoader.isLoaded("googleFontList")) { 
		loadGoogleFontList();
	};
	
	topBinding = this;
	this.genetics = genetics;

	this.transcribe = function() {
		mainG = new mainGenome(topBinding.genetics);
		mainG.transcribe();
		console.log(mainG.cssTranscription);
		currentCssChromosome = mainG.cssTranscription;
		currentNeededFonts = mainG.neededFonts;

		$.event.trigger({
			type: "paramLoaded",
			param: "genomeTranscribed"
		});
	};
};

function doCss(cssChromosome) {
	for (selector in cssChromosome) {
		$(selector).css(cssChromosome[selector]);
	}
	$.event.trigger({
		type: "cssApplied"
	});
};