import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Passenger } from '../model/passenger';
import { FlightsService } from '../../flights/service/flights.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private flightService: FlightsService) { }

  private passengers: Map<string, Passenger> = new Map([
    ["318733268", new Passenger("Noy Dror", "318733268")],
    ["208166744", new Passenger("Adeem Dabour", "208166744")],
    ["286543286", new Passenger("Idan Elkayam", "286543286")],
    ["435647864", new Passenger("Omer Gold", "435647864")],
    ["234564656", new Passenger("Tom Brown", "234564656")],
    ["235664466", new Passenger("Dana Dabour", "235664466")],
    ["208976534", new Passenger("Dima Dabour", "208976534")],
    ["857645322", new Passenger("Ana Dabour", "857645322")],
    ["202454636", new Passenger("Alice Green", "202454636")],
    ["316457834", new Passenger("Or Dror", "316457834")],
    ["264567893", new Passenger("Ran Dror", "264567893")],
    ["246857965", new Passenger("Amir Dror", "246857965")],
    ["1234567890", new Passenger("John Doe", "1234567890")],
    ["9876543210", new Passenger("Jane Smith", "9876543210")],
  ]);

  private bookings: Booking[] = [
    new Booking("ABC123", "LX1001", 5, ["318733268", "208166744", "286543286", "435647864", "234564656"]),
    new Booking("DEF456", "AA102", 6, ["318733268", "208166744", "235664466", "208976534", "857645322", "202454636"]),
    new Booking("GHI789", "AF203", 3, ["318733268", "316457834", "264567893"]),
    new Booking("JKL012", "EK205", 2, ["318733268", "208166744"]),
    new Booking("MNO345", "AZ678", 4, ["318733268", "316457834", "264567893", "246857965"]),
    new Booking("PQR678", "EK206", 2, ["1234567890", "9876543210"]),
    new Booking("STU901", "AZ6789", 6, ["318733268", "316457834", "264567893", "246857965", "208166455", "432565433"]),
    new Booking("VWX234", "LH438", 3, ["1234567890", "9876543210", "246857965"]),
    new Booking("YZA567", "AF450", 3, ["1234567890", "9876543210", "246857965"]),
    new Booking("BCD890", "BA800", 2, ["1234567890", "9876543210"])
  ];

  listBookings(): Booking[] {
    return this.bookings;
  }
  getBookingByCode(bookingCode: string): Booking | undefined {
    return this.bookings.find(booking => booking.bookingCode === bookingCode);
  }

  getPassengersByIds(passengerIds: string[]): Passenger[] {
    return passengerIds
      .map(id => this.passengers.get(id))
      .filter((passenger): passenger is Passenger => !!passenger);
  }

  getFlightDetails(flightNo: string) {
    const flight = this.flightService.getFlightByNumber(flightNo);
    if (!flight) {
        throw new Error(`Flight not found for flight number: ${flightNo}`);
    }
    return flight;
  }
}