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
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code')!;
      this.destinationService.loadDestinations();
      this.destinationService.getDestinationByNameOrCode(this.code).subscribe(destination => {
        this.destination = destination || undefined;
        this.errorMessage = this.destination ? null : 'Destination with code "' + this.code + '" does not exist.';
      });
    });
  } 
}