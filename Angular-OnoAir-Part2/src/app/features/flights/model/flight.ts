export class Flight {
  constructor(
    public id: string,
    public flightNo: string,
    public origin: string,
    public destination: string,
    public boarding: Date,
    public landing: Date,
    public seats: string,
    public status: Status,
    public price: number
  ) {}
}

export enum Status {
  Active = 'active',
  Inactive = 'inactive'
}