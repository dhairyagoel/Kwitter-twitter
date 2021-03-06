var firebaseConfig = {
  apiKey: "AIzaSyB0eoFpasYrU9xSSYzJWtBiT8AUrXVfU0U",
  authDomain: "kwitter-a6717.firebaseapp.com",
  databaseURL: "https://kwitter-a6717.firebaseio.com",
  projectId: "kwitter-a6717",
  storageBucket: "kwitter-a6717.appspot.com",
  messagingSenderId: "164244590336",
  appId: "1:164244590336:web:4aa6de51657798536a6de5",
  measurementId: "G-TQVFJX7JLM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter.html";
}