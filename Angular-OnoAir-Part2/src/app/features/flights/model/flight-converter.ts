import { QueryDocumentSnapshot } from "firebase/firestore";
import { Flight } from "./flight";
import { Timestamp } from "@angular/fire/firestore";

export const FlightConverter = {
  toFirestore(flight: Flight) {
    return {
      flightNo: flight.flightNo,
      origin: flight.origin,
      destination: flight.destination,
      boarding: Timestamp.fromDate(flight.boarding),
      landing: Timestamp.fromDate(flight.landing),
      seats: flight.seats,
      status: flight.status,
      price: flight.price
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Flight {
    const data = snapshot.data();
    return new Flight(
      snapshot.id,
      data["flightNo"],
      data["origin"],
      data["destination"],
      this.convertToValidDate(data["boarding"]),
      this.convertToValidDate(data["landing"]),
      data["seats"],
      data["status"],
      data["price"] || 0
    );
  },
  convertToValidDate(field: any): Date {
    if (field instanceof Date) {
      return field;
    } else if (field instanceof Timestamp) {
      return field.toDate();
    } else if (typeof field === 'string') {
      return new Date(field);
    } else {
      console.warn('Invalid date field:', field);
      return new Date(0);
    }
  }
};