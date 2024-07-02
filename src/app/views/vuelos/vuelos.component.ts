import { HeaderComponent } from './../header/header.component';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { FooterComponent } from '../footer/footer.component';
import { Vuelo } from '../../models/vuelo.model';
import { VueloService } from '../../controllers/vuelo.service';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,],
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
})
export class VuelosComponent implements OnInit {
  vuelos: Vuelo[] = [];
  filteredVuelos: Vuelo[] = [];
  selectedDate: Date = new Date();
  daysOfWeek: { date: Date, dayName: string }[] = [];
  currentWeekStart: Date = this.getStartOfWeek(new Date());
  isPreviousWeekDisabled: boolean = true;

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

  constructor(
    private vueloService: VueloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVuelos();
    this.generateDaysOfWeek();
  }

  loadVuelos(): void {
    this.vueloService.findAllVuelo().subscribe({
      next: (data: Vuelo[]) => {
        this.vuelos = data;
        this.filterVuelosByDate();
      },
      error: (err) => {
        console.error('Error al cargar vuelos', err);
      }
    });
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.filterVuelosByDate();
  }

  filterVuelosByDate(): void {
    const selectedDateStr = this.selectedDate.toISOString().split('T')[0];
    this.filteredVuelos = this.vuelos.filter(vuelo =>
      vuelo.fechaSalida.toString().split('T')[0] === selectedDateStr
    );
  }

  generateDaysOfWeek(): void {
    this.daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(this.currentWeekStart);
      date.setDate(this.currentWeekStart.getDate() + i);
      return { date, dayName: this.getDayName(date) };
    });
    this.updatePreviousWeekDisabled();
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.generateDaysOfWeek();
  }

  previousWeek(): void {
    const today = this.getStartOfWeek(new Date());
    if (this.currentWeekStart <= today) {
      return; 
    }
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.generateDaysOfWeek();
  }

  getDayName(date: Date): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  }

  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  updatePreviousWeekDisabled(): void {
    const today = this.getStartOfWeek(new Date());
    this.isPreviousWeekDisabled = this.currentWeekStart <= today;
  }

  navigateToBoletos(idVuelo: number): void {
    this.router.navigate(['/boletos']);
  }
  

  getNombreAeropuerto(id: number): string {
    const aeropuerto = this.aeropuertos.find(a => a.id === id);
    return aeropuerto ? aeropuerto.nombre : 'Aeropuerto no encontrado';
  }
}