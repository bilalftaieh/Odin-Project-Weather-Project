# Odin-Project-Weather-Project
A Weather Website Project from The Odin Project

This Weather Project is a website that provides real-time weather information for cities around the world. It fetches accurate weather data from the WeatherAPI (https://www.weatherapi.com/) and presents it in an easy-to-read format on the UI.

Users can search for weather information for their desired city. However, it's important to enter the correct city name, as the system validates the input. If the city name is incorrect, the user will receive an alert to try again, ensuring that the data displayed is accurate.

The website allows users to customize their temperature preference by switching between Celsius and Fahrenheit. The temperature unit toggle can be found in the top right corner of the website.

Additional details about the city's temperature, including conditions such as wind speed, precipitation, humidity, cloud cover, visibility, and UV index, are displayed at the bottom of the page. This allows users to gain deeper insights into the current weather conditions in their chosen location.

This project uses Webpack to bundle JavaScript modules, including Weather.js, UI.js, and index.js (entry), into main.js (output). Webpack enables efficient module bundling and asset management, enhancing the performance and organization of the project.