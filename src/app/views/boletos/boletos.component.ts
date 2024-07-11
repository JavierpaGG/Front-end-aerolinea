import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoletoService } from '../../controllers/boleto.service';
import { Boleto, DetalleBoleto } from '../../models/boleto.model';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.css'
})
export class BoletosComponent implements OnInit {
  idVuelo: number = 0;
  boletos: Boleto[] = [];
  detallesBoleto: DetalleBoleto[] = [];
  selectedSeats: Set<string> = new Set<string>();
  showSeatSelection: boolean = false;
  esIdaYVuelta: boolean = true;
  seatRows: any[] = []; // Arreglo de filas de asientos

  // Definir los asientos del avión
  seats: string[] = Array.from({ length: 60 }, (_, i) => `A${i + 1}`);

  constructor(
    private route: ActivatedRoute,
    private boletoService: BoletoService
    
  ) {}

  ngOnInit(): void {
    const idVueloParam = this.route.snapshot.paramMap.get('idVuelo');
    if (idVueloParam) {
      this.idVuelo = Number(idVueloParam);

      this.addDetalleBoleto(); // Agregar detalle de boleto inicial
    }
  }

  loadBoletos(): void {
    this.boletoService.getBoletoById(this.idVuelo).subscribe({
      next: (data: Boleto[]) => {
        this.boletos = data;
        this.detallesBoleto = this.boletos.length ? this.boletos[0].detallesBoleto : [];
        this.loadSelectedSeats();
      },
      error: (err) => {
        console.error('Error al cargar boletos', err);
      }
    });
  }

  loadSelectedSeats(): void {
    this.selectedSeats = new Set<string>();
    this.detallesBoleto.forEach((detalle) => {
      if (detalle.asiento) {
        this.selectedSeats.add(detalle.asiento);
      }
    });
  }

  toggleSeatSelection(): void {
    this.showSeatSelection = !this.showSeatSelection;
  }

  isSeatAvailable(seat: string): boolean {
    return !this.selectedSeats.has(seat);
  }

  toggleSeat(seat: string) {
    const currentDetalle = this.detallesBoleto[this.detallesBoleto.length - 1]; // Último detalle de boleto agregado
  
    // Verificar si el asiento seleccionado pertenece a la categoría actual del detalle de boleto
    const seatIndex = this.seats.indexOf(seat);
    if (currentDetalle && this.isValidCategory(seatIndex, currentDetalle.categoriaViaje)) {
      if (this.selectedSeats.has(seat)) {
        this.selectedSeats.delete(seat);
      } else {
        this.selectedSeats.add(seat);
      }
    }
  }
  isValidCategory(seatIndex: number, categoria: string): boolean {
    switch (categoria) {
      case 'PRIMERA_CLASE':
        return seatIndex < 20; // Asientos A1 a A20 para Primera Clase
      case 'EJECUTIVO':
        return seatIndex >= 20 && seatIndex < 40; // Asientos A21 a A40 para Ejecutivo
      case 'ECONOMICO':
        return seatIndex >= 40 && seatIndex < 60; // Asientos A41 a A60 para Económico
      default:
        return false;
    }
  }

  isSelected(seat: string): boolean {
    return this.selectedSeats.has(seat);
  }

  ensureInitialDetalleBoleto() {
    if (this.detallesBoleto.length === 0) {
      this.addDetalleBoleto();
    }
  }

  addDetalleBoleto() {
    this.detallesBoleto.push({
      id: 0,
      nombreCompleto: '',
      dni: '',
      asiento: '',
      categoriaViaje: 'ECONOMICO',
      esIda: this.esIdaYVuelta,
      precioUnitario: 0
    });
  }

  generateNumeroBoleto(): string {
    return 'B' + Math.floor(Math.random() * 1000000000).toString();
  }

  purchaseBoleto() {
    if (this.selectedSeats.size !== this.detallesBoleto.length) {
      alert('Selecciona asientos para todos los pasajeros antes de continuar.');
      return;
    }

    this.detallesBoleto.forEach((detalle, index) => {
      detalle.asiento = Array.from(this.selectedSeats)[index];
    });

    const newBoleto: Boleto = {
      id: 0,
      numeroBoleto: this.generateNumeroBoleto(),
      fechaEmision: new Date(),
      usuarioId: 0,
      metodoPago: 'TARJETA',
      esIdaYVuelta: this.esIdaYVuelta,
      idVuelo: this.idVuelo,
      detallesBoleto: this.detallesBoleto,
      precioFinal: 0,
      estado: 'ACTIVO'
    };

    this.boletoService.createBoleto(newBoleto).subscribe({
      next: (data) => {
        console.log('Boleto creado:', data);
        alert('Boleto comprado con éxito.');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al comprar boleto', err);
      }
    });
  }

  resetForm() {
    this.selectedSeats.clear();
    this.detallesBoleto = [];
    this.showSeatSelection = false;
    this.addDetalleBoleto();
  }
}