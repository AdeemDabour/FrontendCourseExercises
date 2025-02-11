import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthGridViewComponent } from './month-grid-view.component';

describe('MonthGridViewComponent', () => {
  let component: MonthGridViewComponent;
  let fixture: ComponentFixture<MonthGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthGridViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
