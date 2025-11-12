import { Injectable, inject } from '@angular/core';
import { AdopcionService } from './adopcion.service';

/**
 * Interfaz para definir la estructura de una mascota perdida
 * Campos específicos diferentes a las mascotas en adopción
*/

export interface MascotaPerdida {
  _id?: string;                    // ID único de MongoDB
  name: string;                    // Nombre de la mascota
  species: string;                 // Especie (Perro, Gato, etc.)
  breed: string;                   // Raza
  age: number;                     // Edad
  descripcion: string;             // Descripción de la mascota perdida
  ubicacionPerdida: string;        // Dónde se perdió (campo único)
  fechaPerdida: Date;              // Cuándo se perdió (campo único)
  contactoReporte: string;         // Quién reporta la pérdida (campo único)
  status: 'Perdido';                // Estado del reporte (solo perdido)
}

/**
 * Servicio para gestionar reportes de mascotas perdidas
 * Reutiliza los métodos genéricos de AdopcionService para evitar duplicación
 * Maneja datos con campos específicos para reportes de pérdidas
*/

@Injectable({
  providedIn: 'root'
})
export class PerdidasService {
  // Inyecta AdopcionService para reutilizar métodos genéricos HTTP
  private adopcionService = inject(AdopcionService);

  /**
   * Obtiene todos los reportes de mascotas perdidas
   * Usado en: página pública de perdidas y CRUD admin
   * Reutiliza: método get() de AdopcionService
  */

  async getMascotasPerdidas(): Promise<MascotaPerdida[]> {
    try {
      return await this.adopcionService.get<MascotaPerdida[]>('/mascotas-perdidas');
    } catch (error) {
      console.error('Error en getMascotasPerdidas:', error);
      return []; // Retorna array vacío en caso de error
    }
  }

  /**
   * Crea un nuevo reporte de mascota perdida
   * Campos requeridos: name, species, breed, age, descripcion, 
   *                   ubicacionPerdida, fechaPerdida, contactoReporte, status
   * Omit<MascotaPerdida, '_id'> = todos los campos excepto _id (se genera automáticamente)
  */

  async createMascotaPerdida(mascota: Omit<MascotaPerdida, '_id'>): Promise<MascotaPerdida> {
    return await this.adopcionService.post<MascotaPerdida>('/mascotas-perdidas', mascota);
  }

  /**
   * Actualiza un reporte existente de mascota perdida
   * Partial<MascotaPerdida> = permite actualizar solo algunos campos
  */

  async updateMascotaPerdida(id: string, mascota: Partial<MascotaPerdida>): Promise<MascotaPerdida> {
    return await this.adopcionService.put<MascotaPerdida>(`/mascotas-perdidas/${id}`, mascota);
  }

  /**
   * Elimina un reporte de mascota perdida
   * Usado cuando la mascota fue encontrada o el reporte es inválido
   * Al encontrar la mascota, se elimina el reporte ya que no está perdida
  */

  async deleteMascotaPerdida(id: string): Promise<void> {
    return await this.adopcionService.delete(`/mascotas-perdidas/${id}`);
  }

}