import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  // === MASCOTAS ADOPCIÓN ===
  async getPets(): Promise<any[]> {
    return await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/adopcion-mascotas`));
  }

  async getPetById(id: string): Promise<any> {
    return await firstValueFrom(this.http.get<any>(`${this.apiUrl}/adopcion-mascotas/${id}`));
  }

  async createPet(pet: any): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.apiUrl}/adopcion-mascotas`, pet));
  }

  async updatePet(id: string, pet: any): Promise<any> {
    return await firstValueFrom(this.http.put<any>(`${this.apiUrl}/adopcion-mascotas/${id}`, pet));
  }

  async deletePet(id: string): Promise<any> {
    return await firstValueFrom(this.http.delete<any>(`${this.apiUrl}/adopcion-mascotas/${id}`));
  }

  // === MÉTODOS ADMIN (usando las mismas rutas) ===
  async createPetAdmin(pet: any): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.apiUrl}/adopcion-mascotas`, pet));
  }

  async updatePetAdmin(id: string, pet: any): Promise<any> {
    return await firstValueFrom(this.http.put<any>(`${this.apiUrl}/adopcion-mascotas/${id}`, pet));
  }

  async deletePetAdmin(id: string): Promise<any> {
    return await firstValueFrom(this.http.delete<any>(`${this.apiUrl}/adopcion-mascotas/${id}`));
  }



  // === MÉTODOS GENÉRICOS ===
  async get<T>(endpoint: string): Promise<T> {
    return await firstValueFrom(this.http.get<T>(`${this.apiUrl}${endpoint}`));
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return await firstValueFrom(this.http.post<T>(`${this.apiUrl}${endpoint}`, data));
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return await firstValueFrom(this.http.put<T>(`${this.apiUrl}${endpoint}`, data));
  }

  async delete(endpoint: string): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${this.apiUrl}${endpoint}`));
  }
}