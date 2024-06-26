import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule,RouterModule]
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this.router.navigate(['/search'], { queryParams: { query: searchTerm } });
    }
  }
}
