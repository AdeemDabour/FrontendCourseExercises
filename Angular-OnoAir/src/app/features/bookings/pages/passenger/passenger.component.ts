import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-passenger',
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatInputModule, FormsModule],
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.css'
})
export class PassengerComponent {
  @Input() passenger: { name: string; passport: string } = { name: '', passport: '' };
  @Input() index: number = 0;
  @Output() passengerChange = new EventEmitter<{ name: string; passport: string }>();

  updatePassenger(field: 'name' | 'passport', event: Event): void {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.passenger = { ...this.passenger, [field]: value };
    this.passengerChange.emit(this.passenger);
  }
}