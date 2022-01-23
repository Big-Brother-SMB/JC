const firebaseConfig = {
    apiKey: "AIzaSyAPJ-33mJESHMcvEtaPX7JwIajUawblSuY",
    authDomain: "big-brother-ac39c.firebaseapp.com",
    databaseURL: "https://big-brother-ac39c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "big-brother-ac39c",
    storageBucket: "big-brother-ac39c.appspot.com",
    messagingSenderId: "498546882155",
    appId: "1:498546882155:web:722a18432bf108e0c1632e",
    measurementId: "G-J5N38BGN7R"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database()

const menu = "../../menu/menu.html"

let j = sessionStorage.getItem("j");
let h = parseInt(sessionStorage.getItem("h"));
console.log(path(j,h));


let divMode = document.getElementById("mode")
for(i in listMode){
    let opt = document.createElement("option")
    opt.innerHTML = listMode[i]
    divMode.appendChild(opt);
}

database.ref(path(j,h) + "/ouvert").once('value').then(function(snapshot) {
    
    divMode.selectedIndex = snapshot.val();
    divMode.addEventListener("change", function() {
        database.ref(path(j,h) + "/ouvert").set(this.selectedIndex)
      });
});

let places = document.getElementById("places")
database.ref(path(j,h) + "/places").once('value').then(function(snapshot) {
    places.value = snapshot.val();
    places.addEventListener("change", function() {
        database.ref(path(j,h) + "/places").set(this.value)
    });
});


document.getElementById("inscrits").addEventListener("click", function() {
    window.location.href = "listes/inscrits.html";
});

document.getElementById("demandes").addEventListener("click", function() {
    window.location.href = "listes/demandes.html";
});

