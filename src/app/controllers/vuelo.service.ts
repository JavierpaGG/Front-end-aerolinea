import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.model';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
  private baseUrl = 'http://localhost:8090/api/vuelos/vuelo';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  findAllVuelo(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.baseUrl}/listar`, { headers: this.getHeaders() });
  }

  findDate(fecha: Date): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.baseUrl}/listar/fecha/${fecha}`, { headers: this.getHeaders() });
  }

  findById(id: number): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${this.baseUrl}/listar/${id}`, { headers: this.getHeaders() });
  }

  createVuelo(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(`${this.baseUrl}/crear`, vuelo, { headers: this.getHeaders() });
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`, { headers: this.getHeaders() });
  }
}
