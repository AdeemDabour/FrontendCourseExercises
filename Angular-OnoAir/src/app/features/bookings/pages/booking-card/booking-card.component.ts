import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DestinationService } from "../../../destinations/service/destinations.service";

@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent implements OnInit {
  @Input() booking: any;
  @Output() viewBookingEvent = new EventEmitter<any>();
  destinationImageUrl: string | null = null;

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.loadDestinationImage();
  }

  loadDestinationImage(): void {
    const destination = this.destinationService.getDestinationByNameOrCode(this.booking.destination);
    this.destinationImageUrl = destination ? destination.imageUrl : null;
  }

  viewBooking(): void {
    this.viewBookingEvent.emit(this.booking);
  }
}