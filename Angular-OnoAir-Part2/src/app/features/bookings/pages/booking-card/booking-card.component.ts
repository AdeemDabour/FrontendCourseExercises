import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DestinationService } from "../../../destinations/service/destinations.service";
import { Booking } from "../../model/booking";
import { Flight } from "../../../flights/model/flight";
import { BookingService } from "../../service/bookings.service";

@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent implements OnInit {
  @Input() booking!: Booking;
  @Output() viewBookingEvent = new EventEmitter<any>();
  destinationImageUrl: string | null = null;
  flight: Flight | null = null;

  constructor(
    private destinationService: DestinationService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // Retrieve flight details based on flightNo
    this.flight = this.bookingService.getFlightDetails(this.booking.flightNo);

    // Retrieve destination image
    this.destinationImageUrl = this.destinationService.getDestinationImage(this.flight?.destination || '');
  }  

  viewBooking(): void {
    this.viewBookingEvent.emit(this.booking);
  }
}