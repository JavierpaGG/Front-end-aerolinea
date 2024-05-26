import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hospedaje',
  standalone: true,
  imports: [RouterModule, HeaderComponent,CommonModule],
  templateUrl: './hospedaje.component.html',
  styleUrl: './hospedaje.component.css'
})
export class HospedajeComponent {
  hoteles = [
    { 
      name: 'Hotel 1', 
      location: 'Ubicación del Hotel 1', 
      rooms: 10, 
      rating: 4.5,
      image: 'https://via.placeholder.com/400x200?text=Hotel+1' 
    },
    { 
      name: 'Hotel 2', 
      location: 'Ubicación del Hotel 2', 
      rooms: 15, 
      rating: 4.0,
      image: 'https://via.placeholder.com/400x200?text=Hotel+2' 
    },
    { 
      name: 'Hotel 3', 
      location: 'Ubicación del Hotel 3', 
      rooms: 20, 
      rating: 4.2,
      image: 'https://via.placeholder.com/400x200?text=Hotel+3' 
    }
  ];
}