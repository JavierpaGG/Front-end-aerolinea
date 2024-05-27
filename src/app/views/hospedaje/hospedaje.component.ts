import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HabitacionesComponent } from '../habitaciones/habitaciones.component';
import { ApiService } from '../../Api/api.service';

@Component({
  selector: 'app-hospedaje',
  standalone: true,
  imports: [RouterModule, HeaderComponent,CommonModule,FooterComponent,HabitacionesComponent],
  templateUrl: './hospedaje.component.html',
  styleUrl: './hospedaje.component.css'
})
export class HospedajeComponent {
  hoteles: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.obtenerDatos();
  }
  obtenerDatos() {
    const endpoint = 'hoteles/listar';
    this.apiService.get(endpoint)
      .then(data => {
        this.hoteles = data; // Almacena los datos de los hoteles en el array
      })
      .catch(error => {
        console.error(error);
      });
  }
}