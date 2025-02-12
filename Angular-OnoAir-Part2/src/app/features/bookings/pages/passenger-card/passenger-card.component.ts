import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Passenger } from '../../model/passenger';

import { LuggageDialogComponent } from '../luggage-dialog/luggage-dialog.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-passenger-card',
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatError, MatInputModule, FormsModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.css']
})
export class PassengerCardComponent {
  [x: string]: any;
  @Input() passenger: Passenger = new Passenger('', '');
  @Input() index: number = 0;
  @Output() passengerChange = new EventEmitter<{ name: string; passport: string }>();

  constructor(
    private dialog: MatDialog
  ) { }
  onPassengerChange(field: 'name' | 'passport', value: string): void {
    this.passenger = new Passenger(
      field === 'name' ? value : this.passenger.name,
      field === 'passport' ? value : this.passenger.passport,
      this.passenger.luggage
    );
    this.passengerChange.emit(this.passenger);
  }

  getTotalLuggageItems(passenger: Passenger): number {
    return (passenger.luggage?.cabin || 0) + (passenger.luggage?.checked || 0) + (passenger.luggage?.heavy || 0);
  }

  getTotalLuggageWeight(passenger: Passenger): number {
    return ((passenger.luggage?.cabin || 0) * 8) +
      ((passenger.luggage?.checked || 0) * 23) +
      ((passenger.luggage?.heavy || 0) * 32);
  }

  openLuggageDialog(passenger: Passenger): void {
    const dialogRef = this.dialog.open(LuggageDialogComponent, {
      width: '400px',
      data: { passenger }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        passenger.luggage = result;
      }
    });
  }
}