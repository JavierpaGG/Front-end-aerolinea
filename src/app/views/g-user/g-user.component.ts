import { Component, ViewChild } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../controllers/users.service';
import { User, Role } from '../../models/user.model';


@Component({
  selector: 'app-g-user',
  standalone: true,
  imports: [GHeaderComponent, CommonModule,FormsModule],
  templateUrl: './g-user.component.html',
  styleUrls: ['./g-user.component.css']
})


export class GUserComponent {
  @ViewChild('myModal') myModal: any; 
  usuarios: any[] = []; 
  nuevoUsuario: User = { 
    id: 0,
    estado: true,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    imagen: '',
    username: '',
    roles: [] as Role[]
  };





  filtro: string = ''; 
  selectedUser: User | null = null; 

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.usersService.findAllUsers().subscribe({
      next: (data: any) => {
        console.log(data); // Verifica la estructura de la respuesta
        if (data._embedded && Array.isArray(data._embedded.usuarios)) {
          this.usuarios = data._embedded.usuarios.filter((user: User) => user.estado === true);
        } else {
          console.error('La respuesta no contiene un arreglo de usuarios', data);
        }
      },
      error: (err: any) => {
        console.error('Error loading users', err);
      }
    });
  }
  
  
  
  

  createUser(): void {
    this.usersService.createUser(this.nuevoUsuario).subscribe({
      next: (user: User) => {
  
        this.usuarios.push(user);
        this.resetNewUser();
        this.closeModal(); 
      },
      error: (err) => {
        console.error('Error creating user', err);

      }
    });
  }

  selectUser(id: number): void {
    this.usersService.findById(id).subscribe({
      next: (user: User) => {
        this.selectedUser = user;
      },
      error: (err) => {
        console.error('Error selecting user', err);
      }
    });
  }

  resetNewUser(): void {
    this.nuevoUsuario = {
      id: 0,
      estado: true,
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      password: '',
      imagen: '',
      username: '',
      roles: [] as Role[]
    };
  }

  searchUsers(): void {
    if (this.filtro.trim() === '') {
      this.loadUsers();
    } else {
      this.usuarios = this.usuarios.filter(user => 
        user.estado === true && 
        (user.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filtro.toLowerCase()))
      );
    }
  }


  agregarUsuario() {

    this.openModal();
  }

  openModal() {
    this.myModal.nativeElement.classList.add('show'); 
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.myModal.nativeElement.classList.remove('show'); 
    this.myModal.nativeElement.style.display = 'none';
  }


  filtrarUsuarios(): any[] {
    if (!this.filtro.trim()) {
      return this.usuarios;
    }
    const filtroMinusculas = this.filtro.toLowerCase();
    return this.usuarios.filter(usuario => {

      return usuario.id.toString().includes(filtroMinusculas) || usuario.nombre.toLowerCase().includes(filtroMinusculas);
    });
  }

 
  limpiarFiltro(): void {
    this.filtro = ''; 
  }

}
