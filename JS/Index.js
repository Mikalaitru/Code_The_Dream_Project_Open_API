document.addEventListener("DOMContentLoaded", () => {
    const currentWeatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=37.3229&longitude=-122.0322&current_weather=true";
    const forecastUrl = "https://api.open-meteo.com/v1/forecast?latitude=37.3229&longitude=-122.0322&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

    const weatherContainer = document.getElementById("weather-container");
    const forecastButton = document.getElementById("forecast-btn");
    const forecastContainer = document.createElement("div"); 
    forecastContainer.id = "forecast-container";
    weatherContainer.appendChild(forecastContainer);

    function fetchCurrentWeather() {
        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                const weather = data.current_weather;
                weatherContainer.innerHTML = `
                    <div class="weather-card">
                        <h2>Current Weather in Cupertino, CA</h2>
                        <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
                        <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
                        <p><strong>Condition:</strong> ${getWeatherIcon(weather.weathercode)} ${weather.weathercode}</p>
                    </div>
                `;
                weatherContainer.appendChild(forecastContainer);
            })
            .catch(error => console.error("Error fetching current weather:", error));
    }

    function fetchForecast() {
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                const daily = data.daily;
                let forecastHTML = `<div class="weather-card"><h2>7-Day Forecast</h2><ul>`;

                for (let i = 0; i < daily.time.length; i++) {
                    forecastHTML += `
                        <li><strong>${daily.time[i]}</strong>: 
                            Max: ${daily.temperature_2m_max[i]}°C, 
                            Min: ${daily.temperature_2m_min[i]}°C
                        </li>`;
                }

                forecastHTML += `</ul></div>`;
                forecastContainer.innerHTML = forecastHTML;
            })
            .catch(error => console.error("Error fetching forecast:", error));
    }

    function getWeatherIcon(code) {
        const icons = {
            0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️", 
            51: "🌦️", 53: "🌦️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️"
        };
        return icons[code] || "❓";
    }

    fetchCurrentWeather();
    forecastButton.addEventListener("click", fetchForecast);
});