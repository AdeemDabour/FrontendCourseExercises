import { Injectable } from '@angular/core';
import { DestinationService } from '../../destinations/service/destinations.service';
import { Flight } from '../model/flight';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private flights: Flight[] = [

  ];

  constructor(private destinationService: DestinationService) {
    this.addImageUrlsToFlights();
  }

  listFlights(): Flight[] {
    return this.flights;
  }

  getFlightByNumber(flightNo: string): Flight | undefined {
    return this.flights.find(flight => flight.flightNo === flightNo);
  }

  getFlightsThisWeek(): Flight[] {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

    return this.flights.filter(flight =>
      flight.boarding >= today && flight.boarding <= endOfWeek
    );
  }
  private addImageUrlsToFlights(): void {
    const destinations = this.destinationService.listDestinations();
    this.flights.forEach(flight => {
      const destination = destinations.find(dest => dest.name === flight.destination);
      if (destination) {
        flight.imageUrl = destination.imageUrl;
      }
    });
  }
}