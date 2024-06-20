// Variables
const APIKey = "ee0f05e96c33243a6586d6b864f507ae";
let city;
const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

// Functions
function search() {
    city = document.getElementById("search-city").value;
    const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

            // Now fetch forecast data using the latitude and longitude
            fetch(forecastURL)
                .then(response => response.json())
                .then(forecastData => {
                    // Process forecastData as needed
                    console.log(forecastData);
                })
                .catch(error => {
                    console.error('Error fetching forecast data:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}

// Event Listeners

document.getElementById("btn-search").addEventListener("click", search);