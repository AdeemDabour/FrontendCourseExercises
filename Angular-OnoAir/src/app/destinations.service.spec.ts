import { TestBed } from '@angular/core/testing';

import { DestinationService } from './destinations.service';

describe('ServiceDestinationsService', () => {
  let service: DestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
