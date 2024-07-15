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
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.isLoggedIn = !!localStorage.getItem('access_token');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (this.isLoggedIn) {

        localStorage.removeItem('access_token');
        this.isLoggedIn = false;
        this.router.navigate(['/login']); 
      } else {

        this.oauthService.getToken(username, password).subscribe(
          (response) => {
            console.log('Token response:', response);
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('dni', response.dni);


            const decodedToken = this.oauthService.decodeToken(response.access_token);
            const roles = decodedToken.authorities;
            console.log('User roles:', roles);

            if (roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/g-admin']);
            } else if (roles.includes('ROLE_USER')) {
              this.router.navigate(['/main']);
            }
          },
          (error) => {
            console.error('Error obtaining token:', error);
          }
        );
      }
    }
  }
}