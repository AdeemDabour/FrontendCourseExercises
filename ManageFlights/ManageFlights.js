// Import flights data from an external file
import { flights } from "../data/Flights.js";

// Function to dynamically create a table to display the flights data
function createFlightsTable(data) {
    const container = document.getElementById("flightsTableContainer"); // Get the container for the table
    container.innerHTML = ""; // Clear any existing content

    const table = document.createElement("table"); // Create the table element

    // Create the table header with column names
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Flight No.", "Origin", "Destination", "Boarding Date", "Boarding Time", "Arrival Date", "Arrival Time", "No. of Seats"];
    
    // Loop through header names and create table header cells
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow); // Append the header row to the table header
    table.appendChild(thead); // Append the header section to the table

    // Create the table body section to hold the rows of flight data
    const tbody = document.createElement("tbody");

    // Loop through the flights data to create a row for each flight
    data.forEach(flight => {
        const row = document.createElement("tr");

        // Array containing the flight details to be displayed in each row
        const flightData = [
            flight.flightNo,
            flight.origin,
            flight.destination,
            flight.boardingDate,
            flight.boardingTime,
            flight.arrivalDate,
            flight.arrivalTime,
            flight.seats
        ];

        // Loop through the flight data and create table cells for each item
        flightData.forEach(item => {
            const td = document.createElement("td");
            td.textContent = item;
            row.appendChild(td);
        });

        tbody.appendChild(row); // Append the row to the table body
    });

    table.appendChild(tbody); // Append the body section to the table
    container.appendChild(table); // Append the table to the container
}

// Call the function to create the flights table using the imported flights data
createFlightsTable(flights);