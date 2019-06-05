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

const dbRef = firebase.database().ref();
const usersRef = dbRef.child('wines');

const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {
   let user = snap.val();
   let $li = document.createElement("li");
   $li.innerHTML = user.name;
   $li.setAttribute("child-key", snap.key); 
   $li.addEventListener("click", userClicked)
   userListUI.append($li);
});

function userClicked(e) {

  var userID = e.target.getAttribute("child-key");

  const userRef = dbRef.child('wines/' + userID);

  const userDetailUI = document.getElementById("userDetail");
  userDetailUI.innerHTML = ""

  userRef.on("child_added", snap => {
    var $p = document.createElement("p");
    $p.innerHTML = snap.key + " - " + snap.val()
    userDetailUI.append($p);
  });

}