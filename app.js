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
	var placebought = document.getElementById('place-bought').value;
	var datebought = document.getElementById('date-bought').value;
	var inventory = document.getElementById('inventory').value;
	var datedrink = document.getElementById('date-drink').value;
	
	db.collection("wines").add({
	    Producer: producer,
	    Name: name,
	    Variety: variety,
		Vintage: vintage,
		Origin: origin,
		Price: price,
		StoreBought: placebought,
		DateAcquired: datebought,
		Inventory: inventory,
		DrinkDate: datedrink	
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
		
		document.getElementById('producer').value = '';
		document.getElementById('name').value = '';
		document.getElementById('variety').value = '';
		document.getElementById('vintage').value = '';
		document.getElementById('origin').value = '';
		document.getElementById('price').value = '';
		document.getElementById('place-bought').value = '';
		document.getElementById('date-bought').value = '';
		document.getElementById('inventory').value = '';
		document.getElementById('date-drink').value = '';
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

db.collection("wines").where("Category", "==", "Red").onSnapshot(function(querySnapshot) {
        var dataSet = [];
        querySnapshot.forEach(function(doc) {
            dataSet.push([`${doc.data().Producer}`, `${doc.data().Name}`, `${doc.data().Variety}`, `${doc.data().Vintage}`, `${doc.data().Origin}`]);
        });
        console.log(dataSet);
		
		$(document).ready(function() {
		    $('#reds').DataTable( {
				searching: false,
				paging: false,
				info: false,
		        data: dataSet,
		        columns: [
		            { title: "Producer" },
		            { title: "Name" },
		            { title: "Variety" },
		            { title: "Vintage" },
					{ title: "Origin" }
		        ],
				responsive: {
		                    details: {
		                        display: $.fn.dataTable.Responsive.display.modal( {
		                            header: function ( row ) {
		                                var data = row.data();
		                                return 'Details for '+data[0]+' '+data[1];
		                            }
		                        } ),
		                        renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
		                            tableClass: 'table'
		                        } )
		                    }
		                }
		    } );
		} );
});

db.collection("wines").where("Category", "==", "White").onSnapshot(function(querySnapshot) {
        var dataSet = [];
        querySnapshot.forEach(function(doc) {
           dataSet.push([`${doc.data().Producer}`, `${doc.data().Name}`, `${doc.data().Variety}`, `${doc.data().Vintage}`, `${doc.data().Origin}`]);
        });
        console.log(dataSet);
		
		$(document).ready(function() {
		    $('#whites').DataTable( {
				searching: false,
				paging: false,
				info: false,
		        data: dataSet,
		        columns: [
		            { title: "Producer" },
		            { title: "Name" },
		            { title: "Variety" },
		            { title: "Vintage" },
					{ title: "Origin" }
		        ]
		    } );
		} );
});

db.collection("wines").where("Category", "==", "Sparkling").onSnapshot(function(querySnapshot) {
        var dataSet = [];
        querySnapshot.forEach(function(doc) {
            dataSet.push([`${doc.data().Producer}`, `${doc.data().Name}`, `${doc.data().Variety}`, `${doc.data().Vintage}`]);
        });
        console.log(dataSet);
		
		$(document).ready(function() {
		    $('#sparkling').DataTable( {
				searching: false,
				paging: false,
				info: false,
		        data: dataSet,
		        columns: [
		            { title: "Producer" },
		            { title: "Name" },
		            { title: "Variety" },
		            { title: "Vintage" }
		        ]
		    } );
		} );
});




    
  

//var dataSet = [["qwjeorij", "as;kldfj", ";laksdjf", ";alsk"], ["asdfkj", "tqoihjw", ";qowipe", "sickjns"]]
