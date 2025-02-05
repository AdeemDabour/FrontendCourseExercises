import { Component, OnInit } from '@angular/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DestinationService } from '../../service/destinations.service';
import { Destination, Status } from '../../model/destination';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-destination',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatButtonModule, MatCardModule, MatError],
  templateUrl: './edit-destination.component.html',
  styleUrl: './edit-destination.component.css',
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

  ngOnInit(): void {
    const destinationId = this.route.snapshot.paramMap.get('id');
    if (destinationId) {
      this.loadDestination(destinationId);
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
        console.error('Destination not found');
        this.router.navigate(['/manage-destinations']);
      }
    } catch (error) {
      console.error('Error loading destination:', error);
    } finally {
      this.isLoading = false;
    }
  }
  

  async saveDestination(): Promise<void> {
    try {
      await this.destinationService.updateDestination(this.destination.id, this.destination); // עדכון ב-API
      this.snackBar.open('Destination Updated successfully!', 'OK', {
        verticalPosition: 'top', // Show at the top
        horizontalPosition: 'center', // Centered
      });
      this.router.navigate(['/manage-destinations']);
    } catch (error) {
      console.error('Error updating destination:', error);
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/manage-destinations']);
  }
}