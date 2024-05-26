import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-g-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './g-header.component.html',
  styleUrl: './g-header.component.css'
})
export class GHeaderComponent {

}
