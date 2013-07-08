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
         tx.executeSql('CREATE TABLE IF NOT EXISTS glutenComCat (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, pais TEXT)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS glutenComProd (id INTEGER PRIMARY KEY AUTOINCREMENT, id_categoria INTEGER, nombre TEXT, categoria TEXT, marca TEXT, fabricante TEXT, pais TEXT, imagen TEXT, presentacion TEXT)');
         //tx.executeSql('CREATE TABLE IF NOT EXISTS glutenRectCat ()');
		 SincronizarDB();
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
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
				  $('#gfcCategorias').append('<li><a href="javascript:ShowProdCATGF('+item.id+')">'+item.nombre+'</a></li>');
				  });
				  $("#gfcCategorias").listview("refresh");
				});
			});	
	}
	function ShowProdCATGF(id){
	$.mobile.changePage("#gluten5");
	/*
	$( "#gluten5" ).on( "pagebeforecreate,pagebeforeshow", function( event ) {		
		var data = new Array();
		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM glutenComProd WHERE id_categoria = ?', [id], function (tx, results) {
				var len = results.rows.length;
				for (var i=0; i<len; i++){
					data[i] = results.rows.item(i);
				}
			$('#gfcProductos').empty();
			  $.each(data, function(index, item) {		
				  $('#gfcProductos').append('<li><a href="javascript:ShowProdGF('+item.id+')">'+item.nombre+'</a></li>');
				  });
				});
			});
				$("#gfcProductos").listview("refresh");
		});
		*/
	}
	