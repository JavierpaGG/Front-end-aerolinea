import { Component, OnInit } from '@angular/core';
import { Boleto } from '../../models/boleto.model';
import { BoletoService } from '../../controllers/boleto.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './boletos.component.html',
  styleUrl: './boletos.component.css'
})
export class BoletosComponent implements OnInit {
  boletos: Boleto[] = [];

  constructor(
    private router: Router,
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

  deleteBoleto(id: number) {
    this.boletoService.deleteBoletoById(id).subscribe(
      () => {
        this.loadBoletos();
      },
      (error) => {
        console.error('Error deleting boleto', error);
      }
    );
  }
  irAPaginaDePagos(boleto: Boleto) {
    this.router.navigate(['/pagos', boleto.id]);
  }
}