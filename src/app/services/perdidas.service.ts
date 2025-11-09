import { Injectable, inject } from '@angular/core';
import { AdopcionService } from './adopcion.service';

export interface MascotaPerdida {
  _id?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  descripcion: string;
  ubicacionPerdida: string;
  fechaPerdida: Date;
  contactoReporte: string;
  status: 'Perdido' | 'Encontrado';
}

@Injectable({
  providedIn: 'root'
})
export class PerdidasService {
  private adopcionService = inject(AdopcionService);

  async getMascotasPerdidas(): Promise<MascotaPerdida[]> {
    try {
      return await this.adopcionService.get<MascotaPerdida[]>('/mascotas-perdidas');
    } catch (error) {
      console.error('Error en getMascotasPerdidas:', error);
      return [];
    }
  }

  async getMascotaPerdidaById(id: string): Promise<MascotaPerdida> {
    return await this.adopcionService.get<MascotaPerdida>(`/mascotas-perdidas/${id}`);
  }

  async createMascotaPerdida(mascota: Omit<MascotaPerdida, '_id'>): Promise<MascotaPerdida> {
    return await this.adopcionService.post<MascotaPerdida>('/mascotas-perdidas', mascota);
  }

  async updateMascotaPerdida(id: string, mascota: Partial<MascotaPerdida>): Promise<MascotaPerdida> {
    return await this.adopcionService.put<MascotaPerdida>(`/mascotas-perdidas/${id}`, mascota);
  }

  async deleteMascotaPerdida(id: string): Promise<void> {
    return await this.adopcionService.delete(`/mascotas-perdidas/${id}`);
  }
}