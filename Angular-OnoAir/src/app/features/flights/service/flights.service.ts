import { Injectable } from '@angular/core';
import { Flight } from '../model/flight';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private flights: Flight[] = [
    new Flight('LX1001', 'Tel Aviv', 'New York', new Date('2024-04-10 09:00'), new Date('2024-04-10 18:00'), 200),
    new Flight('AA102', 'Dubai', 'Zurich', new Date('2024-05-11 12:00'), new Date('2024-05-11 18:00'), 150),
    new Flight('AF203', 'Paris', 'Rome', new Date('2024-06-12 06:00'), new Date('2024-06-12 12:00'), 180),
    new Flight('EK205', 'Larnaca', 'Tokyo', new Date('2024-07-13 14:00'), new Date('2024-07-14 06:00'), 220),
    new Flight('AZ678', 'Rome', 'Los Angeles', new Date('2024-08-14 10:00'), new Date('2024-08-14 20:00'), 250),
    new Flight('UA999', 'Los Angeles', 'Zurich', new Date('2024-09-08 11:00'), new Date('2024-09-02 23:00'), 280),
    new Flight('LH403', 'Tel Aviv', 'Berlin', new Date('2024-10-03 07:00'), new Date('2024-10-03 14:00'), 220),
    new Flight('UA854', 'Zurich', 'Larnaca', new Date('2024-11-04 10:00'), new Date('2024-11-04 15:00'), 260),
    new Flight('LH439', 'Tel Aviv', 'Paris', new Date('2024-12-05 08:00'), new Date('2024-12-05 12:00'), 240),
    new Flight('EK206', 'Dubai', 'Krakow', new Date('2024-12-06 09:00'), new Date('2024-12-06 01:00'), 250),
    new Flight('TK300', 'Istanbul', 'Tokyo', this.generateFutureDate(1, 9), this.generateFutureDate(1, 12), 600),
    new Flight('LX8396', 'Larnaca', 'Zurich', this.generateFutureDate(1, 10), this.generateFutureDate(1, 14), 120),
    new Flight('AF2050', 'Paris', 'Tel Aviv', this.generateFutureDate(2, 14), this.generateFutureDate(2, 20), 200),
    new Flight('EK203', 'Dubai', 'Krakow', this.generateFutureDate(2, 20), this.generateFutureDate(2, 23), 250),
    new Flight('AZ6789', 'Rome', 'New York', this.generateFutureDate(3, 14), this.generateFutureDate(3, 16), 300),
    new Flight('EK207', 'Dubai', 'Paris', this.generateFutureDate(4, 18), this.generateFutureDate(4, 22), 200),
    new Flight('LH501', 'Berlin', 'Rome', this.generateFutureDate(4, 13), this.generateFutureDate(4, 20), 120),
    new Flight('BA305', 'London', 'Berlin', this.generateFutureDate(4, 19), this.generateFutureDate(4, 23), 300),
    new Flight('AF450', 'Paris', 'Dubai', this.generateFutureDate(5, 17), this.generateFutureDate(5, 21), 400),
    new Flight('EK300', 'Dubai', 'London', this.generateFutureDate(5, 18), this.generateFutureDate(5, 21), 600),
    new Flight('AA400', 'Chicago', 'Los Angeles', this.generateFutureDate(8, 14), this.generateFutureDate(8, 17), 250),
    new Flight('DL300', 'New York', 'Larnaca', this.generateFutureDate(20, 12), this.generateFutureDate(20, 16), 450),
    new Flight('QR800', 'Doha', 'Tokyo', this.generateFutureDate(24, 10), this.generateFutureDate(24, 14), 700),
    new Flight('AA500', 'Chicago', 'Los Angeles', this.generateFutureDate(26, 6), this.generateFutureDate(26, 10), 150),
    new Flight('EK800', 'Dubai', 'Rome', this.generateFutureDate(30, 8), this.generateFutureDate(30, 13), 250),
    new Flight('BA700', 'London', 'Dubai', this.generateFutureDate(34, 16), this.generateFutureDate(34, 21), 400),
    new Flight('AF700', 'Paris', 'Tel Aviv', this.generateFutureDate(38, 17), this.generateFutureDate(38, 22), 250),
    new Flight('LH700', 'Berlin', 'Dubai', this.generateFutureDate(46, 15), this.generateFutureDate(46, 23), 300),
    new Flight('QR500', 'Doha', 'Zurich', this.generateFutureDate(54, 16), this.generateFutureDate(54, 20), 200),
    new Flight('FR200', 'Zurich', 'Paris', this.generateFutureDate(62, 6), this.generateFutureDate(62, 11), 120)
  ];

  constructor() { }

  listFlights(): Flight[] {
    return this.flights;
  }

  getFlightByNumber(flightNo: string): Flight | undefined {
    return this.flights.find(flight => flight.flightNo === flightNo);
  }

  getFlightsThisWeek(): Flight[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    return this.flights.filter(flight =>
      flight.boarding >= today && flight.boarding <= endOfWeek
    );
  }
  
  private generateFutureDate(daysFromNow: number, hour: number): Date {
    const today = new Date();
    const futureDate = new Date(today);
  
    futureDate.setDate(today.getDate() + daysFromNow);
  
    futureDate.setHours(hour, 0, 0, 0);
  
    return futureDate;
  }  
}