// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get parameters for origin, destination, boardingDate, boardingTime, arrivalDate, and arrivalTime
const origin = getQueryParam("origin");
const destination = getQueryParam("destination");
const boardingDate = getQueryParam("boardingDate");
const boardingTime = getQueryParam("boardingTime");
const arrivalDate = getQueryParam("arrivalDate");
const arrivalTime = getQueryParam("arrivalTime");

// Format the dates and times for display
const boardingDateTime = `${boardingDate || "Not selected"} ${boardingTime || "Not selected"}`;
const landingDateTime = `${arrivalDate || "Not selected"} ${arrivalTime || "Not selected"}`;

// Display the values in the page
document.getElementById("originDisplay").innerText = origin || "Not selected";
document.getElementById("boardingDateTimeDisplay").innerText = boardingDateTime;
document.getElementById("destinationDisplay").innerText = destination || "Not selected";
document.getElementById("landingDateTimeDisplay").innerText = landingDateTime;

// Function to create passenger fields dynamically
function createPassengerFields(passengerCount) {
    const passengerFieldsContainer = document.getElementById("passengerFields");
    passengerFieldsContainer.innerHTML = ''; // Clear previous inputs

    // Always show Passenger 1
    const passenger1Div = document.createElement("div");
    passenger1Div.classList.add("passenger-container");
    passenger1Div.innerHTML = `
        <strong>Passenger 1</strong>
        <div class="input-container">
            <label for="passengerName1">Name:</label>
            <input type="text" id="passengerName1" name="passengerName1" required>
        </div>
        <div class="input-container">
            <label for="passportId1">Passport ID:</label>
            <input type="text" id="passportId1" name="passportId1" required>
        </div>
    `;
    passengerFieldsContainer.appendChild(passenger1Div);

    // Create fields for each additional passenger
    for (let i = 2; i <= passengerCount; i++) {
        const passengerDiv = document.createElement("div");
        passengerDiv.classList.add("passenger-container");

        // Create passenger label and fields for name and passport ID
        passengerDiv.innerHTML = `
            <strong>Passenger ${i}</strong>
            <div class="input-container">
                <label for="passengerName${i}">Name:</label>
                <input type="text" id="passengerName${i}" name="passengerName${i}" required>
            </div>
            <div class="input-container">
                <label for="passportId${i}">Passport ID:</label>
                <input type="text" id="passportId${i}" name="passportId${i}" required>
            </div>
        `;
        passengerFieldsContainer.appendChild(passengerDiv);
    }
}

// Initialize with 1 passenger by default
createPassengerFields(1);

// Add event listener to dynamically update fields when number of passengers changes
document.getElementById("passengerCount").addEventListener("input", function() {
    const passengerCount = parseInt(this.value);
    if (passengerCount >= 1) {
        createPassengerFields(passengerCount);
    }
});