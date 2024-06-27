import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
    providedIn: 'root'
  })
  export class HotelService{
    constructor(private http: HttpClient) {}

  findAllHotel(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('http://localhost:8090/api/hoteles/listar');
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>('http://localhost:8090/api/hoteles/crear', hotel);
  }

  findById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`http://localhost:8090/api/hoteles/listar/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/api/hoteles/eliminar/${id}`);
  }
  }