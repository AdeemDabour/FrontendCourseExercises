import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DestinationService } from "../../../destinations/service/destinations.service";
import { Booking, Status } from "../../model/booking";
import { Flight } from "../../../flights/model/flight";
import { BookingService } from "../../service/bookings.service";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent implements OnInit {
  @Input() booking!: Booking;
  @Output() viewBookingEvent = new EventEmitter<any>();
  @Output() cancelBookingEvent = new EventEmitter<any>();
  destinationImageUrl: string | null = null;
  flight: Flight | undefined;
  Status = Status;
  constructor(
    private destinationService: DestinationService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // Retrieve flight details based on flightNo
    this.bookingService.getFlightDetails(this.booking.flightNo).subscribe({
      next: (flight) => {
        this.flight = flight;
  
        // Retrieve destination image if the flight exists
        if (this.flight?.destination) {
          this.destinationService.getDestinationImage(this.flight.destination).subscribe({
            next: (imageUrl) => {
              this.destinationImageUrl = imageUrl;
            },
            error: (error) => {
              console.error('Error fetching destination image:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error fetching flight details:', error);
      },
    });
  }
  

  viewBooking(): void {
    this.viewBookingEvent.emit(this.booking);
  }
  cancelBooking(): void {
    const confirmation = confirm(
      `Are you sure you want to cancel booking ${this.booking.bookingCode}?`
    );
    if (confirmation) {
      this.cancelBookingEvent.emit(this.booking);
    }
  }
}