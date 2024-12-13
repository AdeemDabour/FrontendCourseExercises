import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightsComponent } from './manage-flights.component';

describe('ManageFlightsComponent', () => {
  let component: ManageFlightsComponent;
  let fixture: ComponentFixture<ManageFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
