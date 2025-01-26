import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../flights/model/flight';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-flight-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatProgressBarModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css'
})
export class FlightCardComponent {
  @Input() flight!: Flight;
  destinationImageUrl: string | null = null;
  isLoading: boolean = true;
  constructor(private destinationService: DestinationService) {}

  get boardingDate(): Date | null {
    return this.flight?.boarding || null; 
  }

  get landingDate(): Date | null {
    return this.flight?.landing || null; 
  }

  ngOnInit(): void {
    this.isLoading = true;
    try {
      this.destinationService.getDestinationImage(this.flight.destination).subscribe(imageUrl => {
        this.destinationImageUrl = imageUrl;
      });
    } catch (error) {
      console.error('Error fetching destination image:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
