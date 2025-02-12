export class Luggage {
    constructor(
        public type: 'Cabin' | 'Checked' | 'Heavy',
        public weight: number,
        public quantity: number
    ) { }
}