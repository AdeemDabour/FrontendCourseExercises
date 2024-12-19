import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider ,CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  bookingDetails: any = null;
  bookingCode: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookingCode = this.route.snapshot.paramMap.get('bookingCode');
    this.bookingDetails = history.state.bookingDetails;

    console.log('Booking Code:', this.bookingCode);
    console.log('Booking Details:', this.bookingDetails);

    if (!this.bookingDetails) {
      alert('No booking details found!');
    }
  }
}