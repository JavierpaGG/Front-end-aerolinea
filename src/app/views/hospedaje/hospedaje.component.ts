import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HabitacionesComponent } from '../habitaciones/habitaciones.component';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../controllers/hotel.service';

@Component({
  selector: 'app-hospedaje',
  standalone: true,
  imports: [RouterModule, HeaderComponent,CommonModule,FooterComponent,HabitacionesComponent],
  templateUrl: './hospedaje.component.html',
  styleUrl: './hospedaje.component.css'
})


export class HospedajeComponent {
  hoteles: Hotel[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHospedajes();
  }

  loadHospedajes(): void {
    this.hotelService.findAllHotel().subscribe({
      next: (data: Hotel[]) => {
        this.hoteles = data.filter(hoteles => hoteles.estado === true);
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }
}