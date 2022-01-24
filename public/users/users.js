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
let user = sessionStorage.getItem("user");
function reload(){
    window.location.reload(true)
}
const menu = "../menu/menu.html"

let utilisateurs = []
    database.ref("users").once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            utilisateurs.push(child.key)
            
            
            
        })
        autocomplete(document.getElementById("search"), utilisateurs);
    })
    