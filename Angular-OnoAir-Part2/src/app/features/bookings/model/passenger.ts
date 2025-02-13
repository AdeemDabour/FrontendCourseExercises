export class Passenger {
  name: string;
  passport: string;
  luggage: { cabin: number; checked: number; heavy: number };

  constructor(name: string, passport: string, luggage?: { cabin: number; checked: number; heavy: number }) {
    this.name = name;
    this.passport = passport;
    this.luggage = luggage || { cabin: 0, checked: 0, heavy: 0 };
  }

  get totalItems(): number {
    return (this.luggage?.cabin || 0) + (this.luggage?.checked || 0) + (this.luggage?.heavy || 0);
  }

  get totalWeight(): number {
    return ((this.luggage?.cabin || 0) * 8) + ((this.luggage?.checked || 0) * 23) + ((this.luggage?.heavy || 0) * 32);
  }

  updateLuggage(luggage: { cabin: number; checked: number; heavy: number }): void {
    this.luggage = luggage;
  }
}