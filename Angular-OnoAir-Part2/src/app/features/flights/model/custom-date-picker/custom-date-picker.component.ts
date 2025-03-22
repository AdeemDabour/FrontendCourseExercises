import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { MonthGridViewComponent } from '../month-grid-view/month-grid-view.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css'],
  imports: [CommonModule, CalendarViewComponent, MonthGridViewComponent, MatInputModule, FormsModule],
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
  @Output() dateSelectionChange = new EventEmitter<{ boarding: Date | null, landing: Date | null }>();

  mode: 'specific' | 'flexible' = 'specific';

  selectedDates: { boarding: Date | null, landing: Date | null } = { boarding: null, landing: null };
  selectedMonths: Date[] = [];

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.selectedDates = value || { boarding: null, landing: null };
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

  /** ✅ Capture Date Selection */
  onDatesSelected(selectedDates: { boarding: Date | null, landing: Date | null }): void {
    this.selectedDates = selectedDates;
    this.dateSelectionChange.emit(this.selectedDates);
    this.onChange(this.selectedDates);
  }

  /** ✅ Capture Selected Months */
  onMonthsSelected(months: Date[]): void {
    this.selectedMonths = months.map(month => {
      return new Date(month.getFullYear(), month.getMonth(), 1);
    });
    this.monthSelectionChange.emit(this.selectedMonths);
    this.onChange(this.selectedMonths);
  }
}