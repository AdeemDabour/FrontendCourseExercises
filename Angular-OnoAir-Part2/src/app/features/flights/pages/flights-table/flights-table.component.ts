import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
//import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // ✅ Pagination Support
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Flight } from '../../model/flight';

@Component({
  selector: 'app-flights-table',
  standalone: true,
  imports: [MatSortModule, MatTableModule, MatButtonModule, MatIcon, DatePipe],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements OnChanges, AfterViewInit {
  @Input() showActionsColumn: boolean = true;
  @Input() flights: Flight[] = [];

  displayedColumns: string[] = ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatPaginator) paginator!: MatPaginator; // ✅ Add Paginator ADD TO IMPORTS INCASE GOING TO USE 
  //OTHERWISE DELETE PAGINATOR.

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights'] && this.flights) {
      this.updateTableData();
    }

    this.displayedColumns = this.showActionsColumn
      ? ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions']
      : ['flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'book'];
  }

  ngAfterViewInit(): void {
    this.updateTableData();
  }

  private updateTableData(): void {
    if (this.flights.length) {
      this.dataSource.data = this.sortById(this.flights);
      this.dataSource.sort = this.sort; // ✅ Assign MatSort
      //this.dataSource.paginator = this.paginator; // ✅ Assign Paginator
    }
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openFlightDetails(flight: Flight): void {
    this.router.navigate(['/flight-details', flight.flightNo]);
  }

  openEditFlight(flight: Flight): void {
    this.router.navigate(['/edit-flight', flight.id]);
  }

  openBookFlight(flight: Flight): void {
    this.router.navigate(['/book-flight', flight.flightNo]);
  }

  deleteFlight(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this flight?');
    if (confirmation) {
      console.log(`Flight ${id} deleted`);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private sortById(flights: Flight[]): Flight[] {
    return flights.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
  }
}

