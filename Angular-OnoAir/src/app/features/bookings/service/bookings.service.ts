import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Passenger } from '../model/passenger';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [
    new Booking(
      "ABC123",
      "Tel Aviv",
      "Krakow",
      new Date("2025-07-16 20:00"),
      new Date("2025-07-17 01:00"),
      5,
      [
        new Passenger("Noy Dror", "318733268"),
        new Passenger("Adeem Dabour", "208166744"),
        new Passenger("Idan Elkayam", "286543286"),
        new Passenger("Omer Gold", "435647864"),
        new Passenger("Tom Brown", "234564656")
      ]
    ),
    new Booking(
      "DEF456",
      "Krakow",
      "Larnaca",
      new Date("2024-05-20 20:00"),
      new Date("2024-05-21 02:00"),
      6,
      [
        new Passenger("Noy Dror", "318733268"),
        new Passenger("Adeem Dabour", "208166744"),
        new Passenger("Dana Dabour", "235664466"),
        new Passenger("Dima Dabour", "208976534"),
        new Passenger("Ana Dabour", "857645322"),
        new Passenger("Alice Green", "202454636")
      ]
    ),
    new Booking(
      "GHI789",
      "Paris",
      "New York",
      new Date("2025-10-15 14:00"),
      new Date("2025-10-15 22:00"),
      3,
      [
        new Passenger("Noy Dror", "318733268"),
        new Passenger("Or Dror", "316457834"),
        new Passenger("Ran Dror", "264567893")
      ]
    ),
    new Booking(
      "JKL012",
      "Berlin",
      "Rome",
      new Date("2024-12-10 08:00"),
      new Date("2024-12-10 10:30"),
      2,
      [
        new Passenger("Noy Dror", "318733268"),
        new Passenger("Adeem Dabour", "208166744")
      ]
    ),
    new Booking(
      "MNO345",
      "Tel Aviv",
      "London",
      new Date("2024-03-30 06:00"),
      new Date("2024-03-30 10:30"),
      4,
      [
        new Passenger("Noy Dror", "318733268"),
        new Passenger("Or Dror", "316457834"),
        new Passenger("Ran Dror", "264567893"),
        new Passenger("Amir Dror", "246857965")
      ]
    ),
    new Booking(
      "PQR678",
      "Dubai",
      "Bangkok",
      new Date("2025-01-12 22:00"),
      new Date("2025-01-13 07:30"),
      2,
      [
        new Passenger("John Doe", "1234567890"),
        new Passenger("Jane Smith", "9876543210"),
      ]
    ),
    new Booking(
      "STU901",
      "Zurich",
      "Paris",
      new Date("2024-11-22 09:00"),
      new Date("2024-11-22 12:00"),
      6,
      [
        new Passenger("Noy Dror", "318733268"),
        new Passenger("Or Dror", "316457834"),
        new Passenger("Ran Dror", "264567893"),
        new Passenger("Amir Dror", "246857965"),
        new Passenger("Tom Brown", "208166455"),
        new Passenger("Alice Green", "432565433")
      ]
    ),
    new Booking(
      "VWX234",
      "Rome",
      "Dubai",
      new Date("2025-02-12 15:00"),
      new Date("2025-02-12 22:00"),
      3,
      [
        new Passenger("John Doe", "1234567890"),
        new Passenger("Jane Smith", "9876543210"),
        new Passenger("Bob Johnson", "5555555555")
      ]
    ),
    new Booking(
      "YZA567",
      "Bangkok",
      "Tokyo",
      new Date("2025-06-15 23:30"),
      new Date("2025-06-16 08:00"),
      3,
      [
        new Passenger("John Doe", "1234567890"),
        new Passenger("Jane Smith", "9876543210"),
        new Passenger("Bob Johnson", "5555555555")
      ]
    ),
    new Booking(
      "BCD890",
      "Tokyo",
      "Los Angeles",
      new Date("2025-08-20 10:00"),
      new Date("2025-08-20 17:30"),
      2,
      [
        new Passenger("John Doe", "1234567890"),
        new Passenger("Jane Smith", "9876543210")
      ]
    )
  ];

  constructor() { }

  listBookings(): Booking[] {
    return this.bookings;
  }
  getBookingByCode(bookingCode: string): Booking | undefined {
    return this.bookings.find(booking => booking.bookingCode === bookingCode);
  }
}