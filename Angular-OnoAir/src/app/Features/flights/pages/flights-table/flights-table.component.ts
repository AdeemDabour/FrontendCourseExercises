import { AfterViewInit, Component, ViewChild, inject, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Flight } from '../../model/flight';
@Component({
  selector: 'app-flights-table',
  imports: [MatSortModule, MatTableModule, MatButtonModule, MatIcon ,DatePipe, RouterLink],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() showActionsColumn: boolean = true;

  @Input() flights: Flight[] = [];
  displayedColumns: string[] = ['flightNo.', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(): void {
    if (this.flights) {
      this.dataSource.data = this.flights;
    }
  
    this.displayedColumns = this.showActionsColumn
      ? ['flightNo.', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions']
      : ['flightNo.', 'origin', 'destination', 'boarding', 'landing', 'seats', 'book'];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }  
  
  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Flight, filter: string) => {
      const originMatch = data.origin.toLowerCase().includes(filter);
      const destinationMatch = data.destination.toLowerCase().includes(filter);
      const boardingDateMatch = data.boarding.toDateString().toLowerCase().includes(filter);
      const arrivalDateMatch = data.landing.toDateString().toLowerCase().includes(filter);

      return originMatch || destinationMatch || boardingDateMatch || arrivalDateMatch;
    };
  }
}