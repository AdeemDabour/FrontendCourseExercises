import { Injectable } from '@angular/core';
import { DestinationService } from '../../destinations/service/destinations.service';
import { Flight } from '../model/flight';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private flights: Flight[] = [
    new Flight('LX1001', 'Tel Aviv', 'New York', new Date('2024-12-10 09:00'), new Date('2024-12-10 18:00'), 200),
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
    new Flight('AA120', 'Tel Aviv', 'Dubai', new Date('2024-12-24 16:00'), new Date('2024-12-24 20:30'), 180),
    new Flight('AF2050', 'Paris', 'Tel Aviv', new Date('2024-12-24 10:00'), new Date('2024-12-24 16:00'), 200),
    new Flight('EK203', 'Dubai', 'Krakow', new Date('2024-12-24 18:00'), new Date('2024-12-24 22:00'), 250),
    new Flight('AZ6789', 'Rome', 'New York', new Date('2024-12-24 12:00'), new Date('2024-12-24 16:00'), 300),
    new Flight('UA992', 'Los Angeles', 'Tokyo', new Date('2024-12-24 11:00'), new Date('2024-12-24 18:00'), 280),
    new Flight('LH402', 'Tel Aviv', 'Berlin', new Date('2024-12-24 10:00'), new Date('2024-12-24 14:30'), 220),
    new Flight('UA852', 'Los Angeles', 'Larnaca', new Date('2024-12-24 11:00'), new Date('2024-12-24 18:00'), 260),
    new Flight('LH438', 'Tel Aviv', 'Los Angeles', new Date('2024-12-24 10:00'), new Date('2024-12-24 14:30'), 240),
    new Flight('EK207', 'Dubai', 'Paris', new Date('2024-12-24 08:00'), new Date('2024-12-24 13:00'), 200),
    new Flight('FR101', 'Madrid', 'Zurich', new Date('2024-12-25 09:00'), new Date('2024-12-25 10:30'), 90),
    new Flight('LH501', 'Berlin', 'Rome', new Date('2024-12-26 14:00'), new Date('2024-12-26 16:30'), 120),
    new Flight('BA305', 'London', 'New York', new Date('2024-12-27 08:00'), new Date('2024-12-27 14:00'), 300),
    new Flight('AF450', 'Paris', 'Dubai', new Date('2024-12-28 11:00'), new Date('2024-12-28 20:00'), 400),
    new Flight('EK300', 'Dubai', 'Tokyo', new Date('2024-12-29 02:00'), new Date('2024-12-29 14:00'), 600),
    new Flight('AA400', 'Chicago', 'Los Angeles', new Date('2024-12-30 13:00'), new Date('2024-12-30 17:00'), 250),
    new Flight('LX700', 'Zurich', 'Tel Aviv', new Date('2025-01-02 09:00'), new Date('2025-01-02 14:00'), 200),
    new Flight('DL123', 'New York', 'London', new Date('2025-01-03 18:00'), new Date('2025-01-04 06:00'), 400),
    new Flight('QR901', 'Doha', 'Singapore', new Date('2025-01-05 03:00'), new Date('2025-01-05 11:00'), 350),
    new Flight('TK502', 'Istanbul', 'Rome', new Date('2025-01-06 07:00'), new Date('2025-01-06 09:30'), 150),
    new Flight('AZ123', 'Rome', 'Paris', new Date('2025-01-07 08:00'), new Date('2025-01-07 10:00'), 100),
    new Flight('UA455', 'Los Angeles', 'Tokyo', new Date('2025-01-10 22:00'), new Date('2025-01-11 06:00'), 400),
    new Flight('EK404', 'Dubai', 'Bangkok', new Date('2025-01-12 01:00'), new Date('2025-01-12 09:00'), 300),
    new Flight('BA800', 'London', 'Tel Aviv', new Date('2025-01-14 16:00'), new Date('2025-01-14 22:00'), 250),
    new Flight('AF890', 'Paris', 'Berlin', new Date('2025-01-15 07:00'), new Date('2025-01-15 09:00'), 120),
    new Flight('LH450', 'Berlin', 'Zurich', new Date('2025-01-16 10:00'), new Date('2025-01-16 12:00'), 90),
    new Flight('DL200', 'New York', 'Chicago', new Date('2025-01-18 14:00'), new Date('2025-01-18 16:00'), 150),
    new Flight('QR303', 'Doha', 'Bangkok', new Date('2025-01-19 02:00'), new Date('2025-01-19 09:00'), 320),
    new Flight('FR600', 'Lisbon', 'Paris', new Date('2025-01-20 11:00'), new Date('2025-01-20 13:00'), 90),
    new Flight('AA250', 'Chicago', 'Miami', new Date('2025-01-22 08:00'), new Date('2025-01-22 12:00'), 200),
    new Flight('EK301', 'Dubai', 'London', new Date('2025-01-23 04:00'), new Date('2025-01-23 12:00'), 300),
    new Flight('TK120', 'Istanbul', 'New York', new Date('2025-01-25 21:00'), new Date('2025-01-26 07:00'), 500),
    new Flight('BA123', 'London', 'Paris', new Date('2025-01-27 09:00'), new Date('2025-01-27 10:30'), 80),
    new Flight('AZ987', 'Rome', 'Berlin', new Date('2025-01-28 06:00'), new Date('2025-01-28 08:00'), 120),
    new Flight('UA678', 'Los Angeles', 'San Francisco', new Date('2025-01-30 12:00'), new Date('2025-01-30 13:00'), 50),
    new Flight('LH111', 'Berlin', 'London', new Date('2025-02-01 08:00'), new Date('2025-02-01 10:00'), 180),
    new Flight('AA700', 'Chicago', 'Dallas', new Date('2025-02-03 10:00'), new Date('2025-02-03 12:00'), 150),
    new Flight('FR999', 'Lisbon', 'Rome', new Date('2025-02-05 09:00'), new Date('2025-02-05 12:00'), 200),
    // Additional flights to meet the requirement of 100 flights
    new Flight('EK500', 'Dubai', 'Berlin', new Date('2024-12-24 10:00'), new Date('2024-12-24 16:00'), 230),
    new Flight('LH502', 'Berlin', 'Tel Aviv', new Date('2024-12-26 06:00'), new Date('2024-12-26 12:00'), 210),
    new Flight('AF204', 'Paris', 'Zurich', new Date('2024-12-27 07:00'), new Date('2024-12-27 09:00'), 150),
    new Flight('UA500', 'Los Angeles', 'Dubai', new Date('2024-12-28 16:00'), new Date('2024-12-29 02:00'), 400),
    new Flight('BA400', 'London', 'Tokyo', new Date('2024-12-29 18:00'), new Date('2024-12-30 08:00'), 500),
    new Flight('EK600', 'Dubai', 'Paris', new Date('2025-01-01 03:00'), new Date('2025-01-01 10:00'), 300),
    new Flight('QR701', 'Doha', 'Berlin', new Date('2025-01-02 08:00'), new Date('2025-01-02 15:00'), 250),
    new Flight('LH601', 'Zurich', 'Rome', new Date('2025-01-03 12:00'), new Date('2025-01-03 14:00'), 150),
    new Flight('AA401', 'Tel Aviv', 'Zurich', new Date('2025-01-04 10:00'), new Date('2025-01-04 14:00'), 200),
    new Flight('UA600', 'New York', 'Rome', new Date('2025-01-06 09:00'), new Date('2025-01-06 18:00'), 500),
    new Flight('EK700', 'Dubai', 'Larnaca', new Date('2025-01-08 06:00'), new Date('2025-01-08 10:00'), 200),
    new Flight('FR300', 'Zurich', 'Berlin', new Date('2025-01-10 09:00'), new Date('2025-01-10 12:00'), 120),
    new Flight('BA402', 'London', 'Paris', new Date('2025-01-11 07:00'), new Date('2025-01-11 09:00'), 100),
    new Flight('AF205', 'Paris', 'Los Angeles', new Date('2025-01-12 14:00'), new Date('2025-01-12 22:00'), 400),
    new Flight('TK300', 'Istanbul', 'Tokyo', new Date('2025-01-14 11:00'), new Date('2025-01-15 01:00'), 600),
    new Flight('DL300', 'New York', 'Berlin', new Date('2025-01-16 15:00'), new Date('2025-01-17 01:00'), 450),
    new Flight('QR800', 'Doha', 'Tokyo', new Date('2025-01-18 10:00'), new Date('2025-01-19 00:00'), 700),
    new Flight('AA500', 'Chicago', 'Los Angeles', new Date('2025-01-20 13:00'), new Date('2025-01-20 17:00'), 150),
    new Flight('EK800', 'Dubai', 'Rome', new Date('2025-01-22 09:00'), new Date('2025-01-22 15:00'), 250),
    new Flight('BA700', 'London', 'Dubai', new Date('2025-01-23 22:00'), new Date('2025-01-24 08:00'), 400),
    new Flight('AF700', 'Paris', 'Tel Aviv', new Date('2025-01-25 18:00'), new Date('2025-01-25 23:00'), 250),
    new Flight('LH700', 'Berlin', 'Dubai', new Date('2025-01-27 11:00'), new Date('2025-01-27 18:00'), 300),
    new Flight('QR500', 'Doha', 'Zurich', new Date('2025-01-28 03:00'), new Date('2025-01-28 09:00'), 200),
    new Flight('FR200', 'Zurich', 'Paris', new Date('2025-01-30 12:00'), new Date('2025-01-30 14:00'), 120)
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