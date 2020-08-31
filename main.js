var apiKey = "1e8a4254149a4157b498a8276e74e875",
    cityInput = document.getElementById('city'),
    reqButton = document.getElementById('requestButton'),
    output = document.getElementById('output');


reqButton.addEventListener('click', () => {
    let city = cityInput.value,
        url    = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
    if(cityInput) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let str = JSON.stringify(data);
            str = JSON.parse(str);
            let temperature = str.data[0].temp;
            let visualisation = str.data[0].weather.icon;
            let description = str.data[0].weather.description;
            
            output.innerHTML = `
                <div class="output__top">
                    <span class="output__city">${city}</span>
                    <img class="output__image" src="${visualisation}.png" alt"${visualisation}" >
                </div>
                <div class="output__bottom">
                    <div class="tempSection">
                        <span class="output__temp">${temperature}</span>
                        <span class="tempUnit">°C</span>    
                    </div>
                    <span class="output__description">${description}</span>
                </div>
            `;

            let tempUnitSpan = document.querySelector('.tempUnit');
            let tempValue = document.querySelector('.output__temp');
            let tempSection = document.querySelector('.tempSection');

            tempSection.addEventListener('click', () => {

                if(tempUnitSpan.textContent === "°C") {
                    tempUnitSpan.textContent = "F";
                    tempValue.textContent = (temperature * 1.8 + 32).toFixed(2);
                } else {
                    tempUnitSpan.textContent = "°C";
                    tempValue.textContent = ((parseInt(tempValue.textContent) - 32) / 1.8).toFixed(2);
                }

            });
        })
        .catch(error => {
            let errorName = error.name,
                errorMsg  = error.message;
            console.log(`CATCH: ${errorName} ${errorMsg}`);
            output.textContent = "Something Went Wrong!";
        });
    } else {

        console.log("input empty!");

    }
})