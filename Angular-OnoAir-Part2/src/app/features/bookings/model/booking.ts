import { Passenger } from "./passenger";

export class Booking {
    constructor(
        public id: string,
        public bookingCode: string,
        public flightNo: string,
        public passengers: Passenger[],
        public status: Status
    ) { }
}
export enum Status {
    Active = 'active',
    Inactive = 'inactive'
  }