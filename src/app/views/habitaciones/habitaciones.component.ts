import { FooterComponent } from './../footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Habitacion } from '../../models/habitacion.model';
import { HabitacionService } from '../../controllers/habitacion.service';
@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent {
  habitaciones: Habitacion[] = [];

  constructor(private route: ActivatedRoute, private habitacionService: HabitacionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idHotel = params['idHotel']; 

      if (idHotel) {
        this.obtenerDatos(idHotel);
      }
    });
  }

  obtenerDatos(idHotel: string) {
    this.habitacionService.findRoomByHotel(parseInt(idHotel)).subscribe({
      next: (data: Habitacion[]) => {
        this.habitaciones = data.filter(habitacion => habitacion.estado === true);
      },
      error: (err) => {
        console.error('Error loading habitaciones', err);
      }
    });
  }
}
