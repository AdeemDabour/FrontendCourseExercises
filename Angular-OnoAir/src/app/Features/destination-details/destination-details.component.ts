import { Component, OnInit } from '@angular/core';
import { DestinationService, Destination } from '../destinations.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-destination-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.css'
})
export class DestinationDetailsComponent implements OnInit {
  destination: Destination | undefined;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.destination = this.destinationService.getDestinations()
        .find(d => d.code === code);
    }
  }

  goBack(): void {
    this.router.navigate(['/manage-destinations']);
  }
}