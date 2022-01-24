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

for(i in listClasse){
    let opt = document.createElement("option")
    opt.innerHTML = listClasse[i]
    document.getElementById("classe").appendChild(opt);
  }

let utilisateurs = []
    database.ref("users").once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            utilisateurs.push(child.key)
            
            
            
        })
        autocomplete(document.getElementById("search"), utilisateurs);
    })

let divClasse = document.getElementById("classe")
let divScore = document.getElementById("score")

document.getElementById("search").addEventListener("change", function() {
    setTimeout(function() {
        console.log("change")

    let utilisateur = document.getElementById("search").value
    if(utilisateurs.indexOf(utilisateur) == -1){
        document.getElementById("info").innerHTML = "cet utilisateur n'existe pas"
    }else{
        document.getElementById("info").innerHTML = ""
        database.ref("users/" + utilisateur + "/classe").once('value').then(function(snapshot) {
    
            divClasse.selectedIndex = listClasse.indexOf(snapshot.val());
            divClasse.addEventListener("change", function() {
                database.ref("users/" + utilisateur + "/classe").set(listClasse[this.selectedIndex])
                });
        });
        
        database.ref("users/" + utilisateur + "/score").once('value').then(function(snapshot) {
            divScore.value = snapshot.val();
            divScore.addEventListener("change", function() {
                database.ref("users/" + utilisateur + "/score").set(this.value)
            });
        });
    }
    
    },100);
    
})
    
    