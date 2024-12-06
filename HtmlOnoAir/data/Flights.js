// Import the Flight class to create flight instances
import { Flight } from "../classes/Flight.js";

// Array to store multiple flight instances, each created with specific data for flight number, origin, destination, dates, times, and number of seats
export let flights = [
    // Creating instances of the Flight class with parameters: flight number, origin, destination, boarding date, boarding time, arrival date, arrival time, and number of seats
    new Flight('LX8396', 'Larnaca', 'Zurich', '02/12/2025', '09:00', '02/12/2025', '11:00', 120),
    new Flight('AA120', 'Tel Aviv', 'London', '05/12/2025', '16:00', '05/12/2025', '20:30', 180),
    new Flight('EK455', 'Krakow', 'Larnaca', '20/05/2025', '20:00', '21/05/2025', '02:00', 250),
    new Flight('AF2050', 'Paris', 'Tel Aviv', '06/12/2025', '10:00', '06/12/2025', '16:00', 200),
    new Flight('EK203', 'Dubai', 'Tel Aviv', '07/12/2025', '18:00', '07/12/2025', '22:30', 250),
    new Flight('AZ6789', 'Rome', 'New York', '10/12/2025', '12:00', '10/12/2025', '16:00', 300),
    new Flight('UA992', 'Los Angeles', 'Tokyo', '12/12/2025', '11:00', '12/12/2025', '18:00', 280),
    new Flight('AF2099', 'Tel Aviv', 'Paris', '20/12/2025', '15:00', '20/12/2025', '19:30', 180),
    new Flight('LH402', 'Tel Aviv', 'Berlin', '24/12/2025', '10:00', '24/12/2025', '14:30', 220),
    new Flight('W61283', 'Tel Aviv', 'Krakow', '28/12/2025', '20:00', '29/12/2025', '01:00', 150)
];