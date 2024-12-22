document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '7d65601e579647083bc7b969dc6f266b'; // Replace with your OpenWeatherMap API key

    // Function to fetch weather data for a city
    const fetchWeatherData = (city, element) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    console.log(data); // Log the API response for debugging
                    updateWeatherUI(data, element);
                } else {
                    alert('City not found.');
                }
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    };

    // Function to update the UI with weather data
    const updateWeatherUI = (data, element) => {
        const location = element.querySelector('#displayed-city');
        const temperature = element.querySelector('#current-temperature');
        const description = element.querySelector('#weather-status');
        const humidity = element.querySelector('#humidity');
        const wind = element.querySelector('#wind');
        const visibility = element.querySelector('#visibility');
        const icon = element.querySelector('#weather-icon');
        const timeElement = element.querySelector('#time');

        // Set Location
        location.textContent = `${data.name}, ${data.sys.country}`;

        // Set Temperature
        temperature.textContent = `${data.main.temp}°C`;

        // Set Description
        description.textContent = data.weather[0].description;

        // Set Humidity
        humidity.textContent = `${data.main.humidity}%`;

        // Set Wind Speed
        wind.textContent = `${data.wind.speed} m/s`;

        // Set Visibility
        visibility.textContent = `${data.visibility / 1000} km`;

        // Set Weather Icon
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Update Date and Time
        const cityTimezoneOffset = data.timezone; // Timezone offset in seconds
        updateTime(cityTimezoneOffset, timeElement);
    };

    // Function to update time display in the desired format
    const updateTime = (cityTimezoneOffset, timeElement) => {
        // Get the current time (UTC)
        const currentUtcDate = new Date();
        
        // Adjust for the city's timezone using the offset (seconds to milliseconds)
        const cityTime = new Date(currentUtcDate.getTime() + cityTimezoneOffset * 1000);

        // Format the time based on the city's timezone
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = cityTime.toLocaleDateString('en-US', options);
        const formattedTime = cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Set Time
        timeElement.textContent = `${formattedTime} | ${formattedDate}`;
    };

    // Handle search button click for both "From" and "To" destinations
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const city = input.value.trim();
            const destinationSection = button.closest(".destination");
            if (city) {
                fetchWeatherData(city, destinationSection);
            } else {
                alert('Please enter a city name.');
            }
        });
    });
});
