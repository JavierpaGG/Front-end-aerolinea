import { Component } from '@angular/core';
import {User, Role} from './../../models/user.model';
import { UsersService } from '../../controllers/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm: FormGroup;
  confirmPassword: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UsersService) {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      username: ['', Validators.required],
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.confirmPassword = this.userForm.value.confirmPassword;
    if (this.userForm.valid && this.userForm.value.password === this.confirmPassword) {
      // Encriptar la contraseña usando bcryptjs
      const hashedPassword = bcrypt.hashSync(this.userForm.value.password, 10);

      const newUser: User = {
        id: this.userForm.value.id,
        estado: true,
        roles: [{ id: 2, nombre: null }],
        nombre: this.userForm.value.nombre,
        direccion: this.userForm.value.direccion,
        telefono: this.userForm.value.telefono,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: hashedPassword, // Usar la contraseña encriptada
        imagen: ''
      };

      this.userService.createUser(newUser).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
          // Aquí podrías redirigir o mostrar un mensaje de éxito al usuario
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          // Aquí podrías manejar errores, mostrar un mensaje al usuario, etc.
        }
      );
    } else {
      alert('Por favor, verifica que los campos estén correctamente llenados y que las contraseñas coincidan.');
    }
  }
}