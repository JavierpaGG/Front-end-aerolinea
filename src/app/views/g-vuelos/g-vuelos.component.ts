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

  aeropuertos: { id: number, nombre: string }[] = [
    { id: 1, nombre: "LIM - LIMA" },
    { id: 2, nombre: "AQP - AREQUIPA" },
    { id: 3, nombre: "CUZ - CUSCO" },
    { id: 4, nombre: "TRU - TRUJILLO" },
    { id: 5, nombre: "CIX - CHICLAYO" },
    { id: 6, nombre: "PIU - PIURA" },
    { id: 7, nombre: "IQT - IQUITOS" },
    { id: 8, nombre: "TCQ - TACNA" },
    { id: 9, nombre: "JUL - PUNO" },
    { id: 10, nombre: "PEM - TARAPOTO" },
    { id: 11, nombre: "AYP - JULIACA" },
    { id: 12, nombre: "TBP - PUERTO MALDONADO" },
    { id: 13, nombre: "CHM - AYACUCHO" },
    { id: 14, nombre: "HUU - TUMBES" },
    { id: 15, nombre: "PCL - CHIMBOTE" },
    { id: 16, nombre: "CJA - HUANCAYO" },
    { id: 17, nombre: "JJI - PUCALPPA" },
    { id: 18, nombre: "PIO - CAJAMARCA" }
  ];

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
        console.log(`Vuelo con id ${id} eliminado exitosamente.`);
        this.loadVuelos();
      },
      error: (err) => {
        console.error(`Error al eliminar el vuelo con id ${id}:`, err);
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

  selectVuelo(vuelo: Vuelo): void {
    this.vueloSeleccionado = vuelo;
  }

  navigateToBoletoDetails(): void {
    if (this.vueloSeleccionado) {
      this.router.navigate(['/g-boletos']);
    } else {
      console.error('No se ha seleccionado ningún vuelo.');
    }
  }
  
  getAeropuertoNombre(id: number): string {
    const aeropuerto = this.aeropuertos.find(a => a.id === id);
    return aeropuerto ? aeropuerto.nombre : 'Desconocido';
  }
}
