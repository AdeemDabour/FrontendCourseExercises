import { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";
import { Flight, Status } from "./flight";

export const FlightConverter: FirestoreDataConverter<Flight> = {
  toFirestore(flight: Flight) {
    return {
      flightNo: flight.flightNo,
      origin: flight.origin,
      destination: flight.destination,
      boarding: flight.boarding, // Assumes it's already a Timestamp
      landing: flight.landing,   // Assumes it's already a Timestamp
      seats: flight.seats,
      status: flight.status,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Flight {
    const data = snapshot.data();
    return new Flight(
      snapshot.id, // Use the document ID as the flight ID
      data["flightNo"],
      data["origin"],
      data["destination"],
      data["boarding"],
      data["landing"],
      data["seats"],
      data["status"]
    );
  },
};
