// Define a class to represent a flight booking
export class Booking {
    // Constructor method to initialize booking properties
    constructor(origin, destination, boardingDateTime, landingDateTime, passengerCount, imageUrl) {
        this.origin = origin; // The origin of the flight (departure location)
        this.destination = destination; // The destination of the flight (arrival location)
        this.boardingDateTime = boardingDateTime; // The boarding date and time of the flight
        this.landingDateTime = landingDateTime; // The landing date and time of the flight
        this.passengerCount = passengerCount; // The number of passengers in the booking
        this.imageUrl = imageUrl; // An image URL related to the booking
    }
}