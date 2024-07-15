import { Component } from '@angular/core';
import { UsersService } from '../../controllers/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
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
      const hashedPassword = bcrypt.hashSync(this.userForm.value.password, 10);

      const newUser = {
        id: this.userForm.value.id,
        estado: true,
        roles: [{ id: 2, nombre: null }],
        nombre: this.userForm.value.nombre,
        direccion: this.userForm.value.direccion,
        telefono: this.userForm.value.telefono,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: hashedPassword,
        imagen: ''
      };

      this.userService.createUser(newUser).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: '¡Tu cuenta ha sido creada exitosamente!',
            confirmButtonText: 'Iniciar Sesión'
          }).then(() => {
            this.router.navigate(['/login']); // Redirigir al usuario al inicio de sesión
          });
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear tu cuenta. Por favor, inténtalo nuevamente más tarde.'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Por favor, verifica que todos los campos estén llenados correctamente.'
      });
    }
  }
}