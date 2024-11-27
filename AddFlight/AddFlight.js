// Add a submit event listener to the form with id "addFlightForm"
document.getElementById("addFlightForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.textContent = ""); // Clear individual error messages
    const globalErrors = document.getElementById("global-errors");
    globalErrors.textContent = ""; // Clear global error messages

    let errors = []; // Array to store validation errors

    // Get input values and trim whitespace where applicable
    const flightNo = document.getElementById("flightNo").value.trim();
    const origin = document.getElementById("origin").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const boardingDate = document.getElementById("boardingDate").value;
    const boardingTime = document.getElementById("boardingTime").value;
    const arrivalDate = document.getElementById("arrivalDate").value;
    const arrivalTime = document.getElementById("arrivalTime").value;
    const seats = document.getElementById("seats").value;

    // Validate flight number (must not be empty)
    if (!flightNo) {
        document.getElementById("error-flightNo").textContent = "Flight number is required.";
        errors.push("Flight number is required.");
    }

    // Validate origin (must not be empty)
    if (!origin) {
        document.getElementById("error-origin").textContent = "Origin is required.";
        errors.push("Origin is required.");
    }

    // Validate destination (must not be empty)
    if (!destination) {
        document.getElementById("error-destination").textContent = "Destination is required.";
        errors.push("Destination is required.");
    }

    // Validate number of seats (must be a positive number)
    if (seats <= 0 || isNaN(seats)) {
        document.getElementById("error-seats").textContent = "Number of seats must be a positive number.";
        errors.push("Number of seats must be a positive number.");
    }

    // Validate boarding and arrival times (boarding must be earlier than arrival)
    const boardingDateTime = new Date(`${boardingDate}T${boardingTime}`);
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);

    if (boardingDateTime >= arrivalDateTime) {
        document.getElementById("error-boardingDate").textContent = "Boarding date and time must be earlier than arrival.";
        document.getElementById("error-boardingTime").textContent = "Boarding time must be earlier than arrival time.";
        errors.push("Boarding date and time must be earlier than arrival.");
    }

    // Display global errors if any validation fails
    if (errors.length > 0) {
        globalErrors.textContent = "Please fix the errors and try again:\n" + errors.join("\n");
    } else {
        // If no errors, create an object to store flight details
        const flightDetails = {
            flight: {
                flightNo,
                origin,
                destination,
                boardingDate,
                boardingTime,
                arrivalDate,
                arrivalTime,
                seats,
            },
        };

        // Create a popup container to display the success message
        const popupContainer = document.createElement("div");
        popupContainer.id = "successPopup";
        popupContainer.className = "popup-container";

        // Add content to the popup container
        popupContainer.innerHTML = `
            <strong class="popup-title">The Flight Added Successfully!</strong>
            <p>Flight Details:</p>
            <ul class="popup-details">
                <li><strong>FlightNo:</strong> ${flightDetails.flight.flightNo}</li>
                <li><strong>Origin:</strong> ${flightDetails.flight.origin}</li>
                <li><strong>Destination:</strong> ${flightDetails.flight.destination}</li>
                <li><strong>Boarding Date:</strong> ${flightDetails.flight.boardingDate}</li>
                <li><strong>Boarding Time:</strong> ${flightDetails.flight.boardingTime}</li>
                <li><strong>Arrival Date:</strong> ${flightDetails.flight.arrivalDate}</li>
                <li><strong>Arrival Time:</strong> ${flightDetails.flight.arrivalTime}</li>
                <li><strong>No. Of Seats:</strong> ${flightDetails.flight.seats}</li>
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

        this.reset(); // Reset the form fields
    }
});

// Function to clear individual error messages when typing in input fields
function clearError(event) {
    const errorSpanId = `error-${event.target.id}`; // Find the corresponding error span
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
        errorSpan.textContent = ""; // Clear the error message
    }
}

// Add input event listeners to all input fields to clear errors dynamically
const inputFields = document.querySelectorAll("#addFlightForm input");
inputFields.forEach(field => {
    field.addEventListener("input", clearError);
});