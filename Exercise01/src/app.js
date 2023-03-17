
let loading = document.getElementById('loading');
loading.hidden = true;
   function loadActivity(){
     loading.hidden = false;
    let toLoad = document.getElementById('toLoad');
    let load = document.getElementById('load');
    let display = document.getElementById('display');
    toLoad.hidden = false;
    load.hidden = true;
    fetch('https://www.boredapi.com/api/activity')    
    .then(async (response) =>{
    toLoad.hidden = true;
    load.hidden = false;
    let data = await response.json();
    load.innerHTML = `
     <h4>${data["activity"]}</h4>
        <div class="title">
            <div class="edit">
                <i class="fa-solid fa-tag"></i>
                    <p>Type: ${data['type']}</p>
            </div>
            <div class="edit">
                <i class="fa-solid fa-users"></i>
                <p>Participants: ${data['participants']}</p>
            </div>
            <div class="edit">
             <i class="fa-solid fa-dollar-sign"></i>
                <p>Price: ${data['price']}$</p>
            </div>
             <div class="edit">
               <i class="fa-solid fa-link"></i>
                    <p>Link: <a href="${data['link']}">${data['link']}</a></p>
                    </div>
                </div>
         `
    });
    }