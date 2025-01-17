import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Destination } from '../../model/destination';
import { DestinationService } from '../../service/destinations.service';

@Component({
  selector: 'app-destinations-list',
  imports: [CommonModule, MatButtonModule, RouterModule, MatProgressBarModule],
  templateUrl: './destinations-list.component.html',
  styleUrl: './destinations-list.component.css'
})
export class DestinationsListComponent implements OnInit {
  destinations: Destination[] = [];
  isLoading = true;
  constructor(private destinationService: DestinationService){}

  ngOnInit(): void {
    this.destinationService.listDestinations().then((destinations) => (this.destinations = destinations)).finally(() => (this.isLoading = false));
  }

}
