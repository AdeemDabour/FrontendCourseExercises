import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-flights',
  imports: [MatTableModule],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css']
})
export class ManageFlightsComponent {
  
  flights = [
    { number: 'LY001', destination: 'New York' },
    { number: 'LY002', destination: 'London' },
    { number: 'LY003', destination: 'Paris' },
  ];
  
  displayedColumns: string[] = ['flightNumber', 'destination', 'actions'];

  onAddFlight() {
    console.log('Add Flight button clicked');
  }

  onEditFlight(flight: any) {
    console.log('Edit Flight:', flight);
  }
}
