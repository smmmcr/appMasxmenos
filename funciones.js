var contenidoInicial;
var idtema;
var myScroll;
var a = 0;
var db = openDatabase('repapp', '1.0', 'respaldoApp', 100 * 1024);
$(document).on("mobileinit", function(){
   $.mobile.pushStateEnabled = true;
		/*$.mobile.defaultDialogTransition = 'none';*/
		/*$.mobile.defaultPageTransition = 'none';*/
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
/*document.addEventListener('DOMContentLoaded', loaded, false);*/
$("#recetas").on('pagecreate', function(){
	uri="https://movilmultimediasa.com/masxmenos/consultasAppMobil/consultas.php?p=1";
$.getJSON(uri + '&function=' + 'check' + '&callback=?', function (json_data) {
		
			$("#selectrecetas").html("");	
		for(index in json_data){
			$("#selectrecetas").append("<option value='"+json_data[index].id+"'>"+json_data[index].nombretipo+"</option>");	
		}
		myselect=$("#selectrecetas");
		myselect[0].selectedIndex = 1;
		myselect.selectmenu("refresh");				
	});
	
	$("#selectrecetas").change(function(){
		idcat=$(this).val();	
		mostrarlista(idcat);
	});
});
function agregarContenido(id){

$.mobile.changePage( "#recetaSelec", {
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
		$("#recetafinal ul").append("<div id='ingredientes'><h3 id='tituingre'>Ingredientes</h3>"+json_data[0].ingredientes+"</div>");
		$("#recetafinal ul").append("<div id='preparacion'><h3 id='tituingre'>Preparación</h3>"+json_data[0].preparacion+"</div>");
				
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
  reverse: false,
  changeHash: false
});
$("#recetas").css("display","block");
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
$("#supermercados").on( "pagebeforeshow", function( event ) {
	$("#select1").bind( "change", function(event, ui) {
		idcat=$(this).val();
		mostrarcanton(idcat);	
		$('#select2').selectmenu('refresh', true);
	});
	$("#select2").bind( "change", function(event, ui) {
		idcat=$(this).val();
		mostrarDistrito(idcat);	
		$('#select3').selectmenu('refresh', true);		
	});
	$("#select3").bind( "change", function(event, ui) {
		idcat=$(this).val();
		
		localStorage.id=idcat;
			$.mobile.changePage( "#mostrarmapa", {
			transition: "pop",
			reverse: false,
			changeHash: false
			});

	});
});
  $("#recetas").on("pagecreate",function () { 
mostrarlista(18);
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
				$("#direccion").html("");
				 $("#horario").html("");
				 $("#telefono").html("");
				imagenes =$(this).find("imagenes").text().split(",");	
				$("#direccion").append("<h3>Direccion:</h3></br>");
				$("#direccion").append("<p>"+$(this).find("direccion").text()+"</p>");
				 $("#horario").append("<h3>Horario:</h3></br>");
				 $("#horario").append("<p>"+$(this).find("horario").text()+"</p>");
				 $("#telefono").append("<h3>Telefono:</h3></br>");
				 $("#telefono").append("<p>"+$(this).find("telefono").text()+"</p>");
				 $("#servicios").append("<h3>Servicios:</h3>");
				$.each(imagenes, function(i, imagen){ 

				 $("#servicios").append("<img src=' img/"+imagen+".png '/>");
				});
				visulamapainfo(lat,longi,nombre,direccion,horario,telefono);				
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
	function mostrarcanton(id){
		var arrCanton =[['	<option value="" >Canton</option><option value="8" class="1" >Montes de Oca</option>'+
							'<option value="7" class="1" >Moravia</option>'+
							'<option value="5" class="1" >Vázquez de Coronado</option>'+
							'<option value="1" class="1" >San José</option>'+
							'<option value="9" class="1" >Santa Ana</option>'+
							'<option value="4" class="1" >Goicoechea</option>'+
							'<option value="6" class="1" >Tibás</option>'+
							'<option value="3" class="1" >Desamparados</option>'+
							'<option value="2" class="1" >Escazú</option>'],['<option value="" >Canton</option><option value="9" class="2" >Heredia</option>'+
							'<option value="10" class="2" >Santo Domingo</option>'+
							'<option value="13" class="2" >San Pablo</option>'+
							'<option value="12" class="2" >Flores</option>'+
							'<option value="11" class="2" >Belén</option>'],['	<option value="" >Canton</option><option value="14" class="3" >Alajuela</option>'],
							['<option value="" >Canton</option><option value="15" class="6">Garabito</option>'],['<option value="" >Canton</option><option value="17" class="7" >Pococí</option>'+
						'<option value="16" class="7" >Limón</option>']];
						/*alert(arrCanton[id-1]);*/
	$('#select2').html( arrCanton[id-1]);
	}
	function mostrarDistrito(id){
		var arrDistrito= [['<option value="">Seleccione Distrito</option><option value="1" class="1">Carmen</option><option value="9" class="1">Pavas</option><option value="8" class="1">Mata Redonda</option>'],
					['<option value="">Seleccione Distrito</option><option value="14" class="2">San Rafael</option>'],['<option value="">Seleccione Distrito</option><option value="15" class="3">Desamparados</option><option value="19" class="3">San Antonio</option>'],
					['<option value="">Seleccione Distrito</option><option value="53" class="4">Guadalupe</option>'],['<option value="">Seleccione Distrito</option><option value="60" class="4">Santa Ana</option>'],
					['<option value="71" class="5">San Isidro</option>'],['<option value="81" class="6">San Juan</option>'],['<option value="86" class="7">San Vicente</option>'],
					['<option value="">Seleccione Distrito</option><option value="89" class="8">San Pedro</option><option value="90" class="8">Sabanilla</option>'],['<option value="">Seleccione Distrito</option><option value="122" class="9">Heredia</option>'],
					['<option value="">Seleccione Distrito</option><option value="133" class="10">Santo Domingo</option>'],['<option value="">Seleccione Distrito</option><option value="158" class="11">La Asunción</option>'],
					['<option value="">Seleccione Distrito</option><option value="159" class="12">San Joaquín</option>'],['<option value="">Seleccione Distrito</option><option value="162" class="13">San Pablo</option>'],
					['<option value="">Seleccione Distrito</option><option value="169" class="14">Alajuela</option>'],['<option value="">Seleccione Distrito</option><option value="445" class="15">Jacó</option>'],
					['<option value="">Seleccione Distrito</option><option value="447" class="16">Limón</option>'],['<option value="">Seleccione Distrito</option><option value="451" class="17">Guápiles</option>']];
						$('#select3').html( arrDistrito[id-1]);
				
	}