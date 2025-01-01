import { Passenger } from "./passenger";

export class Booking {
    constructor(
        public bookingCode: string,
        public flightNo: string,
        public passengers: Passenger[]
    ) { }
}