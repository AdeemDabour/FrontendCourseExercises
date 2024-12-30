import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider, CommonModule, MatButtonModule, RouterLink],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  @Input() bookingCode = 0;
  bookingDetails: any = null;
  showPassengers: boolean = false;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const bookingCode = this.route.snapshot.paramMap.get('bookingCode');
    if (bookingCode) {
      this.bookingCode = +bookingCode;
      this.bookingDetails = history.state.bookingDetails;

      if (!this.bookingDetails) {
        this.errorMessage = `Booking with code "${bookingCode}" does not exist.`;
      }
    } else {
      this.errorMessage = 'Invalid booking code in URL.';
    }
  }

  togglePassengerList(): void {
    if (this.bookingDetails?.passengers) {
      this.showPassengers = !this.showPassengers;
    }
  }
}