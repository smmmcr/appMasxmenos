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



function loadedscroll(headerinter,footerinter,wrapper,scroller) {
	setHeight(headerinter,footerinter,wrapper);
	myScroll = new iScroll(scroller, {desktopCompatibility:true, hScrollbar: false,snap: true, momentum: false, vScrollbar: false, vScroll: false });
}
function setHeight(headerinter,footerinter,wrapper) {
	var headerH = document.getElementById(headerinter).offsetHeight,
		footerH = document.getElementById(footerinter).offsetHeight,
		wrapperH = window.innerHeight - headerH - footerH;
		document.getElementById(wrapper).style.height = wrapperH + 'px';
}
$("#guia").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
		$("#guia ul").disableSelection();
		$("#guia ul").on('vclick', function(){
				loadedscroll('headerintertema','footerintertema','wrtema','scrollerTema');
				});

});