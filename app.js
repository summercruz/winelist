// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAwFD3xmz9h7X5YQnKsTjEE8yqcQdpJclw",
  authDomain: "winelist-1c8dd.firebaseapp.com",
  databaseURL: "https://winelist-1c8dd.firebaseio.com",
  projectId: "winelist-1c8dd",
  storageBucket: "winelist-1c8dd.appspot.com",
  messagingSenderId: "715799378186",
  appId: "1:715799378186:web:23b62ba96fbbd9ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var db = firebase.firestore();

function add_wine() {
	
	var producer = document.getElementById('producer').value;
	var name = document.getElementById('name').value;
	var variety = document.getElementById('variety').value;
	var vintage = document.getElementById('vintage').value;
	var origin = document.getElementById('origin').value;
	var price = document.getElementById('price').value;
	var category = document.getElementById('category').value;
	var placebought = document.getElementById('place-bought').value;
	var datebought = document.getElementById('date-bought').value;
	var inventory = document.getElementById('inventory').value;
	var datedrink = document.getElementById('date-drink').value;
	var drinkby = document.getElementById('drinkby').value;
	var locx = document.getElementById('locx').value;
	var locy = document.getElementById('locy').value;
	
	db.collection("wines").add({
	    Producer: producer,
	    Name: name,
	    Variety: variety,
		Vintage: vintage,
		Origin: origin,
		Price: price,
		Category: category,
		StoreBought: placebought,
		DateAcquired: datebought,
		Inventory: inventory,
		DrinkDate: datedrink,
		DrinkBy: drinkby,
		locx: locx,
		locy: locy	
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
		
		document.getElementById('producer').value = '';
		document.getElementById('name').value = '';
		document.getElementById('variety').value = '';
		document.getElementById('vintage').value = '';
		document.getElementById('origin').value = '';
		document.getElementById('price').value = '';
		document.getElementById('category').value = '';
		document.getElementById('place-bought').value = '';
		document.getElementById('date-bought').value = '';
		document.getElementById('inventory').value = '';
		document.getElementById('date-drink').value = '';
		document.getElementById('drinkby').value = '';
		document.getElementById('locx').value = '';
		document.getElementById('locy').value = '';
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

function tdclick() {
	$('td').click(function(){
	  var col = $(this).parent().children().index($(this));
	  var row = $(this).parent().parent().children().index($(this).parent());
	  
	  console.log(col, row);
	  var dataSet = [];
	  
	  
	  db.collection("wines").where("locx", "==", String(col)).where("locy", "==", String(row))
	  	.get()
	  	.then(function(querySnapshot) {
	          
	        querySnapshot.forEach(function(doc) {
				   dataSet = doc.data();
	        });
	        console.log(dataSet);
			
			
			var modalcontent = document.getElementById('modalcontent');
			var modalheading = document.getElementById('modalheading');
			
			if (dataSet.length == 0){
				modalheading.innerHTML = "Empty Slot";
				modalcontent.innerHTML = "Wine not available";
			}
			else {  
	  		
	  		modalheading.innerHTML = "Details for " + dataSet.Producer + " " + dataSet.Name;
	  		modalcontent.innerHTML = `
	  			<div class="container-fluid">
	  				<div class="row">
	  				      <div class="col-md-4"><b>Producer:</b></div>
	  				      <div class="col-md-4">${dataSet.Producer}</div>
	  				</div>
	  				<div class="row">
	  				      <div class="col-md-4"><b>Name:</b></div>
	  				      <div class="col-md-4">${dataSet.Name}</div>
	  				</div>
	  				<div class="row">
	  				      <div class="col-md-4"><b>Variety:</b></div>
	  				      <div class="col-md-4">${dataSet.Variety}</div>
	  				</div>
	  				<div class="row">
	  				      <div class="col-md-4"><b>Vintage:</b></div>
	  				      <div class="col-md-4">${dataSet.Vintage}</div>
	  				</div>
	  				<div class="row">
	  				      <div class="col-md-4"><b>Origin:</b></div>
	  				      <div class="col-md-4">${dataSet.Origin}</div>
	  				</div>
	  				<div class="row">
	  				      <div class="col-md-4"><b>Purchased at:</b></div>
	  				      <div class="col-md-4">${dataSet.StoreBought}</div>
	  				</div>
	  			<div>`;
	  		}
			$("#myModal").modal();
		})
		.catch(function(error) {
		        console.log("Error getting documents: ", error);
		});
	});
}

db.collection("wines").where("Category", "==", "Red").onSnapshot(function(querySnapshot) {
        var dataSet = [];
        querySnapshot.forEach(function(doc) {
             dataSet.push([`${doc.data().Producer}`, `${doc.data().Name}`, `${doc.data().Variety}`, `${doc.data().Vintage}`, `${doc.data().Origin}`, `${doc.data().StoreBought}`]);
        });
        console.log(dataSet);
		
		$(document).ready(function() {
		    var table = $('#reds').DataTable( {
				searching: false,
				paging: false,
				info: false,
		        data: dataSet,
		        columns: [
		            { title: "Producer" },
		            { title: "Name" },
		            { title: "Variety" },
		            { title: "Vintage" },
					{ title: "Origin" },
					{visible: false}
		        ]
		    } );
			
			$('#reds tbody').on('click', 'tr', function () {
			        var data = table.row( this ).data();
					var modalcontent = document.getElementById('modalcontent');
					var modalheading = document.getElementById('modalheading');
					modalheading.innerHTML = "Details for " + data[0] + " " + data[1];
					modalcontent.innerHTML = `
						<div class="container-fluid">
							<div class="row">
							      <div class="col-md-4"><b>Producer:</b></div>
							      <div class="col-md-4">${data[0]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Name:</b></div>
							      <div class="col-md-4">${data[1]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Variety:</b></div>
							      <div class="col-md-4">${data[2]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Vintage:</b></div>
							      <div class="col-md-4">${data[3]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Origin:</b></div>
							      <div class="col-md-4">${data[4]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Purchased at:</b></div>
							      <div class="col-md-4">${data[5]}</div>
							</div>
						<div>`;
						
					$("#myModal").modal();
			    } );
			
		} );
});

db.collection("wines").where("Category", "==", "White").onSnapshot(function(querySnapshot) {
        var dataSet = [];
        querySnapshot.forEach(function(doc) {
            dataSet.push([`${doc.data().Producer}`, `${doc.data().Name}`, `${doc.data().Variety}`, `${doc.data().Vintage}`, `${doc.data().Origin}`, `${doc.data().StoreBought}`]);
        });
        console.log(dataSet);
		
		$(document).ready(function() {
		    var table = $('#whites').DataTable( {
				searching: false,
				paging: false,
				info: false,
		        data: dataSet,
		        columns: [
		            { title: "Producer" },
		            { title: "Name" },
		            { title: "Variety" },
		            { title: "Vintage" },
		            { title: "Origin" },
		            {visible: false}
		        ]
		    } );
			
			$('#whites tbody').on('click', 'tr', function () {
			        var data = table.row( this ).data();
					var modalcontent = document.getElementById('modalcontent');
					var modalheading = document.getElementById('modalheading');
					modalheading.innerHTML = "Details for " + data[0] + " " + data[1];
					modalcontent.innerHTML = `
						<div class="container-fluid">
							<div class="row">
							      <div class="col-md-4"><b>Producer:</b></div>
							      <div class="col-md-4">${data[0]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Name:</b></div>
							      <div class="col-md-4">${data[1]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Variety:</b></div>
							      <div class="col-md-4">${data[2]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Vintage:</b></div>
							      <div class="col-md-4">${data[3]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Origin:</b></div>
							      <div class="col-md-4">${data[4]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Purchased at:</b></div>
							      <div class="col-md-4">${data[5]}</div>
							</div>
						<div>`
					$("#myModal").modal();
			    } );
			
		} );
});

db.collection("wines").where("Category", "==", "Sparkling").onSnapshot(function(querySnapshot) {
        var dataSet = [];
        querySnapshot.forEach(function(doc) {
            dataSet.push([`${doc.data().Producer}`, `${doc.data().Name}`, `${doc.data().Variety}`, `${doc.data().Vintage}`, `${doc.data().Origin}`, `${doc.data().StoreBought}`]);
        });
        console.log(dataSet);
		
		$(document).ready(function() {
		    var table = $('#sparkling').DataTable( {
				searching: false,
				paging: false,
				info: false,
		        data: dataSet,
		        columns: [
		            { title: "Producer" },
		            { title: "Name" },
		            { visible: false},
		            { visible: false },
		            { title: "Origin" },
		            {visible: false}
		        ]
		    } );
			
			$('#sparkling tbody').on('click', 'tr', function () {
			        var data = table.row( this ).data();
					var modalcontent = document.getElementById('modalcontent');
					var modalheading = document.getElementById('modalheading');
					modalheading.innerHTML = "Details for " + data[0] + " " + data[1];
					modalcontent.innerHTML = `
						<div class="container-fluid">
							<div class="row">
							      <div class="col-md-4"><b>Producer:</b></div>
							      <div class="col-md-4">${data[0]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Name:</b></div>
							      <div class="col-md-4">${data[1]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Variety:</b></div>
							      <div class="col-md-4">${data[2]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Vintage:</b></div>
							      <div class="col-md-4">${data[3]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Origin:</b></div>
							      <div class="col-md-4">${data[4]}</div>
							</div>
							<div class="row">
							      <div class="col-md-4"><b>Purchased at:</b></div>
							      <div class="col-md-4">${data[5]}</div>
							</div>
						<div>`
					$("#myModal").modal();
			    } );
		} );
});




    
  

//var dataSet = [["qwjeorij", "as;kldfj", ";laksdjf", ";alsk"], ["asdfkj", "tqoihjw", ";qowipe", "sickjns"]]
