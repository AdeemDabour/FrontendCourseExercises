import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_DATETIME_FORMATS, CustomDateAdapter } from '../../model/CustomDateAdapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
@Component({
  standalone: true,
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarViewComponent),
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
        { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class CalendarViewComponent implements ControlValueAccessor {
  @Output() dateSelectionChange = new EventEmitter<Date[]>();
  
  selectedDates: Date[] = []; // ✅ Array to store selected dates
  today: Date = new Date();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  /** ✅ Handle single date selection */
  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    if (selectedDate && !this.selectedDates.some(date => date.getTime() === selectedDate.getTime())) {
      this.selectedDates.push(selectedDate);
      this.dateSelectionChange.emit(this.selectedDates); // ✅ Emit Date[] correctly
      this.onChange(this.selectedDates);
    }
  }

  /** ❌ Remove a specific date */
  removeDate(date: Date): void {
    this.selectedDates = this.selectedDates.filter(d => d.getTime() !== date.getTime());
    this.dateSelectionChange.emit(this.selectedDates); // ✅ Emit updated Date[]
    this.onChange(this.selectedDates);
  }

  /** ❌ Clear all selected dates */
  clearDates(): void {
    this.selectedDates = [];
    this.dateSelectionChange.emit([]);
    this.onChange(this.selectedDates);
  }

  /** Angular ControlValueAccessor Methods */
  writeValue(value: any): void {
    this.selectedDates = value || [];
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
