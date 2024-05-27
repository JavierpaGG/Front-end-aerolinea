import { Component, ViewChild } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';
import { ApiService } from '../../Api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Hospedaje {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-gestion-hospedaje',
  standalone: true,
  imports: [GHeaderComponent,CommonModule,FormsModule],
  templateUrl: './gestion-hospedaje.component.html',
  styleUrl: './gestion-hospedaje.component.css'
})
export class GestionHospedajeComponent {
  hospedajes: Hospedaje[] = [];
  currentHospedaje: Hospedaje = { id: 0, nombre: '', descripcion: '', precio: 0 };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadHospedajes();
  }

  loadHospedajes(): void {
    this.apiService.get('hospedajes').then(data => {
      this.hospedajes = data;
    }).catch(error => {
      console.error('Error al cargar los hospedajes', error);
    });
  }

  onSubmit(): void {
    if (this.currentHospedaje.id) {
      // Actualizar hospedaje
      this.apiService.put(`hospedajes/${this.currentHospedaje.id}`, this.currentHospedaje).then(() => {
        this.loadHospedajes();
        this.resetForm();
      }).catch(error => {
        console.error('Error al actualizar el hospedaje', error);
      });
    } else {
      // Crear nuevo hospedaje
      this.apiService.post('hospedajes', this.currentHospedaje).then(() => {
        this.loadHospedajes();
        this.resetForm();
      }).catch(error => {
        console.error('Error al crear el hospedaje', error);
      });
    }
  }

  editHospedaje(hospedaje: Hospedaje): void {
    this.currentHospedaje = { ...hospedaje };
  }

  deleteHospedaje(id: number): void {
    this.apiService.delete(`hospedajes/${id}`).then(() => {
      this.loadHospedajes();
    }).catch(error => {
      console.error('Error al borrar el hospedaje', error);
    });
  }

  resetForm(): void {
    this.currentHospedaje = { id: 0, nombre: '', descripcion: '', precio: 0 };
  }
}