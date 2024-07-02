import { Component } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hotel} from '../../models/hotel.model';
import { HotelService } from '../../controllers/hotel.service';
import { Habitacion } from '../../models/habitacion.model';
import { HabitacionService } from '../../controllers/habitacion.service';

@Component({
  selector: 'app-gestion-hospedaje',
  standalone: true,
  imports: [GHeaderComponent,CommonModule,FormsModule],
  templateUrl: './gestion-hospedaje.component.html',
  styleUrl: './gestion-hospedaje.component.css'
})

export class GestionHospedajeComponent {
  hotel: any[]=[];
  nuevoHotel: Hotel = {
    id: 0,
    estado: true,
    nombre: '',
    direccion: '',
    categoria: '',
    imagen: '',
  };
  habitacion: any[]=[];
  nuevoHabitacion: Habitacion = {
    id:                 0,
    estado:             true,
    tipo_habitacion:     '',
    hotel:              this.nuevoHotel, 
    cantidad_camas:      0,
    cantidad_personas:   0,
    precio:             0,
    imagen:             '',
  }
  
  habitacionesPorHotel: { [key: number]: Habitacion[] } = {};

  constructor(private hotelService: HotelService, private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.loadHospedajes();
  }

  loadHospedajes(): void {
    this.hotelService.findAllHotel().subscribe({
      next: (data: Hotel[]) => {
        this.hotel = data.filter(hotel => hotel.estado === true);
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }


  editHospedaje(hotel: Hotel): void {
    this.nuevoHotel = { ...hotel };
  }

  deleteHospedaje(id: number): void {
    this.hotelService.deleteById(id).subscribe({
      next: () => {
        console.log(`Hotel with id ${id} deleted successfully.`);
        this.loadHospedajes();
      },
      error: (err) => {
        console.error(`Error deleting hotel with id ${id}:`, err);
      }
    });
  }

  toggleHabitaciones(hotel: Hotel): void {
    if (this.habitacionesPorHotel[hotel.id]) {
      delete this.habitacionesPorHotel[hotel.id];
    } else {
      this.habitacionService.findRoomByHotel(hotel.id).subscribe({
        next: (data: Habitacion[]) => {
          this.habitacionesPorHotel[hotel.id] = data;
        },
        error: (err) => {
          console.error(`Error loading habitaciones for hotel with id ${hotel.id}:`, err);
        }
      });
    }
  }
}
