
// Variables
const APIKey = "ee0f05e96c33243a6586d6b864f507ae";
let city;
const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
const mainWeather = document.querySelector('.main-card')
// Functions
function search() {

    city = (document.getElementById("search-city").value) || 'New York';
    const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const todayDate = new Date(data.dt * 1000).toLocaleDateString()
            const code = data.weather[0].icon
            const url = `https://openweathermap.org/img/wn/${code}.png`
            console.log(todayDate);
            const weatherCard = `
            <div class="card-body">
                  <h5 class="card-title">${data.name} ${todayDate}</h5>
                  <img src="${url}"/> 
                  <p class="card-text">Temperature: ${data.main.temp}F</p>
                  <p class="card-text">Wind: ${data.wind.speed}mph</p>
                  <p class="card-text">Humidity: ${data.main.humidity}%</p>
                </div>
            `;
            mainWeather.innerHTML = weatherCard
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
// search.preventDefault();