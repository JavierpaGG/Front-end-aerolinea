import { PagosComponent } from './views/pagos/pagos.component';
import { HabitacionesComponent } from './views/habitaciones/habitaciones.component';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HospedajeComponent } from './views/hospedaje/hospedaje.component';
import { RecuperarContrasenaComponent } from './views/recuperar-contrasena/recuperar-contrasena.component';
import { GestionHospedajeComponent } from './views/gestion-hospedaje/gestion-hospedaje.component';
import { GAdminComponent } from './views/g-admin/g-admin.component';
import { GUserComponent } from './views/g-user/g-user.component';
import { GVuelosComponent } from './views/g-vuelos/g-vuelos.component';
import { VuelosComponent } from './views/vuelos/vuelos.component';
import { BoletosComponent } from './views/boletos/boletos.component';
import { GVuelosBoletosComponent } from './views/g-vuelos/g-vuelos-boletos/g-vuelos-boletos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hospedaje', component: HospedajeComponent },
  { path: 'recuperar-contraseña', component: RecuperarContrasenaComponent },
  { path: 'g-hospedaje', component: GestionHospedajeComponent },
  { path: 'g-admin', component: GAdminComponent },
  { path: 'g-user', component: GUserComponent },
  { path: 'g-vuelos', component: GVuelosComponent },
  { path: 'habitaciones/:idHotel', component: HabitacionesComponent },
  { path: 'vuelos', component: VuelosComponent },
  { path: 'boletos/:idVuelo', component: BoletosComponent },
  { path: 'g-boletos', component: GVuelosBoletosComponent },
  { path: 'pagos/:idBoleto', component: PagosComponent },
];

export const appRouterProviders = [
  provideRouter(routes)
];
