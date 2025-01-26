import { Injectable } from '@angular/core';
import { Booking, Status } from '../model/booking';
import { Passenger } from '../model/passenger';
import { FlightsService } from '../../flights/service/flights.service';
import { collection, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { BookingConverter, PassengerConverter } from '../model/booking-converter';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsCollection = 'bookings';
  constructor(private flightService: FlightsService, private firestore: Firestore) { }
  
  async listBookings(): Promise<Booking[]> {
    const collectionRef = collection(this.firestore, this.bookingsCollection).withConverter(BookingConverter);
    const querySnapshot = await getDocs(collectionRef);

    // Fetch passengers for each booking
    const bookings: Booking[] = [];
    for (const doc of querySnapshot.docs) {
      const booking = doc.data();
      booking.passengers = await this.fetchPassengersForBooking(booking.id);
      bookings.push(booking);
    }
    return bookings;
  }
  private async fetchPassengersForBooking(bookingId: string): Promise<Passenger[]> {
    const passengersCollection = collection(
      this.firestore,
      `${this.bookingsCollection}/${bookingId}/passengers`
    ).withConverter(PassengerConverter);
    const querySnapshot = await getDocs(passengersCollection);

    return querySnapshot.docs.map((doc) => doc.data());
  }

  getFlightDetails(flightNo: string) {
    const flight = this.flightService.getFlightByNumber(flightNo);
    if (!flight) {
      throw new Error(`Flight not found for flight number: ${flightNo}`);
    }
    return flight;
  }
}
