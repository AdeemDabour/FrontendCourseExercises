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

// Initialize dynamic passenger fields
createPassengerFields(1);
addValidationListeners(1);

// Function to create passenger fields dynamically
function createPassengerFields(passengerCount) {
    const passengerFieldsContainer = document.getElementById("passengerFields");
    passengerFieldsContainer.innerHTML = ''; // Clear previous inputs

    for (let i = 1; i <= passengerCount; i++) {
        const passengerDiv = document.createElement("div");
        passengerDiv.classList.add("passenger-container");
        passengerDiv.innerHTML = `
            <strong>Passenger ${i}</strong>
            <div class="input-container">
                <label for="passengerName${i}">Name:</label>
                <input type="text" id="passengerName${i}" name="passengerName${i}" required>
            </div>
            <div class="input-container">
                <label for="passportId${i}">Passport ID:</label>
                <input type="number" id="passportId${i}" name="passportId${i}" required>
            </div>
        `;
        passengerFieldsContainer.appendChild(passengerDiv);
    }
}

// Event listener for passenger count changes
document.getElementById("passengerCount").addEventListener("input", function () {
    const passengerCount = parseInt(this.value);

    if (passengerCount > maxSeats) {
        showErrorMessage(this, `Max number of seats available at the moment is ${maxSeats}.`);
        this.value = maxSeats;
    } else {
        hideErrorMessage(this);
        createPassengerFields(passengerCount);
        addValidationListeners(passengerCount);
    }
});

// Function to add validation listeners
function addValidationListeners(passengerCount) {
    for (let i = 1; i <= passengerCount; i++) {
        const nameField = document.getElementById(`passengerName${i}`);
        const passportIdField = document.getElementById(`passportId${i}`);

        if (nameField && passportIdField) {
            nameField.addEventListener("input", () => validateName(nameField));
            passportIdField.addEventListener("input", () => validatePassportId(passportIdField));
        }
    }
}

// Validation functions
function validateName(nameField) {
    const name = nameField.value.trim();
    const errorMessage = "Name must contain letters only.";
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showErrorMessage(nameField, errorMessage);
        return false;
    }
    hideErrorMessage(nameField);
    return true;
}

function validatePassportId(passportIdField) {
    const passportId = passportIdField.value.trim();
    const errorMessage = "Passport ID must be exactly 8 digits.";
    if (!/^\d{8}$/.test(passportId)) {
        showErrorMessage(passportIdField, errorMessage);
        return false;
    }
    hideErrorMessage(passportIdField);
    return true;
}

// Helper functions for error message handling
function showErrorMessage(field, message) {
    let errorSpan = field.parentNode.querySelector(".error-message");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.className = "error-message";
        errorSpan.style.color = "red";
        field.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
}

function hideErrorMessage(field) {
    const errorSpan = field.parentNode.querySelector(".error-message");
    if (errorSpan) {
        errorSpan.textContent = "";
    }
}

// Save booking and display success message
document.getElementById("saveBookingButton").addEventListener("click", function (event) {
    event.preventDefault();

    const passengerCount = parseInt(passengerCountInput.value);
    let allValid = true;

    for (let i = 1; i <= passengerCount; i++) {
        const nameField = document.getElementById(`passengerName${i}`);
        const passportIdField = document.getElementById(`passportId${i}`);

        if (!validateName(nameField) || !validatePassportId(passportIdField)) {
            allValid = false;
        }
    }
    const globalErrorMessage = document.getElementById("globalErrorMessage");

    if (allValid) {
        //no need to show an error message.
        globalErrorMessage.style.display = "none";
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
    } else {
        //show the error message.
        globalErrorMessage.style.display = "block";
    }
});