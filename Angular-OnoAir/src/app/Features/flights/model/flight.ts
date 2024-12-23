export class Flight {
    constructor(
        public flightNo: string,
        public origin: string,
        public destination: string,
        public boarding: Date,
        public landing: Date,
        public seats: number,
        public imageUrl?: string
    ) { }
}