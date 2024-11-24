// טוען את הטיסות מ-localStorage
const flights = JSON.parse(localStorage.getItem('flights'));

if (flights) {
    const tableBody = document.querySelector("#flightsTable tbody");
    
    flights.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flightNo}</td>
            <td>${flight.origin}</td>
            <td>${flight.destination}</td>
            <td>${flight.boardingDate}</td>
            <td>${flight.boardingTime}</td>
            <td>${flight.arrivalDate}</td>
            <td>${flight.arrivalTime}</td>
            <td>${flight.seats}</td>
            <td><button class="book-button" onclick="redirectToBookAFlight('${flight.origin}', '${flight.destination}', '${flight.boardingDate}', '${flight.boardingTime}', '${flight.arrivalDate}', '${flight.arrivalTime}')">Book</button></td>
        `;
        tableBody.appendChild(row);
    });
} else {
    alert("No flights data found in localStorage.");
}

// פונקציית סינון טיסות
function filterFlights() {
    const originFilter = document.getElementById("originFilter").value;
    const destinationFilter = document.getElementById("destinationFilter").value;

    const rows = document.querySelectorAll("#flightsTable tbody tr");
    rows.forEach(row => {
        const origin = row.cells[1].innerText;
        const destination = row.cells[2].innerText;

        // הצגת שורה אם היא מתאימה לסינון
        if ((originFilter === "" || origin === originFilter) && (destinationFilter === "" || destination === destinationFilter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// הוספת מאזינים לשדות הסינון
document.getElementById("originFilter").addEventListener("change", filterFlights);
document.getElementById("destinationFilter").addEventListener("change", filterFlights);

// פונקציה להפניית המשתמש להזמנת טיסה
function redirectToBookAFlight(origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime) {
    const url = `../BookAFlight/BookAFlight.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&boardingDate=${encodeURIComponent(boardingDate)}&boardingTime=${encodeURIComponent(boardingTime)}&arrivalDate=${encodeURIComponent(arrivalDate)}&arrivalTime=${encodeURIComponent(arrivalTime)}`;
    window.location.href = url;
}