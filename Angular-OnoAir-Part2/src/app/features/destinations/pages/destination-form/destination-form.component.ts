import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Destination,Status } from '../../model/destination';
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

  newDestination: Destination = new Destination('', '', '', '', '', '', '', Status.Active);


  constructor(private destinationService: DestinationService, private router: Router) { };

  ngOnInit(): void {
    this.destinationService.loadDestinations();
  }

  onSubmitRegistration(): void {    
    this.destinationService.addDestination(this.newDestination);
    this.router.navigate(['/manage-destinations']);
  }  
}