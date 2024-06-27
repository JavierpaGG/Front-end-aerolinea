import { Component, ViewChild } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../controllers/users.service';
import { delay, switchMap } from 'rxjs';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-g-user',
  standalone: true,
  imports: [GHeaderComponent, CommonModule,FormsModule],
  templateUrl: './g-user.component.html',
  styleUrls: ['./g-user.component.css']
})


export class GUserComponent {
  @ViewChild('myModal') myModal: any; // ViewChild para acceder al modal en el componente
  usuarios: any[] = []; // Array para almacenar los usuarios
  nuevoUsuario: User = { // Objeto para almacenar los datos del nuevo usuario
    id: 0,
    estado: true,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    imagen: ''
  };
  filtro: string = ''; // Variable para almacenar el texto de búsqueda
  selectedUser: User | null = null; // Declaración de selectedUser como propiedad de la clase

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.findAllUsers().subscribe({
      next: (data: User[]) => {
        this.usuarios = data.filter(user => user.estado === true); // Filtrar solo usuarios activos
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }

  createUser(): void {
    this.usersService.createUser(this.nuevoUsuario).subscribe({
      next: (user: User) => {
        // Agregar el nuevo usuario a la lista local solo si la solicitud fue exitosa
        this.usuarios.push(user);
        this.resetNewUser(); // Limpiar el formulario
        this.closeModal(); // Cerrar el modal después de agregar
      },
      error: (err) => {
        console.error('Error creating user', err);
        // Manejar el error apropiadamente
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

  deleteUser(id: number): void {
    this.usersService.deleteById(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(user => user.id !== id);
        if (this.selectedUser && this.selectedUser.id === id) {
          this.selectedUser = null;
        }
      },
      error: (err) => {
        console.error('Error deleting user', err);
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
      imagen: ''
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
    // Abre el modal para agregar un nuevo usuario
    this.openModal();
  }

  openModal() {
    this.myModal.nativeElement.classList.add('show'); // Muestra el modal
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.myModal.nativeElement.classList.remove('show'); // Oculta el modal
    this.myModal.nativeElement.style.display = 'none';
  }

  // Método para filtrar usuarios según el texto de búsqueda
  filtrarUsuarios(): any[] {
    if (!this.filtro.trim()) {
      return this.usuarios; // Si el filtro está vacío, mostrar todos los usuarios
    }
    const filtroMinusculas = this.filtro.toLowerCase();
    return this.usuarios.filter(usuario => {
      // Filtrar por ID o nombre (puedes agregar más campos si lo deseas)
      return usuario.id.toString().includes(filtroMinusculas) || usuario.nombre.toLowerCase().includes(filtroMinusculas);
    });
  }

  // Método para limpiar el filtro de búsqueda
  limpiarFiltro(): void {
    this.filtro = ''; // Limpiar el texto de búsqueda
  }

}
