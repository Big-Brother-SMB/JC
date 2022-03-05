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
