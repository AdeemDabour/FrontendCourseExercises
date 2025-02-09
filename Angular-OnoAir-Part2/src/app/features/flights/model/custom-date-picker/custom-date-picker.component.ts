import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import moment from 'moment';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css'],
  imports: [MatDatepickerModule, MatFormFieldModule, CommonModule, FormsModule ],
})
export class CustomDatePickerComponent {
  mode: 'specific' | 'flexible' = 'specific'; // Default mode
  selectedDates: Date[] = []; // Stores specific dates
  selectedMonths: Date[] = []; // Stores selected months

  today = new Date();
  months = this.generateMonths();

  setMode(newMode: 'specific' | 'flexible') {
    this.mode = newMode;
    this.selectedDates = [];
    this.selectedMonths = [];
  }

  generateMonths(): Date[] {
    const months = [];
    const start = moment().startOf('year'); // Start of current year
    for (let i = 0; i < 12; i++) {
      months.push(start.clone().add(i, 'months').toDate());
    }
    return months;
  }

  addDate(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate: Date | null = event.value; // ✅ Correctly extract the date
    if (selectedDate) {
      this.selectedDates.push(selectedDate);
      console.log('Selected Dates:', this.selectedDates);
    } else {
      console.error('Invalid date selection');
    }
  }


  toggleMonthSelection(month: Date) {
    const index = this.selectedMonths.findIndex(m => m.getTime() === month.getTime());
    if (index === -1) {
      this.selectedMonths.push(month);
    } else {
      this.selectedMonths.splice(index, 1);
    }
  }

  clearSelection() {
    this.selectedDates = [];
    this.selectedMonths = [];
  }

  applySelection() {
    console.log('Selected Dates:', this.selectedDates);
    console.log('Selected Months:', this.selectedMonths);
  }
}
