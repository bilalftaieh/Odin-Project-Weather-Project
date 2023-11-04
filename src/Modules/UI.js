import Weather from "./Weather";
import { format, parseISO } from "date-fns";

class UI {
    constructor() {
        // Initialize DOM elements
        this._bodyElement = document.querySelector("body");
        this._inputElement = document.querySelector("#location-search");
        this._searchButton = document.querySelector("#search-button");
        this._celsiusButton = document.querySelector("#celsius-button");
        this._fahrenheitButton = document.querySelector("#fahrenheit-button");
        this._locationNameHeader = document.querySelector("#location-name");
        this._locationCurrentDateParagraph = document.querySelector("#location-current-date");
        this._locationConditionParagraph = document.querySelector("#location-condition");
        this._locactionConditionLogo = document.querySelector("#condition-logo");
        this._tempValueSpan = document.querySelector("#temp-value");
        this._feelsLikeSpan = document.querySelector("#feels-like");
        this._windMphSpan = document.querySelector("#wind_mph");
        this._precipMmSpan = document.querySelector("#precip_mm");
        this._humiditySpan = document.querySelector("#humidity");
        this._cloudSpan = document.querySelector("#cloud");
        this._visKmSpan = document.querySelector("#vis_km");
        this._uvSpan = document.querySelector("#uv");
        this._selectedDegree = 'celsius';

    }

    // Initialize the user interface and event listeners
    startUI() {
        Weather.fetchCurrentWeatherData("New York").then(() => {
            this.displayToUi();
        });

        // Event listener for the search button
        this._searchButton.addEventListener('click', (e) => {
            const enteredLocation = this._inputElement.value;
            Weather.fetchCurrentWeatherData(enteredLocation).then(() => {
                this.displayToUi();
            });

            this._inputElement.value = '';
            e.preventDefault();
        });

        // Event listeners for unit conversion buttons (Celsius and Fahrenheit)
        this._celsiusButton.addEventListener("click", () => {
            this.toggleTemperatureUnit('celsius');
        });

        this._fahrenheitButton.addEventListener("click", () => {
            this.toggleTemperatureUnit('fahrenheit');
        });
    }

    // Display weather information to the UI
    displayToUi() {
        this.updateCommonElements();
        this.changeBackgroundColor();
        this.changeSearchButtonColor();
        this.changeTempButtonColor();
        this.displayThreeDayForecast();
        this.displayTemperature();
    }

    // Change the background color of the webpage based on weather conditions
    changeBackgroundColor() {
        const isDay = Weather.isDay();
        const bodyElement = this._bodyElement;
        const currentConditionCode = Weather.getConditionCode();
        const rainyConditionsCodes = Weather.getRainyConditionsCodes();
        const cloudyConditionsCodes = Weather.getCloudyConditionsCodes();

        bodyElement.className = '';

        if (isDay) {
            bodyElement.classList.add('day-bg');

            if (cloudyConditionsCodes.includes(currentConditionCode)) {
                bodyElement.classList.add('cloudy');
            } else if (rainyConditionsCodes.includes(currentConditionCode)) {
                bodyElement.classList.add('rainy');
            }
        } else {
            bodyElement.classList.add('night-bg');
        }
    }

    // Change the color of the search button based on the time of day
    changeSearchButtonColor() {
        const isDay = Weather.isDay();

        if (isDay) {
            this._searchButton.classList.remove('night');
            this._searchButton.classList.add('day');
        } else {
            this._searchButton.classList.remove('day');
            this._searchButton.classList.add('night');
        }
    }

    // Change the color of the temperature unit buttons (Celsius and Fahrenheit) based on the time of day
    changeTempButtonColor() {
        const isDay = Weather.isDay();

        if (isDay) {
            this._celsiusButton.classList.remove('night');
            this._celsiusButton.classList.add('day');
            this._fahrenheitButton.classList.remove('night');
            this._fahrenheitButton.classList.add('day');
        } else {
            this._celsiusButton.classList.remove('day');
            this._celsiusButton.classList.add('night');
            this._fahrenheitButton.classList.remove('day');
            this._fahrenheitButton.classList.add('night');
        }
    }

    // Display a three-day weather forecast in the UI
    displayThreeDayForecast() {
        const gridTableRows = document.querySelectorAll('.grid-table-row');
        const forecastArray = Weather.getForecastDayArray();

        gridTableRows.forEach((row, index) => {
            if (index == 0) {
                return;
            }

            const forecastObject = forecastArray[index - 1];
            const date = parseISO(forecastObject.date);
            const dayName = format(date, 'eeee');
            row.querySelector('.date-column').textContent = dayName;
            row.querySelector('.condition-column').textContent = forecastObject.day.condition.text;
            row.querySelector('.chance-rain-column .chance-rain-value').textContent = forecastObject.day.daily_chance_of_rain;
        });
    }

    // Configure temperature display in the UI
    configureTemperature(tempValue, feelsLikeValue, unit) {
        const tempHeaderElement = document.getElementById("temp-header");
        tempHeaderElement.innerHTML = `<span id="temp-value">${tempValue}</span> ${unit}`;

        const locationFeelsLikeElement = document.getElementById("location-condition-feelslike");
        locationFeelsLikeElement.innerHTML = `Feels Like : <span id="feels-like">${feelsLikeValue}</span> ${unit}`;

        this.displayForecastTemperature(unit);
    }

    // Change the temperature display in the three-day forecast
    displayForecastTemperature(unit) {
        const minTempColumns = document.querySelectorAll('.min-temp-column');
        const maxTempColumns = document.querySelectorAll('.max-temp-column');
        const forecastArray = Weather.getForecastDayArray();

        minTempColumns.forEach((column, index) => {
            const forecastObject = forecastArray[index];
            const temp = unit === '°F' ? Math.round(forecastObject.day.mintemp_f) : Math.round(forecastObject.day.mintemp_c);
            column.innerHTML = `<span class="min-temp-value">${temp}</span> ${unit}`;
        });

        maxTempColumns.forEach((column, index) => {
            const forecastObject = forecastArray[index];
            const temp = unit === '°F' ? Math.round(forecastObject.day.maxtemp_f) : Math.round(forecastObject.day.maxtemp_c);
            column.innerHTML = `<span class="min-temp-value">${temp}</span> ${unit}`;
        });
    }

    // Display temperature in the UI
    displayTemperature() {
        if (this._selectedDegree !== 'celsius') {
            this.configureTemperature(Weather.getFahrenheitTemp(), Weather.getFeelsLikeF(), '°F');
        } else {
            this.configureTemperature(Weather.getCelsiusTemp(), Weather.getFeelsLikeC(), '°C');
        }
    }

    // Update common weather elements in the UI
    updateCommonElements() {
        this._locationNameHeader.textContent = Weather.getLocationName();
        this._locationCurrentDateParagraph.textContent = Weather.getLocationTime();
        this._locationConditionParagraph.textContent = Weather.getLocationCondition();
        this._locactionConditionLogo.src = Weather.getLocationConditionLogo();
        this._windMphSpan.textContent = Weather.getWindMPH();
        this._precipMmSpan.textContent = Weather.getPrecipMM();
        this._humiditySpan.textContent = Weather.getHumidity();
        this._cloudSpan.textContent = Weather.getCloud();
        this._visKmSpan.textContent = Weather.getVisibilityKM();
        this._uvSpan.textContent = Weather.getUV();
    }

    // Toggle between Celsius and Fahrenheit temperature units
    toggleTemperatureUnit(unit) {
        this._celsiusButton.blur();
        this._fahrenheitButton.blur();

        if (unit === 'celsius') {
            this._selectedDegree = 'celsius';
            this.displayTemperature();
            this._celsiusButton.style.border = "2px solid white";
            this._fahrenheitButton.style.border = "none";
        } else {
            this._selectedDegree = 'fahrenheit';
            this.displayTemperature();
            this._celsiusButton.style.border = "none";
            this._fahrenheitButton.style.border = "2px solid white";
        }
    }
}

export default new UI;

