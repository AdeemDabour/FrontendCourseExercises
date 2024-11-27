// Define a class to represent a flight
export class Flight {
    // Constructor method to initialize flight properties
    constructor(flightNo, origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime, seats) {
        this.flightNo = flightNo; // The unique flight number
        this.origin = origin; // The origin of the flight (departure location)
        this.destination = destination; // The destination of the flight (arrival location)
        this.boardingDate = boardingDate; // The date of boarding for the flight
        this.boardingTime = boardingTime; // The time of boarding for the flight
        this.arrivalDate = arrivalDate; // The date when the flight is scheduled to arrive
        this.arrivalTime = arrivalTime; // The time when the flight is scheduled to arrive
        this.seats = seats; // The number of available seats on the flight
    }
}