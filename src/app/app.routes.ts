import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Adopcion } from './pages/public/adopcion/adopcion';
import { MascotasPerdidas } from './pages/public/mascotas-perdidas/mascotas-perdidas';
import { Login } from './pages/admin/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { MascotasCrud } from './pages/admin/mascotas-crud/mascotas-crud';
import { MascotasPerdidasCrud } from './pages/admin/mascotas-perdidas-crud/mascotas-perdidas-crud';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rutas públicas
  { path: '', component: Home },
  { path: 'adopcion', component: Adopcion },
  { path: 'mascotas-perdidas', component: MascotasPerdidas },
  
  // Rutas administrativas
  { path: 'admin/login', component: Login },
  { path: 'admin/dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'admin/mascotas', component: MascotasCrud, canActivate: [AuthGuard] },
  { path: 'admin/mascotas-perdidas', component: MascotasPerdidasCrud, canActivate: [AuthGuard] },
  
  // Redirección por defecto
  { path: '**', redirectTo: '' }
];
