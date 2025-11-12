import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Guard de autenticación para proteger rutas administrativas
 * Verifica si el usuario tiene un token válido en localStorage
 * Si no está autenticado, redirige al login
 * 
 * Rutas protegidas:
 * - /admin/dashboard
 * - /admin/mascotas (CRUD adopción)
 * - /admin/mascotas-perdidas (CRUD perdidas)
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  /**
   * Método que determina si una ruta puede ser activada
   * @returns true si el usuario está autenticado, false si no
  */
 
  canActivate(): boolean {
    // Verificar si existe token en localStorage (guardado en login)
    const token = localStorage.getItem('token');
    
    if (token) {
      return true; // Usuario autenticado - permitir acceso
    } else {
      // Usuario no autenticado - redirigir al login
      this.router.navigate(['/admin/login']);
      return false; // Bloquear acceso a la ruta
    }
  }
}