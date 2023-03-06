const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
        const content = document.getElementsByClassName("content")[0];
        const pageNumber = document.getElementById("page-Number");

        let pageNum = localStorage.getItem("pageNumber") == null ? 0 : localStorage.getItem("pageNumber");
        pageNumber.innerHTML = pageNum;
        let loading = false;
        const loader = document.getElementById("loader");



        function fetAPI() {
            loader.style.display = "flex"
            return new Promise((resolve, reject) => {
                loading = true;
                fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNum}&size=25`).then(async (res) => {
                    const data = await res.json();
                    loading = false;
                    loader.style.display = "none"
                    resolve(data);
                })
            })
        }

        contentWrapper.addEventListener("scroll", () => {
            if (contentWrapper.scrollTop + contentWrapper.clientHeight >= (contentWrapper.scrollHeight * 0.95)) {
                if (!loading) {
                    onFetch();
                }
            }
        })


        if (pageNum == 0) onFetch()

        function onFetch() {
            fetAPI().then((res) => {
                const data = res.data

                let objString = [];
                for (let c of data) {
                    content.innerHTML += `
                    <div>
                        <p><img style="height: 1.3rem;" src="./airplane.png">: ${c.name}</p>
                        <p>🙂:${c.airline[0].country}</p>
                    </div>
                    `
                    const obj = { name: c.name, country: c.airline[0].country };
                    objString.push(obj);
                }
                localStorage.setItem(pageNum, JSON.stringify(objString));
                pageNum++;
                pageNumber.innerHTML = pageNum;
                localStorage.setItem("pageNumber", pageNum)
            })
        }

        fetchData_LocalStorage();
        function fetchData_LocalStorage() {
            for (let i in localStorage) {
                const a=localStorage.getItem(i);
                const b = JSON.parse(a);
                if (Symbol.iterator in Object(b)) {
                    const b = JSON.parse(a);
                    for (let c of b) {
                        content.innerHTML += `
                        <div>
                            <p><img style="height: 1.3rem;" src="./airplane.png">: ${c.name}</p>
                            <p>🙂:${c.country}</p>
                        </div>
                        `
                    }
                }
            }
        }