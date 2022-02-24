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

/*let divClasses = document.getElementById("classes")
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
});*/

/*document.getElementById("start algo").addEventListener("click", function() {
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

function tri(classes,p,inscrits){
    console.log("authorised class",classes)
    getStat(j,h,"demandes")
    let places = p - inscrits
    let ajout = 0
    while(ajout < places){
        let alea = randint(0, score[scMin].length - 1)
                let i = alea
                do{
                    let ok = classes.indexOf(usersClasse[i]) != -1
                    for(let a in addLinkTag[i]){
                        if(classes.indexOf(usersClasse[i]) == -1){
                            ok = false
                        }
                    }
                    if(ok){
                        ajout = ajout + inscrire(j,h,i)
                    }
                    i++
                    
                }while(!ok && i != alea)
    }

}*/
document.getElementById("start algo").addEventListener("click", function() {
    algo()
})

function algo(){
    document.getElementById("start algo").innerHTML = "veuillez patienter"
    let places
    database.ref(path(j,h) + "/places").once('value').then(function(snapshot) {
        places = snapshot.val();
    });
    let inscrits = 0
    let dejaInscrit
    database.ref(path(j,h) + "/inscrits").once('value').then(function(snapshot) {
        snapshot.forEach(function(child) {
            inscrits++
        })
        dejaInscrit = inscrits
    });
    
    getStat(j,h,"demandes")
    setTimeout(function() {
        let tag = []
        for(let u in users){
            tag[u] = false
        }
        
        let alea = randint(0, users.length - 1)
        let base = alea
        let nbEmail = 0
        let fini = false

        while(places > inscrits){
            console.log("inscrit",inscrits)
            if(!tag[alea] && addLinkTag[alea].length <= places - inscrits){
                for(let pers in addLinkTag[alea]){
                    let p = addLinkTag[alea][pers]
                    if(!tag[p]){
                        let name = users[p]
                        let score = usersScore[p]
                        if(score == null){
                            score = 0
                        }
                        database.ref(path(j,h) + "/inscrits/" + name).set(score)
                        database.ref(path(j,h) + "/demandes/" + name).remove()
                        try{
                            database.ref("users/" + users[p] + "/email").once("value",function(snapshot){
                                let email = snapshot.val()
                                let prenom = users[p].split(" ")[0]
                                console.log(email)
                            Email.send({
                                Host: "smtp.gmail.com",
                                Username: "foyer.beaucamps@gmail.com",
                                Password: "beaucamps",
                                To: email,
                                From: "foyer.beaucamps@gmail.com",
                                Subject: "Inscription validée",
                                Body: "Bonjour " + prenom + ", ton inscription au foyer a été validée",
                            })
                                .then(function (message) {
                                console.log("mail sent successfully to " + email)
                                nbEmail++
                                if(fini){
                                    document.getElementById("start algo").innerHTML = "fini, " + (inscrits - dejaInscrit) + " inscriptions<br>il reste " + (places - inscrits) + " places<br>appuyer pour reload<br>Email : " + nbEmail + "/" + (inscrits - dejaInscrit)
                                    if(nbEmail == (inscrits - dejaInscrit)){
                                        document.getElementById("start algo").innerHTML = "fini, " + (inscrits - dejaInscrit) + " inscriptions<br>il reste " + (places - inscrits) + " places<br>appuyer pour reload<br>Email : fini"
                                    }
                                }
                                });
                            })
                            
                        }catch(exception){
                            console.log(exception)
                        }
                        console.log("inscrit : " + name)
                        tag[p] = true
                        inscrits++
                    }
                    
                }
                alea = randint(0, users.length - 1)
                base = alea
            }else{
                alea++  
                if(alea > users.length - 1){
                    alea = 0
                }
                if(alea == base){
                    console.log("plus de possibilité")
                    break
                }
                
            }
        }
        console.log("plus de places")
        database.ref("test").once("value", function(snapshot) {
            fini = true
            if(snapshot.val() == "test"){
                document.getElementById("start algo").innerHTML = "fini, " + (inscrits - dejaInscrit) + " inscriptions<br>il reste " + (places - inscrits) + " places<br>appuyer pour reload<br>Email envoyés : " + nbEmail
            }else{
                document.getElementById("start algo").innerHTML = "Une erreur a eu lieu,<br>appuyer pour reload<br>(" + (inscrits - dejaInscrit) + " inscrits, reste " + (places - inscrits) + " places)"
                
            }
            document.getElementById("start algo").addEventListener("click", function() {
                reload()
            })
        });
        
        
    },1000);
}


