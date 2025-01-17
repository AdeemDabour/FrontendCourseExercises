import { Component,OnInit } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { DestinationService } from './features/destinations/service/destinations.service';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, MatIconModule, MatButtonModule, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'OnoAir';
  constructor(private destinationService: DestinationService) {}
  ngOnInit(): void {
    // Call the initialization method once
    this.destinationService.initializeDestinations();
    //used to add the whole destinations array to the firestore databse , DO NOT USE , will be removed later.
  }
}