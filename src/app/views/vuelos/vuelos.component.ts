import { HeaderComponent } from './../header/header.component';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Vuelo } from '../../models/vuelo.model';
import { VueloService } from '../../controllers/vuelo.service';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
})
export class VuelosComponent {
  vuelo : any[]=[];
  nuevoVuelo: Vuelo = {
    id:                    0,
    numeroVuelo:           '',
    aeropuertoOrigenId:    0,
    aeropuertoLlegadaId:   0,
    fechaSalida:           new Date(),
    horaSalida:            '',
    horaLlegada:           '',
    duracion:              0,
    asientosDisponibles:   0,
    estado:                '',
    precio:                0,
  };

  constructor(private vueloService: VueloService){}

  ngOnInit(): void {
    this.loadVuelos();
  }
  
  loadVuelos(): void {
    this.vueloService.findAllVuelo().subscribe({
      next: (data: Vuelo[]) => {
        this.vuelo = data;
      },
      error: (err) => {
        console.error('Error al cargar vuelos', err);
      }
    });
  }
}