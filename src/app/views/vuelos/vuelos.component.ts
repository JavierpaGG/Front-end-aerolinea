import { HeaderComponent } from './../header/header.component';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
})
export class VuelosComponent {
  vuelos: any[] = [
    { origen: 'Nueva York', destino: 'Los Ángeles', fecha: '2024-06-10', precio: '$200' },
    { origen: 'Londres', destino: 'París', fecha: '2024-07-15', precio: '£150' },
    { origen: 'Tokio', destino: 'Sídney', fecha: '2024-08-20', precio: '¥25000' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}