const home = document.getElementById("guess-home");
const name = document.getElementById("name");
const loading=document.getElementById("loading");
loading.style.visibility="hidden";
function guestHome() {
    if(noData()) return;
    home.innerHTML="";
    loading.style.visibility="visible";
    fetch(`https://api.nationalize.io/?name=${name.value}`).then(async (res) => {

        let data = await res.json();
      
        let obj=data.country; 

        if(nullCountry(obj)) return;
        home.innerHTML="";
        for(let n of obj){
            home.innerHTML+=`<div>
            <div>${n.country_id}</div>    
            <div>${(n.probability*100).toFixed(2)}%</div>    
            </div>`
        }

    }).then(()=>{
        loading.style.visibility="hidden"
    }).catch(()=>{
        home.innerHTML=` <div>
        <div class="center">
        <div class="noData ">Null</div>
        </div>
        </div>`
        loading.style.visibility="hidden"
    })

}

function noData(){
    if(name.value==""){
        home.innerHTML=` <div>
        <div class="center">
        <div class="noData ">Null</div>
        </div>
        </div>`
        return true;
    }
    return false;
}

function nullCountry(obj){
    if(obj==undefined) return false;
    if(obj.length==0){
        home.innerHTML=` <div>
        <div class="center">
        <div class="noData">X</div>
        </div>
        </div>`
        return true;
    }
    return false;
}