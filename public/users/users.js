let divClasse = document.getElementById("classe")

for(i in listClasse){
    let opt = document.createElement("option")
    opt.innerHTML = listClasse[i]
    divClasse.appendChild(opt);
}

let divScore = document.getElementById("score")

let divPrio = document.getElementById("prio")
let addPrio = document.getElementById("addPrio")

let priorites = []
database.ref("priorites").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
        priorites.push(child.key)
        let opt = document.createElement("option")
        opt.innerHTML = child.key
        addPrio.appendChild(opt);
    })

})

let utilisateurs = []
database.ref("users").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
        utilisateurs.push(child.key) 
    })
    autocomplete(document.getElementById("search"), utilisateurs);
})



document.getElementById("search").addEventListener("change", function() {
    setTimeout(function() {
        console.log("change")

    let utilisateur = document.getElementById("search").value
    console.log(utilisateur)
    if(utilisateurs.indexOf(utilisateur) == -1){
        document.getElementById("info").innerHTML = "cet utilisateur n'existe pas"
    }else{
        document.getElementById("info").innerHTML = ""
        database.ref("users/" + utilisateur + "/classe").once('value').then(function(snapshot) {
    
            divClasse.selectedIndex = listClasse.indexOf(snapshot.val());
            divClasse.addEventListener("change", function() {
                database.ref("users/" + utilisateur + "/classe").set(listClasse[this.selectedIndex])
                });
        });
        
        database.ref("users/" + utilisateur + "/score").once('value').then(function(snapshot) {
            divScore.value = snapshot.val();
            divScore.addEventListener("change", function() {
                database.ref("users/" + utilisateur + "/score").set(this.value)
            });
        });
        let bPrio = []
        for(let {} in priorites){
            bPrio.push(false)
        }
        database.ref("users/" + utilisateur + "/priorites").once('value',function(snapshot) {
            if(snapshot.val() == null){
                divPrio.innerHTML = "aucune priorités"
            }else{
                console.log(snapshot.val())
                divPrio.innerHTML = ""
                snapshot.forEach(function(child) {
                    addButPrio(child.key)
                    bPrio[priorites.indexOf(child.key)] = true
                })
            }
        });
        
        addPrio.addEventListener("click", function() {
            const index = this.selectedIndex - 1
            addPrio.selectedIndex = 0
            if(index != -1 && !bPrio[index]){
                bPrio[index] = true
                const name = priorites[index]
                database.ref("users/" + utilisateur + "/priorites/" + name).set(0)
                if(divPrio.childElementCount == 0){
                    divPrio.innerHTML = ""
                }
                addButPrio(name)
            }
            

        });
        function addButPrio(name){
            let prio = document.createElement("button")
            prio.innerHTML = name
            prio.className = "priorites"
            prio.addEventListener("click", function() {
                database.ref("users/" + utilisateur + "/priorites/" + name).remove()
                prio.parentNode.removeChild(prio);
                bPrio[priorites.indexOf(name)] = false
                if(divPrio.childElementCount == 0){
                    divPrio.innerHTML = "aucune priorités"
                }
            });
            divPrio.appendChild(prio);
        }
    }
    
    },100);
    
})
    
    


let charge = 1
function charged(){
    if(charge < 7){
        charge++
        return
    }
    console.log("charged")

}