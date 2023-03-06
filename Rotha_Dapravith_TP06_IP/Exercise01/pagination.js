const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
const content = document.getElementsByClassName("content")[0];
const pageNumber = document.getElementById("page-Number");

let pageNum = 0

let loading = false;
const loader=document.getElementById("loader");


function fetAPI() {
    loader.style.display="flex"
    return new Promise((resolve, reject) => {
        loading=true;
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNum}&size=25`).then(async (res) => {
            const data = await res.json();
            loading=false;
            loader.style.display="none"
            pageNumber.innerHTML=pageNum;
            pageNum++;
            resolve(data);
        })
    })
}

contentWrapper.addEventListener("scroll", () => {
    
    if (contentWrapper.scrollTop + contentWrapper.clientHeight >= (contentWrapper.scrollHeight * 0.95)) {
        if (!loading){
            onFetch();
        }
    }
})
onFetch();

function onFetch() {
    fetAPI().then((res) => {
        const data = res.data
        for (let c of data) {
            content.innerHTML += `
            <div>
                <p><img style="height: 1.3rem;" src="./airplane.png">: ${c.name}</p>
                <p>🙂:${c.airline[0].country}</p>
            </div>
          `
        }
    })
}