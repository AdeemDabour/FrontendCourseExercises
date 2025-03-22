export class Destination {
    constructor(
        public id: string,
        public name: string,
        public airportName: string,
        public airportWebsite: string,
        public email: string,
        public code: string,
        public imageUrl: string,
        public status: Status 
    ) { }
}
export enum Status {
    Active = 'active',
    Inactive = 'inactive'
  }