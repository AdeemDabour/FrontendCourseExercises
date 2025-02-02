import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DestinationService } from '../../service/destinations.service';
import { Destination } from '../../model/destination';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatPaginator ,MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-destinations',
  imports: [MatSortModule, MatTableModule, MatIcon,
           MatButtonModule, MatProgressBarModule, CommonModule, MatPaginatorModule],
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css'],
})
export class ManageDestinationsComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['id', 'name', 'airportName', 'airportWebsite', 'email', 'code', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<Destination>();
  isLoading: boolean = true;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private destinationService: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  async loadDestinations(): Promise<void> {
    this.isLoading = true;
    await this.destinationService.refreshDestinations();
    try {
      this.destinationService.refreshDestinations().then((destinations) => {
        this.dataSource.data = destinations;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error('Failed to load destinations:', error);
    }finally {
      this.isLoading = false;
    }
    
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

  openEditDestination(destination: Destination): void {
    this.router.navigate(['/edit-destination', destination.id]);
  }
  
  navigateToAddDestination(): void {
    this.destinationService.createUniqueId().then((uniqueId) => {
      this.router.navigate(['/destination-form', uniqueId]);
    }).catch((error) => {
      console.error('Error creating unique ID:', error);
    });
  }

  deleteDestination(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this destination?');
    if (confirmation) {
      this.destinationService.removeDestination(id)
        .then(() => {
          console.log(`Destination with ID ${id} deleted successfully.`);
          this.dataSource.data = this.dataSource.data.filter(destination => destination.id !== id);
        })
        .catch((error) => {
          console.error(`Error deleting destination with ID ${id}:`, error);
        });
    }
  }
}