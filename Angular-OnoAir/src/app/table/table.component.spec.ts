import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

interface TestData {
  id: number;
  name: string;
}

describe('TableComponent', () => {
  let component: TableComponent<TestData>;
  let fixture: ComponentFixture<TableComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent<TestData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
