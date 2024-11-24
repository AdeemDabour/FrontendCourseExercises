// פונקציה ליצירת טבלת טיסות
function createFlightsTable(data) {
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Flight No.</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Boarding Date</th>
                    <th>Boarding Time</th>
                    <th>Arrival Date</th>
                    <th>Arrival Time</th>
                    <th>No. of Seats</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(flight => {
        tableHTML += `
            <tr>
                <td>${flight.flightNo}</td>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>${flight.boardingDate}</td>
                <td>${flight.boardingTime}</td>
                <td>${flight.arrivalDate}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.seats}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById("flightsTableContainer").innerHTML = tableHTML;
}


// קריאה לפונקציה עם הנתונים
createFlightsTable(flights);