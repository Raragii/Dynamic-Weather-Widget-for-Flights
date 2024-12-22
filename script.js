const apiKey = '9b89c602c6170648eec34b5f319912cb';
const weatherWidget = document.querySelector('.weather-widget');
const locationInput = document.querySelector('#location-input');
const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const forecast = data.weather[0].main;

    weatherWidget.innerHTML = `
        <h2>${location}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Forecast: ${forecast}</p>
    `;
});