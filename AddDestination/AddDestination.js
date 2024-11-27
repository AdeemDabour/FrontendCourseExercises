document.getElementById("addDestinationForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.textContent = "");
    const globalErrors = document.getElementById("global-errors");
    globalErrors.textContent = "";

    let errors = [];
    const destinationCode = document.getElementById("destinationCode").value.trim();
    const destinationName = document.getElementById("destinationName").value.trim();
    const airportName = document.getElementById("airportName").value.trim();
    const airportUrl = document.getElementById("airportUrl").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    if (!destinationCode || destinationCode.length < 3) {
        document.getElementById("error-destinationCode").textContent = "Destination code must be at least 3 characters.";
        errors.push("Destination code must be at least 3 characters.");
    }

    if (!destinationName) {
        document.getElementById("error-destinationName").textContent = "Destination name is required.";
        errors.push("Destination name is required.");
    }

    if (!airportName) {
        document.getElementById("error-airportName").textContent = "Airport name is required.";
        errors.push("Airport name is required.");
    }

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!airportUrl || !urlPattern.test(airportUrl)) {
        document.getElementById("error-airportUrl").textContent = "Valid airport URL is required.";
        errors.push("Valid airport URL is required.");
    }

    const imagePattern = /\.(jpeg|jpg|png|gif|bmp)$/i;
    if (!imageUrl || !imagePattern.test(imageUrl)) {
        document.getElementById("error-imageUrl").textContent = "Valid image URL is required.";
        errors.push("Valid image URL is required.");
    }

    if (errors.length > 0) {
        globalErrors.textContent = "Please fix the errors and try again:\n" + errors.join("\n");
    } else {
        const destinationDetails = {
            destination: {
                destinationCode,
                destinationName,
                airportName,
                airportUrl,
                imageUrl,
            },
        };
        // Create the success message container
        const popupContainer = document.createElement("div");
        popupContainer.id = "successPopup";
        popupContainer.className = "popup-container";

        // Add the success message content
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

        document.body.appendChild(popupContainer);
        // Add event listener to close the popup
        document.getElementById("closePopupButton").addEventListener("click", function () {
            document.body.removeChild(popupContainer);
            window.location.href = "../ManageDestinations/ManageDestinations.html";
        });
        this.reset();
    }
});

function clearError(event) {
    const errorSpanId = `error-${event.target.id}`;
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
        errorSpan.textContent = "";
    }
}

const inputFields = document.querySelectorAll("#addDestinationForm input");
inputFields.forEach(field => {
    field.addEventListener("input", clearError);
});