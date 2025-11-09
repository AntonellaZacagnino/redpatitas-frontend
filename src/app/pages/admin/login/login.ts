import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credenciales = {
    email: '',
    password: ''
  };
  
  error = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    console.log('Intentando login con:', this.credenciales);
    
    // Login simple con credenciales hardcodeadas
    if (this.credenciales.email === 'admin@redpatitas.com' && 
        this.credenciales.password === '123456') {
      
      console.log('Login exitoso, redirigiendo...');
      
      // Simular token
      localStorage.setItem('token', 'admin-token-123');
      
      // Redirigir al dashboard
      this.router.navigate(['/admin/dashboard']);
    } else {
      console.log('Credenciales incorrectas');
      this.error = 'Credenciales incorrectas';
    }
  }
}