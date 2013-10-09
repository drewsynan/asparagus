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
});
$(window).bind('beforeunload',function(){
	sendDeath();
	$("body").fadeOut('fast');
	$(window).scrollTop(0);
});