// Import the destinations array
import { destinations } from "../data/Destinations.js";

// Add a submit event listener to the form with id "addDestinationForm"
document.getElementById("addDestinationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear any previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.textContent = ""); // Clear each error message
    const globalErrors = document.getElementById("global-errors");
    globalErrors.textContent = ""; // Clear global error messages

    let errors = []; // Array to store validation errors

    // Get the values from the form fields and trim any extra whitespace
    const destinationCode = document.getElementById("destinationCode").value.trim().toUpperCase(); // Convert to uppercase
    const destinationName = document.getElementById("destinationName").value.trim();
    const airportName = document.getElementById("airportName").value.trim();
    const airportUrl = document.getElementById("airportUrl").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    // Validate destination code (must be at least 3 characters)
    if (!destinationCode || destinationCode.length < 3) {
        document.getElementById("error-destinationCode").textContent = "Destination code must be at least 3 characters.";
        errors.push("Destination code must be at least 3 characters.");
    }

    // Check for duplicate destination code
    const isDuplicateCode = destinations.some(destination => destination.code === destinationCode);
    if (isDuplicateCode) {
        document.getElementById("error-destinationCode").textContent = "Destination code already exists.";
        errors.push("Destination code already exists.");
    }

    // Validate destination name (must not be empty)
    if (!destinationName) {
        document.getElementById("error-destinationName").textContent = "Destination name is required.";
        errors.push("Destination name is required.");
    }

    // Validate airport name (must not be empty)
    if (!airportName) {
        document.getElementById("error-airportName").textContent = "Airport name is required.";
        errors.push("Airport name is required.");
    }

    // Validate airport URL (must be a valid URL format)
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!airportUrl || !urlPattern.test(airportUrl)) {
        document.getElementById("error-airportUrl").textContent = "Valid airport URL is required.";
        errors.push("Valid airport URL is required.");
    }

    // Validate image URL (must end with a valid image extension)
    const imagePattern = /\.(jpeg|jpg|png|gif|bmp)$/i;
    if (!imageUrl || !imagePattern.test(imageUrl)) {
        document.getElementById("error-imageUrl").textContent = "Valid image URL is required.";
        errors.push("Valid image URL is required.");
    }

    // If there are validation errors, display them in the global error container
    if (errors.length > 0) {
        globalErrors.textContent = "Please fix the errors and try again:\n" + errors.join("\n");
    } else {
        // If no errors, create an object to store destination details
        const destinationDetails = {
            destination: {
                destinationCode,
                destinationName,
                airportName,
                airportUrl,
                imageUrl,
            },
        };

        // Create a popup container to display the success message
        const popupContainer = document.createElement("div");
        popupContainer.id = "successPopup";
        popupContainer.className = "popup-container";

        // Add content to the popup container
        popupContainer.innerHTML = `
            <strong class="popup-title">The Destination Added Successfully!</strong>
            <p>Destination Details:</p>
            <ul class="popup-details">
                <li><strong>DestinationCode:</strong> ${destinationDetails.destination.destinationCode}</li>
                <li><strong>DestinationName:</strong> ${destinationDetails.destination.destinationName}</li>
                <li><strong>AirportName:</strong> ${destinationDetails.destination.airportName}</li>
                <li>
                <strong>Airport URL:</strong> 
                <a href="${destinationDetails.destination.airportUrl}" target="_blank" rel="noopener noreferrer">
                ${destinationDetails.destination.airportUrl}</a>
                </li>
                <li>
                <strong>Image URL:</strong> 
                <a href="${destinationDetails.destination.imageUrl}" target="_blank" rel="noopener noreferrer">
                ${destinationDetails.destination.imageUrl}</a>
                </li>
            </ul>
            <button id="closePopupButton" class="popup-button">Great!</button>
        `;

        // Add the popup container to the body of the document
        document.body.appendChild(popupContainer);

        // Add event listener to the "close" button inside the popup
        document.getElementById("closePopupButton").addEventListener("click", function () {
            document.body.removeChild(popupContainer); // Remove the popup
            window.location.href = "../ManageDestinations/ManageDestinations.html"; // Redirect to Manage Destinations page
        });

        // Reset the form fields
        this.reset();
    }
});

// Clear individual error messages when the user types into the input fields
function clearError(event) {
    const errorSpanId = `error-${event.target.id}`; // Find the corresponding error span ID
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
        errorSpan.textContent = ""; // Clear the error message
    }
}

// Add event listeners to all input fields to clear errors on input
const inputFields = document.querySelectorAll("#addDestinationForm input");
inputFields.forEach(field => {
    field.addEventListener("input", clearError);
});