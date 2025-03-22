// Define a class to represent a flight
export class Flight {
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