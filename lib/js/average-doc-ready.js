$(document).ready(function(){
	$(".waiting").hide();
	$("body").delay(500).fadeIn('slow');
	$('#articlebodyID').show();

});
$(window).bind('beforeunload',function(){
	$("body").fadeOut('fast');
});