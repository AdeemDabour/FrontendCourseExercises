import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Destination,Status } from '../../model/destination';
import { DestinationService } from '../../service/destinations.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-destination-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterModule, MatError],
  templateUrl: './destination-form.component.html',
  styleUrl: './destination-form.component.css'
})
export class DestinationFormComponent implements OnInit {

  newDestination: Destination = new Destination('', '', '', '', '', '', '', Status.Active);
  existingDestinations: Destination[] = [];
  nameExists: boolean = false;
  codeExists: boolean = false;


  constructor(
    private destinationService: DestinationService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { };
  async ngOnInit(): Promise<void> {
    this.existingDestinations = await firstValueFrom(this.destinationService.destinations$);
  }

  checkNameExists(): void {
    this.nameExists = this.existingDestinations.some(
      dest => dest.name.toLowerCase() === this.newDestination.name.toLowerCase()
    );
  }

  checkCodeExists(): void {
    this.codeExists = this.existingDestinations.some(
      dest => dest.code.toLowerCase() === this.newDestination.code.toLowerCase()
    );
  }

  async onSubmitRegistration(): Promise<void> {
    if (this.nameExists || this.codeExists) {
      return;
    }
    await this.destinationService.addDestination(this.newDestination);
    this.snackBar.open('Destination Added successfully!', 'OK', {
      verticalPosition: 'top', // Show at the top
      horizontalPosition: 'center', // Centered
    });
    this.router.navigate(['/manage-destinations']);
  }
}