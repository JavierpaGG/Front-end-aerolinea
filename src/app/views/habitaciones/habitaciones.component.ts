import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../Api/api.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
declare var $: any;
@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent {
  habitaciones: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idHotel = params['idHotel']; // Acceder al parámetro por su nombre, no por su índice

      if (idHotel) {
        this.obtenerDatos(idHotel);
      }
    });
  }

  obtenerDatos(idHotel: string) {
    const endpoint = `hoteles/habitacion/listarHotel/${idHotel}`;
    this.apiService.get(endpoint)
      .then(data => {
        this.habitaciones = data; 
      })
      .catch(error => {
        console.error(error);
      });
  }
}