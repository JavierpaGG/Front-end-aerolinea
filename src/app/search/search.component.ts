import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../views/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search', 
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule,HeaderComponent,RouterModule]
})
export class SearchComponent implements OnInit {
  query: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.performSearch();
    });
  }

  performSearch(): void {
    const allData = [
      { title: 'Item 1', description: 'Descripción del Item 1' },
      { title: 'Item 2', description: 'Descripción del Item 2' },
      { title: 'Item 3', description: 'Descripción del Item 3' },
    ];

    if (this.query) {
      this.searchResults = allData.filter(item =>
        item.title.toLowerCase().includes(this.query.toLowerCase()) ||
        item.description.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }
}
