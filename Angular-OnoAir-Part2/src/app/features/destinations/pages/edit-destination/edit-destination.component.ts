import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Destination, Status } from '../../model/destination';
import { DestinationService } from '../../service/destinations.service';
import { DestinationFormComponent } from '../destination-form/destination-form.component';

@Component({
  selector: 'app-edit-destination',
  standalone: true,
  imports: [DestinationFormComponent],
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css']
})
export class EditDestinationComponent implements OnInit {
  destination: Destination = new Destination('', '', '', '', '', '', '', Status.Active);
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinationService: DestinationService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    const destinationId = this.route.snapshot.paramMap.get('id');
    if (destinationId) {
      await this.loadDestination(destinationId);
    } else {
      console.error('No destination ID provided.');
      this.router.navigate(['/manage-destinations']);
    }
  }

  async loadDestination(id: string): Promise<void> {
    try {
      this.isLoading = true;
      const destination = await this.destinationService.getDestinationById(id);
      if (destination) {
        this.destination = destination;
      } else {
        console.error('Destination not found.');
        this.router.navigate(['/manage-destinations']);
      }
    } catch (error) {
      console.error('Error loading destination:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async saveDestination(updatedDestination: Destination): Promise<void> {
    try {
      await this.destinationService.updateDestination(updatedDestination.id, updatedDestination);
      this.snackBar.open('Destination updated successfully!', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.router.navigate(['/manage-destinations']);
    } catch (error) {
      console.error('Error updating destination:', error);
    }
  }
}
