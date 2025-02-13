import { FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Passenger } from '../model/passenger';

export const PassengerConverter: FirestoreDataConverter<Passenger> = {
  toFirestore(passenger: Passenger) {
    return {
      name: passenger.name || '',
      passport: passenger.passport || '',
      luggage: passenger.luggage || { cabin: 0, checked: 0, heavy: 0 }
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Passenger {
    const data = snapshot.data();
    return new Passenger(
      String(data['name'] || ''),
      String(data['passport'] || ''),
      data['luggage'] || { cabin: 0, checked: 0, heavy: 0 }
    );
  }  
};