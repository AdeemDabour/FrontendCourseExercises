import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuggageDialogComponent } from './luggage-dialog.component';

describe('LuggageDialogComponent', () => {
  let component: LuggageDialogComponent;
  let fixture: ComponentFixture<LuggageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuggageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuggageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});