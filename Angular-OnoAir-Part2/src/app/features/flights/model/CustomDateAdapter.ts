import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: string): Date | null {

    if (!value) return null;

    if (value.includes(':')) {
      // Handle time format HH:mm
      const [hours, minutes] = value.split(':').map(Number);

      const now = new Date();
      now.setHours(hours, minutes, 0, 0);
      return now;
    } else {
      // Handle date format DD/MM/YYYY
      const parts = value.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }

    return null;
  }

  override format(date: Date, displayFormat: string): string {

    if (!date) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // 🛠 Ensure time formats correctly
    if (displayFormat.includes('HH:mm')) {
      return `${hours}:${minutes}`;
    }

    return `${day}/${month}/${year}`;
  }
}

export const CUSTOM_DATETIME_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
    timeInput: 'HH:mm'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    timeInput: 'HH:mm',
    timeOptionLabel: 'HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    timeA11yLabel: 'HH:mm'
  },
};