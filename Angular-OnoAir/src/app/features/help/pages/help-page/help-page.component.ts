import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-help-page',
  imports: [MatToolbarModule, MatAccordion, MatExpansionModule, MatCardModule, MatIconModule, MatButtonModule, MatDivider],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css'
})
export class HelpPageComponent {
  contactSupport() {
    window.location.href = 'mailto:support@onoair.com';
  }  
}