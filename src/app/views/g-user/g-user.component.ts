import { Component, ViewChild } from '@angular/core';
import { GHeaderComponent } from '../g-header/g-header.component';
import { ApiService } from '../../Api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
  nuevoUsuario: any = {}; // Objeto para almacenar los datos del nuevo usuario
  filtro: string = ''; // Variable para almacenar el texto de búsqueda
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    const endpoint = 'usuarios/listar';
    this.apiService.get(endpoint)
      .then(data => {
        this.usuarios = data; // Almacena los datos de los usuarios en el array
      })
      .catch(error => {
        console.error(error);
      });
  }

  enviarDatos() {
    const endpoint = 'usuarios/crear';
    // Enviar los datos del nuevo usuario al servidor
    this.apiService.post(endpoint, this.nuevoUsuario)
      .then(response => {
        console.log(response);
        // Actualizar la lista de usuarios después de agregar uno nuevo
        this.obtenerDatos();
        // Limpiar los datos del nuevo usuario
        this.nuevoUsuario = {};
        // Cerrar el modal
        this.closeModal();
      })
      .catch(error => {
        console.error(error);
      });
  }

  eliminarUsuario(usuario: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      const endpoint = `usuarios/eliminar/${usuario.id}`; // Asegúrate de incluir el ID del usuario en el endpoint
      this.apiService.delete(endpoint)
        .then(response => {
          console.log(response);
          // Actualizar la lista de usuarios después de eliminar uno
          this.obtenerDatos();
        })
        .catch(error => {
          console.error(error);
        });
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
