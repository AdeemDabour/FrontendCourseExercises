import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../flights/model/flight';
import { DestinationService } from '../../../destinations/service/destinations.service';

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
    return this.flight?.boarding || null; // Directly use the Date type
  }

  get landingDate(): Date | null {
    return this.flight?.landing || null; // Directly use the Date type
  }

  ngOnInit(): void {
    this.destinationService.getDestinationImage(this.flight.destination).subscribe(imageUrl => {
      this.destinationImageUrl = imageUrl;
    });
  }
}
