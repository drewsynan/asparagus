$(document).ready(function(){

	$("body").delay(500).fadeIn('slow');

});
$(window).bind('beforeunload',function(){
	$("body").fadeOut('fast');
});