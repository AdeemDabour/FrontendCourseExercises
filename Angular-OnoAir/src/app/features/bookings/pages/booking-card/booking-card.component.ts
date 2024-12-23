import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {
  @Input() booking: any;
  @Output() viewBookingEvent = new EventEmitter<any>();

  viewBooking() {
    this.viewBookingEvent.emit(this.booking);
  }
}