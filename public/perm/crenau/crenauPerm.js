const menu = "../../menu/menu.html"

let j = sessionStorage.getItem("j");
let h = parseInt(sessionStorage.getItem("h"));
console.log(pathPerm(j,h));


let divMode = document.getElementById("mode")
for(let i in listModePerm){
    let opt = document.createElement("option")
    opt.innerHTML = listModePerm[i]
    divMode.appendChild(opt);
}

database.ref(pathPerm(j,h) + "/ouvert").once('value').then(function(snapshot) {
    
    divMode.selectedIndex = snapshot.val();
    divMode.addEventListener("change", function() {
        database.ref(pathPerm(j,h) + "/ouvert").set(this.selectedIndex)
      });
});




let divGroupes = document.getElementById("groupes")

let cbGroupes = []
let groupes = []
let iG = 0
database.ref("priorites").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
        const index = iG;
        groupes.push(child.key)
        let gr = document.createElement("p")
        cbGroupes[index] = document.createElement("input")
        cbGroupes[index].type = "checkbox"
        cbGroupes[index].addEventListener("click", function() {
            if(cbGroupes[index].checked){
                addPrio(j,h,groupes[index])
            }else{
                delPrio(j,h,groupes[index])
            }
           
        })
        //cbClasses[n][i].checked = true
        gr.innerHTML = groupes[index]
        gr.appendChild(cbGroupes[index]);
        divGroupes.appendChild(gr);
        iG++;
    })

})

let divClasses = document.getElementById("classes")
let cbClasses = []
console.log(listNiveau)
for(let n in listNiveau){
    cbClasses[n] = []
    let divNiveau = document.createElement("div")
    divNiveau.style="display: inline-block;*display: inline;width:20%"

    let nSelectAll = document.createElement("button")
    nSelectAll.className = "bTriNiveau"
    nSelectAll.innerHTML ="selectionner tous les " + nomNiveau[n]
    nSelectAll.addEventListener("click", function() {
        console.log("niveau " + n + " select all")
        for(i in cbClasses[n]){
            cbClasses[n][i].checked = true
            addPrio(j,h,listNiveau[n][i])
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
            delPrio(j,h,listNiveau[n][i])
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
            if(cbClasses[n][i].checked){
                addPrio(j,h,listNiveau[n][i])
            }else{
                delPrio(j,h,listNiveau[n][i])
            }
        }
        
    });
    divNiveau.appendChild(nInversed);



    for(let i in listNiveau[n]){
        let opt = document.createElement("p")
        cbClasses[n][i] = document.createElement("input")
        cbClasses[n][i].type = "checkbox"
        //cbClasses[n][i].checked = true
        opt.innerHTML = listNiveau[n][i]
        opt.appendChild(cbClasses[n][i]);
        cbClasses[n][i].addEventListener("click", function() {
            if(cbClasses[n][i].checked){
                addPrio(j,h,listNiveau[n][i])
            }else{
                delPrio(j,h,listNiveau[n][i])
            }
           
        })
        divNiveau.appendChild(opt);
    }
    divClasses.appendChild(divNiveau);
    
}

//let prio = []
database.ref(pathPerm(j,h) + "/classes").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
        let c = child.key
        console.log(c)
        //prio.push(c)
        let index = indexOf2dArray(listNiveau,c)
        let index2 = groupes.indexOf(c)
        console.log("index prio : " + index)
        if(index != -1){
            cbClasses[index[0]][index[1]].checked = true
        }else if(index2 != -1){
            cbGroupes[index2].checked = true
        }
    })
})

document.getElementById("select all").addEventListener("click", function() {
    console.log("select all")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            cbClasses[n][i].checked = true
            addPrio(j,h,listNiveau[n][i])
        }
    }
});

document.getElementById("select none").addEventListener("click", function() {
    console.log("select none")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            cbClasses[n][i].checked = false
            delPrio(j,h,listNiveau[n][i])
        }
    }
});

document.getElementById("inversed").addEventListener("click", function() {
    console.log("inversed")
    for(let n in cbClasses){
        for(let i in cbClasses[n]){
            cbClasses[n][i].checked = !cbClasses[n][i].checked
            if(cbClasses[n][i].checked){
                addPrio(j,h,listNiveau[n][i])
            }else{
                delPrio(j,h,listNiveau[n][i])
            }
        }
    }
});


function addPrio(j,h,name){
    database.ref(pathPerm(j,h) + "/classes/" + name).set(0)
}

function delPrio(j,h,name){
    database.ref(pathPerm(j,h) + "/classes/" + name).remove()
}