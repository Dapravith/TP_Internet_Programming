let display = document.getElementById('display');
        display.hidden = true;
        function fetchData() {
            display.hidden = false;
            display.style.background = "aliceblue";
            display.style.border = "1px solid black";
            let loading = document.getElementById('loading');
            let listing = document.getElementById('listing');
            
            loading.hidden = false;
            listing.hidden = true;
            let countrySelect = document.getElementById('country');
            console.log(countrySelect.value);

            fetch(`http://universities.hipolabs.com/search?country=${countrySelect.value}`)
                .then(async(result) => {
                    let show = document.getElementById('show');
                    loading.hidden = true;
                    listing.hidden = false;
                    display.style.background = "white";
                    display.style.border = "none";

                    let data = await result.json();

                    // display each data by its index
                    for(let x of data) {
                         console.log(x.domains);
                        show.innerHTML += `
                            <div class="university">
                                <span>${x.name}</span>
                                <br>
                                <span>{${x.country} - ${x.apha_two_code}}</span>
                                <br>
                                <div class="link">
                                    <i class="fa-solid fa-earth-americas"></i>
                                    <a href="${x.web_pages[0]}">
                                        ${x.web_pages[0]}
                                    </a>
                                </div>
                            </div>
                        
                        `;
                    }
                    console.log(data[0].domains);
                })
                .catch((error) => {

                    loading.hidden = true;
                    listing.hidden = true;

                    console.log("Error: "+error);
                })
        }