// Importing the destinations data from an external module
import { destinations } from "../data/Destinations.js";

// Log the destinations array to verify the data is being imported correctly
console.log(destinations);

// Function to populate select options
function populateSelectOptions(selectElement, options) {
    options.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination.name;
        option.textContent = `${destination.name} (${destination.code})`; // Display name and airport code
        selectElement.appendChild(option);
    });
}

// Populate origin and destination selects
const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
populateSelectOptions(originSelect, destinations);
populateSelectOptions(destinationSelect, destinations);

// Add a submit event listener to the form
document.getElementById("addFlightForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.textContent = "");
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
    }

    // Validate origin and destination
    if (origin === destination) {
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
        // Show success popup
        alert("Flight added successfully!");
        this.reset(); // Reset the form
    }
});