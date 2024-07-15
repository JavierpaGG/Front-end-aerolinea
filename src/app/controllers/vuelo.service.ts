import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/vuelo.model';

@Injectable({
    providedIn: 'root'
  })
  export class VueloService{
    constructor(private http: HttpClient) {}

    findAllVuelo(): Observable<Vuelo[]> {
        return this.http.get<Vuelo[]>('http://localhost:8090/api/vuelos/vuelo/listar');
      }
    
      findDate(fecha: Date): Observable<Vuelo[]> {
        return this.http.get<Vuelo[]>(`http://localhost:8090/api/vuelos/vuelo/listar/fecha/${fecha}`);
      }

      findById(id: number): Observable<Vuelo> {
        return this.http.get<Vuelo>(`http://localhost:8090/api/vuelos/vuelo/listar/${id}`);
      }
    
      createVuelo(habitacion: Vuelo): Observable<Vuelo> {
        return this.http.post<Vuelo>('http://localhost:8090/api/vuelos/vuelo/crear', habitacion);
      }
    
      deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8090/api/vuelos/vuelo/eliminar/${id}`);
      }
  }