var contenidoInicial;
var idtema;
var myScroll;
var a = 0;
var db = openDatabase('repapp', '1.0', 'respaldoApp', 100 * 1024);
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

function loadedscroll() {
	setHeight();
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

});
$("#busquedaRapidaContacto").on('vclick', function(){
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
$("#recetas").on('pagecreate', function(){
db.transaction(function(tx) {
//tx.executeSql('DROP TABLE menurecetas ');
tx.executeSql('create table if not exists menurecetas(id,nombretipo)');
});
version1=0 ;
db.transaction(function(tx) {
tx.executeSql('SELECT * FROM menurecetas', [], function (tx, results) {
	if(results.rows.length!=0 ){ version1=results.rows.item(0).version; }
}, null);
});
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };	
	uri="https://movilmultimediasa.com/masxmenos/consultasAppMobil/consultas.php?p=1";
$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
	db.transaction(function(tx) {
					//tx.executeSql('insert into menurecetas(id,nombretipo) values(?,?)', ["1","2"]);
		for(index in json_data){
				idIn=json_data[index].id;
				//alert(idIn);
				var nombreIn=String(json_data[index].nombretipo);	
				//if(json_data[index].version!=version1){
					//tx.executeSql('insert into menurecetas(id,nombretipo) values(?,?)', ["2","dd"]);
					tx.executeSql('insert into menurecetas(id,nombretipo) values(?,?)', [json_data[index].id,json_data[index].nombretipo]);
				// }		 
		}
	});
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM menurecetas', [], function (tx, results) {
			if(results.rows.length>0){
			for(var i = 0; i < results.rows.length; i++) {
				color="colorNormal";
				
				$("#selectrecetas").append("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).nombretipo+"</option>");	
							
				
				}			

				}  
				}, null);
		});
});

});
