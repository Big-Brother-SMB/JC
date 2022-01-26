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

let inPlaces = document.getElementById("places")
let places
database.ref(path(j,h) + "/places").once('value').then(function(snapshot) {
    places = snapshot.val();
    inPlaces.value = places
    inPlaces.addEventListener("change", function() {
        places = this.value
        database.ref(path(j,h) + "/places").set(places)
    });
});



function nbPersDemande(nb){
    document.getElementById("demandes").innerHTML = "demandes (" + nb + ")"
}
nbPers(j,h,"demandes",nbPersDemande)

document.getElementById("demandes").addEventListener("click", function() {
    window.location.href = "listes/demandes.html";
});

let inscrits
function nbPersInscrit(nb){
    inscrits = nb
    document.getElementById("inscrits").innerHTML = "inscrits (" + nb + ")"
}
nbPers(j,h,"inscrits",nbPersInscrit)

document.getElementById("inscrits").addEventListener("click", function() {
    window.location.href = "listes/inscrits.html";
});

let divClasses = document.getElementById("classes")
let cbClasses = []
console.log(listNiveau)
for(let n in listNiveau){
    cbClasses[n] = []
    let divNiveau = document.createElement("div")
    divNiveau.style="display: inline-block;*display: inline"

    let nSelectAll = document.createElement("button")
    nSelectAll.className = "bTriNiveau"
    nSelectAll.innerHTML ="selectionner tous les " + nomNiveau[n]
    nSelectAll.addEventListener("click", function() {
        console.log("niveau " + n + " select all")
        for(i in cbClasses[n]){
            cbClasses[n][i].checked = true
        }
        
    });
    divNiveau.appendChild(nSelectAll);

    let nSelectNone = document.createElement("button")
    nSelectNone.className = "bTriNiveau"
    nSelectNone.innerHTML ="retirer tous les " + nomNiveau[n]
    nSelectNone.addEventListener("click", function() {
        console.log("niveau " + n + " select none")
        for(i in cbClasses[n]){
            cbClasses[n][i].checked = false
        }
        
    });
    divNiveau.appendChild(nSelectNone);

    let nInversed = document.createElement("button")
    nInversed.className = "bTriNiveau"
    nInversed.innerHTML ="Inverser tous les " + nomNiveau[n]
    nInversed.addEventListener("click", function() {
        console.log("niveau " + n + " inversed")
        for(i in cbClasses[n]){
            cbClasses[n][i].checked = !cbClasses[n][i].checked
        }
        
    });
    divNiveau.appendChild(nInversed);



    for(let i in listNiveau[n]){
        let opt = document.createElement("p")
        cbClasses[n][i] = document.createElement("input")
        cbClasses[n][i].type = "checkbox"
        cbClasses[n][i].checked = true
        opt.innerHTML = listNiveau[n][i]
        opt.appendChild(cbClasses[n][i]);
        divNiveau.appendChild(opt);
    }
    divClasses.appendChild(divNiveau);
    
}

document.getElementById("select all").addEventListener("click", function() {
    console.log("select all")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            cbClasses[n][i].checked = true
        }
    }
});

document.getElementById("select none").addEventListener("click", function() {
    console.log("select none")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            cbClasses[n][i].checked = false
        }
    }
});

document.getElementById("inversed").addEventListener("click", function() {
    console.log("inversed")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            cbClasses[n][i].checked = !cbClasses[n][i].checked
        }
    }
});

document.getElementById("start algo").addEventListener("click", function() {
    let classes = []
    console.log("start algo")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            if(cbClasses[n][i].checked){
                classes.push(listNiveau[n][i])
            }
             
        }
    }
    tri(classes,places,inscrits)
});

function tri(classes,places,inscrits){
    console.log("authorised class",classes)
    getStat(j,h,"demandes")
    

}

