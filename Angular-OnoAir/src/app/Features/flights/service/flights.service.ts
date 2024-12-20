import { Injectable } from '@angular/core';
import { DestinationService } from '../../destinations/service/destinations.service';
import { Flight } from '../model/flight';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private flights: Flight[] = [
    { flightNo: 'LX1001', origin: 'Tel Aviv', destination: 'New York', boarding: new Date('2024-12-10 09:00'), landing: new Date('2024-12-10 18:00'), seats: 200 },
    { flightNo: 'AA102', origin: 'Dubai', destination: 'Zurich', boarding: new Date('2024-12-11 12:00'), landing: new Date('2024-12-11 18:00'), seats: 150 },
    { flightNo: 'AF203', origin: 'Paris', destination: 'Rome', boarding: new Date('2024-12-12 06:00'), landing: new Date('2024-12-12 12:00'), seats: 180 },
    { flightNo: 'EK205', origin: 'Larnaca', destination: 'Tokyo', boarding: new Date('2024-12-13 14:00'), landing: new Date('2024-12-14 06:00'), seats: 220 },
    { flightNo: 'AZ678', origin: 'Rome', destination: 'Los Angeles', boarding: new Date('2024-12-14 10:00'), landing: new Date('2024-12-14 20:00'), seats: 250 },
    { flightNo: 'UA999', origin: 'Los Angeles', destination: 'Zurich', boarding: new Date('2024-12-15 11:00'), landing: new Date('2024-12-15 23:00'), seats: 280 },
    { flightNo: 'LH403', origin: 'Tel Aviv', destination: 'Berlin', boarding: new Date('2024-12-16 07:00'), landing: new Date('2024-12-16 14:00'), seats: 220 },
    { flightNo: 'UA854', origin: 'Zurich', destination: 'Larnaca', boarding: new Date('2024-12-17 10:00'), landing: new Date('2024-12-17 15:00'), seats: 260 },
    { flightNo: 'LH439', origin: 'Tel Aviv', destination: 'Paris', boarding: new Date('2024-12-18 08:00'), landing: new Date('2024-12-18 12:00'), seats: 240 },
    { flightNo: 'EK206', origin: 'Dubai', destination: 'Krakow', boarding: new Date('2024-12-18 18:00'), landing: new Date('2024-12-20 01:00'), seats: 250 },
    { flightNo: 'LX8396', origin: 'Larnaca', destination: 'Zurich', boarding: new Date('2024-12-19 09:00'), landing: new Date('2024-12-21 12:00'), seats: 120 },
    { flightNo: 'AA120', origin: 'Tel Aviv', destination: 'Dubai', boarding: new Date('2024-12-21 16:00'), landing: new Date('2024-12-21 20:30'), seats: 180 },
    { flightNo: 'AF2050', origin: 'Paris', destination: 'Tel Aviv', boarding: new Date('2024-12-21 10:00'), landing: new Date('2024-12-21 16:00'), seats: 200 },
    { flightNo: 'EK203', origin: 'Dubai', destination: 'Krakow', boarding: new Date('2024-12-21 18:00'), landing: new Date('2024-12-22 22:00'), seats: 250 },
    { flightNo: 'AZ6789', origin: 'Rome', destination: 'New York', boarding: new Date('2024-12-21 12:00'), landing: new Date('2024-12-22 16:00'), seats: 300 },
    { flightNo: 'UA992', origin: 'Los Angeles', destination: 'Tokyo', boarding: new Date('2024-12-21 11:00'), landing: new Date('2024-12-23 18:00'), seats: 280 },
    { flightNo: 'LH402', origin: 'Tel Aviv', destination: 'Berlin', boarding: new Date('2024-12-21 10:00'), landing: new Date('2024-12-24 14:30'), seats: 220 },
    { flightNo: 'UA852', origin: 'Los Angeles', destination: 'Larnaca', boarding: new Date('2024-12-21 11:00'), landing: new Date('2024-12-24 18:00'), seats: 260 },
    { flightNo: 'LH438', origin: 'Tel Aviv', destination: 'Los Angeles', boarding: new Date('2024-12-22 10:00'), landing: new Date('2024-12-24 14:30'), seats: 240 },
    { flightNo: 'EK207', origin: 'Dubai', destination: 'Zurich', boarding: new Date('2024-12-24 08:00'), landing: new Date('2024-12-24 13:00'), seats: 200 },
  ];
  constructor(private destinationService: DestinationService) {
    this.addImageUrlsToFlights();
  }

  public getFlights(): Flight[] {
    return this.flights;
  }

  public getFlightByNumber(flightNo: string): Flight | undefined {
    return this.flights.find(flight => flight.flightNo === flightNo);
  }

  public getFlightsThisWeek(): Flight[] {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

    return this.flights.filter(flight =>
      flight.boarding >= today && flight.boarding <= endOfWeek
    );
  }
  private addImageUrlsToFlights(): void {
    const destinations = this.destinationService.getDestinations();
    this.flights.forEach(flight => {
      const destination = destinations.find(dest => dest.name === flight.destination);
      if (destination) {
        flight.imageUrl = destination.imageUrl;
      }
    });
  }
}

export { Flight };
