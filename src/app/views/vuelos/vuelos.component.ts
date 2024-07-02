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

  constructor(
    private vueloService: VueloService,
    private router: Router // Inyectamos el Router
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
      return; // No permitir ir hacia atrás si estamos en la semana actual o anterior
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
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Ajuste si el día es domingo
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  updatePreviousWeekDisabled(): void {
    const today = this.getStartOfWeek(new Date());
    this.isPreviousWeekDisabled = this.currentWeekStart <= today;
  }
  navigateToBoletos(idBoletos: number): void {
    this.router.navigate(['/boletos', idBoletos]); // Navegar a la ruta para generar boletos con el id del vuelo
  }
}