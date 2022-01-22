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

const jour = ["1lundi", "2mardi","3jeudi","4vendredi"];

const menu = "../../menu/menu.html"

let user = sessionStorage.getItem("user");
let j = sessionStorage.getItem("j");
let h = parseInt(sessionStorage.getItem("h"));
console.log(path(j,h));

let divDemande = document.getElementById("liste")

database.ref(path(j,h) + "/demandes").once("value", function(snapshot) {
    divDemande.innerHTML = ""
    snapshot.forEach(function(child) {
        let divPers = document.createElement("div")
        //divPers.style.display = "inline-block"
        let pers = document.createElement("button")
        let name = child.key
        pers.innerHTML = name
        let del = document.createElement("button")
        del.addEventListener("click", function() {
            console.log("add")
        })
        del.innerHTML = "retirer"
        let wait = document.createElement("button")
        wait.addEventListener("click", function() {
            console.log("wait")
        })
        wait.innerHTML = "Mettre sur liste d'attente"
        divPers.appendChild(pers);
        divPers.appendChild(del);
        divPers.appendChild(wait);
        divDemande.appendChild(divPers);
    })
})
