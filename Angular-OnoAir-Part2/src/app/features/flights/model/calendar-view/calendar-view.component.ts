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
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule],
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
  @Output() dateSelectionChange = new EventEmitter<{ boarding: Date | null, landing: Date | null }>();

  boardingDate: Date | null = null;
  landingDate: Date | null = null;
  today: Date = new Date();

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  /** ✅ Handle boarding date selection */
  onBoardingDateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.boardingDate = event.value;
    this.emitDateChange();
  }

  /** ✅ Handle landing date selection */
  onLandingDateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.landingDate = event.value;
    this.emitDateChange();
  }

  /** ✅ Emit the selected dates */
  private emitDateChange(): void {
    this.dateSelectionChange.emit({ boarding: this.boardingDate, landing: this.landingDate });
    this.onChange({ boarding: this.boardingDate, landing: this.landingDate });
  }

  /** Angular ControlValueAccessor Methods */
  writeValue(value: any): void {
    if (value) {
      this.boardingDate = value.boarding || null;
      this.landingDate = value.landing || null;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** ❌ Clear all selected dates */
  clearDates(): void {
    this.boardingDate = null;
    this.landingDate = null;
    this.dateSelectionChange.emit({ boarding: null, landing: null });
    this.onChange({ boarding: null, landing: null });
  }
}