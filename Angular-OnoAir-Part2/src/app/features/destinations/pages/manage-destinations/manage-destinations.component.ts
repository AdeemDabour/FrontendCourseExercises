import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DestinationService } from '../../service/destinations.service';
import { Destination, Status } from '../../model/destination';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatPaginator ,MatPaginatorModule } from '@angular/material/paginator';
import { FlightsService } from '../../../flights/service/flights.service';

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
  Status = Status;
  constructor(
      private destinationService: DestinationService,
      private router: Router,
      private flightService: FlightsService,
    ) {}

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

  async toggleDestinationStatus(destination: Destination): Promise<void> {
    this.isLoading = true;
    const newStatus = destination.status === Status.Active ? Status.Inactive : Status.Active;
    const confirmMessage = newStatus === Status.Inactive
      ? 'Are you sure you want to Deactivate this destination?' 
      : 'Are you sure you want to Activate this destination?';
  
    if (!confirm(confirmMessage)) {
      this.isLoading = false;
      return;
    }
  
    if (newStatus === Status.Inactive) {
      try {
        // Check if there are active flights for this destination
        const activeFlights = await this.flightService.getActiveFlightsByDestination(destination.name);
        if (activeFlights.length > 0) {
          this.isLoading = false;
          alert(`This destination cannot be deactivated because it is used in active flights: 
            ${activeFlights.map(f => `Flight ${f.flightNo}`).join(', ')}`);
          this.loadDestinations();
          return ;
        }
      } catch (error) {
        console.error('Error checking active flights:', error);
        alert('Error verifying active flights. Please try again.');
        this.isLoading = false;
        return;
      }
    }
  
    try {
      destination.status = newStatus;
      await this.destinationService.updateDestination(destination.id, destination);
      this.loadDestinations();
    } catch (error) {
      console.error('Error updating destination status:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
}