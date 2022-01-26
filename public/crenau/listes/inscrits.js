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

let divListe = document.getElementById("liste")

getStat(j,h,"inscrits")
setTimeout(function() {
    
    if(users.length == 0){
        divListe.innerHTML = "aucun utilisateurs"
    }else{
        divListe.innerHTML = ""
        for(u in users){
            let divPers = document.createElement("div")
            //divPers.style.display = "inline-block"
            let pers = document.createElement("button")
            let name = users[u]
            pers.innerHTML = name
            let del = document.createElement("button")
            del.addEventListener("click", function() {
                console.log("del")
            })
            del.innerHTML = "retirer (" + delLinkTag[u].length + ")"
            let wait = document.createElement("button")
            wait.addEventListener("click", function() {
                console.log("wait")
            })
            wait.innerHTML = "Mettre sur liste d'attente (" + delLinkTag[u].length + ")"


            let classe = document.createElement("button")
            classe.innerHTML = usersClasse[u]

            let score = document.createElement("button")
            score.innerHTML = usersScore[u] + " pts"

            divPers.appendChild(pers);
            divPers.appendChild(del);
            divPers.appendChild(wait);
            divPers.appendChild(classe);
            divPers.appendChild(score);
            
            divListe.appendChild(divPers);
        }
    }
    
        
        
},1000);
