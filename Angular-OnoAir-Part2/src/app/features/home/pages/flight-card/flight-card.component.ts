import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../flights/model/flight';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-flight-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css'
})
export class FlightCardComponent {
  @Input() flight!: Flight;
  destinationImageUrl: string | null = null;
  constructor(private destinationService: DestinationService) {}

  get boardingDate(): Date | null {
    return this.flight?.boarding ? (this.flight.boarding as Timestamp).toDate() : null;
  }

  get landingDate(): Date | null {
    return this.flight?.landing ? (this.flight.landing as Timestamp).toDate() : null;
  }

  ngOnInit(): void {
    this.destinationService.getDestinationImage(this.flight.destination).subscribe(imageUrl => {
      this.destinationImageUrl = imageUrl;
    });
  }
}