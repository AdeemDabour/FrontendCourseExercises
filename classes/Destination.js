// Define a class to represent a destination
export class Destination {
    // Constructor method to initialize destination properties
    constructor(name, airport, website, code, image) {
        this.name = name; // The name of the destination
        this.airport = airport; // The name of the airport at the destination
        this.website = website; // A website URL related to the airport or destination
        this.code = code; // The unique airport code for the destination
        this.image = image; // An image URL representing the destination
    }
}