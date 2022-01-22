


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

let actualWeek = 3;
const day = ["lundi", "mardi","jeudi","vendredi"];
const dayNum = ["1lundi", "2mardi","err","3jeudi","4vendredi"];

//classe
let listClasse = ["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","1A","1B","1C","1D","1E","1F","1G","1H","1I","1J","1K","TA","TB","TC","TD","TE","TF","TG","TH","TI","TJ","TK"]

//path

function path(j,h){
    return "foyer_midi/test/" + jour[j] + "/" + (11 + h) + "h"
}


//Stats


function getList(j,h,type){

    let users = []
    database.ref(path(j,h)+"/" + type).once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            let user = child.key
            
            console.log("user : " + user)
            users.push(user)
            
            
            
        });
        
        let Scores = []
        let usersScore = []
        for(let u in users){
            let user = users[u] 
            database.ref(path(j,h)+"/"+ type + "/" + user + "/score").once("value", function(snapshot) {
                let sc = snapshot.val()
                if(Scores[sc] == null){
                    Scores[sc] = []
                }
                Scores[sc].push(u)
                usersScore.push(sc)
                console.log(user + "(" + u + ") -> " + sc)
            })
        }



        let linked = []
        for(let u in users){
            linked[u] = []
            database.ref(path(j,h)+"/" + type + "/" + users[u] +"/amis").once("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    let ami = child.key
                    console.log("   ami : " + ami)
                    let index = users.indexOf(ami)
                    if(index != -1){
                        linked[index].push(users[u])
                    }
                   
                })
            })
        }

        let amis = []
        for(let u in users){
            amis[u] = []
            database.ref(path(j,h)+"/" + type + "/" + users[u] +"/amis").once("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    let ami = child.key
                    amis[u].push(ami)
                   
                })
            })
        }

        setTimeout(function() {
            
        },1000);
})

}