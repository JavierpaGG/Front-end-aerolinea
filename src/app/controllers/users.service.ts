import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8090/api/usuarios/usuarios');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8090/api/usuarios/usuarios', user);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8090/api/usuarios/listar/${id}`);
  }

//   deleteById(id: number): Observable<void> {
//     return this.http.delete<void>(`http://localhost:8090/api/usuarios/eliminar/${id}`);
//   }
}
