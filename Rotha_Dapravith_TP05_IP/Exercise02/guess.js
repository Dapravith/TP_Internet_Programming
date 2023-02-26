let display = document.getElementById('display');
display.hidden = true;

function GenderGuessing(){
    let loading = document.getElementById('loading'); 
    let show = document.getElementById('show');   
    let name = document.getElementById('name');
    display.hidden = false;
    show.hidden = true;

    fetch(`https://api.genderize.io/?name=${name.value}`)
        .then( async(response)=>{
            loading.hidden = true;
            show.hidden = false;
            let data = await response.json();
            show.innerHTML = `
                <h1>${data["name"]}</h5>
                <h2><span>${data["gender"]}</span></h2>
                <p>${data["probability"]*100}%</p>
            `
        });
}