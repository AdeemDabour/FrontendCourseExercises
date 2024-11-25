document.getElementById("addFlightForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.textContent = "");
    const globalErrors = document.getElementById("global-errors");
    globalErrors.textContent = "";

    let errors = [];
    const flightNo = document.getElementById("flightNo").value.trim();
    const origin = document.getElementById("origin").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const boardingDate = document.getElementById("boardingDate").value;
    const boardingTime = document.getElementById("boardingTime").value;
    const arrivalDate = document.getElementById("arrivalDate").value;
    const arrivalTime = document.getElementById("arrivalTime").value;
    const seats = document.getElementById("seats").value;

    // בדיקת שדה מספר הטיסה
    if (!flightNo) {
        document.getElementById("error-flightNo").textContent = "Flight number is required.";
        errors.push("Flight number is required.");
    }

    // בדיקת מקור
    if (!origin) {
        document.getElementById("error-origin").textContent = "Origin is required.";
        errors.push("Origin is required.");
    }

    // בדיקת יעד
    if (!destination) {
        document.getElementById("error-destination").textContent = "Destination is required.";
        errors.push("Destination is required.");
    }

    // בדיקת מספר מושבים
    if (seats <= 0 || isNaN(seats)) {
        document.getElementById("error-seats").textContent = "Number of seats must be a positive number.";
        errors.push("Number of seats must be a positive number.");
    }

    // המרת תאריכים ושעות
    const boardingDateTime = new Date(`${boardingDate}T${boardingTime}`);
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);

    // בדיקה של תאריך ושעת המראה מול נחיתה
    if (boardingDateTime >= arrivalDateTime) {
        document.getElementById("error-boardingDate").textContent = "Boarding date and time must be earlier than arrival.";
        document.getElementById("error-boardingTime").textContent = "Boarding time must be earlier than arrival time.";
        errors.push("Boarding date and time must be earlier than arrival.");
    }

    // הצגת שגיאות
    if (errors.length > 0) {
        globalErrors.textContent = "Please fix the errors and try again:\n" + errors.join("\n");
    } else {
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
        // Create the success message container
        const popupContainer = document.createElement("div");
        popupContainer.id = "successPopup";
        popupContainer.className = "popup-container";

        // Add the success message content
        popupContainer.innerHTML = `
            <strong class="popup-title">The Flight Added Successfully!</strong>
            <p>Flight Details:</p>
            <ul class="popup-details">
                <li><strong>FlightNo:</strong> ${flightDetails.flight.flightNo}</li>
                <li><strong>Origin:</strong> ${flightDetails.flight.origin}</li>
                <li><strong>Destination:</strong> ${flightDetails.flight.destination}</li>
                <li><strong>Boarding Date:</strong> ${flightDetails.flight.boardingDate}</li>
                <li><strong>Boarding Time:</strong> ${flightDetails.flight.boardingTime}</li>
                <li><strong>arrival Date:</strong> ${flightDetails.flight.arrivalDate}</li>
                <li><strong>arrival Time:</strong> ${flightDetails.flight.arrivalTime}</li>
                <li><strong>No. Of Seats:</strong> ${flightDetails.flight.seats}</li>
            </ul>
            <button id="closePopupButton" class="popup-button">Great!</button>
        `;

        document.body.appendChild(popupContainer);
        // Add event listener to close the popup
        document.getElementById("closePopupButton").addEventListener("click", function () {
            document.body.removeChild(popupContainer);
            // מעבר לעמוד טבלת הטיסות
            window.location.href = "../ManageFlights/ManageFlights.html";
        });
        // ניקוי הטופס
        this.reset();
    }
});

// פונקציה לניקוי שגיאה כאשר מתחילים למלא שדה מחדש
function clearError(event) {
    const errorSpanId = `error-${event.target.id}`;
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
        errorSpan.textContent = "";
    }
}

// מאזינים לשדות הטופס
const inputFields = document.querySelectorAll("#addFlightForm input");
inputFields.forEach(field => {
    field.addEventListener("input", clearError);
});
