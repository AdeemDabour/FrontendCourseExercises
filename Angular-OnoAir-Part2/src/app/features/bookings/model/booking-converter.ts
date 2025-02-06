import { FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Booking } from '../model/booking';
import { Passenger } from '../model/passenger';

export const BookingConverter: FirestoreDataConverter<Booking> = {
  toFirestore(booking: Booking) {
    return {
      bookingCode: booking.bookingCode,
      flightNo: booking.flightNo,
      status: booking.status, // Exclude passengers; they are in a sub-collection
      canceled: booking.canceled,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Booking {
    const data = snapshot.data();
    return new Booking(
      snapshot.id,
      data['bookingCode'],
      data['flightNo'],
      [], // Passengers will be fetched from the sub-collection
      data['status'],
      data['canceled']
    );
  },
};

export const PassengerConverter: FirestoreDataConverter<Passenger> = {
  toFirestore(passenger: Passenger) {
    return {
      name: passenger.name,
      passport: passenger.passport,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Passenger {
    const data = snapshot.data();
    return new Passenger(data['name'] || '', data['passport'] || ''); // Fallback to avoid undefined issues
  },
};
