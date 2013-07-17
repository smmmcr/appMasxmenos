var contenidoInicial;
var idtema;
var myScroll;
var a = 0;
var db = openDatabase('repapp', '1.0', 'respaldoApp', 100 * 1024);

$("#guia").on('pagecreate', function(){
 $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };		
});


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
		$("#tituloreceta").html("");
		$("#recetafinal ul").html("");
		$("#recetafinal").append("<a id='regresar' href='#recetas'>Regresar</a>");
		$("#tituloreceta").append("<div id='titulorec1'><h3 id='nombrereceta'>"+json_data[0].nombre+"</h3></div><img src='https://movilmultimediasa.com/masxmenos/recetas/images/fotosrecetas/"+json_data[0].img+"' alt='imgreceta' />");
		$("#recetafinal ul").append("<div id='ingredientes'><h3 id='tituingre'>Ingredientes</h3>"+json_data[0].ingredientes+"</div>");
		$("#recetafinal ul").append("<div id='preparacion'><h3 id='tituingre'>Preparación</h3>"+json_data[0].preparacion+"</div>");
				
		});
}

function volverreceta(id){
location.href="#recetas";
$("#recetaSelec").css("display","none");
$.mobile.changePage( "#recetas", {
  reverse: false,
  changeHash: false
});
$("#recetas").css("display","block");
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
	$("#select1").bind( "change", function() {
		idcat=$('#select1').val();
		mostrarcanton(idcat);	
		$('#select2').selectmenu('refresh', true);
	});
	$("#select2").bind( "change", function() {
		idcat=$("#select2").val();
		mostrarDistrito(idcat);	
		$('#select3').selectmenu('refresh', true);		
	});
	$("#select3").bind( "change", function() {
		idcat=$("#select3").val();
		
		mostrarcontenidomapa(idcat);

	});
});
function mostrarcontenidomapa(idcat){
localStorage.id=idcat;
			$.mobile.changePage( "#mostrarmapa", {
			reverse: false,
			changeHash: false
			});
}
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
				imagenes =$(this).find("imagenes").text();
				 $("#listatiendas ul").append('<li><a href="javascript:visulamapainfo(\''+lat+'\',\''+longi+'\',\''+nombre+'\',\''+direccion+'\',\''+horario+'\',\''+telefono+'\',\''+imagenes+'\')" >'+nombre+ '</a></li>');
				 $("#listatiendas ul").append('<li><a href="waze://?ll='+lat+','+longi+'&z=10&navigate=yes" >Ubicar '+nombre+ ' en Waze</a></li>');
				
				}
					
				});
				 setTimeout( function() {
					 visulamapainfo(lat,longi,nombre,direccion,horario,telefono,imagenes);	
					 }, 600);
					$("#tiendas2").listview('refresh');	
				}
		});
	});
	function visulamapainfo(lat,longi,nombre,direccion,horario,telefono,imagenes){
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
			
					nombre=nombre;
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
        $("#direccion").html("");
		 $("#horario").html("");
		 $("#telefono").html("");
		 $("#servicios").html("");
		 imagenes=imagenes.split(",");
		$("#direccion").append("<h3>Direccion:</h3></br>");
		$("#direccion").append("<p>"+direccion+"</p>");
		 $("#horario").append("<h3>Horario:</h3></br>");
		 $("#horario").append("<p>"+horario+"</p>");
		 $("#telefono").append("<h3>Telefono:</h3></br>");
		 $("#telefono").append("<p>"+telefono+"</p>");
		 $("#servicios").append("<h3>Servicios:</h3>");
		$.each(imagenes, function(i, imagen){ 

		 $("#servicios").append("<img src=' img/"+imagen+".png '/>");
		});
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
		var arrCanton =[['	<option value="" >Canton</option><option value="9" class="1" >Montes de Oca</option>'+
							'<option value="8" class="1" >Moravia</option>'+
							'<option value="6" class="1" >Vázquez de Coronado</option>'+
							'<option value="1" class="1" >San José</option>'+
							'<option value="5" class="1" >Santa Ana</option>'+
							'<option value="4" class="1" >Goicoechea</option>'+
							'<option value="7" class="1" >Tibás</option>'+
							'<option value="3" class="1" >Desamparados</option>'+
							'<option value="2" class="1" >Escazú</option>'],['<option value="" >Canton</option><option value="10" class="2" >Heredia</option>'+
							'<option value="11" class="2" >Santo Domingo</option>'+
							'<option value="14" class="2" >San Pablo</option>'+
							'<option value="13" class="2" >Flores</option>'+
							'<option value="12" class="2" >Belén</option>'],['	<option value="" >Canton</option><option value="15" class="3" >Alajuela</option>'],
							['<option value="" >Canton</option><option value="16" class="6">Garabito</option>'],['<option value="" >Canton</option><option value="18" class="7" >Pococí</option>'+
						'<option value="17" class="7" >Limón</option>']];
						/*alert(arrCanton[id-1]);*/
	$('#select2').html( arrCanton[id-1]);
	}
	function mostrarDistrito(id){
		var arrDistrito= [dis1=['<option value="">Seleccione Distrito</option><option value="1" class="1">Carmen</option><option value="9" class="1">Pavas</option><option value="8" class="1">Mata Redonda</option>'],
		                  dis2=['<option value="">Seleccione Distrito</option><option value="14" class="2">San Rafael</option>'],
		                  dis3=['<option value="">Seleccione Distrito</option><option value="15" class="3">Desamparados</option><option value="19" class="3">San Antonio</option>'],
		                  dis4=['<option value="">Seleccione Distrito</option><option value="53" class="4">Guadalupe</option>'],
		                  dis5=['<option value="">Seleccione Distrito</option><option value="60" class="4">Santa Ana</option>'],
		                  dis6=['<option value="">Seleccione Distrito</option><option value="71" class="5">San Isidro</option>'],
		                  dis7=['<option value="">Seleccione Distrito</option><option value="81" class="6">San Juan</option>'],
					dis8=['<option value="">Seleccione Distrito</option><option value="86" class="7">San Vicente</option>'],
					dis9=['<option value="">Seleccione Distrito</option><option value="89" class="8">San Pedro</option><option value="90" class="8">Sabanilla</option>'],
					dis10=['<option value="">Seleccione Distrito</option><option value="122" class="9">Heredia</option>'],
					dis11=['<option value="">Seleccione Distrito</option><option value="133" class="10">Santo Domingo</option>'],
					dis12=['<option value="">Seleccione Distrito</option><option value="158" class="11">La Asunción</option>'],
					dis13=['<option value="">Seleccione Distrito</option><option value="159" class="12">San Joaquín</option>'],
					dis14=['<option value="">Seleccione Distrito</option><option value="162" class="13">San Pablo</option>'],
					dis15=['<option value="">Seleccione Distrito</option><option value="169" class="14">Alajuela</option>'],
					dis16=['<option value="">Seleccione Distrito</option><option value="445" class="15">Jacó</option>'],
					dis17=['<option value="">Seleccione Distrito</option><option value="447" class="16">Limón</option>'],
					dis18=['<option value="">Seleccione Distrito</option><option value="451" class="17">Guápiles</option>']];
						$('#select3').html( arrDistrito[id-1]);
				
	}