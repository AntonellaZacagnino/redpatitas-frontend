import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  // === MASCOTAS ===
  async getPets(): Promise<any[]> {
    return await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/publico/mascotas`));
  }

  async getPetById(id: string): Promise<any> {
    return await firstValueFrom(this.http.get<any>(`${this.apiUrl}/pets/${id}`));
  }

  async createPet(pet: any): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.apiUrl}/pets`, pet));
  }

  async updatePet(id: string, pet: any): Promise<any> {
    return await firstValueFrom(this.http.put<any>(`${this.apiUrl}/pets/${id}`, pet));
  }

  async deletePet(id: string): Promise<any> {
    return await firstValueFrom(this.http.delete<any>(`${this.apiUrl}/pets/${id}`));
  }

  // === ADMIN MASCOTAS ===
  async createPetAdmin(pet: any): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.apiUrl}/admin/mascotas`, pet));
  }

  async updatePetAdmin(id: string, pet: any): Promise<any> {
    return await firstValueFrom(this.http.put<any>(`${this.apiUrl}/admin/mascotas/${id}`, pet));
  }

  async deletePetAdmin(id: string): Promise<any> {
    return await firstValueFrom(this.http.delete<any>(`${this.apiUrl}/admin/mascotas/${id}`));
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