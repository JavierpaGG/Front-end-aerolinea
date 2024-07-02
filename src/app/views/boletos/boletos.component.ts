import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Boleto } from '../../models/boleto.model';
import { BoletoService } from '../../controllers/boleto.service';
@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.css'
})
export class BoletosComponent implements OnInit {
  vueloId: number = 0; // Inicializado con un valor por defecto
  boletos: Boleto[] = [];

  constructor(
    private route: ActivatedRoute,
    private boletoService: BoletoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vueloId = +params['idBoletos']; // Obtener el id del vuelo desde los parámetros de la ruta
      // this.loadBoletos();
    });
  }

  // loadBoletos(): void {
  //   this.boletoService.getBoletoById(this.vueloId).subscribe({
  //     next: (data: Boleto) => {
  //       // Aquí se espera recibir un solo Boleto, no un arreglo de Boleto[]
  //       if (data) {
  //         this.boletos = [data]; // Convertir el Boleto recibido en un arreglo de un solo elemento
  //       } else {
  //         this.boletos = []; // Si no se encuentra ningún boleto, se asigna un arreglo vacío
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al cargar los boletos', error);
  //     }
  //   });
  // }
}