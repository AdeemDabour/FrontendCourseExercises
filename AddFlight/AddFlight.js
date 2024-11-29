// Importing the destinations data and the Flight class from external modules
import { destinations } from "../data/Destinations.js";
import { flights } from "../data/Flights.js"; // Importing the existing flights array
import { Flight } from "../classes/Flight.js";

// Log the destinations array to verify the data is being imported correctly
console.log(destinations);

// Function to populate select options
function populateSelectOptions(selectElement, options, defaultText) {
    // Add the default option
    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // Empty value for the default option
    defaultOption.textContent = defaultText; // Set the default text
    defaultOption.disabled = true; // Disable selection of the default option
    defaultOption.selected = true; // Make it selected by default
    selectElement.appendChild(defaultOption);

    // Add the destination options
    options.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination.name;
        option.textContent = `${destination.name} (${destination.code})`; // Display name and airport code
        selectElement.appendChild(option);
    });
}

// Function to format date to dd/mm/yyyy
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

// Populate origin and destination selects with default options
const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
populateSelectOptions(originSelect, destinations, "Select Origin");
populateSelectOptions(destinationSelect, destinations, "Select Destination");

// Add a submit event listener to the form
document.getElementById("addFlightForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => (msg.textContent = ""));
    const globalErrors = document.getElementById("global-errors");
    globalErrors.textContent = "";

    let errors = []; // Array to store errors

    // Retrieve form values
    const flightNo = document.getElementById("flightNo").value.trim();
    const origin = originSelect.value;
    const destination = destinationSelect.value;
    const boardingDate = document.getElementById("boardingDate").value;
    const boardingTime = document.getElementById("boardingTime").value;
    const arrivalDate = document.getElementById("arrivalDate").value;
    const arrivalTime = document.getElementById("arrivalTime").value;
    const seats = parseInt(document.getElementById("seats").value);

    // Validate flight number
    if (!flightNo) {
        document.getElementById("error-flightNo").textContent = "Flight number is required.";
        errors.push("Flight number is required.");
    } else {
        // Check for duplicate flight number
        const isDuplicateFlightNo = flights.some(flight => flight.flightNo === flightNo);
        if (isDuplicateFlightNo) {
            document.getElementById("error-flightNo").textContent = "Flight number already exists.";
            errors.push("Flight number already exists.");
        }
    }

    // Validate origin and destination
    if (!origin || !destination) {
        document.getElementById("error-origin").textContent = "Please select a valid origin.";
        document.getElementById("error-destination").textContent = "Please select a valid destination.";
        errors.push("Please select valid origin and destination.");
    } else if (origin === destination) {
        document.getElementById("error-origin").textContent = "Origin and destination must be different.";
        document.getElementById("error-destination").textContent = "Origin and destination must be different.";
        errors.push("Origin and destination must be different.");
    }

    // Validate number of seats
    if (isNaN(seats) || seats <= 0) {
        document.getElementById("error-seats").textContent = "Number of seats must be a positive number.";
        errors.push("Number of seats must be a positive number.");
    }

    // Validate boarding and arrival times
    const currentDateTime = new Date();
    const boardingDateTime = new Date(`${boardingDate}T${boardingTime}`);
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);

    if (boardingDateTime < currentDateTime) {
        document.getElementById("error-boardingDate").textContent = "Boarding date and time must be in the future.";
        errors.push("Boarding date and time must be in the future.");
    }

    if (boardingDateTime >= arrivalDateTime) {
        document.getElementById("error-boardingDate").textContent = "Boarding date and time must be earlier than arrival.";
        document.getElementById("error-boardingTime").textContent = "Boarding time must be earlier than arrival time.";
        errors.push("Boarding date and time must be earlier than arrival.");
    }

    // Display errors or proceed
    if (errors.length > 0) {
        globalErrors.textContent = "Please fix the errors and try again:\n" + errors.join("\n");
    } else {
        // Create an instance of the Flight class for the flight details
        const flightDetails = new Flight(
            flightNo,
            origin,
            destination,
            formatDate(boardingDate),
            boardingTime,
            formatDate(arrivalDate),
            arrivalTime,
            seats
        );

        // Create a popup container to display the success message
        const popupContainer = document.createElement("div");
        popupContainer.id = "successPopup";
        popupContainer.className = "popup-container";

        // Add content to the popup container
        popupContainer.innerHTML = `
            <strong class="popup-title">The Flight Added Successfully!</strong>
            <p>Flight Details:</p>
            <ul class="popup-details">
                <li><strong>Flight No:</strong> ${flightDetails.flightNo}</li>
                <li><strong>Origin:</strong> ${flightDetails.origin}</li>
                <li><strong>Destination:</strong> ${flightDetails.destination}</li>
                <li><strong>Boarding Date:</strong> ${flightDetails.boardingDate} ${flightDetails.boardingTime}</li>
                <li><strong>Arrival Date:</strong> ${flightDetails.arrivalDate} ${flightDetails.arrivalTime}</li>
                <li><strong>No. of Seats:</strong> ${flightDetails.seats}</li>
            </ul>
            <button id="closePopupButton" class="popup-button">Great!</button>
        `;

        // Add the popup container to the document body
        document.body.appendChild(popupContainer);

        // Add event listener to close the popup and redirect
        document.getElementById("closePopupButton").addEventListener("click", function () {
            document.body.removeChild(popupContainer); // Remove the popup
            window.location.href = "../ManageFlights/ManageFlights.html"; // Redirect to Manage Flights page
        });

        // Reset the form fields
        this.reset();
    }
});

// Function to clear individual error messages dynamically
function clearError(event) {
    const inputFieldId = event.target.id; // Get the ID of the field triggering the event

    // Handle dynamic error removal for origin and destination
    const originValue = document.getElementById("origin").value;
    const destinationValue = document.getElementById("destination").value;

    // If origin and destination are now different, clear their errors
    if (originValue !== destinationValue) {
        document.getElementById("error-origin").textContent = ""; // Clear origin error
        document.getElementById("error-destination").textContent = ""; // Clear destination error
    }

    // Handle dynamic error removal for dates and times
    const boardingDateValue = document.getElementById("boardingDate").value;
    const boardingTimeValue = document.getElementById("boardingTime").value;
    const arrivalDateValue = document.getElementById("arrivalDate").value;
    const arrivalTimeValue = document.getElementById("arrivalTime").value;

    if (boardingDateValue && boardingTimeValue && arrivalDateValue && arrivalTimeValue) {
        const boardingDateTime = new Date(`${boardingDateValue}T${boardingTimeValue}`);
        const arrivalDateTime = new Date(`${arrivalDateValue}T${arrivalTimeValue}`);

        // If boarding date and time are earlier than arrival, clear their errors
        if (boardingDateTime < arrivalDateTime) {
            document.getElementById("error-boardingDate").textContent = ""; // Clear boarding date error
            document.getElementById("error-boardingTime").textContent = ""; // Clear boarding time error
            document.getElementById("error-arrivalDate").textContent = ""; // Clear arrival date error
            document.getElementById("error-arrivalTime").textContent = ""; // Clear arrival time error
        }
    }

    // Clear the specific error message for the current input field
    const errorSpanId = `error-${inputFieldId}`; // Generate the corresponding error span ID
    const errorSpan = document.getElementById(errorSpanId); // Locate the error span element
    if (errorSpan) {
        errorSpan.textContent = ""; // Clear the error message
    }
}

// Add input event listeners to all input fields and select elements to clear errors dynamically
const inputFields = document.querySelectorAll("#addFlightForm input, #addFlightForm select");
inputFields.forEach(field => {
    field.addEventListener("input", clearError);
});