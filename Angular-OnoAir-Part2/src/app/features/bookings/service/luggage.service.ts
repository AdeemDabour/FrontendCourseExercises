import { Injectable } from '@angular/core';
import { Luggage } from '../model/luggage';

@Injectable({
  providedIn: 'root'
})
export class LuggageService {
  private readonly MAX_ITEMS = 9;
  private readonly ALLOWED_WEIGHTS = [8, 23, 32];

  constructor() {}

  validateLuggage(luggage: Luggage[]): { valid: boolean, message?: string } {
    const totalItems = luggage.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > this.MAX_ITEMS) {
      return { valid: false, message: 'You cannot have more than 9 luggage items per passenger.' };
    }

    for (const item of luggage) {
      if (!this.ALLOWED_WEIGHTS.includes(item.weight)) {
        return { valid: false, message: `Invalid weight selected: ${item.weight}kg` };
      }
    }

    return { valid: true };
  }
}