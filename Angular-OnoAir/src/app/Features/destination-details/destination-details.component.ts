import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinationService, Destination } from '../../destinations.service';
@Component({
  selector: 'app-destination-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.css'
})
export class DestinationDetailsComponent implements OnInit {
  @Input() code = 0;
  destination: Destination | undefined;
  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
  ) {}
  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.destination = this.destinationService.getDestinations()
        .find(d => d.code === code);
    }
  }
}