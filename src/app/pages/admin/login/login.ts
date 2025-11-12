import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

/**
 * Página de autenticación para administradores
 * Permite acceso al panel administrativo con credenciales fijas
 * Ruta: /admin/login
*/

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // === PROPIEDADES DEL COMPONENTE ===
  credenciales = {
    email: '',     // Email del administrador
    password: ''   // Contraseña del administrador
  };
  
  error = '';      // Mensaje de error para mostrar al usuario

  constructor(private router: Router) {}

  // === MÉTODOS DE AUTENTICACIÓN ===
  
  /**
   * Procesa el intento de inicio de sesión
   * Valida credenciales fijas y genera token de autenticación
   * Credenciales válidas: admin@redpatitas.com / 123456
  */
 
  iniciarSesion() {
    console.log('Intentando login con:', this.credenciales);
    
    // Validación con credenciales hardcodeadas (para demo)
    if (this.credenciales.email === 'admin@redpatitas.com' && 
        this.credenciales.password === '123456') {
      
      console.log('Login exitoso, redirigiendo...');
      
      // Generar y guardar token de autenticación
      localStorage.setItem('token', 'admin-token-123');
      
      // Redirigir al panel de control administrativo
      this.router.navigate(['/admin/dashboard']);
    } else {
      // Mostrar error si las credenciales son incorrectas
      console.log('Credenciales incorrectas');
      this.error = 'Credenciales incorrectas';
    }
  }
}