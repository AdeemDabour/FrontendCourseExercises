import { Component } from '@angular/core';
import { DestinationService } from '../../service/destinations.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Status } from '../../model/destination';

@Component({
  selector: 'app-create-destination',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule],
  templateUrl: './create-destination.component.html',
  styleUrl: './create-destination.component.css'
})
export class CreateDestinationComponent {
  displayValidateName = false;
  displayValidateAirportName = false;
  displayValidateAirportWebsite = false;
  displayValidateEmail = false;
  displayValidateCode = false;
  displayValidateImageUrl = false;

  constructor(private destinationService: DestinationService, private router: Router) { }

  createDestination(name: string,  airportName: string, airportWebsite: string, email: string, code: string, imageUrl: string, status: Status): void {
    this.displayValidateName = !name || name == '' || name == undefined;
    this.displayValidateAirportName = !airportName || airportName == '' || airportName == undefined;
    this.displayValidateAirportWebsite = !airportWebsite || airportWebsite == '' || airportWebsite == undefined;
    this.displayValidateEmail = !email || email == '' || email == undefined;
    this.displayValidateCode = !code || code == '' || code == undefined;
    this.displayValidateImageUrl = !imageUrl || imageUrl == '' || imageUrl == undefined;
  
    if (
      !this.displayValidateName && 
      !this.displayValidateAirportName &&
      !this.displayValidateAirportWebsite &&
      !this.displayValidateEmail &&
      !this.displayValidateCode &&
      !this.displayValidateImageUrl
    ){
      this.destinationService.addDestination({
        id: "",
        name: name,
        airportName: airportName,
        airportWebsite: airportWebsite,
        email: email,
        code: code,
        imageUrl: imageUrl,
        status: status
      });
      this.router.navigate(['persons-list']);
    }
  }
}