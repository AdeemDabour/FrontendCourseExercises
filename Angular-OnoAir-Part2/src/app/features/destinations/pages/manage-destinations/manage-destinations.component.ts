import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DestinationService } from '../../service/destinations.service';
import { Destination } from '../../model/destination';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-manage-destinations',
  imports: [MatSortModule, MatTableModule, MatIcon, MatButtonModule],
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css'],
})

export class ManageDestinationsComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['id', 'name', 'airportName', 'airportWebsite', 'email', 'code', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<Destination>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private destinationService: DestinationService, private router: Router) { }

  ngAfterViewInit(): void {
    this.loadDestinations();
    this.dataSource.sort = this.sort;
  }
  
  async loadDestinations(): Promise<void> {
    this.destinationService.refreshDestinations().then(destinations => {
      this.dataSource.data = destinations;
    });
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
  navigateToDestination(): void {
    this.router.navigate(['/destination-form', this.destinationService.createUniqueId()]);
  }  

  deleteDestination(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this destination?');
    if (confirmation) {
      this.destinationService.removeDestination(id)
        .then(() => {
          console.log(`Destination with ID ${id} deleted successfully.`);
          this.destinationService.refreshDestinations(); // עדכון הרשימה
        })
        .catch(error => {
          console.error(`Error deleting destination with ID ${id}:`, error);
        });
    }
  }
  
}