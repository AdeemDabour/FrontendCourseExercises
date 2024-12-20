import { Injectable } from '@angular/core';
import { DestinationService } from '../../destinations/service/destinations.service';
import { Flight } from '../model/flight';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private flights: Flight[] = [
    new Flight ('LX1001', 'Tel Aviv', 'New York', new Date('2024-12-10 09:00'), new Date('2024-12-10 18:00'), 200),
    new Flight('AA102', 'Dubai', 'Zurich', new Date('2024-12-11 12:00'), new Date('2024-12-11 18:00'), 150),
    new Flight('AF203', 'Paris', 'Rome', new Date('2024-12-12 06:00'), new Date('2024-12-12 12:00'), 180),
    new Flight('EK205', 'Larnaca', 'Tokyo', new Date('2024-12-13 14:00'), new Date('2024-12-14 06:00'), 220),
    new Flight('AZ678', 'Rome', 'Los Angeles', new Date('2024-12-14 10:00'), new Date('2024-12-14 20:00'), 250),
    new Flight('UA999', 'Los Angeles', 'Zurich', new Date('2024-12-15 11:00'), new Date('2024-12-15 23:00'), 280),
    new Flight('LH403', 'Tel Aviv', 'Berlin', new Date('2024-12-16 07:00'), new Date('2024-12-16 14:00'), 220),
    new Flight('UA854', 'Zurich', 'Larnaca', new Date('2024-12-17 10:00'), new Date('2024-12-17 15:00'), 260),
    new Flight('LH439', 'Tel Aviv', 'Paris', new Date('2024-12-18 08:00'), new Date('2024-12-18 12:00'), 240),
    new Flight('EK206', 'Dubai', 'Krakow', new Date('2024-12-19 09:00'), new Date('2024-12-20 01:00'), 250),
    new Flight('LX8396', 'Larnaca', 'Zurich', new Date('2024-12-20 09:00'), new Date('2024-12-21 12:00'), 120),
    new Flight('AA120', 'Tel Aviv', 'Dubai', new Date('2024-12-21 16:00'), new Date('2024-12-21 20:30'), 180),
    new Flight('AF2050', 'Paris', 'Tel Aviv', new Date('2024-12-22 10:00'), new Date('2024-12-22 16:00'), 200),
    new Flight('EK203', 'Dubai', 'Krakow', new Date('2024-12-21 18:00'), new Date('2024-12-22 22:00'), 250),
    new Flight('AZ6789', 'Rome', 'New York', new Date('2024-12-21 12:00'), new Date('2024-12-22 16:00'), 300),
    new Flight('UA992', 'Los Angeles', 'Tokyo', new Date('2024-12-21 11:00'), new Date('2024-12-23 18:00'), 280),
    new Flight('LH402', 'Tel Aviv', 'Berlin', new Date('2024-12-21 10:00'), new Date('2024-12-24 14:30'), 220),
    new Flight('UA852', 'Los Angeles', 'Larnaca', new Date('2024-12-21 11:00'), new Date('2024-12-24 18:00'), 260),
    new Flight('LH438', 'Tel Aviv', 'Los Angeles', new Date('2024-12-22 10:00'), new Date('2024-12-24 14:30'), 240),
    new Flight('EK207', 'Dubai', 'Zurich', new Date('2024-12-24 08:00'), new Date('2024-12-24 13:00'), 200)
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

