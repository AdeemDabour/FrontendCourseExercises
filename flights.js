// הגדרת מחלקת Flight
class Flight {
    constructor(flightNo, origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime, seats) {
        this.flightNo = flightNo;
        this.origin = origin;
        this.destination = destination;
        this.boardingDate = boardingDate;
        this.boardingTime = boardingTime;
        this.arrivalDate = arrivalDate;
        this.arrivalTime = arrivalTime;
        this.seats = seats;
    }
}

// יצירת מערך של טיסות
let flights = [
    new Flight('EK455', 'Krakow', 'Larnaca', '20/05/2024', '20:00', '21/05/2024', '02:00', 250),
    new Flight('LX8396', 'Larnaca', 'Zurich', '02/12/2024', '09:00', '02/12/2024', '11:00', 120),
    new Flight('AA120', 'Tel Aviv', 'London', '05/12/2024', '16:00', '05/12/2024', '20:30', 180),
    new Flight('AF2050', 'Paris', 'Tel Aviv', '06/12/2024', '10:00', '06/12/2024', '16:00', 200),
    new Flight('EK203', 'Dubai', 'Tel Aviv', '07/12/2024', '18:00', '07/12/2024', '22:30', 250),
    new Flight('AZ6789', 'Rome', 'New York', '10/12/2024', '12:00', '10/12/2024', '16:00', 300),
    new Flight('UA992', 'Los Angeles', 'Tokyo', '12/12/2024', '11:00', '12/12/2024', '18:00', 280),
    new Flight('AF2099', 'Tel Aviv', 'Paris', '20/12/2024', '15:00', '20/12/2024', '19:30', 180),
    new Flight('LH402', 'Tel Aviv', 'Berlin', '24/12/2024', '10:00', '24/12/2024', '14:30', 220),
    new Flight('W61283', 'Tel Aviv', 'Krakow', '16/07/2025', '20:00', '17/07/2025', '01:00', 150)
];



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