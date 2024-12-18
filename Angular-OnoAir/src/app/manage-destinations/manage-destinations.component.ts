import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { DestinationService, Destination } from '../destinations.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-destinations',
  imports: [MatSortModule, MatTableModule, MatIcon],
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css'],
})

export class ManageDestinationsComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['name', 'airportName', 'airportWebsite', 'email', 'code', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<Destination>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private destinationService: DestinationService, private router: Router) { }
  ngAfterViewInit(): void {
    this.dataSource.data = this.destinationService.getDestinations();
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
    openDestinationDetails(destination: Destination): void {
    this.router.navigate(['/destination-details', destination.code]);
  }
}