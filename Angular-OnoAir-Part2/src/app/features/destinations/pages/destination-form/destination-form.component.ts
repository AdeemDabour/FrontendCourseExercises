import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Destination, Status } from '../../model/destination';
import { DestinationService } from '../../service/destinations.service';

@Component({
  selector: 'app-destination-form',
  standalone: true,
  imports: [
    FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule,
    MatCardModule, RouterModule, MatError
  ],
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.css']
})
export class DestinationFormComponent implements OnInit {
  existingDestinations: Destination[] = [];
  nameExists: boolean = false;
  codeExists: boolean = false;

  @Input() destination: Destination = new Destination('', '', '', '', '', '', '', Status.Active);
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<Destination>();

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.existingDestinations = await firstValueFrom(this.destinationService.destinations$);
}


  checkNameExists(): void {
    this.nameExists = this.existingDestinations.some(
      dest => dest.name.toLowerCase() === this.destination.name.toLowerCase()
    );
  }

  checkCodeExists(): void {
    this.codeExists = this.existingDestinations.some(
      dest => dest.code.toLowerCase() === this.destination.code.toLowerCase()
    );
  }

  submitForm(): void {
    if (this.nameExists || this.codeExists) return;
    this.formSubmit.emit(this.destination);
  }
  async onSubmitRegistration(): Promise<void> {
    if (this.nameExists || this.codeExists) {
      return;
    }
    await this.destinationService.addDestination(this.destination);
    this.snackBar.open('Destination Added successfully!', 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.router.navigate(['/manage-destinations']);
  }
}
