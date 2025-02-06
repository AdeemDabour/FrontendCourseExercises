import { QueryDocumentSnapshot } from "firebase/firestore";
import { Flight } from "./flight";
import { Timestamp } from "@angular/fire/firestore";

export const FlightConverter = {
  toFirestore(flight: Flight) {
    return {
      flightNo: flight.flightNo,
      origin: flight.origin,
      destination: flight.destination,
      boarding: Timestamp.fromDate(flight.boarding), // Assumes it's already a Timestamp
      landing: Timestamp.fromDate(flight.landing),   // Assumes it's already a Timestamp
      seats: flight.seats,
      status: flight.status,
      price: flight.price
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Flight {
    const data = snapshot.data();
    return new Flight(
      snapshot.id, // Use the document ID as the flight ID
      data["flightNo"],
      data["origin"],
      data["destination"],
      this.convertToValidDate(data["boarding"]), // Convert boarding to a valid Date
      this.convertToValidDate(data["landing"]),  // Convert landing to a valid Date
      data["seats"],
      data["status"],
      data["price"] || 0
    );
  },
  convertToValidDate(field: any): Date {
    if (field instanceof Date) {
      return field; // Already a Date object
    } else if (field instanceof Timestamp) {
      return field.toDate(); // Firestore Timestamp object
    } else if (typeof field === 'string') {
      return new Date(field); // ISO string
    } else {
      console.warn('Invalid date field:', field);
      return new Date(0); // Fallback to epoch
    }
  }
};
