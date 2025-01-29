import { Injectable } from '@angular/core';
import { Booking, Status } from '../model/booking';
import { Passenger } from '../model/passenger';
import { FlightsService } from '../../flights/service/flights.service';
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, where, writeBatch } from '@angular/fire/firestore';
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
  async saveBooking(flightNo: string, passengers: Passenger[]): Promise<string> {
    const nextId = await this.getNextBookingId(); // Get the next available ID
    const bookingCode = this.generateBookingCode(); // Generate a unique booking code
  
    // Prepare the booking object
    const booking: Booking = {
      id: nextId.toString(),
      bookingCode,
      flightNo,
      passengers: [], // Passengers will be stored in the sub-collection
      status: 'active' as Status,
    };
  
    try {
      // Save the booking document to the main collection
      const bookingDoc = doc(this.firestore, `${this.bookingsCollection}/${nextId}`).withConverter(BookingConverter);
      await setDoc(bookingDoc, booking);
  
      // Save passengers to the sub-collection
      await this.addPassengersToBooking(nextId.toString(), passengers);
  
      console.log(`Booking saved successfully with ID: ${nextId} and code: ${bookingCode}`);
      return bookingCode; // Return the generated booking code
    } catch (error) {
      console.error('Error saving booking:', error);
      throw new Error('Unable to save booking. Please try again later.');
    }
  }
  
  private async addPassengersToBooking(bookingId: string, passengers: Passenger[]): Promise<void> {
    const passengersCollection = collection(this.firestore, `bookings/${bookingId}/passengers`).withConverter(PassengerConverter);
  
    const batch = writeBatch(this.firestore); // Use a batch for efficient writes
  
    passengers.forEach((passenger) => {
      if (!passenger.passport) {
        console.error(`Passenger is missing a passport ID:`, passenger);
        throw new Error('All passengers must have a valid passport ID.');
      }
  
      const passengerDoc = doc(passengersCollection, passenger.passport); // Use passport as the document ID
      batch.set(passengerDoc, passenger);
    });
  
    await batch.commit(); // Commit all passenger writes in a single batch
  }
  
  
  async getNextBookingId(): Promise<number> {
    try {
      const bookingsCollection = collection(this.firestore, this.bookingsCollection);
      const querySnapshot = await getDocs(bookingsCollection);
  
      // Extract all existing IDs, parse as integers, and find the maximum
      const existingIds = querySnapshot.docs
        .map(doc => parseInt(doc.id, 10))
        .filter(id => !isNaN(id)); // Ensure valid numeric IDs
  
      const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  
      return maxId + 1; // Return the next sequential ID
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
  }
  async getBookingByCode(bookingCode: string): Promise<Booking | null> {
    const collectionRef = collection(this.firestore, this.bookingsCollection).withConverter(BookingConverter);
    const querySnapshot = await getDocs(query(collectionRef, where('bookingCode', '==', bookingCode)));
  
    if (!querySnapshot.empty) {
      const bookingDoc = querySnapshot.docs[0];
      const booking = bookingDoc.data();
  
      // Fetch passengers sub-collection
      const passengersCollection = collection(this.firestore, `${this.bookingsCollection}/${booking.id}/passengers`).withConverter(PassengerConverter);
      const passengersSnapshot = await getDocs(passengersCollection);
  
      booking.passengers = passengersSnapshot.docs.map(doc => doc.data());
  
      return booking;
    } else {
      return null;
    }
  }
  async updateBookingStatus(bookingId: string, status: Status): Promise<void> {
    try {
      const bookingDoc = doc(this.firestore, `${this.bookingsCollection}/${bookingId}`).withConverter(BookingConverter);
      const bookingSnapshot = await getDoc(bookingDoc); // Use getDoc() to fetch the document
  
      if (bookingSnapshot.exists()) {
        const updatedBooking = {
          ...bookingSnapshot.data(), // Extract current data
          status, // Update the status
        };
  
        await setDoc(bookingDoc, updatedBooking); // Save updated booking back to Firestore
        console.log(`Booking ID: ${bookingId} status updated to ${status}`);
      } else {
        console.error(`Booking ID: ${bookingId} does not exist in Firestore.`);
      }
    } catch (error) {
      console.error(`Error updating booking status for ID: ${bookingId}`, error);
      throw new Error('Unable to update booking status. Please try again later.');
    }
  }
  
  
  
}
