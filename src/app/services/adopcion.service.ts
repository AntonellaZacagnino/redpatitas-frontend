import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

/**
 * Interfaz para definir la estructura de una mascota en adopción
 * Campos específicos para el sistema de adopción
*/

export interface MascotaAdopcion {
  _id?: string;                           // ID único de MongoDB
  name: string;                           // Nombre de la mascota
  species: string;                        // Especie (Perro, Gato, etc.)
  breed: string;                          // Raza
  age: number;                            // Edad
  description: string;                    // Descripción general de la mascota
  refugio: string;                        // Refugio donde se encuentra (campo único)
  contacto: string;                       // Contacto del refugio (campo único)
  status: 'Disponible' | 'Adoptado';     // Estado de adopción
}

/**
 * Servicio para gestionar mascotas en adopción
 * Maneja la comunicación con la API del backend para operaciones CRUD
 * Proporciona métodos genéricos reutilizables para otros servicios
*/

@Injectable({
  providedIn: 'root'
})

export class AdopcionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  // === MÉTODO ESPECÍFICO PARA MASCOTAS EN ADOPCIÓN ===
  
  /**
   * Obtiene todas las mascotas disponibles para adopción
   * Usado en: página pública de adopción y CRUD admin
  */
  async getPets(): Promise<MascotaAdopcion[]> {
    return await firstValueFrom(this.http.get<MascotaAdopcion[]>(`${this.apiUrl}/adopcion-mascotas`));
  }

  // === MÉTODOS GENÉRICOS REUTILIZABLES ===
  
  /**
   * Método GET genérico para cualquier endpoint
   * Usado por: PerdidasService y componentes CRUD
  */

  async get<T>(endpoint: string): Promise<T> {
    return await firstValueFrom(this.http.get<T>(`${this.apiUrl}${endpoint}`));
  }

  /**
   * Método POST genérico para crear recursos
   * Usado por: PerdidasService y componentes CRUD
  */

  async post<T>(endpoint: string, data: any): Promise<T> {
    return await firstValueFrom(this.http.post<T>(`${this.apiUrl}${endpoint}`, data));
  }

  /**
   * Método PUT genérico para actualizar recursos
   * Usado por: PerdidasService y componentes CRUD
  */

  async put<T>(endpoint: string, data: any): Promise<T> {
    return await firstValueFrom(this.http.put<T>(`${this.apiUrl}${endpoint}`, data));
  }

  /**
   * Método DELETE genérico para eliminar recursos
   * Usado por: PerdidasService y componentes CRUD
  */

  async delete(endpoint: string): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${this.apiUrl}${endpoint}`));
  }

}