import { Component, OnInit } from '@angular/core';
import { Boleto } from '../../../models/boleto.model';
import { BoletoService } from '../../../controllers/boleto.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule, Color,ScaleType  } from '@swimlane/ngx-charts'; 

@Component({
  selector: 'app-g-vuelos-boletos',
  standalone: true,
  imports: [CommonModule,NgxChartsModule],
  templateUrl: './g-vuelos-boletos.component.html',
  styleUrl: './g-vuelos-boletos.component.css'
})
export class GVuelosBoletosComponent implements OnInit {
  boletos: Boleto[] = [];
  totalIngresos: number = 0;
  boletosPorEstado: { name: string, value: number }[] = [];
  boletosPorCategoria: { name: string, value: number }[] = [];
  colorScheme: Color = {
    name: 'Boletos', 
    selectable: true, 
    group: ScaleType.Ordinal, 
    domain: ['#feb47b', '#A10A28', '#C7B42C', '#AAAAAA'] 
  };

  constructor(
    private route: ActivatedRoute,
    private boletoService: BoletoService
  ) {}

  ngOnInit(): void {
    this.loadBoletos();
  }

  loadBoletos() {
    this.boletoService.getAllBoletos().subscribe(
      (data: Boleto[]) => {
        this.boletos = data;
        this.calculateTotalIngresos();
        this.calculateBoletosPorEstado();
        this.calculateBoletosPorCategoria();
      },
      (error) => {
        console.error('Error fetching boletos', error);
      }
    );
  }

  calculateTotalIngresos() {
    this.totalIngresos = this.boletos.reduce((acc, boleto) => acc + boleto.precioFinal, 0);
  }

  calculateBoletosPorEstado() {
    const estadoMap: { [key: string]: number } = this.boletos.reduce((acc, boleto) => {
      acc[boleto.estado] = (acc[boleto.estado] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.boletosPorEstado = Object.keys(estadoMap).map(estado => {
      return { name: estado, value: estadoMap[estado] };
    });
  }

  calculateBoletosPorCategoria() {
    const categoriaMap: { [key: string]: number } = this.boletos.reduce((acc, boleto) => {
      boleto.detallesBoleto.forEach(detalle => {
        acc[detalle.categoriaViaje] = (acc[detalle.categoriaViaje] || 0) + 1;
      });
      return acc;
    }, {} as { [key: string]: number });

    this.boletosPorCategoria = Object.keys(categoriaMap).map(categoria => {
      return { name: categoria, value: categoriaMap[categoria] };
    });
  }
}