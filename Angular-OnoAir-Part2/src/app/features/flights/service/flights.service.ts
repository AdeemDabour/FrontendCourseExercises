import { Injectable } from '@angular/core';
import { Flight } from '../model/flight';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private readonly DESTINATIONS = {
    TEL_AVIV: 'Tel Aviv', NEW_YORK: 'New York', DUBAI: 'Dubai', ZURICH: 'Zurich', PARIS: 'Paris', ROME: 'Rome', LOS_ANGELES: 'Los Angeles',
    TOKYO: 'Tokyo', BERLIN: 'Berlin', CHICAGO: 'Chicago', DOHA: 'Doha', LARNACA: 'Larnaca', LONDON: 'London', KRK: 'Krakow', BANGKOK: 'Bangkok',
    LISBON: 'Lisbon', SAN_FRANCISCO: 'San Francisco', DALLAS: 'Dallas', MIAMI: 'Miami', ISTANBUL: 'Istanbul', SINGAPORE: 'Singapore', MADRID: 'Madrid'
  };
  
  private flights: Flight[] = this.loadFromLocalStorage() || [
    new Flight(1, 'LX1001', this.DESTINATIONS.TEL_AVIV, this.DESTINATIONS.NEW_YORK, new Date('2024-04-10 09:00'), new Date('2024-04-10 18:00'), 200),
    new Flight(2, 'AA102', this.DESTINATIONS.DUBAI, this.DESTINATIONS.ZURICH, new Date('2024-05-11 12:00'), new Date('2024-05-11 18:00'), 150),
    new Flight(3, 'AF203', this.DESTINATIONS.PARIS, this.DESTINATIONS.ROME, new Date('2024-06-12 06:00'), new Date('2024-06-12 12:00'), 180),
    new Flight(4, 'EK205', this.DESTINATIONS.LARNACA, this.DESTINATIONS.TOKYO, new Date('2024-07-13 14:00'), new Date('2024-07-14 06:00'), 220),
    new Flight(5, 'AZ678', this.DESTINATIONS.ROME, this.DESTINATIONS.LOS_ANGELES, new Date('2024-08-14 10:00'), new Date('2024-08-14 20:00'), 250),
    new Flight(6, 'UA999', this.DESTINATIONS.LOS_ANGELES, this.DESTINATIONS.MADRID, new Date('2024-09-08 11:00'), new Date('2024-09-02 23:00'), 280),
    new Flight(7, 'LH403', this.DESTINATIONS.TEL_AVIV, this.DESTINATIONS.BERLIN, new Date('2024-10-03 07:00'), new Date('2024-10-03 14:00'), 220),
    new Flight(8, 'UA854', this.DESTINATIONS.ZURICH, this.DESTINATIONS.LARNACA, new Date('2024-11-04 10:00'), new Date('2024-11-04 15:00'), 260),
    new Flight(9, 'LH439', this.DESTINATIONS.MIAMI, this.DESTINATIONS.PARIS, new Date('2024-12-05 08:00'), new Date('2024-12-05 12:00'), 240),
    new Flight(10, 'EK206', this.DESTINATIONS.DUBAI, this.DESTINATIONS.KRK, new Date('2024-12-06 09:00'), new Date('2024-12-06 01:00'), 250),
    new Flight(11, 'TK300', this.DESTINATIONS.BERLIN, this.DESTINATIONS.SAN_FRANCISCO, this.generateFutureDate(1, 9), this.generateFutureDate(1, 12), 600),
    new Flight(12, 'LX8396', this.DESTINATIONS.LARNACA, this.DESTINATIONS.ZURICH, this.generateFutureDate(1, 10), this.generateFutureDate(1, 14), 120),
    new Flight(13, 'AF2050', this.DESTINATIONS.PARIS, this.DESTINATIONS.TEL_AVIV, this.generateFutureDate(2, 14), this.generateFutureDate(2, 20), 200),
    new Flight(14, 'EK203', this.DESTINATIONS.DUBAI, this.DESTINATIONS.KRK, this.generateFutureDate(2, 20), this.generateFutureDate(2, 23), 250),
    new Flight(15, 'AZ6789', this.DESTINATIONS.ROME, this.DESTINATIONS.NEW_YORK, this.generateFutureDate(3, 14), this.generateFutureDate(3, 16), 300),
    new Flight(16, 'EK207', this.DESTINATIONS.DUBAI, this.DESTINATIONS.PARIS, this.generateFutureDate(4, 18), this.generateFutureDate(4, 22), 200),
    new Flight(17, 'LH501', this.DESTINATIONS.BERLIN, this.DESTINATIONS.ROME, this.generateFutureDate(4, 13), this.generateFutureDate(4, 20), 120),
    new Flight(18, 'BA305', this.DESTINATIONS.LONDON, this.DESTINATIONS.BERLIN, this.generateFutureDate(4, 19), this.generateFutureDate(4, 23), 300),
    new Flight(19, 'AF450', this.DESTINATIONS.PARIS, this.DESTINATIONS.DUBAI, this.generateFutureDate(5, 17), this.generateFutureDate(5, 21), 400),
    new Flight(20, 'EK300', this.DESTINATIONS.DUBAI, this.DESTINATIONS.LONDON, this.generateFutureDate(5, 18), this.generateFutureDate(5, 21), 600),
    new Flight(21, 'AA400', this.DESTINATIONS.CHICAGO, this.DESTINATIONS.LOS_ANGELES, this.generateFutureDate(8, 14), this.generateFutureDate(8, 17), 250),
    new Flight(22, 'DL300', this.DESTINATIONS.NEW_YORK, this.DESTINATIONS.LISBON, this.generateFutureDate(20, 12), this.generateFutureDate(20, 16), 450),
    new Flight(23, 'QR800', this.DESTINATIONS.DOHA, this.DESTINATIONS.TOKYO, this.generateFutureDate(24, 10), this.generateFutureDate(24, 14), 700),
    new Flight(24, 'AA500', this.DESTINATIONS.CHICAGO, this.DESTINATIONS.LOS_ANGELES, this.generateFutureDate(26, 6), this.generateFutureDate(26, 10), 150),
    new Flight(25, 'EK800', this.DESTINATIONS.DUBAI, this.DESTINATIONS.ROME, this.generateFutureDate(30, 8), this.generateFutureDate(30, 13), 250),
    new Flight(26, 'BA700', this.DESTINATIONS.LONDON, this.DESTINATIONS.SINGAPORE, this.generateFutureDate(34, 16), this.generateFutureDate(34, 21), 400),
    new Flight(27, 'AF700', this.DESTINATIONS.PARIS, this.DESTINATIONS.TEL_AVIV, this.generateFutureDate(38, 17), this.generateFutureDate(38, 22), 250),
    new Flight(28, 'LH700', this.DESTINATIONS.BERLIN, this.DESTINATIONS.ISTANBUL, this.generateFutureDate(46, 15), this.generateFutureDate(46, 23), 300),
    new Flight(29, 'QR500', this.DESTINATIONS.DOHA, this.DESTINATIONS.BANGKOK, this.generateFutureDate(54, 16), this.generateFutureDate(54, 20), 200),
    new Flight(30, 'FR200', this.DESTINATIONS.ZURICH, this.DESTINATIONS.DALLAS, this.generateFutureDate(62, 6), this.generateFutureDate(62, 11), 120)
  ];

  constructor() { }

  private lastAddedId: number = 0;


  private saveToLocalStorage(): void {
    localStorage.setItem('flights', JSON.stringify(this.flights));
  }

  private loadFromLocalStorage(): Flight[] | null {
    const data = localStorage.getItem('flights');
    return data ? JSON.parse(data) : null;
  }

  listFlights(): Flight[] {
    return this.flights;
  }

  removeFlight(id: number): void {
    this.flights = this.flights.filter(flight => flight.id !== id);
    this.saveToLocalStorage();
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
  
  CreateUniqueId(): number {
    return this.flights.length > 0
    ? Math.max(...this.flights.map(flight => flight.id)) + 1
    : 1;
  }

  addFlight(flight: Flight): void {
    if (!flight.id || flight.id === 0) {
      flight.id = this.CreateUniqueId();
    }
    this.flights.push(flight);
    this.saveToLocalStorage();
  }

  getLastAddedId(): number {
    return this.lastAddedId;
  }
}