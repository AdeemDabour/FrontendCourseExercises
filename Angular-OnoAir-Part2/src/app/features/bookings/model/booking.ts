import { Passenger } from "./passenger";

export class Booking {
    constructor(
        public id: string,
        public bookingCode: string,
        public flightNo: string,
        public passengers: Passenger[],
        public status: string,
        public canceled: boolean = false,
        public totalPrice: number = 0,
        public discountPercentage: number = 0,
        public finalPrice: number = 0,
        public usedCoupon: string
    ) { 
        this.finalPrice = this.finalPrice || (this.totalPrice * (1 - this.discountPercentage / 100));
    }
}

export enum Status {
    Active = 'active',
    Inactive = 'inactive'
}