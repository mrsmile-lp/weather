const apikey = "0abbe4d8cf57d38663be0e51ab005cd9";
const url = "https://api.openweathermap.org/data/2.5/";
const city = document.getElementById('cities');
const buttonGetWeather = document.getElementById('buttonGetWeather');
const content = document.getElementById('content');
let checked = "";

async function getWeather () {
    const typeWeather = document.getElementsByName('type_of_weather');
    if (typeWeather[0].checked) {
        checked = typeWeather[0].value;
    } else checked = typeWeather[1].value;
    const weather = await fetch(`${url}${checked}?q=${city.value},BY&appid=${apikey}`);
    const response = await weather.json();
    return response;
}

async function displayWeather() {
    const weatherData = await getWeather();
    if (checked == 'weather') {
        let temperature = +weatherData.main.temp - 273.15; //set to Celsius
        temperature = temperature.toFixed(1);
        let maxTemp = +weatherData.main.temp_max - 273.15;
        maxTemp = maxTemp.toFixed(1);
        let minTemp = +weatherData.main.temp_min - 273.15;
        minTemp = minTemp.toFixed(1);

        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;
        const iconURL = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

        /**Here is creating div which contains icon of weather and name of the city */
        const iconAndCity = document.createElement('div');
        iconAndCity.className = 'icon-and-city';
        const divIcon = document.createElement('div');
        const imgIcon = document.createElement('img');
        imgIcon.setAttribute('src', iconURL);
        divIcon.appendChild(imgIcon);
        const divCity = document.createElement('div');
        divCity.className = 'city-name';
        divCity.append(weatherData.name);
        iconAndCity.appendChild(divIcon);
        iconAndCity.appendChild(divCity);
        /**------------------------------ */

        /**Here is creating div which contains max - min temperature */
        const minMaxT = document.createElement('div');
        minMaxT.className = 'min-max-t';
        minMaxT.append(`Range of temperature (min - max): ${minTemp}, C° - ${maxTemp}, C°`);
        /**----------------------------- */

        /**Here is creating div which contains avg temperature, sunrise and sunset, description */
        const tempSunDescription = document.createElement('div');
        tempSunDescription.className = 'temp-sun-description';

        const divTemperature = document.createElement('div');
        divTemperature.className = 'temperature';
        divTemperature.append(`Temperature AVG: ${temperature}, C°`);

        const divsunriseSunset = document.createElement('div');
        divsunriseSunset.className = 'sunrise-sunset';

        const divSunrise = document.createElement('div');
        divSunrise.append(sunrise);
        const divSunset = document.createElement('div');
        divSunset.append(sunset);

        divsunriseSunset.appendChild(divSunrise);
        divsunriseSunset.appendChild(divSunset);

        const divDescription = document.createElement('div');
        divDescription.className = 'description';
        divDescription.append(weatherData.weather[0].description);

        tempSunDescription.appendChild(divTemperature);
        tempSunDescription.appendChild(divsunriseSunset);
        tempSunDescription.appendChild(divDescription);
        /**----------------------------- */

        content.appendChild(iconAndCity);
        content.appendChild(minMaxT);
        content.appendChild(tempSunDescription);
    }
}

buttonGetWeather.addEventListener('click', displayWeather);