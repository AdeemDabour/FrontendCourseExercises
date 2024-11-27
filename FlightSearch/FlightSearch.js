import { flights } from "../data/Flights.js";

if (flights && flights.length > 0) {
    const tableBody = document.querySelector("#flightsTable tbody");
    const noResultsMessage = document.createElement("tr");
    noResultsMessage.id = "no-results-message";
    noResultsMessage.style.display = "none";
    noResultsMessage.innerHTML = `<td colspan="9" style="text-align: center;">No flights match your search criteria.</td>`;
    tableBody.appendChild(noResultsMessage);

    flights.forEach(flight => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${flight.flightNo}</td>
            <td>${flight.origin}</td>
            <td>${flight.destination}</td>
            <td>${flight.boardingDate}</td>
            <td>${flight.boardingTime}</td>
            <td>${flight.arrivalDate}</td>
            <td>${flight.arrivalTime}</td>
            <td>${flight.seats}</td>
            <td><button class="book-button">Book</button></td>
        `;

        // Attach event listener to the button
        const bookButton = row.querySelector(".book-button");
        bookButton.addEventListener("click", () => {
            redirectToBookAFlight(
                flight.origin,
                flight.destination,
                flight.boardingDate,
                flight.boardingTime,
                flight.arrivalDate,
                flight.arrivalTime,
                flight.seats
            );
        });

        tableBody.appendChild(row);
    });
} else {
    alert("No flight data available.");
}

// Function to filter flights
function filterFlights() {
    const originFilter = document.getElementById("originFilter").value;
    const destinationFilter = document.getElementById("destinationFilter").value;

    const rows = document.querySelectorAll("#flightsTable tbody tr:not(#no-results-message)");
    let visibleRowCount = 0;

    rows.forEach(row => {
        const origin = row.cells[1].innerText;
        const destination = row.cells[2].innerText;

        // Show the row if it matches the filters
        if ((originFilter === "" || origin === originFilter) && (destinationFilter === "" || destination === destinationFilter)) {
            row.style.display = "";
            visibleRowCount++;
        } else {
            row.style.display = "none";
        }
    });

    // Show "no results" message if no rows are visible
    const noResultsMessage = document.getElementById("no-results-message");
    noResultsMessage.style.display = visibleRowCount === 0 ? "" : "none";
}

// Add event listeners to the filter fields
document.getElementById("originFilter").addEventListener("change", filterFlights);
document.getElementById("destinationFilter").addEventListener("change", filterFlights);

// Function to redirect the user to the booking page
function redirectToBookAFlight(origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime, seats) {
    const url = `../BookAFlight/BookAFlight.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&boardingDate=${encodeURIComponent(boardingDate)}&boardingTime=${encodeURIComponent(boardingTime)}&arrivalDate=${encodeURIComponent(arrivalDate)}&arrivalTime=${encodeURIComponent(arrivalTime)}&seats=${encodeURIComponent(seats)}`;
    window.location.href = url;
}