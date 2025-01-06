import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Destination } from '../../model/destination';
import { DestinationService } from '../../service/destinations.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destination-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterLink],
  templateUrl: './destination-form.component.html',
  styleUrl: './destination-form.component.css'
})
export class DestinationFormComponent implements OnInit {

  newDestination: Destination = new Destination(0, '', '', '', '', '', '');

  @Input() id = "0";

  constructor(private destinationService: DestinationService) { };

  
  ngOnInit(): void {
    if (this.id) {
      let destinationFormService = this.destinationService.getDestinationByNameOrCode(this.id);
      if (destinationFormService) {
        this.newDestination = destinationFormService;
      }
    }
  }

  onSubmitRegistration() {
    this.destinationService.addDestination(this.newDestination);
  }
}




