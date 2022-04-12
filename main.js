//variables
const results = document.querySelector("#results");
let apiKey = document.querySelector("#api-key");
let address = document.querySelector("#address");
let satellite = document.querySelector("#norad");
let search = document.querySelector("#search");
let latitude = 0
let longditude = 0

// pk.eyJ1IjoibG5zYW5jaGV6MTY3IiwiYSI6ImNsMXV5MGl5djAxNjEzY3BmY2ttc2h5cTMifQ.ujvFfsbxeu4KpvBkOC3H_Q

//event listener for Search button

search.addEventListener('click', function() {
    fetch(encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${apiKey.value}`))
    .then(function (httpResponse){
        return httpResponse.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.features[0].center[1] +","+ data.features[0].center[0]) //latitude, longditude
        latitude = data.features[0].center[1];
        longditude = data.features[0].center[0];

        fetch(`https://satellites.fly.dev/passes/${satellite.value}?lat=-${latitude}&lon=${longditude}&limit=1&days=15&visible_only=true`)
            .then(function (httpResponse){
            return httpResponse.json();
             })
            .then(function(data) {
                console.log(data);
                let culminationUtc = data[0].culmination.utc_datetime
                let culminationNew = new Date(culminationUtc);
                console.log(culminationNew);
                let riseUtc = data[0].rise.utc_datetime
                let riseNew = new Date(riseUtc);
                console.log(riseNew);
                let setUtc = data[0].set.utc_datetime
                let setNew = new Date(setUtc);
                console.log(setNew);

                const rise = document.createElement("div");
                rise.className = "row";

                const culmination = document.createElement("div");
                culmination.className = "row";
                
                const set = document.createElement("div");
                set.className = "row";

                results.appendChild(rise);
                results.appendChild(culmination);
                results.appendChild(set);

                rise.innerText =`Rise Date/Time: ${riseNew}`;

                culmination.innerText =`Culmination Date/Time: ${culminationNew}`;
                
                set.innerText = `Set Date/Time: ${setNew}`;





            })
            
    })


   
})