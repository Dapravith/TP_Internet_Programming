const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const id = urlParams.get('bookid');
        let result = [];
        let output = '';
        
        fetch(`https://jsonplaceholder.typicode.com/photos/${id}`).then(async(res) => {
            result = await res.json();
            console.log(result)
            output += `<div class="container">` +
                `<div>${result.title}</div>` +
                `<div>${result.albumId}</div>` +
                `</div>` +
                `<div class="home">` +
                `<div>${result.id}</div>` +
                `<img src="${result.url}" alt="#">` +
                `</div>`

            document.getElementsByClassName('items')[0].innerHTML = output;
        });