import { FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Booking } from '../model/booking';
import { Passenger } from '../model/passenger';

export const BookingConverter: FirestoreDataConverter<Booking> = {
  toFirestore(booking: Booking) {
    return {
      bookingCode: booking.bookingCode,
      flightNo: booking.flightNo,
      status: booking.status,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Booking {
    const data = snapshot.data();
    const passengers: Passenger[] = (data['passengers'] || []).map((passengerData: any) => {
      return new Passenger(passengerData.name, passengerData.passport);
    });
    return new Booking(
      snapshot.id,
      data['bookingCode'],
      data['flightNo'],
      passengers,
      data['status']
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
    return new Passenger(data['name'], data['passport']);
  },
};
