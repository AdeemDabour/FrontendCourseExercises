import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DestinationService } from '../../service/destinations.service';
import { Destination } from '../../model/destination';

@Component({
  selector: 'app-edit-destination',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './edit-destination.component.html',
  styleUrl: './edit-destination.component.css',
})
export class EditDestinationComponent implements OnInit {
  displayValidateName: boolean = false;
  displayValidateAirportName: boolean = false;
  displayValidateAirportWebsite: boolean = false;
  displayValidateEmail: boolean = false;
  displayValidateCode: boolean = false;
  displayValidateImageUrl: boolean = false;

  editDestination: Destination | undefined;

  @Input()
  id = '';

  constructor(private destinationService: DestinationService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      const destination = await this.destinationService.getDestination(this.id);
      if (destination) {
        this.editDestination = destination;
      } else {
        console.error('Destination not found.');
      }
    } catch (error) {
      console.error('Error fetching destination:', error);
    }
  }

  saveChange(): void {
    if (!this.editDestination) {
      console.error('No destination to update.');
      return;
    }

    this.displayValidateName = !this.editDestination.name;
    this.displayValidateAirportName = !this.editDestination.airportName;
    this.displayValidateAirportWebsite = !this.editDestination.airportWebsite;
    this.displayValidateEmail = !this.editDestination.email;
    this.displayValidateCode = !this.editDestination.code;
    this.displayValidateImageUrl = !this.editDestination.imageUrl;

    if (
      !this.displayValidateName &&
      !this.displayValidateAirportName &&
      !this.displayValidateAirportWebsite &&
      !this.displayValidateCode &&
      !this.displayValidateEmail &&
      !this.displayValidateImageUrl
    ) {
      this.destinationService
        .updateDestination(this.id, this.editDestination)
        .then(() => {
          this.router.navigate(['destination-list']);
        })
        .catch((error) => {
          console.error('Error updating destination:', error);
        });
    }
  }
}