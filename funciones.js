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

function loadedscroll(headerinter,footerinter,wrapper,scroller) {
	setHeight(headerinter,footerinter,wrapper);
	myScroll = new iScroll(scroller, {desktopCompatibility:true});
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
		mostrarlista(idcat);
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
		
		$("#recetafinal").append("<a id='regresar' href='javascript:volverreceta("+json_data[0].tiporeceta+");'>Regresar</p>");
		$("#tituloreceta").append("<div id='titulorec1'><h3 id='nombrereceta'>"+json_data[0].nombre+"</h3></div><img src='https://movilmultimediasa.com/masxmenos/recetas/images/fotosrecetas/"+json_data[0].img+"' alt='imgreceta' />");
		$("#recetafinal ul").append("<li id='wr1'></li><li id='headerinter1'></li>");
		$("#recetafinal ul").append("<div id='ingredientes'><h3 id='tituingre'>Ingredientes</h3>"+json_data[0].ingredientes+"</div>");
		$("#recetafinal ul").append("<li></li><li></li><li id='footerinter1'></li>");
		loadedscroll('headerinter1','footerinter1','wr1','scrolle1');
				
		});
}
function volverreceta(id){
top.location="#recetas";
/*
$.mobile.changePage( "index.html", {
  transition: "pop",
  reverse: false,
  changeHash: false
});*/
$("#recetaSelec").css("display","none");
$.mobile.changePage( "#recetas", {
  transition: "pop",
  reverse: false,
  changeHash: false
});
$("#recetas").show();
//mostrarlista(id);
}
function mostrarlista(idcat){
	uri="https://movilmultimediasa.com/masxmenos/consultasAppMobil/consultas.php?menu="+idcat;
	$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
			for(index in json_data){
				clases='ui-li ui-li-static ui-btn-up-a';
				if(index==0){ clases='ui-li ui-li-static ui-btn-up-a ui-first-child';	}
				if(index==(json_data.length-1)){ clases='ui-li ui-li-static ui-btn-up-a ui-last-child';	}
				$("#listaRecetas ul").append("<li onclick='agregarContenido("+json_data[index].id+")' class='"+clases+"'>"+json_data[index].nombre+"</li>");	
			}
			
	});
}