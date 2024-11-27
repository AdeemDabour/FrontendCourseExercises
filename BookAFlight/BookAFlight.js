// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch parameters from the URL
const origin = getQueryParam("origin");
const destination = getQueryParam("destination");
const boardingDate = getQueryParam("boardingDate");
const boardingTime = getQueryParam("boardingTime");
const arrivalDate = getQueryParam("arrivalDate");
const arrivalTime = getQueryParam("arrivalTime");
const maxSeats = parseInt(getQueryParam("seats")) || 1;

// Set maximum seats and display flight details
const passengerCountInput = document.getElementById("passengerCount");
passengerCountInput.max = maxSeats;
const boardingDateTime = `${boardingDate || "Not selected"} ${boardingTime || "Not selected"}`;
const landingDateTime = `${arrivalDate || "Not selected"} ${arrivalTime || "Not selected"}`;
document.getElementById("originDisplay").innerText = origin || "Not selected";
document.getElementById("boardingDateTimeDisplay").innerText = boardingDateTime;
document.getElementById("destinationDisplay").innerText = destination || "Not selected";
document.getElementById("landingDateTimeDisplay").innerText = landingDateTime;

// To handle errors
const errorMessages = document.querySelectorAll(".error-message");
errorMessages.forEach(msg => (msg.textContent = ""));
const globalErrors = document.getElementById("global-errors");
globalErrors.textContent = "";

// Function to create passenger fields dynamically
function createPassengerFields(passengerCount) {
    const passengerFieldsContainer = document.getElementById("passengerFields");
    passengerFieldsContainer.innerHTML = ""; // Clear previous inputs

    const template = document.getElementById("passengerTemplate");
    for (let i = 1; i <= passengerCount; i++) {
        const passengerDiv = template.content.cloneNode(true);

        // Update passenger number
        passengerDiv.querySelector("strong").textContent = `Passenger ${i}`;

        // Update name input
        const nameInput = passengerDiv.querySelector(".passengerName");
        nameInput.id = `passengerName${i}`;
        nameInput.name = `passengerName${i}`;
        nameInput.addEventListener("input", clearError);

        // Update corresponding label for name
        const nameLabel = passengerDiv.querySelector("label[for='passengerName']");
        if (nameLabel) nameLabel.setAttribute("for", `passengerName${i}`);

        // Update passport input
        const passportInput = passengerDiv.querySelector(".passportId");
        passportInput.id = `passportId${i}`;
        passportInput.name = `passportId${i}`;
        passportInput.addEventListener("input", clearError);

        // Update corresponding label for passport ID
        const passportLabel = passengerDiv.querySelector("label[for='passportId']");
        if (passportLabel) passportLabel.setAttribute("for", `passportId${i}`);

        // Update name error span
        const nameError = passengerDiv.querySelector(".name-error");
        if (nameError) nameError.id = `error-passengerName${i}`;

        // Update passport error span
        const passportError = passengerDiv.querySelector(".passport-error");
        if (passportError) passportError.id = `error-passportId${i}`;
        console.log(`Assigned error span id for passport: error-passportId${i}`);

        // Append the passengerDiv to the container
        passengerFieldsContainer.appendChild(passengerDiv);
    }
}



// Initialize dynamic passenger fields
createPassengerFields(1);

// Event listener for passenger count changes
document.getElementById("passengerCount").addEventListener("input", function () {
    const passengerCount = parseInt(this.value);

    if (passengerCount > maxSeats) {
        document.getElementById("error-passengerCount").textContent = `Max number of seats available at the moment is ${maxSeats}.`;
        this.value = maxSeats;
    } else {
        document.getElementById("error-passengerCount").textContent = "";
        createPassengerFields(passengerCount);
    }
});

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const passengerCount = parseInt(passengerCountInput.value);
    let errors = [];

    // Validation for all the passengers' inputs
    for (let i = 1; i <= passengerCount; i++) {
        const nameField = document.getElementById(`passengerName${i}`);
        const passportIdField = document.getElementById(`passportId${i}`);
        let passengerHasErrors = false;

        if (!/^[a-zA-Z\s]+$/.test(nameField.value)) {
            document.getElementById(`error-passengerName${i}`).textContent = "Name must contain letters only.";
            passengerHasErrors = true;
        }
        if (!/^\d{8}$/.test(passportIdField.value)) {
            document.getElementById(`error-passportId${i}`).textContent = "Passport ID must be exactly 8 digits.";
            passengerHasErrors = true;
        }

        // Track errors for global message
        if (passengerHasErrors) {
            errors.push(i);
        }
    }

    if (errors.length > 0) {
        globalErrors.textContent = `Please fix the errors for passengers: ${errors.join(", ")}`;
    } else {
        // Save booking and display success message
        const bookingDetails = {
            flight: {
                origin,
                destination,
                boardingDateTime,
                landingDateTime,
            },
            passengers: passengerCount,
        };

        // Create the success message container
        const popupContainer = document.createElement("div");
        popupContainer.id = "successPopup";
        popupContainer.className = "popup-container";

        // Add the success message content
        popupContainer.innerHTML = `
            <strong class="popup-title">The Booking Saved Successfully!</strong>
            <p>Flight Details:</p>
            <ul class="popup-details">
                <li><strong>Origin:</strong> ${bookingDetails.flight.origin}</li>
                <li><strong>Destination:</strong> ${bookingDetails.flight.destination}</li>
                <li><strong>Boarding Date & Time:</strong> ${bookingDetails.flight.boardingDateTime}</li>
                <li><strong>Landing Date & Time:</strong> ${bookingDetails.flight.landingDateTime}</li>
            </ul>
            <p><strong>Number of Passengers:</strong> ${bookingDetails.passengers}</p>
            <button id="closePopupButton" class="popup-button">Great!</button>
        `;

        document.body.appendChild(popupContainer);
        // Add event listener to close the popup
        document.getElementById("closePopupButton").addEventListener("click", function () {
            document.body.removeChild(popupContainer);
            window.location.href = "../ManageBookings/ManageBookings.html";
        });

        this.reset(); // Clear the form after finish
        createPassengerFields(1); // Reset to default 1 passenger
    }
});
// Function to clear error messages dynamically
function clearError(event) {
    const inputFieldId = event.target.id; // Get the id of the field triggering the event
    const errorSpanId = `error-${inputFieldId}`; // Generate the corresponding error span id
    const errorSpan = document.getElementById(errorSpanId); // Locate the error span element
    if (errorSpan) {
        errorSpan.textContent = ""; // Clear the error message
        globalErrors.textContent = "";
    }
}


