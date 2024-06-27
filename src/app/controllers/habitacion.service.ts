import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion.model';

@Injectable({
    providedIn: 'root'
  })
  export class HabitacionService{
    constructor(private http: HttpClient) {}

  findAllRoom(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>('http://localhost:8090/api/hoteles/habitacion/listar');
  }

  findRoomByHotel(id: number): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(`http://localhost:8090/api/hoteles/habitacion/listarHotel/${id}`);
  }

  createHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>('http://localhost:8090/api/hoteles/habitacion/crear', habitacion);
  }

  findById(id: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(`http://localhost:8090/api/hoteles/habitacion/listar/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/api/hoteles/habitacion/eliminar/${id}`);
  }
  }