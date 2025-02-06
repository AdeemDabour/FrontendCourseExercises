import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCouponsComponent } from './manage-coupons.component';

describe('ManageCouponsComponent', () => {
  let component: ManageCouponsComponent;
  let fixture: ComponentFixture<ManageCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCouponsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});