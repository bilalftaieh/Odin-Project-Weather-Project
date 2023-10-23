// When the web page is fully loaded and its structure is ready, do the following:

// Import the UI module, which contains the logic for our application's user interface.
import UI from './Modules/UI'

// Set up an event listener for the "DOMContentLoaded" event, indicating that the page is ready.
document.addEventListener("DOMContentLoaded", () => {
    
    // Start the user interface of our application by calling the startUI() function from the UI module.
    UI.startUI();
});
