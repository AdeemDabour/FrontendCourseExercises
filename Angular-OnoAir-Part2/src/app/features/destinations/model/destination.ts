export class Destination {
    constructor(
        public id: number,
        public name: string,
        public airportName: string,
        public airportWebsite: string,
        public email: string,
        public code: string,
        public imageUrl: string,
        public status: Status //need to make it string before putting it to firebase database since it doesn't catch enum
    ) { }
}
export enum Status {
    Active = 'active',
    Inactive = 'inactive'
  }
  