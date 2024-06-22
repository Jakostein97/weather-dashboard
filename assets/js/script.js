
// Variables
const APIKey = "ee0f05e96c33243a6586d6b864f507ae";
const mainWeather = document.querySelector('.main-card');
const forecastContainer = document.querySelector('.forecast-container');

function search() {
    let city = document.getElementById("search-city").value || 'New York';
    const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}

function displayCurrentWeather(data) {
    const todayDate = new Date(data.dt * 1000).toLocaleDateString();
    const code = data.weather[0].icon;
    const url = `https://openweathermap.org/img/wn/${code}.png`;

    const weatherCard = `
        <div class="card-body">
            <h5 class="card-title">${data.name} ${todayDate}</h5>
            <img src="${url}" alt="weather icon"/> 
            <p class="card-text">Temperature: ${data.main.temp}°F</p>
            <p class="card-text">Wind: ${data.wind.speed} mph</p>
            <p class="card-text">Humidity: ${data.main.humidity}%</p>
        </div>
    `;
    mainWeather.innerHTML = weatherCard;
}

function fetchForecast(lat, lon) {
    const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

    fetch(forecastURL)
        .then(response => response.json())
        .then(forecastData => {
            displayForecast(forecastData.list);
            saveSearches();
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayForecast(forecastList) {
    const fiveDayForecast = forecastList.filter(day => day.dt_txt.includes('12:00:00'));
    let dayCard = "";

    fiveDayForecast.forEach(day => {
        const forecastDate = new Date(day.dt * 1000).toLocaleDateString();
        const iconCode = day.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        dayCard += `
            <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${forecastDate}</h5>
                        <img src="${iconURL}" alt="weather icon"/>
                        <p class="card-text">Temperature: ${day.main.temp}°F</p>
                        <p class="card-text">Wind: ${day.wind.speed} mph</p>
                        <p class="card-text">Humidity: ${day.main.humidity}%</p>
                    </div>
                </div>
            </div>
        `;
    });

    forecastContainer.innerHTML = dayCard;
}

function saveSearches() {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const previousSearch = document.getElementById("search-city").value || 'New York';
    if (!searchHistory.includes(previousSearch)) {
        searchHistory.push(previousSearch);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
    displaySearchButtons(searchHistory);
}

function displaySearchButtons(searchHistory) {
    const searchHistoryContainer = document.getElementById('search-history-container');
    searchHistoryContainer.innerHTML = ''; // Clear the container first

    // Create a button for each city in the search history
    searchHistory.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.classList.add('btn', 'btn-secondary', 'm-1');
        button.addEventListener('click', () => {
            document.getElementById('search-city').value = city;
            search();
        });
        searchHistoryContainer.appendChild(button);
    });
}

document.getElementById("btn-search").addEventListener("click", search);
document.addEventListener("DOMContentLoaded", () => {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    displaySearchButtons(searchHistory);
    search();  // Initial search when the page loads
});
