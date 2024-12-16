import { TestBed } from '@angular/core/testing';

import { ServiceBookingsService } from './bookings.service';

describe('ServiceBookingsService', () => {
  let service: ServiceBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
