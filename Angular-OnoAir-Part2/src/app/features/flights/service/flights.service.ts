import { Injectable } from '@angular/core';
import { Flight, Status } from '../model/flight';
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
    new Flight('1', 'LX1001', 'Tel Aviv', 'New York', new Date('2024-04-10 09:00'), new Date('2024-04-10 18:00'), '200', Status.Active),
    new Flight('2', 'AA102', 'Dubai', 'Zurich', new Date('2024-05-11 12:00'), new Date('2024-05-11 18:00'), '150', Status.Active),
    new Flight('3', 'AF203', 'Paris', 'Rome', new Date('2024-06-12 06:00'), new Date('2024-06-12 12:00'), '180', Status.Active),
    new Flight('4', 'EK205', 'Larnaca', 'Tokyo', new Date('2024-07-13 14:00'), new Date('2024-07-14 06:00'), '220', Status.Active),
    new Flight('5', 'AZ678', 'Rome', 'Los Angeles', new Date('2024-08-14 10:00'), new Date('2024-08-14 20:00'), '250', Status.Active),
    new Flight('6', 'UA999', 'Los Angeles', 'Madrid', new Date('2024-09-08 11:00'), new Date('2024-09-02 23:00'), '280', Status.Active),
    new Flight('7', 'LH403', 'Tel Aviv', 'Berlin', new Date('2024-10-03 07:00'), new Date('2024-10-03 14:00'), '220', Status.Active),
    new Flight('8', 'UA854', 'Zurich', 'Larnaca', new Date('2024-11-04 10:00'), new Date('2024-11-04 15:00'), '260', Status.Active),
    new Flight('9', 'LH439', 'Miami', 'Paris', new Date('2024-12-05 08:00'), new Date('2024-12-05 12:00'), '240', Status.Active),
    new Flight('10', 'EK206', 'Dubai', 'Krakow', new Date('2024-12-06 09:00'), new Date('2024-12-06 01:00'), '250', Status.Active),
    new Flight('11', 'TK300', 'Berlin', 'San Francisco', this.generateFutureDate(1, 9), this.generateFutureDate(1, 12), '600', Status.Active),
    new Flight('12', 'LX8396', 'Larnaca', 'Zurich', this.generateFutureDate(1, 10), this.generateFutureDate(1, 14), '120', Status.Active),
    new Flight('13', 'AF2050', 'Paris', 'Tel Aviv', this.generateFutureDate(2, 14), this.generateFutureDate(2, 20), '200', Status.Active),
    new Flight('14', 'EK203', 'Dubai', 'Krakow', this.generateFutureDate(2, 20), this.generateFutureDate(2, 23), '250', Status.Active),
    new Flight('15', 'AZ6789', 'Rome', 'New York', this.generateFutureDate(3, 14), this.generateFutureDate(3, 16), '300', Status.Active),
    new Flight('16', 'EK207', 'Dubai', 'Paris', this.generateFutureDate(4, 18), this.generateFutureDate(4, 22), '200', Status.Active),
    new Flight('17', 'LH501', 'Berlin', 'Rome', this.generateFutureDate(4, 13), this.generateFutureDate(4, 20), '120', Status.Active),
    new Flight('18', 'BA305', 'London', 'Berlin', this.generateFutureDate(4, 19), this.generateFutureDate(4, 23), '300', Status.Active),
    new Flight('19', 'AF450', 'Paris', 'Dubai', this.generateFutureDate(5, 17), this.generateFutureDate(5, 21), '400', Status.Active),
    new Flight('20', 'EK300', 'Dubai', 'London', this.generateFutureDate(5, 18), this.generateFutureDate(5, 21), '600', Status.Active),
    new Flight('21', 'AA400', 'Chicago', 'Los Angeles', this.generateFutureDate(8, 14), this.generateFutureDate(8, 17), '250', Status.Active),
    new Flight('22', 'DL300', 'New York', 'Lisbon', this.generateFutureDate(20, 12), this.generateFutureDate(20, 16), '450', Status.Active),
    new Flight('23', 'QR800', 'Doha', 'Tokyo', this.generateFutureDate(24, 10), this.generateFutureDate(24, 14), '700', Status.Active),
    new Flight('24', 'AA500', 'Chicago', 'Los Angeles', this.generateFutureDate(26, 6), this.generateFutureDate(26, 10), '150', Status.Active),
    new Flight('25', 'EK800', 'Dubai', 'Rome', this.generateFutureDate(30, 8), this.generateFutureDate(30, 13), '250', Status.Active),
    new Flight('26', 'BA700', 'London', 'Singapore', this.generateFutureDate(34, 16), this.generateFutureDate(34, 21), '400', Status.Active),
    new Flight('27', 'AF700', 'Paris', 'Tel Aviv', this.generateFutureDate(38, 17), this.generateFutureDate(38, 22), '250', Status.Active),
    new Flight('28', 'LH700', 'Berlin', 'Istanbul', this.generateFutureDate(46, 15), this.generateFutureDate(46, 23), '300', Status.Active),
    new Flight('29', 'QR500', 'Doha', 'Bangkok', this.generateFutureDate(54, 16), this.generateFutureDate(54, 20), '200', Status.Active),
    new Flight('30', 'FR200', 'Zurich', 'Dallas', this.generateFutureDate(62, 6), this.generateFutureDate(62, 11), '120', Status.Active)
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

  removeFlight(id: string): void {
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
  
  CreateUniqueId(): string {
    if (this.flights.length === 0) {
      return '1'; // Return '1' as the first ID
    }
  
    // Convert string IDs to numbers, find the max, and increment
    const maxId = Math.max(
      ...this.flights
        .map(flight => parseInt(flight.id, 10)) // Convert string to number
        .filter(id => !isNaN(id)) // Filter out invalid numbers
    );
  
    return (maxId + 1).toString(); // Increment and convert back to string
  }
  

  addFlight(flight: Flight): void {
    if (!flight.id || flight.id === '0') {
      flight.id = this.CreateUniqueId();
    }
    this.flights.push(flight);
    this.saveToLocalStorage();
  }

  getLastAddedId(): number {
    return this.lastAddedId;
  }
}