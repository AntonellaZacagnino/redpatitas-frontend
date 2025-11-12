import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Panel de control administrativo
 * Muestra menú de navegación para acceder a los CRUDs
 * Ruta: /admin/dashboard
*/

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private router: Router) {}

  // === MÉTODOS DE NAVEGACIÓN Y AUTENTICACIÓN ===
  
  /**
   * Cierra la sesión del administrador
   * Elimina el token de autenticación y redirige al home público
   * Esto activa el AuthGuard para proteger las rutas admin
  */
 
  cerrarSesion() {
    localStorage.removeItem('token');  // Eliminar token de autenticación
    this.router.navigate(['/']);       // Redirigir a página principal
  }
}