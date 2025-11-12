import { Component } from '@angular/core';
import { CuerpoPrincipal } from '../../../components/cuerpo-principal/cuerpo-principal';

/**
 * Página principal de la aplicación (Home)
 * Muestra contenido estático de bienvenida y estadísticas
 * Ruta: / (raíz)
 */
@Component({
  selector: 'app-home',
  imports: [CuerpoPrincipal],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Página estática - usa componente CuerpoPrincipal para mostrar contenido
}