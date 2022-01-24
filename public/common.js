


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

let actualWeek = 4;
const day = ["Lundi", "Mardi","Jeudi","Vendredi"];
const dayWithMer = ["1lundi", "2mardi","err","3jeudi","4vendredi"]
const dayNum = ["1lundi", "2mardi","3jeudi","4vendredi"];

//classe
let listClasse = ["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","1A","1B","1C","1D","1E","1F","1G","1H","1I","1J","1K","TA","TB","TC","TD","TE","TF","TG","TH","TI","TJ","TK"]

//path

function path(j,h){
    return "foyer_midi/semaine"+week+"/" + dayNum[j] + "/" + (11 + h) + "h"
}

//modes
let listMode = ["horaire non planifié","ouvert","fermé","uniquement inscription","uniquement désinscription","ouvert mais plus de changements","vacances","aleatoire","calcul","fini"]

//Stats

let users = []
let amis = []
let amisTag = []
let nbScores = []
let usersScore = []

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
            database.ref(path(j,h)+"/" + type + "/" + user +"/amis").once("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    let ami = child.key
                    amis[num].push(ami)
                })
            })
            i++
            
            
        });
        
        
        for(let u in users){
            let user = users[u] 
            database.ref(path(j,h)+"/"+ type + "/" + user + "/score").once("value", function(snapshot) {
                let sc = snapshot.val()
                if(nbScores[sc] == null){
                    nbScores[sc] = []
                }
                nbScores[sc].push(u)
                usersScore.push(sc)
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
                linkedTag[amisTag[u][a]].push(u)
                
            }
            
        }
        
        //adding link -> users needed to add if you add this user

        
        let actUser
        function searchAmis(u){
            if(addLinkTag[actUser].indexOf(u) == -1 && u != actUser){
                addLinkTag[actUser].push(u)
                for(a in amisTag[u]){
                    searchAmis(amisTag[u][a])
                }
            }
            
        }

        for(let u in users){
            actUser = u
            addLinkTag[actUser] = []
            
            for(a in amisTag[u]){
                searchAmis(amisTag[u][a])
            }
        }

        //del link -> users needed to delete if you delete this user

        
        function searchLink(u){
            if(delLinkTag[actUser].indexOf(u) == -1 && u != actUser){
                delLinkTag[actUser].push(u)
                for(l in linkedTag[u]){
                    searchLink(linkedTag[u][l])
                }
            }
            
        }

        for(let u in users){
            actUser = u
            delLinkTag[actUser] = []
            
            for(l in linkedTag[u]){
                searchLink(linkedTag[u][l])
            }
        }



        console.log(users)
        console.log(amisTag)
        console.log(addLinkTag)
        console.log(linkedTag)
        console.log(delLinkTag)

    },1000);


}