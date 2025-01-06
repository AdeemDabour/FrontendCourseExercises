import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Destination } from '../../model/destination';
import { DestinationService } from '../../service/destinations.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-destination-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './destination-form.component.html',
  styleUrl: './destination-form.component.css'
})
export class DestinationFormComponent implements OnInit {

  newDestination: Destination = new Destination(0, '', '', '', '', '', '');

  @Input() id = 0;

  constructor(private destinationService: DestinationService, private router: Router) { };


  ngOnInit(): void {
    if (this.id > 0) {
      const destination = this.destinationService.getDestinationByNameOrCode(this.id.toString());
      if (destination) {
        this.newDestination = destination;
      }
    }
  }  
  addDestination() {
    this.destinationService.addDestination(this.newDestination);
    this.router.navigate(['/manage-destinations']);
  }

  removeDestination() {
    this.destinationService.removeDestination(this.newDestination.id);
    this.router.navigate(['/manage-destinations']);
  }

  onSubmitRegistration(): void {
    if (!this.newDestination.id || this.newDestination.id === 0) {
      this.newDestination.id = this.destinationService.createUniqueId();
    }
    this.destinationService.addDestination(this.newDestination);
    this.router.navigate(['/manage-destinations']);
  }  
}




