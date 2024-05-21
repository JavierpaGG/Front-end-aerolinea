import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {CardComponent} from '../card/card.component';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, 
    MatSidenavContainer, MatListModule, MatFormFieldModule, MatInputModule, 
    MatDatepickerModule, MatIconModule, MatNativeDateModule, MatSelectModule, 
    CardComponent, FooterComponent, HeaderComponent],
  providers: [provideNativeDateAdapter()], 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  options = [
    { value: 'option1', viewValue: 'Opción 1' },
    { value: 'option2', viewValue: 'Opción 2' },
    { value: 'option3', viewValue: 'Opción 3' }
  ];
}