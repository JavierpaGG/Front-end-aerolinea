import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },  // Redirige la ruta raíz a la página principal
    { path: 'main', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ];
  
  export const appRouterProviders = [
    provideRouter(routes)
  ];