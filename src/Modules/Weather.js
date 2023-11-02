// Import the necessary functions from the date-fns library for date formatting.
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Create a Weather class to manage weather data and interactions
class Weather {
    constructor() {
        this._weatherData = null;
    }

    // Getter for weather data
    get weatherData() {
        return this._weatherData;
    }

    // Setter for weather data
    set weatherData(newWeatherData) {
        this._weatherData = newWeatherData;
    }

    // Fetch current weather data for a specified location
    fetchCurrentWeatherData = async (location) => {
        try {
            const response = await fetch(
                 `http://api.weatherapi.com/v1/current.json?key=58979825eb394eb088b103404231410&q=${location}&aqi=no`
            );

            if (response.status === 200) {
                this._weatherData = await response.json();
                console.log(this._weatherData); // You may want to do something with the data here
            } else if (response.status === 400) {
                console.log("Location not found");
                alert("Location not found, Try Again");
            } else {
                console.log("Unexpected response:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

     // Other methods for retrieving weather-related information

    // Get temperature in Celsius
    getCelsiusTemp = () => {
        if (this._weatherData) {
            return this._weatherData.current.temp_c;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get temperature in Fahrenheit
    getFahrenheitTemp = () => {
        if (this._weatherData) {
            return this._weatherData.current.temp_f;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get formatted location time
    getLocationTime = () => {
        if (this._weatherData) {
            const locationDateTimeStr = this._weatherData.location.localtime;
            const locationDateTime = new Date(locationDateTimeStr);
            const formattedDate = format(locationDateTime, "eeee d MMMM y | HH:mm", { locale: enUS });
            return formattedDate;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get formatted location name
    getLocationName = () => {
        if (this._weatherData) {
            const cityName = this._weatherData.location.name;
            const countryName = this._weatherData.location.country;
            return `${cityName}, ${countryName}`;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get current weather condition
    getLocationCondition = () => {
        if (this._weatherData) {
            return this._weatherData.current.condition.text;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get URL for the weather condition logo
    getLocationConditionLogo = () => {
        if (this._weatherData) {
            return "https:" + this._weatherData.current.condition.icon;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get wind speed in MPH
    getWindMPH = () => {
        if (this._weatherData) {
            return this._weatherData.current.wind_mph;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get precipitation in mm
    getPrecipMM = () => {
        if (this._weatherData) {
            return this._weatherData.current.precip_mm;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get humidity percentage
    getHumidity = () => {
        if (this._weatherData) {
            return this._weatherData.current.humidity;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get cloud coverage percentage
    getCloud = () => {
        if (this._weatherData) {
            return this._weatherData.current.cloud;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get feels-like temperature in Celsius
    getFeelsLikeC = () => {
        if (this._weatherData) {
            return this._weatherData.current.feelslike_c;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get feels-like temperature in Fahrenheit
    getFeelsLikeF = () => {
        if (this._weatherData) {
            return this._weatherData.current.feelslike_f;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get visibility in kilometers
    getVisibilityKM = () => {
        if (this._weatherData) {
            return this._weatherData.current.vis_km;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get UV index
    getUV = () => {
        if (this._weatherData) {
            return this._weatherData.current.uv;
        } else {
            console.error("Weather data not available.");
        }
    };

    // Get Code for the Current Weather Condition
    getConditionCode = () =>{
        if (this._weatherData) {
            return this._weatherData.current.condition.code;
        } else {
            console.error("Weather data not available.");
        }
    }

    // return true if it is day
    isDay = () =>{
        if(this._weatherData.current.is_day == 1){
            return true;
        }

        return false;
        
    }

    // Get the codes for Rainy Weather Condition
    getRainyConditionsCodes = () => {
        return [
            1180, 1183, 1186, 1189, 1192, 1195
        ];
    }
    
    // Get the codes for Cloudy Weather Condition
    getCloudyConditionsCodes = () => {
        return [
            1003, 1006, 1009
        ];
    }
    
    // Get the codes for Sunny Weather Condition
    getSunnyConditionCodes = () => {
        return [
            1000
        ];
    }
    
}

// Export an instance of the Weather class
export default new Weather;
