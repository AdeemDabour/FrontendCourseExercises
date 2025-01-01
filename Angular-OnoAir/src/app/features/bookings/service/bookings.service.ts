import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Passenger } from '../model/passenger';
import { FlightsService } from '../../flights/service/flights.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private flightService: FlightsService) { }

  private passengers: Passenger[] = [
    new Passenger("Noy Dror", "318733268"),
    new Passenger("Adeem Dabour", "208166744"),
    new Passenger("Idan Elkayam", "286543286"),
    new Passenger("Omer Gold", "435647864"),
    new Passenger("Tom Brown", "234564656"),
    new Passenger("Dana Dabour", "235664466"),
    new Passenger("Dima Dabour", "208976534"),
    new Passenger("Anna Dabour", "857645322"),
    new Passenger("Alice Green", "202454636"),
    new Passenger("Or Dror", "316457834"),
    new Passenger("Ran Dror", "264567893"),
    new Passenger("Amir Dror", "246857965"),
    new Passenger("John Doe", "1234567890"),
    new Passenger("Jane Smith", "9876543210")
  ];

  private bookings: Booking[] = [
    new Booking("ABC123", "LX1001", [this.passengers[0], this.passengers[1]]),
    new Booking("DEF456", "AA102", [this.passengers[2], this.passengers[3], this.passengers[4]]),
    new Booking("GHI789", "AF203", [this.passengers[4], this.passengers[5], this.passengers[6]]),
    new Booking("JKL012", "EK205", [this.passengers[7], this.passengers[8], this.passengers[9], this.passengers[10]]),
    new Booking("MNO345", "AZ678", [this.passengers[9], this.passengers[10], this.passengers[11], this.passengers[12]]),
    
    new Booking("PQR678", "EK207", [this.passengers[11], this.passengers[12], this.passengers[13]]),
    new Booking("STU901", "QR800", [this.passengers[10], this.passengers[13]]),
    new Booking("VWX234", "EK800", [this.passengers[2], this.passengers[3]]),
    new Booking("YZA567", "LH700", [this.passengers[10], this.passengers[12]]),
    new Booking("BCD890", "FR200", [this.passengers[4], this.passengers[6]])
  ];

  listBookings(): Booking[] {
    return this.bookings;
  }
  getBookingByCode(bookingCode: string): Booking | undefined {
    return this.bookings.find(booking => booking.bookingCode === bookingCode);
  }

  getPassengersByIds(passengerIds: string[]): Passenger[] {
    return this.passengers.filter(passenger => passengerIds.includes(passenger.passport));
  }  

  getFlightDetails(flightNo: string) {
    const flight = this.flightService.getFlightByNumber(flightNo);
    if (!flight) {
      throw new Error(`Flight not found for flight number: ${flightNo}`);
    }
    return flight;
  }
}