import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import moment from 'moment';

@Component({
  standalone: true,
  selector: 'app-month-grid-view',
  templateUrl: './month-grid-view.component.html',
  styleUrls: ['./month-grid-view.component.css'],
  imports: [CommonModule]
})
export class MonthGridViewComponent {
  @Output() monthSelectionChange = new EventEmitter<Date[]>();

  selectedMonths: Date[] = [];
  months: Date[] = [];

  constructor() {
    this.initializeMonths();
  }

  /** ✅ Initialize months */
  private initializeMonths(): void {
    const start = moment().startOf('year'); 
    for (let i = 0; i < 12; i++) {
      this.months.push(start.clone().add(i, 'months').toDate());
    }
  }

  /** ✅ Toggle selection of months */
  toggleMonthSelection(month: Date): void {
    const index = this.selectedMonths.findIndex(m =>
      m.getMonth() === month.getMonth() && m.getFullYear() === month.getFullYear());

    if (index > -1) {
      this.selectedMonths.splice(index, 1);
    } else {
      this.selectedMonths.push(month);
    }
    this.monthSelectionChange.emit(this.selectedMonths);
  }

  /** ❌ Clear selected months */
  clearMonths(): void {
    this.selectedMonths = [];
    this.monthSelectionChange.emit([]);
  }
}
