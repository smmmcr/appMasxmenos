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
	//$.mobile.selectmenu.prototype.options.nativeMenu = false;
	uri="https://movilmultimediasa.com/masxmenos/consultasAppMobil/consultas.php?p=1";
$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
		
		for(index in json_data){
			$("#selectrecetas").append("<option value='"+json_data[index].id+"'>"+json_data[index].nombretipo+"</option>");	
		}
		myselect=$("#selectrecetas");
		myselect[0].selectedIndex = 1;
		myselect.selectmenu("refresh");
		//$("#menurecetas").append("");	
		/*[json_data[index].id,json_data[index].nombretipo
			/*	db.transaction(function(tx) {
					//tx.executeSql('insert into menurecetas(id,nombretipo) values(?,?)', ["1","2"]);
		for(index in json_data){
				idIn=json_data[index].id;
				tx.executeSql('SELECT * FROM menurecetas where id="'+idIn+'"', [], function (tx, results) {
				/*if(results.rows.length==0){*/
		/*		alert(results.rows.length);
				alert(rjson_data[index].nombretipo);
				var nombreIn=String(json_data[index].nombretipo);	
					tx.executeSql('insert into menurecetas(id,nombretipo) values(?,?)', [json_data[index].id,json_data[index].nombretipo]);
				/*}		*/	
			/*	}, null);				
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
		});*/
		
	});
	
	$("#selectrecetas").change(function(){
	idcat=$(this).val();
	uri="https://movilmultimediasa.com/masxmenos/consultasAppMobil/consultas.php?menu="+idcat;
		$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
				for(index in json_data){
					clases='ui-li ui-li-static ui-btn-up-a';
					if(index==0){ clases='ui-li ui-li-static ui-btn-up-a ui-first-child';	}
					if(index==(json_data.length-1)){ clases='ui-li ui-li-static ui-btn-up-a ui-last-child';	}
					$("#listaRecetas ul").append("<li onclick='agregarContenido("+json_data[index].id+")' class='"+clases+"'>"+json_data[index].nombre+"</li>");	
				}
				
		});
	});
});
function agregarContenido(id){
	
$.mobile.changePage( "#recetaSelec", {
  transition: "pop",
  reverse: false,
  changeHash: false
});
	uri="https://movilmultimediasa.com/masxmenos/consultasAppMobil/consultas.php?receta="+id;
		$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
		$("#recetafinal").html("<h3 id='nombrereceta'>"+json_data[0].nombre+"</h3><img src='https://movilmultimediasa.com/masxmenos/recetas/images/fotosrecetas/"+json_data[0].img+"' alt='imgreceta' />"+
								"<div id='ingredientes'><h3 id='tituingre'>Ingredientes</h3>"+json_data[0].ingredientes+"</div>");
				
		});
}
