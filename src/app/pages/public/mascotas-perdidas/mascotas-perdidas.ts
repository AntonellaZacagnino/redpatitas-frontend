import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdidasService, MascotaPerdida } from '../../../services/perdidas.service';

/**
 * Página pública para mostrar reportes de mascotas perdidas
 * Solo lectura - los usuarios pueden ver los reportes pero no modificarlos
 * Ruta: /mascotas-perdidas
*/

@Component({
  selector: 'app-mascotas-perdidas',
  imports: [CommonModule],
  templateUrl: './mascotas-perdidas.html',
  styleUrl: './mascotas-perdidas.css'
})
export class MascotasPerdidas implements OnInit {
  private perdidasService = inject(PerdidasService);
  
  // === PROPIEDADES DEL COMPONENTE ===
  mascotasPerdidas: MascotaPerdida[] = [];  // Lista de reportes de mascotas perdidas
  cargando = false;                         // Indicador de carga para mostrar spinner

  // === CICLO DE VIDA ===
  
  /**
   * Se ejecuta al inicializar el componente
   * Carga automáticamente todos los reportes de mascotas perdidas
  */

  async ngOnInit() {
    await this.cargarMascotasPerdidas();
  }

  // === MÉTODOS DE CARGA DE DATOS ===
  
  /**
   * Obtiene todos los reportes de mascotas perdidas desde la API
   * Permite a los usuarios ver qué mascotas se han reportado como perdidas
   * Maneja errores devolviendo array vacío para evitar crashes
  */
 
  async cargarMascotasPerdidas() {
    try {
      this.cargando = true;     // Mostrar indicador de carga
      this.mascotasPerdidas = await this.perdidasService.getMascotasPerdidas();
      console.log('Mascotas perdidas cargadas:', this.mascotasPerdidas);
    } catch (error) {
      console.error('Error cargando mascotas perdidas:', error);
      this.mascotasPerdidas = []; // Array vacío en caso de error
    } finally {
      this.cargando = false;    // Ocultar indicador de carga
    }
  }
}