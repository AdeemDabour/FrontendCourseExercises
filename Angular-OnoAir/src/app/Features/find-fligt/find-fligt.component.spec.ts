import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFligtComponent } from './find-fligt.component';

describe('FindFligtComponent', () => {
  let component: FindFligtComponent;
  let fixture: ComponentFixture<FindFligtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindFligtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFligtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
