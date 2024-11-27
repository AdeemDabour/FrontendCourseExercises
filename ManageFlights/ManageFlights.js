import { flights } from "../data/Flights.js";

function createFlightsTable(data) {
    const container = document.getElementById("flightsTableContainer");
    container.innerHTML = "";

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Flight No.", "Origin", "Destination", "Boarding Date", "Boarding Time", "Arrival Date", "Arrival Time", "No. of Seats"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach(flight => {
        const row = document.createElement("tr");

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

        flightData.forEach(item => {
            const td = document.createElement("td");
            td.textContent = item;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

createFlightsTable(flights);