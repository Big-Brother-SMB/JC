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

let divDemandes = document.getElementById("liste")

getStat(j,h,"demandes")
setTimeout(function() {
    
    if(users.length == 0){
        divDemandes.innerHTML = "aucun utilisateurs"
    }else{
        divDemandes.innerHTML = ""
        for(let u in users){
           
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
            wait.innerHTML = "Mettre sur liste d'attente (" + addLinkTag[u].length + ")"
            
            let add = document.createElement("button")
            add.addEventListener("click", function() {
                console.log("add")
                console.log("add : " + path(j,h) + "/inscrits/" + users[u] + "/score")
                console.log(users)
                console.log(u)
                for(let a in amis[u]){
                    database.ref(path(j,h) + "/inscrits/" + users[u] + "/amis/" + amis[u][a]).set(0)
                }
                database.ref(path(j,h) + "/inscrits/" + users[u] + "/score").set(usersScore[u])
                database.ref(path(j,h) + "/demandes/" + users[u]).remove()

                console.log(addLinkTag[u])
                for(let l in addLinkTag[u]){
                    let num = addLinkTag[u][l]
                    console.log("user : " + users[num] + " / " + num)
                    for(let a in amis[num]){
                        database.ref(path(j,h) + "/inscrits/" + users[num] + "/amis/" + amis[num][a]).set(0)
                    }
                    database.ref(path(j,h) + "/inscrits/" + users[num] + "/score").set(usersScore[num])
                    database.ref(path(j,h) + "/demandes/" + users[num]).remove()
                }
            })
            add.innerHTML = "inscrire (" + addLinkTag[u].length + ")"

            let score = document.createElement("button")
            score.innerHTML = usersScore[u] + " pts"

            divPers.appendChild(pers);
            divPers.appendChild(del);
            divPers.appendChild(wait);
            divPers.appendChild(add);
            divPers.appendChild(score);
            divDemandes.appendChild(divPers);
        }
    }
    
        
        
},1000);
