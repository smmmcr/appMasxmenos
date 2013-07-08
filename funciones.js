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
$("#busquedaRapidaContacto").on('pagecreate.', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };	
loadedscroll('headerinter2','footerinter2','wrapper2','scrollercontacto');
//loadedscroll();
});
function loaded() {
/*	myScroll = new iScroll('wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {		
		}
	 });
*/	 
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
		
			$("#selectrecetas").html("");	
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
		//$("#recetafinal").html("");
		$("#tituloreceta").html("");
		$("#recetafinal ul").html("");
		/*$("#recetafinal").append("<a id='regresar' href='javascript:volverreceta("+json_data[0].tiporeceta+");'>Regresar</p>");*/
		$("#recetafinal").append("<a id='regresar' href='#recetas'>Regresar</a>");
		$("#tituloreceta").append("<div id='titulorec1'><h3 id='nombrereceta'>"+json_data[0].nombre+"</h3></div><img src='https://movilmultimediasa.com/masxmenos/recetas/images/fotosrecetas/"+json_data[0].img+"' alt='imgreceta' />");
		$("#recetafinal ul").append("<li id='wr1'></li><li id='headerinter1'></li>");
		$("#recetafinal ul").append("<div id='ingredientes'><h3 id='tituingre'>Ingredientes</h3>"+json_data[0].ingredientes+"</div>");
		$("#recetafinal ul").append("<li></li><li></li><li id='footerinter1'></li>");
		loadedscroll('headerinter1','footerinter1','wr1','scrolle1');
				
		});
}
function volverreceta(id){
location.href="#recetas";
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
	$("#listaRecetas ul").html("");
			for(index in json_data){
				clases='ui-li ui-li-static ui-btn-up-a';
				if(index==0){ clases='ui-li ui-li-static ui-btn-up-a ui-first-child';	}
				if(index==(json_data.length-1)){ clases='ui-li ui-li-static ui-btn-up-a ui-last-child';	}
				$("#listaRecetas ul").append("<li onclick='agregarContenido("+json_data[index].id+")' class='"+clases+"'>"+json_data[index].nombre+"</li>");	
			}
			
	});
}
$("#supermercados").on('pagecreate', function(){
$("#select2 option").css("display","none");
$("#select3 option").css("display","none");
$("#select3 option").attr("disabled");

		
	$("#select1").change(function(){
		idcat=$(this).val();
			clase=$("#select2 ."+idcat);
			$("#select2 option").css("display","none");
			clase.css("display","block");
			$("#select2 option").attr("disabled");
			clase.removeAttr("disabled");

	});
	$("#select2").change(function(){
		idcat=$(this).val();
			clase=$("#select3 ."+idcat);
			$("#select3 option").css("display","none");
			clase.css("display","block");
			$("#select3 option").attr("disabled");
			clase.removeAttr("disabled");

	});
	$("#select3").change(function(){
		idcat=$(this).val();
		
		localStorage.id=idcat;
			$.mobile.changePage( "#mostrarmapa", {
			transition: "pop",
			reverse: false,
			changeHash: false
			});

	});
});
  $("#mostrarmapa").on("pagecreate",function () {
	idfinal=localStorage.id;
		$.ajax({
		type: "GET",
		url: "tiendas.xml",
		dataType: "xml",
		success: function(xml) {
	
				$('#load').fadeOut();
				$(xml).find("informacion").each(function () {	
				$.each(this.attributes, function(i, attrib){
				itemId = attrib.value;
				});
				if(itemId==idfinal){
			
				lat=$(this).find("lat").text();
				longi=$(this).find("longi").text();
				nombre=$(this).find("nombre").text();
				direccion=$(this).find("direccion").text();
				telefono=$(this).find("telefono").text();
				horario=$(this).find("horario").text();	
				 $("#listatiendas ul").append('<li><a href="javascript:visulamapainfo(\''+lat+'\',\''+longi+'\',\''+nombre+'\',\''+direccion+'\',\''+horario+'\',\''+telefono+'\')" >'+ $(this).find("nombre").text() + '</a></li>');
				 $("#direccion").append('<li> '+ $(this).find("direccion").text() + '</li>');
				 $("#horario").append('<li> '+ $(this).find("horario").text() + '</li>');
				 $("#telefono").append('<li> '+ $(this).find("telefono").text() + '</li>');
				
				}
					$("#tiendas2").listview('refresh');		
				});
				}
		});
	});
	function visulamapainfo(lat,longi,nombre,direccion,horario,telefono){
 var centerLocation = new google.maps.LatLng(lat,longi);
        var myOptions = {
            center: centerLocation,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            callback: function () { alert('callback'); }
        };
		mapdata=lat+","+longi;			
        map_element = document.getElementById("map_canvas");
        map = new google.maps.Map(map_element, myOptions);
			
					nombre="prueba";
					marker= new google.maps.Marker({						
					position: new google.maps.LatLng(lat,longi)
					, map: map				
					, icon: 'http://movilmultimediasa.com/masxmenos/ubicanos/images/bullet.png'
					});
					marker.setTitle(nombre);
					attachSecretMessage(marker);

        var mapwidth = $(window).width();
        var mapheight = $(window).height();
        $("#map_canvas").height(mapheight);
        $("#map_canvas").width(mapwidth);
        google.maps.event.trigger(map, 'resize');
}
	function attachSecretMessage(marker) {
		contTD=String(marker.getTitle()).split("*");
		titulo=contTD[0];  
		direccion=contTD[1];    
		marker.setTitle(titulo);
		var infowindow = new google.maps.InfoWindow(	
		{ content: direccion,
		size: new google.maps.Size(50,50)
		});
		google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
		map.setZoom(15);
		map.setCenter(marker.getPosition());
		});

		pos=String(marker.getPosition());
		pos=pos.split("(");
		pos=pos[1].split(")");
		pos=pos[0].split(",");
		pos1=pos[0];
		pos2=pos[1];
		moveToDarwin(pos1,pos2);
	}
	function moveToDarwin(lat,longi) {
	var darwin = new google.maps.LatLng(lat,longi);
	map.setCenter(darwin);
	}

	function GoToLocation(lat,longi) {
	var message = ["This","is","the","secret","message"];
	contTD=String(marker.getTitle()).split("*");
	titulo=contTD[0];  
	direccion=contTD[1];    
	marker.setTitle(titulo);
	var infowindow = new google.maps.InfoWindow(	
	{ content: direccion,
	size: new google.maps.Size(50,50)
	});
	$(function(){
	infowindow.open(map,marker);
	map.setZoom(15);
	map.setCenter(marker.getPosition());	
	});
	moveToDarwin(lat,longi)
	}
	function centrado(lat,longi) {
	var darwin = new google.maps.LatLng(lat,longi);
	map.setCenter(darwin);
	}	
