// Import the Weather module to access weather data
import Weather from "./Weather";

// Create a UI class responsible for managing the user interface
class UI {
    constructor() {
        // Initialize UI elements by selecting them from the DOM

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

        // Check the selected temperature unit and display accordingly
        if (this._selectedDegree !== 'celsius') {
            this.displayTemperature(Weather.getFahrenheitTemp(), Weather.getFeelsLikeF(), '°F');
        } else {
            this.displayTemperature(Weather.getCelsiusTemp(), Weather.getFeelsLikeC(), '°C');
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
