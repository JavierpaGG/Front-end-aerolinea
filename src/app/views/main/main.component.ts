import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CardComponent} from '../card/card.component';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, FooterComponent, HeaderComponent],
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