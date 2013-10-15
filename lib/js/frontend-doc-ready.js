function continueToPage () {
	pageTimer.start();
	$("#splash").fadeOut();
	$("body").css({"overflow":"auto"});
	$.cookie('genTypoWarned', 'true', {expired: '30', path: '/'});
};

function showSplash() {
	pageTimer.stop();
	$("body").css({"overflow":"hidden"});
	$("#splash").show();
};

$(document).ready(function(){
	pageTimer.start();
	
	$(".info").click(function(){
		$("#genome-info").toggle();
	});

	$(".kill").click(function(){
		sendDeath();
		//$("html").fadeOut('slow');
		//setTimeout("location.reload()",650);
		location.reload();
	});

	$("body").delay(500).fadeIn('slow');
	$.scrollDepth();

	console.log($.cookie('genTypoWarned'));

	if(! $.cookie('genTypoWarned')) {
		showSplash();
		$("#gotItButton").on("click",function(){
			continueToPage();
		});
		
	};
});
$(window).bind('beforeunload',function(){
	sendDeath();
	$("body").fadeOut('fast');
	$(window).scrollTop(0);
});