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
            temperature = str.data[0].temp;
            sunRise = str.data[0].sunrise;
            sunSet = str.data[0].sunset;
            visualisation = str.data[0].weather.icon,
            description = str.data[0].weather.description,
            windSpeed = str.data[0].wind_spd;
            
            output.innerHTML = `
                <div>
                    <span class="output__name">DESCRIPTION</span>
                    <span class="output__result">${description}</span>
                </div>
                <div>
                    <span class="output__name">TEMPERATURE</span>
                    <span class="output__result" id="temperatueResult">${temperature}°C</span>
                </div>
                <div>
                    <span class="output__name">SUNRISE</span>
                    <span class="output__result">${sunRise}</span>
                </div>
                <div>
                    <span class="output__name">SUNSET</span>
                    <span class="output__result">${sunSet}</span>
                </div>
                <div>
                    <span class="output__name">WIND SPEED</span>
                    <span class="output__result">${windSpeed.toFixed(2)}m/s</span>
                </div>
                <div>
                    <span class="output__name">VISUALISATION</span>
                    <img src="${visualisation}.png" alt"${visualisation}" >
                </div>
            `;

            if(temperature <= 20) {
                document.getElementById('temperatueResult').classList.add('cold');
            } else if (temperature >= 29)  {
                document.getElementById('temperatueResult').classList.add('hot');
            }
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