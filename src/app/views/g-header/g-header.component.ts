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
  isLoggedIn: boolean = false; 

  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}