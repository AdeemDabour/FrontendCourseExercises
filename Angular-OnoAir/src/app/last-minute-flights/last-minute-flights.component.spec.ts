import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMinuteFlightsComponent } from './last-minute-flights.component';

describe('LastMinuteFlightsComponent', () => {
  let component: LastMinuteFlightsComponent;
  let fixture: ComponentFixture<LastMinuteFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMinuteFlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastMinuteFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
