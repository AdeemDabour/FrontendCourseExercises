import { Component, Inject } from '@angular/core';

import { Passenger } from '../../model/passenger';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-luggage-dialog',
  imports: [MatDialogModule, MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatOptionModule, MatSelectModule],
  templateUrl: './luggage-dialog.component.html',
  styleUrls: ['./luggage-dialog.component.css']
})
export class LuggageDialogComponent {
  originalLuggage: { cabin: number; checked: number; heavy: number };

  constructor(
    public dialogRef: MatDialogRef<LuggageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { passenger: Passenger }
  ) {
    this.originalLuggage = {
      cabin: this.data.passenger.luggage?.cabin || 0,
      checked: this.data.passenger.luggage?.checked || 0,
      heavy: this.data.passenger.luggage?.heavy || 0
    };
  }

  saveChanges(): void {
    if (this.getTotalLuggage() > 9) {
      alert("A passenger cannot have more than 9 baggage items in total.");
      return;
    }
    this.dialogRef.close(this.data.passenger.luggage);
  }

  cancel(): void {
    this.data.passenger.luggage = { ...this.originalLuggage };
    this.dialogRef.close(null);
  }

  getTotalLuggage(): number {
    return this.data.passenger.luggage.cabin +
      this.data.passenger.luggage.checked +
      this.data.passenger.luggage.heavy;
  }
}