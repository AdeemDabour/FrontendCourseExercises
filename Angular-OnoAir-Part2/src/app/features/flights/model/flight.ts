import { Timestamp } from 'firebase/firestore';

export class Flight {
  constructor(
    public id: string,
    public flightNo: string,
    public origin: string,
    public destination: string,
    public boarding: Timestamp,
    public landing: Timestamp,
    public seats: string,
    public status: Status
  ) {}
}

export enum Status {
  Active = 'active',
  Inactive = 'inactive'
}