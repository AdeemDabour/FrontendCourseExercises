import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDestinationComponent } from './create-destination.component';

describe('CreateDestinationComponent', () => {
  let component: CreateDestinationComponent;
  let fixture: ComponentFixture<CreateDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
