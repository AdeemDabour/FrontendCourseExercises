import { TestBed } from '@angular/core/testing';
import { BookingService } from './bookings.service';

describe('BookingsService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});