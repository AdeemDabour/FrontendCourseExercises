import { FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Booking } from '../model/booking';
import { PassengerConverter } from './passenger-converter';

export const BookingConverter: FirestoreDataConverter<Booking> = {
  toFirestore(booking: Booking) {
    return {
      bookingCode: booking.bookingCode,
      flightNo: booking.flightNo,
      status: booking.status, 
      canceled: booking.canceled ?? false,
      totalPrice: booking.totalPrice || 0, 
      discountPercentage: booking.discountPercentage || 0, 
      finalPrice: booking.finalPrice || (booking.totalPrice * (1 - (booking.discountPercentage || 0) / 100)), 
      passengers: booking.passengers.map(passenger => PassengerConverter.toFirestore(passenger)),
      usedCoupon: booking.usedCoupon || ''
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Booking {
    const data = snapshot.data();
    return new Booking(
      snapshot.id,
      data['bookingCode'],
      data['flightNo'],
      (data['passengers'] || []).map((passengerData: any) => PassengerConverter.fromFirestore({ data: () => passengerData } as QueryDocumentSnapshot)),
      data['status'],
      data['canceled'] ?? false,
      data['totalPrice'] || 0, 
      data['discountPercentage'] || 0, 
      data['finalPrice'] || (data['totalPrice'] * (1 - (data['discountPercentage'] || 0) / 100)), 
      data['usedCoupon'] || ''
    );
  },
};