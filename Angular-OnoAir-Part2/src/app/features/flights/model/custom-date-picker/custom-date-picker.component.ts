import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';

@Component({
  standalone: true,
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css'],
  imports: [ MatFormFieldModule, CommonModule, FormsModule, MatDatepickerModule, 
    MatIconModule, MatNativeDateModule, MatInputModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerComponent),
      multi: true,
    },
  ],
})
export class CustomDatePickerComponent implements ControlValueAccessor {

  @Output() monthSelectionChange = new EventEmitter<Date[]>();

  mode: 'specific' | 'flexible' = 'specific';
  selectedDate: Date | null = null;
  selectedDates: Date[] = [];
  selectedMonths: Date[] = [];
  selectedMonthsArray: Date[] = [];
  today: Date = new Date();
  months: Date[] = [];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.initializeMonths();
  }

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.selectedDates = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setMode(mode: 'specific' | 'flexible'): void {
    this.mode = mode;
  }

  /** ✅ Handle date selection */
  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    if (event.value && !this.selectedDates.includes(event.value)) {
      this.selectedDates.push(event.value);
      this.onChange(this.selectedDates);
    }
  }

  /** ❌ Remove a specific date */
  removeDate(date: Date): void {
    this.selectedDates = this.selectedDates.filter(d => d.getTime() !== date.getTime());
    this.onChange(this.selectedDates);
  }
  

  /** ✅ Initialize months for the month grid */
  private initializeMonths(): void {
    const start = moment().startOf('year'); // Start of current year
    for (let i = 0; i < 12; i++) {
      this.months.push(start.clone().add(i, 'months').toDate());
    }
  }

  /** ✅ Toggle selection of months */
  toggleMonthSelection(month: Date): void {
    const index = this.selectedMonths.findIndex(m => 
      m.getMonth() === month.getMonth() && m.getFullYear() === month.getFullYear());
  
    if (index > -1) {
      this.selectedMonths.splice(index, 1); // Remove if already selected
    } else {
      this.selectedMonths.push(month); // Add if not selected
    }
    this.monthSelectionChange.emit(this.selectedMonths); // Emit updated months
  }
  

  /** ❌ Clear selected dates & months */
  clearSelection(): void {
    this.selectedDates = [];
    this.selectedMonths = [];
    this.onChange([]);
  }
}
