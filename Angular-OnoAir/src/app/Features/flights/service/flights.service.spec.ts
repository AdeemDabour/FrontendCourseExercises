import { TestBed } from '@angular/core/testing';
import { FlightsService } from './flights.service';

describe('ServiceFlightsService', () => {
  let service: FlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});