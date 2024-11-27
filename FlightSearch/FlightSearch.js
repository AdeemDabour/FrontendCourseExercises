// Import the flights data from a separate file
import { flights } from "../data/Flights.js";

// Check if flight data is available
if (flights && flights.length > 0) {
    const tableBody = document.querySelector("#flightsTable tbody"); // Get the table body element

    // Create a "no results" message row (hidden by default)
    const noResultsMessage = document.createElement("tr");
    noResultsMessage.id = "no-results-message"; // Assign an ID to the row
    noResultsMessage.style.display = "none"; // Hide the row initially
    noResultsMessage.innerHTML = `
        <td colspan="9" style="text-align: center;">
            No flights match your search criteria.
        </td>`; // Display message across all table columns
    tableBody.appendChild(noResultsMessage);

    // Loop through the flights and create table rows for each flight
    flights.forEach(flight => {
        const row = document.createElement("tr"); // Create a new table row
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
        `; // Populate row with flight details and a "Book" button

        // Attach a click event listener to the "Book" button
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
            ); // Redirect to the booking page with flight details
        });

        tableBody.appendChild(row); // Add the row to the table body
    });
} else {
    // Show an alert if no flight data is available
    alert("No flight data available.");
}

// Function to filter flights based on origin and destination
function filterFlights() {
    const originFilter = document.getElementById("originFilter").value; // Get selected origin filter value
    const destinationFilter = document.getElementById("destinationFilter").value; // Get selected destination filter value

    const rows = document.querySelectorAll("#flightsTable tbody tr:not(#no-results-message)"); // Get all table rows except the "no results" message
    let visibleRowCount = 0; // Counter for visible rows

    rows.forEach(row => {
        const origin = row.cells[1].innerText; // Get origin from the row
        const destination = row.cells[2].innerText; // Get destination from the row

        // Check if the row matches the selected filters
        if ((originFilter === "" || origin === originFilter) && (destinationFilter === "" || destination === destinationFilter)) {
            row.style.display = ""; // Show the row
            visibleRowCount++;
        } else {
            row.style.display = "none"; // Hide the row
        }
    });

    // Show or hide the "no results" message based on the number of visible rows
    const noResultsMessage = document.getElementById("no-results-message");
    noResultsMessage.style.display = visibleRowCount === 0 ? "" : "none";
}

// Add event listeners to the origin and destination filter dropdowns
document.getElementById("originFilter").addEventListener("change", filterFlights);
document.getElementById("destinationFilter").addEventListener("change", filterFlights);

// Function to redirect the user to the booking page with selected flight details
function redirectToBookAFlight(origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime, seats) {
    const url = `../BookAFlight/BookAFlight.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&boardingDate=${encodeURIComponent(boardingDate)}&boardingTime=${encodeURIComponent(boardingTime)}&arrivalDate=${encodeURIComponent(arrivalDate)}&arrivalTime=${encodeURIComponent(arrivalTime)}&seats=${encodeURIComponent(seats)}`; // Construct the URL with query parameters
    window.location.href = url; // Redirect to the booking page
}