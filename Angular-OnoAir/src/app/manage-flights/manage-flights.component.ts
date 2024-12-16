import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-manage-flights',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent {
}