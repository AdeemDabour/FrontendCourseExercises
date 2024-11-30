// Define a class to represent a flight booking
export class Booking {
    constructor(origin, destination, boardingDateTime, landingDateTime, passengerCount, imageUrl) {
        this.origin = origin;
        this.destination = destination;
        this.boardingDateTime = boardingDateTime;
        this.landingDateTime = landingDateTime;
        this.passengerCount = passengerCount;
        this.imageUrl = imageUrl;
    }
}