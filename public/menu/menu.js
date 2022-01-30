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


//window.location.href = "../index.html";

//(new Date()).getWeek();


document.getElementById("semainePrecedente").addEventListener("click", function() {
    sessionStorage.setItem("week", parseInt(sessionStorage.getItem("week")) - 1);
    week = week - 1
    writeCookie("week",week)
    refreshDatabase()
});

document.getElementById("semaineActuelle").addEventListener("click", function() {
    sessionStorage.setItem("week", actualWeek);
    week = actualWeek
    writeCookie("week",week)
    refreshDatabase()
});


document.getElementById("semaineSuivante").addEventListener("click", function() {
    sessionStorage.setItem("week", parseInt(sessionStorage.getItem("week")) + 1);
    week = week + 1
    writeCookie("week",week)
    refreshDatabase()
});

document.getElementById("users").addEventListener("click", function() {
    window.location.href = "../users/users.html";

});


const body = document.getElementById("body");
const jour = ["lundi", "mardi","jeudi","vendredi"];
Date.prototype.getWeek = function() {
    console.log(this)
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 0) / 7);
}





let bouton = [];
let total = [];
let demandes = [];
let places = [];
let inscrit = []
let ouvert = []
let nbAmis = []


for(let j = 0; j < 4; j++){
    let div = document.createElement("div")
    let text = document.createElement("button")
    text.className = "jours";
    text.innerHTML = jour[j]
    div.appendChild(text);
    
    bouton[j] = []
    total[j] = []
    places[j] = []
    demandes[j] = []
    nbAmis[j] = []
    inscrit[j] = [false,false]
    ouvert[j] = [0,0]
    for(let h = 0; h < 2; h++){
        bouton[j][h] = document.createElement("button")
        bouton[j][h].id = "" + j + h;
        bouton[j][h].onclick = function(){select(j,h)};
        bouton[j][h].className="places"
        div.appendChild(bouton[j][h]);
      
    }
    body.appendChild(div);
   
}


let nbFois;
//refreshDatabase();
function refreshDatabase(){

    let sn = ["31 janvier au 4 février","7 au 11 févier","14 au 18 févier"]

    let text = "semaine du " + sn[week-actualWeek] 
    if(week == actualWeek){
        text = "cette semaine"
    }
    document.getElementById("semaine").innerHTML = text + " (n°" + week + ")"

    nbFois = 0;
    for(let j = 0; j < 4; j++){
        for(let h = 0; h < 2; h++){
            total[j][h] = 0
            database.ref(path(j,h) + "/places").once('value').then(function(snapshot) {
                total[j][h] = snapshot.val();
                update(j, h);
            });
      
            
            ouvert[j][h] = 0
            database.ref(path(j,h) + "/ouvert").once('value').then(function(snapshot) {
                if(snapshot.val() == null){
                    ouvert[j][h] = 0
                }else{
                    ouvert[j][h] = snapshot.val()
                }
                update(j, h);
            });

         
            demandes[j][h] = 0
      
            database.ref(path(j,h) + "/demandes").once("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    demandes[j][h] = demandes[j][h] + 1
                    update(j, h);
                });
            });

        
        }
    }
}


function update(j,h){

    places[j][h] = total[j][h] - demandes[j][h];
    setTimeout(updateAffichage(j,h),1000);
}

function updateAffichage(j,h){
    let text;
    if(places[j][h] <= 0){
        text = "plein";
    }else if(places[j][h] == 1){
        text = "il reste une place";
    }else{
        text = "il reste " + places[j][h] + " places";
    }
              
    switch (ouvert[j][h]){
        case 0:
            text = "horaire non planifié"
            bouton[j][h].className="ferme"
            break;
        case 1:
            if(places[j][h] <= 0){
                bouton[j][h].className="zero"
                text = "plein";
            }else{
                bouton[j][h].className="places"
                if(places[j][h] == 1){
                    text = "il reste une place";
                }
            }
            break;
        case 2:
            text = "Foyer fermé"
            bouton[j][h].className="ferme"
            break;
        case 3:
            text = text + "<br>(pas de désinscriptions possible)";
            bouton[j][h].className="bloque"
            break;
        case 4:
            text = text + "<br>(pas d'inscriptions possible)";
            bouton[j][h].className="ferme"
            break;
        case 5:
            text = "ouvert (changements bloqués)";
            bouton[j][h].className="ferme"
            break;
        case 6:
            text = "vacances"
            bouton[j][h].className="ferme"
            break;
        case 7:
            if(places[j][h] <= 0){
                
            }else{
                bouton[j][h].className="places"
            }
            text = demandes[j][h] + "/" + total[j][h]
            break;
        case 8:
            text = "calcul en cours"
            bouton[j][h].className="ferme"
            break;
        case 9:
                text = "fini"
                bouton[j][h].className="ferme"
                break;

    }
    bouton[j][h].innerHTML = text;
}

function select(j,h){
    
    sessionStorage.setItem("j", j);
    sessionStorage.setItem("h", h);
    window.location.href = "../crenau/crenau.html";
}

function reload(){
    window.location.reload(true)
}


function loop(){
    refreshDatabase();

    setTimeout(loop,10000);
}
loop();
