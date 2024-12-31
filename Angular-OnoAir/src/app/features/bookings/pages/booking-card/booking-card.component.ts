import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DestinationService } from "../../../destinations/service/destinations.service";
import { Booking } from "../../model/booking";

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

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.destinationImageUrl = this.destinationService.getDestinationImage(this.booking.destination);
  }  
  viewBooking(): void {
    this.viewBookingEvent.emit(this.booking);
  }
}