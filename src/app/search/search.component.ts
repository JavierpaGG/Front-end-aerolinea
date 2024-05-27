import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../views/header/header.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../Api/api.service';
import { FooterComponent } from '../views/footer/footer.component';
@Component({
  selector: 'app-search', 
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule,HeaderComponent,RouterModule,FooterComponent]
})

export class SearchComponent implements OnInit {
  
  query: string = '';
  hotelResults: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.performSearch();
    });
  }

  performSearch(): void {
    if (this.query) {
      this.apiService.searchHotels(this.query).then((hotels: any[]) => {
        this.hotelResults = hotels;
      }).catch(error => {
        console.error('Error searching hotels:', error);
      });
    } else {
      this.hotelResults = [];
    }
  }
}