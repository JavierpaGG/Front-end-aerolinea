import { Component, OnInit } from '@angular/core';
import { Boleto } from '../../../models/boleto.model';
import { BoletoService } from '../../../controllers/boleto.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-g-vuelos-boletos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './g-vuelos-boletos.component.html',
  styleUrl: './g-vuelos-boletos.component.css'
})
export class GVuelosBoletosComponent implements OnInit {
  vueloId: number | undefined;
  boletos: Boleto[] = [];

  constructor(
    private route: ActivatedRoute,
    private boletoService: BoletoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vueloId = +params['idBoletos']; // Obtener el idBoletos de los parámetros de ruta
      console.log('ID del vuelo recibido:', this.vueloId); // Agregar este log para verificar
      if (this.vueloId) {
        this.loadBoletos();
      }
    });
  }

  loadBoletos(): void {
    if (this.vueloId) {
      this.boletoService.getBoletoById(this.vueloId).subscribe({
        next: (data: Boleto[]) => {
          this.boletos = data;
        },
        error: (err) => {
          console.error(`Error al cargar boletos para el vuelo con ID ${this.vueloId}`, err);
        }
      });
    }
  }
}