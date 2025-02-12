import { Injectable } from '@angular/core';
import { Booking, Status } from '../model/booking';
import { Passenger } from '../model/passenger';
import { FlightsService } from '../../flights/service/flights.service';
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, where, writeBatch } from '@angular/fire/firestore';
import { BookingConverter } from '../model/booking-converter';
import { PassengerConverter } from '../model/passenger-converter';

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
    
    return querySnapshot.docs.map((doc) => {
      const passengerData = doc.data();
      return new Passenger(
        String(passengerData.name || ''),
        String(passengerData.passport || ''),
        passengerData.luggage || { cabin: 0, checked: 0, heavy: 0 }
      );
    });
  }
  

  getFlightDetails(flightNo: string) {
    const flight = this.flightService.getFlightByNumber(flightNo);
    if (!flight) {
      throw new Error(`Flight not found for flight number: ${flightNo}`);
    }
    return flight;
  }

  async saveBooking(flightNo: string, passengers: Passenger[], totalPrice: number, discountPercentage: number, finalPrice: number): Promise<string> {
    const nextId = await this.getNextBookingId();
    const bookingCode = this.generateBookingCode(); 
  
    const booking: Booking = {
      id: nextId.toString(),
      bookingCode,
      flightNo,
      passengers: [],
      status: 'active' as Status,
      canceled: false,
      totalPrice,
      discountPercentage,
      finalPrice
    };
  
    try {
      const bookingDoc = doc(this.firestore, `${this.bookingsCollection}/${nextId}`).withConverter(BookingConverter);
      await setDoc(bookingDoc, booking);
  
      await this.addPassengersToBooking(nextId.toString(), passengers);
  
      console.log(`Booking saved successfully with ID: ${nextId} and code: ${bookingCode}`);
      return bookingCode;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw new Error('Unable to save booking. Please try again later.');
    }
  }
  
  private async addPassengersToBooking(bookingId: string, passengers: Passenger[]): Promise<void> {
    const passengersCollection = collection(this.firestore, `bookings/${bookingId}/passengers`).withConverter(PassengerConverter);

    const batch = writeBatch(this.firestore);

    passengers.forEach((passenger) => {
      if (!passenger.passport) {
        console.error(`Passenger is missing a passport ID:`, passenger);
        throw new Error('All passengers must have a valid passport ID.');
      }

      const passengerDoc = doc(passengersCollection, passenger.passport);
      batch.set(passengerDoc, passenger);
    });

    await batch.commit();
  }

  async getNextBookingId(): Promise<number> {
    try {
      const bookingsCollection = collection(this.firestore, this.bookingsCollection);
      const querySnapshot = await getDocs(bookingsCollection);

      // Extract all existing IDs, parse as integers, and find the maximum
      const existingIds = querySnapshot.docs
        .map(doc => parseInt(doc.id, 10))
        .filter(id => !isNaN(id));

      const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;

      return maxId + 1;
    } catch (error) {
      console.error('Error fetching booking IDs:', error);
      throw new Error('Unable to determine the next booking ID.');
    }
  }

  private generateBookingCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('');
  }async getBookingByCode(bookingCode: string): Promise<Booking | null> {
    const collectionRef = collection(this.firestore, this.bookingsCollection).withConverter(BookingConverter);
    const querySnapshot = await getDocs(query(collectionRef, where('bookingCode', '==', bookingCode)));
  
    if (!querySnapshot.empty) {
      const bookingDoc = querySnapshot.docs[0];
      const booking = bookingDoc.data();
  
      // Fetch passengers sub-collection
      const passengersCollection = collection(this.firestore, `${this.bookingsCollection}/${booking.id}/passengers`).withConverter(PassengerConverter);
      const passengersSnapshot = await getDocs(passengersCollection);
  
      booking.passengers = passengersSnapshot.docs.map(doc => {
        const passengerData = doc.data();
        return new Passenger(
          String(passengerData.name || ''),
          String(passengerData.passport || ''),
          passengerData.luggage || { cabin: 0, checked: 0, heavy: 0 }
        );
      });
  
      return booking;
    } else {
      return null;
    }
  }
  
  async updateBooking(bookingId: string, updatedBooking: Partial<Booking>): Promise<void> {
    try {
      const bookingDoc = doc(this.firestore, `${this.bookingsCollection}/${bookingId}`).withConverter(BookingConverter);
      const bookingSnapshot = await getDoc(bookingDoc);

      if (bookingSnapshot.exists()) {
        // Merge the existing booking data with the updated fields
        const newBookingData = {
          ...bookingSnapshot.data(),
          ...updatedBooking,
        };
        newBookingData.canceled = newBookingData.canceled ?? false;

        await setDoc(bookingDoc, newBookingData);
        console.log(`Booking ID: ${bookingId} updated successfully.`);
      } else {
        console.error(`Booking ID: ${bookingId} does not exist in Firestore.`);
      }
    } catch (error) {
      console.error(`Error updating booking for ID: ${bookingId}`, error);
      throw new Error('Unable to update booking. Please try again later.');
    }
  }

  async getActiveBookingsForFlight(flightNo: string): Promise<{ bookingCode: string }[]> {
    try {
      const bookings = await this.listBookings();
      return bookings
        .filter(booking => booking.flightNo === flightNo && booking.status === Status.Active)
        .map(booking => ({ bookingCode: booking.bookingCode }));

    } catch (error) {
      console.error('Error fetching active bookings:', error);
      throw error;
    }
  }
}