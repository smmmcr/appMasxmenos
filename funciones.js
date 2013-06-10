var contenidoInicial;
var idtema;
var myScroll;
var a = 0;
var db = openDatabase('seguimiento', '1.0', 'seguimiento del bebe', 100 * 1024);
$(document).on('pagecreate', function(){
	 $.mobile.pushStateEnabled = true;
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.defaultPageTransition = 'none';
	$.mobile.allowCrossDomainPages = true;
	 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
});
var myScroll;
var a = 0;
function loadedscroll() {
	setHeight();	// Set the wrapper height. Not strictly needed, see setHeight() function below.

	// Please note that the following is the only line needed by iScroll to work. Everything else here is to make this demo fancier.
	myScroll = new iScroll('scrollercontacto', {desktopCompatibility:true});
}

// Change wrapper height based on device orientation. Not strictly needed by iScroll, you may also use pure CSS techniques.
function setHeight() {
	var headerH = document.getElementById('headerinter1').offsetHeight,
		footerH = document.getElementById('footerinter1').offsetHeight,
		wrapperH = window.innerHeight - headerH - footerH;
	document.getElementById('wrapper1').style.height = wrapperH + 'px';
}
$("#guia").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };		
});
$("#busquedaRapidaContacto").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };	
loadedscroll();	
});
function loaded() {
	myScroll = new iScroll('wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {		
		}
	 });
}
document.addEventListener('DOMContentLoaded', loaded, false);
