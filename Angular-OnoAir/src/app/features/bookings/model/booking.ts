export class Booking {
    constructor(
        public bookingCode: string,
        public origin: string,
        public destination: string,
        public boarding: Date,
        public landing: Date,
        public passengerCount: number,
        public passengerIds: string[]
    ) { }
}