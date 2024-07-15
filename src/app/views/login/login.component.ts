import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OAuthService } from '../../controllers/oAuth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.oauthService.getToken(username, password).subscribe(
        (response) => {
          console.log('Token response:', response);
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('dni', response.dni);

          // Decodificar el token para obtener los roles del usuario
          const decodedToken = this.decodeToken(response.access_token);
          const roles = decodedToken.authorities;

          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/g-admin']);
          } else if (roles.includes('ROLE_USER')) {
            this.router.navigate(['/main']);
          }
        },
        (error) => {
          console.error('Error obtaining token:', error);
          // Maneja el error aquí, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    }
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}