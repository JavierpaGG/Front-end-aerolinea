import { Component, ViewChild, ElementRef } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';
import { Vuelo } from '../../models/vuelo.model';
import { VueloService } from '../../controllers/vuelo.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-g-vuelos',
  standalone: true,
  imports: [GHeaderComponent, CommonModule, FormsModule,RouterLink],
  templateUrl: './g-vuelos.component.html',
  styleUrls: ['./g-vuelos.component.css']
})
export class GVuelosComponent {
  vuelo: Vuelo[] = [];
  vueloSeleccionado: Vuelo | null = null;
  nuevoVuelo: Vuelo = {
    id: 0,
    numeroVuelo: '',
    aeropuertoOrigenId: 0,
    aeropuertoLlegadaId: 0,
    fechaSalida: new Date(),
    horaSalida: '',
    horaLlegada: '',
    duracion: 0,
    asientosDisponibles: 0,
    estado: 'ACTIVO',
    precio: 0,
  };

  @ViewChild('addVueloModal') addVueloModal!: ElementRef;

  constructor(private vueloService: VueloService, private router: Router) {}

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

  deleteVuelos(id: number): void {
    this.vueloService.deleteById(id).subscribe({
      next: () => {
        console.log(`Hotel with id ${id} deleted successfully.`);
        this.loadVuelos();
      },
      error: (err) => {
        console.error(`Error deleting hotel with id ${id}:`, err);
      }
    });
  }

  createNuevoVuelo(): void {
    this.vueloService.createVuelo(this.nuevoVuelo).subscribe({
      next: (createdVuelo: Vuelo) => {
        console.log('Vuelo creado:', createdVuelo);
        this.clearNuevoVuelo(); // Limpiar los campos del formulario después de guardar
        const modalElement = document.getElementById('addVueloModal');
        if (modalElement) {
          modalElement.classList.remove('show'); // Remover la clase 'show' que mantiene el modal visible
        }
        this.loadVuelos();
      },
      
      error: (err) => {
        console.error('Error al crear vuelo:', err);
      }
    });
  }

  clearNuevoVuelo(): void {
    this.nuevoVuelo = {
      id: 0,
      numeroVuelo: '',
      aeropuertoOrigenId: 0,
      aeropuertoLlegadaId: 0,
      fechaSalida: new Date(),
      horaSalida: '',
      horaLlegada: '',
      duracion: 0,
      asientosDisponibles: 0,
      estado: 'ACTIVO',
      precio: 0,
    };
  }
  cerrarModal(): void {
    const modalElement = document.getElementById('addVueloModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.hide();
    }
  }
  openAddVueloModal(): void {
    const modalElement = this.addVueloModal.nativeElement;
    const modal = new Modal(modalElement);
    modal.show();
  }

  onSubmit(): void {
    this.vueloService.createVuelo(this.nuevoVuelo).subscribe({
      next: (vuelo) => {
        this.vuelo.push(vuelo);
        const modalElement = this.addVueloModal.nativeElement;
        const modal = new Modal(modalElement);
        modal.hide();
      },
      error: (err) => {
        console.error('Error al crear el vuelo', err);
      }
    });
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  selectVuelo(vuelo: Vuelo): void {
    this.vueloSeleccionado = vuelo;
  }

  navigateToBoletoDetails(): void {
    if (this.vueloSeleccionado) {
      this.router.navigate(['/boleto', this.vueloSeleccionado.id]);
    } else {
      console.error('No se ha seleccionado ningún vuelo.');
    }
  }
}
  
 