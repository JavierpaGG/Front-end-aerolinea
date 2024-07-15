export interface User {
    id: number;             // El ID del usuario
    estado: boolean;        // Estado del usuario
    roles: Role[];          // Lista de roles del usuario
    nombre: string;         // Nombre del usuario
    direccion: string;      // Dirección del usuario
    telefono: string;       // Número de teléfono del usuario
    username: string;       // Nombre de usuario
    email: string;          // Correo electrónico del usuario
    password: string;       // Contraseña del usuario
    imagen: string;         // URL de la imagen del usuario
  }
  
  export interface Role {
    id: number;             // ID del rol
    nombre: null;         // Nombre del rol
  }
  
