import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightsTableComponent } from './flights-table.component';

describe('FlightsTableComponent', () => {
  let component: FlightsTableComponent;
  let fixture: ComponentFixture<FlightsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
