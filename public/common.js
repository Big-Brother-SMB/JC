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


//cookies

let tablecookie = document.cookie.split('; ');
let cookie = {};
for(i in tablecookie){
    let row = tablecookie[i].split('=')
    if(row.length >1){
        cookie[row[0]] = row[1];
    }
}

function writeCookie(key, value){
    document.cookie = key + "=" + value + "; expires=Mon, 06 Oct 2100 00:00:00 GMT; path=/";  
}

function readCookie(key){
    return cookie[key];
}

function readIntCookie(key){
    return parseInt(cookie[key]);
}

function delCookie(key){
    document.cookie = key + "=; expires=Mon, 02 Oct 2000 01:00:00 GMT; path=/";
}

function existCookie(key){
    if(cookie[key] != null){
        return true
    }else{
        return false
    }
    
}

let week = readIntCookie("week")


// semaine

let actualWeek = 10;
const day = ["Lundi", "Mardi","Jeudi","Vendredi"];
const dayWithMer = ["1lundi", "2mardi","err","3jeudi","4vendredi"]
const dayNum = ["1lundi", "2mardi","3jeudi","4vendredi"];

//classe
let listClasse = ["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","1A","1B","1C","1D","1E","1F","1G","1H","1I","1J","1K","TA","TB","TC","TD","TE","TF","TG","TH","TI","TJ","TK","adultes"]
let listNiveau = [listClasse.slice(0, 11),listClasse.slice(11,22),listClasse.slice(22,33)]
nomNiveau = ["secondes","premières","terminales"]
//path

function path(j,h){
    return "foyer_midi/semaine"+week+"/" + dayNum[j] + "/" + (11 + h) + "h"
}

function hash(){
    let d =  new Date()
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " +  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()  
}

//reload
function reload(){
    window.location.reload(true)
}

//modes
let listMode = ["horaire non planifié","ouvert","fermé","uniquement inscription","uniquement désinscription","ouvert mais plus de changements","vacances","aleatoire","calcul","fini"]

//Stats

let users = []
let amis = []
let amisTag = []

let nbScores = []
let usersScore = []

let classes = []
let usersClasse = []

let addLinkTag = []
let linkedTag = []
let delLinkTag = []
function getStat(j,h,type){
    
    
    database.ref(path(j,h)+"/" + type).once("value", function(snapshot) {
        let i = 0
        snapshot.forEach(function(child) {
            let user = child.key
            
            users.push(user)
            amis[i] = []
            amisTag[i] = []
            addLinkTag[i] = []
            linkedTag[i] = []
            delLinkTag[i] = []
            
            let num = i
            database.ref(path(j,h)+"/users/" + user +"/amis").once("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    let ami = child.key
                    amis[num].push(ami)
                })
            })
            i++
            
            
        });
        
        
        for(let u in users){
            let user = users[u] 
            database.ref(path(j,h)+"/users/" + user + "/score").once("value", function(snapshot) {
                let sc = snapshot.val()
                if(nbScores[sc] == null){
                    nbScores[sc] = []
                }
                nbScores[sc].push(u)
                usersScore.push(sc)
            })
            
        }

        for(let u in users){
            let user = users[u] 
            database.ref(path(j,h)+"/users/" + user + "/classe").once("value", function(snapshot) {
                let c = snapshot.val()
                if(c == null){
                    usersClasse.push("none")
                }else{
                    if(classes[c] == null){
                        classes[c] = []
                    }
                    classes[c].push(u)
                    usersClasse.push(c)
                }
            })
            
        }

 
    })


    setTimeout(function() {
        console.log("start")
        console.log(amis)
        for(let u in users){
            amisTag[u] = []
            for(let a in amis[u]){
                let index = users.indexOf(amis[u][a])
                if(index != -1){
                    amisTag[u].push(index)
                }
                
            }
        }

        
        for(let u in users){
            linkedTag[u] = []
        }
        for(let u in users){
            for(let a in amisTag[u]){
                linkedTag[amisTag[u][a]].push(parseInt(u))
                
            }
            
        }
        
        //adding link -> users needed to add if you add this user

        
        let actUser
        function searchAmis(u){
            if(addLinkTag[actUser].indexOf(u) == -1){
                addLinkTag[actUser].push(u)
                for(a in amisTag[u]){
                    searchAmis(amisTag[u][a])
                }
            }
            
        }

        for(let u in users){
            actUser = parseInt(u)
            addLinkTag[actUser] = []
            searchAmis(actUser)
        }

        //del link -> users needed to delete if you delete this user

        
        function searchLink(u){
            if(delLinkTag[actUser].indexOf(u) == -1){
                delLinkTag[actUser].push(u)
                for(l in linkedTag[u]){
                    searchLink(linkedTag[u][l])
                }
            }
            
        }

        for(let u in users){
            actUser = parseInt(u)
            delLinkTag[actUser] = []
            searchLink(actUser)
        }



        console.log("users",users)
        console.log("amis",amis)
        console.log(amisTag)
        console.log("addLinkTag",addLinkTag)
        console.log(linkedTag)
        console.log("delLinkTag",delLinkTag)
        console.log("classes",classes)
        console.log(usersClasse)
        console.log(nbScores)
        console.log("users score",usersScore)

    },1000);


}

//randint
function randint(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//nb pers
function nbPers(j,h,type,func){
    console.log(path(j,h)+"/" + type)
    database.ref(path(j,h)+"/" + type).once("value", function(snapshot) {
        let total = 0
        snapshot.forEach(function(child) {
            total++;  
        });
        func(total)
    })
}


//autocomplete

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


function autocomplete(inp, arr, select) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
                select(this.getElementsByTagName("input")[0].value)
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


//inscrire (passer de demandes à inscrit)
function inscrire(j,h,u){
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
    return addLinkTag[u].length
}