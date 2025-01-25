import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlightComponent } from './edit-flight.component';

describe('EditFlightComponent', () => {
  let component: EditFlightComponent;
  let fixture: ComponentFixture<EditFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
