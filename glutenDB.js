//	document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
	var db;
    function GlutenDB() {
        db = window.openDatabase("masxmenos", "1.0", "Masxmenos", 2000000);
        db.transaction(populateDB, errorCB, successCB);
    }
    // Populate the database 
    //
    function populateDB(tx) {
        /*CREACION TABLA CLIENTES*/
		tx.executeSql('DROP TABLE IF EXISTS glutenComCat');
		tx.executeSql('DROP TABLE IF EXISTS glutenComProd');
		tx.executeSql('DROP TABLE IF EXISTS glutenPrimerosPasos');
         tx.executeSql('CREATE TABLE IF NOT EXISTS glutenComCat (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, pais TEXT)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS glutenComProd (id INTEGER PRIMARY KEY AUTOINCREMENT, id_categoria INTEGER, nombre TEXT, categoria TEXT, marca TEXT, fabricante TEXT, pais TEXT, imagen TEXT, presentacion TEXT)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS glutenPrimerosPasos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, info TEXT)');
         //tx.executeSql('CREATE TABLE IF NOT EXISTS glutenRectCat ()');
		 SincronizarDB();
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        console.log("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        console.log("success create DB!");
    }
	
	function SincronizarDB(){
		url = 'http://smmcr.net/fb/masxmenos/celiacos/appService.php?callback=?';
		/*SINCRONIZA CATEGORIAS*/
		$.getJSON(url,{accion:"comprasCat"}).done(function( data ) {
			console.log('Iniciando Sincronizacion de categorias...');
			$.each(data, function(index, item) {			
				db.transaction(function (tx) {  
				  tx.executeSql('INSERT INTO glutenComCat (id,nombre,pais) VALUES (?,?,?)', [item.id,item.nombre, item.pais]);
				});
			});
		});
		/*SINCRONIZA PRODUCTOS*/
		$.getJSON(url,{accion:"comprasProd"}).done(function( data ) {
			console.log('Iniciando Sincronizacion de Productos...');
			$.each(data, function(index, item) {			
				db.transaction(function (tx) {  
				  tx.executeSql('INSERT INTO glutenComProd (id_categoria,nombre, categoria, marca, fabricante, pais, imagen, presentacion) VALUES (?,?,?,?,?,?,?,?)', [item.id_categoria,item.nombre,item.categoria, item.marca, item.fabricante, item.pais, item.imagen, item.presentacion]);
				});
			});
		});
		/*SINCRONIZA Pasos*/
		$.getJSON(url,{accion:"comprasPasos"}).done(function( data ) {
			console.log('Iniciando Sincronizacion de Primeros Pasos...');
			$.each(data, function(index, item) {			
				db.transaction(function (tx) {  
				  tx.executeSql('INSERT INTO glutenPrimerosPasos (id,nombre, info) VALUES (?,?,?)', [item.id,item.tema,item.info]);
				});
			});
		});
	}
	
	function GlutenRecetas(){
		var data = new Array();
		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM glutenComCat', [], function (tx, results) {
				var len = results.rows.length;
				for (var i=0; i<len; i++){
					data[i] = results.rows.item(i);
				}
			$('#gfcCategorias').empty();
			  $.each(data, function(index, item) {		
				  $('#gfcCategorias').append('<li><a href="javascript:ShowSubGF('+item.id+','+"'variedad'"+')">'+item.nombre+'</a></li>');
				  });
				  $("#gfcCategorias").listview("refresh");
				});
			});	
	}	
	function GlutenVariedad(){
		var data = new Array();
		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM glutenComCat', [], function (tx, results) {
				var len = results.rows.length;
				for (var i=0; i<len; i++){
					data[i] = results.rows.item(i);
				}
			$('#gfcCategorias').empty();
			  $.each(data, function(index, item) {		
				  $('#gfcCategorias').append('<li><a href="javascript:ShowSubGF('+item.id+','+"'variedad'"+')">'+item.nombre+'</a></li>');
				  });
				  $("#gfcCategorias").listview("refresh");
				});
			});	
	}
	function GlutenPasos(){
		var data = new Array();
		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM glutenPrimerosPasos', [], function (tx, results) {
				var len = results.rows.length;
				for (var i=0; i<len; i++){
					data[i] = results.rows.item(i);
				}
			$('#pasos_list').empty();
			  $.each(data, function(index, item) {		
				  $('#pasos_list').append('<li><a href="javascript:ShowItemGF('+item.id+', '+"'pasos'"+' )">'+item.nombre+'</a></li>');
				  });
				  $("#pasos_list").listview("refresh");
				});
			});	
	}
	function ShowSubGF(id, categoria){	
		var data = new Array();
		var pagina;
		var contenedor;
		var tabla;
		var campo;
		switch(categoria){
			case 'variedad':
				pagina = '#glutenVariedadList';
				contenedor = '#gfcProductos';
				tabla = 'glutenComProd';
				campo = 'id_categoria';
			break;
			}
		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM '+tabla+' WHERE '+campo+' = ?', [id], function (tx, results) {
				var len = results.rows.length;
				for (var i=0; i<len; i++){
					data[i] = results.rows.item(i);
				}
			$(contenedor).empty();
			$(contenedor).html('<li data-role="list-divider">'+data[0].categoria+'</li>');
			  $.each(data, function(index, item) {		
				  $(contenedor).append('<li><a href="javascript:ShowProdGF('+item.id+')">'+item.nombre+'</a></li>');
				  });
					$(contenedor).listview("refresh");
				});
			});
			setTimeout( function() {
				$.mobile.changePage(pagina);
			}, 500);
	}
	function ShowItemGF(id,categoria){
		var pagina;
		var campo = 'id';
		var tabla;
		var contenedor;
		var data = new Array();
		var row = new Array();
		switch(categoria){
			case 'pasos':
				pagina = '#glutenPasos';
				tabla = 'glutenPrimerosPasos';
				contenedor = '#contPasos';
				db.transaction(function (tx) {  
					tx.executeSql('SELECT * FROM '+tabla+' WHERE '+campo+' = ?', [id], function (tx, results) {
						var len = results.rows.length;
						for (var i=0; i<len; i++){
							data[i] = results.rows.item(i);
						}
						  $(contenedor).empty();
						  $('#titulo').html(data[0].nombre);
						  $(contenedor).html(data[0].info);
					});	
				});	
			break;
		}
		$.mobile.changePage(pagina);	
	}
	