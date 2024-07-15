import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule,RouterModule]
})
export class HeaderComponent {
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