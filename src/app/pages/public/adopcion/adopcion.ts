import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdopcionService } from '../../../services/adopcion.service';

/**
 * Página pública para mostrar mascotas disponibles para adopción
 * Solo lectura - los usuarios pueden ver las mascotas pero no modificarlas
 * Ruta: /adopcion
*/

@Component({
  selector: 'app-adopcion',
  imports: [CommonModule],
  templateUrl: './adopcion.html',
  styleUrl: './adopcion.css'
})
export class Adopcion implements OnInit {
  private adopcionService = inject(AdopcionService);
  
  // === PROPIEDADES DEL COMPONENTE ===
  mascotas: any[] = [];        // Lista de mascotas disponibles para adopción
  cargando = false;            // Indicador de carga para mostrar spinner
  error = '';                  // Mensaje de error para mostrar al usuario

  // === CICLO DE VIDA ===
  
  /**
   * Se ejecuta al inicializar el componente
   * Carga automáticamente la lista de mascotas disponibles
  */

  async ngOnInit() {
    await this.cargarMascotas();
  }

  // === MÉTODOS DE CARGA DE DATOS ===
  
  /**
   * Obtiene todas las mascotas disponibles para adopción desde la API
   * Maneja estados de carga y errores para mejorar UX
  */
 
  async cargarMascotas() {
    try {
      this.cargando = true;      // Mostrar indicador de carga
      this.error = '';           // Limpiar errores previos
      this.mascotas = await this.adopcionService.getPets();
    } catch (error: any) {
      this.error = 'Error cargando mascotas: ' + error.message;
      console.error('Error:', error);
    } finally {
      this.cargando = false;     // Ocultar indicador de carga
    }
  }
}