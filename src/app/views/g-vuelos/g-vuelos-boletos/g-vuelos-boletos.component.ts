import { Component, OnInit } from '@angular/core';
import { Boleto } from '../../../models/boleto.model';
import { BoletoService } from '../../../controllers/boleto.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-g-vuelos-boletos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './g-vuelos-boletos.component.html',
  styleUrl: './g-vuelos-boletos.component.css'
})
export class GVuelosBoletosComponent implements OnInit {
  boletos: Boleto[] = [];

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
      },
      (error) => {
        console.error('Error fetching boletos', error);
      }
    );
  }
}
