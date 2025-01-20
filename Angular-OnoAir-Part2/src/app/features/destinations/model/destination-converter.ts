import { QueryDocumentSnapshot } from "firebase/firestore";
import { Destination } from "./destination";

export const destinationConverter = {
  toFirestore(destination: Destination) {
    return {
      name: destination.name,
      airportName: destination.airportName,
      airportWebsite: destination.airportWebsite,
      email: destination.email,
      code: destination.code,
      imageUrl: destination.imageUrl,
      status: destination.status,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Destination {
    const data = snapshot.data();
    return new Destination(
      snapshot.id, // Assign the Firestore document ID
      data['name'],
      data['airportName'],
      data['airportWebsite'],
      data['email'],
      data['code'],
      data['imageUrl'],
      data['status']
    );
  },
};
