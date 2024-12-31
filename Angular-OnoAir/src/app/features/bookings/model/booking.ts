export class Booking {
    constructor(
        public bookingCode: string,
        public flightNo: string,
        public passengerCount: number,
        public passengerIds: string[]
    ) { }
}