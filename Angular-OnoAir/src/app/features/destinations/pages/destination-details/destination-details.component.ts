import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinationService } from '../../service/destinations.service';
import { Destination } from '../../model/destination';

@Component({
  selector: 'app-destination-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {
  @Input() code = '';
  destination: Destination | undefined;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.destination = this.destinationService.listDestinations()
        .find(d => d.code === code);

      if (!this.destination) {
        this.errorMessage = `Destination with code "${code}" does not exist.`;
      }
    } else {
      this.errorMessage = 'Invalid destination code.';
    }
  }
}