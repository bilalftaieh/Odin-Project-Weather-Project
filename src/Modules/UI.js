// Import the Weather module to access weather data
import Weather from "./Weather";

// Create a UI class responsible for managing the user interface
class UI {
    constructor() {
        // Initialize UI elements by selecting them from the DOM

        this._bodyElement = document.querySelector("body");

        // Input element for location search
        this._inputElement = document.querySelector("#location-search");

        // Buttons for various actions
        this._searchButton = document.querySelector("#search-button");
        this._celsiusButton = document.querySelector("#celsius-button");
        this._fahrenheitButton = document.querySelector("#fahrenheit-button");

        // Elements to display weather information
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

        // Default temperature unit is Celsius
        this._selectedDegree = 'celsius';
    }

    // Display weather information to the UI
    displayToUi = () => {
        this.updateCommonElements();
        this.changeBackgroundColor();
        this.changeSearchButtonColor();
        this.changeTempButtonColor();

        // Check the selected temperature unit and display accordingly
        if (this._selectedDegree !== 'celsius') {
            this.displayTemperature(Weather.getFahrenheitTemp(), Weather.getFeelsLikeF(), '°F');
        } else {
            this.displayTemperature(Weather.getCelsiusTemp(), Weather.getFeelsLikeC(), '°C');
        }
    }

    // Changes the background color of the webpage based on the time of day and current weather conditions.
    changeBackgroundColor = () => {

        // Check if it's day or night based on the Weather class.
        const isDay = Weather.isDay();
        // Get a reference to the body element of the webpage.
        const bodyElement = this._bodyElement;
        // Get the current weather condition code from the Weather class.
        const currentConditionCode = Weather.getConditionCode();
        // Get arrays of condition codes for rainy and cloudy conditions from the Weather class.
        const rainyConditionsCodes = Weather.getRainyConditionsCodes();
        const cloudyConditionsCodes = Weather.getCloudyConditionsCodes();

        // Reset the class attribute of the body element.
        bodyElement.className = '';

        if (isDay) {
            // It's daytime, so set a daytime background color.
            bodyElement.classList.add('day-bg');

            // Check if the current weather condition is cloudy and update the background accordingly.
            if (cloudyConditionsCodes.includes(currentConditionCode)) {
                bodyElement.classList.add('cloudy');
            }
            // Check if the current weather condition is rainy and update the background accordingly.
            else if (rainyConditionsCodes.includes(currentConditionCode)) {
                bodyElement.classList.add('rainy');
            }
        } else {
            // It's nighttime, so set a nighttime background color.
            bodyElement.classList.add('night-bg');
        }
    }

    // Changes the color of the search button based on whether it's day or night.
    changeSearchButtonColor = () => {
        // Check if it's day or night based on the Weather class.
        const isDay = Weather.isDay();

        if (isDay) {
            // If it's daytime, update the search button to a daytime style.
            this._searchButton.classList.remove('night');
            this._searchButton.classList.add('day');
        } else {
            // If it's nighttime, update the search button to a nighttime style.
            this._searchButton.classList.remove('day');
            this._searchButton.classList.add('night');
        }
    }

    // Changes the color of the temperature unit buttons (Celsius and Fahrenheit) based on whether it's day or night.
    changeTempButtonColor = () => {
        // Check if it's day or night based on the Weather class.
        const isDay = Weather.isDay();

        if (isDay) {
            // If it's daytime, update the temperature unit buttons to a daytime style.
            this._celsiusButton.classList.remove('night');
            this._celsiusButton.classList.add('day');
            this._fahrenheitButton.classList.remove('night');
            this._fahrenheitButton.classList.add('day');
        } else {
            // If it's nighttime, update the temperature unit buttons to a nighttime style.
            this._celsiusButton.classList.remove('day');
            this._celsiusButton.classList.add('night');
            this._fahrenheitButton.classList.remove('day');
            this._fahrenheitButton.classList.add('night');
        }
}

    // Display the temperature in the UI
    displayTemperature(tempValue, feelsLikeValue, unit) {
        const tempHeaderElement = document.getElementById("temp-header");
        tempHeaderElement.innerHTML = `<span id="temp-value">${tempValue}</span> ${unit}`;

        const locationFeelsLikeElement = document.getElementById("location-condition-feelslike");
        locationFeelsLikeElement.innerHTML = `Feels Like : <span id="feels-like">${feelsLikeValue}</span> ${unit}`;
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

    // Initialize the UI and set up event listeners
    startUI = () => {
        // Fetch weather data for New York as the initial location
        Weather.fetchCurrentWeatherData("New York").then(() => {
            this.displayToUi();
        });

        // Add an event listener for the search button
        this._searchButton.addEventListener('click', (e) => {
            const enteredLocation = this._inputElement.value;

            // Fetch weather data for the entered location
            Weather.fetchCurrentWeatherData(enteredLocation).then(() => {
                this.displayToUi();
            });

            // Clear the input field and prevent form submission
            this._inputElement.value = '';
            e.preventDefault();
        });

        // Add event listeners for unit conversion buttons (Celsius and Fahrenheit)
        this._celsiusButton.addEventListener("click", () => {
            this.toggleTemperatureUnit('celsius');
        });

        this._fahrenheitButton.addEventListener("click", () => {
            this.toggleTemperatureUnit('fahrenheit');
        });
    }

    // Toggle between Celsius and Fahrenheit temperature units
    toggleTemperatureUnit(unit) {
        // Remove focus from any previously focused button
        this._celsiusButton.blur();
        this._fahrenheitButton.blur();

        // Update the selected temperature unit and update the UI
        if (unit === 'celsius') {
            this._selectedDegree = 'celsius';
            this.displayToUi();
            this._celsiusButton.style.border = "2px solid white";
            this._fahrenheitButton.style.border = "none";
        } else {
            this._selectedDegree = 'fahrenheit';
            this.displayToUi();
            this._celsiusButton.style.border = "none";
            this._fahrenheitButton.style.border = "2px solid white";
        }
    }
}

// Export an instance of the UI class
export default new UI;
