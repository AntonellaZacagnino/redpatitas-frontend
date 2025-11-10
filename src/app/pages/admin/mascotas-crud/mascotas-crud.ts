import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdopcionService } from '../../../services/adopcion.service';

@Component({
  selector: 'app-mascotas-crud',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mascotas-crud.html',
  styleUrl: './mascotas-crud.css'
})
export class MascotasCrud implements OnInit {
  private adopcionService = inject(AdopcionService);
  
  mascotas: any[] = [];
  mostrarFormulario = false;
  editando = false;
  
  mascotaForm: any = {
    _id: '',
    name: '',
    species: 'Perro',
    breed: '',
    age: 1,
    description: '',
    refugio: '',
    contacto: '',
    status: 'Disponible'
  };

  async ngOnInit() {
    await this.cargarMascotas();
  }

  async cargarMascotas() {
    try {
      this.mascotas = await this.adopcionService.getPets();
    } catch (error) {
      console.error('Error cargando mascotas:', error);
    }
  }

  async guardarMascota() {
    try {
      const { _id, ...mascotaData } = this.mascotaForm;
      
      if (this.editando) {
        await this.adopcionService.put(`/admin/mascotas/${_id}`, mascotaData);
      } else {
        await this.adopcionService.post('/admin/mascotas', mascotaData);
      }
      
      await this.cargarMascotas();
      this.cancelarFormulario();
    } catch (error: any) {
      console.error('Error guardando mascota:', error);
    }
  }

  editarMascota(mascota: any) {
    this.mascotaForm = { ...mascota };
    this.editando = true;
    this.mostrarFormulario = true;
  }

  async eliminarMascota(id: string) {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await this.adopcionService.delete(`/admin/mascotas/${id}`);
        await this.cargarMascotas();
      } catch (error: any) {
        console.error('Error eliminando mascota:', error);
      }
    }
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.mascotaForm = {
      _id: '',
      name: '',
      species: 'Perro',
      breed: '',
      age: 1,
      description: '',
      refugio: '',
      contacto: '',
      status: 'Disponible'
    };
  }
}