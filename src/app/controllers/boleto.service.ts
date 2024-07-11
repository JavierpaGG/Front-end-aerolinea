import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boleto } from '../models/boleto.model';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {
  private baseUrl = 'http://localhost:8090/api/boletos/boleto';

  constructor(private http: HttpClient) {}

  getAllBoletos(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.baseUrl}/listar`);
  }

  getBoletoById(id: number): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.baseUrl}/listar/${id}`);
  }

  createBoleto(boleto: Boleto): Observable<Boleto> {
    return this.http.post<Boleto>(`${this.baseUrl}/crear`, boleto);
  }

  deleteBoletoById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }
}
