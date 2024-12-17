import { Injectable } from '@angular/core';

export interface Flight {
  flightNo: string;
  origin: string;
  destination: string;
  boardingDateTime: Date;
  arrivalDateTime: Date;
  seats: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private flights: Flight[] = [
    { flightNo: 'LX8396', origin: 'Larnaca', destination: 'Zurich', boardingDateTime: new Date('2025-12-02 09:00'), arrivalDateTime: new Date('2025-12-02 12:00'), seats: 120 },
    { flightNo: 'AA120', origin: 'Tel Aviv', destination: 'London', boardingDateTime: new Date('2025-12-05 16:00'), arrivalDateTime: new Date('2025-12-05 20:30'), seats: 180 },
    { flightNo: 'EK455', origin: 'Krakow', destination: 'Larnaca', boardingDateTime: new Date('2025-05-20 20:00'), arrivalDateTime: new Date('2025-05-21 02:00'), seats: 250 },
    { flightNo: 'AF2050', origin: 'Paris', destination: 'Tel Aviv', boardingDateTime: new Date('2025-12-06 10:00'), arrivalDateTime: new Date('2025-12-06 16:00'), seats: 200 },
    { flightNo: 'EK203', origin: 'Dubai', destination: 'Tel Aviv', boardingDateTime: new Date('2025-12-07 18:00'), arrivalDateTime: new Date('2025-12-07 22:00'), seats: 250 },
    { flightNo: 'AZ6789', origin: 'Rome', destination: 'New York', boardingDateTime: new Date('2025-12-10 12:00'), arrivalDateTime: new Date('2025-12-10 16:00'), seats: 300 },
    { flightNo: 'UA992', origin: 'Los Angeles', destination: 'Tokyo', boardingDateTime: new Date('2025-12-12 11:00'), arrivalDateTime: new Date('2025-12-12 18:00'), seats: 280 },
    { flightNo: 'AF2099', origin: 'Tel Aviv', destination: 'Paris', boardingDateTime: new Date('2025-12-20 15:00'), arrivalDateTime: new Date('2025-12-20 19:30'), seats: 180 },
    { flightNo: 'LH402', origin: 'Tel Aviv', destination: 'Berlin', boardingDateTime: new Date('2025-12-24 10:00'), arrivalDateTime: new Date('2025-12-24 14:30'), seats: 220 },
    { flightNo: 'W61283', origin: 'Tel Aviv', destination: 'Krakow', boardingDateTime: new Date('2025-12-28 20:00'), arrivalDateTime: new Date('2025-12-29 01:00'), seats: 150 }
  ]

public getFlights(): Flight[] {
  return this.flights;
}

public getFlightByNumber(flightNo: string): Flight | undefined {
  return this.getFlights().find(flight => flight.flightNo === flightNo);
}

};

