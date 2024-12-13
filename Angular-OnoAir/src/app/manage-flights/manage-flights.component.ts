import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent, PeriodicElement } from '../table/table.component';

@Component({
  selector: 'app-manage-flights',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  onEditFlight(flight: PeriodicElement) {
    console.log('Editing flight:', flight);
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { flightNo: 'LX8396', origin: 'Larnaca', destination: 'Zurich', boardingDate: new Date('2025-12-02'), boardingTime: '09:00', arrivalDate: new Date('2025-12-02'), arrivalTime: '11:00', seats: 120 },
  { flightNo: 'AA120', origin: 'Tel Aviv', destination: 'London', boardingDate: new Date('2025-12-05'), boardingTime: '16:00', arrivalDate: new Date('2025-12-05'), arrivalTime: '20:30', seats: 180 },
  { flightNo: 'EK455', origin: 'Krakow', destination: 'Larnaca', boardingDate: new Date('2025-05-20'), boardingTime: '20:00', arrivalDate: new Date('2025-05-21'), arrivalTime: '02:00', seats: 250 },
  { flightNo: 'AF2050', origin: 'Paris', destination: 'Tel Aviv', boardingDate: new Date('2025-12-06'), boardingTime: '10:00', arrivalDate: new Date('2025-12-06'), arrivalTime: '16:00', seats: 200 },
  { flightNo: 'EK203', origin: 'Dubai', destination: 'Tel Aviv', boardingDate: new Date('2025-12-07'), boardingTime: '18:00', arrivalDate: new Date('2025-12-07'), arrivalTime: '22:30', seats: 250 },
  { flightNo: 'AZ6789', origin: 'Rome', destination: 'New York', boardingDate: new Date('2025-12-10'), boardingTime: '12:00', arrivalDate: new Date('2025-12-10'), arrivalTime: '16:00', seats: 300 },
  { flightNo: 'UA992', origin: 'Los Angeles', destination: 'Tokyo', boardingDate: new Date('2025-12-12'), boardingTime: '11:00', arrivalDate: new Date('2025-12-12'), arrivalTime: '18:00', seats: 280 },
  { flightNo: 'AF2099', origin: 'Tel Aviv', destination: 'Paris', boardingDate: new Date('2025-12-20'), boardingTime: '15:00', arrivalDate: new Date('2025-12-20'), arrivalTime: '19:30', seats: 180 },
  { flightNo: 'LH402', origin: 'Tel Aviv', destination: 'Berlin', boardingDate: new Date('2025-12-24'), boardingTime: '10:00', arrivalDate: new Date('2025-12-24'), arrivalTime: '14:30', seats: 220 },
  { flightNo: 'W61283', origin: 'Tel Aviv', destination: 'Krakow', boardingDate: new Date('2025-12-28'), boardingTime: '20:00', arrivalDate: new Date('2025-12-29'), arrivalTime: '01:00', seats: 150 },
];