import { PagosComponent } from './views/pagos/pagos.component';
import { HabitacionesComponent } from './views/habitaciones/habitaciones.component';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HospedajeComponent } from './views/hospedaje/hospedaje.component';
import { GestionHospedajeComponent } from './views/gestion-hospedaje/gestion-hospedaje.component';
import { GAdminComponent } from './views/g-admin/g-admin.component';
import { GUserComponent } from './views/g-user/g-user.component';
import { GVuelosComponent } from './views/g-vuelos/g-vuelos.component';
import { VuelosComponent } from './views/vuelos/vuelos.component';
import { BoletosComponent } from './views/boletos/boletos.component';
import { GVuelosBoletosComponent } from './views/g-vuelos/g-vuelos-boletos/g-vuelos-boletos.component';
import { AdminGuard } from './controllers/admin.guard';
import { SuperGuard } from './controllers/super.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hospedaje', component: HospedajeComponent , canActivate: [SuperGuard]},
  { path: 'g-hospedaje', component: GestionHospedajeComponent, canActivate: [AdminGuard]},
  { path: 'g-admin', component: GAdminComponent, canActivate: [AdminGuard]},
  { path: 'g-user', component: GUserComponent , canActivate: [AdminGuard]},
  { path: 'g-vuelos', component: GVuelosComponent , canActivate: [AdminGuard]},
  { path: 'habitaciones/:idHotel', component: HabitacionesComponent , canActivate: [SuperGuard]},
  { path: 'vuelos', component: VuelosComponent , canActivate: [SuperGuard]},
  { path: 'boletos/:idVuelo', component: BoletosComponent , canActivate: [SuperGuard]},
  { path: 'g-boletos', component: GVuelosBoletosComponent , canActivate: [AdminGuard]},
  { path: 'pagos/:idBoleto', component: PagosComponent, canActivate: [SuperGuard] },
];

export const appRouterProviders = [
  provideRouter(routes)
];
